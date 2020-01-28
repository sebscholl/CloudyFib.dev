<style lang="scss">
.play {
  .selected-border {
    border-radius: 5px;
    border: 3px solid yellow;
  }

  .answer {
    text-align: center;

    h1 {
      font-size: 75px;
    }

    &.fib {
      color: red;
    }

    &.truth {
      color: green;
    }
  }
}
</style>

<template>
  <v-col class="play">
    <!-- State for when question is loading -->
    <v-card v-if="componentState === 'loading'" class="mx-auto pa-8">
      <v-card-text class="d-flex justify-center">
        <v-progress-circular :size="75" color="amber" indeterminate />
      </v-card-text>
    </v-card>

    <!-- State for when question is loaded -->
    <v-card v-if="componentState === 'loaded'" class="mx-auto">
      <v-img
        v-if="question.picture"
        height="200px"
        class="white--text align-end"
        :src="question.picture.downloadUrl"
      >
      </v-img>

      <v-card-text class="text--primary">
        <h3 v-text="question.text"></h3>
      </v-card-text>

      <v-card-text class="text--primary">
        <v-list-item-group>
          <v-list-item
            v-for="answer in questionAnswers"
            :key="answer.id"
            @click="select(answer)"
            :class="{
              'selected-border': selected && selected.id === answer.id
            }"
          >
            <v-list-item-content>
              <code>{{ answer.text }}</code>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="saveAttempt" color="orange">
          Submit Answer
        </v-btn>
      </v-card-actions>
    </v-card>

    <!-- State for when question is saving -->
    <v-card v-if="componentState === 'answer'" class="mx-auto pa-8">
      <v-card-text
        :class="[
          'answer',
          { truth: answerReport.truth, fib: !answerReport.truth }
        ]"
      >
        <h3>{{ answerReport.title }}</h3>
        <h1 class="my-4">
          {{ (answerReport.truth ? "+" : "-") + answerReport.points }}
        </h1>
        <h5>{{ answerReport.subtitle }}</h5>
      </v-card-text>
    </v-card>

    <!-- State for when question is saving -->
    <v-card v-if="componentState === 'saving'" class="mx-auto pa-8">
      <v-card-text class="d-flex justify-center">
        <v-progress-circular :size="75" color="amber" indeterminate />
      </v-card-text>
    </v-card>

    <!-- Warning modal -->
    <NeedTokensModal />
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
/* GraphQL imports */
import graphqlClient from "@/utils/api";
import { SubmitAttempt } from "@/utils/graphql";
import NeedTokensModal from "@/components/NeedTokensModal.vue";

export default {
  name: "Play",
  components: {
    NeedTokensModal
  },
  data: () => ({
    active: false,
    question: undefined,
    selected: undefined,
    answerReport: {},
    currentState: 0,
    componentStates: ["loading", "loaded", "saving", "empty", "answer"]
  }),
  computed: {
    questionAnswers() {
      let array = this.question.answers.items;

      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }

      return array;
    },
    componentState() {
      return this.componentStates[this.currentState];
    },
    ...mapGetters(["currentGameDetails"])
  },
  methods: {
    /**
     * Show's the correct answer was chosen.
     */
    answerCorrect(pts) {
      this.answerReport = {
        points: pts,
        truth: true,
        title: "Nice job!",
        subtitle: `You earned ${pts} points`
      };

      this.currentState = 4;
      /* Load a new fib */
      setTimeout(this.loadQuestion, 4000);
    },
    /**
     * Show's the incorrect answer was chosen.
     */
    answerIncorrect(pts) {
      this.answerReport = {
        points: pts,
        truth: false,
        title: "You got fibbed!",
        subtitle: `The fibber earned ${pts} points`
      };

      this.currentState = 4;
      /* Load a new fib */
      setTimeout(this.loadQuestion, 4000);
    },
    /**
     * Select an answer.
     */
    select(question) {
      this.selected = question;
    },
    /**
     * Saves an attempt and returns whether it was true or not.
     */
    async saveAttempt() {
      this.currentState = 2;
      /* Construct the variables */
      const variables = {
        gameCode: this.currentGameDetails.code,
        questionId: this.question.id,
        answerId: this.selected.id
      };
      /* Save the question */
      const {
        data: {
          submitAttempt: { truth, points }
        }
      } = await graphqlClient.mutate({
        fetchPolicy: "no-cache",
        mutation: SubmitAttempt,
        variables
      });

      /* Show whether answer is correct or incorrect */
      truth ? this.answerCorrect(points) : this.answerIncorrect(points);
    },
    async loadQuestion() {
      this.currentState = 0;

      /* Reset the question */
      this.question = undefined;

      this.question = await this.nextPlayableQuestion();

      this.currentState = this.question === undefined ? 3 : 1;
    },
    ...mapActions(["nextPlayableQuestion"])
  },
  created() {
    this.loadQuestion();
  }
};
</script>
