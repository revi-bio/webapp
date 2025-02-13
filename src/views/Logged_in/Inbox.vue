<script lang="ts" setup>
import Inboxnoti from '@/components/global/Inboxnoti.vue';
const msgs = [
  {title: "Qkacmatyi", subject: "NEm etted meg megint a főzeléket ezért most aztán nagyon el leszel náspángolva tökfilkó", close: "Kurva anyád", senddate: "2025-01-01", readed: false},
  {title: "Nagy Feró és a mókusok", subject: "Megint előadjuk a reptért de most csak a mókusaim énekelnek mert egy trotty vagyok már és megakarokhalni", close: "Hagyjatokmárbékén", senddate: "2023-10-25", readed: false},
  {title: "Qkacmatyi2", subject: "NEm etted meg megint a főzeléket ezért most aztán nagyon el leszel náspángolva tökfilkó", close: "Kurva anyád", senddate: "2025-01-01", readed: false},
  {title: "Qkacmatyi3", subject: "NEm etted meg megint a főzeléket ezért most aztán nagyon el leszel náspángolva tökfilkó", close: "Kurva anyád", senddate: "2025-01-01", readed: false},
]

</script>

<template>
<div class="flex h-full justify-center content-center items-center flex-row gap-4 p-6">
  <div class="w-full h-full flex-col space-y-6 p-6 bg-zinc-800 rounded-2xl">
    Inboxfőcucc
  </div>
  <div class="w-[400px] max-w-[400px] h-full flex-col space-y-6 p-6 bg-zinc-900 rounded-2xl">
    <Inboxnoti :items="msgs"></Inboxnoti>
  </div>
</div>
</template>

<style>

</style>
