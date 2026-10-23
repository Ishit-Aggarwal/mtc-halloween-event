const fs = require('fs');
const path = require('path');

const dataFile = path.join(__dirname, '..', 'js', 'data.js');
let content = fs.readFileSync(dataFile, 'utf8');

const metadata = {
  voldemort: {
    avatar: "assets/characters/voldemort.svg",
    archetype: "Dark Lord & Horcrux Sovereign",
    quote: "There is no good and evil, there is only power… and those too weak to seek it.",
    brief: "Obsessed with digital immortality and fragmented souls. Build dark-arts cloud vaults, Horcrux telemetry, or defensive ward systems."
  },
  joker: {
    avatar: "assets/characters/joker.svg",
    archetype: "Agent of Pure Chaos & Crime Prince",
    quote: "Why so serious? Smile, because it confuses people.",
    brief: "Master of psychological anarchy and theatrical terror. Build chaotic gig marketplaces, panic meters, or satirical crisis consoles."
  },
  dracula: {
    avatar: "assets/characters/dracula.svg",
    archetype: "Ancient Transylvanian Blood Sovereign",
    quote: "Listen to them, the children of the night. What music they make.",
    brief: "Transylvanian aristocrat bound by nocturnal predation. Build cold-chain blood supply logistics, gothic estate booking, or circadian sun tracking."
  },
  vecna: {
    avatar: "assets/characters/vecna.svg",
    archetype: "Eldritch Mind Flayer & Rift Harbinger",
    quote: "It is time for your suffering to come to an end.",
    brief: "Telepathic entity fracturing reality with grandfather clock chimes. Build Hawkins seismic rift maps, psionic mental telemetry, or dimensional portals."
  },
  stree: {
    avatar: "assets/characters/stree.svg",
    archetype: "Vengeful Chanderi Spirit & Night Sovereign",
    quote: "O Stree, kal aana… par aaj raat yahan sirf mera raaj hai.",
    brief: "Nocturnal spirit of Chanderi demanding respect. Build sunset safety curfew alerts, SOS geofences, and cultural folklore preservation grids."
  },
  wednesday: {
    avatar: "assets/characters/wednesday.svg",
    archetype: "Nevermore Outcast & Morbid Sleuth",
    quote: "I find social interaction exhausting, but this wheel is mildly amusing.",
    brief: "Brilliant, deadpan outcast prodigy of Nevermore. Build peer barter networks, cello acoustic cryptography, and monochrome forensic investigative tools."
  },
  pennywise: {
    avatar: "assets/characters/pennywise.svg",
    archetype: "Cosmic Terror & Dancing Clown",
    quote: "You will float down here… we all float down here!",
    brief: "Ancient terror lurking beneath Derry's streets. Build municipal sewer stormwater telemetry, phobia databases, or carnival funhouse distortion engines."
  },
  valak: {
    avatar: "assets/characters/valak.svg",
    archetype: "The Defiler Demon & Unholy Abbess",
    quote: "Forgive me father, for I have possessed your darkest prayers.",
    brief: "Blasphemous demon haunting consecrated halls. Build Vatican sacred relic provenance catalogs, abbey acoustic sensors, and occult containment monitors."
  },
  maleficent: {
    avatar: "assets/characters/maleficent.svg",
    archetype: "Mistress of All Evil & Dark Fairy",
    quote: "Before the sun sets on her sixteenth birthday, she shall fall into a sleep like death.",
    brief: "Protector of the enchanted Moors wielding dragon fire. Build enchanted forest land registries, iron-allergy perimeter defenses, and dark fairy treaty pacts."
  },
  annabelle: {
    avatar: "assets/characters/annabelle.svg",
    archetype: "Cursed Conduit & Occult Vessel",
    quote: "Did you miss me? The glass cannot hold what was never alive.",
    brief: "Malevolent spirit tethered to a vintage porcelain doll. Build occult museum quarantine inventories, blessed barrier monitoring, and EVP paranormal loggers."
  },
  manjulika: {
    avatar: "assets/characters/manjulika.svg",
    archetype: "Royal Haveli Spectre & Court Dancer",
    quote: "Ami je tomar… shudho je tomar… Mukti chai!",
    brief: "Wronged royal dancer locked in the haveli chamber. Build 3D palace architectural restoration viewers, classical Kathak acoustic boards, and heirloom auctions."
  },
  ghostface: {
    avatar: "assets/characters/ghostface.svg",
    archetype: "Woodsboro Slasher & Cinema Zealot",
    quote: "What is your favorite scary movie? Do not hang up on me.",
    brief: "Meta-horror slasher obsessed with phone calls and film rules. Build anonymous crisis hotline triage apps, horror trivia escape consoles, and spoof call detectors."
  },
  freddy: {
    avatar: "assets/characters/freddy.svg",
    archetype: "Springwood Dream Demon & Nightmare Weaver",
    quote: "One, two, Freddy is coming for you… Welcome to prime time!",
    brief: "Razor-clawed master of the dream world. Build smartwatch parasomnia sleep telemedicine, lucid dreaming defense alerts, and boiler room heat telemetry."
  },
  frankenstein: {
    avatar: "assets/characters/frankenstein.svg",
    archetype: "Galvanic Reanimated Prometheus",
    quote: "Beware, for I am fearless, and therefore powerful.",
    brief: "Reanimated titan seeking understanding and lightning. Build clean-tech storm lightning energy grids, prosthetic biosensor monitors, and AAC companion boards."
  },
  "grim-reaper": {
    avatar: "assets/characters/grim-reaper.svg",
    archetype: "Cosmic Harvester & Reaper of Souls",
    quote: "Every clock counts down to the same harvest. Your time has arrived.",
    brief: "Inevitable cosmic psychopomp marking life's hourglass. Build posthumous digital footprint erasers, global longevity health maps, and organ donor bridge registries."
  },
  medusa: {
    avatar: "assets/characters/medusa.svg",
    archetype: "Petrifying Gorgon & Serpent Priestess",
    quote: "Look directly into my eyes, and turn your doubts to solid stone.",
    brief: "Snake-haired guardian whose gaze petrifies flesh. Build blind-values social connection networks, temple architectural security, and facial privacy shields."
  },
  sauron: {
    avatar: "assets/characters/sauron.svg",
    archetype: "The Great Eye & Lord of Mordor",
    quote: "You cannot hide. I see you. There is no life in the void, only death.",
    brief: "Ancient dark lord crowned with the fiery all-seeing eye. Build employee bossware detection scanners, cryptographic ring trackers, and volcanic geothermal grids."
  },
  chucky: {
    avatar: "assets/characters/chucky.svg",
    archetype: "Possessed Voodoo Doll & Serial Killer",
    quote: "Hi, I am Chucky! Wanna play? A true classic never goes out of style.",
    brief: "Voodoo-bound serial killer trapped in a plastic toy. Build smart-toy Wi-Fi vulnerability auditors, toxic toy recall databases, and voodoo transfer simulators."
  },
  "headless-horseman": {
    avatar: "assets/characters/headless-horseman.svg",
    archetype: "Hessian Phantom & Hollow Specter",
    quote: "Ride into Sleepy Hollow, where the shadows claim your head before dawn.",
    brief: "Decapitated warrior riding through Sleepy Hollow. Build autonomous vehicle nocturnal fog LiDAR simulators, historic bridge monitoring, and night navigation maps."
  },
  wildcard: {
    avatar: "assets/characters/wildcard.svg",
    archetype: "Unbound Void Entity & Custom Sovereign",
    quote: "From the unwritten void, a new nightmare emerges. Define your darkness.",
    brief: "An unwritten anomaly emerging from the dark void. Free to author custom villain lore, backstories, moral flaws, and tailored web applications."
  }
};

for (const [id, meta] of Object.entries(metadata)) {
  const targetRegex = new RegExp(`(id:\\s*"${id}",[\\s\\S]*?color:\\s*"[^"]+",)`, "m");
  const match = content.match(targetRegex);
  if (match) {
    const escQuote = meta.quote.replace(/"/g, '\\"');
    const escBrief = meta.brief.replace(/"/g, '\\"');
    const replacement = `${match[1]}\n      avatar: "${meta.avatar}",\n      archetype: "${meta.archetype}",\n      quote: "${escQuote}",\n      brief: "${escBrief}",`;
    content = content.replace(match[0], replacement);
  } else {
    console.error("Could not match character id:", id);
  }
}

fs.writeFileSync(dataFile, content, 'utf8');
console.log("Successfully enriched characters in js/data.js");
