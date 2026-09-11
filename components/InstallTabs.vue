<template>
  <div class="install-cta" :class="{ 'install-cta-dark': dark }">
    <component :is="headingTag" v-if="showHeading" class="install-cta-title">{{ title }}</component>
    <p v-if="showDocsLink" class="install-cta-copy">
      See the
      <a :href="docsHref" target="_blank" rel="noopener">{{ docsLabel }}</a>
      for the full setup, including Windows PowerShell.
    </p>
    <div class="install-tabs">
      <button
        class="install-tab"
        :class="{ active: platform === 'unix' }"
        type="button"
        @click="platform = 'unix'"
      >macOS / Linux</button>
      <button
        class="install-tab"
        :class="{ active: platform === 'win' }"
        type="button"
        @click="platform = 'win'"
      >Windows</button>
    </div>
    <div class="install-cmd" @click="copyInstall">
      <code>{{ installCmd }}</code>
      <span class="copy-hint">{{ copied ? 'Copied!' : 'Click to copy' }}</span>
    </div>
    <p class="install-eula">
      Installing Skippr means accepting the
      <a :href="eulaHref" target="_blank" rel="noopener">Skippr EULA</a>.
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Install'
  },
  docsHref: {
    type: String,
    default: 'https://skippr.io/elt/'
  },
  docsLabel: {
    type: String,
    default: 'Install guide'
  },
  headingTag: {
    type: String,
    default: 'h2'
  },
  showHeading: {
    type: Boolean,
    default: true
  },
  showDocsLink: {
    type: Boolean,
    default: true
  },
  dark: {
    type: Boolean,
    default: false
  },
  eventCategory: {
    type: String,
    default: 'install_cta'
  },
  unixCmd: {
    type: String,
    default: 'curl -fsSL https://install.skippr.io/install.sh | sh'
  },
  winCmd: {
    type: String,
    default: 'irm https://install.skippr.io/install.ps1 | iex'
  },
  eulaHref: {
    type: String,
    default: 'https://skippr.io/terms/eula'
  }
})

const copied = ref(false)
const platform = ref('unix')

const installCmd = computed(() =>
  platform.value === 'win' ? props.winCmd : props.unixCmd
)

function copyInstall() {
  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    return
  }
  navigator.clipboard.writeText(installCmd.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<style scoped>
.install-cta {
  background: #f7f9fc;
  border: 1px solid #e0e7ef;
  border-radius: 8px;
  padding: 24px;
}

.install-cta-title {
  color: #222;
  font-size: 1.5em;
  font-weight: 700;
  margin: 0 0 10px;
}

.install-cta-copy {
  color: #445;
  font-size: 0.95em;
  line-height: 1.7;
  margin-bottom: 12px;
}

.install-cta-copy a {
  color: #03a0dc;
  text-decoration: none;
}

.install-cta-copy a:hover {
  text-decoration: underline;
}

.install-tabs {
  display: flex;
  gap: 0;
  margin-bottom: -1px;
}

.install-tab {
  background: #fff;
  border: 1px solid #30363d;
  border-bottom: none;
  color: #7d8590;
  cursor: pointer;
  font-size: 0.78em;
  font-weight: 600;
  padding: 6px 16px;
  transition: color 0.15s, background 0.15s;
}

.install-tab:first-child {
  border-radius: 6px 0 0 0;
}

.install-tab:last-child {
  border-radius: 0 6px 0 0;
}

.install-tab.active {
  background: #0d1117;
  color: #e6edf3;
}

.install-tab:hover:not(.active) {
  color: #c9d1d9;
}

.install-cmd {
  align-items: center;
  background: #0d1117;
  border: 1px solid #30363d;
  border-radius: 0 6px 6px 6px;
  cursor: pointer;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  padding: 14px 18px;
  transition: border-color 0.2s ease;
}

.install-cmd:hover {
  border-color: #03a0dc;
}

.install-cmd code {
  background: none;
  color: #e6edf3;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 0.88em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.copy-hint {
  color: #7d8590;
  flex-shrink: 0;
  font-size: 0.78em;
  white-space: nowrap;
}

.install-eula {
  color: #637083;
  font-size: 0.78em;
  line-height: 1.5;
  margin: 10px 0 0;
}

.install-eula a {
  color: #03a0dc;
  text-decoration: none;
}

.install-eula a:hover {
  text-decoration: underline;
}

.install-cta-dark {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}

.install-cta-dark .install-cta-title {
  color: #fff;
}

.install-cta-dark .install-cta-copy {
  color: rgba(255, 255, 255, 0.8);
}

.install-cta-dark .install-cta-copy a {
  color: #7dd7ff;
}

.install-cta-dark .install-eula {
  color: rgba(255, 255, 255, 0.68);
}

.install-cta-dark .install-eula a {
  color: #7dd7ff;
}

@media (max-width: 767px) {
  .install-cmd {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }

  .install-cmd code {
    font-size: 0.75em;
    white-space: normal;
    word-break: break-all;
  }
}
</style>
