# Impeccable-informed homepage revision

Reviewed 7 November 2026. Source: https://github.com/pbakaus/impeccable. Applied its critique, simplification, typography, responsive-layout and purposeful-motion principles. No global skill installation or hooks were added.

## Changes

- Rebalanced the page around exploring care and planning a conversation. The question checklist is secondary to an inline care-note form.
- Replaced mixed serif/italic headings and scattered type sizes with Figtree and typography roles.
- Prepared a transparent header logo mark; retained the original full seal in the footer.
- Removed decorative section labels, photo framing, arbitrary progress decoration and blanket section entrances.
- Replaced the phone service strip with five visible expandable rows.
- Centralised service content in JSON; built desktop/mobile HTML from the same source.
- Added PRODUCT.md and DESIGN.md to retain audience, business constraints and visual rules.

## Source detector

The initial `impeccable detect --json dist` scan returned 17 findings, including undersized labels, repeated kickers, decorative stripes and shadow/palette concerns. The final scan returned five warnings, all `cramped-padding`; its nonzero exit status reports findings rather than a build failure. The JSON is retained in `impeccable-final.json`.

Each remaining warning was reviewed against the rendered page:

| Element | Review |
| --- | --- |
| Hero background wrapper | At 1280px, actual content has 48px horizontal and 32px vertical inset. Child container owns horizontal spacing. |
| Approach background wrapper | Actual content has 48px horizontal and approximately 51px vertical inset at 1280px. |
| Care-plan background wrapper | Same container and section padding as approach; no text touches the boundary. |
| Mobile services top divider | Summary rows own their padding and 76px minimum height; full-width divider groups the list. |
| FAQ top divider | Summaries have 24px vertical padding. Divider aligns with answers and section rather than enclosing a padded card. |

The detector caught 4.4:1 active-service text contrast during iteration. Darkening teal to #096f6b removed that finding. No remaining typography, contrast or decorative-pattern findings were reported by this source scan. This is not a comprehensive accessibility certification.

## Verification

- Python build, JavaScript syntax and Git whitespace checks passed.
- Browser checks at 1280, 768, 390 and 320px: document width matched viewport; no horizontal overflow. Hero and full-page screenshots reviewed.
- All displayed images loaded, including the logo mark. One h1. No warning/error console messages captured during the checked flow.
- Desktop service click and ArrowDown navigation updated content and selection; planning link preselected recovery care.
- Mobile menu opened and Escape closed it. All five service names were visible. Opening another service closed the previous row; planning from personal care selected the right form value.
- Required timeframe validation prevented incomplete submission. Valid choices generated a note; editing retained choices; service-specific questions updated. Copy displayed successful confirmation.
- Download click produced “Care note ready to save” feedback. In-app automation did not return a download artifact before timeout, so saving the file to disk was not independently confirmed.
- FAQ disclosure opened. Reduced-motion CSS/JavaScript paths were source reviewed; no OS preference was changed.

## Remaining business input

Contact details, service area and confirmed service scope are pending. There is no enquiry endpoint. Preserve the private audience until launch details and content are confirmed.
