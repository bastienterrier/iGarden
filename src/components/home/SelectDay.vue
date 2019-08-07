<template>
  <div id="select-day">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="300">
        <v-card>
          <v-card-title class="headline">{{date | formatDay}}</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#4CAF50" dark flat @click="selectDay">Confirmer</v-btn>
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

@Component({
  components: {},
})
export default class SelectDay extends Vue {
  public dialog: boolean = true;
  public user: string = localStorage.getItem('user') || '';

  @Prop(Number) readonly date: Date | undefined;

  public selectDay() {
    console.log(this.user);
    this.closeDialog();
  }

  public closeDialog() {
    this.$emit('closeDialog');
  }
}
</script>