/* =========================================================
   Shared ledger switch.

   Paste your Firebase web-app config below to make every phone
   share one ledger (see SETUP-FIREBASE.md). Leave it as null to
   run in single-device mode, where the ledger lives only in this
   browser.

   This config is not a secret — Firebase web configs are meant
   to be public. The security rules in firestore.rules are what
   protect the data.
   ========================================================= */

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyCu67CDDYhWPg_P3xCX-oCEqgnceVIa_eE",
  authDomain: "mtc-halloween.firebaseapp.com",
  projectId: "mtc-halloween",
  storageBucket: "mtc-halloween.firebasestorage.app",
  messagingSenderId: "191524538035",
  appId: "1:191524538035:web:79b5cd06f0dbdba4a452c6"
};

/* Example:
window.FIREBASE_CONFIG = {
  apiKey: "AIza...",
  authDomain: "wheel-of-curses.firebaseapp.com",
  projectId: "wheel-of-curses",
  storageBucket: "wheel-of-curses.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123"
};
*/
