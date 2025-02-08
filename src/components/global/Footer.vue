<script setup lang="ts">
import Logo from '@/components/global/Logo.vue';
import Button from '@/components/global/Button.vue';
import Icon from './Icon.vue';

</script>

<template>
  <footer class="flex flex-row w-full justify-evenly content-center items-center gap-5 snap-center bg-zinc-950 py-6 px-2.5 relative">

    <!--Lastupdate-->

    <h3 class="absolute bottom-1 right-1 text-zinc-500 text-xs">Check the <a class="text-rose-500 underline">latest update note</a></h3>
    <div class="flex flex-col items-center space-y-4 text-lg text-zinc-300 w-full">
      <p>Have any questions?</p>
      <p>Check out <span class="underline">FAQ</span></p>
      <Button size="small" icon-position="none" rank="primary" text="Take me there"></Button>
    </div>
    <div class="flex flex-col items-center space-y-20 justify-self-auto w-full">
      <div class="flex flex-row justify-between items-center text-zinc-500  text-2xl space-x-2.5">
        <RouterLink to="login" class="px-10 text-lg hover:text-zinc-400">Log In</RouterLink>
        <RouterLink to="register" class="px-10 text-lg hover:text-zinc-400">Register</RouterLink>
        <RouterLink to="/" class="px-10 text-lg hover:text-zinc-400">Home</RouterLink>
      </div>
      <div class="flex flex-col items-center w-full text-3xl space-y-1 relative">
        <h3 class="text-zinc-400 z-30">Made by us,</h3>
        <h3 class="text-zinc-300 z-30">For you to finish</h3>
        <Logo type="revibio" class="z-30"></Logo>
        <span class="bBrighter"></span>
      </div>
      <div class="flex flex-col items-center w-full space-y-4 text-lg">
        <p class="underline hover:text-zinc-400">Contact us</p>
        <p><span class="text-rose-500">revi</span><span class="text-zinc-700">bio</span>@gmail.com</p>
        <span class="w-full h-0.5 rounded-full bg-zinc-500"></span>
        <p class="text-zinc-500 text-xs"><span class="text-rose-500">Copyright©2025.</span> All right reserved</p>
      </div>
    </div>
    <div class="flex flex-col items-center text-lg text-zinc-300 gap-4 w-full">
      <p>Follow our footsteps</p>
      <p><span class="text-rose-500">xX_Itz_revibio_OG_Xx</span>.revi</p>
      <span class="w-[2.5rem] h-[2px] rounded-full bg-zinc-500"> <!--Separator--></span>
      <div class="flex flex-row content-center items-center space-x-4">
        <!--Instagram-->
        <div class="flex justify-center w-[3rem] h-[2rem] transition duration-300 hover:scale-110  content-center px-3 items-center  bg-gradient-to-r from-[rgba(221,42,123,1)] to-[rgba(254,218,119,1)] rounded-lg">
          <svg class="w-3/4" viewBox="0 0 24 24" id="meteor-icon-kit__solid-instagram" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.9962 0.0078125C8.73824 0.0078125 8.32971 0.021622 7.05019 0.080003C5.77333 0.138241 4.90129 0.341051 4.13824 0.637622C3.34938 0.944146 2.68038 1.35434 2.01343 2.02124C1.34652 2.68819 0.936333 3.35719 0.629809 4.14605C0.333238 4.9091 0.130429 5.78115 0.0721905 7.058C0.0138095 8.33753 0 8.74605 0 12.0041C0 15.262 0.0138095 15.6705 0.0721905 16.9501C0.130429 18.2269 0.333238 19.099 0.629809 19.862C0.936333 20.6509 1.34652 21.3199 2.01343 21.9868C2.68038 22.6537 3.34938 23.0639 4.13824 23.3705C4.90129 23.667 5.77333 23.8698 7.05019 23.9281C8.32971 23.9864 8.73824 24.0002 11.9962 24.0002C15.2542 24.0002 15.6627 23.9864 16.9422 23.9281C18.2191 23.8698 19.0911 23.667 19.8542 23.3705C20.643 23.0639 21.312 22.6537 21.979 21.9868C22.6459 21.3199 23.0561 20.6509 23.3627 19.862C23.6592 19.099 23.862 18.2269 23.9202 16.9501C23.9786 15.6705 23.9924 15.262 23.9924 12.0041C23.9924 8.74605 23.9786 8.33753 23.9202 7.058C23.862 5.78115 23.6592 4.9091 23.3627 4.14605C23.0561 3.35719 22.6459 2.68819 21.979 2.02124C21.312 1.35434 20.643 0.944146 19.8542 0.637622C19.0911 0.341051 18.2191 0.138241 16.9422 0.080003C15.6627 0.021622 15.2542 0.0078125 11.9962 0.0078125ZM7.99748 12.0041C7.99748 14.2125 9.78776 16.0028 11.9962 16.0028C14.2047 16.0028 15.995 14.2125 15.995 12.0041C15.995 9.79557 14.2047 8.00529 11.9962 8.00529C9.78776 8.00529 7.99748 9.79557 7.99748 12.0041ZM5.836 12.0041C5.836 8.60181 8.594 5.84381 11.9962 5.84381C15.3984 5.84381 18.1564 8.60181 18.1564 12.0041C18.1564 15.4062 15.3984 18.1642 11.9962 18.1642C8.594 18.1642 5.836 15.4062 5.836 12.0041ZM18.3998 7.03996C19.1949 7.03996 19.8394 6.39548 19.8394 5.60043C19.8394 4.80538 19.1949 4.16086 18.3998 4.16086C17.6048 4.16086 16.9603 4.80538 16.9603 5.60043C16.9603 6.39548 17.6048 7.03996 18.3998 7.03996Z" fill="#e2e5ea"/></svg>
        </div>

        <!--Discord-->
        <div class="flex justify-center w-[3.5rem] h-[2.5rem] transition duration-300 hover:scale-110  content-center px-3 items-center bg-[#7289DA] rounded-lg">
          <svg fill="#FFFFFF" class="w-[2.5rem]"  viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.992 20.163c-1.511-0.099-2.699-1.349-2.699-2.877 0-0.051 0.001-0.102 0.004-0.153l-0 0.007c-0.003-0.048-0.005-0.104-0.005-0.161 0-1.525 1.19-2.771 2.692-2.862l0.008-0c1.509 0.082 2.701 1.325 2.701 2.847 0 0.062-0.002 0.123-0.006 0.184l0-0.008c0.003 0.050 0.005 0.109 0.005 0.168 0 1.523-1.191 2.768-2.693 2.854l-0.008 0zM11.026 20.163c-1.511-0.099-2.699-1.349-2.699-2.877 0-0.051 0.001-0.102 0.004-0.153l-0 0.007c-0.003-0.048-0.005-0.104-0.005-0.161 0-1.525 1.19-2.771 2.692-2.862l0.008-0c1.509 0.082 2.701 1.325 2.701 2.847 0 0.062-0.002 0.123-0.006 0.184l0-0.008c0.003 0.048 0.005 0.104 0.005 0.161 0 1.525-1.19 2.771-2.692 2.862l-0.008 0zM26.393 6.465c-1.763-0.832-3.811-1.49-5.955-1.871l-0.149-0.022c-0.005-0.001-0.011-0.002-0.017-0.002-0.035 0-0.065 0.019-0.081 0.047l-0 0c-0.234 0.411-0.488 0.924-0.717 1.45l-0.043 0.111c-1.030-0.165-2.218-0.259-3.428-0.259s-2.398 0.094-3.557 0.275l0.129-0.017c-0.27-0.63-0.528-1.142-0.813-1.638l0.041 0.077c-0.017-0.029-0.048-0.047-0.083-0.047-0.005 0-0.011 0-0.016 0.001l0.001-0c-2.293 0.403-4.342 1.060-6.256 1.957l0.151-0.064c-0.017 0.007-0.031 0.019-0.040 0.034l-0 0c-2.854 4.041-4.562 9.069-4.562 14.496 0 0.907 0.048 1.802 0.141 2.684l-0.009-0.11c0.003 0.029 0.018 0.053 0.039 0.070l0 0c2.14 1.601 4.628 2.891 7.313 3.738l0.176 0.048c0.008 0.003 0.018 0.004 0.028 0.004 0.032 0 0.060-0.015 0.077-0.038l0-0c0.535-0.72 1.044-1.536 1.485-2.392l0.047-0.1c0.006-0.012 0.010-0.027 0.010-0.043 0-0.041-0.026-0.075-0.062-0.089l-0.001-0c-0.912-0.352-1.683-0.727-2.417-1.157l0.077 0.042c-0.029-0.017-0.048-0.048-0.048-0.083 0-0.031 0.015-0.059 0.038-0.076l0-0c0.157-0.118 0.315-0.24 0.465-0.364 0.016-0.013 0.037-0.021 0.059-0.021 0.014 0 0.027 0.003 0.038 0.008l-0.001-0c2.208 1.061 4.8 1.681 7.536 1.681s5.329-0.62 7.643-1.727l-0.107 0.046c0.012-0.006 0.025-0.009 0.040-0.009 0.022 0 0.043 0.008 0.059 0.021l-0-0c0.15 0.124 0.307 0.248 0.466 0.365 0.023 0.018 0.038 0.046 0.038 0.077 0 0.035-0.019 0.065-0.046 0.082l-0 0c-0.661 0.395-1.432 0.769-2.235 1.078l-0.105 0.036c-0.036 0.014-0.062 0.049-0.062 0.089 0 0.016 0.004 0.031 0.011 0.044l-0-0.001c0.501 0.96 1.009 1.775 1.571 2.548l-0.040-0.057c0.017 0.024 0.046 0.040 0.077 0.040 0.010 0 0.020-0.002 0.029-0.004l-0.001 0c2.865-0.892 5.358-2.182 7.566-3.832l-0.065 0.047c0.022-0.016 0.036-0.041 0.039-0.069l0-0c0.087-0.784 0.136-1.694 0.136-2.615 0-5.415-1.712-10.43-4.623-14.534l0.052 0.078c-0.008-0.016-0.022-0.029-0.038-0.036l-0-0z"></path>
        </svg>
        </div>

        <!--X-->
        <div class="flex justify-center w-[3rem] h-[2rem] transition duration-300 hover:scale-110 content-center px-3 items-center bg-[#000000] rounded-lg">
          <svg class="w-[1rem]" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="white"/>
          </svg>
        </div>

      </div>
    </div>
  </footer>
</template>

<style>

.bBrighter{
  @apply absolute w-64 h-64 rounded-full bg-zinc-900 blur-[100px] z-0 -top-[60px]
}


</style>
