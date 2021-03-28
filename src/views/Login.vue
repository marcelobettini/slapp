<template>
  <div>
    <div class="jumbotron text-white">
      <h1 class="lead display-3">SLAPP!</h1>
      <span class="bg-white p-2">in your face... Slack</span>
    </div>
    <!-- display loading status -->
    <div class="alert alert-info" v-if="loading">Loading...</div>
    <!-- display errors -->
    <div class="alert alert-danger" v-if="hasErrors">
      <div v-for="err in errors" :key="err">{{ err }}</div>
    </div>
    <div class="container">
      <div class="row mt-5">
        <div class="col text-center">
          <button
            type="button"
            class="btn btn-outline-danger btn-lg"
            @click="loginWithGoogle"
          >
            Login with Google
          </button>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col text-center">
          <button
            type="button"
            class="btn btn-outline-info btn-lg"
            @click="loginWithTwitter"
          >
            Login with Twitter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      errors: [],
      loading: false,
    };
  },
  name: "login",
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    },
  },
  methods: {
    loginWithGoogle() {
      this.loading = true;
      this.errors = []; //clear old error msgs
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((res) => {
          this.$store.dispatch("setUser", res.user);
          this.$router.push("/chat");
        })
        .catch((err) => {
          this.errors.push(err.message);
          this.loading = false; //on error
        });
    },
    loginWithTwitter() {
      this.loading = true;
      this.errors = []; //clear old error msgs
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then((res) => {
          this.$store.dispatch("setUser", res.user);
          this.$router.push("/chat");
        })
        .catch((err) => {
          this.errors.push(err.message);
          this.loading = false; //on error
        });
    },
  },
};
</script>

<style scoped>
span {
  font-size: 1.2em;
  border-top-right-radius: 38%;
}
.jumbotron {
  border-radius: 0px;
  background-color: black;  
}
span {
    color: black;
}
</style>
