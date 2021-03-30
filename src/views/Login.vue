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
            class="btn btn-outline-success btn-lg"
            @click="loginWithYahoo"
          >
            Login with Yahoo
          </button>
        </div>
      </div>
      <div class="row my-3">
        <div class="col text-center">
          <button
            type="button"
            class="btn btn-outline-primary btn-lg"
            @click="loginWithFacebook"
          >
            Login with Facebook
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
import "firebase/database";
export default {
  data() {
    return {
      errors: [],
      loading: false,
      email: null,
      password: null,
      usersRef: firebase.database().ref("user"),
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
          //pass user to database
          this.saveUserToUsersRef(res);
          this.$store.dispatch("setUser", res.user);
          this.$router.push("/chat");
        })
        .catch((err) => {
          this.errors.push(err.message);
          this.loading = false; //on error
        });
    },
        loginWithYahoo() {
      this.loading = true;
      this.errors = []; //clear old error msgs
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.OAuthProvider('yahoo.com'))
        .then((res) => {          
          //pass user to database
          this.saveUserToUsersRef(res);
          this.$store.dispatch("setUser", res.user);
          this.$router.push("/chat");
        })
        .catch((err) => {
          this.errors.push(err.message);
          this.loading = false; //on error
        });
    },
    loginWithFacebook() {
      this.loading = true;
      this.errors = []; //clear old error msgs
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((res) => {          
          //pass user to database
          this.saveUserToUsersRef(res);
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
          this.saveUserToUsersRef(res);
          this.$store.dispatch("setUser", res.user);
          this.$router.push("/chat");
        })
        .catch((err) => {
          this.errors.push(err.message);
          this.loading = false; //on error
        });
    },
    //save user in database
    saveUserToUsersRef(res) {      
      return this.usersRef.child(res.user.uid).set({
        name: res.user.displayName,
        avatar: res.user.photoURL,
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
