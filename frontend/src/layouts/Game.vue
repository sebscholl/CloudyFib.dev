<style lang="scss" scoped>
#sandbox {
  overflow-y: scroll; 
}

.game-name {
  color: rgb(2, 70, 178);
}
</style>

<template>
  <v-app id="sandbox">
    <LeftNavigation :primaryDrawer="primaryDrawer" />

    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      />

      <v-spacer></v-spacer>
      <span class="game-name"
        >CloudyFib @ {{ currentGameDetails.event.name }}</span
      >
      <v-spacer></v-spacer>

      <v-badge
        bordered
        offset-x="20"
        offset-y="20"
        color="success"
        :content="playerTokens"
      >
        <v-btn disabled icon>
          <v-icon>mdi-coin-outline</v-icon>
        </v-btn>
      </v-badge>
    </v-app-bar>

    <v-content class="app-background">
      <v-container fluid>
        <v-row align="center" justify="center">
          <router-view></router-view>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LeftNavigation from "@/components/LeftNavigation";
export default {
  name: "App",
  components: {
    LeftNavigation
  },
  data: () => ({
    drawers: ["Default (no property)", "Permanent", "Temporary"],
    primaryDrawer: {
      model: null,
      type: "default (no property)",
      clipped: false,
      floating: false,
      mini: false
    },
    footer: {
      inset: false
    }
  }),
  computed: {
    ...mapGetters(["playerTokens", "currentGameDetails"])
  },
  methods: {
    ...mapActions(["fetchPlayerTokens"])
  },
  created() {
    this.fetchPlayerTokens();
  }
};
</script>
