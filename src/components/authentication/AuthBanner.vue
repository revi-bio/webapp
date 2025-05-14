<script setup>
import { ref, onMounted } from 'vue';

const images = Object.values(import.meta.glob('../../assets/Backgrounds/authentication/*.png', { eager: true }));

const selectedBackground = ref('');

onMounted(() => {
  if (images.length > 0) {
    const randomIndex = Math.floor(Math.random() * images.length);
    selectedBackground.value = images[randomIndex].default;
  }
});
</script>

<template>
  <div class="relative">
    <div class="absolute inset-0 bg-[#F43F5E]/20 blur-xl z-10"></div>
    <div
      class="bannerContainer flex flex-col justify-between content-center items-center p-6 md:p-12 rounded-2xl z-20 h-full"
      :style="{ backgroundImage: `url(${selectedBackground})` }"
    >
      <div class="flex flex-col justify-center content-start items-start w-full text-5xl md:text-6xl lg:text-8xl gap-8">
        <h3>Supercharge</h3>
        <h3>Your</h3>
        <h3>Identity</h3>
      </div>
      <div class="flex flex-col justify-end content-end items-end w-full gap-5">
        <div class="bannerBox bg-zinc-900 text-zinc-100 text-2xl lg:text-3xl w-[10rem] h-[10rem] lg:w-[12rem] lg:h-[12rem]">
          <h3>Easy</h3>
          <h3>to handle</h3>
          <span class="bBrighter"></span>
        </div>
        <div class="flex flex-row justify-end content-center items-center w-full gap-5">
          <div class="bannerBox bg-zinc-100 text-zinc-900 text-2xl px-4 lg:text-3xl font-[500] w-[10rem] h-[10rem] lg:w-[18rem] lg:h-[12rem]">
            <h3>Only your</h3>
            <h3>creativity</h3>
            <h3>bounds you</h3>
            <span class="wBrighter"></span>
            <span class="wDarker"></span>
          </div>
          <div class="bannerBox bg-rose-600 text-zinc-100 text-2xl lg:text-3xl w-[10rem] h-[10rem] lg:w-[12rem] lg:h-[12rem]">
            <h3>Unique</h3>
            <h3>like you</h3>
            <span class="rBrighter"></span>
            <span class="rDarker"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bannerContainer {
  @apply relative bg-cover bg-center bg-no-repeat;
  z-index: 20;
}

.bannerBox {
  @apply flex flex-col justify-center content-center items-center rounded-lg pl-7 relative overflow-hidden;

  h3 {
    @apply w-full text-left;
  }
}
.bBrighter{
  @apply absolute w-10 h-10 rounded-full bg-zinc-300 blur-2xl right-[-1.25rem] top-[3.5rem]
}

.wDarker{
  @apply absolute w-20 h-20 rounded-full bg-zinc-950 blur-2xl right-[-1rem] bottom-[-2rem]
}
.wBrighter{
  @apply absolute w-12 h-12 rounded-full bg-zinc-950 blur-xl left-[-1rem] top-[-0.25rem]
}
.rBrighter{
  @apply absolute w-16 h-16 rounded-full bg-rose-200 blur-2xl left-[0.75rem] top-[-0.5rem]
}
.rDarker{
  @apply absolute w-16 h-16 rounded-full bg-red-500 blur-xl right-[-0.25rem] bottom-[-0.25rem]
}
</style>
