<style lang="scss">
#player-layout {
  .v-toolbar__content {
    justify-content: center;
  }
  .v-toolbar__title {
    color: rgb(2, 70, 178);
  }
}
</style>

<template>
  <v-app id="player-layout">
    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-toolbar-title>CloudyFib Games</v-toolbar-title>
    </v-app-bar>

    <v-content class="app-background">
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
      clipped: false
    },
    footer: {
      inset: false
    }
  })
};
</script>
