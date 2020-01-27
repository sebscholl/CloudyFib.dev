<template>
  <div class="home">
    <h1 class="white--text">Your Games</h1>

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
          <v-list-item-subtitle v-html="game.event.description" />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <div v-else>
      Sorry chump! You weren't invited to any games. Better luck next year.
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "home",
  computed: {
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
        console.log("Something went wrong. Couldn't change game. ", e);
      }
    },
    ...mapActions(["switchGames", "fetchGames"])
  },
  created() {
    this.fetchGames();
  }
};
</script>
