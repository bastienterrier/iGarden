<template>
  <div>
    <SelectUser />

    <Calendar/>

    <ul>
      <li>
        <router-link to="/egg">
          Collecte des oeufs
          <v-icon color="#4CAF50">fa-egg</v-icon>
        </router-link>
      </li>
      <li>
        <router-link to="/garden">
          Arrosage du potager
          <v-icon color="#4CAF50">fa-seedling</v-icon>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  color: #1b5e20;
}
ul li {
  list-style-type: none;
  padding-top: 10px;
}
</style>



<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SelectUser from '@/components/commons/SelectUser.vue'; // @ is an alias to /src
import Calendar from '@/components/home/Calendar.vue'; // @ is an alias to /src

@Component({
  components: {
    SelectUser,
    Calendar
  },
})
export default class Home extends Vue {}
</script>
