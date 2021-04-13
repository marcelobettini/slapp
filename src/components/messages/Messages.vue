<template>
  <div class="messages-list">
    <!-- passing props to child component -->
    <single-message :messages="messages"></single-message> 
    <message-form></message-form>
  </div>
</template>

<script>
import $ from 'jquery'
import SingleMessage from "../messages/SingleMessage";
import MessageForm from "./MessageForm.vue";
import firebase from "firebase/app";
import "firebase/database";
import { mapGetters } from "vuex";

export default {
  name: "messages",
  components: { SingleMessage, MessageForm },
  data() {
    return {
      messagesRef: firebase.database().ref("messages"), //this reference is used to push but also to retrieve messages from Firebase
      messages: [],
      channel: '',
    };
  },
  computed: {
    ...mapGetters(["currentChannel"]),
  },
  watch: {
    currentChannel: function() {   
      this.messages = [];
      this.addListeners();
      this.channel = this.currentChannel;      
    },
  },
  methods: {
    addListeners() {
      //listen to child added events on current channel      
      this.messagesRef.child(this.currentChannel.id).on("child_added", (snapshot) => {          
          this.messages.push(snapshot.val());

          //scroll to top 
          this.$nextTick(() => {
                $('html, body').scrollTop($(document).height());
              })
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
