<script lang="ts" setup>
import ProfilePic from '@/components/global/ProfilePic.vue';
import Button from '@/components/global/Button.vue';
import Input from '@/components/global/Input.vue';
</script>
<template>
  <div class="flex flex-col justify-center content-start items-center gap-4">

    <h3 class="text-lg text-zinc-300 text-left w-full">Profile pictrure</h3>

    <div class="flex flex-row justify-center content-center items-center gap-10">

      <ProfilePic class="w-[9rem] h-[9rem]"></ProfilePic>

      <div class="flex flex-col justify-center content-center items-start gap-2">
        <Button text="Change picture" size="small" rank="primary" icon-position="right" icon-type="edit"></Button>
        <Button text="Delete picture" size="small" rank="primary" icon-position="right" icon-type="delete"></Button>
      </div>

    </div>

    <Input type="text" placeholder="Displayname" class="text-base"/>

  </div>
</template>

<style lang="scss">

</style>
