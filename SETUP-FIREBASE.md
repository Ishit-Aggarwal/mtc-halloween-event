# Turning on the shared ledger (Firebase) — ~15 minutes

This connects every team's phone to one shared ledger, so a curse can never be handed out twice. It runs on Firebase's free **Spark** plan, which needs no credit card. One event night uses a tiny fraction of the free limits.

## 1. Create the project
1. Go to https://console.firebase.google.com and click **Add project**. Name it something like `wheel-of-curses`.
2. Google Analytics isn't needed, so you can turn it off.

## 2. Turn on the database
1. Open **Build → Firestore Database → Create database**.
2. Pick a location close to you (e.g. `asia-south1 (Mumbai)`).
3. Choose **Start in production mode**. You'll replace the rules in step 5.

## 3. Turn on sign-in
Open **Build → Authentication → Get started → Sign-in method**, then:
1. Enable **Anonymous**. Every phone silently gets an ID, so teams never see a login.
2. Enable **Email/Password**. This is only for the host.
3. Go to the **Users** tab → **Add user**. Create the host account (an email and a strong password). Only this account can release claims, change the timer or wipe the event.

## 4. Connect the site
1. Go to **Project settings (⚙️) → General → Your apps** and click the **</>** (Web) icon.
2. Register the app (Firebase Hosting can stay unticked for now).
3. Copy the `firebaseConfig = { ... }` object it shows you.
4. Paste it into `js/firebase-config.js`, replacing `null`:

   ```js
   window.FIREBASE_CONFIG = {
     apiKey: "…",
     authDomain: "…",
     projectId: "…",
     storageBucket: "…",
     messagingSenderId: "…",
     appId: "…"
   };
   ```

## 5. Lock the database down
1. Open `firestore.rules` and replace `host@example.com` with the host email from step 3.
2. In the console, go to **Firestore Database → Rules**, replace everything with the contents of `firestore.rules`, and click **Publish**.

The rules enforce three things:
- Anyone can *read* the ledger.
- A curse can only be claimed once, and only by the phone that registered that team.
- Only the host can delete anything.

## 6. Put it online
Phones need a public link. Any static host works:

- **Firebase Hosting** (same project):
  ```bash
  npx firebase-tools login
  ```
  ```bash
  npx firebase-tools deploy --project YOUR_PROJECT_ID
  ```
  This also deploys `firestore.rules`. Your link will be `https://YOUR_PROJECT_ID.web.app`.
- **Netlify / Vercel / GitHub Pages**: upload the folder as-is.

If you host somewhere other than Firebase, add that domain under **Authentication → Settings → Authorized domains**.

## 7. Check it before the event
1. Open the link. A **"Crypt linked"** pill with a green dot should appear at the top right.
2. Tap the club logo 5 times to open the host ledger, then sign in with the host account.
3. Do a dry run: set the twist delay to `0.5` minutes, spin through on two phones, then **Wipe entire ledger** and set the delay back to `15`.

## On the night
- The twist delay set in the host panel applies to **every phone**. It affects teams that spin the hex after you change it.
- Don't spin for a team on the phone you're signed in on as host. Use a separate device, or sign out first.
- If a team's phone loses internet during the curse spin, nothing is claimed. They get a message and can try again. If their claim did land before the connection dropped, the phone picks it up instead of taking a second curse.
- The **Release** button frees a curse if a team drops out.
- **Export spreadsheet** gives you every team's soul, curse, hex and twist for judging.

## Rehearse without Firebase
Open `http://localhost:5173/?mockcloud&phone=A` in one tab and `…?mockcloud&phone=B` in another. Each tab acts as a separate phone sharing a fake ledger. The fake host password is `host`.

This is only for testing: it doesn't enforce the security rules.
