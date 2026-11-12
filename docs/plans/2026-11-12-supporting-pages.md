# Gentle Hands Supporting Pages Implementation Plan

**Goal:** Extend the approved homepage design to a complete set of core supporting pages.

**Architecture:** Keep the existing static Python build and shared service JSON. Generate real directory-based routes with shared navigation, footer, brand tokens and responsive styles. Keep care planning local to the browser and preserve the existing private Site identity.

**Tech Stack:** Semantic HTML, CSS, vanilla JavaScript and Python standard library.

## Approved design and scope

The user approved the homepage and requested remaining pages. Carry its Figtree typography, navy/teal/mint/gold, compact spacing, transparent header mark and restrained motion through About, Services, five service detail pages, Care Guides, three practical guide articles, FAQs, Contact and factual privacy information. Use distinctive layouts for the directory, editorial pages and planning form. Keep content grounded in the existing preview service categories. Unknown contact details and service availability remain explicit.

Alternatives considered: duplicating standalone HTML would create maintenance drift; a client-rendered router would add unnecessary dependency and routing complexity. Shared static templates provide direct URLs and readable content without JavaScript.

## Tasks

1. Extract shared header/footer/head into the build and update homepage navigation. Generate nested routes with absolute local asset links and a real 404 page.
2. Build the service directory and five detail pages from shared content; link detail actions to the care-note form with the correct category selected.
3. Add About, family guide directory and three practical articles, with original non-clinical planning copy and related-service links.
4. Add categorised FAQs with search, Contact with the existing care-note workflow, and factual privacy information. General navigation must work independently of optional page features.
5. Verify build output: every local route/fragment/asset, unique page titles, single h1, no unresolved template variables, valid JSON and JavaScript syntax. Check responsive layouts and critical flows in the browser if available.
6. Update product/design context and verification notes, then package the exact pushed source with Sites and publish privately.

## Acceptance

Every navigation destination is a real page; nested routes load directly. All five service pages have distinct relevant content. Mobile navigation, FAQs and care-note preselection work. No fabricated contact details, business history, staff profiles, statistics, testimonials or promised clinical outcomes. The homepage retains its approved visual direction.
