<template>
  <div id="select-user">
    <v-layout row justify-center>
      <v-dialog v-model="dialog" persistent max-width="300">
        <v-card>
          <v-card-title class="headline">Sélectionner un nom</v-card-title>
          <v-card-text>
            <v-flex>
              <v-select :items="users" label="Selectionnez un nom" v-model="user"></v-select>
            </v-flex>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="#4CAF50" dark flat @click="selectUser">Valider</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Utils } from '../../utils/utils';

@Component({
  components: {},
})
export default class SelectUser extends Vue {
  public dialog: boolean = true;
  private users: string[];
  public user: string = '';

  constructor() {
    super();
    this.users = Utils.getUsers();
    let user: string = localStorage.getItem('user') || '';
    if (user !== '') {
      this.dialog = false;
    }
  }

  public selectUser() {
    if (this.user !== '') {
      localStorage.setItem('user', this.user);
      this.dialog = false;
    }
  }
}
</script>