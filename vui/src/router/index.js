import Vue from 'vue'
import Router from 'vue-router'
import Todo from '../view/Todo.vue'
import QuoteApp from '../view/QuoteApp.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'to-do',
      component: Todo
    }, {
      path: '/quote',
      name: 'quote-app',
      component: QuoteApp
    }

  ]
})
