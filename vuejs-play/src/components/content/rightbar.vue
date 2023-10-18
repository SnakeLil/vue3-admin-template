<template>
    <div class="right">
        <span>lilsnake</span>
        <span>lilsnake</span>
        <span>lilsnake</span>
        <span>lilsnake</span>
        <!-- <slot name="nijia"></slot> -->
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
</script scoped>
  
<style>
.right {
flex: 7;
min-height: 100vh;
background-color: rgb(184, 184, 184);
display: flex;
flex-direction: column;

padding: 20px;

}

</style>