<template>
  <div>
    <v-simple-table>
      <thead>
        <tr>
          <th style="font-size:2em;">{{gardenCollect.user}} le {{gardenCollect.date | formatDate}}</th>
          <th>Commentaire</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in gardenCollect.summary" :key="item.action">
          <td>
            {{displayResult(item.type, item.value)}}
            {{ item.action }}
          </td>
          <td>{{item.comment}}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VSpacer from '@/components/commons/VSpacer.vue'; // @ is an alias to /src
import '@/utils/filter';
import { GardenCollectInterface } from '@/interfaces/garden/garden.interface';
import { default as axios } from 'axios';
import { Utils } from '@/utils/utils';

@Component({
  components: {
    VSpacer,
  },
})
export default class GardenSummary extends Vue {
  public gardenCollect: GardenCollectInterface = {
    user: '',
    date: new Date(),
    summary: [],
  };

  constructor() {
    super();
    axios
      .get(`${process.env.VUE_APP_API_URL}/gardens/last`)
      .then(response => {
        const result: GardenCollectInterface = response.data as GardenCollectInterface;
        Utils.copyObject(this.gardenCollect, result);
        console.log(this.gardenCollect);
      })
      .catch(err => {
        throw err;
      });
  }

  displayResult(type: string, value: any) {
    if (type === 'boolean') {
      return value ? '✔️' : '❌';
    } else if (type === 'number') {
      return value === null ? '❌' : `✔️ ${value} - `;
    }
  }
}
</script>

<style scoped>
td {
  text-align: left;
}
</style>
