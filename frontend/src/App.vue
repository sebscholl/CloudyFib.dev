<style lang="scss">
* {
  font-family: Recoleta, Georgia, sans-serif;
  font-weight: 900;
  color: #f1f1f1;
}

.center {
  text-align: center;
}

.glass {
  background-color: rgba(201, 219, 220, 0.5) !important;
  &:after {
    filter: blur(0.8);
    position: absolute;
    width: 100%;
    height: 100%;
  }
}

body {
  margin: 0;
  overflow: hidden;
}

.app-background {
  width: 100vw;
  height: 100vh;
  background: rgb(2, 70, 178);
  background: linear-gradient(
    180deg,
    rgba(2, 70, 178, 1) 0%,
    rgba(0, 38, 113, 1) 100%
  );
}
</style>

<template>
  <component :is="layout" />
</template>

<script>
import { mapGetters } from "vuex";

import GameLayout from "@/layouts/Game.vue";
import PlayerLayout from "@/layouts/Player.vue";
import PublicLayout from "@/layouts/Public.vue";

export default {
  components: {
    PlayerLayout,
    PublicLayout,
    GameLayout
  },
  data: () => ({
    layout: PlayerLayout
  }),
  computed: {
    ...mapGetters(["authenticated"])
  },
  methods: {
    showLayout(layout = false) {
      this.layout = layout || PlayerLayout;
    }
  },
  watch: {
    $route(to) {
      this.showLayout(to.meta.layout);
    }
  },
  created() {
    this.showLayout(this.$route.meta.layout);
  }
};
</script>
