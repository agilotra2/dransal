# Kokoro — Care comes home

A responsive, independent redesign concept based on https://kokoro.plus/home/.

## Preview

Run `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist` from this directory and open http://127.0.0.1:4173.

The website is dependency-free and deploys directly from `dist/`. Google Fonts provides DM Sans and Manrope, with local system fallbacks. Reference photography was retrieved from the supplied Kokoro website.

## Interactions

- Filterable service directory with detailed service dialogs.
- Three-step service-navigation guide, with a context-specific next step.
- Validated enquiry form, review/edit screen, and explicit WhatsApp handoff to Kokoro's published contact.
- Keyboard accessible equipment tabs, native FAQ disclosures, and mobile menu.
- Responsive layout, native modal focus containment, and reduced-motion support.

No booking, callback, payment, or medical assessment is performed. The site has no backend and does not persist form entries. Contact details remain in page memory until the page is refreshed; a visitor chooses whether to continue to WhatsApp and send the prepared message. External company and policy links go to the original service.

## Verification

Browser QA covered desktop and 390px mobile layouts, image loading, horizontal overflow, service filtering, the care-finder path to physiotherapy, enquiry preselection and review, required-field validation, mobile navigation and Escape, keyboard equipment tabs, FAQ disclosure, and browser errors. JavaScript passed `node --check dist/app.js`.
