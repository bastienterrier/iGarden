<template>
  <div id="app">
    <Header />
    <v-container id="body-content">
      <router-view />
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue'; // @ is an alias to /src

@Component({
  components: {
    Header,
  },
})
export default class App extends Vue {}
</script>


<style>
html {
  overflow: auto !important;
  position: inherit;
  z-index: initial;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  z-index: 0;
}
#body-content {
  margin-top: 20px;
  position: relative;
  z-index: -1;
}

.highlight {
  font-size: 2em;
}

.right-align {
  right: 20px;
  position: absolute;
}
</style>
