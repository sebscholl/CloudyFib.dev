<style lang="scss">
.stats {
  .points {
    font-size: 3rem;
    font-weight: 900;
    text-shadow: rgba(35, 31, 32, 0.1) 0.2rem 0.6rem;
  }

  .points-msg {
    font-size: 1.2rem;
    font-weight: 900;
    color: rgb(2, 70, 178);
  }

  .cdc-legend-item span {
    color: rgba(35, 31, 32, 0.5);
  }
  h1 {
    color: rgb(2, 70, 178);
  }
  .v-list-item__title {
    color: rgb(209, 103, 37);
  }
}
</style>

<template>
  <v-card class="stats mb-4">
    <div class="pt-4">
      <v-progress-circular
        v-if="loading"
        :size="75"
        color="rgb(209,103,37)"
        indeterminate
      />

      <vc-donut
        :sections="colorGroups"
        background="transparent"
        :total="totalPoints"
        :has-legend="true"
        v-else
      >
        <span class="points">{{ totalPoints }} pts</span>
      </vc-donut>
    </div>

    <div class="points-msg center pa-4">
      You have contributed {{ sections.answers.count }} fibs, answered
      {{ sections.attempts.count }} and racked up {{ totalPoints }} points.
    </div>
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
      return this.sections.groups.reduce((s, v) => s + v.value, 1);
    },
    colorGroups() {
      const colors = ["rgb(209,103,37)", "rgb(2,70,178)"];

      return this.sections.groups.map((group, index) => {
        group.color = colors[index];
        return group;
      });
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
