<template>
  <div>
    <h1>Messages</h1>

    <message-collection :messages="messages" />

    <input-message />
  </div>
</template>

<style scoped></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { default as axios } from 'axios';
import { MessageInterface } from '@/interfaces/message/message.interface';
import InputMessage from '@/components/message/InputMessage.vue'; // @ is an alias to /src
import MessageCollection from '@/components/message/MessageCollection.vue'; // @ is an alias to /src
import { default as io } from 'socket.io-client';

@Component({
  components: {
    InputMessage,
    MessageCollection,
  },
})
export default class Message extends Vue {
  get messages(): MessageInterface[] {
    return this.$store.state.messages;
  }
  private socket: any;

  created() {
    axios.get(`${process.env.VUE_APP_API_URL}/messages/all`).then(response => {
      const result: MessageInterface[] = response.data as MessageInterface[];
      result.reverse();
      this.$store.dispatch('setMessages', result);
    });

    this.socket = io(process.env.VUE_APP_API_URL);
    this.socket.on('msgToClient', (msg: string) => {
      this.$store.dispatch('addMessage', msg);
    });
  }
}
</script>
