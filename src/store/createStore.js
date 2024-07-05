import VuexPersist from 'vuex-persist';
import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index.js';
import {userLoginReq} from '@/service/userService.js'

Vue.use(Vuex)


const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
})

const store = new Vuex.Store({
  strict: true,
  state:{
    loggedIn: false,
    username: "",
    jwtToken: "",
    id: "",
    type: "",
    routerName: "",
    avatarUrl: "",
    title: "hello",
    count: 120,
  },
  mutations: {
    login(state, { Token }){
      var isok = Token.isok;
      if(isok == true){
        state.loggedIn = true,
        state.username = Token.username,
        state.jwtToken = Token.jwtToken,
        state.id = Token.id,
        state.type = Token.type,
        state.avatarUrl = Token.avatarUrl
      }else{
        state.loggedIn = false
        this.$message({
            message: "用户名或密码错误",
            type: "warning",
        });
      }
    },
    logout(state) {
      state.loggedIn = false,
      state.username = "",
      state.jwtToken = "",
      state.id = "",
      state.type = ""
    },
    addCount (state, obj) {
      console.log(obj)
      state.count += obj.count
    },
    subCount (state, n) {
      state.count -= n
    },
    changeCount (state, newCount) {
      state.count = newCount
    },
    changeTitle (state, newTitle) {
      state.title = newTitle
    },
    editAvatar(state, avatarUrl){
      state.avatarUrl = avatarUrl;
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      return userLoginReq(username, password).then((Token) => {
        console.log(Token)
        commit('login', { Token })
        if(this.state.type == 1){
            router.push({
            path: "/chatToLLM",
          });
        }else if(this.state.type == 2){
            router.push({
            path: "/chatToLLM",
          });
        }
      })
    },
  },
  plugins: [vuexLocalStorage.plugin]
});


export default store