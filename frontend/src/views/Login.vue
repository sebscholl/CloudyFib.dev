<style lang="scss">
.row.w-100 {
  max-width: none !important;
}
.col-wide {
  .login {
    text-align: center;
    margin: 0 auto;

    h1 {
      font-size: 6rem;
      font-weight: 900;
      color: rgb(2, 70, 178);
      text-shadow: rgba(35, 31, 32, 0.1) 0.2rem 0.6rem;
    }

    p {
      color: rgb(4, 169, 270);
    }

    button .v-btn__content {
      color: white;
    }

    @media (max-width: 850px) {
      h1 {
        font-size: 4rem;
      }
    }
  }
}
</style>

<template>
  <v-row class="w-100">
    <v-col sm="12" md="6" class="col-wide">
      <v-card class="login">
        <h1>CloudyFib</h1>

        <p>The trivia game where lying will help you win!</p>

        <hr />

        <v-card-text class="pa-5">
          <v-btn color="rgb(209,103,37)" @click="login">
            Sign in with GitHub <v-icon>mdi-github-face</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
