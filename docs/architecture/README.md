# How Gentle Hands works

[Open the interactive maintainer map](https://agilotra2.github.io/dransal/maintainer/), or download `how-gentle-hands-works.html` and open it in a browser. The HTML is self-contained. Source-code links require network access.

The map covers shared source files, Python HTML generation, the GitHub Pages build/check/deploy path, the separate manual Sites target, and the visitor's browser-only care-note flow. It records where to edit content, layouts, styles and the unchanged original logo. It shows authored responsibilities and relationships, not live infrastructure monitoring or measured runtime impact.

## Source snapshot

Code evidence is pinned to [0fac57ca1590012aa7aa07d21941239635a819c4](https://github.com/agilotra2/dransal/tree/0fac57ca1590012aa7aa07d21941239635a819c4), the original-logo restoration commit. There are 23 verified source references. The documentation publishing step added alongside this map is intentionally outside that snapshot. Regenerate the map after material architecture changes; source links do not automatically advance to the latest commit.

## Regeneration

Generated with [Archify v3.2.0](https://github.com/tt-a1i/archify/tree/v3.2.0), using temporary authoring tooling. Archify is not a website runtime dependency or a globally installed skill. The JSON beside this README is the editable input. Preserve the delivered HTML as generated: hand-editing it invalidates its local provenance receipt.

Use a clean checkout of the pinned source revision for evidence verification. With an Archify package available, run its supported delivery/check commands from the project root:

```sh
node /path/to/archify/bin/archify.mjs deliver architecture docs/architecture/how-gentle-hands-works.architecture.json docs/architecture/how-gentle-hands-works.html --repo-root /path/to/pinned-checkout --quality showcase --json
node /path/to/archify/bin/archify.mjs check docs/architecture/how-gentle-hands-works.html --require-provenance
```

The package's normal `finalize` workflow adds its own browser-driver gate. In this environment browser interaction was performed through the supported computer-use browser, so that bundled browser-driver gate was not run. Its status must not be reported as passed. Local machine-specific delivery receipts are ignored by Git; regenerate them when checking the artifact on another machine.

## Verification performed

- Archify static/schema/layout delivery: nine checks passed, zero errors and zero warnings.
- Repository evidence: 23 source ranges verified against the pinned Git commit.
- Strict artifact/provenance check passed for the generated HTML.
- Browser review through computer use: overview composition, node focus, source references, guide open/close and theme switching via `T` reviewed; no warning/error console entries were captured.
- Desktop widths 1440, 1600, 1920 and 2048px had no horizontal document overflow. Viewport overrides were reset afterward.
- Mobile usability and export downloads were not tested in this pass.

Verified HTML SHA-256: `c1451ec0ea3e17c3d3f6d098ba1173791d7e127067b3b87c66a5a6518bbc542f`.

## Publication and attribution

The GitHub Pages workflow first builds and checks the 16 customer documents, then copies this separately verified map unchanged to `_site/maintainer/index.html`. It is linked from the repository README and is absent from customer-facing navigation. The original customer pages and logo are unchanged by this documentation addition.

Archify's MIT license and third-party notices are retained in this folder and copied beside the published map. The standalone artifact also embeds its font-license notice.
