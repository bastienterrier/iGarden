<template>
  <div :style="style"></div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class VSpacer extends Vue {
  @Prop(Number) readonly space: number | undefined;
  private style: string = '';

  constructor() {
    super();
    this.style = `margin-top:${this.space}px;`;
  }
}
</script>
