import DefaultTheme from 'vitepress/theme'
import './custom.css'
import InstallTabs from './components/InstallTabs.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    if (DefaultTheme.enhanceApp) {
      DefaultTheme.enhanceApp({ app })
    }
    app.component('InstallTabs', InstallTabs)
  },
}
