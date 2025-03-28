<script lang="ts" setup>
import { ref } from 'vue';
import Button from './Button.vue';

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
  (e: 'color-selected', baseColor: string, shade: number): void
  (e: 'reset'): void
}>();

const colorNames = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
const TWpalette = generateTWColors(colorNames);

const shadeChosen = ref(false);
const baseColor = ref("");
const chosenShades = ref<string[]>([]);
const selectedShade = ref<number | null>(null);
const colorPickerOpen = ref(false);

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
  emit('color-selected', baseColor.value, shade);
};



const toggleColorPicker = (event: Event) => {
  event.stopPropagation();
  colorPickerOpen.value = !colorPickerOpen.value;
};
const closeColorPicker = (event: Event) =>{
  const colorPicker = document.querySelector(".color-picker");
  if(colorPicker && !colorPicker?.contains(event.target as Node)){
    colorPickerOpen.value = false
  }
}
document.addEventListener('click', closeColorPicker);
</script>

<template>
  <div class="flex flex-col justify-center content-center items-center gap-2 relative">
    <div
      class="flex flex-row justify-evenly content-center items-center px-3 py-2 gap-5 rounded-full bg-zinc-900 border-zinc-800 border-[1px] cursor-pointer"
      @click="toggleColorPicker"
    >
      <h3>{{ type }} color</h3>
      <span class="rounded-full w-5 h-5 bg-gradient-to-r from-rose-400 from-20% via-violet-500 via-50% to-green-500 to-80%"></span>
    </div>

    <div
      v-if="colorPickerOpen && !shadeChosen"
      class="color-picker flex flex-row flex-wrap justify-center h-[25rem] w-[25rem] content-center items-center px-3 py-2 gap-4 bg-zinc-900 border-zinc-800 border-[1px] rounded-md z-[200] absolute top-16"
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
      class="flex flex-col justify-between h-[25rem] w-[25rem] content-start items-start px-3 py-2 gap-2 bg-zinc-900 border-zinc-800 border-[1px] rounded-md z-[200] absolute top-16"
    >
      <div class="w-full h-full flex flex-col justify-between content-start items-start">
        <div class="text-white text-lg">{{ baseColor }} shades</div>
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

      <Button
        rank="primary"
        size="small"
        text="Back"
        icon-position="right"
        icon-type="undo"
        @click="shadeChosen = false"
      ></Button>
    </div>
  </div>

<!--
HOW TO USE:

const handleColorSelection = (baseColor: any, shade: any) => {
  console.log(`Selected color: ${baseColor}-${shade}`);

};




<ColorPicker type="tag" @color-selected="handleColorSelection"></ColorPicker>
-->
</template>
