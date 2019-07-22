<template>
  <div>
    <Header />

    <Hens />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/Header.vue'; // @ is an alias to /src
import Hens from '@/components/hens/Hens.vue'; // @ is an alias to /src

@Component({
  components: {
    Header,
    Hens,
  },
})
export default class Home extends Vue {}
</script>
