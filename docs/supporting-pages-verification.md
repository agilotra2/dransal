# Supporting-page verification

12 November 2026. Extended the homepage direction approved by the user. The reference site was consulted for its navigation structure; Gentle Hands uses its own care categories and original planning copy. No reference-site staff, stories, credentials, membership products or contact details were transferred.

## Implemented scope

About, Services, five service detail pages, care-guide directory, three guide articles, FAQs, Contact, factual privacy information and a 404 page. Shared navigation and footer appear on every route. Homepage service panels link to detail pages; detail-page actions carry the chosen category to Contact. Guides organise non-clinical planning questions rather than providing treatment instructions or patient testimonials.

## Checks

- Static build produced 16 HTML documents, including the homepage and 404 page.
- Route-graph verification passed: all local links, fragments, scripts, styles, SVG references and image assets resolve. Every page has a unique title, unique IDs and a single h1. No template tokens remain.
- Both JavaScript files passed syntax checking. No console warnings or errors were captured during the browser flows.
- Desktop visual review covered the service directory, service detail, About, guide directory and article layouts. Shared colours, typography, insets and heading roles match the homepage.
- At 320px, document width matched the viewport across all layout types: homepage, directory, long service title, physiotherapy detail, About, guide directory, article, FAQs, Contact and privacy. Image assets loaded.
- At 768px, the directory, service detail, About, article, FAQs and Contact had no horizontal overflow. The stacked form controls remained readable.
- At 390px, mobile navigation opened, closed with Escape and closed after following a page link. Service and planning layouts were visually reviewed.
- Nursing and companion service links preselected the correct care type on Contact. Required timeframe validation blocked incomplete submission. Valid choices produced the expected care note. No enquiry was submitted.
- FAQ search returned two matches for “care note”, handled an unmatched query, and restored all 12 answers after clearing. A disclosure opened its answer. Selecting a topic also clears a filter so the target group is visible.
- Homepage service selection and its new detail link were checked after the shared-navigation change.
- Reduced-motion behavior retains the existing homepage implementation; supporting pages add no entrance animations.

## Limits and business input

The existing care-note download implementation is retained; this pass did not independently verify saving a downloaded file to disk. Direct phone/email, coverage, confirmed offerings, availability, credentials and care-service policies remain pending. The site has no enquiry endpoint or booking system. Preserve owner-only publication access.
