import { ref, computed } from 'vue';
import type { AppState, SizeOption, Lang } from '../types';

const CSS_URL = 'https://web-assets.waze.com/waze-web-icons/v16.11.1/waze-web-icons.css';

const fontVersion = ref<string>('');

const state = ref<AppState>({
  icons: [],
  filtered: [],
  selected: 'search',
  size: '2x',
  lang: 'en',
  utilities: [],
  filteredUtilities: [],
  sizes: [],
  iconColor: '#1e293b',
  selectedUtility: '',
  utilityPalette: [],
});

const loading = ref(true);
const error = ref<string | null>(null);

export function useAppState() {
  const icons = computed(() => state.value.icons);
  const filtered = computed(() => state.value.filtered);
  const selected = computed(() => state.value.selected);
  const size = computed(() => state.value.size);
  const lang = computed(() => state.value.lang);
  const utilities = computed(() => state.value.utilities);
  const filteredUtilities = computed(() => state.value.filteredUtilities);
  const sizes = computed(() => state.value.sizes);
  const iconColor = computed(() => state.value.iconColor);
  const selectedUtility = computed(() => state.value.selectedUtility);
  const utilityPalette = computed(() => state.value.utilityPalette);

  const setSelected = (icon: string) => {
    state.value.selected = icon;
    refreshUtilityPalette();
  };

  const setSelectedUtility = (utility: string) => {
    state.value.selectedUtility = utility;
  };

  const setSize = (newSize: SizeOption) => {
    state.value.size = newSize;
  };

  const setLang = (newLang: Lang) => {
    state.value.lang = newLang;
  };

  const setIconColor = (color: string) => {
    state.value.iconColor = color;
  };

  const setFiltered = (query: string) => {
    const normalized = query.trim().toLowerCase();
    state.value.filtered = normalized
      ? state.value.icons.filter((icon) => {
          const iconName = icon.toLowerCase();
          const iconClass = `w-icon-${icon}`.toLowerCase();
          return iconName.includes(normalized) || iconClass.includes(normalized);
        })
      : [...state.value.icons];
  };

  const setFilteredUtilities = (query: string) => {
    const normalized = query.trim().toLowerCase();
    state.value.filteredUtilities = normalized
      ? state.value.utilities.filter((util) => {
          const utilName = util.toLowerCase();
          const utilClass = `w-icon-${util}`.toLowerCase();
          return utilName.includes(normalized) || utilClass.includes(normalized);
        })
      : [...state.value.utilities];
  };

  const refreshUtilityPalette = () => {
    if (!state.value.icons.length) return;
    const pool = state.value.icons.filter((name) => name !== state.value.selected);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    state.value.utilityPalette = shuffled.slice(0, 4);
  };

  const randomIcon = () => {
    if (!state.value.icons.length) return 'search';
    const pool = state.value.icons.filter((name) => name !== state.value.selected);
    if (!pool.length) return state.value.selected;
    const idx = Math.floor(Math.random() * pool.length);
    return pool[idx];
  };

  const parseCSSForClasses = async () => {
    try {
      loading.value = true;
      error.value = null;

      // Extract version from CSS_URL (e.g., "v16.11.1")
      const versionMatch = CSS_URL.match(/\/v([\d.]+)\//);
      if (versionMatch) {
        fontVersion.value = `v${versionMatch[1]}`;
      }

      const response = await fetch(CSS_URL);
      if (!response.ok) throw new Error('CSS_LOAD_ERROR');
      const css = await response.text();

      // Extract icons (classes with ::before)
      const iconMatches = [...css.matchAll(/\.w-icon-([a-z0-9-]+)::before/g)];
      const iconNames = Array.from(new Set(iconMatches.map((m) => m[1]))).sort();

      // Extract sizes
      const sizeMatches = [...css.matchAll(/\.w-icon-(xs|sm|lg|\d+x)\b/g)];
      const sizeNames = Array.from(new Set(sizeMatches.map((m) => m[1])));

      const sortSize = (a: string, b: string) => {
        const order = ['xs', 'sm', 'lg'];
        const isNum = (v: string) => /^\d+x$/.test(v);
        const aIdx = order.indexOf(a);
        const bIdx = order.indexOf(b);
        if (aIdx !== -1 || bIdx !== -1) {
          if (aIdx === -1) return 1;
          if (bIdx === -1) return -1;
          return aIdx - bIdx;
        }
        if (isNum(a) && isNum(b)) {
          return parseInt(a, 10) - parseInt(b, 10);
        }
        return a.localeCompare(b);
      };
      sizeNames.sort(sortSize);

      // Extract all w-icon-* classes
      const allClasses = [...css.matchAll(/\.w-icon-([a-z0-9-]+)/g)].map((m) => m[1]);
      const sizeSet = new Set(sizeNames);
      const iconSet = new Set(iconNames);

      // Utilities are all classes except base w-icon, sizes, and icon names
      const utilityNames = Array.from(
        new Set(
          allClasses.filter(
            (cls) => cls !== 'w-icon' && !sizeSet.has(cls) && !iconSet.has(cls),
          ),
        ),
      ).sort();

      state.value.icons = iconNames;
      state.value.utilities = utilityNames;
      state.value.sizes = sizeNames;
      state.value.filtered = [...iconNames];
      state.value.filteredUtilities = [...utilityNames];

      // Set default size if current size is not in the list
      if (sizeNames.length && !sizeNames.includes(state.value.size)) {
        state.value.size = sizeNames[0];
      }

      // Set default selected icon
      const defaultIcon = iconNames.includes('search') ? 'search' : iconNames[0];
      if (defaultIcon) {
        state.value.selected = defaultIcon;
      }

      // Set default selected utility
      if (utilityNames.length && !state.value.selectedUtility) {
        state.value.selectedUtility = utilityNames[0];
      }

      refreshUtilityPalette();

      loading.value = false;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      error.value = message;
      loading.value = false;
      throw err;
    }
  };

  return {
    state,
    icons,
    filtered,
    selected,
    size,
    lang,
    utilities,
    filteredUtilities,
    sizes,
    iconColor,
    selectedUtility,
    utilityPalette,
    loading,
    error,
    fontVersion,
    setSelected,
    setSelectedUtility,
    setSize,
    setLang,
    setIconColor,
    setFiltered,
    setFilteredUtilities,
    randomIcon,
    parseCSSForClasses,
  };
}
