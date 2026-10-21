/* =========================================================
   Ledger — who has claimed which (character, problem) pair.

   Two backends with the same interface:
   • cloud — Firebase Firestore, shared by every phone. A claim is
     a document whose ID *is* the pair ("dracula__3"), created in a
     transaction, so two phones can never both win the same curse.
   • local — localStorage on this device only (no config set).

   The game reads the cached ledger synchronously (to draw the
   wheels) and writes through async calls.
   ========================================================= */

(function () {
  "use strict";

  var SDK = "https://www.gstatic.com/firebasejs/10.12.2/";
  var mock = /[?&]mockcloud\b/.test(location.search);
  // ?mockcloud always uses the fake crypt, never the real project
  var cfg = mock ? { projectId: "mock-crypt" } : window.FIREBASE_CONFIG;
  var Store = window.Store;

  var listeners = [];
  var state = {
    mode: cfg ? "cloud" : "local",
    status: cfg ? "connecting" : "local", // connecting | online | offline | error | local
    error: "",
    entries: [],
    teams: {},
    config: {},
    user: null,
    isHost: false
  };
  // pairs this device has learned are taken before the live feed caught up
  var takenHints = {};

  var db = null, auth = null, readyResolve, readyPromise = new Promise(function (r) { readyResolve = r; });

  function emit() {
    listeners.forEach(function (fn) { try { fn(state); } catch (e) { console.error(e); } });
  }

  function toMs(v) {
    if (v == null) return null;
    if (typeof v === "number") return v;
    if (typeof v.toMillis === "function") return v.toMillis();
    return null;
  }

  function pairId(charId, problem) { return charId + "__" + problem; }

  /** A Firestore-safe key for a team name. "The Ghouls!" → "the-ghouls" */
  function teamKey(name) {
    var base = name.trim().toLowerCase();
    try { base = base.normalize("NFKD").replace(/[̀-ͯ]/g, ""); } catch (e) {}
    var key = base.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    if (!key) key = "t-" + Array.from(name.trim().toLowerCase()).map(function (c) { return c.codePointAt(0).toString(36); }).join("-");
    return key.slice(0, 120);
  }

  function withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise(function (_, reject) {
        setTimeout(function () { var e = new Error("The crypt didn't answer. Check the internet connection and try again."); e.code = "timeout"; reject(e); }, ms);
      })
    ]);
  }

  function friendly(err) {
    var code = (err && err.code) || "";
    if (code === "timeout") return err.message;
    if (code === "unavailable" || !navigator.onLine) return "No connection to the crypt. Check the internet and try again.";
    if (code === "permission-denied") return "The crypt refused that action (permission denied).";
    if (code.indexOf("auth/") === 0) {
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found" || code === "auth/invalid-login-credentials") return "Wrong host email or password.";
      if (code === "auth/operation-not-allowed") return "This sign-in method isn't enabled in Firebase.";
      return "Sign-in failed (" + code + ").";
    }
    return (err && err.message) || "Something went wrong in the crypt.";
  }

  /* =========================================================
     CLOUD
     ========================================================= */

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src; s.async = false;
      s.onload = resolve;
      s.onerror = function () { reject(new Error("Couldn't load " + src)); };
      document.head.appendChild(s);
    });
  }

  function loadSdk() {
    if (window.firebase && window.firebase.firestore) return Promise.resolve();
    if (mock) return loadScript("tests/mock-firebase.js");
    return Promise.all([
      loadScript(SDK + "firebase-app-compat.js"),
      loadScript(SDK + "firebase-auth-compat.js"),
      loadScript(SDK + "firebase-firestore-compat.js"),
      loadScript(SDK + "firebase-storage-compat.js").catch(function () { return null; })
    ]);
  }

  var subscribed = false, gotClaims = false;

  function subscribe() {
    if (subscribed) return;
    subscribed = true;

    db.collection("claims").onSnapshot({ includeMetadataChanges: true }, function (snap) {
      state.entries = snap.docs.map(function (d) {
        var x = d.data({ serverTimestamps: "estimate" });
        x.id = d.id;
        x.at = toMs(x.at) || Date.now();
        return x;
      }).sort(function (a, b) { return a.at - b.at; });
      // anything the feed now knows about no longer needs a hint
      state.entries.forEach(function (e) { delete takenHints[e.id]; });
      state.status = snap.metadata.fromCache ? "offline" : "online";
      state.error = "";
      if (!snap.metadata.fromCache && !gotClaims) { gotClaims = true; readyResolve(); }
      emit();
    }, function (err) {
      state.status = "error"; state.error = friendly(err); emit();
      readyResolve();
    });

    db.collection("teams").onSnapshot(function (snap) {
      var t = {};
      snap.docs.forEach(function (d) {
        var x = d.data({ serverTimestamps: "estimate" });
        x.key = d.id;
        x.at = toMs(x.at) || Date.now();
        t[d.id] = x;
      });
      state.teams = t;
      emit();
    }, function () {});

    db.collection("config").doc("event").onSnapshot(function (d) {
      state.config = d.exists ? d.data() : {};
      emit();
    }, function () {});
  }

  function initCloud() {
    loadSdk().then(function () {
      var fb = window.firebase;
      if (!fb.apps.length) fb.initializeApp(cfg);
      auth = fb.auth();
      db = fb.firestore();

      auth.onAuthStateChanged(function (u) {
        state.user = u;
        state.isHost = !!(u && !u.isAnonymous);
        if (!u) {
          // every phone gets a silent anonymous identity
          auth.signInAnonymously().catch(function (err) {
            state.status = "error"; state.error = friendly(err); emit(); readyResolve();
          });
        } else {
          subscribe();
        }
        emit();
      });

      // don't keep the room waiting forever if the network is bad
      setTimeout(function () {
        if (!gotClaims) { if (state.status === "connecting") state.status = "offline"; emit(); readyResolve(); }
      }, 9000);
    }).catch(function (err) {
      state.status = "error";
      state.error = "Couldn't load Firebase. " + err.message;
      emit();
      readyResolve();
    });

    window.addEventListener("online", emit);
    window.addEventListener("offline", function () { state.status = "offline"; emit(); });
  }

  function needUser() {
    if (!db || !state.user) {
      var e = new Error(state.error || "Still connecting to the crypt — try again in a moment.");
      e.code = "timeout";
      throw e;
    }
  }

  var cloud = {
    registerTeam: async function (name, meta) {
      needUser();
      var key = teamKey(name);
      var ref = db.collection("teams").doc(key);
      var uid = state.user.uid;
      var data = { name: name, uid: uid, at: window.firebase.firestore.FieldValue.serverTimestamp() };
      if (meta && meta.leader) data.leader = meta.leader;
      if (meta && meta.members) data.members = meta.members;

      var ok = false;
      try {
        ok = await withTimeout(db.runTransaction(async function (t) {
          var snap = await t.get(ref);
          if (snap.exists) return false;
          t.set(ref, data);
          return true;
        }), 12000);
      } catch (err) {
        if (err && err.code === "permission-denied" && (data.leader || data.members)) {
          console.warn("Retrying team registration with core fields due to Firestore rules restrictions", err);
          ok = await withTimeout(db.runTransaction(async function (t) {
            var snap = await t.get(ref);
            if (snap.exists) return false;
            t.set(ref, { name: name, uid: uid, at: window.firebase.firestore.FieldValue.serverTimestamp() });
            return true;
          }), 12000);
        } else {
          throw err;
        }
      }
      return ok ? { ok: true, key: key } : { ok: false, error: "That name is already written in the ledger. Choose another." };
    },

    claim: async function (team, key, charId, problem) {
      needUser();
      var id = pairId(charId, problem);
      var ref = db.collection("claims").doc(id);
      var data = { team: team, teamKey: key, charId: charId, problem: problem, uid: state.user.uid, at: window.firebase.firestore.FieldValue.serverTimestamp() };
      var won = await withTimeout(db.runTransaction(async function (t) {
        var snap = await t.get(ref);
        if (snap.exists) return false;
        t.set(ref, data);
        return true;
      }), 12000);
      if (!won) { takenHints[id] = true; return null; }
      var entry = { id: id, team: team, teamKey: key, charId: charId, problem: problem, at: Date.now() };
      return entry;
    },

    uploadZip: async function (key, file, onProgress) {
      if (!window.firebase || !window.firebase.storage || !cfg || !cfg.storageBucket) {
        return null;
      }
      try {
        var storage = window.firebase.storage();
        var safeName = (file.name || "source.zip").replace(/[^a-zA-Z0-9._-]/g, "_");
        var path = "submissions/" + key + "/" + Date.now() + "_" + safeName;
        var ref = storage.ref().child(path);
        var uploadTask = ref.put(file);
        if (typeof onProgress === "function") {
          uploadTask.on("state_changed", function (snap) {
            var pct = snap.totalBytes ? Math.round((snap.bytesTransferred / snap.totalBytes) * 100) : 0;
            onProgress(pct);
          });
        }
        var snap = await uploadTask;
        var downloadUrl = await snap.ref.getDownloadURL();
        return { url: downloadUrl, name: file.name, size: file.size, path: path };
      } catch (err) {
        console.warn("Firebase Storage upload skipped/failed:", err);
        return null;
      }
    },

    saveProgress: function (key, patch) {
      if (!db || !key) return Promise.resolve();
      patch.updatedAt = window.firebase.firestore.FieldValue.serverTimestamp();
      return db.collection("teams").doc(key).update(patch).catch(function (err) {
        if (err && err.code === "permission-denied" && (patch.zipUrl || patch.zipName || patch.zipCloudUrl)) {
          var fallbackPatch = Object.assign({}, patch);
          delete fallbackPatch.zipUrl;
          delete fallbackPatch.zipName;
          delete fallbackPatch.zipSize;
          delete fallbackPatch.zipCloudUrl;
          console.warn("Retrying progress update without zip fields due to Firestore rules restrictions", err);
          return db.collection("teams").doc(key).update(fallbackPatch).catch(function (e2) {
            console.warn("Fallback progress save also failed", e2);
          });
        }
        console.warn("Progress save failed", err);
      });
    },

    update: function (id, patch) {
      if (!db || !id) return Promise.resolve();
      // queued by Firestore if the phone is briefly offline
      return db.collection("claims").doc(id).update(patch).catch(function (err) {
        if (err && err.code === "permission-denied" && (patch.zipUrl || patch.zipName || patch.zipCloudUrl)) {
          var fallbackPatch = Object.assign({}, patch);
          delete fallbackPatch.zipUrl;
          delete fallbackPatch.zipName;
          delete fallbackPatch.zipSize;
          delete fallbackPatch.zipCloudUrl;
          return db.collection("claims").doc(id).update(fallbackPatch).catch(function () {});
        }
        console.warn("Ledger update failed", err);
      });
    },

    release: function (id) { needUser(); return db.collection("claims").doc(id).delete(); },

    wipe: async function () {
      needUser();
      var cols = ["claims", "teams"];
      for (var i = 0; i < cols.length; i++) {
        var snap = await db.collection(cols[i]).get();
        var docs = snap.docs;
        for (var j = 0; j < docs.length; j += 400) {
          var batch = db.batch();
          docs.slice(j, j + 400).forEach(function (d) { batch.delete(d.ref); });
          await batch.commit();
        }
      }
    },

    setDelay: function (min) {
      needUser();
      return db.collection("config").doc("event").set({ delayMinutes: min }, { merge: true });
    },

    signInHost: function (email, password) { return auth.signInWithEmailAndPassword(email, password); },
    signOutHost: function () { return auth.signOut(); }
  };

  /* =========================================================
     LOCAL (single device)
     ========================================================= */

  function refreshLocal() {
    state.entries = Store.ledger().slice().sort(function (a, b) { return a.at - b.at; });
    var t = {};
    var progress = Store.prefs().progress || {};
    var teamDetails = Store.prefs().teamDetails || {};
    function add(name, at) {
      var key = teamKey(name);
      if (!t[key]) t[key] = Object.assign({ key: key, name: name, at: at || 0 }, teamDetails[key] || {}, progress[key] || {});
    }
    (Store.prefs().teams || []).forEach(function (n) { add(n); });
    state.entries.forEach(function (e) { add(e.team, e.at); });
    state.teams = t;
    emit();
  }

  var local = {
    registerTeam: async function (name, meta) {
      var key = teamKey(name);
      refreshLocal();
      if (state.teams[key]) return { ok: false, error: "That name is already written in the ledger. Choose another." };
      var names = Store.prefs().teams || [];
      names.push(name);
      Store.setPref("teams", names);
      if (meta) {
        var teamDetails = Store.prefs().teamDetails || {};
        teamDetails[key] = Object.assign({ key: key, name: name }, meta);
        Store.setPref("teamDetails", teamDetails);
      }
      refreshLocal();
      return { ok: true, key: key };
    },
    claim: async function (team, key, charId, problem) {
      var e = Store.claim(team, charId, problem);
      if (e) Store.updateEntry(e.id, { teamKey: key });
      refreshLocal();
      return e;
    },
    update: async function (id, patch) { Store.updateEntry(id, patch); refreshLocal(); },
    saveProgress: async function (key, patch) {
      var all = Store.prefs().progress || {};
      all[key] = Object.assign(all[key] || {}, patch, { updatedAt: Date.now() });
      Store.setPref("progress", all);
      refreshLocal();
    },
    release: async function (id) { Store.removeEntry(id); refreshLocal(); },
    uploadZip: async function () { return null; },
    wipe: async function () { Store.wipe(); Store.setPref("teams", []); Store.setPref("progress", {}); Store.setPref("teamDetails", {}); refreshLocal(); },
    setDelay: async function (min) { Store.setPref("delay", min); emit(); },
    signInHost: async function () {},
    signOutHost: async function () {}
  };

  var impl = state.mode === "cloud" ? cloud : local;

  /* =========================================================
     PUBLIC API
     ========================================================= */

  var Ledger = {
    get mode() { return state.mode; },
    get status() { return state.status; },
    get error() { return state.error; },
    get isHost() { return state.mode === "local" || state.isHost; },
    get hostEmail() { return state.user && !state.user.isAnonymous ? state.user.email : ""; },

    ready: function () { return readyPromise; },
    onChange: function (fn) { listeners.push(fn); },

    entries: function () { return state.entries; },
    teamKey: teamKey,
    teamExists: function (name) { return !!state.teams[teamKey(name)]; },

    /** Every registered team with its saved progress, oldest first. */
    teams: function () {
      return Object.keys(state.teams).map(function (k) { return state.teams[k]; })
        .sort(function (a, b) { return (a.at || 0) - (b.at || 0); });
    },

    /** The team this phone registered (shared mode only). */
    myTeam: function () {
      if (state.mode !== "cloud" || !state.user || state.isHost) return null;
      var uid = state.user.uid;
      return this.teams().filter(function (t) { return t.uid === uid; }).pop() || null;
    },

    saveProgress: function (key, patch) { return impl.saveProgress(key, patch); },

    usedProblems: function (charId) {
      var used = {};
      state.entries.forEach(function (e) { if (e.charId === charId && typeof e.problem === "number") used[e.problem] = true; });
      Object.keys(takenHints).forEach(function (id) {
        var parts = id.split("__");
        if (parts[0] === charId) used[+parts[1]] = true;
      });
      return used;
    },

    delayMinutes: function (fallback) {
      var c = state.config && state.config.delayMinutes;
      if (state.mode === "cloud" && typeof c === "number") return Math.max(0, c);
      var p = Store.prefs().delay;
      return Math.max(0, typeof p === "number" ? p : fallback);
    },

    registerTeam: function (name, meta) { return impl.registerTeam(name, meta); },
    claim: function (team, key, charId, problem) { return impl.claim(team, key, charId, problem); },
    update: function (id, patch) { return impl.update(id, patch); },
    uploadZip: function (key, file, onProgress) { return impl.uploadZip ? impl.uploadZip(key, file, onProgress) : Promise.resolve(null); },
    release: function (id) { return impl.release(id); },
    wipe: function () { return impl.wipe(); },
    setDelay: function (m) { return impl.setDelay(m); },
    signInHost: function (e, p) { return impl.signInHost(e, p); },
    signOutHost: function () { return impl.signOutHost(); },

    // local mode only — combine ledgers exported from other devices
    merge: function (list) { var r = Store.merge(list); refreshLocal(); return r; },

    friendly: friendly
  };

  if (state.mode === "cloud") {
    initCloud();
  } else {
    refreshLocal();
    window.addEventListener("storage", function (e) { if (e.key && e.key.indexOf("woc.") === 0) refreshLocal(); });
    readyResolve();
  }

  window.Ledger = Ledger;
})();
