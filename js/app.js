/* =========================================================
   App — the ritual: ledger → soul → curse → hex → (wait) → twist
   ========================================================= */

(function () {
  "use strict";

  var D = window.CURSE_DATA;
  var $ = function (id) { return document.getElementById(id); };

  var STAGES = { soul: 1, curse: 2, hex: 3, wait: 4, twist: 4, done: 5 };

  var THEMES = {
    soul:  { a: "#1c0708", b: "#110405", accent: "#c4161c" },
    curse: { a: "#200807", b: "#130404", accent: "#c4161c" },
    hex:   { a: "#200d05", b: "#130703", accent: "#ff7a1a" },
    twist: { a: "#25060a", b: "#150306", accent: "#ff3326" }
  };

  var el = {
    ledgerPanel: $("ledgerPanel"), wheelPanel: $("wheelPanel"),
    form: $("ledgerForm"), teamInput: $("teamInput"), teamError: $("teamError"),
    seals: $("seals"), kicker: $("wheelKicker"), title: $("wheelTitle"), sub: $("wheelSub"),
    stage: $("wheelStage"), rotor: $("wheelRotor"), canvas: $("wheelCanvas"), pointer: $("pointer"),
    hub: $("hub"), chains: $("chains"), countdown: $("countdown"),
    spinBtn: $("spinBtn"), spinLabel: $("spinLabel"), spinHint: $("spinHint"),
    fateList: $("fateList"), grimoireTeam: $("grimoireTeam"), grimoireFoot: $("grimoireFoot"),
    reveal: $("reveal"), card: $("card"), cardKicker: $("cardKicker"), cardGlyph: $("cardGlyph"),
    cardName: $("cardName"), cardLore: $("cardLore"), cardDesc: $("cardDesc"), cardBtn: $("cardBtn"),
    host: $("hostModal"), announcer: $("announcer"), soundBtn: $("soundBtn"), brand: $("brand"),
    spinner: $("spinner"), spinnerFace: $("spinnerFace"), spinnerName: $("spinnerName"), spinnerLine: $("spinnerLine"),
    gate: $("gate"), scareBtn: $("scareBtn"), cardScope: $("cardScope")
  };

  var wheel = new window.Wheel(el.canvas, el.rotor, el.pointer);
  var session = window.Store.session();
  var timerId = null, lastBpm = 0;
  var busy = false;
  var baseTitle = document.title;

  /* ---------- helpers ---------- */

  function rand(n) {
    if (window.crypto && window.crypto.getRandomValues) {
      var a = new Uint32Array(1); window.crypto.getRandomValues(a);
      return a[0] % n;
    }
    return Math.floor(Math.random() * n);
  }
  function pick(list) { return list[rand(list.length)]; }

  function charById(id) {
    for (var i = 0; i < D.characters.length; i++) if (D.characters[i].id === id) return D.characters[i];
    return null;
  }

  var pictographic = (function () {
    try { return new RegExp("\\p{Extended_Pictographic}", "u"); } catch (e) { return /[☀-➿]|[\uD83C-\uDBFF]/; }
  })();
  function isEmoji(s) { return pictographic.test(s || ""); }

  function delayMinutes() { return window.Ledger.delayMinutes(D.twistDelayMinutes); }

  function fmt(ms) {
    var s = Math.max(0, Math.ceil(ms / 1000));
    var m = Math.floor(s / 60); s = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  function fillTwist(text) {
    var c = charById(session.charId);
    var x = session.twistExtra || {};
    return text
      .replace(/\{char\}/g, c ? c.short : "your character")
      .replace(/\{randomChar\}/g, x.randomChar || "another monster")
      .replace(/\{randomCurse\}/g, x.randomCurse || "another hex");
  }

  function announce(msg) { el.announcer.textContent = ""; setTimeout(function () { el.announcer.textContent = msg; }, 50); }

  function save() { window.Store.saveSession(session); }

  /* ---------- wheel configs per stage ---------- */

  function soulSegments() {
    return D.characters.map(function (c) {
      var used = window.Ledger.usedProblems(c.id);
      var left = c.problems.length - Object.keys(used).length;
      return { label: c.short, glyph: c.glyph, color: c.color, disabled: left <= 0 };
    });
  }
  function curseSegments(c) {
    var used = window.Ledger.usedProblems(c.id);
    return c.problems.map(function (p, i) {
      var mine = session && session.problem === i;
      return { label: p.t, glyph: "", color: c.color, disabled: !!used[i] && !mine };
    });
  }
  function hexSegments() {
    return D.uiCurses.map(function (h, i) {
      return { label: h.t, glyph: h.glyph, glyphIsText: !isEmoji(h.glyph), color: i % 2 ? "#d9480f" : "#ff8a3d" };
    });
  }
  function twistSegments() {
    return D.twists.map(function (t, i) {
      return { label: t.t, glyph: t.glyph, glyphIsText: !isEmoji(t.glyph), color: i % 2 ? "#f0735a" : "#ff3326" };
    });
  }

  /* ---------- rendering ---------- */

  function setSeals(step) {
    var items = el.seals.querySelectorAll("li");
    el.seals.style.setProperty("--p", Math.max(0, Math.min(1, (step - 1) / (items.length - 1))));
    for (var i = 0; i < items.length; i++) {
      var n = i + 1;
      items[i].classList.toggle("is-done", n < step);
      items[i].classList.toggle("is-current", n === step);
    }
  }

  function setFate(slot, data) {
    var li = el.fateList.querySelector('[data-slot="' + slot + '"]');
    var num = li.querySelector(".fate-num"), name = li.querySelector(".fate-name"), desc = li.querySelector(".fate-desc");
    var roman = ["I", "II", "III", "IV"][slot - 1];
    li.classList.remove("is-filled", "is-current");
    if (data && data.name) {
      var wasEmpty = name.textContent === "???";
      li.classList.add("is-filled");
      li.style.setProperty("--c", data.color || "#f4e3d7");
      num.textContent = data.glyph || roman;
      name.textContent = data.name;
      desc.textContent = data.desc || "";
      if (wasEmpty && data.fresh) { li.classList.remove("is-new"); void li.offsetWidth; li.classList.add("is-new"); }
    } else {
      num.textContent = roman;
      name.textContent = data && data.pendingName ? data.pendingName : "???";
      desc.textContent = data && data.pendingDesc ? data.pendingDesc : "";
      if (data && data.current) li.classList.add("is-current");
    }
  }

  function renderGrimoire(fresh) {
    var s = session || {};
    var c = charById(s.charId);
    var stage = s.stage;
    el.grimoireTeam.textContent = s.team ? "Team · " + s.team : "";

    setFate(1, c ? { name: c.name, desc: c.lore, glyph: c.glyph, color: c.color, fresh: fresh } : { current: stage === "soul" });

    var p = c && typeof s.problem === "number" ? c.problems[s.problem] : null;
    setFate(2, p ? { name: p.t, desc: p.d, glyph: "📜", color: c.color, fresh: fresh } : { current: stage === "curse" });

    var h = typeof s.hex === "number" ? D.uiCurses[s.hex] : null;
    setFate(3, h ? { name: h.t, desc: h.d, glyph: h.glyph, color: "#ff8a3d", fresh: fresh } : { current: stage === "hex" });

    var t = typeof s.twist === "number" ? D.twists[s.twist] : null;
    if (t) setFate(4, { name: t.t, desc: fillTwist(t.d), glyph: t.glyph, color: "#ff5a4a", fresh: fresh });
    else if (stage === "wait") setFate(4, { current: true, pendingName: "Sleeping…", pendingDesc: "Wakes in " + fmt(s.unlockAt - Date.now()) });
    else if (stage === "twist") setFate(4, { current: true, pendingName: "Awake", pendingDesc: "Spin the final wheel." });
    else setFate(4, {});

    el.grimoireFoot.hidden = stage !== "done";
    renderEggs();
  }

  function configureWheel(stage, animate) {
    var c = charById(session.charId);
    var segs, theme, kicker, title, sub;
    switch (stage) {
      case "soul":
        segs = soulSegments(); theme = THEMES.soul;
        kicker = "Wheel I · The Soul"; title = "Choose Your Soul";
        sub = "Fifteen damned souls wait in the dark. One of them is yours.";
        break;
      case "curse":
        segs = curseSegments(c); theme = { a: THEMES.curse.a, b: THEMES.curse.b, accent: c.color };
        kicker = "Wheel II · The Curse"; title = c.short + "'s Curse";
        sub = "Every soul carries a burden. Your site must lift it.";
        break;
      case "hex":
        segs = hexSegments(); theme = THEMES.hex;
        kicker = "Wheel III · The Hex"; title = "Hex Your Interface";
        sub = "A rule your UI must obey — no matter what.";
        break;
      default:
        segs = twistSegments(); theme = THEMES.twist;
        kicker = "Wheel IV · The Twist"; title = "The Twist";
        sub = stage === "wait" ? "The final wheel is chained. It wakes when the timer dies."
            : stage === "twist" ? "The chains have broken. Spin, if you dare."
            : "Your fate is sealed.";
    }
    el.kicker.textContent = kicker;
    el.title.textContent = title;
    el.sub.textContent = sub;
    el.stage.style.setProperty("--accent", theme.accent);

    var sig = stage + ":" + (session.charId || "");
    if (wheel._sig !== sig || animate) {
      wheel.setSegments(segs, theme);
      wheel._sig = sig;
      if (animate) { el.rotor.classList.remove("swap"); void el.rotor.offsetWidth; el.rotor.classList.add("swap"); }
    } else {
      wheel.setSegments(segs, theme);
    }
  }

  function setSpinState(stage) {
    var canSpin = !busy && (stage === "soul" || stage === "curse" || stage === "hex" || stage === "twist");
    var who = spinnerFor(stage);
    el.spinBtn.disabled = !canSpin;
    el.hub.disabled = !canSpin;
    el.spinHint.style.visibility = canSpin ? "visible" : "hidden";
    if (busy) el.spinLabel.textContent = "The wheel turns…";
    else if (stage === "wait") el.spinLabel.textContent = "Chained · " + fmt(session.unlockAt - Date.now());
    else if (stage === "done") el.spinLabel.textContent = "Fate Sealed";
    else if (stage === "soul") el.spinLabel.textContent = "Spin the Wheel";
    else el.spinLabel.textContent = "Let " + who.short + " spin";
  }

  /* ---------- the haunted spinner ---------- */
  // The Eye spins the first wheel; after that the team's own soul spins the rest.

  function spinnerFor(stage) {
    var c = session && charById(session.charId);
    if (stage === "soul" || !c) {
      var k = D.keeper;
      return { id: "keeper", name: k.name, short: k.name, glyph: k.glyph, color: k.color, spin: k.spin, idle: k.idle };
    }
    return { id: c.id, name: c.name, short: c.short, glyph: c.glyph, color: c.color, spin: c.spin, idle: c.idle };
  }

  var WHEEL_NAMES = { soul: "soul", curse: "curse", hex: "hex", twist: "twist" };

  function updateSpinner(stage, line) {
    var who = spinnerFor(stage);
    el.spinner.style.setProperty("--c", who.color);
    el.spinnerFace.textContent = who.glyph;
    el.spinnerName.textContent = who.name;
    el.spinner.classList.remove("impatient");
    if (line) { el.spinnerLine.textContent = line; return; }
    if (stage === "soul") el.spinnerLine.textContent = "Spin, and I shall choose which soul you become…";
    else if (stage === "wait") el.spinnerLine.textContent = "The last wheel sleeps… I can hear it breathing.";
    else if (stage === "done") el.spinnerLine.textContent = "Our fate is sealed. Now build… before midnight.";
    else el.spinnerLine.textContent = "I'll spin your " + WHEEL_NAMES[stage] + " wheel myself. Give the word.";
  }

  /* ---------- impatience: a spirit spins for slow teams ---------- */

  var idleSince = Date.now(), looming = false;
  function resetIdle() { idleSince = Date.now(); }

  setInterval(function () {
    if (!session || busy || !el.reveal.hidden || !el.gate.classList.contains("gone")) return;
    var stage = session.stage;
    if (["soul", "curse", "hex", "twist"].indexOf(stage) < 0) return;
    var left = (D.idleSpinSeconds || 60) * 1000 - (Date.now() - idleSince);
    if (left > 15000) return;
    var who = spinnerFor(stage);
    if (left <= 0) {
      if (document.hidden || looming) return; // wait until someone is looking
      // patience gone: the soul's shadow looms over everything… then it spins
      looming = true;
      el.spinnerLine.textContent = who.idle;
      window.Creatures.impatience(who, function () { looming = false; spin(true); });
      return;
    }
    el.spinner.classList.add("impatient");
    el.spinnerLine.innerHTML = "";
    el.spinnerLine.appendChild(document.createTextNode(who.idle + " "));
    var cnt = document.createElement("span");
    cnt.className = "idle-count";
    cnt.textContent = "(" + Math.ceil(left / 1000) + "s)";
    el.spinnerLine.appendChild(cnt);
  }, 1000);

  function render(animate) {
    document.body.classList.toggle("in-ritual", !!session);
    if (!session) {
      el.ledgerPanel.hidden = false;
      el.wheelPanel.hidden = true;
      setSeals(0);
      stopTimer();
      document.title = baseTitle;
      return;
    }
    el.ledgerPanel.hidden = true;
    el.wheelPanel.hidden = false;

    var stage = session.stage;
    setSeals(STAGES[stage]);
    configureWheel(stage, animate);
    renderGrimoire(false);
    setSpinState(stage);

    el.chains.hidden = stage !== "wait";
    el.chains.classList.remove("breaking");
    if (stage === "wait") startTimer(); else stopTimer();
    if (stage === "done" && typeof session.twist === "number") wheel.show(session.twist);
    if (!busy) updateSpinner(stage);
    setMood(stage === "wait");
  }

  function setMood(tense) {
    if (window.Creatures) window.Creatures.setMood(tense ? "tense" : "calm");
    window.Sound.setTension(tense ? 1 : 0);
    if (!tense) { window.Sound.heartbeat(0); lastBpm = 0; }
  }

  /* ---------- timer ---------- */

  function tickTimer() {
    var left = session.unlockAt - Date.now();
    el.countdown.textContent = fmt(left);
    el.spinLabel.textContent = "Chained · " + fmt(left);
    var li = el.fateList.querySelector('[data-slot="4"] .fate-desc');
    if (li) li.textContent = "Wakes in " + fmt(left);
    document.title = "⏳ " + fmt(left) + " · " + baseTitle;
    // the last minute: a heartbeat that speeds up as the twist approaches
    if (left > 0 && left < 60000) {
      var bpm = Math.round((70 + (60000 - left) / 60000 * 80) / 10) * 10;
      if (bpm !== lastBpm) { lastBpm = bpm; window.Sound.heartbeat(bpm); }
    }
    if (left <= 0) {
      window.Sound.heartbeat(0); lastBpm = 0;
      stopTimer();
      unlockTwist();
    }
  }
  function startTimer() {
    stopTimer();
    tickTimer();
    if (session && session.stage === "wait") timerId = setInterval(tickTimer, 250);
  }
  function stopTimer() { if (timerId) clearInterval(timerId); timerId = null; }

  function unlockTwist() {
    session.stage = "twist";
    save();
    saveProgress();
    resetIdle();
    document.title = "🔓 The twist awakens · " + baseTitle;
    window.Sound.bell();
    if (window.FX) window.FX.strike();
    window.Creatures.awaken();
    el.chains.classList.add("breaking");
    el.stage.classList.add("shake");
    announce("The twist wheel has awakened. Spin it now.");
    setTimeout(function () {
      el.stage.classList.remove("shake");
      render(false);
    }, 1200);
  }

  /* ---------- spinning ---------- */

  async function chooseOutcome(stage) {
    var i, options = [];
    if (stage === "soul") {
      var segs = soulSegments();
      for (i = 0; i < segs.length; i++) if (!segs[i].disabled) options.push(i);
      if (!options.length) return { error: "Every soul has been claimed. Ask the host to open a new ledger." };
      return { index: pick(options) };
    }
    if (stage === "curse") {
      var c = charById(session.charId);
      var myKey = session.teamKey || window.Ledger.teamKey(session.team);
      // A claim that timed out on a bad network may still have landed — adopt
      // it rather than letting this team take a second curse.
      var mine = window.Ledger.entries().filter(function (e) { return e.teamKey === myKey && e.charId === c.id; })[0];
      if (mine) { session.entryId = mine.id; return { index: mine.problem }; }
      // Claim a free curse in the shared ledger. If another phone grabbed it a
      // split-second earlier the claim is refused, and we try a different one.
      for (var attempt = 0; attempt < 12; attempt++) {
        var used = window.Ledger.usedProblems(c.id);
        options = [];
        for (i = 0; i < c.problems.length; i++) if (!used[i]) options.push(i);
        if (!options.length) return { error: "exhausted" };
        var idx = pick(options);
        var entry;
        try {
          entry = await window.Ledger.claim(session.team, myKey, c.id, idx);
        } catch (err) {
          return { error: window.Ledger.friendly(err) };
        }
        if (entry) { session.entryId = entry.id; return { index: idx }; }
      }
      return { error: "exhausted" };
    }
    if (stage === "hex") return { index: rand(D.uiCurses.length) };
    if (stage === "twist") return { index: rand(D.twists.length) };
    return { error: "This wheel can't be spun right now." };
  }

  function recordOutcome(stage, idx) {
    if (stage === "soul") {
      session.charId = D.characters[idx].id;
    } else if (stage === "curse") {
      session.problem = idx;
    } else if (stage === "hex") {
      session.hex = idx;
      session.hexAt = Date.now();
      session.unlockAt = session.hexAt + delayMinutes() * 60000;
      window.Ledger.update(session.entryId, { hex: idx, hexAt: session.hexAt });
    } else if (stage === "twist") {
      var me = session.charId, myHex = session.hex;
      var others = D.characters.filter(function (c) { return c.id !== me; });
      var curses = D.uiCurses.filter(function (h, i) { return i !== myHex; });
      session.twistExtra = { randomChar: pick(others).short, randomCurse: pick(curses).t };
      session.twist = idx;
      window.Ledger.update(session.entryId, { twist: idx, twistText: fillTwist(D.twists[idx].d), doneAt: Date.now() });
    }
    // the result is locked in *before* the wheel stops — refreshing can't re-roll it
    session.pending = stage;
    save();
    saveProgress();
  }

  /** Mirror the team's whole fate to the shared ledger (judges' board, recovery). */
  function saveProgress() {
    if (!session || !session.teamKey) return;
    var p = { stage: session.pending ? session.pending + "-spun" : session.stage };
    if (session.charId) p.charId = session.charId;
    if (typeof session.problem === "number") p.problem = session.problem;
    if (typeof session.hex === "number") { p.hex = session.hex; p.hexAt = session.hexAt; p.unlockAt = session.unlockAt; }
    if (typeof session.twist === "number") { p.twist = session.twist; p.twistText = fillTwist(D.twists[session.twist].d); p.twistExtra = session.twistExtra; }
    if (session.eggs && session.eggs.length) p.eggs = session.eggs.slice();
    window.Ledger.saveProgress(session.teamKey, p);
  }

  async function spin(auto) {
    if (busy || !session) return;
    var stage = session.stage;
    if (["soul", "curse", "hex", "twist"].indexOf(stage) < 0) return;

    busy = true;
    resetIdle();
    var who = spinnerFor(stage);
    updateSpinner(stage, auto === true ? who.idle : who.spin);
    el.spinner.classList.remove("grab"); void el.spinner.offsetWidth; el.spinner.classList.add("grab");
    setSpinState(stage);
    if (stage === "curse") el.spinLabel.textContent = "Consulting the crypt…";
    var out = await chooseOutcome(stage);
    if (out.error) {
      busy = false;
      resetIdle();
      updateSpinner(stage);
      if (out.error === "exhausted") {
        // every problem for this character got taken — send them back to the first wheel
        session.charId = null; session.stage = "soul"; save();
        render(true);
        el.sub.textContent = "That soul's curses have all been claimed. Spin for a new soul.";
      } else {
        setSpinState(stage);
        el.sub.textContent = out.error;
        el.stage.classList.add("shake");
        setTimeout(function () { el.stage.classList.remove("shake"); }, 500);
      }
      return;
    }

    recordOutcome(stage, out.index);
    // the curse wheel shows the team's own claim as available
    if (stage === "curse") wheel.setSegments(curseSegments(charById(session.charId)), wheel.theme);

    setSpinState(stage);
    el.stage.classList.add("spinning");
    window.Sound.whoosh();
    wheel.spin(out.index, { onTick: function (v) { window.Sound.tick(v); } }).then(function () {
      el.stage.classList.remove("spinning");
      setTimeout(function () { showCard(stage); }, 450);
    });
  }

  /* ---------- reveal card ---------- */

  function showCard(stage) {
    var c = charById(session.charId);
    var kicker, glyph, name, lore = "", desc = "", btn, accent = "#c4161c";
    if (stage === "soul") {
      kicker = "Your soul is"; glyph = c.glyph; name = c.name; lore = c.lore; btn = "Accept your soul"; accent = c.color;
    } else if (stage === "curse") {
      var p = c.problems[session.problem];
      kicker = c.short + "'s curse"; glyph = c.glyph; name = p.t; desc = p.d; btn = "Accept the curse"; accent = c.color;
    } else if (stage === "hex") {
      var h = D.uiCurses[session.hex];
      kicker = "A hex upon your UI"; glyph = h.glyph; name = h.t; desc = h.d; btn = "Accept the hex"; accent = "#ff7a1a";
    } else {
      var t = D.twists[session.twist];
      kicker = "The twist"; glyph = t.glyph; name = t.t; desc = fillTwist(t.d); btn = "Seal my fate"; accent = "#ff3326";
    }
    el.cardKicker.textContent = kicker;
    el.cardGlyph.textContent = glyph;
    el.cardGlyph.classList.toggle("text-glyph", !isEmoji(glyph));
    el.cardName.textContent = name;
    el.cardLore.textContent = lore;
    el.cardDesc.textContent = desc;
    el.cardScope.textContent = stage === "curse" ? D.scopeNote : "";
    el.cardBtn.textContent = btn;
    el.card.querySelector(".card-front").style.setProperty("--accent", accent);
    el.cardGlyph.style.setProperty("--accent", accent);

    el.reveal.hidden = false;
    el.card.style.animation = "none"; void el.card.offsetWidth; el.card.style.animation = "";
    window.Sound.reveal();
    announce(kicker + ": " + name + ". " + desc);
    setTimeout(function () { el.cardBtn.focus({ preventScroll: true }); }, 900);
  }

  function acceptCard() {
    el.reveal.hidden = true;
    var stage = session.pending;
    session.pending = null;
    if (stage === "soul") session.stage = "curse";
    else if (stage === "curse") session.stage = "hex";
    else if (stage === "hex") session.stage = Date.now() >= session.unlockAt ? "twist" : "wait";
    else if (stage === "twist") session.stage = "done";
    save();
    saveProgress();
    busy = false;
    resetIdle();
    render(stage !== "twist");
    renderGrimoire(true);
    if (window.innerWidth < 980 && stage === "twist") {
      document.querySelector(".grimoire").scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      el.stage.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  /* ---------- ledger (team sign-in) ---------- */

  function alreadyRegistered() {
    var d = window.Store.deviceTeam();
    return d ? "This phone has already signed the ledger as “" + d.team + "”. Each team gets one registration." : "";
  }

  var signing = false;
  el.form.addEventListener("submit", async function (e) {
    e.preventDefault();
    if (signing || session) return;
    var name = el.teamInput.value.replace(/\s+/g, " ").trim();

    // the judges' secret name opens their board instead of registering a team
    if (window.Store.secret(name) === D.judgeKey) {
      window.Store.setJudgePass(D.judgeKey);
      el.teamInput.value = "";
      el.teamError.textContent = "";
      if (window.Sound.farBell) window.Sound.farBell();
      document.body.classList.add("judge-door");
      setTimeout(function () { location.href = "judges.html"; }, 900);
      return;
    }

    if (alreadyRegistered()) { el.teamError.textContent = alreadyRegistered(); return; }
    if (name.length < 2) { el.teamError.textContent = "The ledger needs a real name — at least two letters."; el.teamInput.focus(); return; }
    if (window.Ledger.teamExists(name)) { el.teamError.textContent = "That name is already written in the ledger. Choose another."; el.teamInput.focus(); return; }
    el.teamError.textContent = "";

    var btn = el.form.querySelector("button[type=submit] span");
    var label = btn.textContent;
    signing = true;
    btn.textContent = "Inscribing…";
    var res;
    try {
      await window.Ledger.ready();
      // a restore may have happened while we waited
      if (session || alreadyRegistered()) res = { ok: false, error: alreadyRegistered() || "" };
      else res = await window.Ledger.registerTeam(name);
    } catch (err) {
      res = { ok: false, error: window.Ledger.friendly(err) };
    }
    signing = false;
    btn.textContent = label;
    if (session) return;
    if (!res.ok) { el.teamError.textContent = res.error; el.teamInput.focus(); return; }

    session = { team: name, teamKey: res.key, stage: "soul", startedAt: Date.now(), eggs: [] };
    window.Store.lockDevice(name, res.key);
    save();
    resetIdle();
    window.Sound.whoosh();
    render(true);
    el.stage.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  el.teamInput.addEventListener("input", function () { el.teamError.textContent = ""; });

  /* ---------- controls ---------- */

  el.spinBtn.addEventListener("click", function () { spin(false); });
  el.hub.addEventListener("click", function () { spin(false); });
  el.cardBtn.addEventListener("click", acceptCard);

  /* ---------- hidden bonus points ---------- */

  var EGG_IDS = D.eggsEnabled ? Object.keys(D.eggs || {}) : [];
  document.body.classList.toggle("eggs-on", !!D.eggsEnabled);

  function renderEggs() {
    var box = $("eggCount");
    if (!box) return;
    var n = session && session.eggs ? session.eggs.length : 0;
    box.hidden = !session || !EGG_IDS.length;
    box.textContent = "🎃 Hidden pumpkins: " + n + " / " + EGG_IDS.length;
  }

  /** Called by js/eggs.js when a hidden pumpkin or secret is found. */
  function claimEgg(id) {
    if (!D.eggsEnabled || !D.eggs || !D.eggs[id]) return "unknown";
    if (!session) { window.Eggs && window.Eggs.toast("🎃 Sign the ledger first… then come back for me."); return "no-team"; }
    session.eggs = session.eggs || [];
    if (session.eggs.indexOf(id) >= 0) { window.Eggs && window.Eggs.toast("🎃 Already in your grimoire."); return "dupe"; }
    session.eggs.push(id);
    save();
    saveProgress();
    renderEggs();
    window.Eggs && window.Eggs.toast("🎃 Bonus point! " + D.eggs[id] + " (" + session.eggs.length + "/" + EGG_IDS.length + ")");
    if (window.Sound.bell) window.Sound.bell();
    return "ok";
  }
  window.App = { claimEgg: claimEgg, hasEgg: function (id) { return !!(session && session.eggs && session.eggs.indexOf(id) >= 0); } };

  function openModal(m) { m.hidden = false; var f = m.querySelector("button, input"); if (f) setTimeout(function () { f.focus(); }, 30); }
  function closeModal(m) { m.hidden = true; }
  Array.prototype.forEach.call(document.querySelectorAll(".modal"), function (m) {
    m.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) closeModal(m); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") Array.prototype.forEach.call(document.querySelectorAll(".modal"), closeModal);
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "H" || e.key === "h")) { e.preventDefault(); openHost(); }
  });

  /* ---------- organisers: back to the sign-in page ---------- */
  // TEMPORARY testing aid. Type  mtchome  anywhere (not in a text box) to forget
  // this phone's team and return to the team-name form. Only this browser
  // forgets: every team stays registered in the ledger, so typing a team name
  // again shows straight away whether it was saved.
  var HOME_WORD = "mtchome", homeTyped = "";
  document.addEventListener("keydown", function (e) {
    var tg = e.target;
    if (tg && (tg.tagName === "INPUT" || tg.tagName === "TEXTAREA" || tg.isContentEditable)) return;
    if (!e.key || e.key.length !== 1) return;
    homeTyped = (homeTyped + e.key.toLowerCase()).slice(-HOME_WORD.length);
    if (homeTyped !== HOME_WORD) return;
    window.Store.clearSession();
    window.Store.unlockDevice();
    try { sessionStorage.setItem("woc.home", "1"); } catch (err) {}
    location.reload();
  });
  var wentHome = false;
  try { wentHome = sessionStorage.getItem("woc.home") === "1"; } catch (err) {}

  /* ---------- sound toggle ---------- */

  function setSound(on) {
    var ok = window.Sound.setEnabled(on);
    el.soundBtn.setAttribute("aria-pressed", ok ? "true" : "false");
    el.soundBtn.setAttribute("aria-label", ok ? "Turn sound off" : "Turn sound on");
    window.Store.setPref("sound", ok);
  }
  el.soundBtn.addEventListener("click", function () { setSound(!window.Sound.enabled); });

  /* ---------- jump-scare toggle ---------- */

  function setScares(on) {
    window.Creatures.setScares(on);
    el.scareBtn.setAttribute("aria-pressed", on ? "true" : "false");
    el.scareBtn.setAttribute("aria-label", on ? "Jump scares on — turn off" : "Jump scares off — turn on");
    window.Store.setPref("scares", on);
  }
  el.scareBtn.addEventListener("click", function () { setScares(!window.Creatures.scaresOn); });

  /* ---------- the entry gate ---------- */
  // Browsers only allow sound after a tap, so entering the crypt is that tap.

  function enter(withSound) {
    el.gate.classList.add("gone");
    setSound(withSound);
    resetIdle();
    setTimeout(function () { window.Creatures.opening(); }, 250);
  }
  $("gateEnter").addEventListener("click", function () { enter(true); });
  $("gateQuiet").addEventListener("click", function () { enter(false); });

  /* ---------- host ledger ---------- */

  var brandTaps = [];
  el.brand.addEventListener("click", function () {
    var now = Date.now();
    brandTaps = brandTaps.filter(function (t) { return now - t < 2500; });
    brandTaps.push(now);
    if (brandTaps.length >= 5) { brandTaps = []; openHost(); }
  });

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  function renderHost() {
    var L = window.Ledger;
    var ledger = L.entries();
    var cloud = L.mode === "cloud";
    var canAct = L.isHost;

    $("hostMode").innerHTML = cloud
      ? "Shared ledger · <b>" + esc(statusText(L.status)) + "</b> — every phone sees the same claims."
      : "Single-device mode — the ledger lives only in this browser. Add a Firebase config to share it across phones.";
    $("hostAuth").hidden = !cloud;
    $("hostSignedOut").hidden = canAct;
    $("hostSignedIn").hidden = !canAct;
    $("hostWho").textContent = L.hostEmail;
    $("hostImportLabel").hidden = cloud;
    $("hostDelay").disabled = !canAct;
    $("hostReset").disabled = !canAct;
    $("hostFree").disabled = !canAct;
    $("hostDelayHint").textContent = cloud ? "Applies to every phone, for teams that spin the hex after the change." : "Applies to this device only.";

    $("hostCount").textContent = "(" + ledger.length + ")";
    if (document.activeElement !== $("hostDelay")) $("hostDelay").value = delayMinutes();

    $("hostStats").innerHTML = D.characters.map(function (c) {
      var used = Object.keys(window.Ledger.usedProblems(c.id)).length, total = c.problems.length;
      return '<div class="stat"><div class="stat-top"><span>' + c.glyph + " " + esc(c.short) + "</span><span>" + (total - used) + "/" + total + '</span></div><div class="stat-bar"><i style="width:' + (used / total * 100) + '%"></i></div></div>';
    }).join("");

    var rows = ledger.slice().reverse().map(function (e, i) {
      var c = charById(e.charId);
      var p = c && c.problems[e.problem];
      var h = typeof e.hex === "number" ? D.uiCurses[e.hex] : null;
      var t = typeof e.twist === "number" ? D.twists[e.twist] : null;
      return "<tr><td class='muted'>" + (ledger.length - i) + "</td><td>" + esc(e.team) + "</td><td>" + (c ? c.glyph + " " + esc(c.short) : "?") +
        "</td><td>" + (p ? esc(p.t) : "?") + "</td><td>" + (h ? esc(h.t) : "<span class='muted'>—</span>") +
        "</td><td>" + (t ? esc(t.t) : "<span class='muted'>—</span>") + "</td><td class='muted'>" + new Date(e.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) +
        "</td><td>" + (canAct ? "<button type='button' data-release='" + esc(e.id) + "'>Release</button>" : "") + "</td></tr>";
    }).join("");
    $("hostTable").innerHTML = "<thead><tr><th>#</th><th>Team</th><th>Soul</th><th>Curse</th><th>Hex</th><th>Twist</th><th>Time</th><th></th></tr></thead><tbody>" +
      (rows || "<tr><td colspan='8' class='muted'>No souls claimed yet.</td></tr>") + "</tbody>";
  }

  function openHost() { renderHost(); $("hostNote").textContent = ""; openModal(el.host); }
  if (/[?#&]host\b/.test(location.search + location.hash)) setTimeout(openHost, 300);

  function hostNote(msg, bad) {
    var n = $("hostNote");
    n.textContent = msg;
    n.classList.toggle("bad", !!bad);
  }

  $("hostTable").addEventListener("click", async function (e) {
    var b = e.target.closest("[data-release]");
    if (!b) return;
    if (!window.confirm("Release this claim? Its curse becomes available to other teams again.")) return;
    try {
      await window.Ledger.release(b.getAttribute("data-release"));
      hostNote("Claim released.");
    } catch (err) { hostNote(window.Ledger.friendly(err), true); }
    renderHost();
  });

  $("hostDelay").addEventListener("change", async function () {
    var v = parseFloat(this.value);
    if (isNaN(v) || v < 0) v = D.twistDelayMinutes;
    try {
      await window.Ledger.setDelay(v);
      hostNote(window.Ledger.mode === "cloud" ? "Every phone will now wait " + v + " min for the twist." : "New teams on this device will wait " + v + " min for the twist.");
      $("rulesDelay").textContent = v;
    } catch (err) { hostNote(window.Ledger.friendly(err), true); }
  });

  $("hostLogin").addEventListener("submit", async function (e) {
    e.preventDefault();
    hostNote("Signing in…");
    try {
      await window.Ledger.signInHost($("hostEmail").value.trim(), $("hostPass").value);
      $("hostPass").value = "";
      hostNote("Signed in as host.");
    } catch (err) { hostNote(window.Ledger.friendly(err), true); }
    renderHost();
  });
  $("hostLogout").addEventListener("click", async function () {
    await window.Ledger.signOutHost();
    hostNote("Signed out.");
    renderHost();
  });

  function download(name, text, type) {
    var blob = new Blob([text], { type: type });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }
  function stamp() { return new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-"); }

  $("hostExport").addEventListener("click", function () {
    download("wheel-of-curses-ledger-" + stamp() + ".json", JSON.stringify(window.Ledger.entries(), null, 2), "application/json");
  });
  $("hostCsv").addEventListener("click", function () {
    var q = function (s) { return '"' + String(s == null ? "" : s).replace(/"/g, '""') + '"'; };
    var lines = [["Team", "Character", "Problem", "Problem brief", "UI hex", "Twist", "Twist brief", "Claimed at"].map(q).join(",")];
    window.Ledger.entries().forEach(function (e) {
      var c = charById(e.charId), p = c && c.problems[e.problem];
      var h = typeof e.hex === "number" ? D.uiCurses[e.hex] : null, t = typeof e.twist === "number" ? D.twists[e.twist] : null;
      lines.push([e.team, c && c.name, p && p.t, p && p.d, h && h.t, t && t.t, e.twistText, new Date(e.at).toLocaleString()].map(q).join(","));
    });
    download("wheel-of-curses-" + stamp() + ".csv", "﻿" + lines.join("\r\n"), "text/csv");
  });
  $("hostImport").addEventListener("change", function () {
    var f = this.files && this.files[0], input = this;
    if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var res = window.Ledger.merge(JSON.parse(r.result));
        hostNote("Merged " + res.added + " claim(s)." + (res.clashes.length ? " " + res.clashes.length + " clash(es): the later team must re-spin — " + res.clashes.map(function (c) { return c.dropped.team; }).join(", ") : ""));
      } catch (err) { hostNote("Couldn't read that file: " + err.message, true); }
      input.value = "";
      renderHost();
    };
    r.readAsText(f);
  });
  $("hostReset").addEventListener("click", async function () {
    var where = window.Ledger.mode === "cloud" ? "for EVERY phone" : "on this device";
    var typed = window.prompt("This erases every team and frees every curse " + where + ". Type WIPE to confirm.");
    if (typed !== "WIPE") return;
    hostNote("Wiping…");
    try {
      await window.Ledger.wipe();
      window.Store.clearSession();
      window.Store.unlockDevice();
      session = null;
      render(false);
      hostNote("Ledger wiped.");
    } catch (err) { hostNote(window.Ledger.friendly(err), true); }
    renderHost();
  });

  // Each phone registers once. For a test run (or a broken phone) the host can
  // release THIS phone so a new team can sign in on it.
  $("hostFree").addEventListener("click", function () {
    var d = window.Store.deviceTeam();
    if (!window.confirm("Free this phone? " + (d ? "It is bound to “" + d.team + "”. " : "") + "That team's fate stays in the ledger; this phone can register a new team.")) return;
    window.Store.unlockDevice();
    window.Store.clearSession();
    session = null;
    render(false);
    hostNote(window.Ledger.mode === "cloud" ? "Phone freed. Sign out of the host account before handing it to a team." : "Phone freed.");
  });

  // the host doesn't need the secret name to open the judges' board
  $("hostJudges").addEventListener("click", function () {
    if (window.Ledger.isHost) window.Store.setJudgePass(D.judgeKey);
  });

  /* ---------- live updates ---------- */

  function statusText(s) {
    return { connecting: "Summoning the crypt…", online: "Crypt linked", offline: "Offline — reconnecting", error: "Crypt unreachable", local: "Local mode" }[s] || s;
  }

  var crypt = $("crypt"), cryptText = $("cryptText");
  function renderStatus() {
    var L = window.Ledger;
    crypt.hidden = L.mode !== "cloud";
    crypt.setAttribute("data-state", L.status);
    cryptText.textContent = statusText(L.status);
    crypt.title = L.error || "";
  }

  var liveQueued = false;
  window.Ledger.onChange(function () {
    if (liveQueued) return;
    liveQueued = true;
    requestAnimationFrame(function () {
      liveQueued = false;
      renderStatus();
      $("rulesDelay").textContent = delayMinutes();
      // other phones' claims strike out segments on this wheel as they happen
      if (session && !busy && el.reveal.hidden && (session.stage === "soul" || session.stage === "curse")) render(false);
      if (!el.host.hidden) renderHost();
    });
  });

  // keep several tabs on the same device in sync
  window.addEventListener("storage", function (e) {
    if (e.key === window.Store.sessionKey && !busy && el.reveal.hidden) {
      session = window.Store.session();
      if (el.reveal.hidden) render(false);
    }
  });

  /* ---------- boot ---------- */

  $("year").textContent = new Date().getFullYear();
  $("rulesDelay").textContent = delayMinutes();
  window.Creatures.init({ isBusy: function () { return busy || !el.reveal.hidden || !el.gate.classList.contains("gone"); } });
  setScares(window.Store.prefs().scares !== false);
  renderStatus();
  render(true);

  function resumePending() {
    // a result was decided but the page reloaded before it was shown
    if (!session || !session.pending) return;
    var stg = session.pending;
    if (stg === "soul" || stg === "curse" || stg === "hex" || stg === "twist") {
      if (stg === "soul") wheel.show(D.characters.map(function (c) { return c.id; }).indexOf(session.charId));
      if (stg === "curse") wheel.show(session.problem);
      if (stg === "hex") wheel.show(session.hex);
      if (stg === "twist") wheel.show(session.twist);
      busy = true;
      showCard(stg);
    }
  }
  setTimeout(resumePending, 600);

  // One registration per phone: a phone that already has a team is locked to it.
  if (session && !window.Store.deviceTeam()) window.Store.lockDevice(session.team, session.teamKey || window.Ledger.teamKey(session.team));

  // Lost the session on this phone (cleared storage, crash)? If the ledger
  // knows the team this phone registered, pick up exactly where it was —
  // including a finished team, which simply sees its sealed fate again.
  if (!session && !wentHome) {
    window.Ledger.ready().then(function () {
      if (session) return;
      var lock = window.Store.deviceTeam();
      var t = lock ? window.Ledger.teams().filter(function (x) { return x.key === lock.key; })[0] : null;
      if (!t) t = window.Ledger.myTeam();
      if (!t) {
        // the host wiped the event, so this phone may register again
        if (lock && (window.Ledger.mode === "local" || window.Ledger.status === "online")) window.Store.unlockDevice();
        return;
      }
      window.Store.lockDevice(t.name, t.key);
      var restored = { team: t.name, teamKey: t.key, startedAt: t.at || Date.now(), stage: t.stage || "soul", eggs: (t.eggs || []).slice() };
      ["charId", "problem", "hex", "hexAt", "unlockAt", "twist", "twistExtra"].forEach(function (k) { if (t[k] != null) restored[k] = t[k]; });
      if (restored.charId && typeof restored.problem === "number") restored.entryId = restored.charId + "__" + restored.problem;
      // "<stage>-spun" = the wheel had stopped but the card wasn't accepted yet
      var m = /^(soul|curse|hex|twist)-spun$/.exec(restored.stage);
      if (m) { restored.stage = m[1]; restored.pending = m[1]; }
      if (restored.stage === "twist" && restored.unlockAt && Date.now() < restored.unlockAt && typeof restored.twist !== "number") restored.stage = "wait";
      session = restored;
      save();
      render(true);
      resumePending();
      announce("Welcome back, " + t.name + ". Your fate was waiting for you.");
    });
  }
})();
