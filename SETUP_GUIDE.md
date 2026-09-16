# Jokerwal Billing — Cloud Setup Guide (Hinglish)

Yeh guide aapko 2 kaam free mein karwayegi:
1. **Apna khud ka cloud database** banana (Firebase) — jisme aapka data safe rahega, phone lost hone par bhi.
2. **Isko internet par host karna** (GitHub Pages) — taaki ek link ban jaye jo kisi bhi phone/computer se khul sake.

Dono FREE hain, koi credit card nahi chahiye.

---

## PART 1 — Apna Firebase Cloud Database Banayein

1. Browser mein jaayein: **console.firebase.google.com** aur apne Google account (Gmail) se login karein.
2. **"Add project"** (ya "Create a project") par click karein.
3. Project ka naam daalein — jaise `jokerwal-billing` — aur **Continue** dabayein.
4. Google Analytics ka option aayega — usko **OFF/skip** kar sakte hain (zaroori nahi hai). **Create project** dabayein aur wait karein.
5. Project ready hone ke baad, left side menu mein **Build → Authentication** par jaayein.
   - **Get started** dabayein.
   - **Email/Password** provider par click karein → **Enable** karein → **Save**.
6. Left menu mein **Build → Firestore Database** par jaayein.
   - **Create database** dabayein.
   - Location choose karein (koi bhi nearby region, e.g. `asia-south1 (Mumbai)`).
   - **Start in production mode** select karein → **Create**.
7. Firestore ban jaane ke baad, **Rules** tab par jaayein aur neeche di gayi Rules paste kar dein (purani sab hata kar):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

   Yeh rule ensure karta hai ki **sirf aap** (login kiya hua account) apna data dekh/badal sakte hain, koi aur nahi. **Publish** dabayein.

8. Ab left menu mein gear icon (⚙️) → **Project settings** par jaayein.
   - Neeche scroll karein "Your apps" section tak.
   - **`</>`** (Web) icon par click karein.
   - App ka nickname daalein (jaise `jb-billing-web`) → **Register app**.
   - Ek code dikhega jisme `firebaseConfig = {...}` hoga — isme 6 values hongi:
     - `apiKey`
     - `authDomain`
     - `projectId`
     - `storageBucket`
     - `messagingSenderId`
     - `appId`
   - Yeh 6 values kahin note kar lein (ya tab khula rakhein) — app kholte hi pehli baar yeh values maangega.

Bas, Firebase ka kaam ho gaya!

---

## PART 2 — App ko Internet par Host Karein (GitHub Pages)

1. **github.com** par jaayein aur free account banayein (agar pehle se nahi hai).
2. Login karne ke baad, top-right **"+"** icon → **New repository** par click karein.
3. Repository ka naam daalein — jaise `jokerwal-billing` → **Public** select karein → **Create repository**.
4. Naye repository page par, **"uploading an existing file"** link par click karein (ya "Add file → Upload files").
5. Is folder ki saari files (`index.html`, `manifest.json`, `sw.js`, `icon.svg`) ek saath drag-drop karein.
6. Neeche **Commit changes** dabayein.
7. Ab **Settings** tab (repository ke andar, top mein) par jaayein → left menu mein **Pages** par click karein.
8. "Branch" mein **main** select karein, folder **`/ (root)`** rakhein → **Save**.
9. 1-2 minute wait karein, phir yeh page refresh karein — upar ek green box mein aapka live link milega, jaisे:
   `https://yourusername.github.io/jokerwal-billing/`

Yeh link hi aapki app hai — isko phone ke browser mein kholein, aur **"Add to Home Screen"** kar lein (ek app icon ban jayega, bilkul real app ki tarah).

---

## PART 3 — Pehli Baar App Kholna

1. Upar wala link phone/computer ke browser mein kholein.
2. **"Cloud Setup"** screen aayegi — Part 1 mein note ki hui 6 values yahan paste karein → **Save & Continue**.
3. Ab **Login screen** aayega — pehli baar hai, isliye **"Naya account banayein"** par click karein.
4. Apna email aur ek password (kam se kam 6 characters) daal kar **Sign Up** karein — yehi aapka business login hoga. Naya account hamesha ek khaali company ("My Business") ke saath shuru hota hai — koi purani/demo data automatically nahi aati, taaki har alag login/company ka data sirf usi ka rahe.
5. Apni asli JOKERWAL BROTHERS ki Excel history (customers, products, invoices, payments, ledger) load karne ke liye: **Settings** kholein → neeche **"Import JOKERWAL BROTHERS Excel History"** button dabayein → confirm karein. Yeh sirf ek baar, ek khaali/nayi company mein use karein.

**Bas ho gaya — ab yeh ek proper cloud app hai.**

- Kisi bhi doosre phone/computer par wahi link kholiye, wahi email-password se login kijiye — poora data turant wahan bhi dikhega.
- Phone kho jaaye/kharab ho jaaye to koi tension nahi — data Google ke Firebase cloud mein safe hai, naye phone se login karte hi wapas mil jayega.
- **Multi-company (alag business):** Ek hi login se Settings → "Add New Company" se dusri company bana sakte hain (har company ka data poori tarah alag hota hai), YA phir bilkul alag email se naya Sign Up karke ek doosra independent account bana sakte hain — dono tarike se ek company ka data doosri company mein kabhi nahi dikhega.
- **GST bills:** Settings → GST card mein "GST" ON karein aur Default GST % daalein. Fir Products mein har product ka HSN Code aur GST % set karein. Bill banate waqt GST automatically judega, aur print invoice par HSN, GST%, CGST/SGST breakup dikhega.
- **Invoice customization:** Settings → Invoice Customization mein apna khud ka Footer Note (jaise "Thank you!" ya koi terms) aur Bank Details (bank transfer ke liye) daal sakte hain — yeh print hone wale invoice par dikhega.

---

## Notes

- Yeh Firebase ka **free (Spark) plan** hai — ek chhoti billing shop ke liye yeh limit kabhi khatam nahi hogi (roughly 50,000 reads/day free milte hain).
- "Firebase project badlein" button (login screen ke neeche) se aap kabhi bhi doosra Firebase project connect kar sakte hain agar zarurat pade.
- Settings page mein "Export Backup" se extra safety ke liye kabhi-kabhi ek JSON backup file bhi download kar sakte hain.

## Update ke baad bhi purani app dikhe to (one-time fix)

App phone ke home-screen par "install" hone par offline kaam kare, iske liye ek chhota "service worker" file (`sw.js`) hai jo app ko cache (yaad) rakhta hai. Iska pehla version thoda zyada aggressively cache karta tha — isliye naye update (jaise GST, multi-company fixes) GitHub par dalne ke baad bhi purana version dikh sakta tha. Maine `sw.js` ko fix kar diya hai (ab hamesha latest version pehle try karega), lekin agar aapne pehle se ek baar app khol li thi, to us PURANE cache ko ek baar manually saaf karna padega:

1. Sabse pehle, apna live link ek **Incognito/Private tab** mein khol kar dekhein — agar wahan naya version (GST wala Settings, etc.) dikh raha hai, to iska matlab update sahi se ho chuka hai, bas aapke normal browser ka cache purana hai.
2. Normal browser mein cache saaf karne ke liye: Chrome → uss site ke 3-dot menu ya address bar ke bagal wale (i) icon → **Site settings** → **Clear & reset** (ya "Storage" → "Clear data").
3. Agar app ko phone home-screen par "Add to Home Screen" kiya tha, to uss purane icon ko remove/uninstall kar dein, cache clear karne ke baad link phir se browser mein kholein aur dobara "Add to Home Screen" kar lein.
4. Ab yeh dobara nahi hoga — naya `sw.js` (is update mein shamil hai) hamesha pehle internet se latest version check karega.
