<template>
  <div class="home">
    <h1>Your Games</h1>

    <v-list three-line>
      <template v-if="$apollo.loading">
        <v-skeleton-loader
          class="mx-auto"
          type="list-item-avatar-three-lines"
        />
        <v-skeleton-loader
          class="mx-auto"
          type="list-item-avatar-three-lines"
        />
        <v-skeleton-loader
          class="mx-auto"
          type="list-item-avatar-three-lines"
        />
      </template>

      <template v-else>
        <v-list-item
          :key="game.id"
          @click="goToGame(game.code)"
          v-for="game in gameCodesList.items"
        >
          <v-list-item-avatar>
            <v-img :src="game.event.banner.downloadUrl"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="game.event.name" />
            <v-list-item-subtitle v-html="game.event.description" />
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>

<script>
import { PlayerGameCodes } from "@/utils/graphql";
export default {
  name: "home",
  apollo: {
    gameCodesList: {
      query: PlayerGameCodes
    }
  },
  methods: {
    goToGame(code) {
      this.$router.push({
        name: "game",
        params: { code }
      })
    }
  }
};
</script>
