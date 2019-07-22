

<template>
  <v-card>
    <v-card-title class="headline">Informations complémentaires</v-card-title>
    <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="green darken-1" flat @click="dialog = false">Valider</v-btn>
      <v-btn color="orange darken-1" flat @click="dialog = false">Annuler</v-btn>
    </v-card-actions>
  </v-card>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { default as axios } from 'axios';

@Component
export default class FillCollect extends Vue {
  public signalCollect() {
    axios.post('http://localhost:3000/hens', {
      picker: 'Bastien',
      number: 7,
      date: new Date(),
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
