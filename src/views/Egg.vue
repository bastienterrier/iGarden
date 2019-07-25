<template>
  <div>
    <Hens />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Hens from '@/components/hens/Hens.vue'; // @ is an alias to /src

@Component({
  components: {
    Hens,
  },
})
export default class Egg extends Vue {}
</script>
