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
- **Terms & Conditions box:** poori width (jitni jagah totals column ke left mein khaali thi) wapas use karta hai, background ab **transparent** hai (sirf border dikhega), aur ek wrapping bug fix ki gayi hai jiski wajah se text box ki poori width mein sahi se fit hota hai (pehle text galat tarike se jaldi wrap ho raha tha aur box mein khaali jagah dikh rahi thi). Height text ke hisab se compact rehti hai, aur "Amount in words" line kabhi box ke upar overlap nahi karti. Amount in words ab thoda **bold** bhi print hota hai.
- **Logo Size:** Settings → Invoice Customization mein logo upload ke turant niche "Logo Size" dropdown se Small/Medium/Large/Extra Large choose kar sakte hain — Invoice aur Customer Ledger, dono PDF ke header mein bada/chota logo print hoga (header band bhi bade logo ke hisab se apne aap thodi badi ho jayegi taaki logo cut na ho).
- **WhatsApp par PDF bhejna:** Bill save hone ke baad "Send PDF on WhatsApp" button dabayein.
  - **Mobile par (Android/iPhone):** ek share-sheet khulegi jisme WhatsApp choose karke ek tap mein PDF invoice seedha customer ko bhej sakte hain.
  - **Computer/laptop par** (jahan yeh share-sheet feature nahi hota): PDF automatically download ho jayegi aur WhatsApp Web/App ek chat khul jayegi — bas download hui PDF ko chat mein manually attach kar dein (yeh ek phone/browser ki limitation hai — koi bhi website apne aap kisi doosre app mein file "silently" nahi bhej sakti, user ko ek baar select/attach karna hi padta hai).
- **Note:** Logo, QR code aur naya PDF banane ke liye do chhoti libraries (jsPDF, QR code) internet se load hoti hain — isliye invoice **print/share karte waqt** phone/computer par internet ON hona chahiye (baaki poora app — bill banana, customer/product data — bina internet ke bhi kaam karta hai, kyunki Firestore data local mein bhi cache rehta hai).

---

## Purchase System (Party-wise Purchase Bill, Payment aur Ledger)

Ab app mein ek poora **Purchase side** bhi hai — jab aap kisi party/vendor se maal khareedte hain (ya job-work material lete hain), uska bill banaiye, party ko payment karne par record ho jayega, aur har party ka apna ledger milega.

- **Suppliers / Parties (naya sidebar menu):** Yeh Customers jaisi hi ek alag list hai, lekin un logon ke liye jinhe aap payment karte hain (vendor, raw-material supplier, job-work party). Naam, mobile aur opening balance (jo aap unhe pehle se owe karte hain) daal kar "Add" karein — ya Purchase Bill banate waqt mobile number se naya party apne aap ban jayega.
- **Purchase Bill (naya sidebar menu):** Bilkul "New Bill" jaisa hi screen hai — Party select/search karein (ya naam-mobile type karein), phir Products list se items add karein (qty x rate). Yeh **stock ko badhata hai** (kyunki maal andar aa raha hai — Sales Bill ke ulta jo stock ghatata hai). Payment Mode Cash/UPI/Credit choose karke "Save Purchase Bill" dabayein — ek **Purchase Voucher** print ho sakta hai.
  - **Modify Bill / Cancel Bill:** Purchase No daal kar pichla bill edit ya cancel kar sakte hain — stock aur party balance dono automatically sahi ho jayenge.
- **Party Ledger:** Suppliers list mein kisi party par click karein — poora ledger (kitna maal khareeda, kitna pay kiya, balance) date-range filter ke saath dikhega, aur **Print Ledger** / **Send PDF on WhatsApp** yahan bhi available hai (bilkul customer statement jaisa, sirf label "SUPPLIER" hoga).
- **Pay Supplier (payment record):** Party detail mein "Pay Supplier" button se payment record karein — Amount, Date, Payment Mode (Cash/UPI/Bank Transfer/**Cheque**) aur Remarks daalein. Save hote hi party ka balance kam ho jata hai aur ledger mein automatically entry ban jati hai.
- **Cheque Print:** Pay Supplier mein Payment Mode **"Cheque"** choose karein — payment save hone ke baad ek **"Print Cheque"** button aayega jo ek ready-to-print cheque PDF banata hai (Payee Name, Date boxes, Amount in figures + words, signature line). Yeh ek **standard/generic cheque layout** hai — har bank/cheque-book ka size thoda alag hota hai, isliye pehle plain paper par test print karke apni asli cheque book ke upar hold karke check kar lein ki fields sahi jagah aa rahi hain. Agar position thodi idhar-udhar chahiye ho to bata dijiyega, adjust kiya ja sakta hai.
- **Purchase Register:** Saare purchase bills date-range/status filter ke saath, ek jagah — Sales Register jaisa hi.
- **Purchase Bill Prefix:** Settings → Company Profile mein "Purchase Bill Prefix" field se purchase bill number ka prefix (default `PUR`) customize kar sakte hain — jaise Invoice/Product prefix.

---

## Latest Fixes — Party Details, Payment Bug, Auto-WhatsApp, Inline Add

- **Supplier/Party ki poori detail:** "Add Party" / "Edit Party" form mein ab Name, Mobile ke saath **Address Line 1/2, GSTIN aur PAN** bhi hai (bilkul Company Profile jaisa) — Party detail screen mein yeh address/GSTIN ab dikhta bhi hai.
- **"Receive Payment" button fix:** Pehle jab Receive Payment modal khol kar "Select Customer" se customer choose karte the, to poora modal gayab ho jaata tha aur payment record nahi ho pata tha. Yeh ek modal-system ka bug tha — jab ek modal ke andar se doosra modal (jaise search picker) khulta tha, to pehla wala destroy ho jaata tha. Ab modals theek se ek-doosre ke upar "stack" hote hain, isliye Receive Payment ho ya Pay Supplier — dono mein "Select Customer/Party" search button ab sahi kaam karta hai.
- **Bill save hote hi WhatsApp apne aap khulta hai:** Ab Sale Bill ho ya Purchase Bill, save karte hi bill/party ke mobile number ka WhatsApp automatically khul jaata hai (jaisa "Send PDF on WhatsApp" / "WhatsApp" button manually dabane par hota hai) — manual button bhi wahin available rehta hai agar browser ne automatic popup block kar diya ho (kuch browsers sirf ek direct click par hi naya tab khulne dete hain).
- **Product/Customer/Party list mein na ho to wahin se "Add New":** Sale Bill ya Purchase Bill banate waqt jab aap search-icon se Product ya Party/Customer dhoondte hain aur woh list mein nahi milta, to picker ke top par ek **"+ Add New Product" / "+ Add New Customer" / "+ Add New Party"** button dikhega — jo aapne search box mein type kiya tha woh naam pehle se bhara hua aayega, bas baaki detail bharke save karein — naya record turant bill mein select ho jayega, dobara dhoondhne ki zaroorat nahi.

---

## Product QR Code Labels (Bulk print — fast scan-billing)

Ab har Product ke liye ek **QR code label** print kar sakte hain jo uske Product Code ko encode karta hai — Sale/Purchase Bill screen ka "Product code scan/type karein" box isi code ko scan/Enter se turant pehchan leta hai, isliye label ko item par chipka kar sirf **scan karte hi bill mein item add ho jayega**, typing ki zaroorat nahi — aur shop bhi zyada professional/premium lagegi.

- **Kahan se print karein:**
  - **Products page** ke top par "Print QR Labels" button — kisi bhi product(s) ko search karke, har ek ki quantity (kitne label chahiye) set karke ek saath batch print kar sakte hain.
  - **Kisi bhi product ko Edit karke** — "Print QR Label" button se sirf uska label reprint kar sakte hain.
  - **Stock Entry** mein stock add karne ke turant baad — "Print QR Labels for last-added stock" button us exact quantity ke hisab se labels bana deta hai (jaise 100 pcs aaye to 100 labels).
  - **Purchase Bill save hone ke baad** — "Print QR Labels (Batch)" button us poore purchase bill ke saare items (jitni quantity aayi thi) ke liye ek hi baar mein saare labels bana deta hai — yehi woh **"ek saath" (batch) option** hai jab bulk mein naya maal/products aaye.
- Ek hi product ke saare labels ke liye QR code sirf **ek baar generate hota hai** aur baaki copies mein reuse hota hai — isliye 100+ labels bhi jaldi ban jaate hain.
- Label sheet A4 page par grid mein print hoti hai (company name, QR code, product naam, code aur rate) — printer/plain paper par print karke kaat lein aur item par chipka dein.

---

## Purchase Cost vs Selling Rate — Profit & Loss Report

Ab har Product mein **do alag rate** hain: **Rate (₹)** — jis par aap bechte hain (selling), aur **Purchase Cost (₹)** — jis par aapne khareeda tha (cost). Pehle sirf ek hi "Rate" tha, isliye agar kabhi selling price aur cost price same rakhni pade to profit/loss pata karna mushkil tha — ab dono alag track hote hain.

- **Product mein Purchase Cost daalein:** Products → kisi bhi product ko Add/Edit karein — "Purchase Cost (₹)" field mein wo rate daalein jis par aapne wo maal khareeda tha.
- **Purchase Bill khud-ba-khud update kar deta hai:** Jab bhi koi Purchase Bill save hota hai, us bill mein jo rate diya gaya tha wahi us product ka naya Purchase Cost ban jata hai (latest cost hamesha up-to-date rehta hai) — Purchase Bill mein product add karte waqt bhi ab default rate Purchase Cost se hi aata hai (Selling Rate se nahi).
- **Sale Bill profit save karta hai:** Jab bhi koi Sale Bill banta hai, us waqt product ka jo Purchase Cost tha wo us bill ke saath hamesha ke liye save ho jata hai — isliye baad mein Purchase Cost badal bhi jaye, to purane bills ka profit galat nahi hoga.
- **Profit & Loss Report (naya sidebar menu):** Date range choose karke Total Sales, Total Purchase Cost, **Gross Profit** aur Profit Margin % dekhein — har bill ka apna profit bhi list mein dikhta hai. Yehi report bataegi ki agar aap Selling Rate aur Purchase Cost same rakh rahe hain to profit zero/negative aa raha hai — turant pata chal jayega.
- Daily aur Monthly Report mein bhi ab ek **"Profit"** tile add hui hai, quick check ke liye.
- **Note:** Jo purane bills Purchase Cost set karne se PEHLE bane the, unka profit yahan 0 dikhega (kyunki us waqt cost record nahi thi) — Purchase Cost bharne ke baad ke saare naye bills sahi profit dikhayenge.

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
