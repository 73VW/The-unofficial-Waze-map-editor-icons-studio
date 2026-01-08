<template>
  <aside class="side-panel" :class="{ open: isOpen }">
    <div class="panel-content">
      <!-- Preview Tab -->
      <div v-if="activeTab === 'preview'" class="tab-panel">
        <IconPreview />
      </div>

      <!-- Utilities Tab -->
      <div v-if="activeTab === 'utilities'" class="tab-panel">
        <UtilityPreview />
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'" class="tab-panel">
        <SettingsPanel />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import IconPreview from './IconPreview.vue';
import UtilityPreview from './UtilityPreview.vue';
import SettingsPanel from './SettingsPanel.vue';

defineProps<{
  activeTab: 'preview' | 'utilities' | 'settings';
  isOpen: boolean;
}>();
</script>

<style scoped>
.side-panel {
  @apply bg-white border-r border-slate-200 transition-all duration-300 overflow-hidden;
  width: 0;
  flex-shrink: 0;
}

.side-panel.open {
  width: 330px;
}

.panel-content {
  @apply h-full overflow-y-auto;
  width: 330px;
}

.tab-panel {
  @apply space-y-0;
}

/* Responsive */
@media (max-width: 1024px) {
  .side-panel.open {
    width: 300px;
  }

  .panel-content {
    width: 300px;
  }
}

@media (max-width: 768px) {
  .side-panel {
    @apply fixed left-[80px] top-[64px] z-40 shadow-lg;
    height: calc(100vh - 64px);
  }

  .side-panel.open {
    width: 280px;
  }

  .panel-content {
    width: 280px;
  }
}
</style>
