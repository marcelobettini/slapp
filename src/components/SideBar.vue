<template>
  <div>
    <h2 class="text-white">SLAPP!</h2>
    <hr />
    <span class="text-white display-5 mx-4">{{
      this.currentUser.displayName
    }}</span>
    <img class="rounded-circle" :src="currentUser.photoURL" alt="" />
    <hr />

    <button class="btn btn-outline-light my-4" @click="logout">
      Logout
    </button>

    <channels></channels>
    <hr />
    <Users></Users>
  </div>
</template>

<script>
import Channels from "@/components/Channels.vue";
import Users from '@/components/Users.vue'
import firebase from "firebase/app";
import 'firebase/database'
import { mapGetters } from "vuex";
export default {
  name: "sidebar",
  components: { Channels, Users},
  data() {
    return {
      presenceRef: firebase.database().ref('presence')
    }
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  methods: {
    logout() {
      this.presenceRef.child(this.currentUser.uid).remove();
      firebase.auth().signOut();
      this.$store.dispatch("setUser", null);
      this.$router.push("/");
    },
  },
};
</script>

<style >
hr {
  border: 1px groove rgba(245, 245, 245, 0.712);  
}
img {
  max-width: 32px;
}
</style>
