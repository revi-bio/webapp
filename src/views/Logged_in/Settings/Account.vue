<script setup lang="ts">
import Button from '@/components/global/Button.vue'
import Input from '@/components/global/Input.vue'; 
</script>
<template>
    <div class="flex flex-col justify-center content-center items-start gap-5">
        <div class="flex flex-col justify-center content-center items-start gap-2">
            <h3 class="text-base text-zinc-400">Your current e-mail is <span class="underline text-zinc-300">currentEmail@gmail.com</span> </h3>
            <Input type="text" placeholder="New e-mail" class="text-base"></Input>
        </div>
        <Input type="text" placeholder="New password" class="text-base"></Input>
        
    </div>
</template>
