<template>
  <div class="message" :class="messageClass">
    <div class="author" :title="authorName">
      <v-avatar :color="authorColor" size="30">
        {{ authorInitial }}
      </v-avatar>
    </div>
    <div class="content">
      {{ content }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { Utils } from '@/utils/utils';
import { MessageInterface } from '../../interfaces/message/message.interface';

@Component({
  components: {},
})
export default class MessageItem extends Vue {
  @Prop() readonly message!: MessageInterface;

  get authorColor() {
    return Utils.getUserColor(this.message.author);
  }

  get authorInitial() {
    return this.message.author.charAt(0);
  }

  get content() {
    return this.message.message;
  }

  get authorName() {
    return this.message.author;
  }

  get messageClass() {
    return this.authorName === Utils.getCurrentUserName()
      ? 'message--right'
      : '';
  }
}
</script>

<style scoped>
.author {
  color: white;
  padding: 0 20px;
}

.content {
  max-width: 80%;
}

.message {
  display: flex;
  align-items: center;
  text-align: justify;
  padding: 5px 0;
}

.message--right {
  flex-direction: row-reverse;
}
</style>
