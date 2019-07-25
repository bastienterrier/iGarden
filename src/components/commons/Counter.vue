<template>
  <div>
    <v-btn-toggle v-model="toggle_one" mandatory>
      <input
        class="counter-input"
        type="number"
        :min="0"
        :max="max"
        :step="1"
        @blur="blurHandler"
        v-model.number="currentValue"
        @keydown.up.prevent="increment"
        @keydown.down.prevent="decrement"
      />
      <v-btn flat class="decrement-button" :disabled="decrementDisabled" @click="decrement">
        <v-icon>fa fa-angle-down</v-icon>
      </v-btn>
      <v-btn flat class="increment-button" :disabled="incrementDisabled" @click="increment">
        <v-icon>fa fa-angle-up</v-icon>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Counter extends Vue {
  public currentValue: number = 0;
  public value: number = 1;
  public decrementDisabled = false;
  public incrementDisabled = false;

  @Prop()
  max: number = 20;

  increment() {
    let newVal = this.currentValue + 1;
    this.decrementDisabled = false;
    this.updateValue(newVal);
  }

  decrement() {
    let newVal = this.currentValue - 1;
    this.incrementDisabled = false;
    this.updateValue(newVal);
  }

  blurHandler(n: any) {
    const blurVal: number = n.srcElement.value;
    console.log(blurVal);

    this.updateValue(blurVal);
  }

  updateValue(newVal: number) {
    const oldVal = this.currentValue;

    if (oldVal === newVal || typeof this.value !== 'number') {
      return;
    }
    if (newVal <= 0) {
      newVal = 0;
      this.decrementDisabled = true;
    }
    if (newVal >= this.max) {
      newVal = this.max;
      this.incrementDisabled = true;
    }
    this.currentValue = newVal;
    this.$emit('input', this.currentValue);
  }
}
</script>

<style scoped>
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.counter-input {
  margin-left: 20px;
}
</style>
