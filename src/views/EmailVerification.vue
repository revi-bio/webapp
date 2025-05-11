<script lang="ts" setup>
import Button from '@/components/global/Button.vue';
import Logo from '@/components/global/Logo.vue';
import { ApiWrapper } from '@/composables/ApiWrapper';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();

const code = route.params.code
const used = ref<boolean>(true)

onMounted(async () => {
  try {
    const res = await ApiWrapper.get<string>(`/user/verify-email/${code}`, {});

    if(res.status == 200){
      used.value = false
    }
  } catch (error: any) {
    console.error("Error verification:", error);
  }
})

</script>

<template>
  <div class="bg-zinc-900 text-zinc-200 min-h-screen flex items-center justify-center relative overflow-hidden">
    <svg
      class="absolute top-0 right-0 w-auto h-auto max-w-none z-10"
      width="729"
      height="583"
      viewBox="0 0 729 583"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M492.569 -364.515C470.205 -390.869 501.204 -438.162 532.811 -424.173L830.785 -292.298C842.645 -287.049 849.789 -274.774 848.494 -261.87L800.455 216.973C800.369 217.824 800.323 218.56 800.299 219.415C799.74 239.175 788.595 502.458 593.164 411C453.856 345.806 422.156 467.339 415.978 550.019C414.041 575.949 382.603 592.342 361.911 576.596L12.3857 310.62C-13.7953 290.697 7.22422 247.057 39.6142 252.823C233.976 287.423 323.042 242.076 329.794 8.17532C330.136 -3.67609 337.32 -14.5754 348.15 -19.4011C564.805 -115.941 633.299 -198.671 492.569 -364.515Z"
        fill="url(#paint0_linear_1158_1211)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1158_1211"
          x1="370.832"
          y1="-507"
          x2="370.832"
          y2="617.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.01" stop-color="#B51833" stop-opacity="0.7" />
          <stop offset="0.205" stop-color="#EA899A" />
          <stop offset="0.5" stop-color="#C1324A" />
          <stop offset="0.75" stop-color="#BB253F" />
        </linearGradient>
      </defs>
    </svg>

    <svg
      class="absolute inset-0 w-full h-full z-0"
      width="1000"
      height="1000"
      viewBox="0 0 1000 1000"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_1158_1147)">
        <path
          d="M600 500C600 555.228 555.228 600 500 600C444.772 600 400 555.228 400 500C400 444.772 444.772 400 500 400C555.228 400 600 444.772 600 500Z"
          fill="#71717A"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_1158_1147"
          x="0"
          y="0"
          width="1000"
          height="1000"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_1158_1147" />
        </filter>
      </defs>
    </svg>

    <svg
      class="absolute left-0 bottom-0 w-auto h-auto max-w-none z-0"
      width="685"
      height="577"
      viewBox="0 0 685 577"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M-51.5 327C-51.5 504.316 -210.853 528.163 -319.186 535.163C-363.353 531.663 -462.286 562.062 -504.686 711.662C-547.086 861.262 -325.353 764.995 -209.186 698.162C-87.6859 665.495 223.714 632.462 497.314 761.662C770.914 890.862 681.667 580.333 615.5 466.5C562.833 398 542.287 554.106 412.5 486C362 459.5 362.833 428.833 292 355C239 307.333 132.5 382.45 132.5 263C132.5 160.5 165.647 135.329 115.814 89.663C81.314 50.3296 -3.58594 -21.437 -67.1859 6.16297C-130.786 33.763 -112.5 63 -102 137.5C-67.1859 222.5 -51.5 234 -51.5 327Z"
        fill="url(#paint0_linear_1159_1281)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1159_1281"
          x1="684"
          y1="315.5"
          x2="-366.515"
          y2="676.298"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#BB253F" />
          <stop offset="0.557692" stop-color="#D93D58" />
          <stop offset="0.706731" stop-color="#E98999" />
          <stop offset="0.870192" stop-color="#E34561" />
        </linearGradient>
      </defs>
    </svg>

    <!-- Main Content -->
    <main class="flex flex-col items-center text-center gap-4 z-20 p-4">
      <template v-if="!used">
        <p class="text-4xl font-bold">Email Verified Successfully</p>
        <p class="text-lg text-zinc-400">
          Your email address has been successfully verified. You can now log in to your account.
        </p>

        <!-- Login Button -->
        <RouterLink to="/login">
          <Button icon-position="none" rank="primary" size="normal" text="Log In" :primary="true" />
        </RouterLink>

        <p class="text-zinc-400">If you encounter any issues, please contact our support team.</p>

        <p class="text-zinc-400">Thank you for verifying your email!</p>
        <Logo type="revibio"></Logo>
      </template>

      <template v-else>
        <p class="text-4xl font-bold">This link has already been used.</p>
        <p class="text-lg text-zinc-400">
          Please log in to your account to continue.
        </p>

        <!-- Login Button -->
        <RouterLink to="/login">
          <Button icon-position="none" rank="primary" size="normal" text="Log In" />
        </RouterLink>
      </template>
    </main>
  </div>
</template>
