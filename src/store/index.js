import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    currentChannel: null,
  },
  getters: {
    currentUser: (state) => state.currentUser,
    currentChannel: (state) => state.currentChannel,
  },
  mutations: {
    SET_USER(state, user) {
      state.currentUser = user;      
    },
    SET_CURRENT_CHANNEL(state, channel) {      
      state.currentChannel = channel;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
    setCurrentChannel({commit}, channel) {      
      commit("SET_CURRENT_CHANNEL", channel);
    },
  },
  modules: {},
});
