# Jokerwal Billing — Cloud Setup Guide

**Good news: this copy already has your Firebase project (`jokerwal-billing`) connected inside it.** Whenever any device opens this app's link, it will go straight to the **Login/Sign Up** screen — it will never ask for a "Cloud Setup / API Key" screen. All you need to do is **PART 2 (GitHub Pages hosting)** below, so that a link gets created.

Part 1 (creating a Firebase project) is kept only for reference — in case you ever need to use a **different** Firebase project.

---

## PART 1 — (Optional/Reference) Creating a New Firebase Cloud Database

1. Go to **console.firebase.google.com** in your browser and log in with your Google account (Gmail).
2. Click **"Add project"** (or "Create a project").
3. Enter a name for the project and click **Continue**.
4. You will see a Google Analytics option — you can turn this **OFF/skip** it (it is not required). Click **Create project** and wait.
5. Once the project is ready, go to **Build → Authentication** in the left-side menu.
   - Click **Get started**.
   - Click the **Email/Password** provider → click **Enable** → **Save**.
6. Go to **Build → Firestore Database** in the left menu.
   - Click **Create database**.
   - Choose a location (any nearby region, e.g. `asia-south1 (Mumbai)`).
   - Select **Start in production mode** → **Create**.
7. Once Firestore is created, go to the **Rules** tab and paste in the Rules below (removing everything that was there before):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null && request.auth.token.email == 'jokerwalbrothers@gmail.com';
    }
    function isPaid(uid) {
      return exists(/databases/$(database)/documents/licenses/$(uid)) &&
             get(/databases/$(database)/documents/licenses/$(uid)).data.paid == true;
    }
    match /licenses/{uid} {
      allow read: if request.auth != null && (request.auth.uid == uid || isAdmin());
      allow create: if request.auth != null && request.auth.uid == uid
                    && request.resource.data.paid == false;
      allow update: if isAdmin();
    }
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid && (isAdmin() || isPaid(uid));
    }
  }
}
```

   This rule makes sure that **only you** (the logged-in account) can see or change your own data, and no one else can — and it also keeps every new sign-up locked until the owner activates it (full details are in the **"Paid Access"** section below). Click **Publish**.

8. Now go to the gear icon (⚙️) → **Project settings** in the left menu → the "Your apps" section → the **`</>`** (Web) icon → register the app → note down the 6 values inside `firebaseConfig = {...}`.
9. Inside the app: click the **"Change Firebase project"** link below the Login screen → confirm → a "Cloud Setup" screen will open where you can paste these 6 values.

---

## PART 2 — Host the App on the Internet (GitHub Pages)

1. Go to **github.com** and create a free account (if you don't already have one).
2. After logging in, click the top-right **"+"** icon → **New repository**.
3. Enter a name for the repository — for example `jokerwal-billing` → select **Public** → **Create repository**.
4. On the new repository's page, click the **"uploading an existing file"** link (or "Add file → Upload files").
5. Drag and drop all the files in this folder (`index.html`, `manifest.json`, `sw.js`, `icon.svg`) together.
6. Click **Commit changes** below.
7. Now go to the **Settings** tab (inside the repository, at the top) → click **Pages** in the left menu.
8. Under "Branch", select **main**, keep the folder as **`/ (root)`** → **Save**.
9. Wait 1-2 minutes, then refresh this page — you will see your live link in a green box at the top, something like:
   `https://yourusername.github.io/jokerwal-billing/`

This link is your app — open it in your phone's browser, and use **"Add to Home Screen"** (an app icon will be created, just like a real app).

---

## PART 3 — Opening the App for the First Time

1. Open the link above in your phone/computer browser — you will go straight to the **Login screen** (the Cloud Setup screen will not appear, since Firebase is already connected).
2. Since this is your first time, click **"Create a new account"**.
3. Enter your email and a password (at least 6 characters) and click **Sign Up** — this will be your business login. A new account always starts with one empty company ("My Business") — no old/demo data is added automatically, so each separate login/company keeps only its own data.
4. To load your actual JOKERWAL BROTHERS Excel history (customers, products, invoices, payments, ledger): open **Settings** → click the **"Import JOKERWAL BROTHERS Excel History"** button below → confirm. Use this only once, on an empty/new company. **(Note: this button only shows up when logged in with jokerwalbrothers@gmail.com — an account signed up with any other email (for example, another business using this same app) will never see this button, so that Jokerwal Brothers' data can never accidentally end up in someone else's account.)**

**That's it — this is now a proper cloud app.**

- Open the same link on any other phone/computer and log in with the same email-password — all the data will show up there instantly too, and no one will ever be asked for an API key/setup.
- If your phone is lost or damaged, there is nothing to worry about — the data is safe in Google's Firebase cloud, and logging in on a new phone will bring it right back.
- **Multi-company (separate businesses):** From the same login, you can create another company from Settings → "Add New Company" (each company's data stays completely separate), OR you can sign up with a completely different email to create a second, independent account — either way, one company's data will never show up in another company.
- **GST bills:** In Settings → GST card, turn "GST" ON and enter the Default GST %. Then, in Products, set the HSN Code and GST % for each product. GST will be added automatically when you create a bill, and the invoice PDF will show the HSN, GST%, and the CGST/SGST breakup.

---

## New Premium Invoice Features

- **Company Logo:** In Settings → Invoice Customization → "Company Logo", upload your logo image — it will appear in the top-left corner of the invoice PDF, and will also print as a faint watermark in the middle of the page (this makes the bill look more premium/branded and fills empty space too).
- **Scan & Pay QR Code:** In Settings → Invoice Customization, enter your **UPI ID** (for example `yourname@okhdfc`). Now, whenever a bill's **Balance Due is more than zero**, a UPI QR code will be generated automatically on the invoice PDF — the customer can scan it directly with GPay/PhonePe/Paytm and pay.
- **Terms & Conditions:** In Settings → Invoice Customization, write your terms in "Terms & Conditions" (for example "Goods once sold will not be taken back") — this will print in a box beside the totals.
- **GSTIN / PAN print (highlighted):** If you have entered a GSTIN in Settings → Company Profile, it will print on the invoice. If you are not GST-registered (GSTIN is blank), fill in the **PAN Number** field below it — when there is no GSTIN, the PAN will print automatically on the invoice instead (if both are blank, nothing will show). This GSTIN/PAN line now prints in bold and a highlighted colour so it stands out clearly.
- **Non-Registered Business tag:** If a company's GSTIN is blank, "(Non-Registered Business)" will automatically appear in the header under the company name/tagline — this tag disappears automatically as soon as you enter a GSTIN.
- **Header/Footer Colour Customization:** In Settings → Invoice Customization, you can choose your own colours using the "Invoice Header Colour" and "Invoice Footer Colour" colour-pickers — both can be set separately. This colour applies to both the Invoice PDF and the Customer Ledger (statement) PDF, so both documents keep the same branding.
- **Customer Ledger (statement) — Print/WhatsApp/date-wise check:** Click on any customer from the Customers list to open their details. You can now enter a **From/To date** to see only that period's transactions (the Opening Balance and Closing Balance are also shown). "Print Ledger" creates a premium PDF statement (like the invoice), and "Send PDF on WhatsApp" lets you send it straight to the customer through the WhatsApp share sheet.
- **Space for a signature:** The "Authorized Signatory" line is now at the very bottom-right corner of the bill, with blank space above the line so it can be signed by hand with a real pen.
- **Premium A4 Invoice:** "Print Invoice" now creates a proper **A4-size, single-page PDF** (gold header, company details, items table, GST breakup, amount in words, bank details, terms box, signature space) — a big improvement over the earlier simple HTML print. It opens in a new browser tab from where you can print or save it.
- **Invoice customization:** In Settings → Invoice Customization, you can add your own Footer Note (for example "Thank you!" or some terms) and Bank Details (for bank transfers) — the Footer Note now prints in a coloured band (using your chosen footer colour) at the bottom, so there is no empty/awkward gap between the bank details and the footer — the signature line now also follows right after the content instead of being fixed at the very bottom of the page.
- **Terms & Conditions box:** now uses the full width (whatever space was empty to the left of the totals column), the background is now **transparent** (only the border shows), and a wrapping bug has been fixed so the text now fits properly across the full width of the box (previously the text wrapped too early and left empty space in the box). The height stays compact based on the text, and the "Amount in words" line never overlaps the box above it. The amount in words now also prints slightly **bold**.
- **Logo Size:** In Settings → Invoice Customization, right below the logo upload, use the "Logo Size" dropdown to choose Small/Medium/Large/Extra Large — both the Invoice and Customer Ledger PDF headers will print a bigger/smaller logo (the header band also automatically grows a little for a bigger logo so it doesn't get cut off).
- **Sending a PDF on WhatsApp:** After saving a bill, click the "Send PDF on WhatsApp" button.
  - **On mobile (Android/iPhone):** a share sheet will open where you can choose WhatsApp and send the PDF invoice straight to the customer in one tap.
  - **On a computer/laptop** (where this share-sheet feature doesn't exist): the PDF will download automatically and a WhatsApp Web/App chat will open — just attach the downloaded PDF to the chat manually (this is a phone/browser limitation — no website can "silently" send a file into another app automatically; the user always has to select/attach it once).
- **Note:** Two small libraries (jsPDF, QR code) are loaded from the internet to generate the logo, QR code and the new PDF — so your phone/computer needs internet **at the time you print/share** an invoice (the rest of the app — creating bills, customer/product data — works fine without internet, since Firestore data also stays cached locally).

---

## Purchase System (Party-wise Purchase Bill, Payment and Ledger)

The app now also has a complete **Purchase side** — when you buy goods from a party/vendor (or take job-work material), you can create a bill for it, record payments made to the party, and get a ledger for each party.

- **Suppliers / Parties (new sidebar menu):** This is a separate list, similar to Customers, but for the people you make payments to (vendors, raw-material suppliers, job-work parties). Enter the name, mobile and opening balance (what you already owe them) and click "Add" — or a new party will be created automatically from the mobile number while creating a Purchase Bill.
- **Purchase Bill (new sidebar menu):** This screen works just like "New Bill" — select/search a Party (or type their name-mobile), then add items from the Products list (qty x rate). This **increases stock** (since goods are coming in — the opposite of a Sales Bill, which decreases stock). Choose the Payment Mode (Cash/UPI/Credit) and click "Save Purchase Bill" — a **Purchase Voucher** can be printed.
  - **Modify Bill / Cancel Bill:** Enter the Purchase No to edit or cancel a previous bill — the stock and party balance will both be automatically corrected.
- **Party Ledger:** Click on any party from the Suppliers list — you'll see the full ledger (how much was bought, how much was paid, the balance) with a date-range filter, and **Print Ledger** / **Send PDF on WhatsApp** are also available here (just like a customer statement, with the label "SUPPLIER").
- **Pay Supplier (payment record):** Use the "Pay Supplier" button in the party's details to record a payment — enter the Amount, Date, Payment Mode (Cash/UPI/Bank Transfer/**Cheque**) and Remarks. As soon as it's saved, the party's balance decreases and a ledger entry is created automatically.
- **Cheque Print:** In Pay Supplier, choose Payment Mode **"Cheque"** — after saving the payment, a **"Print Cheque"** button will appear that creates a ready-to-print cheque PDF (Payee Name, Date boxes, Amount in figures + words, signature line). This is a **standard/generic cheque layout** — every bank/chequebook is sized slightly differently, so do a test print on plain paper first and hold it against your actual chequebook to check the fields line up correctly. If the position needs to shift a little, let us know and it can be adjusted.
- **Purchase Register:** All purchase bills with a date-range/status filter, in one place — just like the Sales Register.
- **Purchase Bill Prefix:** In Settings → Company Profile, use the "Purchase Bill Prefix" field to customize the purchase bill number's prefix (default `PUR`) — same as the Invoice/Product prefix.

---

## Latest Fixes — Party Details, Payment Bug, Auto-WhatsApp, Inline Add

- **Full Supplier/Party details:** The "Add Party" / "Edit Party" form now also has **Address Line 1/2, GSTIN and PAN** along with Name and Mobile (just like Company Profile) — this address/GSTIN now also shows on the Party details screen.
- **"Receive Payment" button fix:** Previously, when you opened the Receive Payment modal and chose a customer via "Select Customer", the whole modal used to disappear and the payment couldn't be recorded. This was a bug in the modal system — when a second modal (like a search picker) opened from inside another modal, the first one used to get destroyed. Modals now properly "stack" on top of each other, so whether it's Receive Payment or Pay Supplier, the "Select Customer/Party" search button now works correctly in both.
- **WhatsApp opens automatically as soon as a bill is saved:** Now, for both a Sale Bill and a Purchase Bill, WhatsApp opens automatically with the bill's/party's mobile number as soon as you save (just like manually pressing the "Send PDF on WhatsApp" / "WhatsApp" button) — the manual button is still available too in case the browser blocked the automatic popup (some browsers only allow a new tab to open on a direct click).
- **"Add New" right from the Product/Customer/Party list if not found:** While creating a Sale Bill or Purchase Bill, if you search for a Product or Party/Customer using the search icon and it isn't found in the list, a **"+ Add New Product" / "+ Add New Customer" / "+ Add New Party"** button now shows up at the top of the picker — whatever you typed in the search box will already be filled in as the name, so just fill in the rest of the details and save — the new record will be selected in the bill right away, with no need to search again.

---

## Product QR Code Labels (Bulk print — fast scan-billing)

You can now print a **QR code label** for every Product that encodes its Product Code — the "Scan or type product code" box on the Sale/Purchase Bill screen instantly recognizes this same code on scan/Enter, so once the label is stuck on the item, **just scanning it will add the item to the bill** — no typing needed — and the shop will also look more professional/premium.

- **Where to print from:**
  - The **Products page**'s "Print QR Labels" button at the top — search for any product(s), set the quantity (how many labels are needed) for each, and print them all together in a batch.
  - **Editing any product** — use the "Print QR Label" button to reprint just that one label.
  - **Stock Entry**, right after adding stock — the "Print QR Labels for last-added stock" button creates labels matching that exact quantity (for example, if 100 pcs came in, it creates 100 labels).
  - **After saving a Purchase Bill** — the "Print QR Labels (Batch)" button creates all the labels in one go for every item in that entire purchase bill (matching the quantity received) — this is the **"batch" option** for when new stock/products arrive in bulk. The label here always prints the **Selling Price (MRP)**, never the purchase bill's cost rate (even if the purchase was made at a different rate).
- **Label design (new, updated look):** The company name at the top now prints in a **bold, bigger, filled-background banner** (using the same colour you set as the Invoice Header Colour) — it looks more premium and clear than before. **QR code on the LEFT, product name, MRP and Product Code on the RIGHT (all as readable text)**. If the product name is long, it now **wraps onto two lines** (instead of being cut off in the middle as before) — the full name stays readable. The Product Code is also printed as text — so if the QR ever fails to scan, that same code can be typed manually into the "scan/type" box on the Sale/Purchase Bill, and the item's name/rate will fill in automatically.
- **How many labels fit on an A4 sheet — you choose:** In the "Print QR Labels" popup, use the "Labels per A4 sheet" dropdown to choose — 12 (large labels), 21 (default), 32, 40 (small), or 65 (extra small) labels per sheet.
- The QR code for a given product is generated **only once** and reused for all its copies — so even 100+ labels are created quickly.
- The label sheet is printed as a grid on an A4 page — print it on plain paper, cut it out and stick it on the item.

### Are labels getting cut off at the edge while printing? (for example, in a 40/65-per-sheet layout)

A larger number of labels on one A4 sheet (dense layouts like 32/40/65) means each label is smaller, so a printer's own small "edge margin" (the area no printer can print in, usually around 4-5mm) can cut into these small labels. Do these two things:

1. **Always set Paper Size to "A4" in the print dialog** (never "Letter" — Letter is smaller than A4 and will cut off the bottom row).
2. **In the Scale/Fit option, choose "Fit to Page" or "Shrink to Printable Area" — do NOT choose "Actual Size" or "100%".** This setting lets the printer automatically adjust the whole sheet slightly so that no label gets cut off at the edge.

This guidance is now also shown inside the "Print QR Labels" popup in the app, and the outer margins have been made a little bigger so that dense layouts (40/65 per sheet) also stay safely within the printer's edge limit.

### My label sheet is a 0-margin/pre-cut sticker sheet (no border/gap between labels)

If you have a ready-made sticker/label sheet where the labels sit right next to each other (edge-to-edge) — with no empty margin or gap in the middle or at the sides of the sheet (the sheet's own physical die-cut is each label's border) — then the normal advice above (margins + "Fit to Page") will not work for this sheet, because the app's printed margins/gaps won't match that sheet's real sticker positions.

For this, a **new checkbox has been added in the "Print QR Labels" popup**:

> **"This is a 0-margin / pre-cut sticker sheet (labels edge-to-edge, no gap)"**

- **When this checkbox is ON:** The app prints the labels completely edge-to-edge on the sheet — no margin, no gap between labels, and no cutting-guide border is printed either (since the sheet's own physical cut is already the border — a printed border would just misalign with the sticker).
- **Choose the OPPOSITE setting in the print dialog this time:** when the checkbox is ON, the popup itself will show this guidance — choose "**Actual Size / 100% / No Scaling**", **NOT** "**Fit to Page**" — because auto-scaling could misalign the whole grid slightly against the sticker sheet's real positions.
- **When the checkbox is OFF (default)** — everything works as before: the normal bordered/margin style, with the "Fit to Page"/"Shrink to Printable Area" advice — this is correct for printing on plain A4 paper.

This means the app now works for both kinds of label sheets — plain paper (normal style, default) and a ready-made 0-margin sticker sheet (with the checkbox turned ON) — just choose whichever mode matches the sheet you have available.

---

## Purchase Cost vs Selling Rate — Profit & Loss Report

Every Product now has **two separate rates**: **Rate (₹)** — the price you sell at, and **Purchase Cost (₹)** — the price you bought it at (cost). Previously there was only one "Rate", so it was hard to work out profit/loss if the selling price and cost price ever needed to be the same — now both are tracked separately.

- **Enter the Purchase Cost on a product:** Go to Products → Add/Edit any product — enter the rate you bought that stock at in the "Purchase Cost (₹)" field.
- **The Purchase Bill updates it automatically:** Whenever a Purchase Bill is saved, the rate entered in that bill becomes that product's new Purchase Cost (the latest cost always stays up to date) — when adding a product to a Purchase Bill, the default rate now also comes from the Purchase Cost (not the Selling Rate).
- **A Sale Bill saves the profit at that time:** Whenever a Sale Bill is created, the product's Purchase Cost at that moment is saved permanently with that bill — so even if the Purchase Cost changes later, the profit on old bills will never be wrong.
- **Profit & Loss Report (new sidebar menu):** Choose a date range to see Total Sales, Total Purchase Cost, **Gross Profit** and Profit Margin % — each bill's own profit is also shown in the list. This report will show you right away if profit is coming out at zero/negative because Selling Rate and Purchase Cost are the same.
- The Daily and Monthly Reports now also have a **"Profit"** tile for a quick check.
- **Note:** Bills created BEFORE the Purchase Cost was set will show 0 profit here (since no cost was recorded at that time) — all new bills created after entering the Purchase Cost will show the correct profit.

---

## Fix for Products/Customers list "disappearing" (connection errors now show clearly)

Previously, the Products or Customers list (or Suppliers, Sales/Purchase Register, Reports) sometimes appeared empty — no error would show, the list would just seem to have disappeared, and refreshing/reloading the page would make it show correctly again. This happened because if there was even a small internet hiccup at that moment (a Firestore read failing), that error wasn't shown anywhere — the app quietly left the list empty.

Now, every list is built so that if a problem like this occurs, the list won't stay empty — instead, a clear message will show: **"Connection problem — could not load data"** along with a **"Try Again"** button. Pressing that button once will reload the list right away (without refreshing the page) — this also makes it obvious when the connection was weak, and fixes it in one tap. This fix has been applied to every list-based screen: Products, Customers, Suppliers, Sales Register, Purchase Register, Daily/Monthly Report, and Profit & Loss Report.

---

## "Send PDF on WhatsApp" after saving a bill — how it works now

Previously, WhatsApp used to open automatically as soon as a bill was saved, but only with a text message — it never included the invoice PDF file, because no website can automatically attach a PDF straight to a specific WhatsApp number (this is a limitation of WhatsApp/the phone itself, not of our app) — only the phone's own "Share" menu can attach a file, and that menu only opens on a DIRECT button tap, never automatically.

So now:
- **As soon as a bill is saved** — as before, a WhatsApp confirmation MESSAGE is sent to the customer automatically right away (with the invoice number, amount, and balance).
- **To send the actual PDF invoice** — press the "Send PDF on WhatsApp" button yourself in the "Bill Saved" popup. On most phones (Android/iPhone), this will immediately open the phone's Share menu with the PDF already attached — just choose WhatsApp and the customer, and send.
- If your phone/browser doesn't support this Share menu, the PDF file will download and a clear popup will show step-by-step instructions on how to open WhatsApp and manually attach that downloaded PDF using 📎 (Attach).

---

## New Premium Look (Dark theme fix + rich UI)

The interface has been fully refreshed — it now looks more premium and rich:

- **Selected/highlighted tile now shows clearly:** Previously in Dark mode, when you were on a sidebar item (like "Customers"), its text and background were both so dark that the name sometimes seemed to disappear. Now the selected item has bright gold text, a glowing gold left-bar, and a clear background — it's immediately obvious where you are.
- For the same reason, the **first letter of a customer/supplier's avatar** (which was previously hard to see in dark mode) is now bright and clear.
- **New premium effects:** gold gradient buttons, glowing accent lines, coloured side-bars on stat tiles, soft depth/shadow on cards, and a smooth glass-blur background with a gold top-accent on modal popups.
- **The app now always opens in Light theme** — regardless of the phone/browser's Dark mode setting. (The Dark theme code is still present, the app just forces light mode so the look stays consistent.)
- This is purely a look-and-feel update — no data, calculations or features have changed.
- **If the old look still shows after the update**, follow the steps in the "If the old app still shows after an update" section below (you will need to clear the cache, since this was a big visual change).

---

## Print Bill — Background Watermark Logo is Now Optional

If you have uploaded a Company Logo in Settings, that logo used to also automatically appear as a faint background watermark in the middle of every print (invoice/statement). This is now **optional**:

- In Settings → **Invoice Customization**, there is a checkbox called "**Show background watermark logo on print**".
- **ON** (default, same as before) — the logo shows as a faint background watermark in the middle of the bill/statement.
- **OFF** — the sheet prints completely **plain**, with only a small logo showing in the header at the top (if one is uploaded) — no watermark in the middle.
- Once this setting is saved, it applies to every new print (both invoice and ledger/statement).

---

## Fix: Another account will no longer get Jokerwal's data (+ cleanup option)

There used to be a bug — every copy of this app has JOKERWAL BROTHERS' old Excel history built in (so the real owner could import their history in one click), but the **"Import JOKERWAL BROTHERS Excel History"** button was showing up in Settings for EVERY account (every login signed up with a different email) — meaning that if another business using this same app pressed that button, Jokerwal Brothers' data (customers, products, invoices, ledger) would end up in their own account.

**This has now been fixed:**

- The **"Import JOKERWAL BROTHERS Excel History"** button now only shows up when logged in with **jokerwalbrothers@gmail.com** — this option will not appear at all in any other email/account.
- **If an account already accidentally has this data** (imported before this fix existed), a new button will automatically appear in that account's Settings: **"Remove Imported JOKERWAL BROTHERS Data"**. This button only shows up when such data is found.
  - This will remove only the records that match the real Jokerwal history (identified by fixed IDs) — that account's own data (customers/products/bills they added themselves) stays completely safe, and nothing extra is deleted.
  - Note: if the Company Profile (name/address/GST) was also changed because of the import, it will not revert automatically — please check and correct it yourself in the Company Profile fields at the top of Settings.

## Products — Added Length (Meter/Feet) to Qty Type

When adding/editing a product, the "Qty Type" dropdown previously only had **Piece** and **Weight (gm)**. Now, for items like lace/chain/thread/ribbon that are sold by length, two new options have been added:

- **Length (Meter)** — quantity will show in "meter" in both stock and bills.
- **Length (Feet)** — quantity will show in "feet" in both stock and bills.

When adding/editing a product, just choose the correct type in "Qty Type" — everything else (rate, billing, stock tracking) works exactly the same as before.

---

## Quotation System (Create an Estimate, Convert to a Bill Later)

You can now first give a customer just an **estimate/quotation** — without reducing stock or changing the customer's balance — and once the customer says yes, convert that same quotation into a real bill with one tap.

**How to use it:**

1. Tap **"New Quotation"** in the bottom/side menu (there is also a quick-action button on the Dashboard).
2. Enter the customer's name/mobile, scan/search and add products, and optionally set a "Valid Till" date (how many days this rate is valid for).
3. Click **Save Quotation** — a quotation number (like `QUO/26-27/000001`) will be created. From here you can immediately **Print Quotation** (to give the customer a PDF) or **Convert to Bill**.
4. The printed PDF clearly says "QUOTATION" (not INVOICE), and does not have lines like "Payment"/"Balance Due" — it only shows a "Quotation Total", so the customer doesn't mistake it for an actual bill.
5. From the **"Quotations"** menu you can see a list of all quotations — the status shows as **Open** (not yet made into a bill), **Converted** (already made into a bill), or **Cancelled** (customer said no).
6. Whenever the customer confirms the order, open that quotation and click **"Convert to Bill"** — the New Bill screen will fill in automatically with the customer and all the items, so just enter the Payment Mode/Received Amount and click **Save Bill**. Stock will reduce and the customer's balance/ledger will update — exactly like a normal bill. That quotation's status will automatically become "Converted" and will also show the number of the bill it was converted into.
7. If the customer cancels the order, open the quotation and click **Cancel** (a quotation that has already been converted to a bill cannot be cancelled).

The Quotation Prefix (like `QUO`) can be changed from the "Quotation Prefix" field in Settings → Company Profile.

---

## Authorized Signature — Upload Once, Prints Automatically on Every Bill

There is no longer a need to sign every printed bill by hand. Upload your signature photo once in Settings, and it will print automatically in the "Authorized Signatory" box on every invoice.

**How to use it:**

1. In Settings → Company/Invoice Details section, upload a photo of your signature in the **"Authorized Signature"** field.
2. For the best result, use a **transparent PNG with the background removed** — for example, sign on white paper and remove the background using a background-remover app/website. A normal photo will also work, but will look a bit like it's in a box.
3. As soon as it's uploaded, a preview will show, and you can remove it anytime using the "Remove Signature" button.
4. From now on, whenever a bill or quotation is printed/turned into a PDF, this signature will automatically print below "For {Company Name}" and above the "Authorized Signatory" line — no need to sign by hand again.

---

## Data Sharing — One Product/Customer Master for Multiple Companies Under One Login

If you have created 2 or more companies under the same Gmail login (for example, 2 branches of the same shop, or 2 kinds of business under one shop), you can now share the **Products and Customers Master (including stock and customer balance)** between these companies — so the same inventory/customer list shows in both places. Bills, Invoices, Ledger and Payments always stay **separate** for each company — only Products and Customers, plus their stock/balance, are shared.

**How to use it:**

1. Go to the company whose master data should now match another company's, and open **Settings**.
2. In the **"Data Sharing (Multi-Company)"** card below, use the dropdown to choose the company whose Products/Customers master you want to use.
3. Click **Save Sharing Setting** and confirm. Now this company will show the same Products/Customers list as the other one, and changing stock or a customer's balance in one place will instantly update it in the other (since both are using the same master data).
4. **To turn sharing off** (if you no longer want it), choose **"No — keep this company's own separate Master Data"** in the dropdown again and click Save Sharing Setting. This company will go back to its own **old, separate (independent)** Products/Customers data — whatever data it had before sharing started will show again.

**Important:** This is only an OPTION — by default, every company's master data always stays separate — another company's data only starts showing when you deliberately go and turn sharing ON for a company.

---

## Paid Access — A System for Selling the App to New Users (for the Admin/Owner)

This app can now serve **multiple separate businesses** from a single link/Firebase project (each Gmail sign-up's data stays completely separate/private). To offer this to other users as a **paid** product, a "Paid Access Gate" has been added:

- Whenever a NEW Gmail account signs up through this app's link, that account starts out **LOCKED** — it sees a "Payment Pending" screen and cannot use any feature until **you** (the app owner) activate it.
- Simply sharing the app's LINK is completely safe — signing up through the link does not give anyone access on its own; only you can activate it.
- This is not just a UI screen — it is also locked at the level of the Firestore Security Rules, so even a technical user cannot bypass it using the browser's "Developer Tools".

**Required Setup (3 things, done once):**

1. **Update the Firestore Rules** — go to Firebase Console → Firestore Database → the Rules tab, and **replace** the old Rules from PART 1 with the ones below (this feature will not work unless both are pasted in):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null && request.auth.token.email == 'jokerwalbrothers@gmail.com';
    }
    function isPaid(uid) {
      return exists(/databases/$(database)/documents/licenses/$(uid)) &&
             get(/databases/$(database)/documents/licenses/$(uid)).data.paid == true;
    }
    match /licenses/{uid} {
      allow read: if request.auth != null && (request.auth.uid == uid || isAdmin());
      allow create: if request.auth != null && request.auth.uid == uid
                    && request.resource.data.paid == false;
      allow update: if isAdmin();
    }
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid && (isAdmin() || isPaid(uid));
    }
  }
}
```

   These Rules make sure that: (a) only the app owner (`jokerwalbrothers@gmail.com`) can mark any account as "Paid" — no one can do this on their own; (b) until an account is "Paid", none of its business data (customers/products/bills etc.) can be read or written — this isn't just closed off in the app's UI, it is actually locked at the database level.

2. **Set your Razorpay Payment Page and WhatsApp number** — open this `index.html` file in a text/code editor (Notepad, VS Code), use `Ctrl+F` to find **`PASTE_YOUR_RAZORPAY_PAYMENT_PAGE_LINK_HERE`**, and paste your Razorpay **Payment Page** link there (Razorpay Dashboard → Payment Pages → "+ Create Payment Page").

   ⚠️ **Important:** Do NOT use Razorpay's "**Payment Links**" option — a Payment Link only works for ONE customer (Razorpay itself asks for the customer's number/email, and that same link cannot be used by someone else to pay again). What you need is **"Payment Pages"** — this gives you one reusable link that any number of different new customers (i.e. your new shop-owner customers) can use to pay. Step by step:
   1. Log in to your Razorpay Dashboard → go to **Payment Pages** in the left menu.
   2. Click the **"+ Create Payment Page"** button.
   3. Give it a title (for example "Jokerwal Billing App — Activation"), and a short description if you like.
   4. Keep the Amount field as **Fixed Amount** and enter your one-time activation price (or you can also keep it as "Customer Decides" if you want it to be flexible).
   5. Fill in the business/contact details and click **Save & Publish**.
   6. Once published, you will get a shareable link (like `https://pages.razorpay.com/...`) — paste this exact link in place of **`PASTE_YOUR_RAZORPAY_PAYMENT_PAGE_LINK_HERE`**. This ONE link can be used again and again by all new customers, each entering their own name/number/email.

   In the same way, find **`PASTE_YOUR_WHATSAPP_NUMBER_HERE`** and enter your WhatsApp number with the country code, without a `+` or spaces (for example `919876543210`). Only upload the file again to GitHub Pages after editing these 2 spots.

3. **Your own account** (`jokerwalbrothers@gmail.com`) is **never locked** — you will never see the "Payment Pending" screen yourself, whether or not the Rules have been updated.

**How to activate a new customer:**

1. When a new user signs up, they will see the "Payment Pending" screen — from there, they can pay using your Razorpay link or the WhatsApp button.
2. Once the payment is confirmed (check the Razorpay dashboard or a WhatsApp screenshot), log in with your own account and go to **"Paid Accounts (Admin)"** in the menu (in the Settings sidenav, or under the "Admin" section of the "More" menu on mobile).
3. Every new sign-up will show there with a "Pending" status — click **"Activate"** next to it. The customer's account will unlock immediately (they just need to click "I Have Made the Payment — Check Status", or log in again).
4. If you ever need to remove someone's access (for example, a failed payment/refund), click **"Lock"** next to that account in the same list to lock it again.

**Note:** This is a one-time payment model — once an account is activated, it stays unlocked forever (unless you press "Lock" yourself). If you want a recurring/monthly subscription in the future, that would need to be built separately.

---

## Notes

- This uses Firebase's **free (Spark) plan** — for a small billing shop, this limit will practically never run out (it gives roughly 50,000 free reads/day).
- The "Change Firebase project" button (below the login screen) lets you connect a different Firebase project anytime you need to — you should normally never need to touch this.
- On the Settings page, "Export Backup" lets you download a JSON backup file from time to time for extra safety.

## If the old app still shows after an update (one-time fix)

To let the app work offline when "installed" on a phone's home screen, there is a small "service worker" file (`sw.js`) that keeps the app cached (remembered). Its first version cached things a bit too aggressively — so even after a new update (like the GST or multi-company fixes) was pushed to GitHub, the old version could still show up. `sw.js` now always tries the latest version first, but if you had already opened the app once before, you may need to manually clear that OLD cache once:

1. First, open your live link in an **Incognito/Private tab** and check — if the new version shows up there, the update has worked correctly, and it's just your normal browser's cache that is old.
2. To clear the cache in your normal browser: Chrome → the site's 3-dot menu, or the (i) icon next to the address bar → **Site settings** → **Clear & reset** (or "Storage" → "Clear data").
3. If you had used "Add to Home Screen" for the app on your phone, remove/uninstall that old icon, open the link in the browser again after clearing the cache, and use "Add to Home Screen" again.
4. This will not happen again — the new `sw.js` will always check the internet for the latest version first.
