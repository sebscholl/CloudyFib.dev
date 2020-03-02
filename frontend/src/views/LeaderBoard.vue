<style lang="scss">
.leaderboard {
  .v-data-table.leader-list {
    thead {
      color: rgb(2, 70, 178);
    }
    background-color: #07a9f4;
  }
  .theme--light.v-data-table
    tbody
    tr:hover:not(.v-data-table__expanded__content) {
    opacity: 0.8;
    background-color: #07a9f4;
  }
}
</style>

<template>
  <v-col class="leaderboard">
    <PlayerChart></PlayerChart>

    <v-simple-table class="leader-list">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Rank</th>
            <th class="text-left">Name</th>
            <th class="text-left">Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading">
            <td colspan="3" class="pa-3 center">
              <v-progress-circular
                :size="75"
                color="rgb(209,103,37)"
                indeterminate
              />
            </td>
          </tr>

          <tr v-else v-for="(item, i) in leaderboard" :key="item.id">
            <td>#{{ i + 1 }}</td>
            <td>{{ item.PlayerName }}</td>
            <td>{{ item.PlayerScore || 0 }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";
import PlayerChart from "../components/PlayerChart.vue";

export default {
  name: "Leaderboard",
  components: {
    PlayerChart
  },
  data: () => ({
    loading: true,
    leaderboard: []
  }),
  methods: {
    ...mapActions(["currentGameLeaderboard"])
  },
  created() {
    this.currentGameLeaderboard().then(list => {
      this.leaderboard = list;
      this.loading = false;
    });
  }
};
</script>
