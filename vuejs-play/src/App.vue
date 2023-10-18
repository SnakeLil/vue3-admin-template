
<template>
  <div id="app">
    <navbar :logo="logo"></navbar>
    <Nijia>

      
    </Nijia>

  </div>
</template>

<script>
import Nijia from './components/Nijia.vue'
import navbar from './components/navbar.vue'
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello Vue!',
      logo:'lilsnkae~'
    }
  },
  props:['name'],
  components:{Nijia,navbar}
}
</script>

<style >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}
body {
  font-family: Helvetica, sans-serif;
}
#app {
  display: flex;
  flex-direction: column;
}

</style>
