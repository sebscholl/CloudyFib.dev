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
