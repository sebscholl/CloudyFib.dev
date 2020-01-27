<style lang="scss" scoped>
.center {
  text-align: center;
}
</style>

<template>
  <v-col cols="12" sm="8" md="4">
    <v-card class="elevation-12 center">
      <v-card-text class="pa-5">
        <h3 class="mb-4">Sign in with GitHub to play CloudyFib!</h3>

        <v-btn color="light" @click="login">
          Sign into GitHub <v-icon>mdi-github-face</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    source: String
  },
  methods: mapActions(["login"])
};
</script>
