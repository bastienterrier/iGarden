<template>
  <div>
    <h1>Messages</h1>

    <div v-for="(message, i) in messages" :key="`${message.date}-${i}`">{{ message.message}}</div>
  </div>
</template>

<style scoped>
</style>



<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { default as axios } from 'axios';
import { MessageInterface } from '@/interfaces/message/message.interface';
// import SelectUser from '@/components/commons/SelectUser.vue'; // @ is an alias to /src

@Component({
  components: {},
})
export default class Message extends Vue {
  get messages(): MessageInterface[] {
    return this.$store.state.messages;
  }

  created() {
    axios.get(`${process.env.VUE_APP_API_URL}/messages/all`).then(response => {
      const result: MessageInterface[] = response.data as MessageInterface[];
      console.log(result);
      this.$store.dispatch('setMessages', result);
    });
  }
}
</script>
