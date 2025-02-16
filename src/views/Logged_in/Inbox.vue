<script lang="ts" setup>
import Inboxnoti from '@/components/global/Inboxnoti.vue';
import { ref } from 'vue';
import Button from '@/components/global/Button.vue';
import Icon from '@/components/global/Icon.vue';
import Logo from '@/components/global/Logo.vue';

interface Msg{
  id: string
  title: string
  subject: string
  close: string
  senddate: string
  readed: boolean
}

let msgs:Msg[] = [
  {id: "1", title: "Qkacmatyi", subject: "NEm etted meg megint a főzeléket ezért most aztán nagyon el leszel náspángolva tökfilkó", close: "Kurva anyád", senddate: "2025-01-01", readed: false},
  {id: "2", title: "Nagy Feró és a mókusok", subject: "Megint előadjuk a reptért de most csak a mókusaim énekelnek mert egy trotty vagyok már és megakarokhalni", close: "Hagyjatokmárbékén", senddate: "2023-10-25", readed: false},
  {id: "3", title: "Orban Ferenc", subject: "Szija Viktor a gyurcsány is szar mint te ki kéne menni a pijacra de nem tudok mert a tolószékemnek lapos a kereke :,(", close: "Küldj pénzt lécci", senddate: "2020-11-09", readed: true},
  {id: "4", title: "Egy arab pilóta feljegyzései", subject: "hajónapló: beköszöntött az ősz a fedélzeten. A legénység napok óta próbál meggyőzni, hogy a kincs -ha ér is annyit- nem a boszorkány tükrözött tonyai között rejlik. De a szirén ellenállhatatlan dala még álmomban sem hagy nyugodni. Töménytelen arany és ékszer várja azokat, akik méltónak bizonyulnak a tükrözőszellem átkának megtörésére. Mélyen, a feneketlen óceán rejtekében reménytelenül bolyong, és nem találhat ki a tükrök útvesztőjéből. Az útvesztő szíve a két torony, melyek egymás pontos másai. Ha megsemmisítem az egyiket, a tükör szelleme felszabadulhat, és a kincs amit őriz, a kalóztörvény szerint, felszabadítóját illeti. Meg kell szereznem. Én leszek a leghatalmasabb, Muhammad Khaleel Ali kapitány!", close: "YARRRR!!!", senddate: "2001-09-11", readed: false},
]

let selectedMsg = ref<Msg>();

function selectMsg(index: number){
  selectedMsg.value = msgs[index]
}

function deleteMsg(){

}

const countOfUnreaded = msgs.filter((obj) => obj.readed === false).length

</script>

<template>
<div class="flex h-full justify-center content-center items-center flex-row gap-4 p-6">
  <div class="w-full h-full flex-col bg-zinc-800 rounded-2xl flex items-center justify-center">
    <div v-if="selectedMsg" class="space-y-6 ">
      <div class="max-w-[800px] w-full bg-zinc-700 rounded-2xl p-6">{{selectedMsg?.title}}</div>
      <div class="max-w-[800px] w-full bg-zinc-700 rounded-2xl p-6 text-justify">{{selectedMsg?.subject}}</div>
      <div class="max-w-[800px] w-full bg-zinc-700 rounded-2xl p-6">{{selectedMsg?.close}}</div>
      <div class="text-rose-500 flex justify-between">
        <span><Logo type="revibio"></Logo></span>
        <div class="cursor-pointer" @click="deleteMsg()"><Icon size="text-sm" type="delete"></Icon> Delete this mail</div>
      </div>
    </div>
    <div v-if="!selectedMsg" class="space-y-4 text-4xl flex items-center justify-center flex-col text-center">
      <div>Keep</div>
      <div>track of <span class="text-rose-500">your</span> notifications</div>
      <Button icon-position="none" rank="primary" size="normal" text="Have any question?"></Button>
      <div>(Looks like you have <span class="text-rose-500">{{ countOfUnreaded }} unread</span> message)</div>
    </div>
  </div>
  <div class="w-[400px] max-w-[400px] h-full flex-col space-y-2 p-6 bg-zinc-900 rounded-2xl">
    <Inboxnoti :items="msgs" @selectMsg="selectMsg"></Inboxnoti>
  </div>
</div>
</template>

<style>

</style>
