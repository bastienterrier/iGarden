<template>
  <div>
    <LastCollect />
    <NewCollect />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LastCollect from '@/components/hens/LastCollect.vue'; // @ is an alias to /src
import NewCollect from '@/components/hens/NewCollect.vue'; // @ is an alias to /src

@Component({
  components: {
    LastCollect,
    NewCollect,
  },
})
export default class Hens extends Vue {}
</script>