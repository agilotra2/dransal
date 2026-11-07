# Gentle Hands Home Care

A responsive homepage using the supplied logo's navy, turquoise and gold, with white and pale mint surfaces. Care services and planning a conversation are the primary journey.

## Preview

Run `python3 scripts/build-homepage.py`, then `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist` and open http://127.0.0.1:4173. The Python build uses only the standard library. Edit `src/index.template.html`, `content/services.json` and `src/icons.html`, then rebuild `dist/index.html`. Styles and browser JavaScript live directly in `dist/`.

## Layout and behaviour

The homepage contains a compact hero, care services, practical care principles, a three-step planning guide, an inline care-note form and FAQs. Figtree typography uses named role tokens; spacing uses a shared scale. Desktop services use vertical tabs with arrow, Home and End navigation. Phones show all five services as native expandable rows. “Plan this care” preselects the corresponding form option. Mobile navigation supports Escape.

Motion is limited to the hero photograph's entrance, service-content feedback, disclosure icons and controls. Reduced-motion preferences remove the hero entrance and smooth scrolling, and shorten service feedback. Text is never hidden behind a scroll animation. Default nursing content, mobile service disclosures and FAQs are in HTML.

## Checklist and contact scope

The form asks for the care category and timeframe only. It prepares a care note and relevant questions for copying or downloading. It does not collect names, phone numbers, medical records, or other personal data, and does not send an enquiry or make a booking. Contact details, service area, confirmed service offerings and policies still need to be supplied before launch. Choices remain in page memory. Google Fonts is used; there are no analytics scripts.

## Assets

- `dist/assets/gentle-hands-logo.png`: original supplied full seal, preserved in the footer.
- `dist/assets/gentle-hands-mark.png`: transparent header pictogram prepared from the supplied logo with image generation; a raster derivative, not a vector master.
- `dist/assets/gentle-hands-care.jpg`: the original generated care image, used once.
- `output/imagegen/gentle-hands-care.png`: retained generated original.
- `output/imagegen/prompt.md`: saved generation prompt and provenance.
- `output/imagegen/mark-prompt.md`: saved logo preparation prompt and provenance.
- `PRODUCT.md` and `DESIGN.md`: audience, visual rules and known business gaps.
- `docs/impeccable-review.md`: design decisions, scan findings and verification.

## Deployment

The existing private Site identity is retained in `.openai/hosting.json`; deploy `dist/` through Sites.
