import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterTable from '../views/pageTable/RegisterTable.vue'
import testTable from '../views/pageTable/testTable.vue'
import LoginTable from '../views/pageTable/LoginTable.vue'
import ChangePassword from '../views/pageTable/ChangePassword.vue'
import ChatToLLM from '../views/userChat/ChatToLLM.vue'
import KnowledgeChatToRAG from '../views/userChat/KnowledgeChatToRAG.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/',
    redirect: '/loginTable'
  },
  {
    path: '/registerTable',
    name: 'registerTable',
    component: RegisterTable
  },
  {
    path: '/loginTable',
    name: '/loginTable',
    component: LoginTable
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: ChangePassword
  },
  {
    path: '/chatToLLM',
    name: 'chatToLLM',
    component: ChatToLLM
  },
  {
    path: '/knowledgeChatToRAG',
    name: 'knowledgeChatToRAG',
    component: KnowledgeChatToRAG
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/testTable',
    name: 'testTable',
    // component: () => import('../views/pageTable/testTable.vue')
    component: testTable,
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
