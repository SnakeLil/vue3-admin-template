<template>
    <div class="nijia">
        <leftbar><span slot="nijia">232</span></leftbar>
        <rightbar></rightbar>
    </div>
</template>
  
<script>
import leftbar from './content/leftbar.vue'
import rightbar from './content/rightbar.vue'
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
    components:{leftbar,rightbar}

}
</script scoped>
  
<style>
span {
    color: white;
}
h3 {
    color: green;
}
.nijia {
    display: flex;
    width: 100%;
    height: 100vh;

}
</style>
  