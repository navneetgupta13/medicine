<template>
  <div class="view">hello view....</div>
</template>

<script>
import query from './services/connection.js';

export default {
  name: 'app',
  created() {
  },
  beforeDestroy() {
  },
  data () {
    return {
    };
  },
  methods: {
  },
  components: {
  },
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: Roboto, sans-serif;
    font-size: 20px;
  }

  .view {
    position: relative;
    margin: 0 auto;
    opacity: 1;
  }

  * {
    box-sizing: border-box;
  }
</style>