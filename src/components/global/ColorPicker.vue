<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import Button from './Button.vue';
import Icon from './Icon.vue';

const generateTWColors = (colors: string[]) => {
  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  return colors.map(color => ({
    name: color,
    shades: Object.fromEntries(
      shades.map(shade => [
        shade,
        `bg-${color}-${shade}`
      ])
    )
  }));
};

defineProps<{
  type: string
}>();

const emit = defineEmits<{
  (e: 'color-selected', baseColor: string, shade: number, opacity: number, hsv: {h: number, s: number, l: number, a: number}): void
  (e: 'reset'): void
}>();

const colorNames = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
const TWpalette = generateTWColors(colorNames);

const shadeChosen = ref(false);
const baseColor = ref("");
const chosenShades = ref<string[]>([]);
const selectedShade = ref<number | null>(null);
const colorPickerOpen = ref(false);
const opacity = ref(100);

function tailwindClassToHsv(colorName, shade, opacity = 100) {
  const colorHues = {
    red: 0,
    orange: 30,
    amber: 45,
    yellow: 60,
    lime: 90,
    green: 120,
    emerald: 140,
    teal: 160,
    cyan: 180,
    sky: 200,
    blue: 220,
    indigo: 240,
    violet: 270,
    purple: 285,
    fuchsia: 300,
    pink: 330,
    rose: 345,
    slate: 210,
    gray: 220,
    zinc: 240,
    neutral: 0,
    stone: 20
  };

  const hue = colorHues[colorName] || 0;
  const isGrayscale = ['gray', 'zinc', 'neutral', 'stone'].includes(colorName);

  let s = 0;
  let v = 0;

  if (isGrayscale) {
    s = 5;
    v = 100 - (shade - 50) * (90 / 900);
  } else {
    s = 30 + (shade - 50) * (70 / 900);
    v = 100 - (shade - 50) * (70 / 900);
  }

  s = s * (opacity / 100);

  if (opacity < 100) {
    v = v + ((100 - v) * (1 - opacity / 100));
  }

  s = Math.max(0, Math.min(100, Math.round(s)));
  v = Math.max(0, Math.min(100, Math.round(v)));

  return { h: hue, s, v, opacity };
}

function tailwindClassToHsla(colorName: string, shade: number, opacity = 100) {
  const colorHues: Record<string, number> = {
    red: 0,
    orange: 30,
    amber: 45,
    yellow: 60,
    lime: 90,
    green: 120,
    emerald: 140,
    teal: 160,
    cyan: 180,
    sky: 200,
    blue: 220,
    indigo: 240,
    violet: 270,
    purple: 285,
    fuchsia: 300,
    pink: 330,
    rose: 345,
    slate: 210,
    gray: 220,
    zinc: 240,
    neutral: 0,
    stone: 20
  };

  const hue = colorHues[colorName] ?? 0;
  const isGrayscale = ['gray', 'zinc', 'neutral', 'stone', 'slate'].includes(colorName);

  let s = isGrayscale ? 5 : 50;
  let l = 100;

  const shadeMap = {
    50:  97,
    100: 94,
    200: 86,
    300: 77,
    400: 66,
    500: 56,
    600: 48,
    700: 39,
    800: 31,
    900: 23,
    950: 14
  };

  if (shadeMap[shade] !== undefined) {
    l = shadeMap[shade];
  } else {
    const minShade = 50;
    const maxShade = 950;
    const minL = 15;
    const maxL = 97;
    const ratio = (shade - minShade) / (maxShade - minShade);
    l = maxL - ratio * (maxL - minL);
  }

  const a = parseFloat((opacity / 100).toFixed(2));

  return { h: hue, s, l: Math.round(l), a };
}

const selectBaseColor = (color: string) => {
  baseColor.value = color;
  const colorShades = TWpalette.find(c => c.name === color);
  if (colorShades) {
    chosenShades.value = Object.values(colorShades.shades);
    shadeChosen.value = true;
  }
};

const selectShade = (shade: number) => {
  selectedShade.value = shade;
  const hsvValues = tailwindClassToHsla(baseColor.value, shade, opacity.value);
  emit('color-selected', baseColor.value, shade, opacity.value, hsvValues);
  console.log('color-selected', baseColor.value, shade, opacity.value, hsvValues);
};

const toggleColorPicker = (event: Event) => {
  event.stopPropagation();
  colorPickerOpen.value = !colorPickerOpen.value;
};

const closeColorPicker = (event: Event) => {
  const colorPicker = document.querySelector(".color-picker");
  if(colorPicker && !colorPicker?.contains(event.target as Node)){
    colorPickerOpen.value = false;
  }
};

const colorWithOpacity = computed(() => {
  if (selectedShade.value !== null) {
    return `bg-${baseColor.value}-${selectedShade.value}/${opacity.value}`;
  }
  return '';
});

watch(opacity, (newOpacity) => {
  if (selectedShade.value !== null && baseColor.value) {
    const hsvValues = tailwindClassToHsla(baseColor.value, selectedShade.value, newOpacity);
    emit('color-selected', baseColor.value, selectedShade.value, newOpacity, hsvValues);
    console.log('color-selected from opacity watch', baseColor.value, selectedShade.value, newOpacity, hsvValues);
  }
});

const goBackToBaseColors = () => {
  shadeChosen.value = false;
  selectedShade.value = null;
  chosenShades.value = [];
  colorPickerOpen.value = true;
};

document.addEventListener('click', closeColorPicker);
</script>

<template>
  <div class="flex flex-col justify-center content-center items-center gap-2 relative">
    <div
      class="flex flex-row justify-evenly content-center items-center px-3 py-2 gap-5 w-full rounded-lg bg-zinc-900 border-zinc-800 border-[1px] cursor-pointer"
      @click="toggleColorPicker"
    >
      <h3 class="">{{ type }}</h3>
      <span class="rounded-full w-5 h-5 bg-gradient-to-r from-rose-400 from-20% via-violet-500 via-50% to-green-500 to-80%"></span>
    </div>

    <div
      v-if="colorPickerOpen && !shadeChosen"
      class="color-picker flex flex-row flex-wrap justify-center content-center items-center p-4 gap-4 bg-zinc-900 border-zinc-800 border-[1px] rounded-md z-[200] absolute top-16"
    >
      <div
        v-for="color in colorNames"
        :key="color"
        class="flex flex-col justify-center content-center items-center"
        @click="selectBaseColor(color)"
      >
        <div :class="`bg-${color}-500 w-10 h-10 rounded-full cursor-pointer hover:scale-110 transition-transform`">
        </div>
        <span>
          {{ color }}
        </span>
      </div>
    </div>

    <div
      v-else-if="colorPickerOpen && shadeChosen"
      class="flex flex-col justify-between content-start items-start px-3 py-2 gap-4 bg-zinc-900 border-zinc-800 border-[1px] rounded-md z-[200] absolute top-16"
    >
      <div class="w-full h-full flex flex-col justify-between content-start items-start gap-4">
        <div class="flex flex-row justify-start content-center items-center text-white text-lg gap-2">
          <h3 class="capitalize">{{ baseColor }} shades</h3>
          <Icon type="tonality"></Icon>
        </div>
        <div class="w-full h-full flex flex-row flex-wrap justify-center items-center content-center gap-5">
          <div
            v-for="(shade, index) in chosenShades"
            :key="index"
            class="flex flex-col justify-center content-center items-center gap-1"
            @click="selectShade(parseInt(shade.split('-')[2]))"
          >
            <span :class="`${shade} w-10 h-10 rounded-full cursor-pointer ${selectedShade === parseInt(shade.split('-')[2]) ? 'border-4 border-white' : ''}`">
            </span>
            <span class="text-base text-white flex justify-center items-center h-full">
              {{ shade.split('-')[2] }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex flex-col content-start items-start gap-4 w-full">
        <div class="flex flex-row justify-start content-center items-center gap-2">
          <h3 class="text-zinc-200">Opacity</h3>
          <Icon type="opacity"></Icon>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          v-model.number="opacity"
          class="slider w-full h-2 rounded-full bg-rose-500 outline-none opacity-100 transition-all duration-200 ease-in-out cursor-pointer focus:outline-none hover:bg-rose-500/80"
        />
        <div
          v-if="selectedShade !== null"
          class="w-full h-12 rounded-lg flex items-center justify-center gap-2"
          :class="colorWithOpacity"
        >
          <span class="text-xs text-white">{{ opacity }}%</span>
          <Icon type="opacity"></Icon>
        </div>
      </div>
      <Button
        rank="primary"
        size="small"
        text="Back"
        icon-position="right"
        icon-type="undo"
        @click.stop="goBackToBaseColors"
      ></Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.slider {
  -webkit-appearance: none;
  appearance: none;
  @apply bg-rose-500 rounded-full h-2;

  &:focus {
    @apply outline-none;
  }

  &:hover {
    @apply bg-rose-500/80;
  }
}

/* Webkit browsers (Chrome, Safari, newer Edge) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  @apply w-5 h-5 rounded-full bg-zinc-500 ring-1 ring-zinc-300 cursor-pointer shadow-sm;
}

/* Firefox */
.slider::-moz-range-thumb {
  @apply w-5 h-5 rounded-full bg-zinc-500 cursor-pointer shadow-sm;
  border: 1px solid theme('colors.zinc.300');
  /* Firefox specifikus resetelés */
  background: theme('colors.zinc.500');
}

/* Firefox track */
.slider::-moz-range-track {
  @apply w-full h-2 rounded-full bg-rose-500;
  border: none;
}

/* IE and Edge (non-Chromium) */
.slider::-ms-thumb {
  @apply w-5 h-5 rounded-full bg-zinc-500 ring-1 ring-zinc-300 cursor-pointer shadow-sm;
}

.slider::-ms-track {
  @apply w-full bg-transparent border-transparent;
  color: transparent;
  height: 8px;
}

.slider::-ms-fill-lower,
.slider::-ms-fill-upper {
  @apply bg-rose-500 rounded-full;
}
</style>
