# Gentle Hands Home Care

A single responsive homepage for Gentle Hands Home Care. The supplied logo is preserved, with its navy, turquoise, and gold carried into an ivory-based website design. All navigation stays within this homepage.

## Preview

Run `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist` and open http://127.0.0.1:4173.

## Scope

The homepage contains service browsing, service details, a care approach, a three-step explanation, brand values, FAQs, and an enquiry preparation form. It has no server, booking, callback, messaging, or patient-record storage. The form prepares a summary that the visitor can copy or download; it does not submit anywhere. Contact details, service area, confirmed service offerings, and business policies are still required before public launch.

The displayed services are proposed homepage content and require owner confirmation. No statistics, patient testimonials, accreditation, or guaranteed response times are invented.

## Assets

- `dist/assets/gentle-hands-logo.png`: original supplied logo screenshot, displayed without modifying its colours.
- `dist/assets/gentle-hands-care.jpg`: optimised hero image generated with the built-in image tool. It is illustrative, not a real patient or testimonial.
- `output/imagegen/gentle-hands-care.png`: retained generated original.
- `output/imagegen/prompt.md`: generation prompt and provenance.
- Original reference assets are retained in `docs/reference-assets/` and are not deployed.

## Deployment

Reuse the Site identity in `.openai/hosting.json`; static output is `dist/`. The homepage is privately published via Sites.
