<template>
  <div>
    <v-btn small @click="$refs.calendar.prev()">
      <v-icon dark>fa-angle-left</v-icon>
    </v-btn>
    <v-btn small @click="$refs.calendar.next()">
      <v-icon dark>fa-angle-right</v-icon>
    </v-btn>
    <VSpacer space="5" />
    <v-sheet height="500">
      <v-calendar
        ref="calendar"
        :value="today"
        :now="today"
        @click:date="myClickHandler"
        v-show="show.value"
        :weekdays="[1, 2, 3, 4, 5, 6, 0]"
        locale="fr"
        v-model="start"
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
        >{{ category[i] }}</v-flex
      >
    </v-layout>

    <SelectDay
      :hidden="!displayConfirmation"
      :date="selectedDate"
      :check="alreadyCheck.value"
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
  private length: number = Utils.getUsersName().length;

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
  public today: string = new Date().toISOString().split('T')[0]; //new Date().toISOString().split('T')[0];
  public colors: string[] = Utils.getUsersColor();
  public category: string[] = Utils.getUsersName();
  public show: ObservableBoolean = new ObservableBoolean();

  public start: string;

  // Dialog box
  public displayConfirmation: boolean = false;
  public selectedDate: Date | undefined;
  public alreadyCheck: ObservableBoolean = new ObservableBoolean();

  get tracked(): any {
    return this.$store.state.calendarEvents;
  }

  constructor() {
    super();
    this.start = this.today;
    axios.get(`${process.env.VUE_APP_API_URL}/calendars/all`).then(res => {
      this.computeData(res.data);
      this.show.update(true);
    });
  }

  setBackgroundColor(color: string): string {
    return `background-color:${color}`;
  }

  computeData(data: CalendarCollectInterface[]) {
    const dico: CalendarDictionnary = new CalendarDictionnary();
    const users: string[] = Utils.getUsersName();
    const width: number = 100 / users.length;

    // Fill dico structure
    data.forEach(elt => {
      const key: string = elt.date.toString().substring(0, 10);

      const index: number = users.indexOf(elt.user);

      dico.push(key, index, width);
    });

    const calendarData: any = {};

    dico.keys.forEach((k, i) => {
      calendarData[k] = dico.values[i];
    });

    this.$store.dispatch('setCalendarEvents', calendarData);
  }

  myClickHandler(data: any) {
    this.selectedDate = new Date(data.date);

    this.alreadyCheck.update(this.isAlreadyChecked(data.date));
    this.displayConfirmation = true;
  }

  handleCloseDialog() {
    this.displayConfirmation = false;
  }

  isAlreadyChecked(date: Date): boolean {
    const user: string = Utils.getCurrentUserName();
    const index: number = Utils.getUsersName().indexOf(user);
    const theDate: string = date.toString().substring(0, 10);
    const width: number = 100 / Utils.getUsersName().length;

    if (this.tracked[theDate] === undefined) {
      return false;
    }

    return this.tracked[theDate][index] === width ? true : false;
  }
}
</script>
