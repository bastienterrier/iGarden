<template>
  <div>
    <v-sheet height="500">
      <v-calendar
        :value="today"
        @click:date="myClickHandler"
        v-show="show.value"
        :weekdays="[1, 2, 3, 4, 5, 6, 0]"
        locale="fr"
      >
        <template v-slot:day="{ present, past, date }">
          <v-layout fill-height>
            <template>
              <v-sheet
                v-for="(percent, i) in tracked[date]"
                :key="i"
                :title="category[i]"
                :color="colors[i]"
                :width="`${percent}%`"
                height="100%"
                tile
              ></v-sheet>
            </template>
          </v-layout>
        </template>
      </v-calendar>
    </v-sheet>

    <VSpacer v-bind:space="20" />

    <v-layout align-center justify-space-around row fill-height id="legend">
      <v-flex
        class="legend-item"
        v-for="(color, i) in colors"
        :key="i"
        :style="setBackgroundColor(color)"
      >{{category[i]}}</v-flex>
    </v-layout>

    <SelectDay
      :hidden="!displayConfirmation"
      :date="selectedDate"
      v-on:closeDialog="handleCloseDialog"
    />
  </div>
</template>

<style scoped>
#legend {
  margin-left: 5px;
  margin-right: 5px;
}
.legend-item {
  padding: 5px;
  color: white;
}
</style>

<style>
.v-calendar-weekly__day.v-present .v-calendar-weekly__day-label button {
  background-color: red;
}
</style>



<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { default as axios } from 'axios';
import { Utils } from '@/utils/utils';
import SelectDay from '@/components/home/SelectDay.vue';
import VSpacer from '@/components/commons/VSpacer.vue';
import { CalendarCollectInterface } from '@/interfaces/calendar/calendar.interface';

class ObservableBoolean {
  public value: boolean = false;

  public update(newValue: boolean) {
    this.value = newValue;
  }
}

class CalendarDictionnary {
  public keys: string[];
  public values: number[][];
  private length: number = Utils.getUsers().length;

  constructor() {
    this.keys = new Array();
    this.values = new Array();
  }

  createKey(key: string) {
    if (this.keys.indexOf(key) === -1) {
      this.keys.push(key);
      this.values.push(new Array(length).fill(0));
    }
  }

  push(key: string, index: number, value: number) {
    const keyIndex: number = this.keys.indexOf(key);
    if (keyIndex !== -1) {
      this.values[keyIndex][index] = value;
    } else {
      this.createKey(key);
      this.push(key, index, value);
    }
  }
}

@Component({
  components: { SelectDay, VSpacer },
})
export default class Calendar extends Vue {
  public today: string = '2019-08-10';
  public tracked: any = {};
  public colors: string[] = Utils.getUsersColor();
  public category: string[] = Utils.getUsers();
  public show: ObservableBoolean = new ObservableBoolean();

  // Dialog box
  public displayConfirmation: boolean = false;
  public selectedDate: Date | undefined;

  constructor() {
    super();
    axios.get(`${process.env.VUE_APP_API_URL}/calendars/all`).then(res => {
      this.computeData(res.data);
      this.show.update(true);
    });
  }

  translate(i: number) {
    switch (i) {
      case 0:
        return 'Lundi';
      case 0:
        return 'Lundi';
      case 0:
        return 'Lundi';
      case 0:
        return 'Lundi';
      case 0:
        return 'Lundi';
      case 0:
        return 'Lundi';
    }
  }

  setBackgroundColor(color: string): string {
    return `background-color:${color}`;
  }

  computeData(data: CalendarCollectInterface[]) {
    const dico: CalendarDictionnary = new CalendarDictionnary();
    const users: string[] = Utils.getUsers();

    // Fill dico structure
    data.forEach(elt => {
      const key: string = elt.date.toString().substring(0, 10);

      const index: number = users.indexOf(elt.user);

      dico.push(key, index, 14);
    });

    const calendarData: any = {};

    dico.keys.forEach((k, i) => {
      calendarData[k] = dico.values[i];
    });

    console.log(calendarData);

    /*  const toto = {
      '2019-08-09': [23, 45, 10],
      '2019-08-08': [10],
      '2019-08-07': [0, 78, 5],
      '2019-08-06': [0, 0, 50],
      '2019-08-05': [0, 10, 23],
      '2019-08-04': [2, 90],
      '2019-08-03': [10, 32],
      '2019-08-02': [80, 10, 10],
      '2019-08-01': [20, 25, 10],
    };

    console.log(toto); */

    Utils.copyObject(this.tracked, calendarData);
    console.log(this.tracked);
  }

  myClickHandler(data: any) {
    console.log(data);
    this.displayConfirmation = true;
    this.selectedDate = new Date(data.date);
  }

  handleCloseDialog() {
    this.displayConfirmation = false;
  }
}
</script>
