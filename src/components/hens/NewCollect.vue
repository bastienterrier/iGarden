<template>
  <div id="new-collect">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="400">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">Signalez votre passage !</v-btn>
        </template>
        <FillCollect/>
        
      </v-dialog>
    </v-layout>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import FillCollect from '@/components/hens/FillCollect.vue'; // @ is an alias to /src

import { default as axios } from 'axios';

@Component({
  components: {FillCollect},
})
export default class NewCollect extends Vue {
  public dialog: boolean = false;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.click {
  text-decoration: underline;
  text-decoration-style: dotted;
  cursor: pointer;
}
</style>
