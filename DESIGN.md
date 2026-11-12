# Website design rules

## Direction

Clear, personal home care. White and pale mint provide readability; navy carries strong actions and the care-principles section. Dark teal connects text and interactions to the logo. Gold remains a restrained accent. Avoid decorative medical claims, generic credibility statistics and ornamental UI.

## Typography

Figtree is the shared family, with Helvetica/sans-serif fallback. Role tokens in `dist/styles.css` are authoritative: display 42–64px, section 30–40px, component heading 22px, body 16px, lead 18px, supporting text 14px, navigation 15px and brand 26px before responsive adjustments. Preserve semantic hierarchy and consistent roles. Avoid repeated italic headings, uppercase eyebrows and tiny labels.

## Spacing and layout

Use the 4/8/12/16/24/32/48/64px spacing scale. Desktop section padding is fluid between 40 and 56px; containers supply horizontal insets. Group related controls closely and leave larger gaps between meaningful groups. Keep the hero to one photo. No separate announcement strip, arbitrary progress line, photo outline, ornamental section numbering or repeated card grids.

Desktop services use a vertical selector and adjacent panel. At 700px and below, replace it with stacked native disclosures so all five service names are discoverable. Do not restore a horizontally hidden service strip. Small-screen forms stack their labelled controls.

## Interaction and motion

The photo entrance is the single welcome moment: 620ms, 12px horizontal travel, starting at 82% opacity. Service changes use 180ms opacity feedback; reduced motion shortens that to 80ms and removes the hero entrance and smooth scrolling. Button and disclosure feedback is brief. Do not add blanket scroll reveals or hide essential copy while waiting for animation.

Use native details/summary, visible focus indicators, labelled native selects, large action targets, keyboard-operable tabs and polite status feedback. Maintain a single h1 and clear h2/h3 sections.

## Brand assets

Use only the original supplied logo file throughout the website, including the header, footer, About page and favicon. Display the whole image with its original proportions and colours. Do not extract, regenerate, crop, mask, round the corners of, or otherwise alter the logo. Do not add a substitute wordmark. The care photograph is generated illustrative imagery, disclosed in the preview information.

## Supporting pages

Use the shared header and footer on every route. A persistent active-page underline replaces the homepage's section tracking. Directory pages use substantial linked rows; service details pair practical context with discussion prompts; articles use a readable main column and an in-page contents list. About uses navy and the supplied full seal. FAQs use grouped native disclosures and browser-local search. Contact reuses the existing local care-note workflow, including preselection from service links. Keep the unknown business details explicit and avoid invented staff, histories, testimonials or programmes.
