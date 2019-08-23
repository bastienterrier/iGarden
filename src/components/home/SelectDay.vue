<template>
  <div id="select-day">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="300">
        <v-card>
          <v-card-title class="headline">{{date | formatDay}}</v-card-title>
          <v-card-text>
            <Weather :date="date" />
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#4CAF50" dark flat @click="selectDay">
              <span v-if="check===false">Confirmer</span>
              <span v-else>Se désinscrire</span>
            </v-btn>
            <v-btn color="#FF9800" dark flat @click="closeDialog">Annuler</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import '@/utils/filter';
import { default as axios } from 'axios';
import { CalendarCollectInterface } from '../../interfaces/calendar/calendar.interface';
import { Utils } from '../../utils/utils';
import Weather from '@/components/home/Weather.vue';

@Component({
  components: { Weather },
})
export default class SelectDay extends Vue {
  public dialog: boolean = true;
  public user: string = Utils.getCurrentUser();
  public confirmOrDelete: string = 'Confirmer';

  @Prop(Date) readonly date: Date | undefined;
  @Prop() readonly check: boolean | undefined;

  public selectDay() {
    if (this.date instanceof Date) {
      const data: CalendarCollectInterface = {
        user: this.user,
        date: new Date(this.date),
      };

      if (this.check === true) {
        axios
          .delete(`${process.env.VUE_APP_API_URL}/calendars`, { data })
          .then(res => console.log(res))
          .catch(err => console.error(err));
      } else {
        axios
          .post(`${process.env.VUE_APP_API_URL}/calendars`, data)
          .then(res => console.log(res))
          .catch(err => console.error(err));
      }
    }

    this.closeDialog();
  }

  public closeDialog() {
    this.$emit('closeDialog');
  }
}
</script>