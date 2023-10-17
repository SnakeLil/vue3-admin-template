<template>
  <div>
    <svg-icon name="home" color="gray" width="40px" height="40px"/>

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