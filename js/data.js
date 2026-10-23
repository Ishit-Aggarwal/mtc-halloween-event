/* =========================================================
   WHEEL OF CURSES — game content
   Edit freely: every character needs a unique `id` and
   problems array. UI curses and twists can be any length.

   Problems are deliberately SMALL: one page, one main feature.
   `spin` is what the character says when it spins a wheel for
   the team; `idle` is what it says when it gets impatient.
   ========================================================= */

window.CURSE_DATA = {
  // Minutes between the UI-curse spin and the twist wheel unlocking.
  twistDelayMinutes: 15,

  // Seconds a team can stare at a wheel before a spirit spins it for them.
  idleSpinSeconds: 60,

  // Who spins the first wheel (before the team has a soul).
  keeper: {
    name: "The Eye", glyph: "👁️", color: "#ff7a1a",
    spin: "Let me look… let me CHOOSE.",
    idle: "Too slow, mortal. I'll choose for you…"
  },

  // Shown on every curse card.
  scopeNote: "Keep it small: one page, one main feature.",

  // Fingerprint of the SECRET TEAM NAME that opens the judges' board instead
  // of registering a team. The phrase itself is never stored in the code.
  judgeKey: "h0cgcvlf4s",

  // Fingerprint of the HOST WORD.
  hostKey: "1k65q6pmu75",

  // Easter eggs and hidden pumpkins
  eggsEnabled: false,
  eggs: {
    gate:     "A pumpkin at the crypt door",
    seals:    "A pumpkin between the seals",
    whisper:  "A pumpkin in the wheel's whisper",
    grimoire: "A pumpkin in the grimoire",
    footer:   "A pumpkin in the footer",
    card:     "A pumpkin on a fate card",
    moon:     "Poked the moon three times",
    konami:   "Raised the blood moon",
    source:   "Read the source and spoke the word"
  },

  // Shadow-figure art: CC0 silhouettes from openclipart.org, in assets/figures/.
  shadowFigures: {
    ground: [
      { name: "nosferatu-reach", src: "assets/figures/nosferatu-reach.svg" },
      { name: "nosferatu-stand", src: "assets/figures/nosferatu-stand.svg" },
      { name: "zombie-shambler", src: "assets/figures/zombie-shambler.svg" },
      { name: "contorted",       src: "assets/figures/contorted.png" },
      { name: "zombie-horde",    src: "assets/figures/zombie-horde.svg", scale: 1.15 },
      { name: "crawler",         src: "assets/figures/crawler.png", scale: 0.45 }
    ],
    sky: [
      { name: "reaper", src: "assets/figures/reaper.svg" }
    ]
  },

  // The face that hits a couple of seconds after "Enter the Crypt".
  // Any portrait picture on a dark background works; swap the file to change it.
  welcomeScare: "assets/scares/face.jpg",

  // The jump scare each character gives when a team lands on them (Wheel I).
  //   line:  the creepy line shown as it lunges
  //   sound: scream | groan | laugh | hiss | theremin
  //   image: OPTIONAL path to your own scary picture (transparent PNG works best).
  //          Leave it out to use the character's emoji as the face. Example:
  //          image: "assets/scares/dracula.png"
  characterScares: {
    "tony-stark":   { sound: "theremin", line: "Sir… there is someone else inside the suit." },
    "doraemon":     { sound: "whisper",  line: "Don't reach into the pocket. Something is already in there." },
    "dracula":      { sound: "laugh",    line: "Welcome to my castle. You may leave. Eventually." },
    "ben-10":       { sound: "theremin", line: "The Omnitrix is glowing red. It's not an alien you know." },
    "naruto":       { sound: "scream",   line: "Believe it. The Nine-Tails is staring back." },
    "goku":         { sound: "scream",   line: "His power level is over nine thousand. And he's angry." },
    "spiderman":    { sound: "hiss",     line: "Your spider-sense is screaming. Don't look up." },
    "shinchan":     { sound: "laugh",    line: "Shin-chan is smiling. Shin-chan is never this quiet." },
    "pikachu":      { sound: "theremin", line: "Pika… pika… the lights aren't flickering by accident." },
    "mario":        { sound: "scream",   line: "It's-a me. Behind you. Always behind you." },
    "sherlock":     { sound: "theremin", line: "Elementary. You were the last one in the room." },
    "batman":       { sound: "laugh",    line: "I am the night. And I am standing right behind you." },
    "elsa":         { sound: "hiss",     line: "The cold never bothered her. It will bother you." },
    "shrek":        { sound: "scream",   line: "WHAT ARE YOU DOING IN MY SWAMP?!" },
    "jack-sparrow": { sound: "laugh",    line: "The rum is gone. The crew is gone. Only you remain." },
    "gollum":       { sound: "hiss",     line: "Precious… we sees you. We sees you." },
    "frankenstein": { sound: "groan",    line: "It's alive… and it has found you." },
    "medusa":       { sound: "hiss",     line: "Whatever you do, don't look at her eyes." },
    "chhota-bheem": { sound: "groan",    line: "Bheem has run out of laddoos. He is looking at you." },
    "motu-patlu":   { sound: "groan",    line: "No samosas left. Motu has noticed you." },
    "mr-bean":      { sound: "scream",   line: "Mr. Bean stares. And stares. And does not blink." },
    "minion":       { sound: "scream",   line: "Bello. Bello. BELLO. BELLO." },
    "spongebob":    { sound: "scream",   line: "Who lives in a pineapple under the sea? Not anymore." },
    "wildcard":     { sound: "theremin", line: "Whoever you become… it is already watching." }
  },

  characters: [
    {
      id: "voldemort",
      name: "Lord Voldemort",
      short: "Voldemort",
      glyph: "🐍",
      color: "#1b4332",
      avatar: "assets/characters/voldemort.svg",
      archetype: "Dark Lord & Horcrux Sovereign",
      quote: "There is no good and evil, there is only power… and those too weak to seek it.",
      brief: "Obsessed with digital immortality and fragmented souls. Build dark-arts cloud vaults, Horcrux telemetry, or defensive ward systems.",
      lore: "He Who Must Not Be Named. Master of the Dark Arts, obsessed with immortality and supreme dominion.",
      spin: "There is no good and evil, there is only power… and those too weak to seek it. SPIN!",
      idle: "Avada Kedavra awaits those who waste the Dark Lord's time…",
      problems: [
        { t: "Horcrux Cloud Redundancy", d: "User records must be fragmented and stored across seven isolated vaults, requiring all seven shards to restore." },
        { t: "Parseltongue Terminal", d: "A security authentication shell where system commands and passwords can only be entered through snake-hiss phonetic glyphs." },
        { t: "The Dark Mark Alert Grid", d: "A critical incident broadcast dashboard that summons glowing alerts and audio pulses to every active user session." },
        { t: "Nagini's Territory Tracker", d: "An animated predator heat map monitoring restricted zones that consumes inactive form fields if neglected." },
        { t: "Forbidden Library Index", d: "A restricted book archive requiring users to complete an arcane clearance test before unlocking forbidden texts." },
        { t: "Pensieve Memory Log", d: "An interactive spatial timeline allowing users to replay past administrative decisions as floating ethereal memories." },
        { t: "Wandless Currency Exchange", d: "A magical financial ledger calculating transaction totals and currency conversions across Galleons, Sickles, and Knuts." },
        { t: "Death Eater Duty Roster", d: "A high-stakes covert mission dispatch board matching operatives with tactical objectives based on dark skill badges." }
      ]
    },
    {
      id: "joker",
      name: "The Joker",
      short: "Joker",
      glyph: "🃏",
      color: "#7209b7",
      avatar: "assets/characters/joker.svg",
      archetype: "Agent of Pure Chaos & Crime Prince",
      quote: "Why so serious? Smile, because it confuses people.",
      brief: "Master of psychological anarchy and theatrical terror. Build chaotic gig marketplaces, panic meters, or satirical crisis consoles.",
      lore: "The Clown Prince of Crime. Agent of pure chaos, nihilistic humor, and theatrical anarchy.",
      spin: "Why so serious? Let's put a smile on that wheel!",
      idle: "Tick tock, Batman! Spin the wheel or I'll blow up the city grid!",
      problems: [
        { t: "Henchmen Gig Dispatch", d: "An on-demand gig labor marketplace where masked henchmen bid on Gotham heists with hazard surge pricing." },
        { t: "Laughing Gas Countdown", d: "A ticking chemical timer requiring users to solve absurd psychological puzzles before the UI fills with toxic smoke." },
        { t: "SmileCoin Volatility Board", d: "A mock crypto trading terminal where token values swing wildly based on a live public panic index." },
        { t: "Arkham Outrage PR Agency", d: "A crisis sentiment analyzer that gauges social outrage and drafts wildly inappropriate apology press releases." },
        { t: "Gotham Mayhem Live Map", d: "A real-time city incident tracker charting police sirens, bat-signals, hijacked trucks, and chemical spills." },
        { t: "Jack-in-the-Box Checkout", d: "An e-commerce ordering system where completing a payment triggers a spring-loaded jack-in-the-box surprise." },
        { t: "Pirate TV Broadcast Hijack", d: "A video studio emulator that overlays clown makeup, audio pitch shifts, and static over user webcam feeds." },
        { t: "Bumper Car Traffic Router", d: "A chaotic navigation planner that routes drivers exclusively through carnival detours and collision hotspots." }
      ]
    },
    {
      id: "dracula",
      name: "Count Dracula",
      short: "Dracula",
      glyph: "🧛",
      color: "#9e0012",
      avatar: "assets/characters/dracula.svg",
      archetype: "Ancient Transylvanian Blood Sovereign",
      quote: "Listen to them, the children of the night. What music they make.",
      brief: "Transylvanian aristocrat bound by nocturnal predation. Build cold-chain blood supply logistics, gothic estate booking, or circadian sun tracking.",
      lore: "The ancient Transylvanian nobleman. Sovereign of the nosferatu, nocturnal predator of the living.",
      spin: "Listen to them, children of the night. What music they make… SPIN!",
      idle: "The night is short, mortal. Dawn approaches and my patience withers.",
      problems: [
        { t: "Cold-Chain Blood Bank", d: "A temperature-sensitive logistics portal tracking refrigerated blood deliveries, expiration dates, and rare Rh-negative reserves." },
        { t: "Nocturnal Shift Scheduler", d: "A 24/7 graveyard worker hub that automatically blocks logins during daylight and unlocks nocturnal features at dusk." },
        { t: "Castle Bran Hospitality", d: "A luxury gothic estate reservation engine requiring coffin dimensions, crypt preferences, and nocturnal dining requests." },
        { t: "Sunlight Radiation Radar", d: "An ultra-sensitive UV radiation forecasting dashboard charting safe shade-only walking routes through metropolitan streets." },
        { t: "Vampiric Mirror Cam", d: "A camera filter that renders the human user completely transparent against custom gothic mansion backgrounds." },
        { t: "Centuries Estate Trust", d: "A multi-generational wealth vault managing land deeds, antique gold florins, and perpetual family trusts across centuries." },
        { t: "Bat Fleet Courier Tracker", d: "A nocturnal drone delivery dispatcher routing bat swarm deliveries carrying sealed letters across mountain passes." },
        { t: "Carpathian Soil Authenticator", d: "An e-commerce verification registry certifying the native earth terroir of traveling coffins via batch QR codes." }
      ]
    },
    {
      id: "vecna",
      name: "Vecna",
      short: "Vecna",
      glyph: "🕰️",
      color: "#800e13",
      avatar: "assets/characters/vecna.svg",
      archetype: "Eldritch Mind Flayer & Rift Harbinger",
      quote: "It is time for your suffering to come to an end.",
      brief: "Telepathic entity fracturing reality with grandfather clock chimes. Build Hawkins seismic rift maps, psionic mental telemetry, or dimensional portals.",
      lore: "Ruler of the Upside Down. A telepathic dark sorcerer who torments minds with grandfather clock chimes.",
      spin: "Your time has come. It is time for your suffering to end… SPIN.",
      idle: "Four chimes… the rift is opening. Spin before your mind breaks.",
      problems: [
        { t: "Hawkins Rift Evacuation", d: "A municipal disaster navigation map directing citizens safely around expanding seismic rifts and gate zones." },
        { t: "Grandfather Clock Chronometer", d: "An ominous four-chime countdown clock that halts all interactions and turns the interface crimson on the quarter hour." },
        { t: "Lifeline Cassette Prescriber", d: "A music therapy playlist algorithm matching emotional patient memories with grounding songs to shatter psychic trances." },
        { t: "Upside Down Spore Telemetry", d: "An environmental sensor console tracking airborne spore density, bio-organic vines, and temperature anomalies." },
        { t: "Psychic Trauma Telehealth", d: "A behavioral clinic monitoring journal graphing anxiety spikes, nightmares, and nosebleed occurrences." },
        { t: "Sensory Float Tank Portal", d: "A clinic booking engine for sensory-deprivation float tanks monitoring water salinity and telepathic amplification." },
        { t: "Mind Flayer Hive Visualizer", d: "A real-time network topology tool visualizing infected civic nodes connected by pulsing tendrils." },
        { t: "Demogorgon Ultrasonic Radar", d: "An audio spectrogram analyzer listening for sub-bass growls and tracking nocturnal predator approach vectors." }
      ]
    },
    {
      id: "stree",
      name: "Stree",
      short: "Stree",
      glyph: "🏮",
      color: "#c1121f",
      avatar: "assets/characters/stree.svg",
      archetype: "Vengeful Chanderi Spirit & Night Sovereign",
      quote: "O Stree, kal aana… par aaj raat yahan sirf mera raaj hai.",
      brief: "Nocturnal spirit of Chanderi demanding respect. Build sunset safety curfew alerts, SOS geofences, and cultural folklore preservation grids.",
      lore: "The mysterious spirit of Chanderi who visits on festive nights. 'O Stree, kal aana.'",
      spin: "Purushon ke sheher mein Stree ka raaj hai… Ghumaao pahiya!",
      idle: "Raat gehri ho rahi hai… Jaldi karo, warna main aa rahi hoon.",
      problems: [
        { t: "Chanderi Night Curfew", d: "A municipal safety dashboard with a sunset curfew countdown, geofenced SOS button, and verified night escort dispatch." },
        { t: "Respect Verification Bureau", d: "An anonymous workplace dignity audit tool and harassment reporting portal that grades organizations on gender respect." },
        { t: "Chanderi Handloom Direct", d: "A fair-trade e-commerce showcase connecting rural saree weavers directly with global buyers to cut out exploitative brokers." },
        { t: "Vermilion Gatekeeper", d: "A smart doorbell system that digitally paints protective vermilion inscriptions ('O Stree Kal Aana') across entryways." },
        { t: "Inverted Footstep Gait Scanner", d: "A computer vision security tool analyzing night pedestrian walking gaits to detect reverse-facing spirits on unlit roads." },
        { t: "Oral Folklore Voice Archive", d: "A crowdsourced audio library where village elders upload spoken regional ghost legends with dialect translation." },
        { t: "Midnight Streetlight Tracker", d: "A civic reporting map where citizens log broken streetlights, neglected alleys, and safe walking corridors." },
        { t: "Bodily Autonomy Micro-Insurance", d: "A micro-finance insurance web portal offering instant cashless claims for emergency legal aid and women's trauma support." }
      ]
    },
    {
      id: "wednesday",
      name: "Wednesday Addams",
      short: "Wednesday",
      glyph: "🕷️",
      color: "#2b2d42",
      avatar: "assets/characters/wednesday.svg",
      archetype: "Nevermore Outcast & Morbid Sleuth",
      quote: "I find social interaction exhausting, but this wheel is mildly amusing.",
      brief: "Brilliant, deadpan outcast prodigy of Nevermore. Build peer barter networks, cello acoustic cryptography, and monochrome forensic investigative tools.",
      lore: "Gothic outcast prodigy of Nevermore Academy. Unflinching, morbidly sharp, and immune to fear.",
      spin: "I find social interaction exhausting, but this wheel is mildly amusing. Spin.",
      idle: "If you hesitate for another ten seconds, I will test my guillotine on your keyboard.",
      problems: [
        { t: "Nevermore Secret Barter", d: "A student-to-student peer trading network for exchanging antique lab equipment, rare books, and raven quills with zero currency." },
        { t: "Cold-Case Corkboard", d: "An interactive detective investigation board connecting suspect photos, autopsy reports, and timeline pins with red yarn." },
        { t: "Botanical Poison & Antidote Guide", d: "A mobile-first toxicology reference that scans toxic nightshade plants and displays clinical antidote formulas." },
        { t: "Solo Cello Performance Booker", d: "A boutique booking platform for classical cello and macabre instrumental performers targeting underground venues." },
        { t: "Typewriter Antique Repair Exchange", d: "A circular right-to-repair directory linking owners of manual mechanical typewriters with master craftspeople." },
        { t: "Gothic Cemetery Genealogy", d: "A 3D gravestone archive mapping weathered cemetery epitaphs and linking forgotten family heritage records." },
        { t: "Thing's Courier Service", d: "A micro-task delivery tracker managing disembodied hand errands and secret drop-off lockers across campus." },
        { t: "Color-Allergy Monochrome Wardrobe", d: "A minimalist fashion catalog strictly filtering garments by shade, texture, and complete absence of cheerful colors." }
      ]
    },
    {
      id: "pennywise",
      name: "Pennywise",
      short: "Pennywise",
      glyph: "🎈",
      color: "#e63946",
      avatar: "assets/characters/pennywise.svg",
      archetype: "Cosmic Terror & Dancing Clown",
      quote: "You will float down here… we all float down here!",
      brief: "Ancient terror lurking beneath Derry's streets. Build municipal sewer stormwater telemetry, phobia databases, or carnival funhouse distortion engines.",
      lore: "The Dancing Clown of Derry. An ancient cosmic entity that feeds on terror from the storm drains.",
      spin: "You'll float down here… we all float down here! SPIN, hahahaha!",
      idle: "Don't you want a balloon, Georgie? Spin before I feast on your fear!",
      problems: [
        { t: "Derry Stormwater Telemetry", d: "A municipal drainage dashboard graphing real-time sewer water levels, pipe blockages, and storm runoff warnings." },
        { t: "Phobia Exposure Teletherapy", d: "A clinical health portal tracking patient heart rates, journaling fear triggers, and scheduling licensed exposure therapy." },
        { t: "Carnival Hygiene Audit", d: "A public inspection registry grading pop-up circus food stands on oil cleanliness, temperature logs, and safety certs." },
        { t: "Neibolt Street Blight Registry", d: "An urban planning civic map cataloging derelict Victorian properties for municipal cleanup and community revitalization." },
        { t: "Missing Youth Rapid Alert", d: "An emergency amber alert broadcast portal with volunteer search-party check-ins, radius maps, and verified lead reporting." },
        { t: "Floating Balloon Proximity Radar", d: "An IoT proximity sensor interface tracking suspicious floating helium objects and alert radius breaches in public parks." },
        { t: "Paper Boat Gutter Currents", d: "A fluid dynamics physics simulator mapping rainwater flow velocity down street curbs into storm gutters." },
        { t: "Derry 27-Year Catastrophe Archive", d: "A historical civic timeline documenting periodic town disasters, ironwork explosions, and recurring town panics." }
      ]
    },
    {
      id: "valak",
      name: "Valak (The Nun)",
      short: "Valak",
      glyph: "✝️",
      color: "#2b1055",
      avatar: "assets/characters/valak.svg",
      archetype: "The Defiler Demon & Unholy Abbess",
      quote: "Forgive me father, for I have possessed your darkest prayers.",
      brief: "Blasphemous demon haunting consecrated halls. Build Vatican sacred relic provenance catalogs, abbey acoustic sensors, and occult containment monitors.",
      lore: "The Marquis of Snakes. A demonic entity masquerading in sacred vestments, haunting Romanian abbeys.",
      spin: "The shadow of the cloister falls upon your fate. Spin into darkness.",
      idle: "Pray as you will, mortal… your hesitation only feeds the defiler.",
      problems: [
        { t: "Vatican Relic Registry", d: "An international anti-smuggling catalog tracing the ownership chain, provenance, and recovered locations of ancient sacred relics." },
        { t: "Cathedral Structural Telemetry", d: "A heritage preservation dashboard monitoring laser vibration sensors, moisture, and foundation cracks in medieval stone abbeys." },
        { t: "Silent Cloister Retreat Portal", d: "A booking portal for digital-detox monastery retreats enforcing vow-of-silence tiers and sensory-deprivation schedules." },
        { t: "Parish Crisis Helpline", d: "An urgent mental health escalation portal linking parish community members with licensed psychological crisis teams." },
        { t: "Ancient Manuscript OCR Restorer", d: "A crowdsourced archival tool reconstructing decaying Latin codices with high-resolution multispectral image zooming." },
        { t: "Catacomb Air Quality Sensor", d: "An environmental facility console graphing toxic radon, black mold spores, and oxygen levels in underground stone crypts." },
        { t: "Blessed Water Inventory", d: "A supply chain tracker managing cistern purification schedules and distribution logistics across remote rural sanctuaries." },
        { t: "Spectral Whisper Audio Analyzer", d: "An audio engineering tool filtering low-frequency acoustic noise to isolate ambient speech patterns from surveillance audio." }
      ]
    },
    {
      id: "maleficent",
      name: "Maleficent",
      short: "Maleficent",
      glyph: "🦹‍♀️",
      color: "#560bad",
      avatar: "assets/characters/maleficent.svg",
      archetype: "Mistress of All Evil & Dark Fairy",
      quote: "Before the sun sets on her sixteenth birthday, she shall fall into a sleep like death.",
      brief: "Protector of the enchanted Moors wielding dragon fire. Build enchanted forest land registries, iron-allergy perimeter defenses, and dark fairy treaty pacts.",
      lore: "Mistress of all Evil. Sovereign of the Moors, wielder of dark fairy thorns and dragon fire.",
      spin: "A most delightful party… and now I bestow my curse upon the wheel!",
      idle: "You insolent peasants… Do not test my supreme fairy wrath. Spin!",
      problems: [
        { t: "Moors Land Titling Registry", d: "A tamper-proof territorial mapping registry protecting ancient enchanted forests from clear-cutting and illegal royal encroachments." },
        { t: "Fauna Wildlife Sanctuary Triage", d: "A rescue coordination hub managing intake, injury diagnoses, and habitat placement for endangered magical creatures." },
        { t: "100-Year Coma Sleep Clinic", d: "A specialized sleep medicine dashboard monitoring patient apnea-hypopnea indices, oxygen saturation, and deep sleep stages." },
        { t: "Raven Drone Scouting Fleet", d: "An autonomous aerial drone console plotting search-and-rescue search grids and thermal scanning over dense briar forests." },
        { t: "Textile Spindle OSHA Safety", d: "An industrial factory reporting tool auditing spinning wheel needle guards, puncture hazards, and worker safety claims." },
        { t: "Feuding Kingdom Summit Mediator", d: "A neutral diplomatic negotiation platform featuring shared treaty clause annotations, voting thresholds, and truce timers." },
        { t: "Bramble Wall Perimeter Defense", d: "A civic barrier management console controlling modular living bio-barriers around vulnerable rural frontier settlements." },
        { t: "Royal Curse Escrow Vault", d: "A conditional smart-contract vault holding kingdom titles in escrow pending verified true-love clause verification." }
      ]
    },
    {
      id: "annabelle",
      name: "Annabelle",
      short: "Annabelle",
      glyph: "🪆",
      color: "#8b263e",
      avatar: "assets/characters/annabelle.svg",
      archetype: "Cursed Conduit & Occult Vessel",
      quote: "Did you miss me? The glass cannot hold what was never alive.",
      brief: "Malevolent spirit tethered to a vintage porcelain doll. Build occult museum quarantine inventories, blessed barrier monitoring, and EVP paranormal loggers.",
      lore: "The cursed porcelain conduit locked in the Warrens' occult museum. Positively do not open.",
      spin: "Miss me? The glass is breaking… SPIN!",
      idle: "The doll moved… and it's staring directly at your trembling fingers.",
      problems: [
        { t: "Occult Artifact Quarantine Vault", d: "A high-security inventory system tracking hazardous cursed museum relics with containment tiers and blessed maintenance logs." },
        { t: "Antique Appraisal Authenticator", d: "An auction verification portal checking porcelain composition, antique doll maker hallmarks, and owner liability waivers." },
        { t: "Smart Toy Privacy Vulnerability Audit", d: "A cybersecurity consumer dashboard testing Wi-Fi and Bluetooth toys for unencrypted microphones and unauthorized data transmission." },
        { t: "Homeowner Strange Event Triage", d: "An insurance claims wizard helping policyholders distinguish plumbing water-hammer and electrical shorts from unexplained phenomena." },
        { t: "Sealed Case Pressure Telemetry", d: "An IoT monitoring console graphing glass case pressure seals, vibration sensors, and unauthorized door breach alerts." },
        { t: "Antique Toy Restoration Network", d: "A craftsperson directory connecting collectors with vintage doll doctors specializing in lead-free paint and porcelain repair." },
        { t: "Nightmare Behavioral Journal", d: "A pediatric sleep tracking portal for parents to log recurring childhood nightmares, sleepwalking, and sudden behavioral changes." },
        { t: "Cursed Estate Moving Logistics", d: "A specialty transport coordinator managing certified packaging, shockproof transport, and spiritual handling for historic items." }
      ]
    },
    {
      id: "manjulika",
      name: "Manjulika",
      short: "Manjulika",
      glyph: "💃",
      color: "#b7094c",
      avatar: "assets/characters/manjulika.svg",
      archetype: "Royal Haveli Spectre & Court Dancer",
      quote: "Ami je tomar… shudho je tomar… Mukti chai!",
      brief: "Wronged royal dancer locked in the haveli chamber. Build 3D palace architectural restoration viewers, classical Kathak acoustic boards, and heirloom auctions.",
      lore: "The vengeful court dancer locked in the third-floor haveli bedroom. 'Ami Je Tomar.'",
      spin: "Ami je tomar shudho je tomar… Ghungroo baandh ke ghumaao pahiya!",
      idle: "Darwaaza khul chuka hai… Agle chaar phero tak ghoom jaa!",
      problems: [
        { t: "Royal Haveli 3D Restoration", d: "An interactive architectural restoration viewer allowing donors to inspect dilapidated royal palace rooms and sponsor specific wings." },
        { t: "Classical Kathak Stage Booking", d: "A cultural booking and streaming platform connecting classical dancers with performance venues, ticketing, and patron tips." },
        { t: "Royal Ghungroo Provenance Passport", d: "A luxury asset tracker certifying the heritage origin, gemstone authenticity, and historical lineage of royal jewelry." },
        { t: "Haveli Maze Navigation Guide", d: "An interactive indoor GPS mapping confusing multi-story heritage mansions with step-by-step route guidance and emergency fire exits." },
        { t: "Dissociative Identity Clinical Hub", d: "A specialized psychiatric dashboard providing alter-ego grounding exercises, trigger logs, and collaborative therapy journals." },
        { t: "Palace Midnight Storytelling Tours", d: "An experiential tourism reservation platform booking midnight historical storytelling walks with verified guest reviews." },
        { t: "Vintage Gramophone Audio Remaster", d: "An audio restoration web studio removing hiss and wow-flutter from early 20th-century classical music recordings." },
        { t: "Locked Chamber Deadbolt Override", d: "A smart heritage hotel security dashboard detecting unauthorized electronic lock overrides on historical sealed suites." }
      ]
    },
    {
      id: "ghostface",
      name: "Ghostface",
      short: "Ghostface",
      glyph: "📞",
      color: "#e01e37",
      avatar: "assets/characters/ghostface.svg",
      archetype: "Woodsboro Slasher & Cinema Zealot",
      quote: "What is your favorite scary movie? Do not hang up on me.",
      brief: "Meta-horror slasher obsessed with phone calls and film rules. Build anonymous crisis hotline triage apps, horror trivia escape consoles, and spoof call detectors.",
      lore: "The masked Woodsboro killer obsessed with scary movies, prank calls, and slasher trivia.",
      spin: "What's your favorite scary movie? Spin the wheel or you're the next opening scene!",
      idle: "Hello? Did you hang up on me? Bad move. Spin now.",
      problems: [
        { t: "Crisis Call Shield & Triage", d: "A confidential crisis helpline app with real-time phone number masking, live transcript logging, and one-tap police pinging." },
        { t: "Slasher Cinema Timed Trivia", d: "A live multiplayer horror film trivia arena testing movie knowledge under a ticking guillotine timer with elimination brackets." },
        { t: "Voice-Clone Deepfake Detector", d: "A telecom security scanner analyzing incoming audio streams for synthetic voice clones and caller ID spoofing indicators." },
        { t: "Neighborhood Doorbell Ring", d: "A community video-sharing hub that automatically blurs bystander faces to preserve privacy while sharing security incident clips." },
        { t: "Anti-Bullying School Mediation", d: "A safe school social platform using sentiment AI to filter toxic insults and route peer disputes to licensed counselors." },
        { t: "Solo Living Home Security Audit", d: "An interactive home security audit checking window latches, door deadbolts, and lighting to generate a renter safety score." },
        { t: "Horror Movie Prop Exchange", d: "A peer-to-peer collector marketplace for buying, authenticating, and trading vintage horror costumes and theatrical memorabilia." },
        { t: "Emergency Contact Speed-Dial", d: "A rapid personal safety broadcaster delivering immediate location pings, battery status, and audio clips to five trusted contacts." }
      ]
    },
    {
      id: "freddy",
      name: "Freddy Krueger",
      short: "Freddy",
      glyph: "🧤",
      color: "#9b2226",
      avatar: "assets/characters/freddy.svg",
      archetype: "Springwood Dream Demon & Nightmare Weaver",
      quote: "One, two, Freddy is coming for you… Welcome to prime time!",
      brief: "Razor-clawed master of the dream world. Build smartwatch parasomnia sleep telemedicine, lucid dreaming defense alerts, and boiler room heat telemetry.",
      lore: "The Springwood slasher with razor-clawed gloves. King of nightmares where dreams become fatal.",
      spin: "One, two, Freddy's coming for you… Three, four, spin the crypt door!",
      idle: "Falling asleep on me, kid? Once you close your eyes, you're mine!",
      problems: [
        { t: "Parasomnia Nightmare Telehealth", d: "A sleep clinic monitoring portal integrating smartwatch sleep architecture data to track nightmare frequencies and insomnia CBT." },
        { t: "Boiler Room PSI Telemetry", d: "An industrial IoT dashboard monitoring steam boiler psi pressure, infrared heat hotspots, and emergency pressure-relief valves." },
        { t: "Lucid Dream Reality Trainer", d: "A cognitive conditioning app delivering subtle auditory reality-check prompts throughout the day to build lucid dream control." },
        { t: "Highway Trucker Alertness Coach", d: "A commercial driver fatigue planner calculating optimal caffeine intake schedules, required rest stops, and circadian dips." },
        { t: "Burn Survivor Healthcare Grants", d: "A medical non-profit directory connecting pediatric burn trauma survivors with reconstructive surgery grants and peer support." },
        { t: "Industrial Brownfield Cleanup", d: "A civic transparency portal tracking heavy metal soil decontamination and zoning approvals for decommissioned boiler plants." },
        { t: "Binaural White Noise Generator", d: "A therapeutic ambient sound generator blending custom frequencies, delta waves, and pink noise to prevent night terrors." },
        { t: "Blackout Sleep Sanctuary Builder", d: "An e-commerce configuration tool designing custom acoustic baffles, thermal cooling mattress toppers, and 100% light-seal blinds." }
      ]
    },
    {
      id: "frankenstein",
      name: "Frankenstein's Monster",
      short: "Frankenstein",
      glyph: "⚡",
      color: "#2a9d8f",
      avatar: "assets/characters/frankenstein.svg",
      archetype: "Galvanic Reanimated Prometheus",
      quote: "Beware, for I am fearless, and therefore powerful.",
      brief: "Reanimated titan seeking understanding and lightning. Build clean-tech storm lightning energy grids, prosthetic biosensor monitors, and AAC companion boards.",
      lore: "The reanimated galvanic giant. Created from discarded flesh, craving companionship and vengeance.",
      spin: "IT IS ALIVE! Channel the lightning and turn the wheel!",
      idle: "Creator… you abandon me? Fire bad… slow mortals worse!",
      problems: [
        { t: "Lightning Surge Energy Grid", d: "A clean-tech renewable power simulator modeling lightning strike energy capture, capacitor bank storage, and microgrid loads." },
        { t: "Organ Transplant Matcher", d: "A time-critical medical logistics dashboard matching donor organ HLA tissue compatibility with flight transit countdowns." },
        { t: "CRISPR Gene-Editing Bioethics", d: "A scientific peer-review repository where synthetic biology and gene-editing labs submit human trial protocols for ethical approval." },
        { t: "3D-Printed Bionic Prosthetics", d: "An open-source customizer allowing amputees to enter measurements and download 3D-printable bionic limb blueprints for free." },
        { t: "Chronic Loneliness Companion", d: "An empathy-focused connection platform pairing individuals facing severe social isolation with verified conversation partners." },
        { t: "Willed Body Anatomical Registry", d: "A dignified donor registration portal managing informed consent documentation and memorial dedications for medical research donations." },
        { t: "Scrap Electronics Reanimator", d: "A circular electronics hub providing circuit schematics to build functional microcomputers from discarded e-waste parts." },
        { t: "Outsider Philosophy & Essay Hub", d: "A distraction-free publishing space for marginalized voices exploring identity, abandonment, and the human condition." }
      ]
    },
    {
      id: "grim-reaper",
      name: "The Grim Reaper",
      short: "The Reaper",
      glyph: "💀",
      color: "#4a4e69",
      avatar: "assets/characters/grim-reaper.svg",
      archetype: "Cosmic Harvester & Reaper of Souls",
      quote: "Every clock counts down to the same harvest. Your time has arrived.",
      brief: "Inevitable cosmic psychopomp marking life's hourglass. Build posthumous digital footprint erasers, global longevity health maps, and organ donor bridge registries.",
      lore: "The Pale Rider, harvester of souls. Neutral, relentless, and marking the final sands of time.",
      spin: "The scythe swings for all mortals in due time. Spin.",
      idle: "The hourglass runs dry. None escape the harvest… make your choice.",
      problems: [
        { t: "Global Actuarial Longevity Map", d: "An interactive public health dashboard comparing life expectancy, preventable disease vectors, and healthcare quality across 190 countries." },
        { t: "Posthumous Digital Footprint Eraser", d: "A secure digital dead-man's switch service that automatically wipes cloud accounts or delivers encrypted wills upon verified notice." },
        { t: "Hospice & Palliative Matcher", d: "A compassionate matchmaking platform helping families find certified hospice care facilities, pain specialists, and end-of-life doulas." },
        { t: "Eco-Burial & Conservation Forestry", d: "A sustainable death care portal comparing biodegradable mushroom urns, coral reef placements, and conservation memorial woodlands." },
        { t: "Binding Last Will Generator", d: "A step-by-step legal tech tool creating legally binding last wills, healthcare proxies, and child guardianship declarations." },
        { t: "Grief & Bereavement Circles", d: "A supportive community recovery platform offering daily bereavement check-ins and practical administrative estate checklists." },
        { t: "Organ Donor Registry Bridge", d: "A civic registration hub streamlining driver-license organ donor opt-ins with verifiable cryptographic donor cards." },
        { t: "Statistical Hourglass Visualizer", d: "A philosophical time-awareness calculator estimating remaining waking hours based on habits to encourage intentional living." }
      ]
    },
    {
      id: "medusa",
      name: "Medusa",
      short: "Medusa",
      glyph: "🐍",
      color: "#52b788",
      avatar: "assets/characters/medusa.svg",
      archetype: "Petrifying Gorgon & Serpent Priestess",
      quote: "Look directly into my eyes, and turn your doubts to solid stone.",
      brief: "Snake-haired guardian whose gaze petrifies flesh. Build blind-values social connection networks, temple architectural security, and facial privacy shields.",
      lore: "The snake-haired Gorgon. One glance turns flesh to stone; an immortal guardian of ancient ruins.",
      spin: "Look into my eyes if you dare… Spin before you turn to stone!",
      idle: "My serpents grow hungry… One more second and you join my marble garden.",
      problems: [
        { t: "Blind Connection Values Platform", d: "A voice-and-values-first social platform where user avatars and profile photos remain locked until users exchange 50 genuine messages." },
        { t: "Sustainable Stone Masonry Hub", d: "A green building marketplace connecting architects with low-carbon local stone quarries, calculating thermal mass benefits." },
        { t: "Digital Screen Eye Strain Guard", d: "A vision health web utility tracking daily screen lux exposure, prescribing 20-20-20 blink routines, and testing display contrast." },
        { t: "Retaliatory Lawsuit Legal Defense", d: "A pro-bono legal resource center matching defamation defense attorneys with survivors facing retaliatory SLAPP lawsuits." },
        { t: "Rural Antivenom Drone Logistics", d: "A hospital antivenom stockpile tracker mapping snakebite incidence and routing refrigerated drone deliveries to rural clinics." },
        { t: "Mirror Rooftop Urban Cooling", d: "A smart city heat simulator demonstrating how coating urban rooftops with ultra-reflective coatings reduces city surface temperatures." },
        { t: "Gorgon 3D Classical Sculpture", d: "An interactive 3D virtual museum showcasing life-sized marble statues with high-resolution rotational lighting inspection." },
        { t: "Scalp Health Dermatological Portal", d: "A clinical trichology consultation tool analyzing scalp barrier health and recommending natural herbal therapies." }
      ]
    },
    {
      id: "sauron",
      name: "Sauron",
      short: "Sauron",
      glyph: "👁️",
      color: "#d9480f",
      avatar: "assets/characters/sauron.svg",
      archetype: "The Great Eye & Lord of Mordor",
      quote: "You cannot hide. I see you. There is no life in the void, only death.",
      brief: "Ancient dark lord crowned with the fiery all-seeing eye. Build employee bossware detection scanners, cryptographic ring trackers, and volcanic geothermal grids.",
      lore: "The Lord of the Rings and Dark Lord of Mordor. The Great Eye that sees all darkness.",
      spin: "One Wheel to rule them all, One Wheel to find them… SPIN!",
      idle: "I SEE YOU. There is no life in the void, only death. Spin!",
      problems: [
        { t: "Bossware Spyware Audit", d: "An employee advocacy security tool scanning laptops for hidden monitoring software and rating company surveillance intrusiveness." },
        { t: "Maritime Chokepoint Freight Tracker", d: "A global trade dashboard tracking commercial vessel congestion at major canal chokepoints and modeling detour costs." },
        { t: "Geothermal Borehole Power Console", d: "A renewable energy monitoring system tracking subsurface magma temperatures, steam turbine outputs, and localized seismic micro-tremors." },
        { t: "Corporate Anti-Monopoly Visualizer", d: "An investigative finance tool mapping interlocking board directors, conglomerate ownership webs, and market dominance indices." },
        { t: "Industrial Smokestack Emission Sensor", d: "An environmental regulatory dashboard reading factory chimney sensor feeds and issuing automatic fines for sulfur violations." },
        { t: "Decentralized Alliance Governance", d: "A transparent quadratic voting platform enabling multi-party international coalitions to reach binding consensus decisions." },
        { t: "Counterfeit Metallurgy Testing", d: "A materials testing database verifying steel alloy composition, structural stress thresholds, and forged component certificates." },
        { t: "Deforestation Satellite Watchdog", d: "A satellite telemetry console tracking illegal mining encroachments and clear-cutting across protected mountain reserves." }
      ]
    },
    {
      id: "chucky",
      name: "Chucky",
      short: "Chucky",
      glyph: "🔪",
      color: "#d00000",
      avatar: "assets/characters/chucky.svg",
      archetype: "Possessed Voodoo Doll & Serial Killer",
      quote: "Hi, I am Chucky! Wanna play? A true classic never goes out of style.",
      brief: "Voodoo-bound serial killer trapped in a plastic toy. Build smart-toy Wi-Fi vulnerability auditors, toxic toy recall databases, and voodoo transfer simulators.",
      lore: "Charles Lee Ray inside a Good Guy doll. Sarcastic, foul-mouthed, and impossible to destroy.",
      spin: "Hi, I'm Chucky, wanna play? Give that damn wheel a spin!",
      idle: "Hey! I don't have all day, kiddo! Spin it before I find my knife!",
      problems: [
        { t: "Smart-Toy Wi-Fi Security Scanner", d: "A consumer cybersecurity portal scanning Bluetooth and smart toy model numbers for unencrypted audio streams and open ports." },
        { t: "Defective Toy Recall Rapid Alert", d: "A barcode verification tool cross-referencing infant toy models against national safety recalls with printable return shipping labels." },
        { t: "Spiritual Traditions Registry", d: "An educational cultural heritage registry documenting authentic Afro-Caribbean spiritual traditions, folklore herbs, and history." },
        { t: "Crisis PR Product Recall War Room", d: "A corporate communication simulator testing press release drafts, customer hotline routing, and brand reputation metrics." },
        { t: "Foster Placement Compatibility Tool", d: "A child welfare caseworker portal evaluating foster home readiness, trauma certifications, and post-placement check-ins." },
        { t: "Toy Battery Chemical E-Waste Kiosk", d: "A municipal recycling network mapping neighborhood collection drop-offs for leaking alkaline and lithium toy batteries." },
        { t: "Broken Plastic Toy Upcycler", d: "A circular manufacturing exchange turning discarded plastic toys into durable community playground materials." },
        { t: "Home Smart Assistant Mic Firewall", d: "A network router dashboard blocking unauthorized voice recording telemetry from smart household devices." }
      ]
    },
    {
      id: "headless-horseman",
      name: "Headless Horseman",
      short: "Horseman",
      glyph: "🎃",
      color: "#f77f00",
      avatar: "assets/characters/headless-horseman.svg",
      archetype: "Hessian Phantom & Hollow Specter",
      quote: "Ride into Sleepy Hollow, where the shadows claim your head before dawn.",
      brief: "Decapitated warrior riding through Sleepy Hollow. Build autonomous vehicle nocturnal fog LiDAR simulators, historic bridge monitoring, and night navigation maps.",
      lore: "The spectral Hessian galloping through Sleepy Hollow clutching a flaming jack-o'-lantern.",
      spin: "Hooves thunder across the covered bridge… Spin before the clock strikes midnight!",
      idle: "The flaming pumpkin burns low… Ride with the dead or be trampled!",
      problems: [
        { t: "Autonomous Vehicle Fog Radar", d: "A driverless vehicle simulation testing LiDAR and thermal sensor performance when detecting unlit pedestrians in heavy nocturnal fog." },
        { t: "Rural Crossroads Hazard Map", d: "A crowdsourced traffic engineering map documenting blind intersections and speeding hotspots to lobby county officials for roundabouts." },
        { t: "Pumpkin Farm Surplus Marketplace", d: "An agricultural food-waste portal connecting pumpkin growers with craft bakeries, breweries, and organic compost facilities." },
        { t: "Emergency Trauma Air Ambulance", d: "A flight operations console calculating aeromedical helicopter response times, weather visibility, and trauma room readiness." },
        { t: "Equine Sanctuary Rescue Network", d: "A horse rehabilitation and adoption directory managing equine veterinary charts, feed sponsorships, and foster stable networks." },
        { t: "Geofenced Silent Audio Ghost Walk", d: "A location-aware smartphone walking tour delivering historical folklore audio without creating loudspeaker noise in quiet neighborhoods." },
        { t: "Highway Wildlife Night Crossing", d: "An infrared sensor array flashing dynamic speed warnings to motorists when large wildlife approach rural highway shoulders." },
        { t: "Historic Wooden Bridge Telemetry", d: "A structural sensor dashboard monitoring live axle load limits and timber deflection on heritage covered bridges." }
      ]
    },
    {
      id: "wildcard",
      name: "The Wildcard (Custom Soul)",
      short: "Wildcard",
      glyph: "👤",
      color: "#6c757d",
      avatar: "assets/characters/wildcard.svg",
      archetype: "Unbound Void Entity & Custom Sovereign",
      quote: "From the unwritten void, a new nightmare emerges. Define your darkness.",
      brief: "An unwritten anomaly emerging from the dark void. Free to author custom villain lore, backstories, moral flaws, and tailored web applications.",
      lore: "A nameless wandering shadow from the void. Free to author your own dark entity lore.",
      spin: "The shadow takes whatever shape you give it… Spin into the unknown!",
      idle: "A blank canvas of pure terror waits… Do not leave the void waiting.",
      problems: [
        { t: "Villain Lore & Character Studio", d: "An interactive tabletop character creator where teams author custom villain backstories, moral flaws, and exportable lore sheets." },
        { t: "Unsolved Paradox Crowdsourcing", d: "A collaborative mathematical and scientific problem board where researchers submit peer-reviewed hypotheses for open paradoxes." },
        { t: "Decentralized IPFS Web Zine", d: "A drag-and-drop web publishing engine allowing writers to publish uncensored counter-culture zines on distributed peer-to-peer storage." },
        { t: "Explainable AI Model Inspector", d: "An interactive machine learning audit dashboard exposing hidden feature weights, bias vectors, and decision paths in black-box models." },
        { t: "Lost Digital Internet Museum", d: "A 3D virtual archive preserving early-2000s web communities, abandoned chatrooms, and forgotten digital net-art." },
        { t: "Black-Swan Crisis Simulator", d: "A municipal sandbox simulation testing civil preparedness policies against hypothetical power grid collapses and supply shocks." },
        { t: "Cosmic Signal Spectrogram Lab", d: "A citizen-science radio astronomy portal allowing users to filter noise and analyze anomalous deep-space radio bursts." },
        { t: "Self-Destructing Encrypted Note", d: "A zero-knowledge secure note tool generating ephemeral links that permanently erase their contents upon being opened." }
      ]
    }
  ],

  // Wheel 3 — 20 Authentic UI Hexes from ui_ideas/
  uiCurses: [
    {
      id: "cyberpunk-cemetery",
      t: "Cyberpunk Cemetery",
      glyph: "⚡",
      d: "Neon purple, toxic green, glowing gravestones and futuristic haunted interfaces.",
      mustHave: "Neon glow effects and a futuristic navigation bar."
    },
    {
      id: "haunted-glass",
      t: "Haunted Glass",
      glyph: "🪞",
      d: "Frosted-glass panels floating over a foggy haunted mansion, with translucent purple and orange accents.",
      mustHave: "Two glass-effect panels (backdrop-filter: blur()) and blurred backgrounds."
    },
    {
      id: "monster-brutalism",
      t: "Monster Brutalism",
      glyph: "🧱",
      d: "Oversized typography, chunky borders, jagged layouts and aggressive orange-black contrasts.",
      mustHave: "Bold borders, hard shadows, and oversized headings."
    },
    {
      id: "neon-witchcraft",
      t: "Neon Witchcraft",
      glyph: "🧪",
      d: "Acid slime green, arcane runes, glowing potion vials and dark apothecary accents.",
      mustHave: "Arcane glowing badges and an interactive potion/toggle control."
    },
    {
      id: "vampire-royalty",
      t: "Vampire Royalty",
      glyph: "👑",
      d: "Regal gothic typography, deep burgundy, black velvet textures and antique gold details.",
      mustHave: "An elegant hero section and luxurious content cards."
    },
    {
      id: "minimal-nightmare",
      t: "Minimal Nightmare",
      glyph: "◽",
      d: "Clean layouts, eerie whitespace, tiny unsettling details and restrained black-and-white visuals.",
      mustHave: "Minimal navigation and one striking spooky visual element."
    },
    {
      id: "8-bit-graveyard",
      t: "8-Bit Graveyard",
      glyph: "👾",
      d: "Pixel-art ghosts, retro arcade typography, blocky buttons and haunted-game aesthetics.",
      mustHave: "Pixel-style buttons and a game-inspired status element."
    },
    {
      id: "phantom-hologram",
      t: "Phantom Hologram",
      glyph: "💠",
      d: "Holographic ghosts, iridescent surfaces, spectral gradients and futuristic supernatural dashboards.",
      mustHave: "Holographic accents and layered semi-translucent panels."
    },
    {
      id: "victorian-haunting",
      t: "Victorian Haunting",
      glyph: "🏛️",
      d: "Symmetrical grids, Victorian ornamentation, antique typography and haunted-estate aesthetics.",
      mustHave: "Structured alignment and vintage decorative elements/borders."
    },
    {
      id: "monster-control-room",
      t: "Monster Control Room",
      glyph: "🎛️",
      d: "A modular dashboard for tracking curses, creatures, haunted locations or supernatural activity.",
      mustHave: "Four or more information cards arranged in a bento grid."
    },
    {
      id: "the-third-dimension",
      t: "The Third Dimension",
      glyph: "🧊",
      d: "Floating skulls, dimensional portals, perspective layers and immersive depth effects.",
      mustHave: "At least one convincing depth or perspective effect (CSS 3D / parallax)."
    },
    {
      id: "digital-possession",
      t: "Digital Possession",
      glyph: "📟",
      d: "Corrupted text, broken-system warnings, scanlines and controlled digital distortion.",
      mustHave: "A glitch effect while keeping essential content readable."
    },
    {
      id: "the-evidence-wall",
      t: "The Evidence Wall",
      glyph: "📌",
      d: "Torn-paper textures, crime-scene clues, pinned photographs, handwritten notes and red string.",
      mustHave: "Layered collage elements and a clue-board section."
    },
    {
      id: "nightmare-editorial",
      t: "Nightmare Editorial",
      glyph: "📰",
      d: "Oversized headlines, off-center images, dramatic asymmetry and unsettling magazine-style layouts.",
      mustHave: "An asymmetric hero section with clear visual hierarchy."
    },
    {
      id: "midnight-noir",
      t: "Midnight Noir",
      glyph: "🎬",
      d: "Monochrome imagery, cinematic shadows, grain textures and high-contrast typography.",
      mustHave: "A strictly grayscale palette and dramatic visual hierarchy."
    },
    {
      id: "the-cursed-grimoire",
      t: "The Cursed Grimoire",
      glyph: "📜",
      d: "Aged parchment, spellbook typography, occult symbols, ink illustrations and wax seals.",
      mustHave: "A parchment-style panel and antique navigation details."
    },
    {
      id: "softly-possessed",
      t: "Softly Possessed",
      glyph: "🔘",
      d: "Softly embossed controls, recessed panels, rounded surfaces and subtle shadows in spooky colors.",
      mustHave: "A raised button and an inset panel with readable contrast (Neumorphism)."
    },
    {
      id: "chaos-unleashed",
      t: "Chaos Unleashed",
      glyph: "💥",
      d: "A maximalist explosion of bats, stickers, patterns, layered colors and chaotic typography.",
      mustHave: "Three or more visual layers without sacrificing navigation."
    },
    {
      id: "the-haunted-movie",
      t: "The Haunted Movie",
      glyph: "🎞️",
      d: "A cinematic, scroll-driven story with dramatic full-screen sections and atmospheric transitions.",
      mustHave: "Three connected story sections with at least one scroll-based effect."
    },
    {
      id: "y2k-afterlife",
      t: "Y2K Afterlife",
      glyph: "💿",
      d: "Metallic chrome text, glossy buttons, retro-futuristic shapes and a haunted early-internet aesthetic.",
      mustHave: "Metallic or glossy elements and distinctive futuristic navigation."
    }
  ],

  // Wheel 4 — the twist. {char} becomes the character's short name.
  // {randomChar} and {randomCurse} are filled in when the twist is drawn.
  twists: [
    { t: "Jump Scare", glyph: "😱", d: "Your site must contain a jump scare that triggers at an unexpected moment." },
    { t: "The Runaway Button", glyph: "🏃", d: "Your most important button must run away from the cursor (it still has to be clickable eventually)." },
    { t: "An Uninvited Guest", glyph: "🚪", d: "{randomChar} has barged in with the same problem. Your site must now help {char} AND {randomChar}." },
    { t: "It Got Worse", glyph: "📈", d: "{char}'s problem now happens twice as often. Add an urgent 'emergency mode' to your site." },
    { t: "Midnight Is Coming", glyph: "🕛", d: "Add a live countdown to midnight that is visible somewhere on your page." },
    { t: "Possession", glyph: "😈", d: "Add a 'possessed' toggle that completely transforms the look of your site." },
    { t: "Secret Passage", glyph: "🗝️", d: "Hide an easter egg in your site that only appears through a secret action (a code, a click pattern…)." },
    { t: "The Sun Rises", glyph: "☀️", d: "Your site must now have a daylight (light) mode — and it still has to feel spooky." },
    { t: "Haunted Cursor", glyph: "🖱️", d: "Replace the default cursor with a custom one that fits {char}." },
    { t: "Glitch in the Crypt", glyph: "📺", d: "Text must glitch, flicker or distort when hovered or tapped." },
    { t: "The Séance", glyph: "🔔", d: "At least one interaction on your site must play a sound effect." },
    { t: "Ghost Language", glyph: "👁️", d: "One section must have a toggle that translates it into a made-up ghost language and back." },
    { t: "Summoning Ritual", glyph: "🕯️", d: "Add a loading screen that 'summons' your site before it appears." },
    { t: "Lost a Limb", glyph: "🦴", d: "Delete your navigation bar. Visitors must still be able to get everywhere." },
    { t: "Idle Haunting", glyph: "⏳", d: "If the visitor does nothing for 10 seconds, something creepy must happen." },
    { t: "The Curse Spreads", glyph: "🩸", d: "You've been hit by a second UI curse: \"{randomCurse}\". Apply it on top of your first one." }
  ]
};
