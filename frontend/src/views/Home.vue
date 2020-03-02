<style lang="scss">
.home {
  h1 {
    color: rgb(2, 70, 178);
  }
  .v-list-item__title {
    color: rgb(209, 103, 37);
  }
}
</style>

<template>
  <div class="home">
    <v-card class="ma-3">
      <h1 class="mx-4 pt-4">Your games:</h1>

      <v-list v-if="hasGames" three-line>
        <v-list-item
          :key="game.id"
          @click="goToGame(game.code)"
          v-for="game in gameCodes"
        >
          <v-list-item-avatar>
            <v-img :src="game.event.banner.downloadUrl"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="game.event.name" />
            <v-list-item-subtitle
              class="blue--text"
              v-html="game.event.description"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <div class="blue--text pa-4" v-else>
        Sorry chump! You're not playing any games.
      </div>
    </v-card>

    <v-card class="ma-3 pa-3">
      <v-text-field
        label="Enter game code..."
        class="mb-2"
        v-model="code"
        outlined
      ></v-text-field>

      <v-btn
        @click="claimGameCode"
        :disabled="!codeEntered"
        color="rgb(209,103,37)"
      >
        Submit
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "home",

  data: () => ({
    code: undefined
  }),

  computed: {
    codeEntered() {
      return this.code && this.code.length > 0;
    },

    hasGames() {
      return this.gameCodes.length > 0;
    },

    ...mapGetters(["gameCodes"])
  },

  methods: {
    async goToGame(code) {
      try {
        await this.switchGames(code);
        this.$router.push({ name: "game" });
      } catch (e) {
        // console.log("Something went wrong. Couldn't change game. ", e);
      }
    },

    async claimGameCode() {
      try {
        await this.registerGameCode(this.code);
      } catch (e) {
        // console.log("Something went wrong. Couldn't use code. ", e);
      }

      location.reload();
    },

    ...mapActions(["switchGames", "fetchGames", "registerGameCode"])
  },

  created() {
    this.fetchGames();
  }
};
</script>
