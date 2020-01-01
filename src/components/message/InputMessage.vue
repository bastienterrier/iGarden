<template>
  <form>
    <v-text-field label="Taper votre message" v-model="message" />
    <v-btn type="submit" @click.prevent="handleClick">Envoyer</v-btn>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import '@/utils/filter';
import { default as axios } from 'axios';
import { Utils } from '@/utils/utils';
import { MessageInterface } from '../../interfaces/message/message.interface';
import { default as io } from 'socket.io-client';

@Component({
  components: {},
})
export default class InputMessage extends Vue {
  public message: string = '';
  private socket: any;

  created() {
    this.socket = io(process.env.VUE_APP_API_URL);
  }

  handleClick() {
    const message: MessageInterface = {
      date: new Date(),
      author: Utils.getCurrentUserName(),
      message: this.message,
    };

    this.resetInput();

    this.storeMessage(message);

    this.emitMessage(message);
  }

  resetInput() {
    this.message = '';
  }

  storeMessage(message: MessageInterface) {
    // Store message
    axios
      .post(`${process.env.VUE_APP_API_URL}/messages`, message)
      .catch(err => {
        console.error(err);
      });
  }

  emitMessage(message: MessageInterface) {
    // Emit socket
    this.socket.emit('msgToServer', message);
  }
}
</script>

<style scoped></style>
