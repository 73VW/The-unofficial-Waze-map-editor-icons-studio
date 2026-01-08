<template>
  <div
    class="utility-card"
    :class="{ selected: isSelected }"
    role="button"
    @click="handleSelect"
  >
    <button
      class="copy-indicator"
      type="button"
      :class="{ copied: isCopied }"
      aria-hidden="true"
      @click.stop="copyUtilityClass"
    >
      <i
        class="w-icon"
        :class="isCopied ? 'w-icon-checkmark' : 'w-icon-copy'"
      ></i>
    </button>

    <div class="util-info">
      <span class="util-name">{{ formatUtilityName(utilityClass) }}</span>
      <code class="util-class">.w-icon-{{ utilityClass }}</code>
    </div>

    <div class="canvas">
      <div class="scene-grid">
        <div class="scene scene-inline">
          <div class="scene-title">{{ t("demoSceneInlineText") }}</div>
          <div class="inline-row">
            <span class="pill">
              <i
                v-for="icon in inlineIcons"
                :class="iconClass(icon)"
                :style="{ color: iconColor }"
                :key="`inline-${icon}`"
              ></i>
            </span>
            <span class="inline-text">
              <i :class="iconClass(iconName)" :style="{ color: iconColor }"></i>
              {{ t("demoTextLorem") }}
            </span>
          </div>
          <div class="positioning">
            <div class="pos-box">
              <i
                :class="iconClass(deckIcons[1])"
                :style="{ color: iconColor }"
              ></i>
              <span>{{ t("demoTextLeftAligned") }}</span>
            </div>
            <div class="pos-box pos-center">
              <i
                :class="iconClass(deckIcons[2])"
                :style="{ color: iconColor }"
              ></i>
              <span>{{ t("demoTextCentered") }}</span>
            </div>
            <div class="pos-box pos-right">
              <span>{{ t("demoTextRight") }}</span>
              <i
                :class="iconClass(deckIcons[3])"
                :style="{ color: iconColor }"
              ></i>
            </div>
          </div>
        </div>

        <div class="scene scene-media">
          <div class="scene-title">{{ t("demoSceneMediaBlock") }}</div>
          <div class="media-card">
            <div class="media-icon">
              <i
                :class="iconClass(iconName, '2x')"
                :style="{ color: '#ffffff' }"
              ></i>
            </div>
            <div class="media-copy">
              <span class="media-title">{{ t("demoMediaTitle") }}</span>
              <span class="media-meta">
                {{ t("demoMediaText") }}
              </span>
            </div>
          </div>
        </div>

        <div class="scene scene-cta">
          <div class="scene-title">{{ t("demoSceneButtonsBadges") }}</div>
          <div class="cta-row">
            <button type="button" class="ghost-btn">
              <i
                :class="iconClass(deckIcons[2])"
                :style="{ color: iconColor }"
              ></i>
            </button>
            <button type="button" class="pill-btn">
              <i :class="iconClass(iconName)" :style="{ color: iconColor }"></i>
              {{ t("demoButtonAction") }}
            </button>
            <span class="badge">
              <i
                :class="iconClass(deckIcons[3])"
                :style="{ color: iconColor }"
              ></i>
              {{ t("demoBadgeNumber") }}
            </span>
          </div>
        </div>

        <div class="scene scene-fw">
          <div class="scene-title">{{ t("demoSceneFixedWidthSlots") }}</div>
          <div class="slot-grid">
            <div
              class="slot"
              v-for="icon in fixedWidthIcons"
              :key="`slot-${icon}`"
            >
              <i :class="iconClass(icon)" :style="{ color: iconColor }"></i>
              <span class="slot-text">{{ t("demoTimeExample") }}</span>
            </div>
          </div>
        </div>

        <div class="scene scene-borders">
          <div class="scene-title">{{ t("demoSceneBorders") }}</div>
          <div class="border-grid">
            <div class="border-box">
              <i :class="iconClass(iconName)" :style="{ color: iconColor }"></i>
            </div>
            <div class="border-box dashed">
              <i
                :class="iconClass(deckIcons[1])"
                :style="{ color: iconColor }"
              ></i>
            </div>
            <div class="border-box thick">
              <i
                :class="iconClass(deckIcons[2])"
                :style="{ color: iconColor }"
              ></i>
            </div>
          </div>
        </div>

        <div class="scene scene-swatches">
          <div class="scene-title">{{ t("demoSceneColorsBadges") }}</div>
          <div class="swatch-row">
            <span class="swatch swatch-blue">
              <i :class="iconClass(iconName)" :style="{ color: iconColor }"></i>
            </span>
            <span class="swatch swatch-amber">
              <i
                :class="iconClass(deckIcons[1])"
                :style="{ color: iconColor }"
              ></i>
            </span>
            <span class="swatch swatch-emerald">
              <i
                :class="iconClass(deckIcons[2])"
                :style="{ color: iconColor }"
              ></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useAppState } from "../composables/useAppState";
import { useI18n } from "../composables/useI18n";

const props = defineProps<{
  utilityClass: string;
  iconName: string;
  isSelected?: boolean;
}>();

const emit = defineEmits<{
  (e: "select", utility: string): void;
}>();

const { iconColor, utilityPalette } = useAppState();
const { t } = useI18n();

const isCopied = ref(false);

const deckIcons = computed(() => {
  const combined = [props.iconName, ...utilityPalette.value];
  while (combined.length < 4) {
    combined.push(props.iconName);
  }
  return Array.from(new Set(combined)).slice(0, 4);
});

const inlineIcons = computed(() => deckIcons.value.slice(0, 3));

const fixedWidthIcons = computed(() => deckIcons.value);

const iconClass = (name: string, size?: string) => {
  const safeName = name || props.iconName;
  const sizeClass = size ? ` w-icon-${size}` : "";
  return `w-icon w-icon-${safeName} w-icon-${props.utilityClass}${sizeClass}`;
};

const formatUtilityName = (utilityClass: string) => {
  if (!utilityClass) return "";
  const spaced = utilityClass.replace(/-/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
};

const handleSelect = () => {
  emit("select", props.utilityClass);
};

const copyUtilityClass = async () => {
  try {
    await navigator.clipboard.writeText(`.w-icon-${props.utilityClass}`);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 1200);
  } catch (error) {
    console.error("Failed to copy:", error);
  }
};
</script>

<style scoped>
.utility-card {
  @apply w-full rounded-lg border border-slate-200 bg-white p-4 transition relative;
  cursor: pointer;
  text-align: left;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
  background-image: linear-gradient(
      0deg,
      rgba(39, 60, 117, 0.06) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(39, 60, 117, 0.06) 1px, transparent 1px);
  background-size: 20px 20px;
}

.utility-card:hover {
  border-color: #9fbdea;
  box-shadow: 0 6px 14px rgba(51, 166, 255, 0.12);
}

.utility-card.selected {
  border-color: #2d9cff;
  box-shadow: 0 4px 12px rgba(45, 156, 255, 0.18);
}

.copy-indicator {
  @apply absolute top-3 right-3 flex items-center justify-center w-7 h-7 rounded transition;
  opacity: 0.6;
  color: #5b6472;
  background: #eef1f7;
}

.copy-indicator.copied {
  opacity: 1;
  color: #10b981;
  background: #d1fae5;
}

.utility-card:hover .copy-indicator,
.utility-card:focus-within .copy-indicator {
  opacity: 1;
}

.util-info {
  @apply flex flex-col mb-3;
  gap: 0;
}

.util-name {
  @apply block truncate;
  font-size: 12px;
  line-height: 20px;
  color: rgb(51, 51, 51);
  font-weight: 600;
}

.util-class {
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

.scene-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}

.scene {
  border: 1px dashed #d7dce5;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: transparent;
}

.scene-title {
  font-size: 11px;
  line-height: 16px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.scene-inline .inline-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.positioning {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
}

.pos-box {
  position: relative;
  padding: 10px;
  border-radius: 10px;
  border: 1px dashed #d7dce5;
  background: #f8fbff;
  color: #4b5563;
  font-size: 12px;
  line-height: 18px;
}

.pos-box::after {
  content: "";
  display: block;
  clear: both;
}

.pos-center {
  text-align: center;
}

.pos-right {
  text-align: right;
}

.pos-box i {
  margin-right: 6px;
}

.pos-right i {
  margin-left: 6px;
  margin-right: 0;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  min-height: 36px;
  border-radius: 10px;
  background: #eaf1ff;
  border: 1px solid #d2dbe6;
}

.pill i {
  font-size: 16px;
  line-height: 1;
}

.inline-text {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  line-height: 18px;
  color: #4b5563;
  padding: 6px 10px;
  background: #f6f8fb;
  border-radius: 8px;
  border: 1px solid #e0e6f0;
}

.media-card {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border-radius: 6px;
  background: #ffffff;
  border: 1px solid #e3e6eb;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
}

.utility-card:hover .media-icon {
  background-color: var(--waze-primary-hover);
}

.media-icon {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--waze-primary);
  color: #ffffff;
}

.media-copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.media-title {
  font-size: 12px;
  line-height: 20px;
  color: rgb(51, 51, 51);
  font-weight: 600;
}

.media-meta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  line-height: 20px;
  color: rgb(114, 118, 125);
}

.scene-borders .border-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
  gap: 8px;
}

.border-box {
  @apply grid place-items-center;
  border-radius: 12px;
  height: 60px;
  border: 1px solid #d8e2f1;
  background: #f8fbff;
}

.border-box.dashed {
  border-style: dashed;
}

.border-box.thick {
  border-width: 2px;
}

.scene-swatches .swatch-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.swatch {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.swatch-blue {
  background: #e5f0ff;
  border-color: #c4dafb;
}

.swatch-amber {
  background: #fff4e5;
  border-color: #f3d5a5;
}

.swatch-emerald {
  background: #e7f7f0;
  border-color: #c1ead8;
}

.scene-cta .cta-row {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.ghost-btn,
.pill-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 10px;
  background: #eef3ff;
  border: 1px solid #d0dcf2;
  color: #1f2937;
  font-size: 12px;
  line-height: 18px;
  transition: all 0.2s ease;
}

.ghost-btn {
  padding: 8px;
}

.ghost-btn:hover,
.pill-btn:hover {
  border-color: #adc7f3;
  background: #e7f0ff;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 9999px;
  background: #eaf3ff;
  border: 1px solid #c4d9f8;
  font-size: 12px;
  color: #1f2937;
}

.scene-fw .slot-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
  gap: 8px;
}

.slot {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 10px;
  background: #fdfefe;
  border: 1px dashed #d7dce5;
}

.slot-text {
  font-size: 12px;
  line-height: 18px;
  color: #4b5563;
}
</style>
