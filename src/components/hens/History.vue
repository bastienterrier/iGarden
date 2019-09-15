<template>
  <v-layout id="history-collect" row align-center>
    <v-flex>
      <v-dialog v-model="dialog" persistent max-width="600">
        <template v-slot:activator="{ on }">
          <v-icon v-on="on">fa-history</v-icon>
        </template>
        <v-card>
          <v-card-title class="headline">
            Historique
            <v-icon @click="dialog = false" class="right-align">fa-times</v-icon>
          </v-card-title>
          <v-card-text>
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-left">Qui</th>
                  <th class="text-left">Quand</th>
                  <th class="text-left">Combien</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in history" :key="`${item.date}-${i}`">
                  <td>{{ item.picker }}</td>
                  <td>{{new Date(item.date) | formatDate}}</td>
                  <td>{{item.number}}</td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#FF9800" dark flat @click="dialog = false">Annuler</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { default as axios } from 'axios';
import { EggsCollect } from '../../interfaces/hens/hens.interface';
import { Utils } from '@/utils/utils';
import '@/utils/filter';

@Component({
  components: {},
})
export default class History extends Vue {
  public dialog: boolean = false;

  get history(): EggsCollect[] {
    return this.$store.state.eggsHistory;
  }

  constructor() {
    super();

    axios
      .get(`${process.env.VUE_APP_API_URL}/hens/all`)
      .then(response => {
        const result: EggsCollect[] = response.data as EggsCollect[];
        this.$store.dispatch('setEggsHistory', result);
      })
      .catch(err => {
        throw err;
      });
  }
}
</script>
