import Vue from "vue";
import VueRouter from "vue-router";
import Chat from "@/views/Chat.vue";
import Login from "@/views/Login.vue";
import firebase from 'firebase/app'
Vue.use(VueRouter);

const routes = [
  { path: "*", redirect: "/" },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
    beforeEnter: (to, from, next) => {
      if(!firebase.auth().currentUser) {
        next('/login')
      }else {
        next()
      }
      
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
