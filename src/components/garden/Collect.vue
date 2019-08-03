<template>
  <v-layout id="new-collect" row align-center>
    <v-flex>
      <v-dialog v-model="dialog" persistent max-width="400">
        <template v-slot:activator="{ on }">
          <v-btn color="#4CAF50" dark v-on="on">
            signalez votre passage
            &nbsp;
            <v-icon>fa fa-seedling</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Informations complémentaires</v-card-title>
          <v-card-text>
            <Counter v-model="Count" :max="30" />
          </v-card-text>
          <!-- 
          <v-card-text :hidden="eggsCount === 0">
            <span class="egg" v-for="(egg,i) in eggsCount" v-bind:key="i">
              <v-icon>fa fa-egg</v-icon>
            </span>
          </v-card-text>
          -->
          <v-card-text :hidden="iconResult === ''">
            <p>
              <v-icon>{{iconResult}}</v-icon>
              {{explainationError}}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#4CAF50" dark flat @click="signalCollect">Valider</v-btn>
            <v-btn color="#FF9800" dark flat @click="dialog = false">Annuler</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Counter from '@/components/commons/Counter.vue';
import { default as axios } from 'axios';
import { GardenCollectInterface } from '@/interfaces/garden/garden.interface';

@Component({
  components: { Counter },
})
export default class GardenCollect extends Vue {
  public dialog: boolean = false;
  public iconResult: string = '';
  public explainationError: string = '';
  public eggsCount: number = 0;

  private setGardenCollect(): GardenCollectInterface {}

  public signalCollect() {
    const user: string = localStorage.getItem('user') || '';
    const data: GardenCollectInterface = this.setGardenCollect();
    axios
      .post(`${process.env.VUE_APP_API_URL}/gardens`)
      .then(response => {
        this.iconResult = 'fa fa-thumbs-up';
        setTimeout(() => {
          this.dialog = false;
        }, 1000);
      })
      .catch(err => {
        this.iconResult = 'fa fa-exclamation-triangle';
        this.explainationError = err;
      });
  }
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
