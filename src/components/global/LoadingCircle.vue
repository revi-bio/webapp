<template>
  <div class="loader w-12 h-12 rounded-full animate-spin duration-200 ease-linear">
  </div>
</template>

<style>
.loader {
  background:
    radial-gradient(farthest-side, #f43f5e 94%, transparent) top/8px 8px no-repeat,
    conic-gradient(transparent 30%, #f43f5e);
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 8px), black 0);
  mask: radial-gradient(farthest-side, transparent calc(100% - 8px), black 0);
}
</style>
