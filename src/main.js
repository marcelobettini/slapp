import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH06VLIvJSi-PhhaICkjcgRiS4GFPmSrM",
  authDomain: "users-c4427.firebaseapp.com",
  databaseURL: "https://users-c4427-default-rtdb.firebaseio.com",
  projectId: "users-c4427",
  storageBucket: "users-c4427.appspot.com",
  messagingSenderId: "649772692587",
  appId: "1:649772692587:web:4b92189c4645c495bd6d2e",
  measurementId: "G-0KCV44RBHL",
};
firebase.initializeApp(firebaseConfig);
window.firebase = firebase;

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("setUser", user);
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
  unsubscribe(); // recursion, it calls itself onAuthStateChanged...
});

Vue.config.productionTip = false;
