<template>
  <div>
    <h2 class="text-white">SLAPP!</h2>
    <hr />
    <span class="text-white display-5 mx-4">{{
      this.currentUser.displayName
    }}</span>
    <img
      class="rounded-circle"
      :src="currentUser.photoURL"
      alt=""
    />
    <hr />

    <div id="logout">
      <button class="btn btn-outline-light" @click="logout">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import {mapGetters} from 'vuex'
export default {
  name: "sidebar",
  computed: {
      ...mapGetters(['currentUser'])
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      this.$store.dispatch("setUser", null);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 33.5vw;
  height: 100vh;
  background-color: #000;
}
hr {
  border: 1px solid rgba(245, 245, 245, 0.651);
}
img {
  max-width: 32px;
}
#logout {
  margin-top: 2em;
}
</style>
