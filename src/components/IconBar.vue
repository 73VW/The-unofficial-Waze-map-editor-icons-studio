<template>
  <aside class="icon-bar">
    <!-- Blue Wazer Button (decorative) -->
    <div class="wazer-button-container">
      <button type="button" class="wazer-button" aria-label="Wazer">
        <span class="w-icon w-icon-wazer"></span>
      </button>
    </div>

    <div class="separator"></div>

    <!-- Navigation Icons -->
    <button
      type="button"
      class="icon-bar-item"
      :class="{ active: activeTab === 'preview' }"
      @click="selectTab('preview')"
      :title="t('previewLabel')"
    >
      <span class="w-icon w-icon-search"></span>
      <span class="nav-label">{{ t("previewLabel") }}</span>
    </button>

    <button
      type="button"
      class="icon-bar-item"
      :class="{ active: activeTab === 'utilities' }"
      @click="selectTab('utilities')"
      :title="t('utilities')"
    >
      <span class="w-icon w-icon-toolbox"></span>
      <span class="nav-label">{{ t("utilities") }}</span>
    </button>

    <div class="separator"></div>

    <button
      type="button"
      class="icon-bar-item"
      :class="{ active: activeTab === 'settings' }"
      @click="selectTab('settings')"
      :title="t('settings')"
    >
      <span class="w-icon w-icon-settings"></span>
      <span class="nav-label">{{ t("settings") }}</span>
    </button>
  </aside>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";
import { useI18n } from "../composables/useI18n";

const { t } = useI18n();

defineProps<{
  activeTab: "preview" | "utilities" | "settings";
}>();

const emit = defineEmits<{
  "update:activeTab": [tab: "preview" | "utilities" | "settings"];
}>();

const selectTab = (tab: "preview" | "utilities" | "settings") => {
  emit("update:activeTab", tab);
};
</script>

<style scoped>
.icon-bar {
  @apply flex flex-col bg-white border-r border-slate-200;
  width: 80px;
  flex-shrink: 0;
}

/* Blue Wazer Button */
.wazer-button-container {
  @apply w-full flex items-center justify-center py-4;
}

.wazer-button {
  @apply w-12 h-12 rounded-full transition flex items-center justify-center text-white shadow-md;
  background-color: var(--waze-primary);
}

.wazer-button:hover {
  background-color: var(--waze-primary-hover);
}

.wazer-button .w-icon {
  font-size: 24px;
}

/* Separator */
.separator {
  @apply w-full border-b border-slate-200;
}

/* Navigation Items */
.icon-bar-item {
  @apply w-full h-[74px] flex flex-col items-center justify-center text-slate-600 hover:bg-slate-50 transition;
}

.icon-bar-item .w-icon {
  font-size: 24px;
}

.nav-label {
  font-size: 12px;
  line-height: 19px;
}

.icon-bar-item.active {
  @apply bg-[#e9f3ff] text-[#1d7edb];
}
</style>
