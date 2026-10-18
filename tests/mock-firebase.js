/* =========================================================
   DEV ONLY — a tiny stand-in for the Firebase compat SDK, used
   when the site is opened with ?mockcloud. Every browser tab acts
   as a separate "phone"; they share one fake Firestore through
   localStorage. Lets you rehearse the shared-ledger flow without
   a Firebase project. Add &lag=800 to simulate a slow network.

   It implements only what js/ledger.js uses, and does NOT enforce
   security rules.
   ========================================================= */

(function () {
  "use strict";

  var KEY = "mockfs.db";
  var lag = +(new URLSearchParams(location.search).get("lag") || 120);
  var SERVER_TS = { __serverTimestamp: true };

  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function persist(db) { localStorage.setItem(KEY, JSON.stringify(db)); notify(); }
  function wait() { return new Promise(function (r) { setTimeout(r, lag); }); }
  function resolveTs(data) {
    var out = {};
    Object.keys(data).forEach(function (k) { out[k] = data[k] === SERVER_TS ? Date.now() : data[k]; });
    return out;
  }
  function err(code, msg) { var e = new Error(msg); e.code = code; return e; }

  /* ---------- snapshots ---------- */
  var watchers = [];
  function notify() { watchers.forEach(function (w) { w(); }); }
  window.addEventListener("storage", function (e) { if (e.key === KEY) notify(); });

  function docSnap(col, id, data) {
    return {
      id: id, exists: data != null,
      ref: new DocRef(col, id),
      data: function () { return data == null ? undefined : JSON.parse(JSON.stringify(data)); }
    };
  }

  function DocRef(col, id) { this.col = col; this.id = id; }
  DocRef.prototype._read = function () { var db = load(); return (db[this.col] || {})[this.id]; };
  DocRef.prototype.get = function () { var self = this; return wait().then(function () { return docSnap(self.col, self.id, self._read()); }); };
  DocRef.prototype.set = function (data, opts) {
    var self = this;
    return wait().then(function () {
      var db = load(); db[self.col] = db[self.col] || {};
      var prev = opts && opts.merge ? db[self.col][self.id] || {} : {};
      db[self.col][self.id] = Object.assign({}, prev, resolveTs(data));
      persist(db);
    });
  };
  DocRef.prototype.update = function (patch) {
    var self = this;
    return wait().then(function () {
      var db = load();
      if (!db[self.col] || !db[self.col][self.id]) throw err("not-found", "No document to update");
      Object.assign(db[self.col][self.id], resolveTs(patch));
      persist(db);
    });
  };
  DocRef.prototype.delete = function () {
    var self = this;
    return wait().then(function () { var db = load(); if (db[self.col]) delete db[self.col][self.id]; persist(db); });
  };
  DocRef.prototype.onSnapshot = function (cb) {
    var self = this;
    function fire() { cb(docSnap(self.col, self.id, self._read())); }
    watchers.push(fire); setTimeout(fire, lag);
    return function () { watchers.splice(watchers.indexOf(fire), 1); };
  };

  function ColRef(name) { this.name = name; }
  ColRef.prototype.doc = function (id) { return new DocRef(this.name, id); };
  ColRef.prototype._snap = function () {
    var docs = load()[this.name] || {}, col = this.name;
    return { docs: Object.keys(docs).map(function (id) { return docSnap(col, id, docs[id]); }), metadata: { fromCache: !navigator.onLine } };
  };
  ColRef.prototype.get = function () { var self = this; return wait().then(function () { return self._snap(); }); };
  ColRef.prototype.onSnapshot = function () {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === "object") args.shift();
    var cb = args[0], self = this;
    function fire() { cb(self._snap()); }
    watchers.push(fire); setTimeout(fire, lag);
    return function () { watchers.splice(watchers.indexOf(fire), 1); };
  };

  var firestore = {
    collection: function (n) { return new ColRef(n); },
    runTransaction: function (fn) {
      if (!navigator.onLine) return new Promise(function () {}); // hangs like the real SDK offline
      var writes = [];
      var t = {
        get: function (ref) { return wait().then(function () { return docSnap(ref.col, ref.id, ref._read()); }); },
        set: function (ref, data) { writes.push({ ref: ref, data: data }); }
      };
      return fn(t).then(function (result) {
        // commit atomically: refuse if any written doc appeared since we read it
        var db = load();
        for (var i = 0; i < writes.length; i++) {
          var w = writes[i];
          db[w.ref.col] = db[w.ref.col] || {};
          if (db[w.ref.col][w.ref.id]) return false;
        }
        writes.forEach(function (w) { db[w.ref.col][w.ref.id] = resolveTs(w.data); });
        if (writes.length) persist(db);
        return result;
      });
    },
    batch: function () {
      var ops = [];
      return {
        delete: function (ref) { ops.push(ref); },
        commit: function () { return wait().then(function () { var db = load(); ops.forEach(function (r) { if (db[r.col]) delete db[r.col][r.id]; }); persist(db); }); }
      };
    }
  };

  /* ---------- auth ---------- */
  var authCbs = [], current = null;
  function setUser(u) { current = u; authCbs.forEach(function (cb) { cb(u); }); }
  var stored = sessionStorage.getItem("mock.uid");
  var auth = {
    get currentUser() { return current; },
    onAuthStateChanged: function (cb) { authCbs.push(cb); setTimeout(function () { cb(current); }, 30); },
    signInAnonymously: function () {
      var uid = stored || "anon-" + Math.random().toString(36).slice(2, 10);
      sessionStorage.setItem("mock.uid", uid);
      return wait().then(function () { setUser({ uid: uid, isAnonymous: true }); });
    },
    signInWithEmailAndPassword: function (email, pw) {
      return wait().then(function () {
        if (pw !== "host") throw err("auth/invalid-credential", "bad password");
        setUser({ uid: "host-" + email, isAnonymous: false, email: email });
      });
    },
    signOut: function () { return wait().then(function () { setUser(null); }); }
  };
  if (stored) current = { uid: stored, isAnonymous: true };

  window.firebase = {
    apps: [],
    initializeApp: function (cfg) { this.apps.push(cfg); return {}; },
    app: function () { return {}; },
    auth: function () { return auth; },
    firestore: Object.assign(function () { return firestore; }, { FieldValue: { serverTimestamp: function () { return SERVER_TS; } } })
  };

  // test helpers
  window.__mockfs = {
    reset: function () { localStorage.removeItem(KEY); notify(); },
    // write without telling this tab — simulates another phone winning a race
    silentSet: function (col, id, data) {
      var db = load(); db[col] = db[col] || {}; db[col][id] = data;
      localStorage.setItem(KEY, JSON.stringify(db));
    },
    dump: load
  };
})();
