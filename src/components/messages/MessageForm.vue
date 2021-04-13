<template>  
    <div class="messageform">
      <form @submit.prevent='sendMessage'>
        <div class="input-group mb-3">
          <input
            v-model.trim="message"
            type="text"
            name="message"
            id="message"
            placeholder="write something here"
            class="form-control mb-3"
          />
          <div class="input-group-append">
            <button
              @click="sendMessage"
              type="button"
              class="btn btn-primary mb-3"
            >
              Send
            </button>
            <button type="button" class="btn btn-warning mb-3">Upload</button>
          </div>
        </div>
      </form>
    </div>  
</template>

<script>
import $ from 'jquery'
import { mapGetters } from "vuex";
import firebase from "firebase/app";
import "firebase/database";
export default {
  name: "message-form",
  data() {
    return {
      message: "",
      errors: [],
    };
  },
  computed: {
    ...mapGetters(["currentChannel", "currentUser"]),
  },
  methods: {
    sendMessage() {
      // construct new message object
      let newMessage = {
        content: this.message,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: {
          name: this.currentUser.displayName,
          avatar: this.currentUser.photoURL,
          id: this.currentUser.uid,
        },
      };
      //validation
      if (this.currentChannel !== null) {
        if (this.message.length > 0) {          
          this.$parent.messagesRef
            .child(this.currentChannel.id)
            .push()
            .set(newMessage) //$parent  refers to messages component
            .then(()=> {
              this.$nextTick(() => {
                $('html, body').scrollTop($(document).height());
              })
            })
            .catch((error) => {
              this.errors.push(error);              
              console.log(error)
            });
          //reset message and errors
          this.message = "";
          this.errors = [];
        }
      }
    },
  },
};
</script>

<style scoped>
.messageform {
  margin: auto;
  color: white;
}
input,
button {  
  height: 50px;
}

button {
  width: 4.5em;
}  
</style>
