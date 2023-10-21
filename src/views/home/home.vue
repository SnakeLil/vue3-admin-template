<template>
    <div>
{{ userStore.username }}
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
onMounted(()=>{

    // userStore.UserInfo()
    
})
</script>

<style scoped lang="scss">

</style>