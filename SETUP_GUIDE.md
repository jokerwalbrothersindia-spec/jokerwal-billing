# Jokerwal Billing — Cloud Setup Guide (Hinglish)

**Good news: is copy mein aapka Firebase project (`jokerwal-billing`) already andar se connect kiya hua hai.** Koi bhi device jab yeh link kholega, seedha **Login/Sign Up** screen aayegi — kabhi "Cloud Setup / API Key" screen nahi maangegi. Aapko sirf niche di gayi **PART 2 (GitHub Pages hosting)** karni hai, taaki ek link ban jaye.

Part 1 (Firebase project banana) sirf reference ke liye rakha hai — agar kabhi **doosra** Firebase project use karna ho.

---

## PART 1 — (Optional/Reference) Naya Firebase Cloud Database Banana

1. Browser mein jaayein: **console.firebase.google.com** aur apne Google account (Gmail) se login karein.
2. **"Add project"** (ya "Create a project") par click karein.
3. Project ka naam daalein aur **Continue** dabayein.
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

8. Ab left menu mein gear icon (⚙️) → **Project settings** par jaayein → "Your apps" section → **`</>`** (Web) icon → app register karein → `firebaseConfig = {...}` wali 6 values note kar lein.
9. App ke andar: **Login screen ke neeche "Firebase project badlein"** link dabayein → confirm karein → ek "Cloud Setup" screen khulegi jahan yeh 6 values paste kar sakte hain.

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

1. Upar wala link phone/computer ke browser mein kholein — seedha **Login screen** aayega (Cloud Setup screen nahi aayegi, Firebase pehle se connected hai).
2. Pehli baar hai, isliye **"Naya account banayein"** par click karein.
3. Apna email aur ek password (kam se kam 6 characters) daal kar **Sign Up** karein — yehi aapka business login hoga. Naya account hamesha ek khaali company ("My Business") ke saath shuru hota hai — koi purani/demo data automatically nahi aati, taaki har alag login/company ka data sirf usi ka rahe.
4. Apni asli JOKERWAL BROTHERS ki Excel history (customers, products, invoices, payments, ledger) load karne ke liye: **Settings** kholein → neeche **"Import JOKERWAL BROTHERS Excel History"** button dabayein → confirm karein. Yeh sirf ek baar, ek khaali/nayi company mein use karein.

**Bas ho gaya — ab yeh ek proper cloud app hai.**

- Kisi bhi doosre phone/computer par wahi link kholiye, wahi email-password se login kijiye — poora data turant wahan bhi dikhega, aur kisi ko bhi kabhi API key/setup nahi maangi jayegi.
- Phone kho jaaye/kharab ho jaaye to koi tension nahi — data Google ke Firebase cloud mein safe hai, naye phone se login karte hi wapas mil jayega.
- **Multi-company (alag business):** Ek hi login se Settings → "Add New Company" se dusri company bana sakte hain (har company ka data poori tarah alag hota hai), YA phir bilkul alag email se naya Sign Up karke ek doosra independent account bana sakte hain — dono tarike se ek company ka data doosri company mein kabhi nahi dikhega.
- **GST bills:** Settings → GST card mein "GST" ON karein aur Default GST % daalein. Fir Products mein har product ka HSN Code aur GST % set karein. Bill banate waqt GST automatically judega, aur invoice PDF par HSN, GST%, CGST/SGST breakup dikhega.

---

## Naye Premium Invoice Features

- **Company Logo:** Settings → Invoice Customization → "Company Logo" mein apna logo image upload karein — yeh invoice PDF ke top-left corner mein dikhega, aur ek halka watermark ki tarah page ke beech mein bhi print hoga (isse bill zyada premium/branded lagta hai aur khali jagah bhi nahi lagti).
- **Scan & Pay QR Code:** Settings → Invoice Customization mein apna **UPI ID** (jaise `yourname@okhdfc`) daal dein. Ab jab bhi kisi bill ka **Balance Due zero se zyada** ho, invoice PDF par ek UPI QR code automatically ban jayega — customer seedha GPay/PhonePe/Paytm se scan karke pay kar sakta hai.
- **Terms & Conditions:** Settings → Invoice Customization mein "Terms & Conditions" mein apni shartein likh dein (jaise "Goods once sold will not be taken back") — yeh totals ke bagal, ek box mein print hoga.
- **GSTIN / PAN print (highlighted):** Settings → Company Profile mein GSTIN daala hai to woh invoice par print hoga. Agar GST registered nahi hain (GSTIN khaali hai), to niche wala **PAN Number** field bhar dein — GSTIN na hone par invoice par automatically PAN print hoga (dono khaali honge to kuch nahi dikhega). Yeh GSTIN/PAN line ab bold aur highlight color mein print hoti hai taaki aasani se dikh jaye.
- **Non-Registered Business tag:** Agar company ka GSTIN khaali hai, to company name/tagline ke niche header mein automatically "(Non-Registered Business)" likha aayega — GSTIN daalte hi yeh tag apne aap hat jayega.
- **Header/Footer Colour Customization:** Settings → Invoice Customization mein "Invoice Header Colour" aur "Invoice Footer Colour" ke color-picker se apni pasand ka colour choose kar sakte hain — dono alag-alag set kar sakte hain. Yeh colour Invoice PDF aur Customer Ledger (statement) PDF, dono par apply hota hai, taaki dono documents ek jaisi branding rakhein.
- **Customer Ledger (statement) — Print/WhatsApp/date-wise check:** Customers list se kisi customer par click karke uski detail kholein. Yahan ab **From/To date** daal kar sirf uss period ke transactions dekh sakte hain (Opening Balance + Closing Balance bhi dikhega). "Print Ledger" se ek premium PDF statement banta hai (jaisa invoice), aur "Send PDF on WhatsApp" se woh seedha WhatsApp share-sheet ke through customer ko bhej sakte hain.
- **Signature ke liye jagah:** "Authorized Signatory" line ab bill ke bilkul bottom-right corner mein hai, aur line ke upar ek khaali jagah chodi gayi hai taaki asli pen se signature kiya ja sake.
- **Premium A4 Invoice:** "Print Invoice" ab ek proper **A4-size, single-page PDF** banata hai (gold header, company details, items table, GST breakup, amount in words, bank details, terms box, signature space) — pehle wale simple HTML print se kaafi behtar. Yeh naya browser tab mein khulta hai jahan se aap print ya save kar sakte hain.
- **Invoice customization:** Settings → Invoice Customization mein apna khud ka Footer Note (jaise "Thank you!" ya koi terms) aur Bank Details (bank transfer ke liye) daal sakte hain — Footer Note ab bottom mein ek colored band (aapke chune footer colour ka) mein print hota hai, taaki bank details aur footer ke beech khaali/awkward gap na lage — signature line bhi ab content ke turant baad aati hai, na ki page ke bilkul niche fix hokar.
- **Terms & Conditions box:** ab pehle se chota/thin box hai (jyada width nahi leta) aur uski height apne text ke hisab se set hoti hai — is se "Amount in words" line box ke upar overlap nahi karti. Amount in words ab thoda **bold** bhi print hota hai.
- **WhatsApp par PDF bhejna:** Bill save hone ke baad "Send PDF on WhatsApp" button dabayein.
  - **Mobile par (Android/iPhone):** ek share-sheet khulegi jisme WhatsApp choose karke ek tap mein PDF invoice seedha customer ko bhej sakte hain.
  - **Computer/laptop par** (jahan yeh share-sheet feature nahi hota): PDF automatically download ho jayegi aur WhatsApp Web/App ek chat khul jayegi — bas download hui PDF ko chat mein manually attach kar dein (yeh ek phone/browser ki limitation hai — koi bhi website apne aap kisi doosre app mein file "silently" nahi bhej sakti, user ko ek baar select/attach karna hi padta hai).
- **Note:** Logo, QR code aur naya PDF banane ke liye do chhoti libraries (jsPDF, QR code) internet se load hoti hain — isliye invoice **print/share karte waqt** phone/computer par internet ON hona chahiye (baaki poora app — bill banana, customer/product data — bina internet ke bhi kaam karta hai, kyunki Firestore data local mein bhi cache rehta hai).

---

## Notes

- Yeh Firebase ka **free (Spark) plan** hai — ek chhoti billing shop ke liye yeh limit kabhi khatam nahi hogi (roughly 50,000 reads/day free milte hain).
- "Firebase project badlein" button (login screen ke neeche) se aap kabhi bhi doosra Firebase project connect kar sakte hain agar zarurat pade — normally isko kabhi touch karne ki zaroorat nahi.
- Settings page mein "Export Backup" se extra safety ke liye kabhi-kabhi ek JSON backup file bhi download kar sakte hain.

## Update ke baad bhi purani app dikhe to (one-time fix)

App phone ke home-screen par "install" hone par offline kaam kare, iske liye ek chhota "service worker" file (`sw.js`) hai jo app ko cache (yaad) rakhta hai. Iska pehla version thoda zyada aggressively cache karta tha — isliye naye update (jaise GST, multi-company fixes) GitHub par dalne ke baad bhi purana version dikh sakta tha. `sw.js` ab hamesha latest version pehle try karta hai, lekin agar aapne pehle se ek baar app khol li thi, to us PURANE cache ko ek baar manually saaf karna padega:

1. Sabse pehle, apna live link ek **Incognito/Private tab** mein khol kar dekhein — agar wahan naya version dikh raha hai, to iska matlab update sahi se ho chuka hai, bas aapke normal browser ka cache purana hai.
2. Normal browser mein cache saaf karne ke liye: Chrome → uss site ke 3-dot menu ya address bar ke bagal wale (i) icon → **Site settings** → **Clear & reset** (ya "Storage" → "Clear data").
3. Agar app ko phone home-screen par "Add to Home Screen" kiya tha, to uss purane icon ko remove/uninstall kar dein, cache clear karne ke baad link phir se browser mein kholein aur dobara "Add to Home Screen" kar lein.
4. Ab yeh dobara nahi hoga — naya `sw.js` hamesha pehle internet se latest version check karega.
