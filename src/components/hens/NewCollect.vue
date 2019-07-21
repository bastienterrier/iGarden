<template>
  <div id="new-collect">
    <p @click="signalCollect">Signalez votre passage !</p>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { default as axios } from "axios";

@Component
export default class NewCollect extends Vue {
  signalCollect() {
    console.log("new collect");
    axios.post("http://localhost:3000/hens", {
      picker: "Bastien",
      number: 7,
      date: new Date()
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
