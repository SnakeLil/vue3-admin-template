<template>
    <div class="navbar">
        <span>{{ logo }}</span>
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
    props:['logo']

}
</script>
  
<style>
.navbar {
    width: 100%;
    display: flex;
    height: 50px;
    background-color: black;
    color: white;
    align-items: center;
    padding: 0 30px;
}
span {
    color: white;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 0.5ch;
}
</style>
  