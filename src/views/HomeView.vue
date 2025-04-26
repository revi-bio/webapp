<script setup lang="ts" type="module">
import Logo from '@/components/global/Logo.vue';
import { RouterLink } from 'vue-router';
import Button from '@/components/global/Button.vue';
import Icon from '@/components/global/Icon.vue';
import Footer from '@/components/global/Footer.vue';
import { onMounted,ref } from 'vue';
import { animate, inView, scroll,stagger } from "motion"
import { useIntersectionObserver } from '@vueuse/core';

onMounted(() => {
  const elements = document.querySelectorAll(".pros h3, .our-goal h3, .our-goal p, .emerge h3, .emerge p, .creating h3, .creating p, .option h3, .option p, .explore h3, .explore p, .revision h3, .start");

  elements.forEach((element) => {
    const isVisible = ref(false);

    useIntersectionObserver(
      element as any,
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          animate(
            element,
            { y: ['-50px', '0'], opacity: [0, 1] },
            { duration: 0.8 }
          );
        } else {
          isVisible.value = false;
        }
      },
      {
        threshold: 0.1,
      }
    );
  });
});

</script>

<template>
<div class="overflow-y-scroll flex flex-col  snap-mandatory snap-y scroll-container relative">
<!--SVGs-->
<svg class="absolute right-0 top-[600px] w-full sm:w-auto" width="808" height="811" viewBox="0 0 808 811" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M783.036 40.7627C779.833 6.3474 832.352 -14.6125 850.22 14.9751L1018.67 293.912C1025.37 305.014 1024.18 319.167 1015.72 328.995L701.714 693.686C701.156 694.334 700.696 694.911 700.186 695.597C688.394 711.462 528.252 920.739 420.622 733.726C343.901 600.419 248.226 681.79 195.742 745.974C179.282 766.104 144.128 761.5 136.209 736.733L2.4521 318.379C-7.56684 287.042 34.6824 263.351 57.9075 286.652C197.273 426.476 296.242 440.416 435.933 252.689C443.011 243.177 455.147 238.369 466.786 240.628C699.633 285.815 803.192 257.333 783.036 40.7627Z" fill="url(#paint0_linear_626_1167)"/>
<defs>
<linearGradient id="paint0_linear_626_1167" x1="765.042" y1="-145.78" x2="120.055" y2="775.357" gradientUnits="userSpaceOnUse">
<stop offset="0.01" stop-color="#B51833" stop-opacity="0.7"/>
<stop offset="0.205" stop-color="#EA899A"/>
<stop offset="0.5" stop-color="#C1324A"/>
<stop offset="0.75" stop-color="#BB253F"/>
</linearGradient>
</defs>
</svg>
<svg class="absolute left-0 top-[1500px] w-full sm:w-auto" width="691" height="811" viewBox="0 0 691 811" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M451.036 40.7627C447.833 6.3474 500.352 -14.6125 518.22 14.9751L686.665 293.912C693.369 305.014 692.181 319.167 683.719 328.995L369.714 693.686C369.156 694.334 368.696 694.911 368.186 695.597C356.394 711.462 196.252 920.739 88.6223 733.726C11.9011 600.419 -83.7736 681.79 -136.258 745.974C-152.718 766.104 -187.872 761.5 -195.791 736.733L-329.548 318.379C-339.567 287.042 -297.318 263.351 -274.093 286.652C-134.727 426.476 -35.7579 440.416 103.933 252.689C111.011 243.177 123.147 238.369 134.786 240.628C367.633 285.815 471.192 257.333 451.036 40.7627Z" fill="url(#paint0_linear_626_1166)"/>
<defs>
<linearGradient id="paint0_linear_626_1166" x1="433.042" y1="-145.78" x2="-211.945" y2="775.357" gradientUnits="userSpaceOnUse">
<stop offset="0.01" stop-color="#B51833" stop-opacity="0.7"/>
<stop offset="0.205" stop-color="#EA899A"/>
<stop offset="0.5" stop-color="#C1324A"/>
<stop offset="0.75" stop-color="#BB253F"/>
</linearGradient>
</defs>
</svg>
<svg class="absolute left-[600px] top-[3300px]" width="1007" height="933" viewBox="0 0 1007 933" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M673.215 300C673.215 465.685 538.901 600 373.215 600C214.603 600 -124.202 531.267 47.1831 328.001C62.9319 309.322 87.503 301.262 110.598 293.293C234.118 250.67 96.6257 27.198 373.215 0C538.901 0 673.215 134.315 673.215 300Z" fill="url(#paint0_linear_626_1103)"/>
<path d="M612.703 629.271C654.24 684.89 647.232 766.79 578.778 778.313C432.794 802.887 270.378 757.82 214.138 662.975C139.464 537.041 210.29 357.06 372.331 260.975C468.172 204.145 598.936 194.282 705.234 221.766C785.415 242.496 748.647 317.206 671.12 346.332C553.027 390.696 515.712 499.402 612.703 629.271Z" fill="url(#paint1_linear_626_1103)"/>
<defs>
<linearGradient id="paint0_linear_626_1103" x1="336.608" y1="0" x2="336.608" y2="600" gradientUnits="userSpaceOnUse">
<stop stop-color="#E4E4E7"/>
<stop offset="1" stop-color="#616161"/>
</linearGradient>
<linearGradient id="paint1_linear_626_1103" x1="723.223" y1="217.999" x2="114.223" y2="669.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#09090B"/>
<stop offset="0.155" stop-color="#272728"/>
<stop offset="0.5" stop-color="#3C3C3D"/>
<stop offset="1" stop-color="#252526"/>
</linearGradient>
</defs>
</svg>
<svg class="absolute left-[300px] top-[5200px]" width="788" height="768" viewBox="0 0 788 768" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M500.853 705.013C473.97 712.722 445.99 696.881 438.768 669.863L432.266 645.54C429.377 634.734 422.948 625.209 414.007 618.487L394.026 603.466C371.663 586.654 367.446 554.764 384.671 532.717L435.023 468.27C450.408 448.578 477.969 443.268 499.569 455.836L516.845 465.888C530.923 474.079 548.061 474.834 563.22 468.878C603.563 453.025 676.2 430.222 627.574 494.213C609 518.657 599.428 536.277 595.243 548.979C587.684 571.916 610.871 599.113 614.404 623.003L615.015 627.131C618.682 651.924 603.426 675.601 579.335 682.509L500.853 705.013Z" fill="url(#paint0_linear_626_1162)"/>
<path d="M144.843 449.824C144.355 477.787 166.897 500.713 194.864 500.697L220.041 500.682C231.227 500.676 242.092 504.42 250.898 511.317L270.579 526.729C292.606 543.979 324.501 539.798 341.339 517.454L405.119 432.814C412.636 422.839 416.368 410.334 413.161 398.263C407.01 375.108 391.277 340.689 353.248 354.177C340.786 358.597 332.021 356.961 325.921 351.76C300.365 329.968 272.511 295.243 242.697 310.707C238.33 312.972 233.587 314.422 228.7 314.987L190.524 319.395C165.627 322.27 146.705 343.134 146.268 368.192L144.843 449.824Z" fill="url(#paint1_linear_626_1162)"/>
<path d="M630.885 379.565C640.928 375.658 649.44 368.61 655.152 359.472L678.831 321.594C688.78 305.68 688.979 285.534 679.345 269.426L651.702 223.204C642.236 207.377 624.827 198.045 606.407 198.924L561.981 201.045C552.027 201.52 542.159 199.01 533.642 193.837L515.589 182.872C489.404 166.969 455.203 178.14 443.456 206.435L434.892 227.061C432.612 232.552 429.371 237.593 425.321 241.946L406.07 262.638C386.653 283.51 388.588 316.367 410.321 334.815L431.758 353.011C436.39 356.943 440.266 361.685 443.197 367.007L460.895 399.136C472.987 421.089 499.463 430.698 522.82 421.61L630.885 379.565Z" fill="url(#paint2_linear_626_1162)"/>
<defs>
<linearGradient id="paint0_linear_626_1162" x1="559.111" y1="424.529" x2="451.916" y2="719.046" gradientUnits="userSpaceOnUse">
<stop stop-color="#1F1F1F"/>
<stop offset="0.9999" stop-color="#E11D48"/>
</linearGradient>
<linearGradient id="paint1_linear_626_1162" x1="377.968" y1="336.868" x2="143.954" y2="500.726" gradientUnits="userSpaceOnUse">
<stop stop-color="#1F1F1F"/>
<stop offset="0.9999" stop-color="#E11D48"/>
</linearGradient>
<linearGradient id="paint2_linear_626_1162" x1="418.111" y1="226.79" x2="646.354" y2="373.547" gradientUnits="userSpaceOnUse">
<stop stop-color="#1F1F1F"/>
<stop offset="0.9999" stop-color="#E11D48"/>
</linearGradient>
</defs>
</svg>

<!--Main content-->
  <main class="flex flex-col justify-center content-start items-center w-full min-h-full p-5 snap-center z-50">

    <nav class="flex flex-row justify-between content-center items-center w-full">
      <Logo type="revi"></Logo>
      <div  class="flex flex-row justify-center content-center items-center gap-10">
        <!--RouterLinks-->
        <RouterLink to="/login">Log In</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </div>
    </nav>

    <div class="flex flex-col w-full justify-center content-center h-full items-center gap-5">
      <h3 class="sm:text-2xl text-xl font-light text-zinc-50 w-full text-center">A place to unfold</h3>
      <h3 class="sm:text-8xl text-6xl text-zinc-200 animate-pulse animate-infinite animate-duration-[3000ms] w-full text-center">Supercharge</h3>
      <h3 class="sm:text-8xl text-6xl text-zinc-400 animate-pulse animate-infinite animate-duration-[3000ms] w-full text-center">your online identity</h3>

      <Logo type="revibio"></Logo>
      <span class="flex flex-row justify-center content-center items-center gap-5">
       <RouterLink to="/register"><Button text="Start your journey" size="normal" rank="primary" icon-position="none"></Button></RouterLink>
        <a href="#more"><Button text="Learn more" size="normal" rank="secondary" icon-position="none"></Button></a>
      </span>
    </div>
  </main>

<!--Learn more section-->
  <section class="flex flex-col w-full justify-center content-center items-center p-5" id="more">


    <!--Pros-->
    <div class="pros flex flex-col w-full justify-center content-center items-center gap-5 h-screen snap-center z-30">
      <h3 class="text-4xl text-rose-500 w-full text-center">Free to use.</h3>
      <h3  class="text-4xl text-zinc-200 w-full text-center">Easy to handle.</h3>
      <h3  class="text-4xl text-zinc-300 w-full text-center">Made for inviduals like you.</h3>
      <h3  class="text-4xl text-zinc-400 w-full text-center">Open source.</h3>

    </div>


    <!--Our goal-->
    <div class="our-goal flex flex-col w-full justify-center content-end items-end gap-5 h-screen snap-center z-30">
      <h3 class="text-4xl text-rose-600">Our goal</h3>
      <p class="text-2xl text-right text-rose-100 sm:w-3/5 w-4/5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et distinctio ex rem illum dolorum unde non molestiae ducimus dolorem tempora ut quis obcaecati nobis impedit aperiam, facere enim dignissimos illo! Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>

    <!--Emerge-->
    <div class="emerge flex flex-col w-full justify-center content-start items-start gap-5 h-screen snap-center z-30">
      <h3 class="sm:text-6xl text-5xl text-zinc-100">Discover your creativity.</h3>
      <h3 class="sm:text-6xl text-5xl text-zinc-400">Emerge from social media.</h3>


      <!--<iframe class="w-full h-full" src="https://www.youtube.com/embed/1U8qUDq3Teo?si=92pSryIPM8J-CWJS&autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>-->
    </div>

    <!--Creating-->
    <div class="creating flex flex-col w-full justify-center content-end items-end gap-5 h-screen snap-center z-30">
      <h3 class="text-4xl text-rose-500">Creating a bio site</h3>
      <p class="text-2xl text-right text-rose-100 sm:w-3/5 w-4/5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et distinctio ex rem illum dolorum unde non molestiae ducimus dolorem tempora ut quis obcaecati nobis impedit aperiam, facere enim dignissimos illo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum tempora excepturi voluptates reiciendis repellat a nihil consectetur. Fuga sapiente expedita doloremque alias unde consequatur velit. Vel odit eveniet fugiat quasi.</p>
    </div>

    <!--Option-->
    <div class="option flex flex-col w-full justify-center content-start items-start gap-5 h-screen snap-center z-30">
      <h3 class="sm:text-6xl text-5xl text-zinc-200">It is not just an option,</h3>
      <h3 class="sm:text-6xl text-5xl text-zinc-400">but a solution.</h3>
    </div>

    <!--Explore-->
    <div class="explore flex flex-col w-full justify-center content-end items-end gap-5 h-screen snap-center z-30">
      <h3 class="text-4xl text-rose-400">Explore our services</h3>
      <p class="text-2xl text-right text-rose-50 sm:w-3/5 w-4/5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et distinctio ex rem illum dolorum unde non molestiae ducimus dolorem tempora ut quis obcaecati nobis impedit aperiam, facere enim dignissimos illo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum tempora excepturi voluptates reiciendis repellat a nihil consectetur. Fuga sapiente expedita doloremque alias unde consequatur velit. Vel odit eveniet fugiat quasi.</p>
    </div>

    <div class="revision flex flex-col w-full justify-center content-center items-center gap-5 h-screen snap-center z-30">
      <h3 class="text-4xl"><span class="text-rose-500 w-full text-center">Revi</span><span class="text-zinc-200">sion</span></h3>
      <h3 class="text-4xl text-zinc-200 w-full text-center">You are not just a user.</h3>
      <h3 class="text-4xl text-zinc-400 w-full text-center">But a <span class="text-rose-500">true invidual.</span></h3>
      <RouterLink to="register" class="start"><Button text="Start your journey" size="normal" rank="primary" icon-position="none"></Button></RouterLink>
    </div>
  </section>
  <Footer></Footer>


</div>

</template>

<style lang="scss" scoped>

.scroll-container {
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;

}
.scroll-container::-webkit-scrollbar {
  display: none;
}
.pros h3{

  display: block;
}


</style>
