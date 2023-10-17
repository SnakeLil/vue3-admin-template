<template>
  <div class="app">
    
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import {login} from '@/api/user'
onMounted(()=>{
  login({
    username: 'admin',
    password: '111111'
  }).then(res=>{
    console.log(res)
  })
})
</script>

<style scoped lang="scss">



</style>