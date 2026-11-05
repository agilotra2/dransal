# Gentle Hands Home Care

A single responsive homepage using the supplied logo, navy, turquoise, muted gold, and warm ivory.

## Preview

Run `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist` and open http://127.0.0.1:4173.

## Layout and behaviour

The rebuilt page uses one coherent stylesheet, an 88px desktop header, a compact hero with one photograph, a service selector, practical care principles, a three-step guide, FAQs, and a local checklist builder. Section spacing is 60px on desktop and 40px on mobile; regular copy is 15–18px, with smaller type reserved for supporting labels. Mobile service options scroll horizontally and support keyboard navigation.

Motion includes a staggered hero entrance, a photograph entrance, one-time scroll reveals, animated service changes, FAQ disclosure feedback, and button/nav hover states. Reduced-motion preferences disable these effects and leave all content visible. The page remains readable without JavaScript; the default nursing information and native FAQs are present in HTML.

## Checklist and contact scope

The checklist asks for the care category and timeframe only. It generates relevant questions for copying or downloading. It does not collect names, phone numbers, medical records, or other personal data, and does not send an enquiry or make a booking. Contact details, service area, actual service offerings, and business policies still need to be supplied before launch. Navigation and buttons describe their actual actions.

## Assets

- `dist/assets/gentle-hands-logo.png`: the original supplied logo. The header displays its central symbol with a readable wordmark; the footer displays the complete seal.
- `dist/assets/gentle-hands-care.jpg`: the original generated care image, used once.
- `output/imagegen/gentle-hands-care.png`: retained generated original.
- `output/imagegen/prompt.md`: saved generation prompt and provenance.

## Deployment

The existing private Site identity is retained in `.openai/hosting.json`; deploy `dist/` through Sites.
