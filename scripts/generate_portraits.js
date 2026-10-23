const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'assets', 'characters');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const characters = [
  {
    id: 'voldemort',
    name: 'LORD VOLDEMORT',
    title: 'He Who Must Not Be Named',
    c1: '#072b18', c2: '#010c06', glow: '#2dc653',
    features: `
      <!-- Wand and serpent energy -->
      <path d="M 230 380 L 195 240 L 190 242 L 225 380 Z" fill="#8892b0" opacity="0.8"/>
      <circle cx="192" cy="238" r="8" fill="#2dc653" filter="url(#glow)"/>
      <path d="M 192 238 Q 160 210 170 180 T 150 140" stroke="#2dc653" stroke-width="3" fill="none" opacity="0.6" filter="url(#glow)"/>
      <!-- Body & Robes -->
      <path d="M 80 400 L 110 260 L 160 230 L 210 260 L 240 400 Z" fill="#0d1f16" stroke="#1b4332" stroke-width="2"/>
      <path d="M 125 250 L 160 300 L 195 250 L 160 235 Z" fill="#06120b"/>
      <!-- Voldemort Head (Pale, bald, gaunt) -->
      <path d="M 120 180 C 115 110 130 90 160 90 C 190 90 205 110 200 180 C 195 220 180 235 160 235 C 140 235 125 220 120 180 Z" fill="#d8e2dc"/>
      <!-- Sunken cheek contours -->
      <path d="M 130 170 Q 145 190 140 210" stroke="#9ba09d" stroke-width="2" fill="none" opacity="0.6"/>
      <path d="M 190 170 Q 175 190 180 210" stroke="#9ba09d" stroke-width="2" fill="none" opacity="0.6"/>
      <!-- Piercing Red Eyes -->
      <ellipse cx="143" cy="155" rx="8" ry="4" fill="#0d0d0d"/>
      <circle cx="143" cy="155" r="3" fill="#e63946" filter="url(#glow)"/>
      <ellipse cx="177" cy="155" rx="8" ry="4" fill="#0d0d0d"/>
      <circle cx="177" cy="155" r="3" fill="#e63946" filter="url(#glow)"/>
      <!-- Serpentine Slit Nostrils -->
      <line x1="156" y1="178" x2="153" y2="186" stroke="#4a5568" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="164" y1="178" x2="167" y2="186" stroke="#4a5568" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Cruel Slit Mouth -->
      <path d="M 148 206 Q 160 210 172 206" stroke="#4a5568" stroke-width="2.5" fill="none"/>
      <!-- Dark Mark Serpent Motif in Background -->
      <path d="M 50 120 Q 80 80 120 110 T 160 70" stroke="#2dc653" stroke-width="1.5" fill="none" opacity="0.25" stroke-dasharray="4,4"/>
    `
  },
  {
    id: 'joker',
    name: 'THE JOKER',
    title: 'Clown Prince of Crime',
    c1: '#3c096c', c2: '#0b0014', glow: '#70e000',
    features: `
      <!-- Purple Suit Coat & Orange Vest -->
      <path d="M 70 400 L 100 270 L 160 240 L 220 270 L 250 400 Z" fill="#240046" stroke="#5a189a" stroke-width="2"/>
      <path d="M 120 270 L 160 330 L 200 270 L 160 245 Z" fill="#ff6b35"/>
      <path d="M 140 260 L 160 300 L 180 260 Z" fill="#007200"/>
      <!-- White Chalk Face -->
      <path d="M 122 170 C 118 115 130 95 160 95 C 190 95 202 115 198 170 C 195 215 178 238 160 238 C 142 238 125 215 122 170 Z" fill="#f8f9fa"/>
      <!-- Wild Messy Green Hair -->
      <path d="M 112 140 C 105 100 120 65 160 65 C 200 65 215 100 208 140 C 215 110 225 80 195 60 C 165 40 130 55 110 80 C 100 95 105 125 112 140 Z" fill="#38b000" filter="url(#glow)"/>
      <path d="M 115 110 Q 130 85 160 85 Q 190 85 205 110" fill="#007200"/>
      <!-- Manic Eyes with Blue Triangles -->
      <polygon points="144,138 138,150 150,150" fill="#0077b6"/>
      <polygon points="144,166 138,154 150,154" fill="#0077b6"/>
      <circle cx="144" cy="152" r="3.5" fill="#111"/>
      <polygon points="176,138 170,150 182,150" fill="#0077b6"/>
      <polygon points="176,166 170,154 182,154" fill="#0077b6"/>
      <circle cx="176" cy="152" r="3.5" fill="#111"/>
      <!-- Red Clown Nose -->
      <circle cx="160" cy="172" r="6" fill="#d90429"/>
      <!-- Glasgow Smear Smile (Blood Red) -->
      <path d="M 126 188 Q 160 240 194 188 Q 160 215 126 188 Z" fill="#d90429" filter="url(#glow)"/>
      <path d="M 136 198 Q 160 218 184 198" stroke="#ffffff" stroke-width="3" fill="none"/>
      <!-- Playing Card Accents -->
      <rect x="235" y="270" width="35" height="50" rx="3" fill="#fff" stroke="#d90429" stroke-width="1.5" transform="rotate(15, 235, 270)"/>
      <text x="246" y="300" font-size="20" fill="#d90429" transform="rotate(15, 235, 270)">🃏</text>
    `
  },
  {
    id: 'dracula',
    name: 'COUNT DRACULA',
    title: 'Sovereign of the Nosferatu',
    c1: '#4a0404', c2: '#0d0000', glow: '#e63946',
    features: `
      <!-- High Winged Gothic Vampire Collar -->
      <path d="M 85 260 L 95 120 L 135 190 L 185 190 L 225 120 L 235 260 Z" fill="#9e0012" stroke="#e63946" stroke-width="1.5"/>
      <!-- Black Silk Cape with Red Satin Lining -->
      <path d="M 70 400 L 90 250 L 160 220 L 230 250 L 250 400 Z" fill="#0d0d0d"/>
      <path d="M 130 240 L 160 280 L 190 240 L 160 225 Z" fill="#ffffff"/>
      <!-- Medallion on Red Ribbon -->
      <path d="M 148 245 L 160 265 L 172 245" stroke="#9e0012" stroke-width="3" fill="none"/>
      <circle cx="160" cy="268" r="7" fill="#ffd166" stroke="#9e0012" stroke-width="1"/>
      <!-- Aristocratic Gaunt Face -->
      <path d="M 126 175 C 122 120 134 98 160 98 C 186 98 198 120 194 175 C 190 215 176 235 160 235 C 144 235 130 215 126 175 Z" fill="#eae2b7"/>
      <!-- Slicked-back Widow's Peak Hair -->
      <path d="M 124 140 C 118 100 130 70 160 70 C 190 70 202 100 196 140 C 185 110 175 105 160 120 C 145 105 135 110 124 140 Z" fill="#111111"/>
      <!-- Hypnotic Crimson Eyes -->
      <ellipse cx="145" cy="155" rx="7" ry="4" fill="#3a0105"/>
      <circle cx="145" cy="155" r="3.2" fill="#ff002b" filter="url(#glow)"/>
      <ellipse cx="175" cy="155" rx="7" ry="4" fill="#3a0105"/>
      <circle cx="175" cy="155" r="3.2" fill="#ff002b" filter="url(#glow)"/>
      <!-- Pointed Ears -->
      <path d="M 123 150 L 110 142 L 124 162 Z" fill="#eae2b7"/>
      <path d="M 197 150 L 210 142 L 196 162 Z" fill="#eae2b7"/>
      <!-- Fangs and Blood Drip -->
      <path d="M 148 202 Q 160 206 172 202" stroke="#540b0e" stroke-width="2" fill="none"/>
      <polygon points="151,202 153,212 155,202" fill="#ffffff"/>
      <polygon points="165,202 167,212 169,202" fill="#ffffff"/>
      <circle cx="153" cy="214" r="1.5" fill="#e63946"/>
      <!-- Flapping Bat Silhouettes in Background -->
      <path d="M 50 80 Q 60 70 70 80 Q 75 65 80 80 Q 70 90 50 80 Z" fill="#ff002b" opacity="0.3"/>
      <path d="M 230 90 Q 240 80 250 90 Q 255 75 260 90 Q 250 100 230 90 Z" fill="#ff002b" opacity="0.3"/>
    `
  },
  {
    id: 'vecna',
    name: 'VECNA',
    title: 'Curse of the Upside Down',
    c1: '#3d0c26', c2: '#0b0108', glow: '#f72585',
    features: `
      <!-- Upside Down Organic Tendrils & Veins -->
      <path d="M 60 400 Q 100 300 130 270 Q 90 230 70 180" stroke="#7209b7" stroke-width="6" fill="none" opacity="0.8"/>
      <path d="M 260 400 Q 220 300 190 270 Q 230 230 250 180" stroke="#7209b7" stroke-width="6" fill="none" opacity="0.8"/>
      <!-- Muscular Desiccated Torso -->
      <path d="M 85 400 L 105 270 L 160 240 L 215 270 L 235 400 Z" fill="#2d132c" stroke="#5c1d4a" stroke-width="2"/>
      <!-- Tendrils wrapped around body -->
      <path d="M 100 320 Q 160 300 220 340" stroke="#f72585" stroke-width="3" fill="none" opacity="0.7"/>
      <path d="M 110 360 Q 160 340 210 380" stroke="#f72585" stroke-width="3" fill="none" opacity="0.7"/>
      <!-- Vine-Strangled Skull Head -->
      <path d="M 124 175 C 118 115 130 92 160 92 C 190 92 202 115 196 175 C 192 215 178 238 160 238 C 142 238 128 215 124 175 Z" fill="#523a4e"/>
      <!-- Skinless Tendril Textures on Face -->
      <path d="M 128 115 Q 160 140 150 220" stroke="#800f2f" stroke-width="3" fill="none"/>
      <path d="M 192 115 Q 160 140 170 220" stroke="#800f2f" stroke-width="3" fill="none"/>
      <!-- Hollow Glowing Red Eyes -->
      <ellipse cx="143" cy="154" rx="8" ry="5" fill="#1a040d"/>
      <circle cx="143" cy="154" r="3" fill="#f72585" filter="url(#glow)"/>
      <ellipse cx="177" cy="154" rx="8" ry="5" fill="#1a040d"/>
      <circle cx="177" cy="154" r="3" fill="#f72585" filter="url(#glow)"/>
      <!-- Flat Skeletal Nose Cavity -->
      <polygon points="160,172 156,183 164,183" fill="#1a040d"/>
      <!-- Grandfather Clock Motif in Background -->
      <rect x="235" y="60" width="30" height="70" rx="3" fill="#1a040d" stroke="#f72585" stroke-width="1.5" opacity="0.4"/>
      <circle cx="250" cy="80" r="10" fill="none" stroke="#f72585" stroke-width="1.5" opacity="0.6"/>
      <line x1="250" y1="80" x2="250" y2="74" stroke="#f72585" stroke-width="1.5" opacity="0.7"/>
      <line x1="250" y1="80" x2="255" y2="80" stroke="#f72585" stroke-width="1.5" opacity="0.7"/>
    `
  },
  {
    id: 'stree',
    name: 'STREE',
    title: 'The Legend of Chanderi',
    c1: '#470007', c2: '#0d0002', glow: '#ff0033',
    features: `
      <!-- Crimson Wedding Dupatta / Flowing Veil -->
      <path d="M 70 400 C 60 250 80 130 130 90 C 160 70 190 85 210 110 C 240 150 255 250 250 400 Z" fill="#9b0012" stroke="#ff0033" stroke-width="1.5"/>
      <path d="M 85 400 C 95 280 110 180 140 140 C 160 120 180 130 195 150 C 215 190 230 290 235 400 Z" fill="#6a040f"/>
      <!-- Golden Zari Border Details -->
      <path d="M 90 150 Q 130 100 160 100 Q 190 100 225 150" stroke="#ffb703" stroke-width="2.5" fill="none" stroke-dasharray="5,3"/>
      <!-- Shadowy Silhouetted Female Face -->
      <path d="M 132 170 C 130 130 140 110 160 110 C 180 110 190 130 188 170 C 186 205 176 225 160 225 C 144 225 134 205 132 170 Z" fill="#1f0205"/>
      <!-- Eerie Piercing White Eyes -->
      <ellipse cx="148" cy="160" rx="6" ry="3.5" fill="#fff" filter="url(#glow)"/>
      <circle cx="148" cy="160" r="1.5" fill="#000"/>
      <ellipse cx="172" cy="160" rx="6" ry="3.5" fill="#fff" filter="url(#glow)"/>
      <circle cx="172" cy="160" r="1.5" fill="#000"/>
      <!-- Traditional Nose Ring (Nath) -->
      <circle cx="152" cy="180" r="4.5" fill="none" stroke="#ffb703" stroke-width="1.5"/>
      <path d="M 152 180 Q 140 178 135 170" stroke="#ffb703" stroke-width="1" fill="none"/>
      <!-- Long Braided Hair Floating Down -->
      <path d="M 185 170 Q 210 240 195 350" stroke="#000000" stroke-width="9" fill="none" stroke-linecap="round"/>
      <!-- Red Lantern in Foreground -->
      <path d="M 60 260 L 80 260 L 85 300 L 55 300 Z" fill="#ff0033" opacity="0.85" filter="url(#glow)"/>
      <rect x="62" y="250" width="16" height="10" fill="#ffb703"/>
      <path d="M 70 250 L 70 230" stroke="#ffb703" stroke-width="2"/>
      <!-- 'O Stree Kal Aana' Wall Script Motif in Background -->
      <text x="45" y="80" font-family="'Rye', serif" font-size="13" fill="#ff0033" opacity="0.4" transform="rotate(-10, 45, 80)">ओ स्त्री कल आना</text>
    `
  },
  {
    id: 'wednesday',
    name: 'WEDNESDAY ADDAMS',
    title: 'Outcast Prodigy of Nevermore',
    c1: '#1b1d28', c2: '#07080d', glow: '#8d99ae',
    features: `
      <!-- Black Nevermore Blazer with Striped Trims -->
      <path d="M 75 400 L 105 270 L 160 240 L 215 270 L 245 400 Z" fill="#12131a" stroke="#2b2d42" stroke-width="2"/>
      <path d="M 105 270 L 160 350 L 215 270" fill="#0a0a0f"/>
      <!-- Sharp White Pointed Peter Pan Collar -->
      <polygon points="160,245 125,230 140,270 160,255" fill="#edf2f4" stroke="#2b2d42" stroke-width="1.5"/>
      <polygon points="160,245 195,230 180,270 160,255" fill="#edf2f4" stroke="#2b2d42" stroke-width="1.5"/>
      <polygon points="156,255 164,255 160,290" fill="#12131a"/>
      <!-- Pale Cold Symmetrical Face -->
      <path d="M 128 170 C 124 125 135 105 160 105 C 185 105 196 125 192 170 C 189 210 178 230 160 230 C 142 230 131 210 128 170 Z" fill="#e0e1dd"/>
      <!-- Center-Parted Black Hair & Twin Braids -->
      <path d="M 115 130 C 115 90 130 65 160 65 C 190 65 205 90 205 130 C 195 100 175 95 160 115 C 145 95 125 100 115 130 Z" fill="#0d0d11"/>
      <!-- Left Braid -->
      <path d="M 118 170 Q 100 240 110 330" stroke="#0d0d11" stroke-width="10" fill="none" stroke-linecap="round"/>
      <circle cx="110" cy="330" r="4" fill="#2b2d42"/>
      <!-- Right Braid -->
      <path d="M 202 170 Q 220 240 210 330" stroke="#0d0d11" stroke-width="10" fill="none" stroke-linecap="round"/>
      <circle cx="210" cy="330" r="4" fill="#2b2d42"/>
      <!-- Cold Unblinking Dark Eyes & Straight Eyebrows -->
      <line x1="135" y1="145" x2="152" y2="147" stroke="#0d0d11" stroke-width="3" stroke-linecap="round"/>
      <circle cx="144" cy="157" r="4.5" fill="#1b1d28"/>
      <circle cx="143" cy="156" r="1.5" fill="#edf2f4"/>
      <line x1="185" y1="145" x2="168" y2="147" stroke="#0d0d11" stroke-width="3" stroke-linecap="round"/>
      <circle cx="176" cy="157" r="4.5" fill="#1b1d28"/>
      <circle cx="175" cy="156" r="1.5" fill="#edf2f4"/>
      <!-- Deadpan Unimpressed Mouth -->
      <line x1="150" y1="205" x2="170" y2="205" stroke="#415a77" stroke-width="2.2" stroke-linecap="round"/>
      <!-- "Thing" (The Disembodied Hand) on Shoulder -->
      <path d="M 220 270 Q 235 255 240 245 Q 245 255 235 275" stroke="#e0e1dd" stroke-width="3" fill="#e0e1dd"/>
      <path d="M 228 250 L 232 258" stroke="#780000" stroke-width="1"/>
    `
  },
  {
    id: 'pennywise',
    name: 'PENNYWISE',
    title: 'The Dancing Clown of Derry',
    c1: '#4a080d', c2: '#0e0103', glow: '#e63946',
    features: `
      <!-- Victorian Frilled Ruffled Collar -->
      <path d="M 75 400 L 95 280 L 160 250 L 225 280 L 245 400 Z" fill="#9e9e9e" stroke="#e0e0e0" stroke-width="1.5"/>
      <circle cx="120" cy="270" r="18" fill="#d6ccc2" stroke="#b7b7a4" stroke-width="1.5"/>
      <circle cx="160" cy="265" r="20" fill="#ede0d4" stroke="#b7b7a4" stroke-width="1.5"/>
      <circle cx="200" cy="270" r="18" fill="#d6ccc2" stroke="#b7b7a4" stroke-width="1.5"/>
      <circle cx="160" cy="320" r="9" fill="#ba181b"/>
      <!-- Giant Bulbous Forehead Face (Cracked White Makeup) -->
      <path d="M 115 160 C 105 95 125 65 160 65 C 195 65 215 95 205 160 C 200 205 185 230 160 230 C 135 230 120 205 115 160 Z" fill="#f8f9fa"/>
      <!-- Wild Flared Orange/Copper Clown Tufts -->
      <path d="M 110 130 C 85 90 90 140 80 180 C 100 175 105 155 110 130 Z" fill="#d9480f" filter="url(#glow)"/>
      <path d="M 210 130 C 235 90 230 140 240 180 C 220 175 215 155 210 130 Z" fill="#d9480f" filter="url(#glow)"/>
      <!-- Sinister Yellow Deadlight Eyes -->
      <ellipse cx="142" cy="150" rx="7" ry="4" fill="#1b1b1b"/>
      <circle cx="142" cy="150" r="3.5" fill="#ffb703" filter="url(#glow)"/>
      <ellipse cx="178" cy="150" rx="7" ry="4" fill="#1b1b1b"/>
      <circle cx="178" cy="150" r="3.5" fill="#ffb703" filter="url(#glow)"/>
      <!-- Iconic Red Smile Lines bisecting eyes -->
      <path d="M 142 125 Q 140 148 136 175 Q 145 198 160 202" stroke="#ba181b" stroke-width="3.5" fill="none"/>
      <path d="M 178 125 Q 180 148 184 175 Q 175 198 160 202" stroke="#ba181b" stroke-width="3.5" fill="none"/>
      <!-- Bulbous Red Nose & Jagged Mouth -->
      <circle cx="160" cy="170" r="6.5" fill="#ba181b"/>
      <path d="M 130 190 Q 160 228 190 190 Q 160 210 130 190 Z" fill="#370617"/>
      <!-- Floating Red Balloon on the Side -->
      <ellipse cx="65" cy="110" rx="22" ry="28" fill="#e63946" filter="url(#glow)"/>
      <polygon points="63,138 67,138 65,143" fill="#ba181b"/>
      <path d="M 65 143 Q 75 170 65 210 T 70 270" stroke="#ced4da" stroke-width="1.2" fill="none"/>
    `
  },
  {
    id: 'valak',
    name: 'VALAK',
    title: 'The Defiler (The Nun)',
    c1: '#262010', c2: '#080703', glow: '#d4af37',
    features: `
      <!-- Black Nun Wimple and Habit -->
      <path d="M 60 400 L 90 260 L 160 220 L 230 260 L 260 400 Z" fill="#080808" stroke="#1f1f1f" stroke-width="2"/>
      <!-- White Starched Cowl Frame -->
      <path d="M 100 240 C 95 140 110 80 160 80 C 210 80 225 140 220 240 C 205 250 185 255 160 255 C 135 255 115 250 100 240 Z" fill="#e9ecef" stroke="#adb5bd" stroke-width="1.5"/>
      <!-- Inverted Hanging Silver Crucifix -->
      <rect x="157" y="270" width="6" height="35" fill="#ced4da" filter="url(#glow)"/>
      <rect x="148" y="290" width="24" height="6" fill="#ced4da" filter="url(#glow)"/>
      <!-- Corpse-Pale Demonic Face -->
      <path d="M 125 180 C 120 130 132 105 160 105 C 188 105 200 130 195 180 C 190 215 178 235 160 235 C 142 235 130 215 125 180 Z" fill="#dee2e6"/>
      <!-- Heavy Black Necrotic Eye Sockets -->
      <circle cx="144" cy="155" r="14" fill="#0b090a"/>
      <circle cx="144" cy="155" r="4" fill="#ffb703" filter="url(#glow)"/>
      <circle cx="144" cy="155" r="1.5" fill="#000"/>
      <circle cx="176" cy="155" r="14" fill="#0b090a"/>
      <circle cx="176" cy="155" r="4" fill="#ffb703" filter="url(#glow)"/>
      <circle cx="176" cy="155" r="1.5" fill="#000"/>
      <!-- Cracked Black Veins across Cheeks -->
      <path d="M 132 170 Q 140 190 135 210" stroke="#1b1b1b" stroke-width="1.5" fill="none"/>
      <path d="M 188 170 Q 180 190 185 210" stroke="#1b1b1b" stroke-width="1.5" fill="none"/>
      <!-- Sharp Needle-Teeth Maw -->
      <path d="M 144 200 Q 160 215 176 200 Q 160 225 144 200 Z" fill="#0b090a"/>
      <path d="M 148 206 L 150 212 L 152 206 L 154 212 L 156 206 L 158 212 L 160 206 L 162 212 L 164 206 L 166 212 L 168 206 L 170 212 L 172 206" stroke="#fff" stroke-width="1.2" fill="none"/>
    `
  },
  {
    id: 'maleficent',
    name: 'MALEFICENT',
    title: 'Mistress of All Evil',
    c1: '#2b0938', c2: '#09010d', glow: '#9d4edd',
    features: `
      <!-- Sweeping Horned Headdress -->
      <path d="M 135 110 C 115 50 60 40 40 10 C 70 30 110 50 140 95 Z" fill="#10002b" stroke="#7b2cbf" stroke-width="1.5"/>
      <path d="M 185 110 C 205 50 260 40 280 10 C 250 30 210 50 180 95 Z" fill="#10002b" stroke="#7b2cbf" stroke-width="1.5"/>
      <!-- High Winged Black Collar -->
      <path d="M 80 400 L 100 250 L 160 220 L 220 250 L 240 400 Z" fill="#10002b" stroke="#3c096c" stroke-width="2"/>
      <path d="M 85 240 L 95 150 L 130 210 Z" fill="#240046"/>
      <path d="M 235 240 L 225 150 L 190 210 Z" fill="#240046"/>
      <!-- Chiseled Alabaster Face & High Cheekbones -->
      <path d="M 130 170 C 126 125 136 100 160 100 C 184 100 194 125 190 170 C 187 210 176 230 160 230 C 144 230 133 210 130 170 Z" fill="#d8f3dc"/>
      <!-- Angular Razor Cheekbones -->
      <line x1="130" y1="170" x2="148" y2="185" stroke="#95d5b2" stroke-width="2"/>
      <line x1="190" y1="170" x2="172" y2="185" stroke="#95d5b2" stroke-width="2"/>
      <!-- Piercing Bright Green Sorceress Eyes -->
      <ellipse cx="145" cy="150" rx="7" ry="4" fill="#081c15"/>
      <circle cx="145" cy="150" r="3.5" fill="#70e000" filter="url(#glow)"/>
      <ellipse cx="175" cy="150" rx="7" ry="4" fill="#081c15"/>
      <circle cx="175" cy="150" r="3.5" fill="#70e000" filter="url(#glow)"/>
      <!-- Dark Blood Lip Arch -->
      <path d="M 148 200 Q 160 195 172 200 Q 160 212 148 200 Z" fill="#9d0208"/>
      <!-- Green Flame Staff in Hand -->
      <rect x="55" y="160" width="6" height="240" fill="#240046"/>
      <circle cx="58" cy="155" r="14" fill="#70e000" opacity="0.8" filter="url(#glow)"/>
      <circle cx="58" cy="155" r="7" fill="#ffff3f"/>
    `
  },
  {
    id: 'annabelle',
    name: 'ANNABELLE',
    title: 'The Cursed Conduit',
    c1: '#3d081b', c2: '#0e0105', glow: '#ff4d6d',
    features: `
      <!-- White Silk Doll Dress with Red Sash -->
      <path d="M 80 400 L 105 280 L 160 250 L 215 280 L 240 400 Z" fill="#f8f9fa" stroke="#e9ecef" stroke-width="2"/>
      <rect x="110" y="315" width="100" height="18" fill="#c9184a"/>
      <circle cx="160" cy="324" r="8" fill="#800f2f"/>
      <!-- Porcelain Doll Face with Craquelure Cracks -->
      <circle cx="160" cy="165" r="48" fill="#fff0f3" stroke="#ffccd5" stroke-width="1.5"/>
      <path d="M 175 130 L 185 145 L 180 160 L 195 175" stroke="#590d22" stroke-width="1.5" fill="none"/>
      <!-- Rosy Doll Cheeks -->
      <circle cx="132" cy="180" r="9" fill="#ff758f" opacity="0.6"/>
      <circle cx="188" cy="180" r="9" fill="#ff758f" opacity="0.6"/>
      <!-- Twin Braided Brunette Pigtails & Red Ribbons -->
      <path d="M 115 160 Q 95 120 120 110 Q 160 115 200 110 Q 225 120 205 160" fill="#3d2618"/>
      <path d="M 115 160 Q 90 220 100 280" stroke="#3d2618" stroke-width="10" fill="none" stroke-linecap="round"/>
      <circle cx="100" cy="240" r="6" fill="#c9184a"/>
      <path d="M 205 160 Q 230 220 220 280" stroke="#3d2618" stroke-width="10" fill="none" stroke-linecap="round"/>
      <circle cx="220" cy="240" r="6" fill="#c9184a"/>
      <!-- Wide Unblinking Glass Eyes -->
      <circle cx="142" cy="155" r="10" fill="#fff" stroke="#590d22" stroke-width="1"/>
      <circle cx="142" cy="155" r="6" fill="#0077b6"/>
      <circle cx="142" cy="155" r="2.5" fill="#000"/>
      <circle cx="140" cy="153" r="1.5" fill="#fff"/>
      <circle cx="178" cy="155" r="10" fill="#fff" stroke="#590d22" stroke-width="1"/>
      <circle cx="178" cy="155" r="6" fill="#0077b6"/>
      <circle cx="178" cy="155" r="2.5" fill="#000"/>
      <circle cx="176" cy="153" r="1.5" fill="#fff"/>
      <!-- Eerie Painted Red Doll Smirk -->
      <path d="M 146 195 Q 160 208 174 195" stroke="#c9184a" stroke-width="3" fill="none" stroke-linecap="round"/>
      <!-- Warrens' Warning Sign Motif -->
      <rect x="220" y="70" width="60" height="40" rx="3" fill="#ffe3e0" stroke="#c9184a" stroke-width="1.5"/>
      <text x="226" y="86" font-size="8" font-weight="bold" fill="#800f2f">WARNING</text>
      <text x="225" y="98" font-size="6" fill="#590d22">POSITIVELY</text>
      <text x="225" y="106" font-size="6" fill="#590d22">DO NOT OPEN</text>
    `
  },
  {
    id: 'manjulika',
    name: 'MANJULIKA',
    title: 'The Dancer of the Haveli',
    c1: '#4a031e', c2: '#0e0005', glow: '#ff0a54',
    features: `
      <!-- Royal Haveli Kathak Ghagra & Choli -->
      <path d="M 70 400 L 100 270 L 160 230 L 220 270 L 250 400 Z" fill="#590d22" stroke="#ff0a54" stroke-width="1.5"/>
      <!-- Royal Gold Choker Necklace & Pearls -->
      <path d="M 140 235 Q 160 250 180 235" stroke="#ffb703" stroke-width="4" fill="none"/>
      <path d="M 132 245 Q 160 265 188 245" stroke="#ffb703" stroke-width="2.5" fill="none"/>
      <!-- Wild Untamed Flowing Black Locks -->
      <path d="M 90 280 C 70 180 90 90 160 80 C 230 90 250 180 230 280 C 210 240 215 150 195 130 C 175 110 145 110 125 130 C 105 150 110 240 90 280 Z" fill="#0d0d0d"/>
      <!-- Traditional Royal Indian Princess Face -->
      <path d="M 130 170 C 126 130 136 110 160 110 C 184 110 194 130 190 170 C 187 205 176 225 160 225 C 144 225 133 205 130 170 Z" fill="#eddcd2"/>
      <!-- Red Chandan & Kumkum Bindi -->
      <circle cx="160" cy="138" r="4.5" fill="#ba181b" filter="url(#glow)"/>
      <circle cx="160" cy="138" r="1.5" fill="#ffb703"/>
      <!-- Dramatic Kohl-Rimmed Manic Eyes -->
      <path d="M 134 152 Q 146 144 154 154 Q 146 162 134 152 Z" fill="#0d0d0d"/>
      <circle cx="145" cy="153" r="3" fill="#ff0a54" filter="url(#glow)"/>
      <path d="M 186 152 Q 174 144 166 154 Q 174 162 186 152 Z" fill="#0d0d0d"/>
      <circle cx="175" cy="153" r="3" fill="#ff0a54" filter="url(#glow)"/>
      <!-- Alta-Stained Dancing Hand with Ghungroos -->
      <path d="M 60 270 Q 75 240 90 250 Q 85 275 65 290 Z" fill="#eddcd2" stroke="#ba181b" stroke-width="2"/>
      <circle cx="78" cy="256" r="6" fill="#ba181b"/>
      <!-- Golden Ghungroo Bells -->
      <circle cx="85" cy="285" r="4" fill="#ffb703"/>
      <circle cx="95" cy="283" r="4" fill="#ffb703"/>
      <circle cx="105" cy="285" r="4" fill="#ffb703"/>
    `
  },
  {
    id: 'ghostface',
    name: 'GHOSTFACE',
    title: 'The Woodsboro Slasher',
    c1: '#1f2026', c2: '#06070a', glow: '#e0e1dd',
    features: `
      <!-- Black Grim Hood and Shroud -->
      <path d="M 70 400 L 95 240 C 90 120 115 70 160 70 C 205 70 230 120 225 240 L 250 400 Z" fill="#0a0a0d" stroke="#2b2d42" stroke-width="2"/>
      <!-- The Iconic Screaming White Rubber Mask -->
      <path d="M 125 140 C 120 95 135 90 160 90 C 185 90 200 95 195 140 C 190 190 178 245 160 245 C 142 245 130 190 125 140 Z" fill="#f8f9fa" stroke="#ced4da" stroke-width="1.5"/>
      <!-- Drooping Hollow Black Eye Cavities -->
      <path d="M 136 135 C 130 145 134 165 142 165 C 150 165 152 145 146 135 C 142 130 138 130 136 135 Z" fill="#0d0d11"/>
      <path d="M 184 135 C 190 145 186 165 178 165 C 170 165 168 145 174 135 C 178 130 182 130 184 135 Z" fill="#0d0d11"/>
      <!-- Triangle Nose Cavity -->
      <polygon points="160,170 155,185 165,185" fill="#0d0d11"/>
      <!-- Elongated Screaming Gaping Mouth -->
      <ellipse cx="160" cy="215" rx="10" ry="22" fill="#0d0d11"/>
      <!-- Buck 119 Slasher Knife with Chrome Sheen -->
      <polygon points="230,360 238,230 246,240 244,360" fill="#e0e1dd" filter="url(#glow)"/>
      <rect x="233" y="355" width="12" height="40" fill="#1b1b1e"/>
      <path d="M 238 230 L 240 250" stroke="#ba181b" stroke-width="2"/>
      <!-- 90s Corded Telephone in Background -->
      <path d="M 50 160 Q 60 140 80 150 L 75 185 Q 55 175 50 160 Z" fill="#ced4da" opacity="0.4"/>
      <path d="M 65 185 Q 50 220 70 250" stroke="#ced4da" stroke-width="2" fill="none" opacity="0.4"/>
    `
  },
  {
    id: 'freddy',
    name: 'FREDDY KRUEGER',
    title: 'Springwood Dream Demon',
    c1: '#3d0a0a', c2: '#0d0101', glow: '#e63946',
    features: `
      <!-- Red and Olive Striped Knit Sweater -->
      <path d="M 75 400 L 105 270 L 160 240 L 215 270 L 245 400 Z" fill="#1b4332"/>
      <path d="M 85 300 L 235 300 L 238 325 L 82 325 Z" fill="#9e0012"/>
      <path d="M 78 350 L 242 350 L 245 375 L 75 375 Z" fill="#9e0012"/>
      <!-- Brown Fedora Hat -->
      <ellipse cx="160" cy="115" rx="55" ry="14" fill="#3d2618" stroke="#1f130b" stroke-width="2"/>
      <path d="M 130 115 C 130 75 145 68 160 68 C 175 68 190 75 190 115 Z" fill="#543724"/>
      <rect x="131" y="108" width="58" height="6" fill="#1f130b"/>
      <!-- Severely Burned Scarred Flesh -->
      <path d="M 132 170 C 128 135 138 115 160 115 C 182 115 192 135 188 170 C 185 205 176 228 160 228 C 144 228 135 205 132 170 Z" fill="#9d432b"/>
      <!-- Burn Cicatrix Patterns -->
      <path d="M 138 140 Q 155 160 148 185" stroke="#540b0e" stroke-width="2.5" fill="none"/>
      <path d="M 182 140 Q 165 160 172 185" stroke="#540b0e" stroke-width="2.5" fill="none"/>
      <!-- Malevolent Grinning Eyes -->
      <circle cx="146" cy="152" r="3.5" fill="#ffb703" filter="url(#glow)"/>
      <circle cx="174" cy="152" r="3.5" fill="#ffb703" filter="url(#glow)"/>
      <!-- Sneering Rotting Teeth -->
      <path d="M 148 198 Q 160 210 172 198" stroke="#370617" stroke-width="3" fill="none"/>
      <!-- The Razor-Claw Glove in Foreground -->
      <path d="M 65 340 L 95 300 L 115 320 L 85 360 Z" fill="#8f5b34" stroke="#4a2e1b" stroke-width="2"/>
      <!-- 4 Steel Blades Extending Out -->
      <line x1="90" y1="295" x2="80" y2="230" stroke="#ced4da" stroke-width="3" filter="url(#glow)"/>
      <line x1="98" y1="298" x2="95" y2="220" stroke="#ced4da" stroke-width="3" filter="url(#glow)"/>
      <line x1="106" y1="305" x2="110" y2="225" stroke="#ced4da" stroke-width="3" filter="url(#glow)"/>
      <line x1="114" y1="315" x2="125" y2="240" stroke="#ced4da" stroke-width="3" filter="url(#glow)"/>
    `
  },
  {
    id: 'frankenstein',
    name: 'FRANKENSTEIN',
    title: 'The Reanimated Prometheus',
    c1: '#0e271d', c2: '#020d08', glow: '#52b788',
    features: `
      <!-- Heavy Heavy-Set Ragged Black Coat -->
      <path d="M 65 400 L 95 260 L 160 230 L 225 260 L 255 400 Z" fill="#1b1e23" stroke="#2d3139" stroke-width="2"/>
      <!-- Square Flat-Topped Head -->
      <path d="M 125 100 L 195 100 L 195 190 C 190 225 178 238 160 238 C 142 238 130 225 125 190 Z" fill="#74a57f"/>
      <!-- Jagged Suture Scars Across Forehead -->
      <path d="M 130 115 Q 160 125 190 115" stroke="#2d3139" stroke-width="2.5" fill="none"/>
      <line x1="140" y1="110" x2="140" y2="122" stroke="#2d3139" stroke-width="2"/>
      <line x1="155" y1="113" x2="155" y2="125" stroke="#2d3139" stroke-width="2"/>
      <line x1="170" y1="113" x2="170" y2="125" stroke="#2d3139" stroke-width="2"/>
      <line x1="185" y1="110" x2="185" y2="122" stroke="#2d3139" stroke-width="2"/>
      <!-- Heavy Brow and Melancholy Eyes -->
      <rect x="130" y="138" width="60" height="8" rx="3" fill="#406343"/>
      <circle cx="145" cy="155" r="4" fill="#2d3139"/>
      <circle cx="175" cy="155" r="4" fill="#2d3139"/>
      <!-- Galvanic Neck Electrodes (Bolts) with Sparking Arcs -->
      <rect x="110" y="210" width="16" height="10" fill="#a4ac86" stroke="#414833" stroke-width="1.5"/>
      <rect x="194" y="210" width="16" height="10" fill="#a4ac86" stroke="#414833" stroke-width="1.5"/>
      <path d="M 105 215 L 95 210 L 100 225" stroke="#70e000" stroke-width="2" fill="none" filter="url(#glow)"/>
      <path d="M 215 215 L 225 210 L 220 225" stroke="#70e000" stroke-width="2" fill="none" filter="url(#glow)"/>
    `
  },
  {
    id: 'grim-reaper',
    name: 'THE GRIM REAPER',
    title: 'Harvester of Lost Souls',
    c1: '#0e141b', c2: '#020406', glow: '#00b4d8',
    features: `
      <!-- Voluminous Midnight Cowl and Cloak -->
      <path d="M 60 400 L 90 230 C 85 100 115 65 160 65 C 205 65 235 100 230 230 L 260 400 Z" fill="#080b0e" stroke="#161b22" stroke-width="2"/>
      <!-- Deep Pitch-Black Void Inside Hood -->
      <path d="M 120 160 C 115 105 130 90 160 90 C 190 90 205 105 200 160 C 195 215 180 230 160 230 C 140 230 125 215 120 160 Z" fill="#010203"/>
      <!-- Glowing Blue/Cyan Spectral Eye Orbs -->
      <circle cx="145" cy="155" r="4" fill="#00b4d8" filter="url(#glow)"/>
      <circle cx="175" cy="155" r="4" fill="#00b4d8" filter="url(#glow)"/>
      <!-- Weathered Bone Jaw Peeking from the Dark -->
      <path d="M 150 195 L 170 195 L 165 215 L 155 215 Z" fill="#d8e2dc" opacity="0.6"/>
      <!-- The Massive Death Scythe -->
      <line x1="240" y1="390" x2="210" y2="70" stroke="#483c32" stroke-width="5"/>
      <path d="M 210 70 Q 240 30 290 50 Q 260 80 205 90 Z" fill="#e0e1dd" stroke="#90e0ef" stroke-width="2" filter="url(#glow)"/>
      <!-- Swirling Blue Souls in Background -->
      <circle cx="80" cy="110" r="5" fill="#90e0ef" opacity="0.5" filter="url(#glow)"/>
      <circle cx="65" cy="160" r="3" fill="#90e0ef" opacity="0.4" filter="url(#glow)"/>
    `
  },
  {
    id: 'medusa',
    name: 'MEDUSA',
    title: 'The Petrifying Gorgon',
    c1: '#072e1e', c2: '#010c07', glow: '#52b788',
    features: `
      <!-- Writhing Crown of Venomous Serpents -->
      <path d="M 120 120 Q 80 70 60 90 Q 75 110 100 120" stroke="#2d6a4f" stroke-width="6" fill="none"/>
      <circle cx="58" cy="88" r="4" fill="#52b788"/>
      <path d="M 130 100 Q 100 40 120 20 Q 140 40 135 80" stroke="#2d6a4f" stroke-width="6" fill="none"/>
      <circle cx="120" cy="18" r="4" fill="#52b788"/>
      <path d="M 160 90 Q 160 30 180 20 Q 190 40 170 80" stroke="#40916c" stroke-width="6" fill="none"/>
      <circle cx="180" cy="18" r="4" fill="#52b788"/>
      <path d="M 190 100 Q 220 40 240 50 Q 230 80 200 110" stroke="#2d6a4f" stroke-width="6" fill="none"/>
      <circle cx="242" cy="48" r="4" fill="#52b788"/>
      <path d="M 200 120 Q 240 70 260 90 Q 245 110 220 120" stroke="#40916c" stroke-width="6" fill="none"/>
      <circle cx="262" cy="88" r="4" fill="#52b788"/>
      <!-- Hellenic Robes & Snake Scales -->
      <path d="M 75 400 L 105 270 L 160 240 L 215 270 L 245 400 Z" fill="#1b4332" stroke="#2d6a4f" stroke-width="2"/>
      <!-- Classical Tragic Gorgon Face -->
      <path d="M 130 170 C 126 125 136 105 160 105 C 184 105 194 125 190 170 C 187 210 176 230 160 230 C 144 230 133 210 130 170 Z" fill="#d8f3dc"/>
      <!-- Petrifying Gold-Green Cat Eyes -->
      <ellipse cx="145" cy="152" rx="7" ry="5" fill="#081c15"/>
      <circle cx="145" cy="152" r="3.8" fill="#70e000" filter="url(#glow)"/>
      <line x1="145" y1="147" x2="145" y2="157" stroke="#000" stroke-width="2"/>
      <ellipse cx="175" cy="152" rx="7" ry="5" fill="#081c15"/>
      <circle cx="175" cy="152" r="3.8" fill="#70e000" filter="url(#glow)"/>
      <line x1="175" y1="147" x2="175" y2="157" stroke="#000" stroke-width="2"/>
    `
  },
  {
    id: 'sauron',
    name: 'SAURON',
    title: 'The Great Eye of Mordor',
    c1: '#3d1300', c2: '#0d0400', glow: '#ff5400',
    features: `
      <!-- Barad-dur Spire Silhouette & Iron Crown -->
      <path d="M 90 280 L 120 140 L 140 180 L 160 110 L 180 180 L 200 140 L 230 280 Z" fill="#1f0a00" stroke="#ff5400" stroke-width="1.5"/>
      <path d="M 70 400 L 95 270 L 160 240 L 225 270 L 250 400 Z" fill="#0a0300" stroke="#3d1300" stroke-width="2"/>
      <!-- The Massive Blazing Lidless Eye -->
      <path d="M 100 170 Q 160 100 220 170 Q 160 240 100 170 Z" fill="#ff5400" filter="url(#glow)"/>
      <path d="M 115 170 Q 160 120 205 170 Q 160 220 115 170 Z" fill="#ff9e00"/>
      <!-- Cat-Slit Black Fiery Pupil -->
      <ellipse cx="160" cy="170" rx="9" ry="34" fill="#000000"/>
      <!-- The One Ring in Foreground with Elvish Inscription Glow -->
      <circle cx="160" cy="330" r="28" fill="none" stroke="#ffb703" stroke-width="7" filter="url(#glow)"/>
      <circle cx="160" cy="330" r="24" fill="none" stroke="#ff5400" stroke-width="1" stroke-dasharray="3,3"/>
    `
  },
  {
    id: 'chucky',
    name: 'CHUCKY',
    title: 'The Possessed Killer Doll',
    c1: '#3a0808', c2: '#0d0101', glow: '#e63946',
    features: `
      <!-- Good Guy Denim Overalls & Rainbow Shirt -->
      <path d="M 80 400 L 105 280 L 160 260 L 215 280 L 240 400 Z" fill="#0077b6" stroke="#023e8a" stroke-width="2"/>
      <rect x="120" y="320" width="80" height="40" rx="3" fill="#0077b6" stroke="#03045e" stroke-width="1.5"/>
      <text x="132" y="345" font-size="11" font-weight="bold" fill="#d90429">Good Guys</text>
      <!-- Wild Messy Red Hair -->
      <path d="M 115 140 C 95 90 120 60 160 60 C 200 60 225 90 205 140 C 230 110 235 150 215 170 C 205 140 195 120 160 120 C 125 120 115 140 105 170 C 85 150 90 110 115 140 Z" fill="#d90429" filter="url(#glow)"/>
      <!-- Heavily Stitched Doll Face -->
      <circle cx="160" cy="165" r="46" fill="#fcd5ce"/>
      <path d="M 135 135 Q 155 170 145 205" stroke="#9d0208" stroke-width="2" fill="none"/>
      <!-- Metal Staples across Cuts -->
      <line x1="134" y1="145" x2="142" y2="145" stroke="#ced4da" stroke-width="2"/>
      <line x1="138" y1="165" x2="146" y2="165" stroke="#ced4da" stroke-width="2"/>
      <line x1="142" y1="185" x2="150" y2="185" stroke="#ced4da" stroke-width="2"/>
      <!-- Maniacal Blue Doll Eyes -->
      <circle cx="142" cy="155" r="7" fill="#0096c7"/>
      <circle cx="142" cy="155" r="3" fill="#000"/>
      <circle cx="178" cy="155" r="7" fill="#0096c7"/>
      <circle cx="178" cy="155" r="3" fill="#000"/>
      <!-- Wicked Kitchen Knife in Hand -->
      <polygon points="65,340 50,220 70,230 80,340" fill="#e0e1dd" filter="url(#glow)"/>
      <path d="M 50 220 L 55 240" stroke="#d90429" stroke-width="2"/>
    `
  },
  {
    id: 'headless-horseman',
    name: 'HEADLESS HORSEMAN',
    title: 'The Hessian of Sleepy Hollow',
    c1: '#3d1a00', c2: '#0e0500', glow: '#fb8500',
    features: `
      <!-- Military Hessian Coat and High Collar (No Head!) -->
      <path d="M 70 400 L 95 240 L 130 190 L 190 190 L 225 240 L 250 400 Z" fill="#140d07" stroke="#432818" stroke-width="2"/>
      <path d="M 130 190 Q 160 215 190 190" stroke="#9d0208" stroke-width="4" fill="none"/>
      <!-- Severed Neck Stump with Eerie Flame Glow -->
      <ellipse cx="160" cy="190" rx="26" ry="10" fill="#6a040f"/>
      <circle cx="160" cy="190" r="14" fill="#fb8500" opacity="0.8" filter="url(#glow)"/>
      <!-- Fiery Jack-o'-Lantern Held under the Arm -->
      <circle cx="95" cy="270" r="32" fill="#d9480f" stroke="#7f1d1d" stroke-width="2" filter="url(#glow)"/>
      <!-- Carved Pumpkin Face -->
      <polygon points="82,258 74,268 90,268" fill="#ffb703"/>
      <polygon points="108,258 100,268 116,268" fill="#ffb703"/>
      <polygon points="95,270 91,277 99,277" fill="#ffb703"/>
      <path d="M 76,285 L 82,280 L 88,285 L 94,280 L 100,285 L 106,280 L 112,285" stroke="#ffb703" stroke-width="3" fill="none"/>
      <!-- Heavy Cavalry Sword Raised on Other Side -->
      <line x1="225" y1="360" x2="255" y2="150" stroke="#ced4da" stroke-width="4" filter="url(#glow)"/>
    `
  },
  {
    id: 'wildcard',
    name: 'THE WILDCARD',
    title: 'The Nameless Shadow Void',
    c1: '#211833', c2: '#06040a', glow: '#b5179e',
    features: `
      <!-- Shrouded Enigmatic Silhouette -->
      <path d="M 70 400 L 100 240 C 95 110 120 70 160 70 C 200 70 225 110 220 240 L 250 400 Z" fill="#0d0914" stroke="#7209b7" stroke-width="2"/>
      <!-- Dark Glitching Void Face -->
      <path d="M 125 170 C 120 120 132 95 160 95 C 188 95 200 120 195 170 C 190 215 178 235 160 235 C 142 235 130 215 125 170 Z" fill="#050308"/>
      <!-- Floating Luminescent Question Glyph / Runic Mask -->
      <text x="140" y="180" font-family="'Rye', serif" font-size="56" fill="#f72585" filter="url(#glow)">?</text>
      <!-- Matrix Glitch Artifacts / Occult Scanlines -->
      <line x1="90" y1="140" x2="230" y2="140" stroke="#4cc9f0" stroke-width="1.5" stroke-dasharray="8,6" opacity="0.6"/>
      <line x1="110" y1="180" x2="210" y2="180" stroke="#4cc9f0" stroke-width="1.5" stroke-dasharray="14,4" opacity="0.6"/>
      <line x1="80" y1="220" x2="240" y2="220" stroke="#4cc9f0" stroke-width="1.5" stroke-dasharray="6,8" opacity="0.6"/>
    `
  }
];

characters.forEach(char => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 400" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="38%" r="65%">
      <stop offset="0%" stop-color="${char.c1}"/>
      <stop offset="70%" stop-color="${char.c2}"/>
      <stop offset="100%" stop-color="#020104"/>
    </radialGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${char.glow}" stop-opacity="0.8"/>
      <stop offset="50%" stop-color="#2a080c" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${char.glow}" stop-opacity="0.8"/>
    </linearGradient>
  </defs>

  <!-- Background Base -->
  <rect width="320" height="400" fill="url(#bgGrad)"/>

  <!-- Cyber-Occult Grid Pattern in Background -->
  <g stroke="${char.glow}" stroke-width="0.5" opacity="0.12">
    <line x1="0" y1="80" x2="320" y2="80"/>
    <line x1="0" y1="160" x2="320" y2="160"/>
    <line x1="0" y1="240" x2="320" y2="240"/>
    <line x1="0" y1="320" x2="320" y2="320"/>
    <line x1="80" y1="0" x2="80" y2="400"/>
    <line x1="160" y1="0" x2="160" y2="400"/>
    <line x1="240" y1="0" x2="240" y2="400"/>
  </g>

  <!-- Character Vector Features -->
  <g id="character-artwork">
    ${char.features}
  </g>

  <!-- Gothic Framing & Corner Brackets -->
  <rect x="10" y="10" width="300" height="380" rx="4" fill="none" stroke="url(#frameGrad)" stroke-width="2"/>
  <rect x="15" y="15" width="290" height="370" rx="2" fill="none" stroke="${char.glow}" stroke-width="0.8" opacity="0.4"/>

  <!-- Ornate Corner Accents -->
  <path d="M 10 35 L 35 10 M 10 22 L 22 10" stroke="${char.glow}" stroke-width="1.5"/>
  <path d="M 310 35 L 285 10 M 310 22 L 298 10" stroke="${char.glow}" stroke-width="1.5"/>
  <path d="M 10 365 L 35 390 M 10 378 L 22 390" stroke="${char.glow}" stroke-width="1.5"/>
  <path d="M 310 365 L 285 390 M 310 378 L 298 390" stroke="${char.glow}" stroke-width="1.5"/>

  <!-- Name Banner Plate at Bottom -->
  <rect x="25" y="340" width="270" height="42" rx="3" fill="#0a0204" fill-opacity="0.88" stroke="${char.glow}" stroke-width="1.2"/>
  <text x="160" y="360" text-anchor="middle" font-family="'Rye', 'Oswald', serif" font-size="14" font-weight="bold" fill="#f8f9fa" letter-spacing="1.5">${char.name}</text>
  <text x="160" y="374" text-anchor="middle" font-family="'Pixelify Sans', monospace" font-size="9" fill="${char.glow}" letter-spacing="1">${char.title.toUpperCase()}</text>
</svg>`;

  fs.writeFileSync(path.join(outDir, `${char.id}.svg`), svg.trim());
});

console.log(`Generated ${characters.length} character portraits in ${outDir}`);
