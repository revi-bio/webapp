<script setup lang="ts">
const props = defineProps<{
  type: string,
  width: string, // Bármilyen (nem Tailwind)
  color: string  // Csak Tailwind (pl.: "red-500")
}>();

const icons: Record<string, string> = {
  amazon: 'amazon-fill-svgrepo-com.svg',
  discord: 'discord-fill-svgrepo-com.svg',
  dribbble: 'dribbble-fill-svgrepo-com.svg',
  facebook: 'facebook-fill-svgrepo-com.svg',
  github: 'github-fill-svgrepo-com.svg',
  instagram: 'instagram-fill-svgrepo-com.svg',
  linkedin: 'linkedin-fill-svgrepo-com.svg',
  pinterest: 'pinterest-fill-svgrepo-com.svg',
  reddit: 'reddit-fill-svgrepo-com.svg',
  snapchat: 'snapchat-fill-svgrepo-com.svg',
  spotify: 'spotify-fill-svgrepo-com.svg',
  telegram: 'telegram-fill-svgrepo-com.svg',
  thumblr: 'thumblr-fill-svgrepo-com.svg',
  tiktok: 'tiktok-fill-svgrepo-com.svg',
  twitch: 'twitch-fill-svgrepo-com.svg',
  viber: 'viber-fill-svgrepo-com.svg',
  wechat: 'wechat-fill-svgrepo-com.svg',
  whatsapp: 'whatsapp-fill-svgrepo-com.svg',
  youtube: 'youtube-fill-svgrepo-com.svg',
};

const iconsModule = import.meta.glob('@/assets/LinkIcons/*.svg', { eager: true }) as Record<string, { default: string }>;


const iconPath = icons[props.type] ? iconsModule[`/src/assets/LinkIcons/${icons[props.type]}`]?.default : null;
</script>

<template>
  <div :style="{ width: props.width, height: props.width }" :class="`text-${props.color}`">
    
    <img v-if="iconPath" :src="iconPath" alt="icon" class="w-full h-full" />

    
    <svg v-else width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 8L7 8C5.11438 8 4.17157 8 3.58578 8.58579C3 9.17158 3 10.1144 3 12V12C3 13.8856 3 14.8284 3.58579 15.4142C4.17157 16 5.11438 16 7 16L9 16" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 16L17 16C18.8856 16 19.8284 16 20.4142 15.4142C21 14.8284 21 13.8856 21 12V12C21 10.1144 21 9.17157 20.4142 8.58578C19.8284 8 18.8856 8 17 8L15 8" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 12H16" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</template>
