<template>
  <div class="utility-preview-panel">
    <div class="panel-header">
      <span class="header-icon w-icon w-icon-hamburger-menu"></span>
      <span class="header-label">{{ t('utilitiesTitle') }}</span>
    </div>
    <div class="panel-body">
      <UtilityDemo
        :utility-class="selectedUtility"
        :icon-name="selected"
        :is-selected="true"
        @select="noop"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import UtilityDemo from "./UtilityDemo.vue";
import { useAppState } from "../composables/useAppState";
import { useI18n } from "../composables/useI18n";

const { selectedUtility, selected } = useAppState();
const { t } = useI18n();

const noop = () => {};
</script>

<style scoped>
.utility-preview-panel {
  @apply space-y-0;
}

.panel-header {
  @apply flex items-center gap-2;
  min-height: 47px;
  padding: 12px 16px 8px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.header-icon {
  font-size: 18px;
  color: #7c8594;
}

.header-label {
  @apply text-xs font-semibold tracking-[0.12em] uppercase text-slate-600;
}

.panel-body {
  @apply space-y-4;
  padding: 16px;
}
</style>
