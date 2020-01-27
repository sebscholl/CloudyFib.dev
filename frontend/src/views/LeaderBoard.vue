<template>
  <v-col class="leaderboard">
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Rank</th>
            <th class="text-left">Name</th>
            <th class="text-left">Points</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in leaderboard" :key="item.id">
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
export default {
  name: "Leaderboard",
  data: () => ({
    leaderboard: []
  }),
  methods: {
    ...mapActions(["currentGameLeaderboard"])
  },
  created() {
    this.currentGameLeaderboard().then(list => {
      this.leaderboard = list;
    });
  }
};
</script>
