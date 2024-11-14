<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="#3A4EFA" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }} - Finanzas Personales</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        { 
          icon: 'mdi-chart-line', 
          title: 'Resumen', 
          to: '/resumen' 
        },
        { 
          icon: 'mdi-currency-usd', 
          title: 'Ingresos', 
          to: '/ingresos' 
        },
        { 
          icon: 'mdi-tag', 
          title: 'Gastos', 
          to: '/gastos' 
        },
        { 
          icon: 'mdi-bank', 
          title: 'Ahorros', 
          to: '/ahorros' 
        },
        { 
          icon: 'mdi-bitcoin', 
          title: 'Cripto', 
          to: '/cripto' 
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Finanzas Personales',
    }
  },
}
</script>

<style scoped>
.v-main {
  background-color: #F4F5FA;
}

.v-footer {
  justify-content: center;
  text-align: center;
}
</style>