<template>
    <div>
        <svg :style="{width,height}">
            <use :xlink:href="prefix+name" :fill='color'>
            </use>
        </svg>
    </div>
</template>

<script setup lang="ts">
defineProps({
    prefix:{
        type:String,
        default:'#icon-'
    },
    name:{
        type:String,
    },
    width:{
        type:String,
        default:'30px'
    },
    height:{
        type:String,
        default:'30px'
    },
    color:{
        type:String,
        default:'black'
    },
})
</script>

<style scoped></style>