<template>
  <div>
    <TasksList />
    <VSpacer space="20" />
    <NewTask />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TasksList from '@/components/todo/TasksList.vue'; // @ is an alias to /src
import NewTask from '@/components/todo/NewTask.vue'; // @ is an alias to /src
import VSpacer from '@/components/commons/VSpacer.vue'; // @ is an alias to /src

@Component({
  components: {
    TasksList,
    VSpacer,
    NewTask,
  },
})
export default class Todo extends Vue {}
</script>