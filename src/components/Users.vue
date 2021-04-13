<template>
  <div class="container d-flex flex-column">
    <div class="nav align-content-center align-items-start text-light">
      <h4>Users</h4>
    </div>
    <ul class="nav flex-column align-items-start">
      <li
        v-for="user in users"
        :key="user.uid"
        @click.prevent="changeChannel(user)"
      >
        <span>
          <img :src="user.avatar" height="20" class="img rounded-circle" />
          <span
            :class="{
              'text-success': isOnline(user),
              'text-danger': !isOnline(user),
            }"
            ><a href="#"> {{ user.name }} </a></span
          >
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase";
import "firebase/database";
export default {
  name: "users",
  data() {
    return {
      users: [],
      usersRef: firebase.database().ref("user"),
      connectedRef: firebase.database().ref(".info/connected"),
      presenceRef: firebase.database().ref("presence"),
    };
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    changeChannel(user) {
      //to change channel, you need channel id
      //to get channel id, use getChannelId() method
      let channelId = this.getChannelId(user.uid)
      //create channel object with id & name
      let channel = {id: channelId, name: user.name}
      this.$store.dispatch('setCurrentChannel', channel)
    },
    getChannelId(userId) {
      // use this format to create channel smallerUserId/biggerUserId
      return userId < this.currentUser.uid
        ? userId + "/" + this.currentUser.uid
        : this.currentUser.uid + "/" + userId;
    },
    addListeners() {
      this.usersRef.on("child_added", (snapshot) => {
        if (this.currentUser.uid !== snapshot.key) {
          //build user object and push to users[]
          let user = snapshot.val();
          user["uid"] = snapshot.key;
          user["status"] = "offline";
          this.users.push(user);
        }
      });

      // presenceRef child_added
      this.presenceRef.on("child_added", (snapshot) => {
        if (this.currentUser.uid !== snapshot.key) {
          // pass to user status method
          this.addStatusToUser(snapshot.key);
        }
      });

      // presenceRef child_removed
      this.presenceRef.on("child_removed", (snapshot) => {
        if (this.currentUser.uid !== snapshot.key) {
          // pass to user status method
          this.addStatusToUser(snapshot.key, false);
        }
      });

      //returns 'connected' to every user connected to app
      this.connectedRef.on("value", (snapshot) => {
        if (snapshot.val()) {
          let ref = this.presenceRef.child(this.currentUser.uid);
          ref.set(true);
          ref.onDisconnect().remove();
        }
      });
    },
    //add user status online/offline
    addStatusToUser(userId, connected = true) {
      let index = this.users.findIndex((user) => user.uid === userId);
      if (index !== -1) {
        connected === true
          ? (this.users[index].status = "online")
          : (this.users[index].status = "offline");
      }
    },
    //is user online or offline?
    isOnline(user) {
      return user.status == "online";
    },

    detachListeners() {
      this.usersRef.off();
      this.presenceRef.off();
      this.connectedRef.off();
    },
  },
  mounted() {
    this.addListeners();
  },
  beforeDestroy() {
    this.detachListeners();
  },
};
</script>

<style scoped>
li {
  list-style: none;
}
</style>
