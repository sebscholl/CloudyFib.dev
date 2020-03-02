<template>
  <v-col class="fibbing">
    <!-- State for when a question is loaded and ready to be fibbed -->
    <v-card class="mx-auto pa-4">
      <template v-if="componentState === 'loaded'">
        <v-img
          v-if="question.picture"
          height="200px"
          class="white--text align-end"
          :src="question.picture.downloadUrl"
        />

        <h3 v-text="question.text" class="blue--text my-5"></h3>

        <p class="red--text" v-if="error">{{ error }}</p>

        <v-textarea
          outlined
          label="Fib"
          v-model="fib"
          name="input-7-4"
          placeholder="Go on, lie your little heart out."
        ></v-textarea>

        <v-btn
          @click="saveFib"
          color="orange"
          class="mt-6"
          style="width: 100%; color: white;"
        >
          Submit Fib
        </v-btn>
      </template>

      <!-- State for when question is loading -->
      <template v-if="componentState === 'loading'">
        <v-card-text class="d-flex justify-center">
          <v-progress-circular :size="75" color="amber" indeterminate />
        </v-card-text>
      </template>

      <!-- State for when fib is saving -->
      <template v-if="componentState === 'saving'">
        <v-card-text class="d-flex justify-center">
          <v-progress-circular :size="75" color="amber" indeterminate />
        </v-card-text>
      </template>

      <!-- State for when there are no more questions to answer -->
      <template v-if="componentState === 'empty'">
        <h3 class="blue--text mb-5">
          There are no more questions for you to Fib on!
        </h3>

        <router-link :to="{ name: 'play' }">Answer some questions</router-link>
      </template>
    </v-card>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import graphqlClient from "@/utils/api";
import { AddNewFibMutation } from "@/utils/graphql";

export default {
  name: "Fibbing",
  data: () => ({
    fib: undefined,
    error: undefined,
    question: undefined,
    currentState: 0,
    componentStates: ["loading", "loaded", "saving", "empty"]
  }),
  computed: {
    noMoreQuestions() {
      return this.question === undefined && this.loading === false;
    },
    componentState() {
      return this.componentStates[this.currentState];
    },
    ...mapGetters(["currentGameDetails"])
  },
  methods: {
    questionExists() {
      this.currentState = 1;
      this.error = "That fib already exists! Make up another...";

      setTimeout(() => (this.error = undefined), 3000);
    },
    async saveFib() {
      this.currentState = 2;
      /* Construct the variables */
      const variables = {
        text: this.fib,
        questionId: this.question.id
      };
      /* Save the question */
      try {
        const {
          data: {
            addNewFib: { playerTokens }
          }
        } = await graphqlClient.mutate({
          mutation: AddNewFibMutation,
          variables
        });
        /* Update the player tokens count */
        this.$store.commit("setPlayerTokens", playerTokens);
        /* Load a new fib */
        this.loadQuestion();
      } catch (error) {
        this.questionExists();
      }
    },
    async loadQuestion() {
      this.currentState = 0;

      /* Reset fib and question */
      this.fib = undefined;
      this.question = undefined;

      this.question = await this.nextFibbableQuestion();

      this.currentState = this.question === undefined ? 3 : 1;
    },
    ...mapActions(["nextFibbableQuestion"])
  },
  created() {
    this.loadQuestion();
  }
};
</script>
