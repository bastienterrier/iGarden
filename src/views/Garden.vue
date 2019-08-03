<template>
  <div>
    <!--     <p>🚧 Fonctionnalité en cours de développement...</p>
    -->
    <GardenSummary />
    <VSpacer v-bind:space="25" />
    <GardenCollect />
  </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GardenSummary from '@/components/garden/Summary.vue'; // @ is an alias to /src
import GardenCollect from '@/components/garden/Collect.vue'; // @ is an alias to /src
import VSpacer from '@/components/commons/VSpacer.vue'; // @ is an alias to /src

@Component({
  components: { GardenSummary, GardenCollect, VSpacer },
})
export default class Garden extends Vue {}
</script>
