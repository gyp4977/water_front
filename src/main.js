import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/createStore'
//引入elementui组件
import ElementUI from 'element-ui';
import mavonEditor from 'mavon-editor';
import 'element-ui/lib/theme-chalk/index.css';
import 'mavon-editor/dist/css/index.css'
import TopNavi from './components/TopNavi.vue'

Vue.config.productionTip = false

Vue.component('TopNavi', TopNavi)
Vue.use(ElementUI, {size: 'small'})
Vue.use(mavonEditor)


// Vue.use(ElementUI);
router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/loginTable', '/registerTable'];
  const authRequired = !publicPages.includes(to.path);
  var loggedIn = store.state.loggedIn
  if (authRequired && !loggedIn) {
    return next('/loginTable');
  }
  next();
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
