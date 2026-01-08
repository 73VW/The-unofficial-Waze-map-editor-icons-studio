<template>
  <aside class="sidebar" :class="{ collapsed: !isExpanded }">
    <!-- Hamburger Toggle Button -->
    <button
      type="button"
      class="hamburger-btn"
      @click="toggleSidebar"
      :aria-label="isExpanded ? 'Fermer le menu' : 'Ouvrir le menu'"
    >
      <span class="w-icon w-icon-hamburger-menu"></span>
    </button>

    <!-- Navigation Menu -->
    <nav class="sidebar-nav">
      <button
        type="button"
        class="nav-item"
        :class="{ active: activeTab === 'preview' }"
        @click="setActiveTab('preview')"
        :title="t('previewLabel')"
      >
        <span class="nav-icon w-icon w-icon-search"></span>
        <span class="nav-label" v-if="isExpanded">{{ t('previewLabel') }}</span>
      </button>
      <button
        type="button"
        class="nav-item"
        :class="{ active: activeTab === 'settings' }"
        @click="setActiveTab('settings')"
        :title="t('settings')"
      >
        <span class="nav-icon w-icon w-icon-settings"></span>
        <span class="nav-label" v-if="isExpanded">{{ t('settings') }}</span>
      </button>
    </nav>

    <!-- Tab Content (only visible when expanded) -->
    <div class="sidebar-content" v-if="isExpanded">
      <!-- Preview Tab -->
      <div v-if="activeTab === 'preview'" class="tab-panel">
        <IconPreview />
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'" class="tab-panel">
        <SettingsPanel />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from '../composables/useI18n';
import IconPreview from './IconPreview.vue';
import SettingsPanel from './SettingsPanel.vue';

const { t } = useI18n();
const activeTab = ref<'preview' | 'settings'>('preview');
const isExpanded = ref(true);

const toggleSidebar = () => {
  isExpanded.value = !isExpanded.value;
};

const setActiveTab = (tab: 'preview' | 'settings') => {
  activeTab.value = tab;
  // Auto-expand when clicking on a tab while collapsed
  if (!isExpanded.value) {
    isExpanded.value = true;
  }
};
</script>

<style scoped>
.sidebar {
  @apply h-full flex flex-col bg-white border-r border-slate-200 transition-all duration-300;
  width: 410px;
}

.sidebar.collapsed {
  width: 80px;
}

/* Hamburger Button */
.hamburger-btn {
  @apply w-full h-[74px] flex items-center justify-center text-slate-700 hover:bg-slate-50 border-b border-slate-200 transition;
}

.hamburger-btn .w-icon {
  @apply text-2xl;
}

/* Navigation Menu */
.sidebar-nav {
  @apply flex flex-col;
}

.nav-item {
  @apply w-full h-[74px] flex items-center gap-3 px-4 text-slate-600 hover:bg-slate-50 transition border-l-4 border-transparent;
  justify-content: flex-start;
}

.sidebar.collapsed .nav-item {
  @apply justify-center px-0;
}

.nav-item.active {
  @apply bg-[#e9f3ff] text-[#1d7edb] border-[#1d7edb];
}

.nav-icon {
  @apply text-2xl flex-shrink-0;
}

.nav-label {
  @apply text-sm font-semibold whitespace-nowrap;
}

/* Sidebar Content */
.sidebar-content {
  @apply flex-1 overflow-y-auto p-4 border-t border-slate-200;
}

.tab-panel {
  @apply space-y-4;
}

/* Responsive */
@media (max-width: 1024px) {
  .sidebar {
    width: 380px;
  }

  .sidebar.collapsed {
    width: 80px;
  }
}

@media (max-width: 768px) {
  .sidebar {
    @apply fixed left-0 top-[64px] z-40 shadow-lg;
    height: calc(100vh - 64px);
  }

  .sidebar.collapsed {
    width: 0;
    @apply border-r-0;
  }
}
</style>
