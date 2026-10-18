/* =========================================================
   Creatures — zombies and ghosts, seen mostly as shadows.
   • when the lightning cracks, figures stand silhouetted on
     the hill — gone when the flash fades
   • wraiths fly across the sky
   • a zombie crosses in front of the moon
   • a ghost's face appears in the haunted-house window
   • zombie hands claw up out of the ground
   Big moments: opening(), impatience(), jumpscare(), awaken().
   setMood("tense") (twist wheel chained) = more often.

   Want your own figure art? Put transparent PNG/SVG files in
   assets/figures/ and list them in CURSE_DATA.shadowFigures
   (js/data.js) — the lightning and the sky will use them.
   ========================================================= */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var front, back, mood = "calm", scaresOn = true, isBusy = function () { return false; };
  var peekTimer = null, scareTimer = null, lastPeek = "";
  var custom = (window.CURSE_DATA && window.CURSE_DATA.shadowFigures) || [];

  /* ---------- silhouettes ---------- */

  var INK = "#030104";
  var GLOW = '<defs><radialGradient id="zGlow"><stop offset="0" stop-color="#e6ffb0" stop-opacity=".9"/><stop offset="1" stop-color="#b8ff6a" stop-opacity="0"/></radialGradient>' +
             '<linearGradient id="gVeil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4e9ff" stop-opacity=".62"/><stop offset=".55" stop-color="#b9c4ff" stop-opacity=".3"/><stop offset="1" stop-color="#9aa8ff" stop-opacity="0"/></linearGradient></defs>';

  // side-on, hunched, arms out, one leg dragging — faces right
  var ZOMBIE =
    '<svg viewBox="0 0 170 260" xmlns="http://www.w3.org/2000/svg">' + GLOW +
    '<g class="zleg zleg-back" stroke="' + INK + '" stroke-width="12" stroke-linecap="round" fill="none"><path d="M66 150 C58 188 48 220 34 248 l-12 6"/></g>' +
    '<g fill="' + INK + '">' +
      '<path d="M74 58 C62 64 52 84 54 108 C56 128 60 140 58 150 L96 152 C98 132 102 110 100 90 C98 74 90 62 74 58Z"/>' +
      '<path d="M56 146 L61 163 L68 149 L73 166 L80 150 L86 162 L92 149 L97 158 L96 146Z"/>' +
      '<ellipse cx="98" cy="46" rx="17" ry="21" transform="rotate(28 98 46)"/>' +
      '<path d="M100 62 L112 78 L98 72Z"/>' +
    '</g>' +
    '<g class="zarms" stroke="' + INK + '" stroke-linecap="round" fill="none">' +
      '<path d="M88 76 C110 80 132 86 152 88" stroke-width="9"/><path d="M84 88 C104 96 126 100 146 106" stroke-width="9"/>' +
      '<path d="M152 88 l9 3 M152 88 l8 8 M152 88 l4 11 M146 106 l9 2 M146 106 l7 8 M146 106 l3 10" stroke-width="3"/>' +
    '</g>' +
    '<g stroke="' + INK + '" stroke-width="2" fill="none" stroke-linecap="round"><path d="M84 30 q-10 -8 -18 -4"/><path d="M90 26 q-4 -12 -14 -14"/><path d="M80 40 q-12 2 -16 10"/></g>' +
    '<g class="zleg zleg-front" stroke="' + INK + '" stroke-width="12" stroke-linecap="round" fill="none"><path d="M88 150 C94 188 100 220 106 252 l14 2"/></g>' +
    '<circle class="zeye" cx="107" cy="43" r="5" fill="url(#zGlow)"/><circle class="zeye" cx="107" cy="43" r="1.4" fill="#f0ffd0"/>' +
    '</svg>';

  // standing still, arms hanging — for the lightning reveals
  var STANDER =
    '<svg viewBox="0 0 120 260" xmlns="http://www.w3.org/2000/svg">' +
    '<g fill="' + INK + '">' +
      '<ellipse cx="62" cy="30" rx="16" ry="20" transform="rotate(-12 62 30)"/>' +
      '<path d="M44 54 C36 60 34 80 36 110 C38 132 40 146 40 156 L82 156 C82 140 86 118 86 96 C86 74 80 58 70 52Z"/>' +
      '<path d="M40 150 L44 168 L52 154 L58 170 L66 154 L74 168 L82 150Z"/>' +
    '</g>' +
    '<g stroke="' + INK + '" stroke-linecap="round" fill="none">' +
      '<path d="M42 66 C30 100 26 140 24 178" stroke-width="8"/><path d="M80 64 C92 98 96 136 98 172" stroke-width="8"/>' +
      '<path d="M50 154 C48 196 46 226 44 256" stroke-width="12"/><path d="M72 154 C76 196 80 226 84 256" stroke-width="12"/>' +
      '<path d="M24 178 l-5 12 M24 178 l1 13 M98 172 l5 12 M98 172 l-1 13" stroke-width="3"/>' +
    '</g></svg>';

  // a hooded wraith, flying right, tattered tail streaming behind
  var WRAITH =
    '<svg viewBox="0 0 230 90" xmlns="http://www.w3.org/2000/svg">' + GLOW +
    '<path fill="' + INK + '" d="M196 34 C200 24 192 14 180 16 C170 18 164 28 166 38 C150 36 130 30 110 34 C90 38 70 30 50 36 C40 40 24 34 8 44 C26 46 36 52 50 50 C64 58 80 52 96 60 C112 66 128 56 146 60 C158 62 170 58 178 52 C188 50 196 44 196 34Z"/>' +
    '<path fill="' + INK + '" d="M30 44 L4 36 L22 46 L2 54 L26 50Z M62 54 L44 70 L66 58Z M100 60 L88 80 L108 62Z"/>' +
    '<g stroke="' + INK + '" stroke-linecap="round" fill="none"><path d="M176 46 C190 50 202 54 214 54" stroke-width="5"/><path d="M214 54 l8 -3 M214 54 l9 2 M214 54 l7 6" stroke-width="2"/></g>' +
    '<circle cx="187" cy="28" r="5" fill="url(#zGlow)"/><circle cx="187" cy="28" r="1.3" fill="#f0ffd0"/>' +
    '</svg>';

  // front-on: for the jump scare
  var ZOMBIE_FACE =
    '<svg viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg">' + GLOW +
    '<path fill="' + INK + '" d="M100 14 C58 12 30 44 30 92 C30 120 38 146 52 166 L48 230 L152 230 L148 166 C162 146 170 120 170 92 C170 44 142 16 100 14Z"/>' +
    '<path fill="' + INK + '" d="M34 78 L24 58 L38 62 L34 34 L50 46 L52 18 L64 36 L74 10 L84 32 L94 6 L102 28 L112 4 L120 28 L132 8 L136 34 L150 16 L152 44 L168 34 L162 60 L176 62 L166 80Z"/>' +
    '<path fill="' + INK + '" d="M30 96 L18 110 L32 108 L26 126 L38 116Z M170 96 L182 112 L168 108 L174 128 L162 116Z"/>' +
    '<circle cx="72" cy="92" r="20" fill="url(#zGlow)"/><circle cx="72" cy="92" r="5" fill="#f4ffd8"/>' +
    '<circle cx="130" cy="88" r="15" fill="url(#zGlow)"/><circle cx="130" cy="88" r="3.6" fill="#f4ffd8"/>' +
    '<path d="M68 134 Q100 122 134 132 L128 186 Q100 204 74 186Z" fill="#2a0204"/>' +
    '<g fill="' + INK + '"><path d="M74 134 l6 12 l6 -13z"/><path d="M90 130 l5 14 l5 -14z"/><path d="M106 130 l4 11 l5 -11z"/><path d="M120 132 l5 13 l4 -12z"/>' +
    '<path d="M80 186 l5 -12 l5 13z"/><path d="M98 192 l5 -13 l5 13z"/><path d="M114 188 l4 -11 l5 10z"/></g>' +
    '</svg>';

  var HAND =
    '<svg viewBox="0 0 120 230" xmlns="http://www.w3.org/2000/svg">' +
    '<g fill="' + INK + '"><path d="M48 230 L50 124 L74 122 L80 230Z"/><path d="M38 128 C32 100 42 84 62 82 C84 80 94 96 88 126Z"/></g>' +
    '<g stroke="' + INK + '" stroke-width="7" stroke-linecap="round" fill="none">' +
      '<path d="M46 90 Q34 56 18 38 Q12 30 14 22"/><path d="M56 84 Q54 46 46 20 Q44 12 48 6"/><path d="M70 84 Q78 46 80 18 Q80 10 86 6"/><path d="M84 92 Q100 62 108 42 Q112 34 118 32"/><path d="M40 112 Q20 106 8 88"/>' +
    '</g></svg>';

  // a tall veiled apparition: gaunt, hollow-eyed, jaw hanging open
  var GHOST =
    '<svg viewBox="0 0 120 240" xmlns="http://www.w3.org/2000/svg">' + GLOW +
    '<path fill="url(#gVeil)" d="M60 6 C46 6 40 18 40 34 C40 48 44 56 46 60 C32 70 26 92 24 122 C22 160 16 200 6 238 L22 226 L34 238 L48 224 L60 238 L72 224 L86 238 L98 226 L114 238 C104 200 98 160 96 122 C94 92 88 70 74 60 C76 56 80 48 80 34 C80 18 74 6 60 6Z"/>' +
    '<path fill="none" stroke="#dfe5ff" stroke-opacity=".3" stroke-width="2.5" stroke-linecap="round" d="M30 96 C16 118 10 140 8 166 M90 96 C104 118 110 140 112 166"/>' +
    '<ellipse cx="53" cy="32" rx="3.4" ry="8.5" fill="#05020a" opacity=".9" transform="rotate(8 53 32)"/>' +
    '<ellipse cx="67" cy="32" rx="3.4" ry="8.5" fill="#05020a" opacity=".9" transform="rotate(-8 67 32)"/>' +
    '<path d="M57 46 Q60 44 63 46 L62 64 Q60 67 58 64Z" fill="#05020a" opacity=".85"/>' +
    '</svg>';

  var GHOST_FACE =
    '<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">' + GLOW +
    '<path fill="url(#gVeil)" d="M30 2 C14 2 6 16 6 32 C6 52 14 68 30 68 C46 68 54 52 54 32 C54 16 46 2 30 2Z"/>' +
    '<ellipse cx="22" cy="30" rx="4" ry="6" fill="#05020a"/><ellipse cx="38" cy="30" rx="4" ry="6" fill="#05020a"/><ellipse cx="30" cy="48" rx="4" ry="8" fill="#05020a"/>' +
    '</svg>';

  /* ---------- helpers ---------- */

  function el(cls, html) {
    var d = document.createElement("div");
    d.className = "creature " + cls;
    d.innerHTML = html;
    return d;
  }
  function img(cls, src) {
    var d = document.createElement("div");
    d.className = "creature custom " + cls;
    var i = document.createElement("img");
    i.src = src; i.alt = ""; i.decoding = "async";
    d.appendChild(i);
    return d;
  }
  function spawn(host, node, ms) {
    host.appendChild(node);
    setTimeout(function () { node.remove(); }, ms);
    return node;
  }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
  function S() { return window.Sound || {}; }

  /* ---------- the lightning reveal ---------- */

  // Figures standing in the graveyard, only visible against the flash. While
  // the lightning lasts the whole page goes see-through (body.lit), so you
  // see straight past it to them.
  function revealInFlash(min, max) {
    var horde = document.getElementById("horde") || front;
    if (!horde || reduceMotion) return;
    var n = min + Math.floor(Math.random() * (max - min + 1));
    var slots = [];
    for (var i = 0; i < n; i++) {
      var x;
      do { x = rnd(3, 90); } while (slots.some(function (s) { return Math.abs(s - x) < 9; }) && slots.length < 8);
      slots.push(x);
      var f = custom.length ? img("flashed", pick(custom))
        : Math.random() < 0.7 ? el("flashed" + (Math.random() < 0.5 ? " rtl" : ""), Math.random() < 0.5 ? STANDER : ZOMBIE)
        : el("flashed ghosty", GHOST);
      f.style.setProperty("--x", x + "vw");
      f.style.setProperty("--h", rnd(18, 34) + "vh");
      f.style.setProperty("--b", rnd(4, 12) + "vh");
      spawn(horde, f, 1400);
    }
  }
  window.addEventListener("woc:lightning", function () {
    if (Math.random() < 0.85) revealInFlash(2, 6);
  });

  /* ---------- appearances ---------- */

  var peeks = {
    // wraiths fly across the sky
    flyers: function () {
      var rtl = Math.random() < 0.5;
      var n = 1 + Math.floor(Math.random() * 3);
      for (var i = 0; i < n; i++) {
        var w = custom.length ? img("flyer" + (rtl ? " rtl" : ""), pick(custom)) : el("flyer" + (rtl ? " rtl" : ""), WRAITH);
        w.style.setProperty("--y", rnd(6, 34) + "vh");
        w.style.setProperty("--w", rnd(90, 170) + "px");
        w.style.setProperty("--d", rnd(9, 14) + "s");
        w.style.animationDelay = (i * rnd(0.5, 1.4)) + "s";
        spawn(front, w, 17000);
      }
      if (S().whisper) setTimeout(function () { S().whisper(); }, 1200);
    },
    // a zombie crosses in front of the moon
    moon: function () {
      var m = document.querySelector(".moon");
      var r = m && m.getBoundingClientRect();
      if (!r || r.width < 40) return peeks.flyers();
      var z = el("moonwalker", ZOMBIE);
      z.style.top = (r.top + r.height * 0.3) + "px";
      z.style.left = (r.left - r.width * 0.3) + "px";
      z.style.height = (r.height * 0.8) + "px";
      z.style.setProperty("--w", (r.width * 1.6) + "px");
      spawn(front, z, 16000);
      if (S().groan) setTimeout(function () { S().groan(0.7); }, 3000);
    },
    // a ghost's face in the haunted-house window
    window: function () {
      var w = document.querySelector(".graveyard .w1");
      var r = w && w.getBoundingClientRect();
      if (!r || r.width < 2) return peeks.flyers();
      var g = el("in-window", GHOST_FACE);
      g.style.left = (r.left + r.width / 2) + "px";
      g.style.top = (r.top + r.height / 2) + "px";
      g.style.width = Math.max(14, r.width * 2.2) + "px";
      spawn(back, g, 7000);
      if (S().theremin) setTimeout(function () { S().theremin(); }, 600);
    },
    // hands claw up out of the ground
    hands: function () {
      var n = 1 + Math.floor(Math.random() * 3);
      for (var i = 0; i < n; i++) {
        var h = el("peek-hand", HAND);
        h.style.setProperty("--x", rnd(6, 90) + "vw");
        h.style.setProperty("--r", rnd(-16, 16) + "deg");
        h.style.animationDelay = (i * 0.5) + "s";
        spawn(front, h, 5600);
      }
      if (S().creak) S().creak();
    },
    // a sudden flash out of nowhere — and they're standing there
    lightning: function () {
      if (window.FX && window.FX.strike) window.FX.strike();
    }
  };
  var WEIGHTS = ["flyers", "flyers", "lightning", "lightning", "moon", "window", "hands"];

  function peek() {
    if (document.hidden || isBusy()) return;
    var names = WEIGHTS.filter(function (n) { return n !== lastPeek; });
    if (reduceMotion) names = ["window"];
    var name = pick(names);
    lastPeek = name;
    peeks[name]();
  }

  function schedulePeek() {
    clearTimeout(peekTimer);
    var wait = mood === "tense" ? rnd(12000, 24000) : rnd(18000, 34000);
    peekTimer = setTimeout(function () { peek(); schedulePeek(); }, wait);
  }

  function scheduleScare() {
    clearTimeout(scareTimer);
    if (mood !== "tense") return;
    scareTimer = setTimeout(function () {
      if (!document.hidden && !isBusy()) Creatures.jumpscare();
      scheduleScare();
    }, rnd(240000, 420000));
  }

  /* ---------- lights ---------- */

  function blackout(pattern, cb) {
    var b = document.createElement("div");
    b.className = "blackout";
    document.body.appendChild(b);
    var i = 0;
    (function next() {
      if (i >= pattern.length) { b.remove(); if (cb) cb(); return; }
      b.style.opacity = pattern[i][0];
      setTimeout(next, pattern[i++][1]);
    })();
  }
  function flash() {
    var f = document.createElement("div");
    f.className = "scare-flash";
    document.body.appendChild(f);
    setTimeout(function () { f.remove(); }, 700);
  }
  function shake() {
    document.body.classList.remove("quake"); void document.body.offsetWidth;
    document.body.classList.add("quake");
    setTimeout(function () { document.body.classList.remove("quake"); }, 600);
  }

  /* ---------- the big moments ---------- */

  var Creatures = {
    init: function (opts) {
      front = document.getElementById("creatures");
      back = document.getElementById("shadows");
      if (opts && opts.isBusy) isBusy = opts.isBusy;
      schedulePeek();
    },

    setScares: function (on) { scaresOn = !!on; },
    get scaresOn() { return scaresOn; },

    setMood: function (m) {
      if (m === mood) return;
      mood = m;
      schedulePeek();
      scheduleScare();
    },

    peek: peek,
    show: function (name) { if (peeks[name]) peeks[name](); },

    /** On entering: a laugh in the dark, the lights stutter, lightning — and they're out there. */
    opening: function () {
      if (S().laugh) S().laugh(true);
      if (reduceMotion) { peeks.window(); return; }
      blackout([[0.95, 140], [0.3, 110], [0.97, 200], [0.4, 90], [0.98, 380], [0, 10]], function () {
        if (window.FX && window.FX.strike) window.FX.strike(true);
        revealInFlash(4, 7);
      });
      setTimeout(peeks.flyers, 2600);
      setTimeout(peeks.window, 4200);
    },

    /** The team's soul has had enough: its shadow looms over everything, then it spins. */
    impatience: function (glyph, color, done) {
      if (reduceMotion) { if (done) done(); return; }
      var dim = document.createElement("div");
      dim.className = "dimmer";
      document.body.appendChild(dim);
      var s = document.createElement("div");
      s.className = "looming";
      s.style.setProperty("--c", color || "#b3122e");
      s.textContent = glyph;
      document.body.appendChild(s);
      if (S().laugh) S().laugh(true);
      if (S().monsterTheme) S().monsterTheme();
      setTimeout(function () {
        dim.classList.add("out"); s.classList.add("out");
        setTimeout(function () { dim.remove(); s.remove(); }, 700);
        if (done) done();
      }, 2300);
    },

    /** Lights out… two eyes in the dark… then it's right in front of you. */
    jumpscare: function () {
      if (!scaresOn || reduceMotion) { peek(); return; }
      blackout([[1, 1500], [1, 10]]);
      var eyes = document.createElement("div");
      eyes.className = "dark-eyes";
      eyes.innerHTML = '<svg viewBox="0 0 120 40"><defs><radialGradient id="dg"><stop offset="0" stop-color="#e6ffb0"/><stop offset="1" stop-color="#b8ff6a" stop-opacity="0"/></radialGradient></defs><circle cx="24" cy="20" r="16" fill="url(#dg)"/><circle cx="24" cy="20" r="4" fill="#f4ffd8"/><circle cx="96" cy="18" r="12" fill="url(#dg)"/><circle cx="96" cy="18" r="3" fill="#f4ffd8"/></svg>';
      document.body.appendChild(eyes);
      if (S().breath) S().breath();
      setTimeout(function () {
        eyes.remove();
        var wrap = document.createElement("div");
        wrap.className = "scare";
        wrap.innerHTML = '<div class="scare-face">' + ZOMBIE_FACE + "</div>";
        document.body.appendChild(wrap);
        if (S().scream) S().scream();
        flash(); shake();
        setTimeout(function () { wrap.remove(); }, 1300);
      }, 1450);
    },

    /** The twist wakes: the lights stutter, lightning, and a zombie crosses the moon. */
    awaken: function () {
      if (reduceMotion) return;
      blackout([[0.9, 120], [0.1, 100], [0.95, 250], [0, 10]], function () {
        if (window.FX && window.FX.strike) window.FX.strike(true);
        revealInFlash(3, 6);
      });
      setTimeout(peeks.moon, 900);
    }
  };

  window.Creatures = Creatures;
})();
