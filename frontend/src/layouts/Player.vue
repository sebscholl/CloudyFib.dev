<template>
  <v-app id="sandbox">
    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-toolbar-title>Cloudy Fib</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-content>

    <v-footer :inset="footer.inset" app>
      <span class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    primaryDrawer: {
      clipped: false,
    },
    footer: {
      inset: false
    }
  })
};
</script>