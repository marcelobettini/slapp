<template>
  <div class="container-fluid d-flex flex-column" style="height: 100vh">
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
    <!-- container email -->
    <div
      class="container py-3"
      style="border: solid 1px; margin-top: 5em; margin-bottom: 5em"
    >
      <div class="row my-3 d-flex justify-content-center">
        <div class="col-12 col-md-6 text-center">
          <div class="input-group my-2">
            <input
              type="text"
              id="email"
              v-model="email"
              class="form-control text-center"
              placeholder="enter valid email"
              aria-label="user email"
              aria-describedby="user email"
            />

            <div class="input-group my-2">
              <input
                type="text"
                id="password"
                v-model="password"
                class="form-control text-center"
                placeholder="enter password"
                aria-label="password"
                aria-describedby="user password"
              />
            </div>
          </div>

          <button
            type="button"
            class="btn btn-outline-success btn-lg"
            @click="loginWithEmail"
          >
            Login with e-mail
          </button>
        </div>
      </div>
    </div>
    <!-- container Google & Twitter -->
    <div class="container py-3" style="border: solid 1px; margin-bottom: auto;">
      <div class="row my-3">
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
      <div class="row my-3">
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
      email: null,
      password: null,
    };
  },
  name: "login",
  computed: {
    hasErrors() {
      return this.errors.length > 0;
    },
  },
  methods: {
    loginWithEmail() {
      this.loading = true;
      this.errors = []; //clear old error msgs
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((res) => {
          this.$store.dispatch("setUser", res.user);
          this.$router.push("/chat");
        })
        .catch((err) => {
          this.errors.push(err.message);
          this.loading = false; //on error
        });
    },
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
button {
  width: 15em;
}
.form-control {
  width: 15em;
}
</style>
