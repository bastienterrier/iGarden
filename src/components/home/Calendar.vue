<template>
  <div>
    <v-sheet height="500">
      <v-calendar :now="today" :value="today" @click:date="myClickHandler">
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

@Component({
  components: { SelectDay },
})
export default class Calendar extends Vue {
  public today = new Date().toString();
  public tracked: any = {};
  public colors: string[] = ['#1867c0', '#fb8c00', '#000000'];
  public category: string[] = ['Development', 'Meetings', 'Slacking'];

  // Dialog box
  public displayConfirmation: boolean = false;
  public selectedDate: Date | undefined;

  constructor() {
    super();
    const promise = new Promise((resolve, reject) => {
      setTimeout(function() {
        resolve({
          '2019-01-09': [23, 45, 10],
          '2019-01-08': [10],
          '2019-01-07': [0, 78, 5],
          '2019-01-06': [0, 0, 50],
          '2019-01-05': [0, 10, 23],
          '2019-01-04': [2, 90],
          '2019-01-03': [10, 32],
          '2019-01-02': [80, 10, 10],
          '2019-01-01': [20, 25, 10],
        });
      }, 300);
    });

    promise.then(res => {
      console.log(res);
      Utils.copyObject(this.tracked, res);
      console.log(this.tracked);
    });
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
