/* =========================================================
   WHEEL OF CURSES — game content
   Edit freely: every character needs a unique `id` and
   exactly 10 problems. UI curses and twists can be any length.

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
  // To change it: open the browser console on the site and run
  //   Store.secret("your new phrase")
  // then paste the result here.
  judgeKey: "h0cgcvlf4s",

  // Fingerprint of the HOST WORD. Typed into the team-name box (phone or
  // laptop) it opens the host panel instead of registering a team. This is
  // the only way in. Change it the same way as judgeKey.
  hostKey: "1k65q6pmu75",

  // Easter eggs and hidden pumpkins are switched off for now. Set this to true
  // to bring them all back (js/eggs.js, the pumpkins, the judges' bonus row).
  eggsEnabled: false,

  // Hidden bonus points. Each one can be claimed once per team.
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
  // Every figure is drawn pure black, so any transparent PNG/SVG works.
  // `scale` adjusts its height (the crawler is low, the horde is a group).
  //   ground: seen on the hill in the lightning, and in the scares
  //   sky:    glides across the sky
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

  characters: [
    {
      id: "dracula", name: "Count Dracula", short: "Dracula", glyph: "🧛",
      color: "#e01b24",
      lore: "Six hundred years old, still dramatic, still allergic to mornings.",
      spin: "I vant to choose your fate. Bleh!", idle: "I have waited centuries. Not one second more…",
      problems: [
        { t: "Mirror, Mirror, Nowhere", d: "He has no reflection and a date tonight. Make a page where he picks hair, cape and fangs and sees how he looks." },
        { t: "Racing the Sunrise", d: "He keeps getting caught by dawn. Make a page that shows a countdown to sunrise so he gets home in time." },
        { t: "Invitation Only", d: "A vampire can't enter unless invited. Make a page that generates a spooky invitation card he can send." },
        { t: "The Garlic Menace", d: "One clove of garlic and he's dust. Make a page where he types a dish and it says garlic: yes or no." },
        { t: "Four Centuries Alone", d: "His castle is empty. Make a simple 'friend profile' page that makes him look fun to hang out with." },
        { t: "The Vegan Vampire", d: "He only drinks red juices now. Make a page that rates a few juices by how much they look like blood." },
        { t: "Sneeze Into a Bat", d: "He turns into a bat when he sneezes. Make a page with big buttons for quick phrases he can tap as a bat." },
        { t: "Coffin Insomnia", d: "He can't sleep in his coffin. Make a page that plays a calming 'sleep by day' routine for him." },
        { t: "Quill & Parchment", d: "He's never used the internet. Make the simplest page possible for him to write and 'send' one message." },
        { t: "He Must Count", d: "He has to count everything he sees. Make a page with a big tap counter that counts for him." }
      ]
    },
    {
      id: "monster", name: "Frankenstein's Monster", short: "The Monster", glyph: "⚡",
      color: "#ff5a2a",
      lore: "Stitched from eight strangers and raised by lightning.",
      spin: "MONSTER… SPIN. *grunt*", idle: "Monster… getting… angry…",
      problems: [
        { t: "The 24-Hour Reset", d: "Every midnight his memory wipes. Make a page that tells him who he is, who his friends are and what he did yesterday." },
        { t: "Spare Parts", d: "His parts keep falling off. Make a page with a body diagram showing which part goes where." },
        { t: "Torches & Pitchforks", d: "Angry mobs keep showing up. Make a page with a 'mob danger level' he can check each morning." },
        { t: "Static Shock", d: "Every tap fries a device. Make a page where everything important works in a single tap." },
        { t: "Only Grunts", d: "He can only grunt. Make a page that turns a few grunts into words (e.g. 'URGH' = 'hello')." },
        { t: "Where Is My Creator?", d: "His creator ran away. Make a 'Missing: Victor Frankenstein' poster page." },
        { t: "Bride Wanted", d: "He wants a partner. Make a profile page that makes an eight-foot stitched giant look adorable." },
        { t: "Weekly Recharge", d: "He needs lightning once a week. Make a page showing days until his next recharge." },
        { t: "Gentle Giant", d: "He breaks everything he touches. Make a page of five 'be gentle' tips with simple pictures." },
        { t: "Monster Seeks Job", d: "Nobody hires monsters. Make a one-page résumé that shows off his skills." }
      ]
    },
    {
      id: "victor", name: "Dr. Frankenstein", short: "Dr. Frankenstein", glyph: "🧪",
      color: "#ff8a5c",
      lore: "Brilliant, sleepless, and a little too fond of graveyards.",
      spin: "IT'S ALIVE! …and it's spinning!", idle: "The experiment demands a result. NOW.",
      problems: [
        { t: "My Creation Escaped", d: "His creature ran off. Make a 'Have you seen this monster?' page with a way to report a sighting." },
        { t: "The Ethics Committee", d: "The university is investigating him. Make a page that explains his experiment as 'totally normal science'." },
        { t: "Graveyards Are Closed", d: "He needs spare parts. Make a tiny shop page listing a few body parts with prices." },
        { t: "Lab Notes Everywhere", d: "His notes are everywhere. Make a page where he can add and see a list of experiment notes." },
        { t: "Book a Thunderstorm", d: "His machine needs lightning. Make a page where he picks a date for his thunderstorm." },
        { t: "Nine Days Awake", d: "He hasn't slept in nine days. Make a page that tells him, firmly and spookily, to go to sleep." },
        { t: "Villagers Hate Me", d: "The village thinks he's evil. Make a friendly 'Meet your local doctor' page for him." },
        { t: "Igor Quit", d: "His assistant quit. Make a job ad page for a new lab assistant." },
        { t: "Funding Crisis", d: "Reanimation is expensive. Make a donation page with a progress bar toward his goal." },
        { t: "The Wrong Brain", d: "He put in the wrong brain. Make a short quiz page that guesses whose brain it is." }
      ]
    },
    {
      id: "zombie", name: "The Zombie", short: "Zombie", glyph: "🧟",
      color: "#c8552a",
      lore: "Was an accountant once. Mostly remembers the hunger.",
      spin: "Braaaains… I mean… spiiiin…", idle: "Uuurgh… spin… or I eat… your brains…",
      problems: [
        { t: "Sick of Brains", d: "He's had brains every meal for three years. Make a page with three brain-free recipes a zombie would love." },
        { t: "One Kilometre an Hour", d: "He walks painfully slowly. Make a page that shows how long a trip will take at zombie speed." },
        { t: "Falling Apart", d: "His arm fell off again. Make a 'Lost Limbs' board page listing missing body parts." },
        { t: "Only One Word", d: "He can only say 'Braaains'. Make a page where every button just says 'Braaains' but each one does something different." },
        { t: "Horde Mentality", d: "He can't decide alone. Make a page with a simple vote between two choices." },
        { t: "The Smell", d: "Nobody comes near him. Make a page that picks a perfume for him based on how rotten he is." },
        { t: "Who Was I?", d: "He was someone once. Make an 'about my past life' page built from a few clues." },
        { t: "Undead Romance", d: "He's lonely. Make a dating-profile page for a zombie." },
        { t: "Back to Work", d: "He wants his office job back. Make a page explaining why zombies make great employees." },
        { t: "Planning the Apocalypse", d: "The horde keeps showing up on the wrong day. Make a page with a countdown to the apocalypse." }
      ]
    },
    {
      id: "mummy", name: "The Mummy", short: "Mummy", glyph: "🏺",
      color: "#e8b07a",
      lore: "A pharaoh who overslept by three thousand years.",
      spin: "By the sands of time… SPIN!", idle: "I slept three thousand years. I will not wait for you.",
      problems: [
        { t: "Unravelling", d: "His bandages keep falling off. Make a page that reminds him when to re-wrap." },
        { t: "Woke Up in a Museum", d: "He's stuck in London. Make a page that shows his route home to Egypt." },
        { t: "Reads Only Hieroglyphs", d: "He can't read modern text. Make a page that turns a word into simple 'hieroglyph' symbols." },
        { t: "The Tomb Curse", d: "Everyone who opens his tomb gets cursed. Make a big warning page for tourists." },
        { t: "3000-Year Jet Lag", d: "He missed 3000 years of news. Make a short timeline page of history's big moments." },
        { t: "Scattered Organs", d: "His organs are in four jars in four museums. Make a page with a checklist to find them all." },
        { t: "Allergic to Sand", d: "Sand makes him sneeze. Make a page recommending a few sand-free holiday spots." },
        { t: "Pharaoh's Ego", d: "He demands worship. Make a fan page all about how great he is." },
        { t: "Midnight Museum Escape", d: "He's locked in a display case. Make a page with his step-by-step escape plan." },
        { t: "He Misses His Cats", d: "His sacred cats are gone. Make a cat adoption page fit for a pharaoh." }
      ]
    },
    {
      id: "werewolf", name: "The Werewolf", short: "Werewolf", glyph: "🐺",
      color: "#b8703f",
      lore: "Office worker by day. Very, very hairy by full moon.",
      spin: "AWOOOO! The moon says… spin!", idle: "Grrr… my patience is thinner than my fur…",
      problems: [
        { t: "Surprise Full Moon", d: "He keeps transforming at bad times. Make a page showing the next full moon date." },
        { t: "Shredded Wardrobe", d: "He rips his clothes every month. Make a page that picks a stretchy outfit for him." },
        { t: "Fleas", d: "He has fleas and he's embarrassed. Make a discreet 'book a vet' page." },
        { t: "The Double Life", d: "His coworkers can't know. Make a page with a fake excuse generator for full-moon nights." },
        { t: "The Chewed Sofa", d: "He wrecks his flat every month. Make a page listing damaged items and the total cost." },
        { t: "Howling Complaints", d: "The neighbours are furious. Make an apology page for the 3 AM howling." },
        { t: "Silver Allergy", d: "Silver burns him. Make a page where he types an item and it warns if it has silver." },
        { t: "Lone Wolf", d: "He has no pack. Make a 'join my pack' page." },
        { t: "The Postman Problem", d: "He can't stop chasing the postman. Make a page showing what time the post arrives." },
        { t: "Morning-After Hair", d: "He wakes up furry. Make a page that books an emergency haircut." }
      ]
    },
    {
      id: "witch", name: "The Witch", short: "Witch", glyph: "🧙‍♀️",
      color: "#e0386a",
      lore: "Three cauldrons, one cat, zero patience.",
      spin: "Double, double, toil and… SPIN!", idle: "Spin it, or I turn you into a toad.",
      problems: [
        { t: "Spellbook Shuffle", d: "Her spellbook pages got mixed up. Make a page with a few potion recipes in clear order." },
        { t: "Broom Licence", d: "Her broom test is Friday. Make a 5-question practice quiz page." },
        { t: "The Cat Refuses", d: "Her cat won't do chores. Make a simple to-do list page for the cat." },
        { t: "Spells Backfire", d: "One wrong word ruins a spell. Make a page that checks a spell against a list of correct ones." },
        { t: "The Cauldron Café", d: "She's opening a potion café. Make the menu page." },
        { t: "47 Frogs", d: "She turned 47 people into frogs. Make a page that matches a frog to its name." },
        { t: "Moon-Phase Magic", d: "Spells only work on some moon phases. Make a page that shows tonight's moon phase and which spell to cast." },
        { t: "Out of Eye of Newt", d: "She's out of ingredients. Make a shopping list page for potion ingredients." },
        { t: "Empty Coven", d: "Nobody comes to coven meetings. Make an invite page with an RSVP button." },
        { t: "Gingerbread House for Sale", d: "Kids keep eating her house. Make a 'house for sale' listing page." }
      ]
    },
    {
      id: "ghost", name: "The Ghost", short: "Ghost", glyph: "👻",
      color: "#f6dcd2",
      lore: "Died in 1847. Still hasn't been told.",
      spin: "Boooo… let me spin it… boooo…", idle: "I can't touch the wheel… but I'll find a way…",
      problems: [
        { t: "Unfinished Business", d: "He forgot his unfinished business. Make a page that asks him questions and guesses what it is." },
        { t: "Can't Touch Anything", d: "His hands pass through screens. Make a page that works on hover only — no clicks." },
        { t: "Nobody Sees Me", d: "The living ignore him. Make a page that makes him impossible to miss." },
        { t: "Haunting for Hire", d: "He wants to haunt for money. Make a price list page for his haunting services." },
        { t: "New Tenants", d: "A family moved into his house. Make a page splitting the rooms between him and them." },
        { t: "Scared of Ghosts", d: "He's afraid of other ghosts. Make a page listing 'safe' and 'haunted' places." },
        { t: "Ouija Spam", d: "People call him at 3 AM. Make a page showing his séance opening hours." },
        { t: "Stuck in 1847", d: "He thinks it's 1847. Make a 'then vs now' page explaining modern life." },
        { t: "Always Blurry", d: "He's always blurry in photos. Make a small photo gallery page that embraces the blur." },
        { t: "Where's My Body?", d: "He doesn't know where he's buried. Make a page that helps him find his grave." }
      ]
    },
    {
      id: "reaper", name: "The Grim Reaper", short: "Grim Reaper", glyph: "⚰️",
      color: "#a08a84",
      lore: "Ten thousand years on the job. Never once a day off.",
      spin: "Your time has come… to spin.", idle: "Everyone's time runs out. Yours is running now.",
      problems: [
        { t: "Overworked", d: "Too many souls, too little time. Make a page showing his schedule for the day." },
        { t: "First Vacation Ever", d: "He wants a holiday. Make an 'out of office' page that says who covers for him." },
        { t: "Dull Scythe", d: "His scythe is blunt. Make a page to book a scythe sharpening." },
        { t: "Bad Reputation", d: "Everyone fears him. Make a friendly 'meet Death' page." },
        { t: "The Lost List", d: "He lost his list. Make a page where he can add names and tick them off." },
        { t: "Too Many Hourglasses", d: "His hourglasses are a mess. Make a page that shows a few hourglasses running down." },
        { t: "Customer Complaints", d: "Souls keep complaining. Make a star-rating feedback page for the afterlife." },
        { t: "Never Invited", d: "Nobody invites Death to parties. Make a party invitation page with him as guest of honour." },
        { t: "Training the Intern", d: "He hired an intern. Make a 'first day as a reaper' guide page." },
        { t: "The Ones That Got Away", d: "People keep cheating death. Make a 'Most Wanted' page of escaped souls." }
      ]
    },
    {
      id: "horseman", name: "The Headless Horseman", short: "Headless Horseman", glyph: "🐎",
      color: "#e2631b",
      lore: "Rides every night. Hasn't found his head in 200 years.",
      spin: "*galloping hooves* …the wheel shall turn!", idle: "I have no head, yet I lose patience…",
      problems: [
        { t: "Lost: One Head", d: "He lost his head 200 years ago. Make a 'Lost Head' poster page with a reward." },
        { t: "No Eyes", d: "He has no eyes. Make a page that reads its content out loud when you press play." },
        { t: "Rotting Pumpkin Heads", d: "His pumpkin heads rot weekly. Make a page that orders a fresh pumpkin head." },
        { t: "The Horse Wants a Raise", d: "His horse is threatening to quit. Make a page of the horse's demands." },
        { t: "No Mouth", d: "He can't speak. Make a page with tap-to-say phrase buttons." },
        { t: "Sleepy Hollow Tourism", d: "The town wants tourists. Make a poster page for 'Ride with the Headless Horseman'." },
        { t: "Fashion Without a Head", d: "Hats are useless to him. Make a fashion page of neck-down outfits." },
        { t: "The Ichabod Grudge", d: "He's chased Ichabod for 200 years. Make a 'Wanted: Ichabod Crane' page." },
        { t: "Lost Every Night", d: "He gets lost on every ride. Make a page with his midnight route step by step." },
        { t: "Head Auditions", d: "He's choosing a new head. Make a page that shows a few heads and lets him pick one." }
      ]
    },
    {
      id: "jack", name: "Jack-o'-Lantern", short: "Jack-o'-Lantern", glyph: "🎃",
      color: "#ff7a1a",
      lore: "Stingy Jack tricked the Devil and now wanders with a lantern.",
      spin: "Heh heh… trick or SPIN!", idle: "My candle's burning down… and so is my patience.",
      problems: [
        { t: "The Flame Keeps Dying", d: "His candle goes out every night. Make a page with a candle you can relight with a tap." },
        { t: "One Week to Live", d: "Carved pumpkins rot in a week. Make a bucket-list page for his last seven days." },
        { t: "Stuck With One Face", d: "He's carved with one face. Make a page where he can switch his carved expression." },
        { t: "Pie Panic", d: "He's scared of becoming pie. Make a 'Save the pumpkins' page." },
        { t: "Nowhere to Rest", d: "Heaven and Hell both turned him away. Make a page of places a lost soul could rest." },
        { t: "Squirrel Attacks", d: "Squirrels eat his face. Make a page with a squirrel alert button." },
        { t: "Best Porch Contest", d: "He's in a porch contest. Make a page where people can vote for him." },
        { t: "Unemployed 11 Months", d: "He only works in October. Make a page of jobs for pumpkins the rest of the year." },
        { t: "Pumpkin Family Tree", d: "He wants to plant his seeds. Make a page that tracks his pumpkin growing week by week." },
        { t: "Too Bright", d: "His glow keeps the street awake. Make a page with a dimmer slider for his light." }
      ]
    },
    {
      id: "skeleton", name: "The Skeleton", short: "Skeleton", glyph: "💀",
      color: "#ece2d0",
      lore: "Two hundred and six bones. Allegedly.",
      spin: "*rattle rattle* Watch my bones spin it!", idle: "I've got a bone to pick with you. SPIN.",
      problems: [
        { t: "Bone Count: 205", d: "He can only find 205 of his 206 bones. Make a page that helps him find the missing one." },
        { t: "No Muscles", d: "He wants to get fit. Make a workout page for someone with no muscles." },
        { t: "No Tongue", d: "He can't taste. Make a page describing a few foods by sound and smell instead." },
        { t: "Always Cold", d: "Wind blows through his ribs. Make a page that picks his outfit from the temperature." },
        { t: "Dogs Steal My Bones", d: "Dogs keep stealing him. Make a 'beware of dogs' alert page." },
        { t: "Not a Decoration", d: "People hang him on porches. Make a page proving he's a real person." },
        { t: "The Rib-Xylophone Band", d: "His band plays their ribs. Make a band page with a playable xylophone." },
        { t: "Calcium Cravings", d: "He needs lots of milk. Make a page that tracks glasses of milk per day." },
        { t: "Skeleton in the Closet", d: "He keeps people's secrets. Make a page to post an anonymous secret." },
        { t: "Anatomy Class Model", d: "He models for medical students. Make a page where you tap a bone to see its name." }
      ]
    },
    {
      id: "invisible", name: "The Invisible Man", short: "Invisible Man", glyph: "🕶️",
      color: "#c9a9a0",
      lore: "Drank the formula. Regrets it daily. Nobody can tell.",
      spin: "You can't see me… but you can see this spin.", idle: "I'm right behind you. Spin the wheel.",
      problems: [
        { t: "Nobody Believes Me", d: "No one believes he exists. Make a page that 'proves' he's real." },
        { t: "Where Am I?", d: "He loses track of himself. Make a page with a 'you are here' map for him." },
        { t: "The Outfit Problem", d: "He's only visible in clothes. Make a page where he dresses an invisible figure." },
        { t: "Constant Collisions", d: "People keep walking into him. Make a 'watch out' warning page." },
        { t: "Ignored in Interviews", d: "Interviewers talk to an empty chair. Make his one-page portfolio." },
        { t: "Reverse the Formula", d: "He wants to be visible again. Make a page listing ideas for a cure." },
        { t: "Selfie Impossible", d: "He wants to be an influencer. Make a social profile page with no face anywhere." },
        { t: "Waiters Ignore Him", d: "He's never been served. Make a table-ordering page." },
        { t: "Invisible Dog", d: "His dog drank the formula too. Make a 'Lost invisible dog' poster page." },
        { t: "Forgotten Birthday", d: "Everyone forgets his birthday. Make a birthday countdown page." }
      ]
    },
    {
      id: "blackcat", name: "The Black Cat", short: "Black Cat", glyph: "🐈",
      color: "#ffc23a",
      lore: "Nine lives, one bad reputation.",
      spin: "Mrrrow. *swats the wheel*", idle: "Hssss! I'll knock this wheel over myself.",
      problems: [
        { t: "The Bad-Luck Myth", d: "Everyone thinks he's bad luck. Make a page with a 'good luck' generator." },
        { t: "Eight Lives Left", d: "He used one life. Make a page with nine hearts showing lives left." },
        { t: "The Witch Retired", d: "His witch retired. Make a job-hunting page for an ex-familiar." },
        { t: "Adopt Me", d: "Black cats get adopted last. Make an adoption profile page nobody can resist." },
        { t: "3 AM Zoomies", d: "He's wide awake at 3 AM. Make a page of night activities for cats." },
        { t: "Don't Cross My Path", d: "People panic when he crosses their path. Make a page that warns before he crosses." },
        { t: "Must Knock Things Over", d: "He pushes everything off tables. Make a page where you knock items off a table." },
        { t: "Hairball Emergency", d: "He's coughing up hairballs. Make a simple 'is it serious?' checker page." },
        { t: "Invisible at Night", d: "Cars can't see him. Make a product page for a glow-in-the-dark collar." },
        { t: "Training the Human", d: "His human misbehaves. Make a training guide page for humans, written by a cat." }
      ]
    },
    {
      id: "scarecrow", name: "The Scarecrow", short: "Scarecrow", glyph: "🌾",
      color: "#d99a3c",
      lore: "Stuffed with straw. Stared at by crows. Wants more.",
      spin: "The crows told me to spin it. So I will.", idle: "I've stood still for fifty years. You won't.",
      problems: [
        { t: "The Crows Laugh", d: "Crows sit on his head. Make a page of scare tactics, with a button that tries one." },
        { t: "If I Only Had a Brain", d: "He wants to learn. Make a page that teaches him one fact per click." },
        { t: "Fire Hazard", d: "He's made of dry straw. Make a fire-safety tips page for flammable people." },
        { t: "Stuck on a Pole", d: "He can't move. Make a page where he orders things to be brought to him." },
        { t: "The Farmer Left", d: "The farm was abandoned. Make a 'scarecrow for hire' page." },
        { t: "Leaking Straw", d: "Straw falls out of him. Make a page to book a re-stuffing." },
        { t: "Lonely Field", d: "Only crows talk to him. Make a page where you can leave him a message." },
        { t: "Soggy in the Rain", d: "Rain turns him to mush. Make a page that says if today is a 'soggy day'." },
        { t: "Same Rags for 50 Years", d: "Same outfit for fifty years. Make a page that picks him a new outfit." },
        { t: "Haunted Corn Maze", d: "He's opening a corn maze. Make the ticket page for it." }
      ]
    }
  ],

  // Wheel 3 — constraints on how the UI must be built
  uiCurses: [
    { t: "Symbols Only", glyph: "✦", d: "No text anywhere — no words, letters or numbers. Only icons, symbols, emoji and shapes." },
    { t: "Black & White Film", glyph: "◐", d: "Your whole site must be greyscale. Not a single colour allowed." },
    { t: "No Buttons", glyph: "⊘", d: "You may not use a single button. Every action must happen another way — drag, hover, scroll, swipe or keyboard." },
    { t: "Everything Is Round", glyph: "◯", d: "No sharp corners anywhere. Every box, image and input must be a circle or pill." },
    { t: "One Screen, No Scroll", glyph: "▣", d: "The entire site must fit on one screen — no scrolling, on phone or laptop." },
    { t: "One Font Size", glyph: "Aa", d: "Every piece of text on the site must be exactly the same size. Hierarchy has to come from something else." },
    { t: "Lights Out", glyph: "🔦", d: "The page is pitch black. Content is only visible inside a flashlight circle that follows the cursor or finger." },
    { t: "Fifty Words Max", glyph: "50", d: "The entire site may contain no more than 50 words. Count them." },
    { t: "Sliders Only", glyph: "⇔", d: "Every input on your site must be a slider. No text boxes, dropdowns or checkboxes." },
    { t: "Nothing Is Straight", glyph: "⟋", d: "No element may be perfectly horizontal. Everything must be tilted, rotated or crooked." },
    { t: "Mirror World", glyph: "⇋", d: "The whole site must be mirrored: navigation on the right, reading flows right-to-left." },
    { t: "Ransom Note", glyph: "✂", d: "Every word in every heading must use a different font, like a ransom letter." },
    { t: "Typewriter Ghost", glyph: "⌨", d: "All text must type itself out letter by letter, as if a ghost is writing it." },
    { t: "Three Colours Max", glyph: "③", d: "Your entire site may use only three colours — including the background." },
    { t: "Single Column of Doom", glyph: "▥", d: "Your layout must be a single narrow column, never wider than 360px — even on a giant screen." },
    { t: "Gravity Is Reversed", glyph: "⇡", d: "Navigation lives at the bottom of the screen and the most important content sits lowest on the page." }
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
