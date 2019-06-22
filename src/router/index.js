import Vue from 'vue'
import Router from 'vue-router'
import Luckywheel from '@/components/luckywheel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'luckywheel',
      component: Luckywheel
    }
  ]
})
