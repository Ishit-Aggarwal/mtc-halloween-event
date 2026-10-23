/* =========================================================
   OtherSideCutscene — The Other Side Horror Sequence
   MTC Halloween Build · Round 2
   Cinematic 60fps browser-driven horror sequence:
   1. Bloody Portal Tear & Pulse (flesh rip, organic rift)
   2. Anatomically Realistic Demonic Hands Emerge in 3D (reaching & gripping screen edges)
   3. Violent Viewport Drag-In Plunge (glass fractures, camera shudder)
   4. Hyperspeed 3D Wormhole Tunnel Warp (ZERO LAG, batched 60fps rendering)
   5. Crash Landing into The Other Side (dark void with spooky figures, drifting mist, glowing eyes, and BIG glowing narrative typography)
   6. Mission 02 End Card: Website Resurrection
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

  // Canvas Modes
  var MODE = {
    PORTAL: 1,
    WARP_TUNNEL: 2,
    DARK_VOID: 3
  };

  var FOCAL_LENGTH = 340;

  var Cutscene = {
    isActive: false,
    timerIds: [],
    animFrame: null,
    canvasMode: MODE.PORTAL,
    startTime: 0,
    warpSpeed: 1,
    targetWarpSpeed: 1,

    // High-performance Particle / Fog Buffers
    warpCrimson: [],
    warpAmber: [],
    warpWhite: [],
    warpRings: [],
    bloodDrips: [],
    ashParticles: [],
    fogSheets: [],

    init: function () {
      this.layer = document.getElementById("cutsceneLayer");
      this.rig = document.getElementById("cutsceneRig");
      this.canvas = document.getElementById("cutsceneCanvas");
      this.vortex = document.getElementById("cutsceneVortex");
      this.chroma = document.getElementById("cutsceneChroma");
      this.clawsLayer = document.getElementById("cutsceneClawsLayer");
      this.clawLeft = document.getElementById("clawLeft");
      this.clawRight = document.getElementById("clawRight");
      this.clawTop = document.getElementById("clawTop");
      this.clawCenter = document.getElementById("clawCenter");
      this.glass = document.getElementById("cutsceneGlass");
      this.glassLeft = document.getElementById("glassImpactLeft");
      this.glassRight = document.getElementById("glassImpactRight");
      this.flash = document.getElementById("cutsceneFlash");

      // Spooky Void & Cinema Typography Elements
      this.voidFigures = document.getElementById("voidFigures");
      this.cinemaWrap = document.getElementById("cutsceneCinemaWrap");
      this.cinemaTextLine = document.getElementById("cinemaTextLine");
      this.endcard = document.getElementById("cutsceneEndcard");

      this.skipBtn = document.getElementById("cutsceneSkipBtn");
      this.proceedBtn = document.getElementById("cutsceneProceedBtn");
      this.replayBtn = document.getElementById("cutsceneReplayBtn");

      if (!this.layer) return;

      this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
      this.bindEvents();
      this.prepareZombieHands();
      this.initWarpBuffers();
      this.initVoidAtmosphere();
    },

    // ----------------------------------------------------
    // PREPARE TRANSPARENT ZOMBIE HAND TEXTURES
    // Converts black isolation backgrounds into clean alpha cutouts
    // ----------------------------------------------------
    prepareZombieHands: function () {
      var handImgs = [
        document.getElementById("handLeftImg"),
        document.getElementById("handRightImg"),
        document.getElementById("handCenterImg")
      ];
      handImgs.forEach(function (img) {
        if (!img) return;
        function makeTransparent() {
          if (img.dataset.processed === "true") return;
          try {
            var canvas = document.createElement("canvas");
            var nw = img.naturalWidth || 1376;
            var nh = img.naturalHeight || 768;
            canvas.width = nw;
            canvas.height = nh;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, nw, nh);
            var imgData = ctx.getImageData(0, 0, nw, nh);
            var d = imgData.data;
            for (var i = 0; i < d.length; i += 4) {
              var r = d[i], g = d[i + 1], b = d[i + 2];
              var maxVal = Math.max(r, g, b);
              if (maxVal < 14) {
                d[i + 3] = 0;
              } else if (maxVal < 36) {
                d[i + 3] = Math.round(255 * ((maxVal - 14) / 22));
              }
            }
            ctx.putImageData(imgData, 0, 0);
            img.src = canvas.toDataURL("image/png");
            img.dataset.processed = "true";
          } catch (e) {
            // CSS mix-blend-mode: screen handles it if canvas access is blocked
          }
        }
        if (img.complete && img.naturalWidth > 0) {
          makeTransparent();
        } else {
          img.addEventListener("load", makeTransparent);
        }
      });
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

    // ----------------------------------------------------
    // PRE-ALLOCATED ZERO-LAG PARTICLE POOLS
    // ----------------------------------------------------
    initWarpBuffers: function () {
      this.warpCrimson = [];
      this.warpAmber = [];
      this.warpWhite = [];

      function createStreak(distRange) {
        var angle = Math.random() * Math.PI * 2;
        var dist = distRange[0] + Math.random() * distRange[1];
        return {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          z: 40 + Math.random() * 1200,
          len: 1.2 + Math.random() * 2.0
        };
      }

      // Crimson streaks batch (220 particles)
      for (var i = 0; i < 220; i++) {
        this.warpCrimson.push(createStreak([40, 800]));
      }
      // Amber streaks batch (160 particles)
      for (var j = 0; j < 160; j++) {
        this.warpAmber.push(createStreak([30, 700]));
      }
      // Core White streaks batch (90 particles)
      for (var k = 0; k < 90; k++) {
        this.warpWhite.push(createStreak([20, 600]));
      }

      // 6 Concentric Runic Warp Rings
      this.warpRings = [];
      for (var r = 0; r < 6; r++) {
        this.warpRings.push({
          z: 160 + r * 180,
          radius: 260 + (r % 3) * 70,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.03
        });
      }
    },

    initVoidAtmosphere: function () {
      // Floating Upside-Down Ash Spores (drifting upward)
      this.ashParticles = [];
      for (var i = 0; i < 75; i++) {
        this.ashParticles.push({
          x: Math.random(),
          y: Math.random(),
          size: 1.2 + Math.random() * 2.8,
          speedY: 0.0004 + Math.random() * 0.0009,
          swaySpeed: 1 + Math.random() * 2,
          swayWidth: 15 + Math.random() * 25,
          alpha: 0.3 + Math.random() * 0.6
        });
      }

      // Drifting Volumetric Fog Sheets
      this.fogSheets = [
        { x: 0, y: 0.70, width: 1.6, height: 0.35, speed: 0.00015, alpha: 0.32 },
        { x: -0.4, y: 0.55, width: 1.8, height: 0.45, speed: 0.00022, alpha: 0.25 },
        { x: 0.2, y: 0.78, width: 1.5, height: 0.30, speed: 0.00018, alpha: 0.28 }
      ];
    },

    resizeCanvas: function () {
      if (!this.canvas || !this.ctx) return;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = Math.floor(this.width * dpr);
      this.canvas.height = Math.floor(this.height * dpr);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    },

    resetVisuals: function () {
      if (this.rig) {
        this.rig.className = "cutscene-rig";
      }
      if (this.vortex) {
        this.vortex.classList.remove("pull");
      }
      if (this.chroma) {
        this.chroma.classList.remove("glitching");
      }
      [this.clawLeft, this.clawRight, this.clawTop, this.clawCenter].forEach(function (claw) {
        if (claw) {
          claw.classList.remove("emerge", "lunge", "gripping");
        }
      });
      if (this.glassLeft) this.glassLeft.hidden = true;
      if (this.glassRight) this.glassRight.hidden = true;
      if (this.flash) {
        this.flash.classList.remove("bang", "fade");
      }
      if (this.voidFigures) {
        this.voidFigures.hidden = true;
        this.voidFigures.classList.remove("revealed");
      }
      if (this.cinemaWrap) {
        this.cinemaWrap.hidden = true;
      }
      if (this.cinemaTextLine) {
        this.cinemaTextLine.textContent = "";
        this.cinemaTextLine.className = "cinema-text-line";
      }
      if (this.endcard) this.endcard.hidden = true;

      this.bloodDrips = [];
      this.warpSpeed = 1;
      this.targetWarpSpeed = 1;
    },

    play: function () {
      this.isActive = true;
      this.clearTimers();
      if (!this.layer) this.init();
      if (!this.layer) return;

      this.layer.hidden = false;
      void this.layer.offsetWidth;
      this.layer.classList.add("is-active");

      this.resizeCanvas();
      this.resetVisuals();
      this.startTime = performance.now();
      this.canvasMode = MODE.PORTAL;

      var S = window.Sound || {};
      var self = this;

      // ========================================================
      // PHASE 1: BLOODY PORTAL TEARS OPEN (0.0s - 2.0s)
      // ========================================================
      if (S.cutsceneFleshRip) S.cutsceneFleshRip();
      if (S.cutsceneVortexHum) S.cutsceneVortexHum(true);
      if (this.vortex) this.vortex.classList.add("pull");
      if (this.chroma) this.chroma.classList.add("glitching");

      // Initial dripping blood seeds
      for (var d = 0; d < 20; d++) {
        this.bloodDrips.push({
          x: self.width * (0.38 + Math.random() * 0.24),
          y: self.height * (0.50 + Math.random() * 0.15),
          vy: 2.5 + Math.random() * 4.5,
          r: 2 + Math.random() * 3.5,
          alpha: 0.85,
          length: 5 + Math.random() * 14
        });
      }

      // Start unified 60fps render loop
      this.startRenderLoop();

      // ========================================================
      // PHASE 2: REALISTIC HANDS EMERGE IN 3D PERSPECTIVE (2.0s - 3.4s)
      // ========================================================
      this.delay(function () {
        if (!self.isActive) return;
        if (S.cutsceneDemonicScreech) S.cutsceneDemonicScreech();
        if (S.whisper) S.whisper();

        if (self.clawLeft) self.clawLeft.classList.add("emerge");
        if (self.clawRight) self.clawRight.classList.add("emerge");
        if (self.clawTop) self.clawTop.classList.add("emerge");
        if (self.clawCenter) self.clawCenter.classList.add("lunge");
      }, 2000);

      // ========================================================
      // PHASE 3: SCREEN-EDGE SLAM & GRAB (3.4s - 4.6s)
      // ========================================================
      this.delay(function () {
        if (!self.isActive) return;
        if (S.cutsceneClawGrab) S.cutsceneClawGrab();
        if (S.cutsceneGlassCrack) S.cutsceneGlassCrack();

        // Screen impact tremor
        if (self.rig) self.rig.classList.add("claw-slam-shake");

        // Glass fractures snap open at contact points
        if (self.glassLeft) self.glassLeft.hidden = false;
        if (self.glassRight) self.glassRight.hidden = false;

        // Realistic hand fingers wrap and grip tightly
        [self.clawLeft, self.clawRight, self.clawTop].forEach(function (c) {
          if (c) c.classList.add("gripping");
        });

        // Blood impact drops
        for (var b = 0; b < 24; b++) {
          var isLeft = Math.random() > 0.5;
          self.bloodDrips.push({
            x: isLeft ? Math.random() * 110 : self.width - Math.random() * 110,
            y: self.height * (0.32 + Math.random() * 0.38),
            vy: 2 + Math.random() * 3.8,
            r: 2.2 + Math.random() * 3,
            alpha: 0.9,
            length: 8 + Math.random() * 18
          });
        }
      }, 3400);

      // ========================================================
      // PHASE 4: VIOLENT ABYSS DRAG PLUNGE (4.6s - 5.8s)
      // ========================================================
      this.delay(function () {
        if (!self.isActive) return;
        if (S.cutsceneDragRoar) S.cutsceneDragRoar();
        if (S.scream) S.scream();

        if (self.rig) {
          self.rig.classList.remove("claw-slam-shake");
          void self.rig.offsetWidth;
          self.rig.classList.add("drag-plunge");
        }
      }, 4600);

      // ========================================================
      // PHASE 5: HYPERSPEED 3D WORMHOLE WARP (5.8s - 8.4s) — 60FPS ZERO LAG
      // ========================================================
      this.delay(function () {
        if (!self.isActive) return;
        if (S.cutsceneVortexHum) S.cutsceneVortexHum(false);
        if (S.cutsceneWarpEngine) S.cutsceneWarpEngine(true);

        // Reset rig transform & hide claws for wormhole flight
        if (self.rig) self.rig.className = "cutscene-rig";
        [self.clawLeft, self.clawRight, self.clawTop, self.clawCenter].forEach(function (claw) {
          if (claw) claw.classList.remove("emerge", "lunge", "gripping");
        });
        if (self.glassLeft) self.glassLeft.hidden = true;
        if (self.glassRight) self.glassRight.hidden = true;

        self.canvasMode = MODE.WARP_TUNNEL;
        self.warpSpeed = 1.0;
        self.targetWarpSpeed = 2.0;
      }, 5800);

      // Smooth acceleration ramps
      this.delay(function () {
        if (self.isActive) self.targetWarpSpeed = 4.5;
      }, 6500);

      this.delay(function () {
        if (self.isActive) self.targetWarpSpeed = 8.5;
      }, 7400);

      // ========================================================
      // PHASE 6: SUPERNOVA FLASHBANG CRASH LAND (8.4s - 9.0s)
      // ========================================================
      this.delay(function () {
        if (!self.isActive) return;
        if (S.cutsceneWarpEngine) S.cutsceneWarpEngine(false);
        if (S.cutsceneFlashBang) S.cutsceneFlashBang();

        if (self.flash) {
          self.flash.classList.add("bang");
          setTimeout(function () {
            if (self.flash) {
              self.flash.classList.remove("bang");
              self.flash.classList.add("fade");
            }
          }, 100);
        }

        // Switch to Dark Void Mode with Spooky Figures & Drifting Mist
        self.canvasMode = MODE.DARK_VOID;

        // Reveal spooky figures lurking in the shadows & glowing eyes
        if (self.voidFigures) {
          self.voidFigures.hidden = false;
          void self.voidFigures.offsetWidth;
          self.voidFigures.classList.add("revealed");
        }
      }, 8400);

      // ========================================================
      // PHASE 7: BIG CINEMATIC GLOWING NARRATIVE TEXT (9.2s)
      // Leads automatically into Phase 8 (Mission 02 End Card)
      // ========================================================
      this.delay(function () {
        if (!self.isActive) return;
        if (self.cinemaWrap) self.cinemaWrap.hidden = false;
        self.playCinematicNarrative();
      }, 9200);
    },

    startRenderLoop: function () {
      var self = this;
      if (!this.ctx) return;

      function render(now) {
        if (!self.isActive) return;
        var elapsed = (now - self.startTime) * 0.001;

        if (self.canvasMode === MODE.PORTAL) {
          self.drawBloodyPortalFrame(elapsed);
        } else if (self.canvasMode === MODE.WARP_TUNNEL) {
          self.drawWarpTunnelFrame(elapsed);
        } else if (self.canvasMode === MODE.DARK_VOID) {
          self.drawDarkVoidAtmosphereFrame(elapsed);
        }

        self.animFrame = requestAnimationFrame(render);
      }

      if (this.animFrame) cancelAnimationFrame(this.animFrame);
      this.animFrame = requestAnimationFrame(render);
    },

    // ----------------------------------------------------
    // RENDER ROUTINE 1: ORGANIC BLOODY PORTAL
    // ----------------------------------------------------
    drawBloodyPortalFrame: function (time) {
      var ctx = this.ctx, w = this.width, h = this.height;
      var cx = w * 0.5, cy = h * 0.5;

      ctx.fillStyle = "rgba(3, 0, 2, 0.42)";
      ctx.fillRect(0, 0, w, h);

      var portalGrowth = Math.min(time * 0.65, 1.0);
      var baseR = Math.min(w, h) * 0.38 * portalGrowth;

      // 1. Central Abyssal Singularity
      var voidGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, baseR * 1.35);
      voidGrad.addColorStop(0, "rgba(2, 0, 1, 1)");
      voidGrad.addColorStop(0.35, "rgba(25, 2, 6, 0.96)");
      voidGrad.addColorStop(0.72, "rgba(200, 24, 18, 0.65)");
      voidGrad.addColorStop(1, "transparent");

      ctx.fillStyle = voidGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // 2. Swirling Logarithmic Inward Blood Filaments
      ctx.save();
      ctx.translate(cx, cy);
      for (var f = 0; f < 12; f++) {
        var baseAngle = (f / 12) * Math.PI * 2 + time * 0.8;
        ctx.strokeStyle = f % 2 === 0 ? "rgba(255, 34, 22, 0.5)" : "rgba(180, 10, 12, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (var step = 0; step < 26; step++) {
          var tFrac = step / 26;
          var r = (1 - tFrac) * baseR * 1.25;
          var a = baseAngle + tFrac * 2.5;
          var px = Math.cos(a) * r;
          var py = Math.sin(a) * r;
          if (step === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.restore();

      // 3. Multi-Harmonic Organic Flesh Ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      var numPoints = 64;
      for (var i = 0; i <= numPoints; i++) {
        var theta = (i / numPoints) * Math.PI * 2;
        var deform = 1.0
          + 0.12 * Math.sin(theta * 4 + time * 3.4)
          + 0.08 * Math.cos(theta * 7 - time * 2.2)
          + 0.05 * Math.sin(theta * 11 + time * 4.8);
        var rad = baseR * deform;
        var x = Math.cos(theta) * rad;
        var y = Math.sin(theta) * rad;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.lineWidth = 6 + Math.sin(time * 6) * 2;
      ctx.strokeStyle = "#ff2216";
      ctx.stroke();
      ctx.restore();

      // 4. Dripping Blood Droplets
      ctx.fillStyle = "#ff1e14";
      for (var d = 0; d < this.bloodDrips.length; d++) {
        var drop = this.bloodDrips[d];
        drop.y += drop.vy;
        if (drop.y > h + 20) {
          drop.y = cy + (Math.random() - 0.2) * (baseR * 0.8);
          drop.x = cx + (Math.random() - 0.5) * (baseR * 1.6);
        }
        ctx.beginPath();
        ctx.ellipse(drop.x, drop.y, drop.r, drop.r * (drop.length * 0.2), 0, 0, Math.PI * 2);
        ctx.fill();
      }
    },

    // ----------------------------------------------------
    // RENDER ROUTINE 2: 3D WORMHOLE TUNNEL (ZERO-LAG 60FPS BATCHED)
    // ----------------------------------------------------
    drawWarpTunnelFrame: function (time) {
      var ctx = this.ctx, w = this.width, h = this.height;
      var cx = w * 0.5 + Math.sin(time * 2.5) * 24;
      var cy = h * 0.5 + Math.cos(time * 2.8) * 16;

      // Smooth speed interpolation (eliminates discrete stutter jumps)
      this.warpSpeed += (this.targetWarpSpeed - this.warpSpeed) * 0.08;
      var speedMult = this.warpSpeed;

      // Single trailing clear
      ctx.fillStyle = "rgba(2, 0, 2, 0.25)";
      ctx.fillRect(0, 0, w, h);

      // --- BATCH 1: CRIMSON VELOCITY STREAKS (ONE SINGLE STROKE) ---
      ctx.strokeStyle = "rgba(255, 34, 22, 0.95)";
      ctx.lineWidth = 2.4;
      ctx.beginPath();
      for (var c = 0; c < this.warpCrimson.length; c++) {
        var sc = this.warpCrimson[c];
        var prevZ_c = sc.z;
        sc.z -= 32 * speedMult;
        if (sc.z <= 15) {
          sc.z = 1200;
          var ac = Math.random() * Math.PI * 2;
          var dc = 40 + Math.random() * 800;
          sc.x = Math.cos(ac) * dc;
          sc.y = Math.sin(ac) * dc;
        }
        var s0_c = FOCAL_LENGTH / prevZ_c;
        var s1_c = FOCAL_LENGTH / sc.z;
        ctx.moveTo(cx + sc.x * s0_c, cy + sc.y * s0_c);
        ctx.lineTo(cx + sc.x * s1_c * sc.len, cy + sc.y * s1_c * sc.len);
      }
      ctx.stroke();

      // --- BATCH 2: AMBER / EMBER STREAKS (ONE SINGLE STROKE) ---
      ctx.strokeStyle = "rgba(255, 122, 34, 0.92)";
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      for (var a = 0; a < this.warpAmber.length; a++) {
        var sa = this.warpAmber[a];
        var prevZ_a = sa.z;
        sa.z -= 32 * speedMult;
        if (sa.z <= 15) {
          sa.z = 1200;
          var aa = Math.random() * Math.PI * 2;
          var da = 30 + Math.random() * 700;
          sa.x = Math.cos(aa) * da;
          sa.y = Math.sin(aa) * da;
        }
        var s0_a = FOCAL_LENGTH / prevZ_a;
        var s1_a = FOCAL_LENGTH / sa.z;
        ctx.moveTo(cx + sa.x * s0_a, cy + sa.y * s0_a);
        ctx.lineTo(cx + sa.x * s1_a * sa.len, cy + sa.y * s1_a * sa.len);
      }
      ctx.stroke();

      // --- BATCH 3: CORE WHITE STREAKS (ONE SINGLE STROKE) ---
      ctx.strokeStyle = "rgba(255, 240, 235, 0.96)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      for (var k = 0; k < this.warpWhite.length; k++) {
        var sw = this.warpWhite[k];
        var prevZ_w = sw.z;
        sw.z -= 32 * speedMult;
        if (sw.z <= 15) {
          sw.z = 1200;
          var ak = Math.random() * Math.PI * 2;
          var dk = 20 + Math.random() * 600;
          sw.x = Math.cos(ak) * dk;
          sw.y = Math.sin(ak) * dk;
        }
        var s0_w = FOCAL_LENGTH / prevZ_w;
        var s1_w = FOCAL_LENGTH / sw.z;
        ctx.moveTo(cx + sw.x * s0_w, cy + sw.y * s0_w);
        ctx.lineTo(cx + sw.x * s1_w * sw.len, cy + sw.y * s1_w * sw.len);
      }
      ctx.stroke();

      // Concentric Occult Warp Rings (Zero shadowBlur, fast segmented arcs)
      for (var r = 0; r < this.warpRings.length; r++) {
        var ring = this.warpRings[r];
        ring.z -= 16 * speedMult;
        ring.rot += ring.rotSpeed;
        if (ring.z <= 15) {
          ring.z = 1200;
          ring.rot = Math.random() * Math.PI * 2;
        }

        var scale = FOCAL_LENGTH / ring.z;
        var rx = ring.radius * scale;
        var alpha = Math.min((1200 - ring.z) / 400, 1.0) * Math.min(ring.z / 120, 1.0);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(ring.rot);
        ctx.strokeStyle = "rgba(255, 45, 25, " + (alpha * 0.85) + ")";
        ctx.lineWidth = Math.max(1, 3.2 * scale);
        ctx.beginPath();
        ctx.arc(0, 0, rx, 0, Math.PI * 1.85);
        ctx.stroke();
        ctx.restore();
      }
    },

    // ----------------------------------------------------
    // RENDER ROUTINE 3: DARK VOID ATMOSPHERE (MIST & ASH PARTICLES)
    // ----------------------------------------------------
    drawDarkVoidAtmosphereFrame: function (time) {
      var ctx = this.ctx, w = this.width, h = this.height;

      // Pure deep atmospheric dark void
      ctx.fillStyle = "#030002";
      ctx.fillRect(0, 0, w, h);

      // Subtle ambient red vignette in lower background
      var ambGrad = ctx.createRadialGradient(w * 0.5, h * 0.75, 10, w * 0.5, h * 0.75, Math.max(w, h) * 0.7);
      ambGrad.addColorStop(0, "rgba(50, 6, 10, 0.45)");
      ambGrad.addColorStop(0.5, "rgba(20, 2, 4, 0.35)");
      ambGrad.addColorStop(1, "transparent");
      ctx.fillStyle = ambGrad;
      ctx.fillRect(0, 0, w, h);

      // 1. Drifting Volumetric Fog Sheets
      for (var f = 0; f < this.fogSheets.length; f++) {
        var sheet = this.fogSheets[f];
        sheet.x += sheet.speed;
        if (sheet.x > 1.2) sheet.x = -0.8;

        var fx = (sheet.x + Math.sin(time * 0.4 + f) * 0.05) * w;
        var fy = sheet.y * h;
        var fw = sheet.width * w;
        var fh = sheet.height * h;

        var fogGrad = ctx.createRadialGradient(fx + fw * 0.5, fy + fh * 0.5, 10, fx + fw * 0.5, fy + fh * 0.5, fw * 0.5);
        fogGrad.addColorStop(0, "rgba(35, 4, 8, " + sheet.alpha + ")");
        fogGrad.addColorStop(0.5, "rgba(22, 2, 5, " + (sheet.alpha * 0.6) + ")");
        fogGrad.addColorStop(1, "transparent");

        ctx.fillStyle = fogGrad;
        ctx.fillRect(fx, fy, fw, fh);
      }

      // 2. Upside Down Floating Ash & Spore Particles (drifting steadily upwards)
      for (var a = 0; a < this.ashParticles.length; a++) {
        var p = this.ashParticles[a];
        p.y -= p.speedY;
        if (p.y < -0.05) {
          p.y = 1.05;
          p.x = Math.random();
        }

        var px = (p.x * w) + Math.sin(time * p.swaySpeed + a) * p.swayWidth;
        var py = p.y * h;

        ctx.fillStyle = a % 3 === 0 ? "rgba(255, 60, 40, " + p.alpha + ")" : "rgba(240, 220, 215, " + (p.alpha * 0.7) + ")";
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    },

    // ----------------------------------------------------
    // BIG CINEMATIC GLOWING NARRATIVE TEXT CONTROLLER
    // ----------------------------------------------------
    playCinematicNarrative: function () {
      var self = this;
      var lineIdx = 0;
      var textEl = this.cinemaTextLine;
      if (!textEl) return;

      function showLine() {
        if (!self.isActive) return;

        if (lineIdx >= NARRATIVE_LINES.length) {
          // All lines completed! Pause on final line, then reveal Mission 02 End Card
          self.delay(function () {
            if (!self.isActive) return;
            textEl.classList.remove("active");
            textEl.classList.add("exit");
            self.delay(function () {
              if (!self.isActive) return;
              self.showEndCard();
            }, 600);
          }, 2000);
          return;
        }

        var text = NARRATIVE_LINES[lineIdx];
        lineIdx++;

        // Step 1: Fade out previous line
        textEl.classList.remove("active");
        textEl.classList.add("exit");

        self.delay(function () {
          if (!self.isActive) return;
          textEl.textContent = text;
          textEl.classList.remove("exit");
          void textEl.offsetWidth;
          // Step 2: Fade in new line with subtle red glow
          textEl.classList.add("active");

          if (window.Sound && window.Sound.whisper && lineIdx % 2 === 1) {
            window.Sound.whisper();
          }

          // Line pacing: 2.2s for short lines, 2.8s for longer lines
          var waitTime = text.length > 50 ? 2800 : 2200;
          self.delay(showLine, waitTime);
        }, 550);
      }

      showLine();
    },

    showEndCard: function () {
      if (this.cinemaWrap) this.cinemaWrap.hidden = true;
      if (this.endcard) {
        this.endcard.hidden = false;
        void this.endcard.offsetWidth;
      }
      var S = window.Sound || {};
      if (S.cutsceneImpact) S.cutsceneImpact();
    },

    // ----------------------------------------------------
    // CLEAN DISMISSAL & HANDOFF
    // ----------------------------------------------------
    exit: function (skipped) {
      this.isActive = false;
      this.clearTimers();
      if (this.animFrame) cancelAnimationFrame(this.animFrame);

      var S = window.Sound || {};
      if (S.cutsceneVortexHum) S.cutsceneVortexHum(false);
      if (S.cutsceneWarpEngine) S.cutsceneWarpEngine(false);

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
        self.resetVisuals();

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
