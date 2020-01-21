<template>
  <v-col cols="12" sm="8" md="4">
    <v-card class="elevation-12">
      <v-toolbar color="success" dark flat>
        <v-toolbar-title>Welcome to CloudyFib!</v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <h5>Sign in with GitHub to play.</h5>

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
