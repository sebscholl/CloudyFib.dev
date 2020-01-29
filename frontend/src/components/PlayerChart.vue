<style lang="scss">
.stats {
  .points {
    font-size: 3rem;
    font-weight: 900;
    text-shadow: rgba(35, 31, 32, 0.1) 0.2rem 0.6rem;
  }
}
</style>

<template>
  <v-card class="stats glass mb-4">
    <v-row>
      <v-col md="4">
        <v-progress-circular
          v-if="loading"
          :size="75"
          color="amber"
          indeterminate
        />

        <template v-else>
          <vc-donut
            :sections="sections.groups"
            background="transparent"
            :total="totalPoints"
            :has-legend="true"
          >
            <span class="points">{{ totalPoints }} pts</span>
          </vc-donut>
        </template>
      </v-col>

      <v-col md="8">
        <div class="points">
          You have contributed {{ sections.answers.count }} fibs, answered
          {{ sections.attempts.count }} and racked up {{ totalPoints }} points.
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      loading: true,
      sections: {
        attempts: {
          count: 0
        },
        answers: {
          count: 0
        },
        groups: []
      }
    };
  },
  computed: {
    totalPoints() {
      return this.sections.groups.reduce((s, v) => s + v.value, 0);
    }
  },
  methods: {
    ...mapActions(["fetchPlayerStats"])
  },
  created() {
    this.fetchPlayerStats().then(stats => {
      this.sections = stats;
      this.loading = false;
    });
  }
};
</script>
