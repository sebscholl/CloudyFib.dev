<template>
  <v-app id="sandbox">
    <LeftNavigation :primaryDrawer="primaryDrawer" />

    <v-app-bar :clipped-left="primaryDrawer.clipped" app>
      <v-app-bar-nav-icon
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      />
      <v-toolbar-title>
        <router-link :to="{ name: 'home' }">CloudyFib</router-link>
      </v-toolbar-title>

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
    ...mapGetters(["playerTokens"])
  },
  methods: {
    ...mapActions(["fetchPlayerTokens"])
  },
  created() {
    this.fetchPlayerTokens();
  }
};
</script>
