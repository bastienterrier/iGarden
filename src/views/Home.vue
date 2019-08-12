<template>
  <div>
    <SelectUser />

    <Calendar/>

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
