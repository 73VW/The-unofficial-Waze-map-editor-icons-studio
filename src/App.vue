<template>
  <div class="app-container">
    <TopBar :active-tab="activeTab" :active-content-tab="activeGrid" @toggle-panel="togglePanel" />

    <div class="app-body">
      <!-- Left Icon Bar (always visible, 80px) -->
      <IconBar
        :active-tab="activeTab"
        @update:active-tab="activeTab = $event"
      />

      <!-- Side Panel (opens/closes, 330px) -->
      <SidePanel :active-tab="activeTab" :is-open="isPanelOpen" />

      <!-- Main Content -->
      <main id="app-main" class="main-content">
        <IconGrid v-if="activeGrid === 'preview'" />
        <UtilitiesGrid v-else-if="activeGrid === 'utilities'" />
      </main>
    </div>

    <ScrollTopButton />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import TopBar from "./components/TopBar.vue";
import IconBar from "./components/IconBar.vue";
import SidePanel from "./components/SidePanel.vue";
import IconGrid from "./components/IconGrid.vue";
import UtilitiesGrid from "./components/UtilitiesGrid.vue";
import ScrollTopButton from "./components/ScrollTopButton.vue";
import { useAppState } from "./composables/useAppState";
import { useI18n } from "./composables/useI18n";

const { parseCSSForClasses } = useAppState();
const { initLang } = useI18n();

const activeTab = ref<"preview" | "utilities" | "settings">("preview");
const isPanelOpen = ref(true);
const lastContentTab = ref<"preview" | "utilities">("preview");

// Track which grid to display
const activeGrid = computed(() => {
  if (activeTab.value === 'preview' || activeTab.value === 'utilities') {
    return activeTab.value;
  }
  // When in settings, show the last active grid
  return lastContentTab.value;
});

// Watch activeTab to remember the last content tab (not settings)
watch(activeTab, (newTab) => {
  if (newTab === 'preview' || newTab === 'utilities') {
    lastContentTab.value = newTab;
  }
});

const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value;
};

onMounted(async () => {
  initLang();
  await parseCSSForClasses();
});
</script>

<style scoped>
.app-container {
  @apply min-h-screen bg-[#f5f7fb] flex flex-col;
}

.app-body {
  @apply flex;
  height: calc(100vh - 64px);
  overflow: hidden;
}

.main-content {
  @apply flex-1 px-3 md:px-6 py-4;
  scrollbar-gutter: stable;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
