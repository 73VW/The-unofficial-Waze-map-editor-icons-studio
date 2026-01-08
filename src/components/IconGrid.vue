<template>
  <section class="icon-grid-section">
    <!-- Icon Grid -->
    <div class="icon-grid">
      <button
        v-for="icon in filtered"
        :key="icon"
        type="button"
        class="icon-card"
        :class="{ selected: icon === selected }"
        :aria-label="t('selectIcon', { icon })"
        @click="selectIcon(icon)"
      >
        <div class="icon-card-preview">
          <span
            :class="`w-icon w-icon-${icon} w-icon-3x`"
            :style="{ color: '#ffffff' }"
          ></span>
        </div>
        <div class="icon-card-info">
          <span class="icon-card-name">{{ formatIconName(icon) }}</span>
          <code class="icon-card-class">w-icon-{{ icon }}</code>
        </div>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useI18n } from "../composables/useI18n";
import { useAppState } from "../composables/useAppState";

const { t } = useI18n();
const { filtered, selected, setSelected } = useAppState();

const searchQuery = ref("");

const statusText = computed(() => {
  if (!filtered.value.length && searchQuery.value) {
    return t("statusFiltered", { count: 0, query: searchQuery.value, s: "s" });
  }
  if (searchQuery.value) {
    const suffix = filtered.value.length > 1 ? "s" : "";
    return t("statusFiltered", {
      count: filtered.value.length,
      query: searchQuery.value,
      s: suffix,
    });
  }
  return t("statusFull", { count: filtered.value.length });
});

const formatIconName = (icon: string) => {
  if (!icon) return "";
  const spaced = icon.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

const selectIcon = (icon: string) => {
  setSelected(icon);
};

// Watch for changes in the search input from TopBar
watch(filtered, () => {
  // The filtered list is already updated by the parent component
});
</script>

<style scoped>
.icon-grid-section {
  @apply w-full;
}

.icon-grid {
  @apply grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
}

.icon-card {
  @apply flex bg-white text-left transition;
  padding: 16px;
  gap: 12px;
  min-height: 80px;
  border-radius: 6px;
  border: 1px solid #e3e6eb;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
  align-items: stretch;
  cursor: pointer;
}

.icon-card:hover {
  box-shadow: rgba(60, 64, 67, 0.3) 0px 2px 3px 0px,
    rgba(60, 64, 67, 0.15) 0px 6px 10px 4px;
}

.icon-card.selected {
  border-color: #2d9cff;
  box-shadow: 0 4px 10px rgba(45, 156, 255, 0.12);
}

.icon-card.selected:hover {
  box-shadow: 0 4px 12px rgba(45, 156, 255, 0.16);
}
.icon-card:hover .icon-card-preview {
  background-color: var(--waze-primary-hover);
}

.icon-card-preview {
  @apply flex items-center justify-center flex-shrink-0;
  background-color: var(--waze-primary);
  border-radius: 9999px;
  aspect-ratio: 1 / 1;
  height: 100%;
  min-height: 48px;
  max-height: 56px;
  padding: 6px;
}

.icon-card-preview .w-icon {
  @apply flex items-center justify-center;
  width: 100%;
  height: 100%;
  font-size: 26px;
  line-height: 1;
  color: #ffffff;
}

.icon-card-info {
  @apply flex flex-col flex-1 min-w-0 justify-center;
  gap: 0;
}

.icon-card-name {
  @apply block truncate;
  font-size: 12px;
  line-height: 20px;
  color: rgb(51, 51, 51);
  font-weight: 500;
}

.icon-card.selected .icon-card-name {
  color: rgb(51, 51, 51);
  font-weight: 500;
}

.icon-card-class {
  @apply block truncate;
  font-size: 12px;
  line-height: 20px;
  color: rgb(114, 118, 125);
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
}

.icon-card.selected .icon-card-class {
  color: rgb(114, 118, 125);
  background: transparent;
  border: none;
}

/* Responsive breakpoints */
@media (min-width: 640px) {
  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  }
}

@media (min-width: 1024px) {
  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  }
}

@media (min-width: 1280px) {
  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  }
}
</style>
