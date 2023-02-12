import { createStore } from 'vuex'
import blog from './blog.module'
import project from './project.module'
import transaction from './transaction.module'

const axios = require('axios');
let baseURL = "http://localhost:4000/api/";
export default createStore({
  state: {
    userId: "",
    email: "",
    loggedIn: false,
    userName: "New User",
    password: "abc123",
    typeNGO: false,
    typePhil: true,
    interests: [],
  },
  getters: {

  },
  mutations: {
    setUserAttributes(state, payload) {
      state.loggedIn = true;
      state.userName = payload.username;
      state.password = payload.password;
      state.typeNGO = payload.ngo
      state.typePhil = !state.typeNGO;
      state.userId = payload._id;
      state.email = payload.email;
      state.interests = payload.interests;
    },
    clearUserAttributes(state) {
      state.loggedIn = false;
      state.userName = '';
      state.password = '';
      state.typeNGO = false
      state.typePhil = true;
      state.userId = '';
      state.email = '';
      state.interests = '';
    }
  },
  actions: {
    userCreate({ commit }, payload) {
      if (payload.ngo == "on") payload.ngo = true
      else payload.ngo = false
      payload.phone = '9876543210'
      console.log(payload);
      axios.post(baseURL + 'users', payload)
        .then((res) => {
          console.log("User created", res);
          commit("setUserAttributes", res.data);
        }, (rej) => console.log("Request failed", rej))
    },
    userUpdate({ commit }, payload) {
      console.log("Updating user to : ", payload);
      axios.patch(baseURL + `users/${this.state.userId}`, payload)
        .then((res) => {
          if (res.status < 300) {
            commit("setUserAttributes", res.data);
            console.log("User updated succesfully:", res)
          } else {
            console.log("Something went wrong", res.error);
          }
        }, (rej) => console.log(rej))
    },
    userDelete({ commit }) {
      console.log("Deleting user")
      axios.delete(baseURL + `users/${this.state.userId}`)
        .then(
          () => console.log("User no longer exists"),
          () => console.log("User wasn't deleted")
        )
      commit("clearUserAttributes");
    }

  },
  modules: {
    blog,
    project,
    transaction, 
  }
})
