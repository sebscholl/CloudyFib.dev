<style lang="scss">
.v-card__title.headline {
  color: rgb(2, 70, 178);
}

.v-card__actions button span {
  color: white;
}

.big-link {
  font-size: 1.5em;
}
</style>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">
          You don't have tokens!
        </v-card-title>

        <v-card-text>
          In order to answer questions, you need tokens. You get tokens by
          submitting fibs. So, start fibbing!

          <div class="mt-6 center big-link">
            <router-link :to="{ name: 'fib' }" color="rgb(209,103,37)">
              Start Fibbing
            </router-link>
          </div>
        </v-card-text>
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
