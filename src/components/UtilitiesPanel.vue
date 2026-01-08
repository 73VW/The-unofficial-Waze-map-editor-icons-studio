<template>
  <div class="utilities-panel">
    <h3 class="panel-title">{{ t('utilities') }}</h3>
    <p class="panel-description">{{ t('utilitiesDescription') }}</p>

    <div class="utilities-list">
      <UtilityDemo
        v-for="util in utilities"
        :key="util"
        :utility-class="util"
        :icon-name="selected"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '../composables/useI18n';
import { useAppState } from '../composables/useAppState';
import UtilityDemo from './UtilityDemo.vue';

const { t } = useI18n();
const { selected, utilities } = useAppState();
</script>

<style scoped>
.utilities-panel {
  @apply space-y-4;
}

.panel-title {
  @apply text-base font-semibold text-slate-800;
}

.panel-description {
  @apply text-sm text-slate-600;
}

.utilities-list {
  @apply w-full;
}
</style>
