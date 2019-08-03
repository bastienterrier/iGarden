<template>
  <div>
    <p class="highlight">{{gardenCollect.user}} le {{gardenCollect.date | formatDate}}</p>

    <p v-for="item in gardenCollect.summary" :key="item.action">
      {{displayResult(item)}}
      {{ item.action }}
      <b
        style="font-size:1.2em;"
      >{{displayValue(item)}}</b>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VSpacer from '@/components/commons/VSpacer.vue'; // @ is an alias to /src
import '@/utils/filter';
import {
  GardenCollectInterface,
  GardenSummaryInterface,
} from '@/interfaces/garden/garden.interface';
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
      })
      .catch(err => {
        throw err;
      });
  }

  displayResult(item: GardenSummaryInterface) {
    if (item.type === 'boolean') {
      return item.value ? '✔️' : '❌';
    } else if (item.type === 'number') {
      return item.value === null ? '❌' : '✔️';
    }
  }

  displayValue(item: GardenSummaryInterface) {
    if (item.type === 'number' && item.value !== null) {
      return item.unit !== '' ? `${item.value} ${item.unit}` : item.value;
    }
    return '';
  }
}
</script>

<style scoped>
td {
  text-align: left;
}
</style>
