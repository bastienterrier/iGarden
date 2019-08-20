import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Egg from './views/Egg.vue';
import Todo from './views/Todo.vue';
import Garden from './views/Garden.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/egg',
      name: 'egg',
      component: Egg,
    },
    {
      path: '/garden',
      name: 'garden',
      component: Garden,
    },
    {
      path: '/todo',
      name: 'todo',
      component: Todo,
    },
  ],
});
