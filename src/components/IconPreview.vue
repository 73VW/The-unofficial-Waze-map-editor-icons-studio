<template>
  <div class="icon-preview-panel">
    <div class="panel-header">
      <div class="header-left">
        <span class="header-icon">
          <i :class="iconClass(headerIconName)"></i>
        </span>
        <div class="header-text">
          <span class="header-title">{{ t('iconPreviewTitle') }}</span>
          <span class="header-subtitle">{{ t('iconPreviewClass') }} w-icon-{{ selected }}</span>
        </div>
      </div>
    </div>

    <div class="tabs">
      <button type="button" class="tab active">{{ t('iconPreviewTabGeneral') }}</button>
    </div>

    <div class="panel-body">
      <div class="icon-info">
        <div class="field">
          <div class="field-label">{{ t('iconPreviewFieldName') }}</div>
          <div class="field-value">{{ formatIconName(selected) }}</div>
        </div>
        <div class="field">
          <div class="field-label">{{ t('iconPreviewFieldClass') }}</div>
          <div class="field-value-with-copy">
            <span class="field-value">w-icon-{{ selected }}</span>
            <button
              type="button"
              class="copy-class-btn"
              :class="{ copied: isClassCopied }"
              :aria-label="t('copyInstruction')"
              @click="copyIconClass"
            >
              <i
                class="w-icon"
                :class="isClassCopied ? 'w-icon-checkmark' : 'w-icon-copy'"
              ></i>
            </button>
          </div>
        </div>
      </div>

      <div class="preview-title">{{ t('iconPreviewSectionPreview') }}</div>

      <!-- Preview Area -->
      <button
        class="preview-container"
        type="button"
        :aria-label="t('copyInstruction')"
        @click="copyClassName"
      >
        <span
          class="preview-copy"
          :class="{ copied: isCopied }"
          aria-hidden="true"
        >
          <i
            class="w-icon"
            :class="isCopied ? 'w-icon-checkmark' : 'w-icon-copy'"
          ></i>
        </span>
        <div class="preview-inner">
          <span :class="previewClasses" :style="{ color: iconColor }"></span>
        </div>
      </button>

      <!-- Size Selector -->
      <div class="size-section">
        <span class="section-label">{{ t("size") }}</span>
        <div class="size-pills-row">
          <button
            v-for="s in sizes"
            :key="s"
            type="button"
            class="size-pill"
            :class="{ active: s === currentSize }"
            :aria-pressed="s === currentSize"
            @click="changeSize(s)"
          >
            {{ s }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "../composables/useI18n";
import { useAppState } from "../composables/useAppState";

const { t } = useI18n();
const {
  selected,
  size: currentSize,
  sizes,
  iconColor,
  iconColor: currentColor,
  setSize,
} = useAppState();

const isCopied = ref(false);
const isClassCopied = ref(false);

const previewClasses = computed(() => {
  return `w-icon w-icon-${selected.value} w-icon-${currentSize.value}`;
});

const iconClass = (name: string) => {
  return `w-icon w-icon-${name}`;
};

const formatIconName = (icon: string) => {
  if (!icon) return "";
  const spaced = icon.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

const headerIconName = computed(() => selected.value || "search");

const changeSize = (newSize: string) => {
  setSize(newSize);
};

const copyClassName = async () => {
  const classString = `w-icon w-icon-${selected.value} w-icon-${currentSize.value}`;
  try {
    await navigator.clipboard.writeText(classString);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 1200);
  } catch (error) {
    console.error("Failed to copy:", error);
  }
};

const copyIconClass = async () => {
  const classString = `w-icon-${selected.value}`;
  try {
    await navigator.clipboard.writeText(classString);
    isClassCopied.value = true;
    setTimeout(() => {
      isClassCopied.value = false;
    }, 1200);
  } catch (error) {
    console.error("Failed to copy:", error);
  }
};
</script>

<style scoped>
.icon-preview-panel {
  @apply space-y-0;
}

.panel-header {
  @apply flex items-center justify-between;
  min-height: 47px;
  padding: 12px 16px 6px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.header-left {
  @apply flex items-center gap-3;
}

.header-icon {
  font-size: 18px;
  color: #7c8594;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
}

.header-text {
  @apply flex flex-col;
  gap: 2px;
}

.header-title {
  @apply text-xs font-semibold tracking-[0.12em] uppercase text-slate-700;
}

.header-subtitle {
  @apply text-xs font-semibold;
  color: rgb(114, 118, 125);
}

.header-chevron {
  @apply h-8 w-8 grid place-items-center rounded-full border border-slate-200 bg-white text-slate-600;
  font-size: 16px;
}

.tabs {
  @apply flex items-center;
  width: 100%;
}

.tab {
  @apply text-sm font-semibold text-[#5f6b7c];
  flex: 1;
  border: none;
  background: transparent;
  cursor: pointer;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #e5e7eb;
}

.tab.active {
  color: rgb(0, 117, 227);
  border-bottom: 3px solid rgb(0, 117, 227);
}

.panel-body {
  @apply space-y-4;
  padding: 16px;
}

.icon-info {
  @apply space-y-4;
}

.field {
  @apply flex flex-col;
  gap: 8px;
}

.field-label {
  font-size: 14px;
  line-height: 20px;
  color: #202124;
  font-weight: 600;
}

.field-value {
  font-size: 14px;
  line-height: 20px;
  color: rgb(51, 51, 51);
  background: rgb(242, 244, 247);
  border-radius: 6px;
  padding: 10px 12px;
}

.field-value-with-copy {
  @apply relative flex items-center gap-2;
}

.field-value-with-copy .field-value {
  @apply flex-1;
}

.copy-class-btn {
  @apply flex items-center justify-center w-8 h-8 rounded transition bg-slate-100 hover:bg-slate-200;
  flex-shrink: 0;
  color: #5b6472;
  border: 1px solid #d5d7db;
  cursor: pointer;
}

.copy-class-btn.copied {
  @apply bg-emerald-100 border-emerald-300;
  color: #10b981;
}

.copy-class-btn .w-icon {
  font-size: 14px;
}

.preview-title {
  font-size: 14px;
  line-height: 20px;
  color: #202124;
  font-weight: 600;
  margin-bottom: 8px;
}

.preview-container {
  @apply rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center p-3 relative w-full cursor-pointer transition hover:border-slate-300;
  aspect-ratio: 1 / 1;
}

.preview-container:hover .preview-copy,
.preview-container:focus-within .preview-copy {
  @apply opacity-100;
}

.preview-inner {
  @apply rounded-xl bg-white border border-slate-200 shadow-inner flex items-center justify-center;
  padding: 10%;
}

.preview-inner span {
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.size-section {
  @apply space-y-2;
}

.section-label {
  font-size: 14px;
  line-height: 20px;
  color: #202124;
  font-weight: 600;
}

.size-pills-row {
  @apply flex flex-wrap gap-2;
}

.size-pill {
  @apply inline-flex items-center bg-white transition;
  padding: 0 8px;
  border: 1px solid #d5d7db;
  border-radius: 24px;
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.2px;
  box-sizing: border-box;
  height: 24px;
  gap: 4px;
  max-width: 200px;
  vertical-align: top;
  cursor: pointer;
  color: #202124;
}

.size-pill:hover {
  background: rgba(68, 71, 70, 0.04);
}

.size-pill.active {
  background: var(--waze-primary);
  color: var(--on_primary, #ffffff);
  border-color: var(--waze-primary);
}
</style>
