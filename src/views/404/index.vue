<template>
    <div class="error">
        <img src="https://i.imgur.com/QIxIKBH.png" alt="">
        <h1>Error 404</h1>
            <h2>找不到页面~</h2>
            
        <router-link to="/">——》点击返回首页《——</router-link>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.error {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    img {
        height: 70%;
        transform: scale(1);
        transition: all 1s linear;
        animation: bounce 2s ease;
    }
    h1 {
        font-size: 80px;
        font-weight: bold;
        animation: bounce 2s ease;
    }
        h2 {
            font-size: 30px;
            font-weight: bold;
            animation: bounce 2s ease;
        }
        a {
            font-size: 14px;
            text-decoration: none;
            color: gray;
            font-weight: bold;

        }
        a:hover {
            color:  #002c38;
        }
}
animation {
    @keyframes bounce {
        0% {
            transform: scale(0);
        }

        100% {
            transform: scale(1);
        }
    }
}

/*
    .error {
        img {
            animation: bounce 1s infinite;
        }
    }
*/
</style>