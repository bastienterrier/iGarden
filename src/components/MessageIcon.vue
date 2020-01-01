<template>
  <div class="message-icon" :hidden="hideIcon">
    <router-link to="/message">
      <v-btn icon>
        <v-icon x-large>fa-comments</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class MessageIcon extends Vue {
  hideIcon: boolean = false;

  @Watch('$route')
  onPropertyChanged(newRoute: any, oldRoute: any) {
    this.hideIcon = newRoute.name === 'message';
  }
}
</script>

<style scoped>
.message-icon {
  position: fixed;
  right: 30px;
  bottom: 30px;
}

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
