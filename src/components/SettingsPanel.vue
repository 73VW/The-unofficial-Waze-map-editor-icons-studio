<template>
  <div class="settings-panel">
    <div class="panel-header">
      <span class="header-icon w-icon w-icon-hamburger-menu"></span>
      <span class="header-label">{{ t('settingsTitle') }}</span>
    </div>

    <div class="panel-body">
      <div class="settings-section">
        <label class="settings-label">{{ t('language') }}</label>
      <div class="lang-options">
        <button
          v-for="l in (['en', 'fr'] as Lang[])"
          :key="l"
          type="button"
          class="lang-option-btn"
          :class="{ active: l === currentLang }"
          @click="changeLang(l)"
        >
          <span class="lang-flag" :class="flagForLang[l]"></span>
          <span>{{ l === 'fr' ? t('languageFrench') : t('languageEnglish') }}</span>
        </button>
      </div>
    </div>

    <div class="settings-section">
      <label class="settings-label">{{ t('iconColor') }}</label>
      <div class="color-presets">
        <button
          v-for="preset in colorPresets"
          :key="preset.value"
          type="button"
          class="color-preset-btn"
          :class="{ active: preset.value === currentColor }"
          :style="{ backgroundColor: preset.value }"
          :aria-label="preset.label"
          @click="changeColor(preset.value)"
        >
          <span v-if="preset.value === currentColor" class="checkmark">✓</span>
        </button>
      </div>
      <div class="custom-color-section">
        <label for="custom-color" class="custom-color-label">{{ t('customColor') }}</label>
        <div class="custom-color-inputs">
          <input
            id="custom-color"
            type="color"
            :value="currentColor"
            class="color-picker"
            @input="onCustomColorChange"
          />
          <input
            type="text"
            :value="currentColor"
            class="color-text-input"
            placeholder="#000000"
            @input="onCustomColorTextChange"
          />
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n, flagForLang } from '../composables/useI18n';
import { useAppState } from '../composables/useAppState';
import type { Lang, ColorPreset } from '../types';

const { t, lang: currentLang, setLang } = useI18n();
const { iconColor: currentColor, setIconColor } = useAppState();

const colorPresets = computed<ColorPreset[]>(() => [
  { name: 'slate-800', value: '#1e293b', label: t('colorSlate800') },
  { name: 'blue-600', value: '#2563eb', label: t('colorBlue600') },
  { name: 'red-600', value: '#dc2626', label: t('colorRed600') },
  { name: 'green-600', value: '#16a34a', label: t('colorGreen600') },
  { name: 'amber-600', value: '#d97706', label: t('colorAmber600') },
  { name: 'purple-600', value: '#9333ea', label: t('colorPurple600') },
  { name: 'pink-600', value: '#db2777', label: t('colorPink600') },
  { name: 'black', value: '#000000', label: t('colorBlack') },
]);

const changeLang = (newLang: Lang) => {
  setLang(newLang);
};

const changeColor = (color: string) => {
  setIconColor(color);
};

const onCustomColorChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  setIconColor(target.value);
};

const onCustomColorTextChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value.trim();
  // Validate hex color
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
    setIconColor(value);
  }
};
</script>

<style scoped>
.settings-panel {
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

.settings-section {
  @apply space-y-2;
}

.settings-label {
  @apply block text-xs uppercase font-semibold text-slate-500 tracking-wide;
}

.lang-options {
  @apply space-y-1;
}

.lang-option-btn {
  @apply w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50;
}

.lang-option-btn.active {
  @apply bg-[#e9f3ff] text-[#1d7edb] border-[#b7dcff];
}

.lang-flag {
  @apply text-base inline-block;
}

.color-presets {
  @apply grid grid-cols-4 gap-2;
}

.color-preset-btn {
  @apply w-full aspect-square rounded-lg border-2 transition cursor-pointer flex items-center justify-center;
  border-color: #e2e8f0;
}

.color-preset-btn:hover {
  @apply scale-110;
}

.color-preset-btn.active {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.checkmark {
  @apply text-white font-bold text-sm;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.5));
}

.custom-color-section {
  @apply space-y-2;
}

.custom-color-label {
  @apply block text-xs text-slate-600;
}

.custom-color-inputs {
  @apply flex items-center gap-2;
}

.color-picker {
  @apply w-10 h-10 rounded-lg border border-slate-200 cursor-pointer;
}

.color-text-input {
  @apply flex-1 px-2 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#33a6ff] font-mono;
}
</style>
