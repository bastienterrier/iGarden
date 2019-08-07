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
            <SelectBoolean label="arrosage serre" v-model="wateringDone" />
            <SelectBoolean label="abreuvoir chevaux" v-model="horsesDone" />
            <Counter label="niveau cuve en L" :max="1000" :step="50" v-model="tankLevel" />
            <Counter label="nombre de courgette" :max="20" :step="1" v-model="courgetteNumber" />
          </v-card-text>

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
import SelectBoolean from '@/components/commons/SelectBoolean.vue';
import { default as axios } from 'axios';
import {
  GardenCollectInterface,
  GardenSummaryInterface,
} from '@/interfaces/garden/garden.interface';

@Component({
  components: { Counter, SelectBoolean },
})
export default class GardenCollect extends Vue {
  public dialog: boolean = false;
  public iconResult: string = '';
  public explainationError: string = '';
  public eggsCount: number = 0;

  private wateringDone: boolean = false;
  private horsesDone: boolean = false;
  private courgetteNumber: number = -1;
  private tankLevel: number = -1;

  private setGardenCollect(): GardenCollectInterface {
    const user: string = localStorage.getItem('user') || '';
    const summary: GardenSummaryInterface[] = new Array();
    summary.push({
      action: 'Arrosage de la serre',
      type: 'boolean',
      value: this.wateringDone,
      unit: '',
    });
    summary.push({
      action: 'Abreuvoir des chevaux',
      type: 'boolean',
      value: this.horsesDone,
      unit: '',
    });
    summary.push({
      action: 'Niveau de la cuve',
      type: 'number',
      value: this.tankLevel === -1 ? NaN : this.tankLevel,
      unit: 'L',
    });
    summary.push({
      action: 'Courgettes récupérées',
      type: 'number',
      value: this.courgetteNumber === -1 ? NaN : this.courgetteNumber,
      unit: '',
    });

    const gardenCollect: GardenCollectInterface = {
      user,
      date: new Date(),
      summary,
    };

    return gardenCollect;
  }

  public signalCollect() {
    const user: string = localStorage.getItem('user') || '';
    const data: GardenCollectInterface = this.setGardenCollect();
    axios
      .post(`${process.env.VUE_APP_API_URL}/gardens`, data)
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
