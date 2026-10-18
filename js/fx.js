/* =========================================================
   FX — stars, trees, fence, drifting motes, bats, lightning,
   the flashlight and the watching eye. All decorative, all
   paused when the tab is hidden, toned down on small devices.
   ========================================================= */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
  var lowPower = coarse || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
  var SVGNS = "http://www.w3.org/2000/svg";

  // seeded RNG so the graveyard looks the same on every load
  function rng(seed) {
    return function () {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
  }

  /* ---------- stars ---------- */
  function makeStars() {
    var host = document.getElementById("stars");
    if (!host) return;
    var r = rng(7), a = [], b = [];
    var count = lowPower ? 70 : 140;
    for (var i = 0; i < count; i++) {
      var x = (r() * 100).toFixed(2), y = (Math.pow(r(), 1.6) * 62).toFixed(2);
      var size = r() < 0.12 ? 1 : 0;
      var alpha = (0.35 + r() * 0.6).toFixed(2);
      var tone = r() < 0.15 ? "255,200,170" : "235,230,255";
      (i % 2 ? a : b).push(x + "vw " + y + "vh 0 " + size + "px rgba(" + tone + "," + alpha + ")");
    }
    host.style.boxShadow = a.join(",");
    var alt = host.cloneNode(false);
    alt.removeAttribute("id");
    alt.className = "stars alt";
    alt.style.boxShadow = b.join(",");
    host.parentNode.insertBefore(alt, host.nextSibling);
  }

  /* ---------- dead trees ---------- */
  function growTree(r, x, y, len, ang, depth, w, buckets) {
    if (depth === 0 || len < 2) return;
    var x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
    // slight crook
    var mx = (x + x2) / 2 + (r() - 0.5) * len * 0.25, my = (y + y2) / 2 + (r() - 0.5) * len * 0.25;
    var key = Math.max(0.6, Math.round(w * 2) / 2);
    (buckets[key] = buckets[key] || []).push("M" + x.toFixed(1) + " " + y.toFixed(1) + "Q" + mx.toFixed(1) + " " + my.toFixed(1) + " " + x2.toFixed(1) + " " + y2.toFixed(1));
    var kids = depth > 4 ? 2 : (r() < 0.5 ? 2 : 3);
    for (var k = 0; k < kids; k++) {
      var spread = 0.35 + r() * 0.55;
      var na = ang + (k - (kids - 1) / 2) * spread + (r() - 0.5) * 0.4;
      growTree(r, x2, y2, len * (0.62 + r() * 0.16), na, depth - 1, w * 0.62, buckets);
    }
  }

  function topEdge(path, width) {
    // sample the hill path to know where its top edge sits
    var ys = new Array(Math.ceil(width / 10) + 1);
    try {
      var L = path.getTotalLength();
      for (var d = 0; d < L; d += 4) {
        var p = path.getPointAtLength(d), b = Math.round(p.x / 10);
        if (b >= 0 && b < ys.length && (ys[b] === undefined || p.y < ys[b])) ys[b] = p.y;
      }
    } catch (e) {}
    return function (x) { var v = ys[Math.round(x / 10)]; return v === undefined ? 300 : v; };
  }

  function makeTrees() {
    var svg = document.querySelector(".graveyard");
    if (!svg) return;
    var hills = svg.querySelectorAll(":scope > path");
    var far = topEdge(hills[0], 1440), near = topEdge(hills[1], 1440);
    var r = rng(13);

    function plant(groupId, spots, edge, scale) {
      var g = document.getElementById(groupId), buckets = {};
      spots.forEach(function (s) {
        var y = edge(s[0]) + 4;
        growTree(r, s[0], y, s[1] * scale, -Math.PI / 2 + (r() - 0.5) * 0.2, 6, s[2] * scale, buckets);
      });
      Object.keys(buckets).forEach(function (w) {
        var p = document.createElementNS(SVGNS, "path");
        p.setAttribute("d", buckets[w].join(""));
        p.setAttribute("stroke-width", w);
        g.appendChild(p);
      });
    }

    plant("treesFar", [[90, 34, 7], [420, 30, 6], [770, 38, 7], [1040, 30, 6], [1390, 34, 6]], far, 1);
    plant("treesNear", [[30, 62, 13], [330, 46, 10], [700, 54, 11], [1130, 50, 11], [1420, 60, 12]], near, 1);

    // fence posts with spear tips
    var posts = document.getElementById("fencePosts"), d = "";
    for (var x = 6; x < 1440; x += 24) {
      d += "M" + x + " 360V322h4V360z M" + (x - 2) + " 323l4-11 4 11z ";
    }
    var fp = document.createElementNS(SVGNS, "path");
    fp.setAttribute("d", d);
    posts.appendChild(fp);
  }

  /* ---------- drifting motes / embers ---------- */
  function makeMotes() {
    var c = document.getElementById("motes");
    if (!c || reduceMotion) { if (c) c.style.display = "none"; return; }
    var ctx = c.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var W, H, parts = [];
    var palette = ["255,140,60", "255,90,60", "160,255,110", "200,170,255"];

    function size() {
      W = window.innerWidth; H = window.innerHeight;
      c.width = Math.round(W * dpr); c.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var target = Math.round(Math.min(lowPower ? 22 : 46, Math.max(12, (W * H) / 32000)));
      while (parts.length < target) parts.push(spawn(true));
      parts.length = target;
    }
    function spawn(anywhere) {
      return {
        x: Math.random() * W,
        y: anywhere ? Math.random() * H : H + 10,
        r: 0.6 + Math.random() * 1.8,
        vy: 0.12 + Math.random() * 0.35,
        sway: Math.random() * Math.PI * 2,
        sw: 0.004 + Math.random() * 0.01,
        c: palette[(Math.random() * palette.length) | 0],
        life: 0.4 + Math.random() * 0.6
      };
    }
    var last = 0;
    function frame(t) {
      requestAnimationFrame(frame);
      if (document.hidden) return;
      if (lowPower && t - last < 32) return; // ~30fps on phones
      var dt = last ? Math.min((t - last) / 16.7, 3) : 1;
      last = t;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.vy * dt;
        p.sway += p.sw * dt;
        p.x += Math.sin(p.sway) * 0.3 * dt;
        if (p.y < -10) parts[i] = p = spawn(false);
        var fade = Math.min(1, (H - p.y) / (H * 0.25)) * Math.min(1, p.y / (H * 0.3));
        var a = Math.max(0, fade * p.life);
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, "rgba(" + p.c + "," + a + ")");
        g.addColorStop(1, "rgba(" + p.c + ",0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
      }
    }
    size();
    window.addEventListener("resize", size);
    requestAnimationFrame(frame);
  }

  /* ---------- bats ---------- */
  var BAT_SVG =
    '<svg viewBox="0 0 100 50"><g fill="#050207">' +
    '<path class="wing l" d="M50 22 C40 8 26 6 6 12 C14 16 16 22 14 28 C22 24 28 28 30 34 C36 28 44 28 50 30Z"/>' +
    '<path class="wing r" d="M50 22 C60 8 74 6 94 12 C86 16 84 22 86 28 C78 24 72 28 70 34 C64 28 56 28 50 30Z"/>' +
    '<ellipse cx="50" cy="27" rx="6" ry="9"/><path d="M45 19 l2 -6 3 5 3 -5 2 6z"/></g>' +
    '<circle cx="48" cy="22" r="1" fill="#ff3b3b"/><circle cx="52" cy="22" r="1" fill="#ff3b3b"/></svg>';

  function spawnBat(host) {
    var b = document.createElement("div");
    b.className = "bat" + (Math.random() < 0.4 ? " rtl" : "");
    var s = 26 + Math.random() * 34;
    b.style.setProperty("--s", s + "px");
    b.style.setProperty("--y", (6 + Math.random() * 40) + "%");
    b.style.setProperty("--d", (7 + Math.random() * 6) + "s");
    b.innerHTML = BAT_SVG;
    b.addEventListener("animationend", function (e) { if (e.target === b) b.remove(); });
    host.appendChild(b);
  }

  function makeBats() {
    var host = document.getElementById("bats");
    if (!host || reduceMotion) return;
    function loop() {
      if (!document.hidden) {
        var flock = Math.random() < 0.3 ? 3 : 1;
        for (var i = 0; i < flock; i++) setTimeout(function () { spawnBat(host); }, i * 260);
      }
      setTimeout(loop, 7000 + Math.random() * 9000);
    }
    setTimeout(loop, 2500);
  }

  /* ---------- lightning ---------- */
  // noReveal: the caller shows its own figures in this flash
  function strike(noReveal) {
    var el = document.getElementById("lightning");
    if (!el || reduceMotion) return;
    el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash");
    document.body.classList.add("lit");
    setTimeout(function () { document.body.classList.remove("lit"); }, 520);
    if (window.Sound) window.Sound.thunder();
    // shadow figures can only be seen in the flash
    if (noReveal !== true) { try { window.dispatchEvent(new Event("woc:lightning")); } catch (e) {} }
  }
  function makeLightning() {
    if (reduceMotion) return;
    function loop() {
      var gate = document.getElementById("gate");
      if (!document.hidden && !(gate && !gate.classList.contains("gone"))) strike();
      setTimeout(loop, 12000 + Math.random() * 16000);
    }
    setTimeout(loop, 8000 + Math.random() * 5000);
  }

  /* ---------- flashlight + watching eye ---------- */
  function makeTracking() {
    var root = document.documentElement;
    var iris = document.getElementById("iris");
    var hub = document.getElementById("hub");
    var px = window.innerWidth / 2, py = window.innerHeight * 0.4, queued = false;

    function apply() {
      queued = false;
      root.style.setProperty("--mx", px + "px");
      root.style.setProperty("--my", py + "px");
      if (iris && hub && hub.offsetParent) {
        var r = hub.getBoundingClientRect();
        var dx = px - (r.left + r.width / 2), dy = py - (r.top + r.height / 2);
        var dist = Math.sqrt(dx * dx + dy * dy) || 1;
        var k = Math.min(1, dist / 300) * 13;
        iris.setAttribute("transform", "translate(" + (dx / dist * k).toFixed(2) + " " + (dy / dist * k * 0.6).toFixed(2) + ")");
      }
    }
    function move(e) {
      px = e.clientX; py = e.clientY;
      if (!queued) { queued = true; requestAnimationFrame(apply); }
    }
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", move, { passive: true });

    // on touch screens the eye glances around on its own
    if (coarse) {
      setInterval(function () {
        if (document.hidden) return;
        px = window.innerWidth * (0.15 + Math.random() * 0.7);
        py = window.innerHeight * (0.15 + Math.random() * 0.7);
        apply();
      }, 2600);
    }
  }

  function makeBlink() {
    var lids = document.getElementById("lids");
    if (!lids) return;
    function blink() {
      lids.classList.add("blink");
      setTimeout(function () { lids.classList.remove("blink"); }, 140);
      if (Math.random() < 0.25) setTimeout(function () {
        lids.classList.add("blink");
        setTimeout(function () { lids.classList.remove("blink"); }, 120);
      }, 300);
      setTimeout(blink, 2500 + Math.random() * 5000);
    }
    setTimeout(blink, 2000);
  }

  /* ---------- the spider ---------- */
  function makeSpider() {
    var sp = document.getElementById("spider");
    if (!sp) return;
    sp.addEventListener("click", function () {
      if (sp.classList.contains("flee")) return;
      sp.classList.add("flee");
      if (window.Sound) window.Sound.whoosh();
      setTimeout(function () { sp.classList.remove("flee"); }, 25000);
    });
  }

  /* ---------- --vh fallback for older mobile browsers ---------- */
  function vhFix() {
    if (window.CSS && CSS.supports && CSS.supports("height", "1dvh")) return;
    function set() { document.documentElement.style.setProperty("--vh", (window.innerHeight / 100) + "px"); }
    set();
    window.addEventListener("resize", set);
  }

  window.FX = { strike: strike };

  function start() {
    vhFix();
    makeStars();
    makeTrees();
    makeMotes();
    makeBats();
    makeLightning();
    makeTracking();
    makeBlink();
    makeSpider();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
