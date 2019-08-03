<template>
  <div id="last-collect">
    <p
      :hidden="eggsCollect.picker===''"
    >{{eggsCollect.picker}} a récupéré {{eggsCollect.number}} oeufs le {{ eggsCollect.date | formatDate }}.</p>
    <div :hidden="eggsCollect.picker!==''">
      {{errorMessage.message}}
      <div :hidden="errorMessage.message!==''">
        <v-progress-circular indeterminate color="#4CAF50"></v-progress-circular>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UtilsDate } from '@/utils/date';
import { default as axios } from 'axios';
import { EggsCollect } from '@/interfaces/hens/hens.interface';
import { ErrorInterface } from '@/interfaces/commons/error.interface';
import { Utils } from '@/utils/utils';
import '@/utils/filter';

@Component
export default class LastCollect extends Vue {
  private eggsCollect: EggsCollect = new EggsCollect();
  private errorMessage: ErrorInterface;

  constructor() {
    super();

    this.errorMessage = {
      message: '',
    };

    axios
      .get(`${process.env.VUE_APP_API_URL}/hens/last`)
      .then(response => {
        const result: EggsCollect = response.data as EggsCollect;
        Utils.copyObject(this.eggsCollect, result);
      })
      .catch(err => {
        this.errorMessage.message = err;
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
