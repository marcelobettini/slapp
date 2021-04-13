<template>
  <div class="list-group mt-1 mb-3 messages-list p-3">
    <div v-for="message in messages" :key="message.id">
      <div class="media">
        <img
          :src="message.user.avatar"
          class="rounded-circle align-self-start mr-3"
        />
        <div class="media-body">
          <h6 class="mt-0">
            <a href="#">{{ message.user.name }}</a> - {{ message.timestamp | fromNow }}
          </h6>
          <p :class="{'self-message': selfMessage(message.user)}">{{ message.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  name: "single-message",
  props: ['messages'],
  
  computed: {
    ...mapGetters(["currentUser"]),
  },
  filters: {
    fromNow(value) {
      return moment(value).fromNow(); //convert the given date to human readable format
    },
  },
  methods: {
      selfMessage(user) {
          return user.id === this.currentUser.uid
      },

      }
  }
</script>
<style>
.self-message {
    border-left: 5px solid red;
    padding: 0 10px;
}
.messages-list {
  height: 91vh;
  border-radius: 0.5%;
}
</style>
