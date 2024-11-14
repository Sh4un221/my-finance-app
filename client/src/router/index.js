// router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import Resumen from '../views/Resumen.vue'
import Ingresos from '../views/Ingresos.vue'
import Gastos from '../views/Gastos.vue'
import Ahorros from '../views/Ahorros.vue'
import CriptoMonitor from '../views/CriptoMonitor.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/resumen'
    },
    {
      path: '/resumen',
      name: 'Resumen',
      component: Resumen
    },
    {
      path: '/ingresos',
      name: 'Ingresos',
      component: Ingresos
    },
    {
      path: '/gastos',
      name: 'Gastos',
      component: Gastos
    },
    {
      path: '/ahorros',
      name: 'Ahorros',
      component: Ahorros
    },
    {
      path: '/cripto',
      name: 'CriptoMonitor',
      component: CriptoMonitor
    }
  ]
})