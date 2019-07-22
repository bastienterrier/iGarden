<template>
  <div id="header">
    <h1 id="title">iGarden</h1>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Header extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#header {
  background-color: brown;
}
#title {
  font-size: 2em;
}
</style>
