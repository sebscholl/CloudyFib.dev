<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">You don't have tokens!</v-card-title>
        <v-card-text>
          In order to answer questions, you need tokens. You get tokens by
          submitting fibs. So, start fibbing!
        </v-card-text>
        <v-card-actions>
          <v-btn :to="{ name: 'fib' }" color="green darken-1">
            Start Fibbing
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapGetters(["playerTokens"])
  },
  watch: {
    playerTokens(n) {
      this.dialog = n <= 0;

      console.log("Remaining tokens: ", n);
    }
  }
};
</script>
