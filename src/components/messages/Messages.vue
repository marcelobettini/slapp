<template>
  <div class="messages-list">
    <single-message :messages="messages"></single-message>
    <message-form></message-form>
  </div>
</template>

<script>
import SingleMessage from "../messages/SingleMessage";
import firebase from "firebase/app";
import "firebase/database";
import MessageForm from "./MessageForm.vue";
import { mapGetters } from "vuex";

export default {
  name: "message",
  components: { SingleMessage, MessageForm },
  data() {
    return {
      messagesRef: firebase.database().ref("messages"),
      messages: [],
      channel: null,
    };
  },
  computed: {
    ...mapGetters(["currentChannel"]),
  },
  watch: {
    currentChannel: function() {
      this.channel = this.currentChannel;      
      this.addListeners();      
    },
  },
  methods: {
    addListeners() {
      //listen to child added events on current channel
      this.messages = []
      this.messagesRef
        .child(this.currentChannel.id)
        .on("child_added", (snapshot) => {          
          this.messages.push(snapshot.val());
        });
    },
    detachListeners() {
      if (this.channel !== null) {
        this.messagesRef.child(this.channel.id).off();
      }
    },
  },
  beforeDestroy() {
    this.detachListeners();
  },
};
</script>

<style scoped>
</style>
