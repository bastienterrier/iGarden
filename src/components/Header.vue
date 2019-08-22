<template>
  <v-app-bar dark color="#4CAF50">
    <Settings />

    <v-toolbar-title>
      <router-link to="/">iGarden</router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <router-link to="/egg">
      <v-btn icon>
        <v-icon>fa-egg</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/garden">
      <v-btn icon>
        <v-icon>fa-seedling</v-icon>
      </v-btn>
    </router-link>

    <router-link to="/todo">
      <v-btn icon>
        <v-icon>fa-tasks</v-icon>
      </v-btn>
    </router-link>
  </v-app-bar>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Settings from '@/components/settings/Settings.vue'; // @ is an alias to /src

@Component({
  components: {
    Settings,
  },
})
export default class Header extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
a:hover {
  color: #1b5e20;
}

a:hover .v-icon {
  color: #1b5e20;
}
</style>
