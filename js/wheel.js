/* =========================================================
   Wheel — draws a segmented wheel on <canvas> and spins the
   rotor to a pre-chosen segment, like a casino wheel: a hard
   launch, a long slow crawl, and a flapper arrow that gets
   knocked by every peg. Once it stops it STAYS on the result.
   The outcome is decided before the animation starts, so a
   page refresh can't re-roll it.
   ========================================================= */

(function () {
  "use strict";

  var TAU = Math.PI * 2;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // fast launch, long gentle crawl to a stop
  function easeOut(t) { return 1 - Math.pow(1 - t, 3.2); }
  function mod(a, n) { return ((a % n) + n) % n; }

  function hexToRgb(hex) {
    var h = hex.replace("#", "");
    if (h.length === 3) h = h.replace(/./g, "$&$&");
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgba(hex, a) { var c = hexToRgb(hex); return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")"; }

  var EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji","Segoe UI Symbol",sans-serif';
  var LABEL_FONT = '"Special Elite","Courier New",monospace';

  function Wheel(canvas, rotor, pointer) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.rotor = rotor;
    this.pointer = pointer;
    this.segments = [];
    this.theme = {};
    this.angle = 0;       // degrees, clockwise
    this.spinning = false;
    // flapper state (degrees; negative = knocked back against the spin)
    this.flap = 0;
    this.flapVel = 0;
    var self = this;
    window.addEventListener("resize", function () { self.draw(); });
  }

  Wheel.prototype.setSegments = function (segments, theme) {
    this.segments = segments;
    this.theme = theme || {};
    this.draw();
  };

  Wheel.prototype.draw = function () {
    var n = this.segments.length;
    var cssSize = this.rotor.clientWidth || 400;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var size = Math.round(cssSize * dpr);
    if (this.canvas.width !== size) { this.canvas.width = size; this.canvas.height = size; }
    var ctx = this.ctx, R = size / 2, cx = R, cy = R;
    var th = this.theme;
    ctx.clearRect(0, 0, size, size);
    if (!n) return;

    var seg = TAU / n;
    var rimIn = R * 0.9, hubR = R * 0.15;

    // ---- outer iron rim ----
    var rim = ctx.createRadialGradient(cx, cy, rimIn, cx, cy, R);
    rim.addColorStop(0, "#030204");
    rim.addColorStop(0.35, "#2e2530");
    rim.addColorStop(0.6, "#141016");
    rim.addColorStop(1, "#030204");
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fillStyle = rim; ctx.fill();

    // ---- segments ----
    for (var i = 0; i < n; i++) {
      var s = this.segments[i];
      var a0 = -Math.PI / 2 + i * seg, a1 = a0 + seg;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, rimIn, a0, a1);
      ctx.closePath();
      ctx.fillStyle = i % 2 ? (th.a || "#14080f") : (th.b || "#0b050a");
      ctx.fill();

      var tint = s.color || th.accent || "#b3122e";
      var g = ctx.createRadialGradient(cx, cy, hubR, cx, cy, rimIn);
      if (s.disabled) {
        g.addColorStop(0, "rgba(0,0,0,.65)"); g.addColorStop(1, "rgba(0,0,0,.8)");
      } else {
        g.addColorStop(0, "rgba(0,0,0,.6)");
        g.addColorStop(0.65, rgba(tint, i % 2 ? 0.08 : 0.13));
        g.addColorStop(1, rgba(tint, i % 2 ? 0.26 : 0.34));
      }
      ctx.fillStyle = g; ctx.fill();

      if (!s.disabled) {
        ctx.beginPath();
        ctx.arc(cx, cy, rimIn - R * 0.012, a0 + 0.01, a1 - 0.01);
        ctx.strokeStyle = rgba(tint, 0.8);
        ctx.lineWidth = R * 0.012;
        ctx.stroke();
      }
    }

    // ---- separators ----
    ctx.strokeStyle = "rgba(239,230,210,.18)";
    ctx.lineWidth = Math.max(1, R * 0.006);
    for (i = 0; i < n; i++) {
      var a = -Math.PI / 2 + i * seg;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * hubR, cy + Math.sin(a) * hubR);
      ctx.lineTo(cx + Math.cos(a) * rimIn, cy + Math.sin(a) * rimIn);
      ctx.stroke();
    }

    // ---- pegs on the rim (the flapper clicks against these) ----
    for (i = 0; i < n; i++) {
      var ra = -Math.PI / 2 + i * seg;
      var rx = cx + Math.cos(ra) * (R * 0.95), ry = cy + Math.sin(ra) * (R * 0.95);
      var rg = ctx.createRadialGradient(rx - R * 0.008, ry - R * 0.008, 0, rx, ry, R * 0.026);
      rg.addColorStop(0, "#f1e6c8"); rg.addColorStop(0.45, "#a08a5a"); rg.addColorStop(1, "#1a121a");
      ctx.beginPath(); ctx.arc(rx, ry, R * 0.024, 0, TAU); ctx.fillStyle = rg; ctx.fill();
    }

    // ---- labels ----
    var labelOuter = rimIn - R * 0.07;
    var labelInner = R * 0.3;
    var maxW = labelOuter - labelInner;
    var arcH = Math.sin(seg / 2) * (labelInner + maxW * 0.55) * 2;
    for (i = 0; i < n; i++) {
      s = this.segments[i];
      var mid = -Math.PI / 2 + (i + 0.5) * seg;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(mid);
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";

      var glyphSize = Math.min(R * 0.1, arcH * 0.62);
      var x = labelOuter;
      if (s.glyph) {
        ctx.font = glyphSize + "px " + (s.glyphIsText ? LABEL_FONT : EMOJI_FONT);
        ctx.globalAlpha = s.disabled ? 0.25 : 1;
        ctx.fillStyle = s.glyphIsText ? rgba(s.color || th.accent || "#efe6d2", 1) : "#fff";
        ctx.fillText(s.glyph, x, 0);
        x -= glyphSize * 1.25;
      }

      var fs = Math.min(R * 0.068, arcH * 0.42);
      var text = s.label || "";
      var avail = x - labelInner;
      ctx.font = fs + "px " + LABEL_FONT;
      var w = ctx.measureText(text).width;
      if (w > avail) {
        fs = Math.max(fs * (avail / w), R * 0.036);
        ctx.font = fs + "px " + LABEL_FONT;
        while (ctx.measureText(text).width > avail && text.length > 3) text = text.slice(0, -2) + "…";
      }
      ctx.globalAlpha = s.disabled ? 0.3 : 1;
      ctx.fillStyle = s.disabled ? "#8f8578" : "#efe3cc";
      ctx.shadowColor = "rgba(0,0,0,.95)";
      ctx.shadowBlur = R * 0.02;
      ctx.fillText(text, x, 0);
      ctx.shadowBlur = 0;

      if (s.disabled) {
        ctx.globalAlpha = 0.75;
        ctx.strokeStyle = "#b3122e";
        ctx.lineWidth = Math.max(1.5, R * 0.008);
        ctx.beginPath();
        ctx.moveTo(labelInner - R * 0.02, 0);
        ctx.lineTo(labelOuter, 0);
        ctx.stroke();
      }
      ctx.restore();
    }

    // ---- inner rings ----
    ctx.beginPath(); ctx.arc(cx, cy, hubR * 1.25, 0, TAU);
    ctx.strokeStyle = "rgba(201,162,39,.3)"; ctx.lineWidth = Math.max(1, R * 0.006); ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, rimIn, 0, TAU);
    ctx.strokeStyle = "rgba(0,0,0,.85)"; ctx.lineWidth = R * 0.012; ctx.stroke();

    // ---- grime + sheen ----
    var sheen = ctx.createLinearGradient(0, 0, size, size);
    sheen.addColorStop(0, "rgba(255,240,200,.05)");
    sheen.addColorStop(0.5, "rgba(255,255,255,0)");
    sheen.addColorStop(1, "rgba(0,0,0,.35)");
    ctx.beginPath(); ctx.arc(cx, cy, rimIn, 0, TAU); ctx.fillStyle = sheen; ctx.fill();
  };

  Wheel.prototype._apply = function () {
    this.rotor.style.transform = "rotate(" + this.angle.toFixed(3) + "deg)";
  };

  Wheel.prototype._applyFlap = function () {
    if (this.pointer) this.pointer.style.transform = "translateX(-50%) rotate(" + this.flap.toFixed(2) + "deg)";
  };

  /** Index of the segment currently under the pointer. */
  Wheel.prototype.indexAt = function (angle) {
    var n = this.segments.length;
    if (!n) return -1;
    return Math.floor(mod(-angle, 360) / (360 / n)) % n;
  };

  /** Which peg (segment boundary) the pointer has passed — counts up forever. */
  Wheel.prototype._pegCount = function (angle) {
    return Math.floor(angle / (360 / this.segments.length));
  };

  /**
   * Spin so that `target` ends under the pointer and stays there.
   * opts.onTick(speed01) fires each time a peg hits the flapper.
   */
  Wheel.prototype.spin = function (target, opts) {
    opts = opts || {};
    var self = this;
    var n = this.segments.length;
    var segDeg = 360 / n;
    var duration = opts.duration || (reduceMotion ? 1600 : 8200);
    var turns = reduceMotion ? 1 : 5 + Math.floor(Math.random() * 3);
    // land inside the segment, comfortably away from the pegs
    var jitter = (Math.random() - 0.5) * segDeg * 0.56;
    var base = mod(-((target + 0.5) * segDeg + jitter), 360);
    var start = this.angle;
    var end = start - mod(start, 360) + base + turns * 360;
    if (end - start < turns * 360) end += 360;
    var delta = end - start;

    this.spinning = true;
    var lastPeg = this._pegCount(start);

    return new Promise(function (resolve) {
      var t0 = null, prevNow = null, prevAngle = start;
      function frame(now) {
        if (t0 === null) { t0 = now; prevNow = now; }
        var t = Math.min(1, (now - t0) / duration);
        var dt = Math.min(0.05, (now - prevNow) / 1000) || 0.016;
        prevNow = now;

        self.angle = start + delta * easeOut(t);
        self._apply();

        // degrees per second right now → 0..1
        var speed = Math.min(1, Math.abs(self.angle - prevAngle) / dt / 1400);
        prevAngle = self.angle;

        var peg = self._pegCount(self.angle);
        if (peg !== lastPeg) {
          lastPeg = peg;
          // a peg slaps the flapper back; harder when slow (more contact time)
          self.flapVel -= 260 + (1 - speed) * 380;
          if (opts.onTick) opts.onTick(speed);
        }
        // damped spring pulls the flapper back to centre
        var k = 520, c = 18;
        self.flapVel += (-k * self.flap - c * self.flapVel) * dt;
        self.flap += self.flapVel * dt;
        if (self.flap < -32) { self.flap = -32; self.flapVel = Math.max(0, self.flapVel); }
        self._applyFlap();

        if (t < 1) { requestAnimationFrame(frame); return; }
        self.spinning = false;
        self._settleFlap();
        resolve(self.indexAt(self.angle));
      }
      requestAnimationFrame(frame);
    });
  };

  // let the flapper wobble to rest after the wheel stops
  Wheel.prototype._settleFlap = function () {
    var self = this, prev = null;
    function frame(now) {
      if (self.spinning) return;
      var dt = prev ? Math.min(0.05, (now - prev) / 1000) : 0.016;
      prev = now;
      self.flapVel += (-520 * self.flap - 14 * self.flapVel) * dt;
      self.flap += self.flapVel * dt;
      self._applyFlap();
      if (Math.abs(self.flap) > 0.05 || Math.abs(self.flapVel) > 0.5) requestAnimationFrame(frame);
      else { self.flap = 0; self.flapVel = 0; self._applyFlap(); }
    }
    requestAnimationFrame(frame);
  };

  /** Snap (no animation) so that `target` sits under the pointer. */
  Wheel.prototype.show = function (target) {
    if (target < 0) return;
    var segDeg = 360 / this.segments.length;
    this.angle = mod(-((target + 0.5) * segDeg), 360);
    this._apply();
  };

  window.Wheel = Wheel;
})();
