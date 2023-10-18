<template>
    <div class="left">
        <span>lilsnake</span>
        <span>lilsnake</span>
        <span>lilsnake</span>
        <span>lilsnake</span>
        <slot name="nijia"></slot>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            // note: changing this line won't causes changes
            // with hot-reload because the reloaded component
            // preserves its current state and we are modifying
            // its initial state.
            msg: 'nijia!'
        }
    },

}
</script>
  
<style scoped>
.left {

flex: 1;
min-height: 100vh;
background-color: black;
display: flex;
flex-direction: column;
gap: 20px;
padding: 20px;

}
.left span {
    width: 100%;
    height: fit-content;
    padding: 10px;
    background-color: rgb(68, 68, 68);
    border-radius: 10px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.5ch;
}
</style>