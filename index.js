import { defineConfig } from 'vitepress'

/**
 * Shared VitePress site chrome for Skippr product docs.
 * Product configs pass name, hostname, nav, and sidebar.
 */
export function defineSkipprDocs({
  name,
  hostname,
  description,
  nav = [],
  sidebar = {},
  extraThemeConfig = {},
  ...rest
}) {
  const origin = `https://${hostname}`
  return defineConfig({
    title: name,
    description,
    outDir: './.vitepress/dist',
    base: '/',
    cleanUrls: true,
    lastUpdated: true,
    ignoreDeadLinks: true,
    sitemap: { hostname: origin },
    head: [
      ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
      ['meta', { property: 'og:site_name', content: name }],
    ],
    themeConfig: {
      logo: '/logo.png',
      siteTitle: name,
      nav,
      sidebar,
      outline: [2, 3],
      socialLinks: [{ icon: 'github', link: `https://github.com/skipprd` }],
      footer: {
        message: 'Source-available under PolyForm Shield 1.0.0',
        copyright: `Copyright © ${new Date().getFullYear()} Skippr Ltd`,
      },
      ...extraThemeConfig,
    },
    ...rest,
  })
}

export { default as theme } from './theme.js'
