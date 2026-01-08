<template>
  <section class="utilities-grid-section">
    <div class="utilities-grid">
      <UtilityDemo
        v-for="util in filteredUtilities"
        :key="util"
        :utility-class="util"
        :icon-name="selected"
        :is-selected="util === selectedUtility"
        @select="selectUtility"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import UtilityDemo from './UtilityDemo.vue';
import { useAppState } from '../composables/useAppState';

const { filteredUtilities, selectedUtility, selected, setSelectedUtility } = useAppState();

const selectUtility = (util: string) => {
  setSelectedUtility(util);
};
</script>

<style scoped>
.utilities-grid-section {
  @apply w-full;
}

.utilities-grid {
  @apply grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (max-width: 1024px) {
  .utilities-grid {
    grid-template-columns: 1fr;
  }
}
</style>
