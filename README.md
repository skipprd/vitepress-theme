# @skippr/vitepress-theme

[![CI](https://github.com/skipprd/vitepress-theme/actions/workflows/ci.yml/badge.svg)](https://github.com/skipprd/vitepress-theme/actions/workflows/ci.yml)

Shared VitePress theme for Skippr product docs (`custom.css`, `InstallTabs`, `defineSkipprDocs`).

This package is **source-available** under [PolyForm Shield 1.0.0](./LICENSE), not OSI open source.

```js
import { defineSkipprDocs } from '@skippr/vitepress-theme'

export default defineSkipprDocs({
  name: 'Skipprd',
  hostname: 'elt.skippr.io',
  description: 'Self-hosted ELT engine',
  nav: [{ text: 'Guide', link: '/' }],
  sidebar: { '/': [{ text: 'Home', link: '/' }] },
})
```

Point `docs/.vitepress/theme/index.js` at `@skippr/vitepress-theme/theme`.
