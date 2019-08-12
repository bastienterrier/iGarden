<template>
  <div>
    <v-btn-toggle v-model="toggle_one" mandatory>
      <input class="label-input" :value="label" disabled />
      <v-btn flat :color="validateColor" @click="validate">
        <v-icon>fa-check</v-icon>
      </v-btn>
      <v-btn flat :color="invalidateColor" @click="invalidate">
        <v-icon>fa-times</v-icon>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SelectBoolean extends Vue {
  @Prop({ default: 'label' })
  label: string | undefined;

  validateColor: string = '';
  invalidateColor: string = '';

  validate() {
    this.validateColor = '#4CAF50';
    this.invalidateColor = '';
    this.$emit('input', true);
  }

  invalidate() {
    this.invalidateColor = '#FF9800';
    this.validateColor = '';
    this.$emit('input', false);
  }
}
</script>

<style scoped>
.label-input {
  border: solid rgb(214, 211, 211) 1px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  text-align: center;
  width: 150px;
}
</style>
