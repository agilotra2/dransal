# Gentle Hands Home Care

A responsive website using the supplied logo's navy, turquoise and gold, with white and pale mint surfaces. Care services and planning a conversation are the primary journey.

## Maintainer map

Open [How Gentle Hands works](https://agilotra2.github.io/dransal/maintainer/) for an interactive overview of the editable files, HTML generation, deployments and browser-only care-note flow. Select a node to inspect its pinned source references; `T` switches themes, and the diagram controls provide zoom, search and route tracing.

The [standalone HTML](docs/architecture/how-gentle-hands-works.html) can also be downloaded and opened locally. Its [editable diagram source](docs/architecture/how-gentle-hands-works.architecture.json) and [maintenance notes](docs/architecture/README.md) are kept alongside it. This is developer documentation on a separate URL, outside customer navigation.

## Preview

Run `python3 scripts/build-homepage.py`, then `python3 -m http.server 4173 --bind 127.0.0.1 --directory dist` and open http://127.0.0.1:4173. The Python build uses only the standard library and generates all pages. Shared shell files live in `src/`; services and guide/FAQ content live in `content/`; supporting-page rendering lives in `scripts/supporting_pages.py`. Styles and browser JavaScript live directly in `dist/`.

Run `python3 scripts/verify-site.py`, `node --check dist/app.js` and `node --check dist/site.js` before publishing. The static verifier checks every generated page's links, fragments, assets, title and h1.

## Pages

- `/`: approved homepage, now linked to the supporting pages.
- `/services/`: directory with five detail routes for nursing, companionship, recovery, physiotherapy and daily care.
- `/about/`: care philosophy and the supplied brand seal.
- `/guides/`: three practical family planning guides, each with its own article URL.
- `/faqs/`: 12 answers grouped by topic, with local search and a clear-search action.
- `/contact/`: care-note workflow; service links preselect the category through `?care=...`.
- `/privacy/`: factual description of the current website's data handling.
- `/404.html`: navigation back to useful pages when a route is missing.

## Layout and behaviour

The homepage contains a compact hero, care services, practical care principles, a three-step planning guide, an inline care-note form and FAQs. Figtree typography uses named role tokens; spacing uses a shared scale. Desktop services use vertical tabs with arrow, Home and End navigation. Phones show all five services as native expandable rows. “Plan this care” preselects the corresponding form option. Mobile navigation supports Escape.

Motion is limited to the hero photograph's entrance, service-content feedback, disclosure icons and controls. Reduced-motion preferences remove the hero entrance and smooth scrolling, and shorten service feedback. Text is never hidden behind a scroll animation. Default nursing content, mobile service disclosures and FAQs are in HTML.

## Checklist and contact scope

The form asks for the care category and timeframe only. It prepares a care note and relevant questions for copying or downloading. It does not collect names, phone numbers, medical records, or other personal data, and does not send an enquiry or make a booking. Contact details, service area, confirmed service offerings and policies still need to be supplied before launch. Choices remain in page memory. Google Fonts is used; there are no analytics scripts.

## Assets

- `dist/assets/gentle-hands-logo.png`: original supplied logo, displayed unchanged in the header, footer, About page and favicon. Only display dimensions scale; no cropping, masks, recolouring or replacement artwork.
- `dist/assets/gentle-hands-care.jpg`: the original generated care image, used once.
- `output/imagegen/gentle-hands-care.png`: retained generated original.
- `output/imagegen/prompt.md`: saved generation prompt and provenance.
- `output/imagegen/mark-prompt.md`: saved logo preparation prompt and provenance.
- `PRODUCT.md` and `DESIGN.md`: audience, visual rules and known business gaps.
- `docs/impeccable-review.md`: design decisions, scan findings and verification.
- `docs/supporting-pages-verification.md`: verification for the supporting-page expansion.

## Deployment

The existing private Site identity is retained in `.openai/hosting.json`; deploy `dist/` through Sites.

GitHub Pages uses `.github/workflows/pages.yml` to build and publish the website artifact from `_site/`. Repository Settings → Pages must use **GitHub Actions** as its source. Publishing the repository root through Jekyll displays this README instead of the website.

The Pages build reads its base path from the hosting configuration (currently `/dransal`) and prefixes assets, navigation and dynamically generated service links. To check it locally:

```sh
python3 scripts/build-pages.py --base-path /dransal
python3 scripts/verify-site.py --directory _site --base-path /dransal
```

The root-hosted `dist/` build is retained for the existing Sites deployment. `_site/` is generated and ignored by Git.
