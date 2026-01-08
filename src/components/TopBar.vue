<template>
  <header class="topbar sticky top-0 z-30">
    <div class="topbar-inner">
      <div class="topbar-left">
        <button
          class="topbar-icon"
          type="button"
          :aria-label="t('topBarMenuLabel')"
          @click="togglePanel"
        >
          <span class="w-icon w-icon-hamburger-menu"></span>
        </button>
        <div class="brand">
          <span class="brand-unofficial">{{ t('topBarEyebrow') }}</span>
          <img
            src="https://web-assets.waze.com/webapps/wme/v2.326-5-gb5354f7241-20251209094239-production/font/a7e3ce2dd90f3cab/logo.svg"
            alt="wazemapeditor"
            class="brand-logo"
          />
          <span class="brand-badge">{{ t('topBarBadge') }}</span>
        </div>
      </div>
      <div class="topbar-center">
        <div class="search-shell">
          <span class="w-icon w-icon-search text-slate-400"></span>
          <input
            id="search"
            v-model="searchQuery"
            type="search"
            :placeholder="searchPlaceholder"
            class="search-input"
            autocomplete="off"
            @input="onSearch"
          />
        </div>
      </div>
      <div class="topbar-right">
        <div class="about-dropdown" ref="aboutDropdown">
          <button type="button" class="about-trigger" @click="toggleAboutMenu">
            <span class="w-icon w-icon-info-fill"></span>
          </button>
          <div class="about-menu" :class="{ hidden: !aboutMenuOpen }">
            <div class="about-content">
              <h3 class="about-title">{{ t('aboutTitle') }}</h3>
              <p class="about-version">{{ t('aboutVersion') }} {{ version }}</p>
              <p class="about-font">{{ t('aboutFontVersion') }} {{ fontVersion }}</p>

              <p class="about-description">
                {{ t("aboutDescription") }}
              </p>

              <p class="about-warning">⚠️ {{ t("aboutWarning") }}</p>

              <div class="about-links">
                <a
                  href="https://github.com/73VW/Waze-map-editor-icons-helper/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="about-link"
                >
                  <span class="w-icon w-icon-github"></span>
                  {{ t('aboutGitHub') }}
                </a>
              </div>

              <p class="about-copyright">{{ t('aboutCopyrightYear') }} {{ t("aboutCopyright") }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, defineEmits, defineProps } from "vue";
import { useI18n } from "../composables/useI18n";
import { useAppState } from "../composables/useAppState";

const { t } = useI18n();
const { setFiltered, setFilteredUtilities } = useAppState();

const props = defineProps<{
  activeTab: 'preview' | 'utilities' | 'settings';
  activeContentTab: 'preview' | 'utilities';
}>();

const emit = defineEmits<{
  "toggle-panel": [];
}>();

const searchQuery = ref("");
const aboutMenuOpen = ref(false);
const aboutDropdown = ref<HTMLElement | null>(null);

const version = "1.0.0";
const fontVersion = "v2.326-5";

const searchPlaceholder = computed(() => {
  return props.activeContentTab === 'utilities'
    ? t('searchPlaceholderUtilities')
    : t('searchPlaceholder');
});

const toggleAboutMenu = () => {
  aboutMenuOpen.value = !aboutMenuOpen.value;
};

const onSearch = () => {
  if (props.activeContentTab === 'utilities') {
    setFilteredUtilities(searchQuery.value);
  } else {
    setFiltered(searchQuery.value);
  }
};

const togglePanel = () => {
  emit("toggle-panel");
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    aboutDropdown.value &&
    !aboutDropdown.value.contains(event.target as Node)
  ) {
    aboutMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);

  // Handle Ctrl+F / Cmd+F
  const handleKeydown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
      event.preventDefault();
      const searchInput = document.getElementById("search") as HTMLInputElement;
      searchInput?.focus();
      searchInput?.select();
    }
  };

  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
