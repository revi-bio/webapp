<script lang="ts" setup>
import { RouterView, useRoute } from 'vue-router';
import Sidebar from '@/components/global/Sidebar.vue';
// import { animate } from 'motion';
import { onMounted } from 'vue';
import router from '@/router';

const route = useRoute();

onMounted(() => {
  /*
    animate(
      ".blob",
      { rotate: [0, 360], scale: [1, 1.2, 1.4, 1.3, 1.2, 1] },
      {
        duration: 28,
        repeat: Infinity,
        ease: "easeInOut",
      }
    );
    */
  if (route.path === '/baseDash') {
    router.push('/baseDash/overview');
  }
});
</script>

<template>
  <div
    class="flex flex-col-reverse md:flex-row justify-center content-center items-center w-full h-full md:p-6 gap-6 relative overflow-hidden">
    <Sidebar class="w-full md:w-[80px] h-full"></Sidebar>
    <main id="sidebar-right-outlet" class="w-full h-full relative rounded-2xl z-10 flex gap-4">
      <div class="w-full h-full md:bg-zinc-800/80 rounded-2xl z-[20] md:backdrop-blur-3xl pb-16 md:pb-0 relative overflow-clip">
        <!--Content goes here-->
        <span class="absolute text-3xl top-6 left-6"
          ><h3>{{ route.name }}</h3></span
        >
        <RouterView></RouterView>
      </div>
    </main>
    <svg
      class="blob origin-center absolute
             bottom-[-30vh] right-[-20vw]
             sm:bottom-[-25vh] sm:right-[-18vw]
             md:bottom-[-22vh] md:right-[-16vw]
             lg:bottom-[-20vh] lg:right-[-14vw]
             xl:bottom-[-18vh] xl:right-[-12vw]
             w-[90vw] h-[90vw]
             sm:w-[80vw] sm:h-[80vw]
             md:w-[70vw] md:h-[70vw]
             lg:w-[60vw] lg:h-[60vw]
             xl:w-[50vw] xl:h-[50vw]
             max-w-[800px] max-h-[800px]
             z-0 blur-[180px] md:blur-3xl"
      id="10015.io"
      viewBox="0 0 480 480"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: #e11d48; stop-opacity: 1" />
          <stop offset="50%" style="stop-color: #f43f5e; stop-opacity: 1" />
          <stop offset="100%" style="stop-color: #881337; stop-opacity: 1" />
        </linearGradient>
      </defs>
      <path
        fill="url(#gradient1)"
        d="M380,306Q345,372,276,378.5Q207,385,128,358.5Q49,332,42.5,237Q36,142,114,86.5Q192,31,282.5,52Q373,73,394,156.5Q415,240,380,306Z" />
    </svg>
  </div>
</template>

<style lang="scss" scoped></style>
