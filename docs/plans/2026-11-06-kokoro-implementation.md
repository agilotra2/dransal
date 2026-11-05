# Kokoro Implementation Plan

**Goal:** Deliver a polished, responsive home healthcare website inspired by Kokoro.

**Architecture:** Static HTML/CSS with small JavaScript modules for progressive interactions. Images are bundled locally. Enquiries are prepared in the browser and handed explicitly to the verified official WhatsApp destination, with no patient storage.

**Tech Stack:** HTML, CSS, JavaScript, Python local preview, Sites hosting.

1. Create `dist/index.html`, `dist/styles.css`, `dist/app.js`, and bundled assets. Build the full narrative from hero to services, process, equipment, membership, FAQ, contact, and footer.
2. Add accessible service browsing, care finder, enquiry review, keyboard-dismissible dialogs, and mobile navigation. Links either navigate to real sections or verified official destinations.
3. Serve the static output. Verify desktop and mobile layouts, service filters, care finder, enquiry validation/review, FAQ, console, and keyboard behavior through browser QA.
4. Package exact source through the Sites helper, deploy privately, and open the result.
