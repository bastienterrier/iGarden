   
<template>
  <div>
    <v-btn icon @click.stop="drawer = !drawer">
      <v-icon>fa-cog</v-icon>
    </v-btn>
    <v-navigation-drawer v-model="drawer" absolute app temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon :color="color">fa-leaf</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{user}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-color-picker
        style="width:100%;"
        hide-inputs
        dark
        mode="hexa"
        hide-mode-switch
        mode.sync="hexa"
        v-model="color"
      />
      <v-btn flat text @click="updateColor">Mettre à jour</v-btn>
    </v-navigation-drawer>

    <v-overlay :value="loading" :style="css">Changements en cours...</v-overlay>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { default as axios } from 'axios';
import { Utils } from '../../utils/utils';

@Component({
  components: {},
})
export default class Settings extends Vue {
  public drawer: boolean = false;

  public user: string = Utils.getCurrentUser();
  public color: string = Utils.getCurrentUserColor();
  public loading: boolean = false;

  public css: string = '';

  constructor() {
    super();
    const body = document.body,
      html = document.documentElement;

    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    this.css = `height:${height}px;`;
  }

  updateColor() {
    this.drawer = false;

    axios
      .patch(`${process.env.VUE_APP_API_URL}/settings/users/${this.user}`, {
        color: this.color,
      })
      .then(response => {
        this.loading = true;

        window.location.reload();
      })
      .catch(err => {
        console.error(err);
      });
  }
}
</script>