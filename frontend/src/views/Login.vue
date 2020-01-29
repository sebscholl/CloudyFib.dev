<style lang="scss">
.login {
  text-align: center;

  h1 {
    font-weight: 900;
    font-size: 6rem;
    text-shadow: rgba(35, 31, 32, 0.1) 0.2rem 0.6rem;
  }

  @media (max-width: 850px) {
    h1 {
      font-size: 4rem;
    }
  }
}
</style>

<template>
  <v-col cols="12" sm="8" md="6">
    <v-card class="login glass">
      <h1>CloudyFib</h1>

      <p>The trivia game where lying will help you win!</p>

      <hr />

      <v-card-text class="pa-5">
        <v-btn color="amber" @click="login">
          Sign in with GitHub <v-icon>mdi-github-face</v-icon>
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
