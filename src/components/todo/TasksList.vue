<template>
  <div>
    <v-select
      v-model="categoriesValues"
      :items="categoriesItems"
      chips
      label="Affichage"
      multiple
      outlined
    ></v-select>
    <div v-for="item in tasksToDisplay" :key="item.title">
      <v-card class="mx-auto" :class="`task-${item.state}`">
        <v-card-title style="text-align: left;">
          {{item.title}}
          <div class="wip" :hidden="item.state!=='WIP'">🚧 en cours</div>
        </v-card-title>
        <v-card-text class="left">{{item.description}}</v-card-text>
        <!--  <v-card-text :hidden="item.state!=='WIP'">
          <span class="percent">{{item.progress}}%</span>
          <v-progress-linear color="#1b5e20" height="6" class="progress-bar" :value="item.progress"></v-progress-linear>
        </v-card-text>-->
        <v-card-actions>
          <v-btn
            color="#4CAF50"
            dark
            :class="item.state==='TODO'?'':'hide'"
            @click="beginTask(item.title)"
          >
            <v-icon>fa-wrench</v-icon>&nbsp;Commencer
          </v-btn>
          <v-btn
            color="#4CAF50"
            dark
            :class="item.state!=='DONE'?'':'hide'"
            @click="endTask(item.title)"
          >
            <v-icon>fa-check</v-icon>&nbsp;Terminer
          </v-btn>
        </v-card-actions>
      </v-card>
      <VSpacer space="5" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import VSpacer from '@/components/commons/VSpacer.vue'; // @ is an alias to /src
import '@/utils/filter';
import { default as axios } from 'axios';
import { Utils } from '@/utils/utils';
import { ToDoInterface, ToDoState } from '@/interfaces/todo/todo.interface';

@Component({
  components: {
    VSpacer,
  },
})
export default class TasksList extends Vue {
  public categoriesItems: string[] = ['Terminées', 'En cours', 'A faire'];
  public categoriesValues: string[] = ['Terminées', 'En cours', 'A faire'];

  get tasksToDisplay(): ToDoInterface[] {
    return this.$store.state.tasksToDisplay;
  }
  get tasks(): ToDoInterface[] {
    return this.$store.state.tasks;
  }

  constructor() {
    super();
    axios
      .get(`${process.env.VUE_APP_API_URL}/todos/all`)
      .then(response => {
        const result: ToDoInterface[] = response.data as ToDoInterface[];
        this.$store.dispatch('setTasksToDisplay', result);
        this.$store.dispatch('setTasks', result);
      })
      .catch(err => {
        console.error(err);
      });
  }

  @Watch('categoriesValues')
  onPropertyChanged(value: string[], oldValue: string[]) {
    if (value instanceof Array) {
      const tmp: ToDoInterface[] = new Array();
      value.forEach(s => {
        this.tasks.forEach(t => {
          if (Utils.translateTodoStateVerbose(s) === t.state) {
            tmp.push(t);
          }
        });
      });
      this.$store.dispatch('setTasksToDisplay', tmp);
    }
  }

  axiosUpdateState(title: string, state: string) {
    axios
      .patch(`${process.env.VUE_APP_API_URL}/todos/${title}`, { state })
      .then(response => {
        (this.tasksToDisplay.find(
          elt => elt.title === title,
        ) as ToDoInterface).state = Utils.translateTodoState(state);
      })
      .catch(err => {
        console.error(err);
      });
  }

  beginTask(title: string) {
    this.axiosUpdateState(title, 'WIP');
  }

  endTask(title: string) {
    this.axiosUpdateState(title, 'DONE');
  }
}
</script>

<style scoped>
ul li {
  text-align: center;
}
.percent {
  font-size: 1.2em;
}
.progress-bar {
  width: 80%;
  margin-left: 10%;
  text-align: center;
}
.left {
  text-align: justify;
}
.hide {
  display: none;
}
.wip {
  font-size: 0.9em;
  text-align: right;
}
.task-DONE {
  background-color: #c5c5c577 !important;
}
</style>
