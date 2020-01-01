<template>
  <div class="messages-collection">
    <div v-for="(message, i) in messages" :key="`${message.date}-${i}`">
      <item-message :message="message" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { MessageInterface } from '../../interfaces/message/message.interface';
import ItemMessage from '@/components/message/MessageItem.vue';

@Component({
  components: {
    ItemMessage,
  },
})
export default class MessageCollection extends Vue {
  @Prop() readonly messages!: MessageInterface[];
}
</script>

<style scoped></style>
