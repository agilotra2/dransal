# Original logo restoration

The user requested the supplied logo unchanged throughout the website. The original `dist/assets/gentle-hands-logo.png` is now used for the shared header, shared footer, About page and favicon. The extracted mark has been removed from deployable assets. The substitute header/footer wordmark has been removed.

The original image bytes were not edited. SHA-256 before and after restoration, including the GitHub Pages artifact: `382e265129337afbce43cd7bacf3c16af39327fb34293e215a22c7ff2ccd14f9`.

Display sizing preserves the original 952×960 proportions. No circular clipping, masks, colour changes or generated replacement artwork is applied to the logo. Header spacing and anchor offsets accommodate the complete image.

Verification: both root-hosted and `/dransal/` builds pass all 16-page route/asset checks. Every generated page references the original logo; no deployable page or asset references the extracted mark. Desktop header/About and 320px mobile layouts were visually reviewed; the narrow layout has no horizontal overflow. About image rendered at 210×211.76px, matching the source proportions.
