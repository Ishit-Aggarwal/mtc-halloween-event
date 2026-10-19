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
      "id": "tony-stark",
      "name": "Tony Stark",
      "short": "Tony Stark",
      "glyph": "🦾",
      "color": "#e62429",
      "lore": "Genius, billionaire, playboy, philanthropist. Zero tolerance for slow software.",
      "spin": "I am Iron Man… and I'm spinning this wheel.",
      "idle": "J.A.R.V.I.S., spin the wheel before I fall asleep.",
      "problems": [
        {
          "t": "Windows Vista Suit",
          "d": "Your suit runs on Windows Vista and requires constant mandatory updates mid-flight."
        },
        {
          "t": "Sarcastic J.A.R.V.I.S.",
          "d": "J.A.R.V.I.S. speaks exclusively in passive-aggressive sarcastic riddles."
        },
        {
          "t": "GPLv3 Open Source",
          "d": "You must open-source every single one of your proprietary patents under GPLv3."
        },
        {
          "t": "CAPTCHA Repulsors",
          "d": "Your repulsors only fire after completing a 3-step CAPTCHA on a tiny touchscreen."
        },
        {
          "t": "Resume Introduction",
          "d": "You are contractually obligated to introduce yourself with your full resume before speaking."
        },
        {
          "t": "Squeaky Arc Reactor",
          "d": "The arc reactor in your chest emits a loud, rhythmic squeak every 3 seconds."
        },
        {
          "t": "Legacy COBOL",
          "d": "Every computer you touch automatically converts your code into legacy COBOL."
        },
        {
          "t": "Hybrid Minivans",
          "d": "Pepper Potts replaces all your sports cars with pastel hybrid minivans."
        },
        {
          "t": "Unskippable HUD Ads",
          "d": "Your helmet HUD is 90% unskippable 30-second un-closeable pop-up ads."
        },
        {
          "t": "Stevia Decaf",
          "d": "You cannot drink coffee unless it is decaf and sweetened with artificial stevia."
        },
        {
          "t": "40-Page Ethics Essay",
          "d": "Captain America sends you a daily 40-page handwritten essay on moral ethics."
        },
        {
          "t": "Inside-Out Nanotech",
          "d": "Your nanotech suit assembles inside out with all the wires poking your ribs."
        },
        {
          "t": "Circus Soundtrack",
          "d": "Hackers replace your AC/DC and Black Sabbath battle soundtrack with circus calliope music."
        },
        {
          "t": "Sunday 6 AM Board",
          "d": "Every board meeting at Stark Industries is legally scheduled at 6:00 AM on Sundays."
        },
        {
          "t": "Low Wi-Fi Broke",
          "d": "Your net worth drops to $0 whenever your Wi-Fi signal falls below 4 bars."
        },
        {
          "t": "Muted Avengers Chat",
          "d": "The Avengers group chat has muted you permanently."
        }
      ]
    },
    {
      "id": "doraemon",
      "name": "Doraemon",
      "short": "Doraemon",
      "glyph": "🔔",
      "color": "#0099e5",
      "lore": "A robotic cat from the 22nd century with an infinite pocket and a mortal terror of mice.",
      "spin": "Look what I pulled from my 4D pocket… it's a spin!",
      "idle": "Nobita, hurry up! The time machine is leaving!",
      "problems": [
        {
          "t": "Kitchen Spatula Pocket",
          "d": "Your 4D pocket only produces kitchen appliances and novelty silicone spatulas."
        },
        {
          "t": "GPS Rodent Radar",
          "d": "Every mouse within a 5-mile radius knows your exact real-time GPS coordinates."
        },
        {
          "t": "Boiled Broccoli",
          "d": "Dorayaki pancakes are permanently replaced with lukewarm, unsalted boiled broccoli."
        },
        {
          "t": "Corporate Anywhere Door",
          "d": "The Anywhere Door always opens into an ongoing corporate quarterly review."
        },
        {
          "t": "Bamboo-Copter Battery",
          "d": "The Bamboo-Copter has a 30-second flight limit followed by a 4-hour recharge cycle."
        },
        {
          "t": "Awkward Time Machine",
          "d": "The Time Machine only travels back to your most awkward childhood moments."
        },
        {
          "t": "Panicked Nobita",
          "d": "Nobita calls your name in panic every 45 seconds without exception."
        },
        {
          "t": "Cuneiform Gummies",
          "d": "Your translation gummy candies only translate into ancient Mesopotamian cuneiform."
        },
        {
          "t": "Gian's Karaoke Concerts",
          "d": "Gian forces you to listen to his live karaoke concerts every Saturday evening."
        },
        {
          "t": "Bloating Memory Bread",
          "d": "The Memory Bread gives you severe gluten bloating and erases your short-term memory instead."
        },
        {
          "t": "Bowling Ball Disguise",
          "d": "Your robotic body is mistaken for a decorative blue bowling ball by strangers."
        },
        {
          "t": "Suneo's Flexing",
          "d": "Suneo constantly rubs his latest limited-edition luxury gadgets in your face."
        },
        {
          "t": "Paid What-If Box",
          "d": "The What-If Phone Box requires a paid subscription tier you cannot afford."
        },
        {
          "t": "Tail in Elevator",
          "d": "Your pull-string tail is constantly getting caught in elevator doors."
        },
        {
          "t": "Dorami's Audit",
          "d": "Dorami is appointed by the 22nd-century commission as your full-time auditor."
        },
        {
          "t": "Sticky Broken Gadgets",
          "d": "Every gadget you lend out is returned broken and covered in sticky syrup."
        }
      ]
    },
    {
      "id": "dracula",
      "name": "Count Dracula",
      "short": "Dracula",
      "glyph": "🧛",
      "color": "#c4161c",
      "lore": "Six hundred years of aristocracy, ruined by modern sunlight and garlic bread.",
      "spin": "I vant to choose your fate! Bleh!",
      "idle": "I have waited centuries. Spin before dawn!",
      "problems": [
        {
          "t": "Clumsy Pigeon",
          "d": "Instead of turning into a terrifying bat, you turn into a clumsy, cooing pigeon."
        },
        {
          "t": "Glittering Sparkles",
          "d": "You sparkle aggressively under direct sunlight and teenage vampires make fun of you."
        },
        {
          "t": "2FA Entry Permitted",
          "d": "You can only enter buildings if invited by an automated two-factor verification email."
        },
        {
          "t": "Alluring Garlic Bread",
          "d": "Garlic bread is the only food that actually smells delicious and irresistible to you."
        },
        {
          "t": "Compulsive Counting",
          "d": "You are compelled to count every grain of rice or sand dropped in front of you."
        },
        {
          "t": "Squeaky Bedbug Coffin",
          "d": "Your coffin has a severe bedbug infestation and the lid squeaks like a rusty gate."
        },
        {
          "t": "Clown Reflection",
          "d": "Your reflection appears in mirrors, but only wearing an embarrassing clown costume."
        },
        {
          "t": "Decaf Green Tea Blood",
          "d": "Modern blood banks only offer synthetic blood infused with decaf green tea."
        },
        {
          "t": "Itchy Stake Wounds",
          "d": "Stake wounds don't kill you, but they itch persistently for centuries."
        },
        {
          "t": "Spicy Holy Water",
          "d": "Holy water burns like spicy hot sauce and gives you uncontrollable heartburn."
        },
        {
          "t": "Castle on Airbnb",
          "d": "Local realtors keep listing your Transylvanian castle on Airbnb without your permission."
        },
        {
          "t": "Snagged Cape",
          "d": "Your cape gets snagged on door handles and turnstiles wherever you walk."
        },
        {
          "t": "Comedic Fangs Lisp",
          "d": "Your fangs grow so long you can only speak with a heavy, comedic lisp."
        },
        {
          "t": "Renfield's Grievances",
          "d": "Renfield develops a passionate obsession with filing union labor grievances."
        },
        {
          "t": "Van Helsing's Reviews",
          "d": "Van Helsing’s great-grandchildren track you on social media and leave savage 1-star reviews."
        },
        {
          "t": "Crypt Lawn Mowers",
          "d": "Daytime sleep is ruined by noisy lawnmowers right outside your crypt window."
        }
      ]
    },
    {
      "id": "ben-10",
      "name": "Ben 10",
      "short": "Ben 10",
      "glyph": "⌚",
      "color": "#00e676",
      "lore": "Wielder of the universe's most powerful watch. It never gives him the alien he asked for.",
      "spin": "It's hero time! Let's spin!",
      "idle": "Come on, the Omnitrix is timing out!",
      "problems": [
        {
          "t": "Dial Jam",
          "d": "The Omnitrix dial is permanently jammed on the least useful alien for the current emergency."
        },
        {
          "t": "Mid-Sentence Timeout",
          "d": "The transformation timeout triggers precisely when you are midway through explaining your hero plan."
        },
        {
          "t": "Auctioneer Voice",
          "d": "Every alien form you assume has the voice and cadence of a 1920s radio auctioneer."
        },
        {
          "t": "Dial-Up Updates",
          "d": "The Omnitrix requires daily overnight firmware updates over 56k dial-up internet."
        },
        {
          "t": "Amnesia Controls",
          "d": "Every time you transform, you forget which button punches and which button dodges."
        },
        {
          "t": "Knitting Four Arms",
          "d": "Four Arms has two left hands and two hands that only know how to knit sweaters."
        },
        {
          "t": "Brain Freeze Heatblast",
          "d": "Heatblast gets instant brain freezes whenever he drinks anything below room temperature."
        },
        {
          "t": "Tied Shoelaces XLR8",
          "d": "XLR8 runs at Mach 5, but his shoelaces are always tied together."
        },
        {
          "t": "Kiddie Pool Ripjaws",
          "d": "Ripjaws gets carsick whenever he is away from a chlorinated kiddie pool."
        },
        {
          "t": "Grandpa Max's Stew",
          "d": "Grandpa Max feeds you his gourmet 'squid gut and cricket stew' for breakfast, lunch, and dinner."
        },
        {
          "t": "Nursery Rhyme Ringtone",
          "d": "Gwen uses her mana magic to change your ringtone to embarrassing nursery rhymes."
        },
        {
          "t": "Vilgax's Copyright Suits",
          "d": "Vilgax doesn't want to fight you anymore; he just files endless copyright infringement lawsuits."
        },
        {
          "t": "Stinky Rust Bucket",
          "d": "The Rust Bucket RV smells permanently of wet dog and boiled cabbage."
        },
        {
          "t": "90s Soap Trivia",
          "d": "Grey Matter only remembers obscure trivia about 90s daytime television soap operas."
        },
        {
          "t": "Driving Ghostfreak",
          "d": "Ghostfreak haunts your dreams with lectures on safe driving habits."
        },
        {
          "t": "Omnitrix Heat Rash",
          "d": "The Omnitrix strap gives your wrist an annoying, incurable heat rash."
        }
      ]
    },
    {
      "id": "naruto",
      "name": "Naruto Uzumaki",
      "short": "Naruto",
      "glyph": "🍥",
      "color": "#ff7700",
      "lore": "The Seventh Hokage of Konoha, powered by ramen, willpower, and nine-tailed chaos.",
      "spin": "Believe it! Watch my ninja spin!",
      "idle": "Dattebayo! Stop staring and spin already!",
      "problems": [
        {
          "t": "Unionized Clones",
          "d": "Every Shadow Clone you summon forms an independent workers' union and goes on strike."
        },
        {
          "t": "Closed Ichiraku",
          "d": "Ichiraku Ramen is permanently closed for 'plumbing renovations' whenever you visit."
        },
        {
          "t": "Mandatory Speech",
          "d": "You must loudly declare your entire ninja way before you can perform any basic task."
        },
        {
          "t": "Squeaky Rasengan",
          "d": "Your Rasengan makes a squeaky rubber duck squeal upon physical impact."
        },
        {
          "t": "Kurama's Love Advice",
          "d": "Kurama (the Nine-Tails) inside you gives loud, unsolicited relationship advice 24/7."
        },
        {
          "t": "High-Beam Jumpsuit",
          "d": "Your orange jumpsuit glows with the intensity of a thousand suns during stealth missions."
        },
        {
          "t": "Left on Read by Sasuke",
          "d": "Sasuke leaves all your texts on 'Read' for 3 years at a time."
        },
        {
          "t": "Glued Arms Naruto Run",
          "d": "You cannot run normally; your arms are permanently glued backward in the Naruto run."
        },
        {
          "t": "IRS Sexy Jutsu",
          "d": "The Sexy Jutsu only transforms you into an IRS tax auditor with a clipboard."
        },
        {
          "t": "Sakura's Grammar Punch",
          "d": "Sakura punches you through a concrete wall whenever you make a minor grammatical error."
        },
        {
          "t": "Public Make-Out Paradise",
          "d": "Kakashi makes you read the entire 'Make-Out Paradise' book series out loud in public."
        },
        {
          "t": "Eternal D-Rank Chores",
          "d": "You are assigned D-rank missions (finding lost cats) as the Seventh Hokage forever."
        },
        {
          "t": "Jiraiya's Rigged Bets",
          "d": "Jiraiya borrows all your mission allowance money and bets it on rigged frog races."
        },
        {
          "t": "Blinding Headband",
          "d": "Your headband slips down over your eyes whenever you try to look intimidating."
        },
        {
          "t": "Juice Box Tadpoles",
          "d": "Toad summons only bring forth tadpoles that demand juice boxes."
        },
        {
          "t": "Orochimaru's LinkedIn",
          "d": "Orochimaru constantly tries to recruit you on LinkedIn with creepy connection notes."
        }
      ]
    },
    {
      "id": "goku",
      "name": "Son Goku",
      "short": "Goku",
      "glyph": "🥋",
      "color": "#ff4500",
      "lore": "Saiyan warrior from Earth. Can shatter planets with a punch, but can't escape Chi-Chi's grocery list.",
      "spin": "Hey, it's me, Goku! Let's turn this wheel!",
      "idle": "Man, I'm getting hungry… spin already!",
      "problems": [
        {
          "t": "Permanent Fullness",
          "d": "You are permanently full and bloated; eating even one grain of rice causes stomach cramps."
        },
        {
          "t": "45-Day Spirit Bomb",
          "d": "Charging your Spirit Bomb takes 45 real-time business days and requires written consent."
        },
        {
          "t": "DMV Transmission",
          "d": "Instant Transmission only teleports you to the waiting room of the Department of Motor Vehicles."
        },
        {
          "t": "Administrative Arbitration",
          "d": "Every galactic battle is legally reclassified as a non-violent administrative arbitration."
        },
        {
          "t": "Chi-Chi's Grocery Calls",
          "d": "Chi-Chi calls your cell phone every 3 minutes asking if you picked up organic eggs and milk."
        },
        {
          "t": "Super Saiyan Baldness",
          "d": "Going Super Saiyan makes your hair fall out instead of turning golden and spiky."
        },
        {
          "t": "Vegeta's Early KOs",
          "d": "Vegeta defeats every single villain before you even arrive at the battlefield."
        },
        {
          "t": "Quiet King Kai",
          "d": "King Kai’s planet has strict noise ordinances banning screams, shouts, and power-ups."
        },
        {
          "t": "Dirt Brussels Sprouts",
          "d": "The Senzu beans have been swapped with bitter Brussels sprouts that taste like dirt."
        },
        {
          "t": "Chores Nimbus",
          "d": "Flying Nimbus refuses to carry you because of minor bad thoughts about skipping chores."
        },
        {
          "t": "Whis's Macroeconomics",
          "d": "Whis assigns you daily homework assignments in advanced macroeconomics."
        },
        {
          "t": "Woolen Sweater Brawls",
          "d": "You can only fight while wearing a heavy woolen holiday sweater knitted by Grandma."
        },
        {
          "t": "3-Star Michelin Beerus",
          "d": "Beerus threatens to destroy the Earth if your cooking doesn't earn three Michelin stars."
        },
        {
          "t": "Ticklish Tail",
          "d": "Your tail grows back, but it is ticklish and sensitive to light breezes."
        },
        {
          "t": "Confetti Kamehameha",
          "d": "Every Kamehameha blast comes out as a harmless burst of festive multi-colored confetti."
        },
        {
          "t": "Coach Yamcha",
          "d": "Yamcha is assigned as your personal martial arts coach and tactician."
        }
      ]
    },
    {
      "id": "spiderman",
      "name": "Spider-Man",
      "short": "Spidey",
      "glyph": "🕷️",
      "color": "#e23636",
      "lore": "Your friendly neighborhood wall-crawler. Great power, zero rent money.",
      "spin": "Spidey's turn! Let's see what happens!",
      "idle": "My Spidey-Sense is tingling… and it says HURRY UP!",
      "problems": [
        {
          "t": "Overcooked Spaghetti Webs",
          "d": "Your web-shooters shoot out soggy overcooked spaghetti instead of high-tensile fluid."
        },
        {
          "t": "Trivial Spider-Sense",
          "d": "Your Spider-Sense buzzes uncontrollably at minor inconveniences (like milk expiring tomorrow)."
        },
        {
          "t": "Leaked Search History",
          "d": "The Daily Bugle publishes your private search history on the front page above the fold."
        },
        {
          "t": "Laundry Shrunken Suit",
          "d": "Your Spidey suit shrinks two full sizes every single time you put it in the laundry."
        },
        {
          "t": "6-Hour Rent Due",
          "d": "Rent is due every 6 hours, and Mr. Ditkovich is always standing outside your apartment door."
        },
        {
          "t": "Butter Palms",
          "d": "Wall-crawling makes your palms sweatingly slippery, causing you to slide down like butter."
        },
        {
          "t": "Boss J. Jonah Jameson",
          "d": "J. Jonah Jameson is appointed your academic advisor and boss at every job you hold."
        },
        {
          "t": "Aunt May's Blind Dates",
          "d": "Aunt May signs you up for blind dates with eccentric villains' nieces."
        },
        {
          "t": "In-Mouth Mask",
          "d": "Your mask gets stuck inside your mouth whenever you try to deliver a witty combat comeback."
        },
        {
          "t": "Scaffolding Swing",
          "d": "Web-swinging through Manhattan only works along streets that currently have construction scaffolding."
        },
        {
          "t": "Pigeon Restroom",
          "d": "Pigeons treat your shoulders as their premier international restroom hub."
        },
        {
          "t": "Goblin's TV Spoilers",
          "d": "The Green Goblin constantly DMs you spoilers for TV shows you haven't finished yet."
        },
        {
          "t": "Daily Lost Backpack",
          "d": "You lose your backpack with your civilian clothes in it every single day."
        },
        {
          "t": "Doc Ock Bear Hugs",
          "d": "Doc Ock’s mechanical tentacles only want to give you suffocating, polite bear hugs."
        },
        {
          "t": "Actual Spider Allergy",
          "d": "You are violently allergic to actual spiders and sneeze whenever one enters the room."
        },
        {
          "t": "Unreimbursed Bus Fares",
          "d": "The Avengers refuse to reimburse your subway tokens and bus fares."
        }
      ]
    },
    {
      "id": "shinchan",
      "name": "Shin-chan",
      "short": "Shin-chan",
      "glyph": "🍑",
      "color": "#ff3344",
      "lore": "Five-year-old menace from Kasukabe. Master of the Buri Buri dance and Chocobi consumption.",
      "spin": "Hehehe! Look at me spin, Action Kamen!",
      "idle": "Boring! Spin it before I show you my elephant!",
      "problems": [
        {
          "t": "Organic Farming Kamen",
          "d": "Action Kamen is cancelled and replaced with a 24-hour marathon of organic farming lectures."
        },
        {
          "t": "Bell Pepper Infusion",
          "d": "Green bell peppers are magically infused into every single meal and snack you touch."
        },
        {
          "t": "Patrol Buri Buri",
          "d": "Your famous 'Buri Buri' dance immediately alerts the neighborhood patrol and principal."
        },
        {
          "t": "Supervisor Kazama",
          "d": "Kazama is appointed as your permanent, 24/7 hall monitor and homework supervisor."
        },
        {
          "t": "10-Minute Pun Hiccups",
          "d": "You cannot tell jokes or mischievous puns without getting an uncontrollable 10-minute hiccup."
        },
        {
          "t": "Mom's Guri-Guri Fist",
          "d": "Misae (Mom) gives you the iron fist head-twist ('Guri-Guri') for other people's mistakes."
        },
        {
          "t": "Dad's Fog of Socks",
          "d": "Hiroshi (Dad)'s smelly socks follow you around like an ominous, floating green fog."
        },
        {
          "t": "Shiro's Wagyu Demands",
          "d": "Shiro refuses to do tricks and instead demands gourmet wagyu beef before listening."
        },
        {
          "t": "Framed by Himawari",
          "d": "Himawari steals your prized toys and successfully frames you in front of your parents."
        },
        {
          "t": "Demoted to Intern",
          "d": "The Kasukabe Defense Force votes to demote you to honorary intern indefinitely."
        },
        {
          "t": "Principal's Daily Tea",
          "d": "Principal Enchoman (the 'Gang Leader') visits your house every day for tea and small talk."
        },
        {
          "t": "Chocobi Discontinued",
          "d": "Chocobi snacks are permanently discontinued nationwide due to a supply-chain crisis."
        },
        {
          "t": "Quadruple Detention",
          "d": "Yoshinaga-sensei and Matsuzaka-sensei team up to give you quadruple weekend detention."
        },
        {
          "t": "Silent Vow Nanako",
          "d": "Nanako-oneesan joins a monastery and takes a permanent vow of silence."
        },
        {
          "t": "Missing Tricycle Wheels",
          "d": "Your tricycles and toys always lose a wheel whenever you're in a hurry."
        },
        {
          "t": "Matching Outfit Neighbors",
          "d": "Micchi and Yoshirin move in next door and invite you to matching outfit parties daily."
        }
      ]
    },
    {
      "id": "pikachu",
      "name": "Pikachu",
      "short": "Pikachu",
      "glyph": "⚡",
      "color": "#fecb00",
      "lore": "Electric mouse and world champion. Loves ketchup, hates Thunder Stones.",
      "spin": "Pika-pika… CHUUU! *spins*",
      "idle": "Pika… pika… CHUUU?! (Spin it!)",
      "problems": [
        {
          "t": "Static Charger Fryer",
          "d": "You constantly discharge static electricity, accidentally frying teammates' phone chargers."
        },
        {
          "t": "Autocorrect Insults",
          "d": "You can only say your own name, and auto-correct translates it to aggressive insults."
        },
        {
          "t": "Fluorescent Cubicle",
          "d": "Your Pokéball is an open-concept corporate cubicle with fluorescent lighting and no door."
        },
        {
          "t": "Sock & Storm Phobia",
          "d": "You are deathly terrified of thunderstorms, static balloons, and synthetic wool socks."
        },
        {
          "t": "Swamp Rat Fur",
          "d": "Water-type attacks don't damage you, but they leave your fur smelling like a drenched swamp rat."
        },
        {
          "t": "Organic Dijon Ketchup",
          "d": "Team Rocket replaces your ketchup bottles with sugar-free organic Dijon mustard."
        },
        {
          "t": "Caught Lightning Tail",
          "d": "Your lightning bolt tail gets caught in elevator doors and subway turnstiles."
        },
        {
          "t": "Ash's Tackle Spam",
          "d": "Ash Ketchum forgets your battle moves and keeps commanding you to use 'Tackle' against Rock types."
        },
        {
          "t": "Raichu's Stolen Glory",
          "d": "Raichu attends every party you go to and effortlessly steals all your thunder and popularity."
        },
        {
          "t": "Glitter Cheek Sneeze",
          "d": "Your red cheek pouches leak glitter whenever you sneeze or yawn."
        },
        {
          "t": "Heat-Seeking Thunder Stone",
          "d": "The Thunder Stone chases you around like an autonomous heat-seeking missile."
        },
        {
          "t": "Hamster Wheel Power",
          "d": "You must run on a hamster wheel at the local Pokémon Center to recharge their backup generator."
        },
        {
          "t": "Squeezed Like a Plush",
          "d": "Every child in the city tries to squeeze you like a plush toy without warning."
        },
        {
          "t": "Tin Foil Iron Tail",
          "d": "Your Iron Tail move turns your tail into flimsy tin foil."
        },
        {
          "t": "Coffee Crime Detective",
          "d": "You cannot watch detective movies without someone asking if you solve coffee crimes."
        },
        {
          "t": "Voltage Code Audit",
          "d": "Electric-type gym leaders constantly audit your voltage output for regulatory code violations."
        }
      ]
    },
    {
      "id": "mario",
      "name": "Mario",
      "short": "Mario",
      "glyph": "🍄",
      "color": "#e52521",
      "lore": "Mushroom Kingdom's greatest hero. Still waiting for the Princess to be in this castle.",
      "spin": "It's-a me, Mario! Let's-a go spin!",
      "idle": "Mamma mia! Spin the wheel already!",
      "problems": [
        {
          "t": "Wrong Castle GPS",
          "d": "The Princess is genuinely in another castle, and the GPS navigation sends you to a dead end."
        },
        {
          "t": "Inverted Controls Mushroom",
          "d": "Every Super Mushroom you consume inverts your left and right directional controls."
        },
        {
          "t": "Luigi's Merch Royalties",
          "d": "Luigi gets all the credit, public praise, and Nintendo merchandise royalties for your hard work."
        },
        {
          "t": "Pipe License Revoked",
          "d": "The Mushroom Kingdom plumbers' union revokes your license for unauthorized pipe diving."
        },
        {
          "t": "Foghorn Jumps",
          "d": "Jumping makes a deafening, embarrassing foghorn sound audible across three zip codes."
        },
        {
          "t": "Sacrificed by Yoshi",
          "d": "Yoshi drops you into bottomless pits to save himself whenever a turtle appears."
        },
        {
          "t": "Bowser's Board Game Night",
          "d": "Bowser invites you to high-stakes family game nights where he makes up the rules as he goes."
        },
        {
          "t": "Expired Blockbuster Coins",
          "d": "Coins you collect automatically convert into expired Blockbuster gift certificates."
        },
        {
          "t": "Bushy Blinding Moustache",
          "d": "Your iconic mustache grows so thick and bushy it covers your nose and mouth entirely."
        },
        {
          "t": "Chartreuse Fire Heartburn",
          "d": "Fire Flowers give you intense acid heartburn and turn your overalls neon chartreuse."
        },
        {
          "t": "Tailgating Blue Shell",
          "d": "The Blue Shell follows you everywhere in everyday traffic, even when driving a rental sedan."
        },
        {
          "t": "Toad's Ear Piercing Screams",
          "d": "Toad screams directly into your ear every time you try to read a sign or map."
        },
        {
          "t": "Philosophical Goombas",
          "d": "Goombas challenge you to philosophical debates instead of letting you stomp them."
        },
        {
          "t": "Permanent Wedgie Overalls",
          "d": "Overalls shrink dramatically in hot water, giving you an agonizing permanent wedgie."
        },
        {
          "t": "Bathtub Piranha Plants",
          "d": "Piranha Plants sprout inside your home bathtub and shower drain."
        },
        {
          "t": "Wario's Garlic Plant",
          "d": "Wario buys the lot next to your house and builds a giant, stinky garlic processing plant."
        }
      ]
    },
    {
      "id": "sherlock",
      "name": "Sherlock Holmes",
      "short": "Sherlock",
      "glyph": "🔍",
      "color": "#8b7355",
      "lore": "Consulting detective of 221B Baker Street. Bored when there's no murder, furious when there's no violin.",
      "spin": "The game is afoot! Let the wheel turn.",
      "idle": "Elementary, my dear friend: you are wasting my time.",
      "problems": [
        {
          "t": "Embarrassing Deductions",
          "d": "Your deductive reasoning only reveals deeply embarrassing, useless facts about random strangers."
        },
        {
          "t": "Watson's TikTok Chronicles",
          "d": "Dr. Watson refuses to write case chronicles and only documents mysteries via TikTok dances."
        },
        {
          "t": "Solved by Reddit",
          "d": "Every crime scene you inspect has already been solved by an amateur teenage Reddit thread."
        },
        {
          "t": "Snapped Violin Strings",
          "d": "Your violin strings snap loudly whenever you try to retreat into your 'Mind Palace'."
        },
        {
          "t": "Moriarty's Catalog Spam",
          "d": "Professor Moriarty only attacks you by subscribing your address to 500 spam mail catalogs."
        },
        {
          "t": "Archaic 14-Syllable Words",
          "d": "You cannot speak without using 14-syllable archaic words that require a dictionary."
        },
        {
          "t": "Lestrade's Stolen Glory",
          "d": "Inspector Lestrade takes all the public credit and wins Detective of the Year every year."
        },
        {
          "t": "Potpourri Chemistry Sets",
          "d": "Mrs. Hudson replaces all your investigative chemistry sets with decorative potpourri bowls."
        },
        {
          "t": "Mite-Infested Deerstalker",
          "d": "Your deerstalker cap is infested with itchy wool mites you cannot wash out."
        },
        {
          "t": "401(k) Baker Street Youths",
          "d": "The Baker Street Irregulars unionize and demand a 401(k) and dental plan before running errands."
        },
        {
          "t": "Slipping Disguises",
          "d": "Disguises you wear always fall off at the exact climax of your dramatic reveal."
        },
        {
          "t": "Irene's Smug Postcards",
          "d": "Irene Adler sends you postcards detailing how she outsmarted you again in simple games."
        },
        {
          "t": "Toddler's Magnifying Glass",
          "d": "You lose your magnifying glass and must inspect footprints using a toddler's plastic spy glass."
        },
        {
          "t": "Burnt Toast London Fog",
          "d": "The London fog smells like burnt toast and causes your eyes to water uncontrollably."
        },
        {
          "t": "Mycroft's Diet Tips",
          "d": "Mycroft Holmes constantly texts you unsolicited weight-loss and life-coaching tips."
        },
        {
          "t": "Polite Victorian Tea",
          "d": "You are forced to attend polite Victorian tea parties where deductive reasoning is illegal."
        }
      ]
    },
    {
      "id": "batman",
      "name": "Batman",
      "short": "Batman",
      "glyph": "🦇",
      "color": "#546e7a",
      "lore": "The Dark Knight of Gotham. I am vengeance, I am the night, I forgot my gadget dongle.",
      "spin": "I am Batman… and this is your wheel.",
      "idle": "Gotham cannot wait. Neither can I.",
      "problems": [
        {
          "t": "Gravelly Whisper Drive-Thru",
          "d": "Your voice is stuck on ultra-gravelly whisper mode and drive-thru workers cannot hear your order."
        },
        {
          "t": "Alfred's Pastel Moped",
          "d": "Alfred replaces the Batmobile with an eco-friendly, pastel yellow 50cc moped."
        },
        {
          "t": "Gargoyle Rooftop Ban",
          "d": "Gotham City passes a strict municipal code banning gargoyles and brooding on rooftops."
        },
        {
          "t": "Laughing-Crying Bat-Signal",
          "d": "The Bat-Signal has been replaced with a low-res laughing-crying emoji projected on the clouds."
        },
        {
          "t": "Missing Gadget Dongles",
          "d": "All your gadgets require proprietary dongles and charging bricks that you left at the Batcave."
        },
        {
          "t": "Revolving Door Cape",
          "d": "Your cape gets stuck in the Wayne Enterprises revolving doors on your way into work."
        },
        {
          "t": "Joker's Podcast Co-Host",
          "d": "The Joker decides he no longer wants to be a criminal; he just wants to be your podcast co-host."
        },
        {
          "t": "Boomerang Batarangs",
          "d": "The Batarangs fly back and hit you squarely in the forehead like boomerangs."
        },
        {
          "t": "Gordon's Early Exit",
          "d": "Commissioner Gordon leaves before you finish talking instead of you vanishing on him."
        },
        {
          "t": "Boyband Batcomputer",
          "d": "Robin changes your Batcomputer wallpaper to a collage of boyband posters."
        },
        {
          "t": "104°F Thermal Vents",
          "d": "The thermal vents in your batsuit malfunction, keeping your suit at a balmy 104°F (40°C)."
        },
        {
          "t": "Ambiguous Riddles",
          "d": "The Riddler leaves only Wordle and Sudoku puzzles that have multiple valid answers."
        },
        {
          "t": "Noise-Cancelling Robbers",
          "d": "Gotham City bank robbers wear noise-cancelling headphones so your theatrical threats fail."
        },
        {
          "t": "Weekly Charity Bingo",
          "d": "Gotham socialites force Bruce Wayne to host 6-hour charity bingo tournaments weekly."
        },
        {
          "t": "Revolving Arkham Doors",
          "d": "Arkham Asylum installs revolving doors that literally spin prisoners straight back out to the street."
        },
        {
          "t": "Florida Bat Migration",
          "d": "The bats inside the Batcave have all migrated to Florida for warmer weather."
        }
      ]
    },
    {
      "id": "elsa",
      "name": "Elsa",
      "short": "Elsa",
      "glyph": "❄️",
      "color": "#48cae4",
      "lore": "Queen of Arendelle. The cold never bothered her anyway, but the royalty paperwork definitely does.",
      "spin": "Let it spin! Let it spin!",
      "idle": "The frost is spreading… spin before it freezes over!",
      "problems": [
        {
          "t": "Lukewarm Brown Slush",
          "d": "Everything you touch freezes into slushy, lukewarm brown snow instead of beautiful crystalline ice."
        },
        {
          "t": "Earworm Dentist Pop",
          "d": "'Let It Go' plays as non-stop, inescapable background dentist-office music inside your head."
        },
        {
          "t": "Melting Olaf Reassembly",
          "d": "Olaf melts at room temperature and demands you reassemble his twig arms every 12 minutes."
        },
        {
          "t": "Room-Temp Brain Freeze",
          "d": "You get excruciating brain freezes even from drinking lukewarm room-temperature water."
        },
        {
          "t": "Polite Snow Monsters",
          "d": "Giant snow monsters you create are gentle introverts who apologize to intruders and offer tea."
        },
        {
          "t": "Fridge Repair Queen",
          "d": "Arendelle citizens constantly ask you to fix their refrigerators and make crushed ice for drinks."
        },
        {
          "t": "4:30 AM Snowman Song",
          "d": "Anna wakes you up at 4:30 AM every single morning singing about building snowmen."
        },
        {
          "t": "Slippery Floor Puddles",
          "d": "Your magical ice dress leaves a trail of messy, slippery water puddles across every wooden floor."
        },
        {
          "t": "Sweaty Cold Gloves",
          "d": "Gloves you wear make your hands sweat profusely while your fingers stay ice-cold."
        },
        {
          "t": "Sven in the Bedroom",
          "d": "Kristoff brings his reindeer Sven to sleep in your royal bedchamber every night."
        },
        {
          "t": "OSHA Bridge Permits",
          "d": "Ice bridges you create are subject to strict municipal building permits and OSHA inspections."
        },
        {
          "t": "Weselton's Royal CFO",
          "d": "The Duke of Weselton becomes your kingdom's permanent chief financial officer."
        },
        {
          "t": "Rubber Bullet Sneezes",
          "d": "You sneeze out ice cubes that bounce around the room like dangerous rubber bullets."
        },
        {
          "t": "Gale's Messy Winds",
          "d": "Wind spirits (Gale) constantly mess up your hair and blow your royal paperwork into the sea."
        },
        {
          "t": "Strip Mall Ice Castles",
          "d": "Whenever you try to make an ice palace, it accidentally resembles a generic suburban strip mall."
        },
        {
          "t": "Peeling Sun-Dermatitis",
          "d": "Summer weather gives you an incurable case of itchy, peeling sun-dermatitis."
        }
      ]
    },
    {
      "id": "shrek",
      "name": "Shrek",
      "short": "Shrek",
      "glyph": "🧅",
      "color": "#7cb342",
      "lore": "Like an onion: many layers, terrible breath, fiercely protective of his mud.",
      "spin": "Get out of my swamp and SPIN this wheel!",
      "idle": "Donkey is talking less than you're stalling. SPIN!",
      "problems": [
        {
          "t": "Rezoned Swamp Condos",
          "d": "Your swamp has been acquired by property developers and rezoned into luxury boutique condominiums."
        },
        {
          "t": "Donkey's Agile Scrums",
          "d": "Donkey has completed an online MBA and conducts daily mandatory Agile scrums in your living room."
        },
        {
          "t": "Onion Acid Reflux",
          "d": "Onions now give you severe acid reflux, uncontrollable belching, and watery eyes."
        },
        {
          "t": "Lavender Bath Bomb Scent",
          "d": "You naturally smell like vanilla lavender bath bombs instead of terrifying, glorious bog mud."
        },
        {
          "t": "Farquaad's Ghost Landlord",
          "d": "Lord Farquaad's ghost is legally assigned as your permanent roommate and landlord."
        },
        {
          "t": "Squatting Fairytale Mob",
          "d": "Fairy tale creatures move their luggage into your bedroom and refuse to leave without eviction orders."
        },
        {
          "t": "Sparkling Alpine Shower",
          "d": "Your mud shower only dispenses sparkling mineral water imported from the French Alps."
        },
        {
          "t": "Selfie Villagers",
          "d": "Pitchfork-wielding villagers show up with cameras asking for polite selfies and autographs."
        },
        {
          "t": "Puss in Boots Begging",
          "d": "Puss in Boots uses his big cute eyes to make you give him all your dinner every night."
        },
        {
          "t": "Clear Glass Outhouse",
          "d": "Your outhouse door is replaced with a clear glass partition with zero privacy."
        },
        {
          "t": "Fiona's Minimalist Makeover",
          "d": "Princess Fiona becomes addicted to clean home-decorating reality TV and throws out your slime."
        },
        {
          "t": "Unskippable Magic Mirror",
          "d": "The Magic Mirror on the wall only displays 15-second unskippable commercial advertisements."
        },
        {
          "t": "Dragon's Oversized Chew Toy",
          "d": "Dragon mistakes you for an oversized green chew toy whenever she visits."
        },
        {
          "t": "Party Horn Roar",
          "d": "Every time you roar, a cheerful cheerful party horn sound effect comes out of your mouth."
        },
        {
          "t": "Gingy's Assault Lawsuits",
          "d": "Gingy (the Gingerbread Man) threatens to sue you for assault every time you step near a bakery."
        },
        {
          "t": "Open-Top Yard Tours",
          "d": "Duloc tourists take daily open-top double-decker bus tours through your front yard."
        }
      ]
    },
    {
      "id": "jack-sparrow",
      "name": "Captain Jack Sparrow",
      "short": "Jack Sparrow",
      "glyph": "🏴‍☠️",
      "color": "#b07d4b",
      "lore": "Captain. Captain Jack Sparrow. The rum is gone and his compass is thoroughly confused.",
      "spin": "Savvy? Let us see what the wind brings!",
      "idle": "Why is the rum gone… and why haven't you spun yet?",
      "problems": [
        {
          "t": "Warm Kombucha Rum",
          "d": "The rum is always gone, and permanently replaced with warm sparkling organic kombucha."
        },
        {
          "t": "Parking Enforcement Compass",
          "d": "Your compass points only to the nearest parking enforcement officer writing a ticket."
        },
        {
          "t": "Impounded Black Pearl",
          "d": "The Black Pearl is impounded by the harbor master for unpaid maritime docking fees."
        },
        {
          "t": "Sober Straight Lines",
          "d": "You can only walk in perfectly straight, sober lines when you are trying to act dramatic."
        },
        {
          "t": "Barbossa's Landslide Elections",
          "d": "Captain Barbossa is voted captain in every crew election by an overwhelming, unanimous landslide."
        },
        {
          "t": "Critiquing Dreadlock Crabs",
          "d": "Your dreadlocks are infested with singing pirate crabs that critique your life choices."
        },
        {
          "t": "Toddler Babysitting Duty",
          "d": "Elizabeth Swann and Will Turner constantly demand you babysit their energetic toddler."
        },
        {
          "t": "Royal Navy Probation Officer",
          "d": "The Royal Navy assigns you a court-ordered probation officer who accompanies you on every voyage."
        },
        {
          "t": "Sea Salt Biscuit Coupons",
          "d": "Every treasure chest you unearth contains only promotional coupons for sea salt biscuits."
        },
        {
          "t": "Playful Puppy Kraken",
          "d": "Davy Jones’ Kraken doesn't want to sink your ship; it just wants to lick your face like a giant puppy."
        },
        {
          "t": "Bubble Blowing Flintlock",
          "d": "Your flintlock pistol fires tiny bubbles instead of lead balls on three out of four shots."
        },
        {
          "t": "Calypso's Aztec Alimony",
          "d": "Calypso demands alimony payments in cursed Aztec gold every full moon."
        },
        {
          "t": "Pearl Crew Strike",
          "d": "The crew of the Black Pearl goes on strike demanding overtime pay and weekend shore leave."
        },
        {
          "t": "Pelican Hat Thief",
          "d": "Your iconic pirate hat is stolen by a mischievous pelican that flies just out of reach."
        },
        {
          "t": "Rhyming Nonsense Shanties",
          "d": "You are cursed to speak exclusively in rhyming pirate sea shanties that make no sense."
        },
        {
          "t": "PETA Turtle Charges",
          "d": "Sea turtles you try to lash together with back hair file cruelty charges with PETA."
        }
      ]
    },
    {
      "id": "gollum",
      "name": "Gollum",
      "short": "Gollum",
      "glyph": "💍",
      "color": "#9e9e9e",
      "lore": "Stinking Bagginses stole it from us! Smeagol hates nasty hobbitses.",
      "spin": "We wants it, we spins it, precious!",
      "idle": "Hurry, precious, or Smeagol will bite!",
      "problems": [
        {
          "t": "Plastic Bottle Cap",
          "d": "The 'Precious' is an ordinary yellow plastic bottle cap, but you still worship it fanatically."
        },
        {
          "t": "Google Meet Arguments",
          "d": "Smeagol and Gollum can only conduct their internal arguments through scheduled Google Meet links."
        },
        {
          "t": "Cardboard Raw Fish",
          "d": "Fresh juicy raw fish tastes like dry, overcooked cardboard and gives you an upset stomach."
        },
        {
          "t": "1-Star Yelp Guide",
          "d": "Frodo and Sam leave you a polite, detailed 1-star Yelp review as a Middle-earth tour guide."
        },
        {
          "t": "Queen's English Grammar",
          "d": "You are magically compelled to speak in flawless, grammatically pristine Queen's English."
        },
        {
          "t": "Blistering Moonlight",
          "d": "The light of the Moon burns your skin just as badly as the yellow face of the Sun."
        },
        {
          "t": "Only Lembas Bread",
          "d": "Lembas bread is the only food available within a 50-mile radius of your cave."
        },
        {
          "t": "Dropping Loincloth",
          "d": "Your loincloth keeps falling off during high-intensity stealth stalking maneuvers."
        },
        {
          "t": "Mordor ID Check",
          "d": "Sauron forgets who you are and asks for two forms of government ID whenever you visit Mordor."
        },
        {
          "t": "Shelob's Annoying Sibling",
          "d": "Shelob the spider treats you like an irritating younger sibling who is not allowed in her web."
        },
        {
          "t": "Sneezing Stalker",
          "d": "You sneeze loudly every single time you attempt to crawl silently behind someone."
        },
        {
          "t": "Sensitive Soup Dentures",
          "d": "Your sharp teeth are replaced with sensitive, fragile dentures that fall into your soup."
        },
        {
          "t": "First-Grade Riddle Defeats",
          "d": "Bagginses keep winning every riddle contest by asking basic grade-school addition problems."
        },
        {
          "t": "Sticky Cider Marshes",
          "d": "The Dead Marshes water is replaced with sparkling apple cider that makes your skin sticky."
        },
        {
          "t": "Storm Drain Drops",
          "d": "You accidentally drop your precious items down storm drains on a weekly basis."
        },
        {
          "t": "Catchphrase Podcasters",
          "d": "An army of enthusiastic podcasters follows you around trying to record your catchphrases."
        }
      ]
    },
    {
      "id": "frankenstein",
      "name": "Frankenstein's Monster",
      "short": "The Monster",
      "glyph": "🧟",
      "color": "#4caf50",
      "lore": "Stitched together from graveyard scrap. Just wants a friend and some quiet.",
      "spin": "MONSTER… WILL… SPIN! *grunt*",
      "idle": "Monster getting… very… angry…",
      "problems": [
        {
          "t": "Fluorescent Migraines",
          "d": "Torches and pitchforks do not harm you, but flickering office fluorescent lights give you migraines."
        },
        {
          "t": "Blaring Electrode Radio",
          "d": "The neck electrodes pick up local AM sports talk radio at maximum volume with no volume knob."
        },
        {
          "t": "Half-Speed Slow Walk",
          "d": "You can only move at 0.5x slow-motion speed when walking toward something you actually want."
        },
        {
          "t": "Creator Ghosting Support",
          "d": "Dr. Frankenstein refuses to pay court-ordered creation child support and blocks your calls."
        },
        {
          "t": "Abomination Sneeze",
          "d": "You sneeze violently every time someone in the village utters the word 'abomination'."
        },
        {
          "t": "Arm-Wrestling Toddlers",
          "d": "Small children in the village challenge you to arm-wrestling matches and win easily."
        },
        {
          "t": "Laughing Leaf Tear",
          "d": "Your stitched skin tears open whenever you laugh, spilling dried autumnal leaves."
        },
        {
          "t": "Storm Dancing Circuit",
          "d": "Rainstorms cause your internal electrical charge to short-circuit, causing your legs to dance involuntarily."
        },
        {
          "t": "Low Doorway Concussions",
          "d": "Every door frame in the world is 3 inches too short for you, resulting in constant forehead concussions."
        },
        {
          "t": "Neat-Freak Monster Bride",
          "d": "The monster bride built for you is a hyper-organized neat freak who hates your gothic crypt style."
        },
        {
          "t": "Flower Pollen Allergies",
          "d": "Villagers throw flowers at you, but the pollen gives you severe seasonal allergies."
        },
        {
          "t": "Squeaking Clown Boots",
          "d": "Your heavy boots make loud squeaking clown noises with every single heavy thud."
        },
        {
          "t": "Cold Stethoscope Students",
          "d": "Medical students constantly try to examine your stitches with cold stethoscopes."
        },
        {
          "t": "Purring Kitten Phobia",
          "d": "You are deathly afraid of tiny kittens and jump onto chairs whenever one purrs."
        },
        {
          "t": "Victor's Bestselling Memoir",
          "d": "Dr. Frankenstein writes an unflattering tell-all memoir about you that becomes a bestseller."
        },
        {
          "t": "Tax Collector Brain",
          "d": "Your brain was taken from an 18th-century tax collector, giving you an obsession with receipts."
        }
      ]
    },
    {
      "id": "medusa",
      "name": "Medusa",
      "short": "Medusa",
      "glyph": "🐍",
      "color": "#2e7d32",
      "lore": "Gorgon with serpent locks and a stony gaze. Don't look her in the eye.",
      "spin": "Hissss… let the wheel turn to stone!",
      "idle": "My serpents are hissing… SPIN before they strike!",
      "problems": [
        {
          "t": "Takeout Arguing Snakes",
          "d": "Your snake hair is constantly arguing over what takeout to order for dinner every night."
        },
        {
          "t": "Styrofoam Peanut Gaze",
          "d": "Anyone who looks at you turns into squeaky styrofoam packing peanuts instead of stone."
        },
        {
          "t": "Chalk Nose Selfie",
          "d": "You cannot look into any mirror or smartphone camera without turning your own nose to chalk."
        },
        {
          "t": "Scalp Care Blacklist",
          "d": "Every luxury shampoo and conditioner brand refuses to sponsor or clean your uncooperative serpent locks."
        },
        {
          "t": "Job Interview Shedding",
          "d": "You shed all your facial scales during high-stakes job interviews and public speeches."
        },
        {
          "t": "Snoring Library Snakes",
          "d": "The snakes on your head fall asleep and snore loudly during quiet library hours."
        },
        {
          "t": "Perseus's Restraining Order",
          "d": "Perseus files a restraining order against you and sends glossy wedding invitations."
        },
        {
          "t": "Tagged Statues",
          "d": "Your statues of past enemies keep getting tagged with colorful street graffiti by local teens."
        },
        {
          "t": "Slipping Sunglasses",
          "d": "Sunglasses you wear immediately slide down your scaly nose bridge."
        },
        {
          "t": "Athena's Curse Inspections",
          "d": "Athena visits your cave unannounced to inspect your compliance with ancient curse standards."
        },
        {
          "t": "Ear-Biting Hair",
          "d": "The snakes occasionally bite your own ears when they get startled by sudden loud noises."
        },
        {
          "t": "Art Exhibit Tourists",
          "d": "Tourist groups wander into your lair thinking it is an interactive contemporary art exhibit."
        },
        {
          "t": "Beanie Snake Breaches",
          "d": "You cannot wear knit sweaters or beanies because the snake heads poke through and ruin the wool."
        },
        {
          "t": "Hair Rodent Infestation",
          "d": "Mice and rodents are naturally attracted to your hair, creating constant domestic drama."
        },
        {
          "t": "Bumbling Blindfolded Duelists",
          "d": "Blindfolded warriors show up to duel you and end up bumping into walls and breaking your vases."
        },
        {
          "t": "24-Eye Dry Drops",
          "d": "You are cursed with constant dry eye and have to apply eye drops to 24 eyes simultaneously."
        }
      ]
    },
    {
      "id": "chhota-bheem",
      "name": "Chhota Bheem",
      "short": "Bheem",
      "glyph": "🥊",
      "color": "#ef6c00",
      "lore": "Strongest kid in Dholakpur. Fueled by laddoos, feared by dacoits, adored by royalty.",
      "spin": "Dholakpur ki shaan! Let's spin the wheel!",
      "idle": "Tuntun Mausi's laddoos are getting cold… spin now!",
      "problems": [
        {
          "t": "Laddoo Famine",
          "d": "Dholakpur runs completely out of laddoos; the kingdom now only produces unseasoned boiled oats."
        },
        {
          "t": "Super-Athletic Kalia",
          "d": "Kalia becomes significantly stronger, more athletic, and universally more popular than you."
        },
        {
          "t": "Dholu-Bholu Commentary",
          "d": "Dholu and Bholu provide live, unmuted running commentary on your every mistake and failure."
        },
        {
          "t": "Neon Pink Dhoti",
          "d": "Your iconic orange dhoti turns bright neon pink and cannot be dyed back under any circumstances."
        },
        {
          "t": "Raju's No-Confidence Vote",
          "d": "Raju challenges your leadership at every single village council and demands a vote of no confidence."
        },
        {
          "t": "Chutki's Math Homework",
          "d": "Chutki refuses to give you any sweets and makes you do her advanced math homework instead."
        },
        {
          "t": "Jaggu's Lunch Leaks",
          "d": "Jaggu the monkey steals your lunchbox and uploads photos of your food to the village bulletin board."
        },
        {
          "t": "Chief Sewer Inspector",
          "d": "Raja Indraverma appoints you as the kingdom's chief sewer sanitation inspector."
        },
        {
          "t": "Kale Smoothie Defeats",
          "d": "Villains in the jungle defeat you simply by offering you a healthy kale smoothie."
        },
        {
          "t": "Stinky Onion Super-Strength",
          "d": "Your super-strength only activates when you are carrying heavy sacks of stinky onions."
        },
        {
          "t": "Exploding Inventions",
          "d": "Professor Dhoomketu’s experimental inventions always explode specifically inside your bedroom."
        },
        {
          "t": "Public Indumati Friendzone",
          "d": "Princess Indumati friendzones you publicly in front of the entire royal court assembly."
        },
        {
          "t": "Sprained Ankle Kabaddi",
          "d": "Bullies from Pehalwanpur constantly challenge you to kabaddi on days you have a sprained ankle."
        },
        {
          "t": "Proximity Laddoo Ache",
          "d": "You get an incurable sweet tooth ache that throbs whenever a laddoo comes within 10 yards."
        },
        {
          "t": "Locked Gates at 7 PM",
          "d": "Dholakpur guards lock the village gates at 7:00 PM sharp, leaving you stranded in the dark forest."
        },
        {
          "t": "Babban Sher Shedding",
          "d": "Babban Sher the tiger treats you like an affectionate house cat and sheds orange fur on your dhoti."
        }
      ]
    },
    {
      "id": "motu-patlu",
      "name": "Motu Patlu",
      "short": "Motu Patlu",
      "glyph": "🛵",
      "color": "#e65100",
      "lore": "Inseparable duo of Furfuri Nagar. Motu needs samosas, Patlu needs an idea.",
      "spin": "Khali pet dimag ki batti nahi chalti! Spin!",
      "idle": "Idea, Patlu! Tell them to spin the wheel!",
      "problems": [
        {
          "t": "Coma Samosas",
          "d": "Samosas make Motu fall instantly into a deep coma-like sleep instead of giving him super-energy."
        },
        {
          "t": "Blackout Idea Lightbulb",
          "d": "Patlu’s 'Idea' lightbulb above his head shatters loudly and trips the Furfuri Nagar power grid."
        },
        {
          "t": "Chingum's Jaywalking Arrests",
          "d": "Inspector Chingum arrests both of you for jaywalking and reckless bicycle riding every morning."
        },
        {
          "t": "Cold Vegan Inventions",
          "d": "Dr. Jhatka’s latest inventions work with 100% stability, but they only prepare cold vegan salads."
        },
        {
          "t": "Citizen of the Year John",
          "d": "John the Don reforms his ways and wins the Furfuri Nagar 'Citizen of the Year' trophy."
        },
        {
          "t": "Ghasitaram's Blurry Thumbs",
          "d": "Ghasitaram’s 20 years of experience in photography only produces blurry photos of thumbs."
        },
        {
          "t": "Wedged Belly Doorway",
          "d": "Motu’s round belly gets wedged in every standard doorway, bus entrance, and rickshaw seat."
        },
        {
          "t": "8-Hour Dishwashing Credit",
          "d": "Chaiwala cuts off your credit line and makes Motu wash dirty tea glasses for 8 hours a day."
        },
        {
          "t": "Falling Bullet Casings",
          "d": "Chingum’s gun shoots real bullets into the air, but the spent casings always land on Patlu's head."
        },
        {
          "t": "Sneeze Boxing Matches",
          "d": "Boxer the neighbor challenges Motu to a 12-round heavyweight boxing match whenever Motu sneezes."
        },
        {
          "t": "Permanent Foggy Spectacles",
          "d": "Patlu’s spectacles fog up permanently whenever he tries to read an important clue."
        },
        {
          "t": "Bitter Karela Samosas",
          "d": "Samosas in the market are filled with bitter melon (karela) instead of spicy potatoes."
        },
        {
          "t": "Brakeless Flying Car",
          "d": "Dr. Jhatka tests his flying car on you without installing brakes or steering wheels."
        },
        {
          "t": "Henchmen Chess Grandmasters",
          "d": "John the Don’s henchmen Number 1 and Number 2 outsmart Patlu in chess every single time."
        },
        {
          "t": "Fried Snack Surcharge",
          "d": "Furfuri Nagar introduces a strict sugar and fried food tax that triples the price of street snacks."
        },
        {
          "t": "White Lie Mustache Drop",
          "d": "Motu’s mustache falls off whenever he tells a white lie, revealing a baby-smooth upper lip."
        }
      ]
    },
    {
      "id": "mr-bean",
      "name": "Mr. Bean",
      "short": "Mr. Bean",
      "glyph": "👔",
      "color": "#795548",
      "lore": "A grown man in a tweed jacket, armed with Teddy, a green Mini, and absolute chaos.",
      "spin": "*mumbles* Bean… spin… yes!",
      "idle": "*taps watch impatiently and grunts*",
      "problems": [
        {
          "t": "Biting Badger Teddy",
          "d": "Teddy is replaced with an aggressive, short-tempered live badger that bites your fingers."
        },
        {
          "t": "Random Mini Padlock",
          "d": "Your green Mini Cooper's door padlock code resets to a random 6-digit number every time you exit."
        },
        {
          "t": "Booming Sports Narration",
          "d": "You cannot remain silent; you involuntarily narrate your daily blunders in a booming sports caster voice."
        },
        {
          "t": "Escalator Sucked Ties",
          "d": "Every necktie you wear gets sucked into nearby escalators, food processors, or photocopiers."
        },
        {
          "t": "Vacuum-Sealed Turkey Head",
          "d": "A raw holiday turkey finds a way to become permanently vacuum-sealed over your entire head."
        },
        {
          "t": "Reliant Regal Drag Race",
          "d": "The blue three-wheeled Reliant Regal car out-accelerates you and runs you off the road."
        },
        {
          "t": "Right-Angle Tweed Jacket",
          "d": "Your tweed jacket shrinks in the drizzle until your arms are permanently stuck at right angles."
        },
        {
          "t": "Mother-in-Law Slapstick Ban",
          "d": "Irma Gobb brings her mother to live in your apartment and bans all slapstick humor."
        },
        {
          "t": "Conveyor Belt Stripper",
          "d": "Supermarket conveyor belts pull your clothes off whenever you place a tub of margarine down."
        },
        {
          "t": "Self-Dental Anesthesia",
          "d": "Dental appointments result in you accidentally anesthetizing the dentist and fixing your own teeth."
        },
        {
          "t": "Balcony Mismatched Socks",
          "d": "You get locked on high church balconies in front of the Archbishop while wearing mismatched socks."
        },
        {
          "t": "Sliding Roof Armchair",
          "d": "Your armchair slides off the roof of your Mini Cooper whenever you apply the handbrake."
        },
        {
          "t": "Crowded Tartare Hiding",
          "d": "Restaurant waiters serve you steak tartare, and every hiding spot (purses, violin cases) is occupied."
        },
        {
          "t": "Mid-Sneeze Photobooths",
          "d": "Automatic photo booths capture you only with your eyes shut, mouth open, and sneezing."
        },
        {
          "t": "High-Dive Board Collapse",
          "d": "Swimming pool high-dive boards collapse into the water the moment you finally muster the courage to jump."
        },
        {
          "t": "Calculus Alarm Clock",
          "d": "Your alarm clock cannot be turned off unless you solve a complex differential calculus problem."
        }
      ]
    },
    {
      "id": "minion",
      "name": "A Minion",
      "short": "Minion",
      "glyph": "🍌",
      "color": "#fdd835",
      "lore": "Banana-obsessed henchman in denim overalls. Fluent in Minionese and minor explosions.",
      "spin": "Bello! Poopaye… SPIN! Papoy!",
      "idle": "Tulaliloo ti amo! Spin-a la wheel, rápido!",
      "problems": [
        {
          "t": "Banana Hives",
          "d": "You are deathly allergic to bananas; eating one gives you giant yellow hives and itchy lips."
        },
        {
          "t": "Fogged-Up Goggles",
          "d": "Your signature goggles fog up completely every single time you attempt a villainous heist."
        },
        {
          "t": "Gru's Accounting Firm",
          "d": "Gru abandons villainy to open a certified public accounting firm, making you do tax spreadsheets."
        },
        {
          "t": "Corporate Minionese",
          "d": "Minionese auto-translates in real-time to dry, pedantic corporate business-speak."
        },
        {
          "t": "Flowery Deodorizer Fart Gun",
          "d": "The iconic fart gun now sprays refreshing, flowery organic room-deodorizer mist."
        },
        {
          "t": "Snapped Overall Clips",
          "d": "Your blue denim overalls have broken shoulder clips that snap open during dramatic moments."
        },
        {
          "t": "Thimble Shrunken Coffee",
          "d": "Dr. Nefario accidentally shrinks you to the size of a thimble whenever you ask for coffee."
        },
        {
          "t": "Rocket Test Pilot",
          "d": "Kevin, Stuart, and Bob vote to make you the test pilot for every experimental rocket weapon."
        },
        {
          "t": "Vector's Geometry Locker",
          "d": "Vector steals your lunchbox and leaves cryptic geometry formulas inside your locker."
        },
        {
          "t": "Poodle Purple Mutagen",
          "d": "El Macho’s purple mutagen potion only turns you into a fluffy, affectionate French poodle."
        },
        {
          "t": "Toothbrush Crown Polish",
          "d": "Scarlet Overkill demands that you polish the Royal Crown jewels with a single toothbrush for 40 hours."
        },
        {
          "t": "Off-Key Victory Rhymes",
          "d": "You can only sing nursery rhymes off-key when you try to perform evil villain victory choruses."
        },
        {
          "t": "Frilly Ballerina Tutu",
          "d": "Gru’s girls (Margo, Edith, Agnes) dress you up in pink frilly ballerina tutus for daily tea parties."
        },
        {
          "t": "Fluorescent Orange Glow",
          "d": "Your yellow skin turns fluorescent safety-orange in the dark, destroying all stealth capabilities."
        },
        {
          "t": "Closed Gelato Stands",
          "d": "Gelato stands in the city are permanently closed whenever your villain shift ends."
        },
        {
          "t": "Pocket Lipstick Taser",
          "d": "Lucy Wilde's lipstick taser goes off in your front pocket whenever your phone receives a text."
        }
      ]
    },
    {
      "id": "spongebob",
      "name": "SpongeBob SquarePants",
      "short": "SpongeBob",
      "glyph": "🧽",
      "color": "#fbc02d",
      "lore": "Fry cook at the Krusty Krab. Lives in a pineapple under the sea. Always ready.",
      "spin": "I'm ready! I'm ready! To spin!",
      "idle": "Gary is waiting for his food! SPIN THE WHEEL!",
      "problems": [
        {
          "t": "Snapped Spatula",
          "d": "Your favorite spatula snaps cleanly in half whenever a hungry customer orders a Krabby Patty."
        },
        {
          "t": "Squidward's Eternal Bonus",
          "d": "Squidward is awarded the 'Employee of the Month' title and a cash bonus every single month forever."
        },
        {
          "t": "Rusty Floorboard Laugh",
          "d": "You laugh like a rusty, high-pitched floorboard with every single breath you inhale."
        },
        {
          "t": "Mrs. Puff Boating Pass",
          "d": "Mrs. Puff passes you on your boating test, meaning you have zero legal excuses for parking violations."
        },
        {
          "t": "45-Minute Karate Sparring",
          "d": "Sandy Cheeks invites you to extreme, bone-breaking karate sparring sessions every 45 minutes."
        },
        {
          "t": "Academic Critic Patrick",
          "d": "Patrick Star becomes an intellectual genius who critiques your life choices with academic papers."
        },
        {
          "t": "$50/Hr Kitchen Standing Fee",
          "d": "Mr. Krabs charges you $50 an hour for the privilege of standing in the Krusty Krab kitchen."
        },
        {
          "t": "Framed for Formula Theft",
          "d": "Plankton successfully steals the secret formula and frames you as the criminal mastermind."
        },
        {
          "t": "Caviar Demanding Gary",
          "d": "Gary the Snail refuses to eat his Snail Pooh food and demands fresh organic caviar twice a day."
        },
        {
          "t": "Crusty Dried-Up Sponge",
          "d": "You dry out like a crusty dish sponge whenever you step outside your pineapple house."
        },
        {
          "t": "Landlord Bubble Buddy",
          "d": "Bubble Buddy becomes your landlord and raises the rent on your pineapple home."
        },
        {
          "t": "Barnacle Scraping Dutchman",
          "d": "The Flying Dutchman recruits you as his permanent ghost crew mate to scrape barnacles."
        },
        {
          "t": "Pinpoint Jellyfish Stings",
          "d": "Jellyfish in Jellyfish Fields sting you with pinpoint accuracy directly on your nose."
        },
        {
          "t": "Water Ball Supervillain",
          "d": "Mermaid Man and Barnacle Boy mistake you for a supervillain and hit you with the Water Ball."
        },
        {
          "t": "Rubber Band Tight Pants",
          "d": "Your square pants shrink in the wash until they are as tight as a rubber band."
        },
        {
          "t": "Soggy Chum Drive-Thru",
          "d": "The Krusty Krab is converted into a 24-hour drive-thru that only serves soggy chum sticks."
        }
      ]
    },
    {
      "id": "wildcard",
      "name": "Wildcard (Invent Your Own)",
      "short": "Wildcard",
      "glyph": "🃏",
      "color": "#ab47bc",
      "lore": "The nameless soul. Free to invent your own persona, but bound by universal chaos.",
      "spin": "The wildcard enters the arena! SPIN!",
      "idle": "Chaos waits for no one… SPIN!",
      "problems": [
        {
          "t": "Mispronounced Name",
          "d": "Everyone mispronounces your name no matter how slowly or clearly you spell it out."
        },
        {
          "t": "17 Minutes Late",
          "d": "You are precisely 17 minutes late to every single critical meeting, exam, or deadline in your life."
        },
        {
          "t": "Ghosted Code Reviews",
          "d": "Your best friend keeps ghosting your messages right when you need an urgent code review."
        },
        {
          "t": "Alternate Tuesday Powers",
          "d": "Your special powers and talents only function between 3:15 AM and 4:00 AM on alternating Tuesdays."
        },
        {
          "t": "Midnight Memory Wipe",
          "d": "You forget everything that happened over the past 24 hours every midnight on the dot."
        },
        {
          "t": "Famous But Ignored",
          "d": "You are world-famous across social media, but absolutely nobody takes your warnings seriously."
        },
        {
          "t": "Endless Stand-Up Calls",
          "d": "You are trapped in an inescapable calendar loop of back-to-back 30-minute corporate stand-up calls."
        },
        {
          "t": "Midnight Bagpipe Roommate",
          "d": "Your haunted headquarters has a very noisy ghost roommate who practices bagpipes at midnight."
        },
        {
          "t": "Dollar Menu Declines",
          "d": "You are perpetually broke; your credit card declines even on the dollar value menu."
        },
        {
          "t": "Misplaced Keys & Badges",
          "d": "You keep misplacing your keys, wallet, or phone badge every time you leave a room."
        },
        {
          "t": "Squeaky Glowing Truth",
          "d": "You are physically incapable of telling a lie; your face glows red and your voice squeaks."
        },
        {
          "t": "Porch Megaphone Fans",
          "d": "Your loyal fans have become overwhelming and camp on your front porch with megaphones."
        },
        {
          "t": "Tripping Nemesis Victories",
          "d": "Your sworn enemy keeps defeating you purely by tripping over things and winning by accident."
        },
        {
          "t": "Kryptonite Weakness Allergy",
          "d": "You are violently allergic to the exact substance, gadget, or element that gives you strength."
        },
        {
          "t": "Family Coding Calls",
          "d": "Your extended family calls your phone in a group call every time you start writing code."
        },
        {
          "t": "Non-Smartphone Timeline",
          "d": "You are permanently stuck in the wrong chronological timeline where smartphones don't exist."
        },
        {
          "t": "Clumsy Villain Intern",
          "d": "Nobody believes you are the hero; everyone assumes you are the villain's clumsy intern."
        },
        {
          "t": "8 Hours Dial-Up Sleep",
          "d": "You cannot fall asleep without listening to 8 continuous hours of dial-up modem tones."
        },
        {
          "t": "Bathroom Physical Queue",
          "d": "You must wait in an agonizing physical queue for every single service, including your own bathroom."
        },
        {
          "t": "Clingy Sidekick Validation",
          "d": "Your trusty sidekick is aggressively clingy and demands 24/7 validation on their outfit choices."
        },
        {
          "t": "Convenience Store Paparazzi",
          "d": "Paparazzi follow you into convenience stores and livestream your snack purchases."
        },
        {
          "t": "Zero-Bar Lair Packet Loss",
          "d": "Your secret underground lair has dial-up speeds, packet loss, and zero Wi-Fi bars."
        }
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
