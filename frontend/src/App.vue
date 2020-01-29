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

.bohek-background {
  width: 100vw;
  height: 100vh;
  background: #1971ba;
}

$particleSize: 20vmin;
$animationDuration: 6s;
$amount: 20;
.bohek-background span.particle {
  width: $particleSize;
  height: $particleSize;
  border-radius: $particleSize;
  backface-visibility: hidden;
  position: absolute;
  animation-name: move;
  animation-duration: $animationDuration;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  $colors: (#583c87, #e45a84, #ffacac);
  @for $i from 1 through $amount {
    &:nth-child(#{$i}) {
      color: nth($colors, random(length($colors)));
      top: random(100) * 1%;
      left: random(100) * 1%;
      animation-duration: (random($animationDuration * 10) / 10) * 1s + 10s;
      animation-delay: random(($animationDuration + 10s) * 10) / 10 * -1s;
      transform-origin: (random(50) - 25) * 1vw (random(50) - 25) * 1vh;
      $blurRadius: (random() + 0.5) * $particleSize * 0.5;
      $x: if(random() > 0.5, -1, 1);
      box-shadow: ($particleSize * 2 * $x) 0 $blurRadius currentColor;
    }
  }
}

@keyframes move {
  100% {
    transform: translate3d(0, 0, 1px) rotate(360deg);
  }
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
