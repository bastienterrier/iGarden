<template>
  <div>
    <SelectUser />

    <p>
      <router-link to="/egg">Collecte des oeufs</router-link>
      <router-link to="/garden">Arrosage du potager</router-link>
      <router-link to="/horse">Abreuvoir des chevaux</router-link>
    </p>
  </div>
</template>



<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SelectUser from '@/components/commons/SelectUser.vue'; // @ is an alias to /src

@Component({
  components: {
    SelectUser,
  },
})
export default class Home extends Vue {}
</script>
