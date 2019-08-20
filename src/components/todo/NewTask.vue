<template>
  <v-layout id="new-task" row align-center>
    <v-flex>
      <v-dialog v-model="dialog" persistent max-width="400">
        <template v-slot:activator="{ on }">
          <v-btn color="#4CAF50" dark v-on="on">
            Créer une tâche
            &nbsp;
            <v-icon>fa-clipboard-list</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">
            Informations complémentaires
            <v-icon @click="dialog = false" class="right-align">fa-times</v-icon>
          </v-card-title>
          <v-card-text>
            <v-text-field label="Tâche" solo v-model="title"></v-text-field>
            <v-textarea solo label="Description" auto-grow v-model="description"></v-textarea>
          </v-card-text>

          <v-card-text :hidden="iconResult === ''">
            <p>
              <v-icon>{{iconResult}}</v-icon>
              {{explainationError}}
            </p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#4CAF50" dark flat @click="newTask" :disabled="disableBtn">Valider</v-btn>
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
import { Utils } from '../../utils/utils';
import { ToDoInterface, ToDoState } from '../../interfaces/todo/todo.interface';

@Component({
  components: {},
})
export default class NewTask extends Vue {
  public dialog: boolean = false;
  public iconResult: string = '';
  public explainationError: string = '';
  public disableBtn: boolean = false;

  public description: string = '';
  public title: string = '';

  public newTask() {
    this.disableBtn = true;
    const data: ToDoInterface = {
      title: this.title,
      state: ToDoState.TODO,
      progress: 0,
      date: new Date(),
      description: this.description,
    };
    axios
      .post(`${process.env.VUE_APP_API_URL}/todos`, data)
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
