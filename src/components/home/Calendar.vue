<template>
  <div>
    <v-sheet height="500">
      <v-calendar :now="today" :value="today" @click:date="myClickHandler" v-show="show.value">
        <template v-slot:day="{ present, past, date }">
          <v-layout fill-height>
            <template v-if="past && tracked[date]">
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

    <SelectDay
      :hidden="!displayConfirmation"
      :date="selectedDate"
      v-on:closeDialog="handleCloseDialog"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { default as axios } from 'axios';
import { Utils } from '@/utils/utils';
import SelectDay from '@/components/home/SelectDay.vue';
import { CalendarCollectInterface } from '@/interfaces/calendar/calendar.interface';

class ObservableBoolean {
  public value: boolean = false;

  public update(newValue: boolean) {
    this.value = newValue;
  }
}

class Dictionnary<T> {
  private keys: string[];
  private values: T[][];

  constructor() {
    this.keys = new Array();
    this.values = new Array();
  }

  addKey(key: string) {
    if (this.keys.indexOf(key) === -1) {
      this.keys.push(key);
      this.values.push(new Array());
    }
  }

  addKeyValue(key: string, value: T) {
    const keyIndex: number = this.keys.indexOf(key);
    if (keyIndex !== -1) {
      this.values[keyIndex].push(value);
    }
  }
}

@Component({
  components: { SelectDay },
})
export default class Calendar extends Vue {
  public today = new Date().toString();
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

    this.test();
  }

  test() {
    const dico: Dictionnary<string> = new Dictionnary();

    dico.addKey('today');
    dico.addKey('yesterday');
    dico.addKey('tomorrow');

    dico.addKeyValue('today', 'Bastien');
    dico.addKeyValue('today', 'Margot');
    dico.addKeyValue('yesterday', 'Cyril');
    dico.addKeyValue('tomorow', 'Ludivine');

    console.log(dico);
  }

  computeData(data: CalendarCollectInterface[]) {
    console.log(data);

    // '2019-01-09': [23, 45, 10],

    /**
     * {
    "user": "Bastien",
    "date": "2019-08-08T00:00:00.000Z"
  },
     */

    data.forEach(elt => {
      const key: string = elt.date.toString().substring(0, 10);
      console.log(key);
    });

    Utils.copyObject(this.tracked, data);
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
