# Homepage design rules

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

The header uses a separately prepared transparent raster pictogram plus readable wordmark. The original seal stays in the footer. Never simulate extraction by oversized CSS cropping. The care photograph is generated illustrative imagery, disclosed in the preview information.
