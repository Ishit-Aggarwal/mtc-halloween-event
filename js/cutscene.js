/* =========================================================
   OtherSideCutscene — The Other Side Horror Sequence
   MTC Halloween Build · Round 2
   Cinematic 60fps browser-driven horror sequence
   ========================================================= */

(function () {
  "use strict";

  var NARRATIVE_LINES = [
    "Welcome to the Other Side.",
    "A world that exists between reality and the network.",
    "Here, nightmares have identities. Monsters have memories. Villains have entire worlds of their own.",
    "But the corruption has spread.",
    "Their homes are gone. Their systems are broken. Their stories are disappearing.",
    "And the Phantom is still out there.",
    "Your mission is no longer to destroy the corruption.",
    "It is to rebuild what has been lost."
  ];

  var REALM_NODES = [
    { id: "nevermore", name: "Nevermore Academy", host: "nevermore.corrupt", x: 0.22, y: 0.30, ping: "666ms", status: "ENCRYPTION FAILED" },
    { id: "derry",     name: "Derry Sewers",      host: "derry-storm.gov",  x: 0.78, y: 0.28, ping: "1989ms", status: "VOID OVERFLOW" },
    { id: "hawkins",   name: "Hawkins Upside Down",host: "hawkins-rift.lab", x: 0.82, y: 0.70, ping: "011ms", status: "GATE UNCONTAINED" },
    { id: "arkham",    name: "Arkham Asylum",     host: "arkham-sys.sec",   x: 0.18, y: 0.74, ping: "999ms", status: "CELL BREACH" },
    { id: "chanderi",  name: "Chanderi Border",   host: "chanderi.curfew",  x: 0.50, y: 0.84, ping: "000ms", status: "PHANTOM DETECTED" },
    { id: "phantom",   name: "PHANTOM CORE",      host: "0x0000.rootkit",   x: 0.50, y: 0.46, ping: "ERR",   status: "CONSUMING SOULS" }
  ];

  var CIPHER_CHARS = "01#☠†§ØΔ%@!=+*<>";

  var Cutscene = {
    isActive: false,
    timerIds: [],
    animFrame: null,

    init: function () {
      this.layer = document.getElementById("cutsceneLayer");
      this.canvas = document.getElementById("cutsceneCanvas");
      this.vortex = document.getElementById("cutsceneVortex");
      this.chroma = document.getElementById("cutsceneChroma");
      this.alertEl = document.getElementById("cutsceneAlert");
      this.dialogueBody = document.getElementById("dialogueBody");
      this.endcard = document.getElementById("cutsceneEndcard");
      this.skipBtn = document.getElementById("cutsceneSkipBtn");
      this.proceedBtn = document.getElementById("cutsceneProceedBtn");
      this.replayBtn = document.getElementById("cutsceneReplayBtn");

      if (!this.layer) return;

      this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
      this.bindEvents();
    },

    bindEvents: function () {
      var self = this;
      if (this.skipBtn) {
        this.skipBtn.addEventListener("click", function () { self.exit(true); });
      }
      if (this.proceedBtn) {
        this.proceedBtn.addEventListener("click", function () { self.exit(false); });
      }
      if (this.replayBtn) {
        this.replayBtn.addEventListener("click", function () { self.play(); });
      }
      window.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && self.isActive) {
          self.exit(true);
        }
      });
      window.addEventListener("resize", function () {
        if (self.isActive) self.resizeCanvas();
      });
    },

    resizeCanvas: function () {
      if (!this.canvas || !this.ctx) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    },

    play: function () {
      this.isActive = true;
      this.clearTimers();
      if (!this.layer) this.init();
      if (!this.layer) return;

      this.layer.hidden = false;
      void this.layer.offsetWidth;
      this.layer.classList.add("is-active");

      // Reset DOM visual states
      if (this.vortex) this.vortex.classList.remove("pull");
      if (this.chroma) this.chroma.classList.remove("glitching");
      if (this.alertEl) this.alertEl.hidden = true;
      if (this.endcard) this.endcard.hidden = true;
      if (this.dialogueBody) this.dialogueBody.innerHTML = "";
      this.resizeCanvas();

      var S = window.Sound || {};

      // Phase 1: Vortex Zoom & Dimensional Pull (0.0s - 2.5s)
      if (S.cutsceneVortexHum) S.cutsceneVortexHum(true);
      if (S.whoosh) S.whoosh();
      if (this.vortex) this.vortex.classList.add("pull");
      if (this.chroma) this.chroma.classList.add("glitching");

      // Phase 2: Start Supernatural Internet Map Canvas
      this.startNetworkCanvas();

      // Phase 3: Critical System Threat Alert (5.5s - 7.5s)
      var self = this;
      this.delay(function () {
        if (self.alertEl) self.alertEl.hidden = false;
        if (S.cutsceneAlarm) S.cutsceneAlarm();
        if (S.cutsceneStaticBurst) S.cutsceneStaticBurst();
      }, 5500);

      // Phase 4: Narrative Transmission Crawl (7.5s - 15.5s)
      this.delay(function () {
        if (self.alertEl) self.alertEl.hidden = true;
        self.playDialogueStream();
      }, 7500);

      // Phase 5: Climax End Card (16.0s)
      this.delay(function () {
        if (self.endcard) self.endcard.hidden = false;
        if (S.cutsceneImpact) S.cutsceneImpact();
      }, 16000);
    },

    startNetworkCanvas: function () {
      var self = this;
      if (!this.ctx) return;

      var packets = [];
      for (var i = 0; i < 22; i++) {
        packets.push({
          from: Math.floor(Math.random() * 5),
          to: 5, // routes towards Phantom core
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.009
        });
      }

      function draw() {
        if (!self.isActive) return;
        var ctx = self.ctx, w = self.width, h = self.height;
        ctx.clearRect(0, 0, w, h);

        // Cyber Grid Lines (Occult Network topology)
        ctx.strokeStyle = "rgba(255, 51, 38, 0.07)";
        ctx.lineWidth = 1;
        var step = 48;
        for (var x = 0; x < w; x += step) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (var y = 0; y < h; y += step) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }

        // Inter-node Network Conduits
        REALM_NODES.forEach(function (node, idx) {
          if (idx === 5) return;
          var nx = node.x * w, ny = node.y * h;
          var cx = REALM_NODES[5].x * w, cy = REALM_NODES[5].y * h;

          ctx.strokeStyle = "rgba(255, 51, 38, 0.32)";
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(cx, cy); ctx.stroke();

          // Outer secondary link
          var nextNode = REALM_NODES[(idx + 1) % 5];
          ctx.strokeStyle = "rgba(255, 80, 40, 0.16)";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(nx, ny); ctx.lineTo(nextNode.x * w, nextNode.y * h); ctx.stroke();
        });

        // Flowing Corrupted Data Packets
        packets.forEach(function (p) {
          p.progress += p.speed;
          if (p.progress >= 1) p.progress = 0;
          var n1 = REALM_NODES[p.from], n2 = REALM_NODES[p.to];
          var px = (n1.x + (n2.x - n1.x) * p.progress) * w;
          var py = (n1.y + (n2.y - n1.y) * p.progress) * h;

          ctx.fillStyle = "#ff3326";
          ctx.shadowColor = "#ff5a2a";
          ctx.shadowBlur = 8;
          ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;
        });

        // Corrupted Supernatural Nodes
        REALM_NODES.forEach(function (node, i) {
          var nx = node.x * w, ny = node.y * h;
          var isPhantom = i === 5;

          // Glowing Outer Rings
          ctx.strokeStyle = isPhantom ? "#ff3326" : "rgba(255, 80, 50, 0.85)";
          ctx.lineWidth = isPhantom ? 2.5 : 1.5;
          ctx.beginPath();
          ctx.arc(nx, ny, isPhantom ? 15 : 9, 0, Math.PI * 2);
          ctx.stroke();

          // Center pulsing core
          ctx.fillStyle = isPhantom ? "#ffffff" : "#ff3326";
          ctx.beginPath();
          ctx.arc(nx, ny, isPhantom ? 6 : 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Text labels with glowing badges
          ctx.font = "bold 11px 'Pixelify Sans', monospace";
          ctx.fillStyle = isPhantom ? "#ff3326" : "rgba(244, 227, 215, 0.9)";
          ctx.fillText(node.name.toUpperCase(), nx + 15, ny + 4);

          ctx.font = "9px monospace";
          ctx.fillStyle = isPhantom ? "#ff8877" : "rgba(255, 51, 38, 0.75)";
          ctx.fillText(node.status, nx + 15, ny + 16);
        });

        self.animFrame = requestAnimationFrame(draw);
      }
      this.animFrame = requestAnimationFrame(draw);
    },

    playDialogueStream: function () {
      var self = this;
      var lineIndex = 0;

      function nextLine() {
        if (!self.isActive || lineIndex >= NARRATIVE_LINES.length) return;
        var text = NARRATIVE_LINES[lineIndex];
        lineIndex++;

        self.typewrite(text, function () {
          self.delay(nextLine, 700);
        });
      }
      nextLine();
    },

    typewrite: function (targetText, onComplete) {
      var self = this;
      var curIdx = 0;
      var container = this.dialogueBody;
      if (!container) {
        if (onComplete) onComplete();
        return;
      }
      container.innerHTML = "<span class='dialogue-cursor'></span>";

      function tick() {
        if (!self.isActive) return;
        if (curIdx <= targetText.length) {
          var revealed = targetText.slice(0, curIdx);
          var glitchChar = curIdx < targetText.length ? CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)] : "";
          container.innerHTML = revealed + "<span style='color:var(--blood-hot)'>" + glitchChar + "</span><span class='dialogue-cursor'></span>";

          if (window.Sound && window.Sound.cutsceneTypeTick && curIdx % 2 === 0) {
            window.Sound.cutsceneTypeTick();
          }
          curIdx++;
          self.delay(tick, 26 + Math.random() * 14);
        } else {
          container.innerHTML = targetText + "<span class='dialogue-cursor'></span>";
          if (onComplete) onComplete();
        }
      }
      tick();
    },

    exit: function (skipped) {
      this.isActive = false;
      this.clearTimers();
      if (this.animFrame) cancelAnimationFrame(this.animFrame);
      if (window.Sound && window.Sound.cutsceneVortexHum) window.Sound.cutsceneVortexHum(false);

      var self = this;
      if (this.layer) {
        this.layer.classList.remove("is-active");
      }

      // Persist seen status in preferences
      try {
        if (window.Store && window.Store.setPref) {
          window.Store.setPref("cutsceneSeen", true);
        }
      } catch (e) {}

      setTimeout(function () {
        if (self.layer) self.layer.hidden = true;
        // Handoff to main altar gate dismissal & Creatures.opening()
        var gate = document.getElementById("gate");
        if (gate) gate.classList.add("gone");
        if (window.Creatures && window.Creatures.opening) {
          window.Creatures.opening();
        }
      }, 450);
    },

    delay: function (fn, ms) {
      var id = setTimeout(fn, ms);
      this.timerIds.push(id);
      return id;
    },

    clearTimers: function () {
      this.timerIds.forEach(function (id) { clearTimeout(id); });
      this.timerIds = [];
    }
  };

  window.OtherSideCutscene = Cutscene;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { Cutscene.init(); });
  } else {
    Cutscene.init();
  }
})();
