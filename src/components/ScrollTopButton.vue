<template>
  <button
    class="scroll-top-btn"
    :class="{ show: isVisible }"
    type="button"
    :aria-label="t('scrollTopButton')"
    @click="scrollToTop"
  >
    <span class="w-icon w-icon-chevron-up"></span>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from '../composables/useI18n';

const { t } = useI18n();
const isVisible = ref(false);

const updateVisibility = () => {
  const main = document.getElementById('app-main');
  if (main) {
    isVisible.value = main.scrollTop > 20;
  }
};

const scrollToTop = () => {
  const main = document.getElementById('app-main');
  if (main) {
    main.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  const main = document.getElementById('app-main');
  if (main) {
    main.addEventListener('scroll', updateVisibility);
  }
});

onUnmounted(() => {
  const main = document.getElementById('app-main');
  if (main) {
    main.removeEventListener('scroll', updateVisibility);
  }
});
</script>
