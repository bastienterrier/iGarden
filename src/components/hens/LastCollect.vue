<template>
  <div id="last-collect">
    <p>{{eggsCollect.picker}} a récupéré {{eggsCollect.number}} oeufs le {{ eggsCollect.date | formatDate }}.</p>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UtilsDate } from '@/utils/date';
import { default as axios } from 'axios';
import { EggsCollect } from '@/interfaces/hens/hens.interface';

Vue.filter('formatDate', (date: Date) => {
  if (date) {
    return `${UtilsDate.translateDay(
      date.getDay(),
    )} ${date.getDate()} ${UtilsDate.translateMounth(
      date.getMonth(),
    )} vers ${date.getHours()}h`;
  }
});
@Component
export default class LastCollect extends Vue {
  private eggsCollect: EggsCollect;

  constructor() {
    super();

    this.eggsCollect = {
      picker: 'no one',
      number: 0,
      date: new Date(),
    };

    axios
      .get('http://localhost:3000/hens/last')
      .then((response) => {
        const result: EggsCollect = response.data as EggsCollect;
        this.eggsCollect.picker = result.picker;
        this.eggsCollect.number = result.number;
        this.eggsCollect.date = new Date(result.date);
      })
      .catch((err) => {
        throw err;
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
