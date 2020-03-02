<style lang="scss">
.cloudy-btn {
  position: relative;
  .bg-img {
    position: absolute;
    top: -20px;
    right: -20px;
    left: -20px;
    bottom: -20px;
  }
  span {
    z-index: 1;
  }
}
</style>

<template>
  <v-btn class="cloudy-btn" text>
    <img class="bg-img" :src="image" />
    <span><slot /></span>
  </v-btn>
</template>

<script>
import image from "../assets/cloudinary_icon.png";

export default {
  name: "CloudyButton",
  data: () => ({ image })
};
</script>
