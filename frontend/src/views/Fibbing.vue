<template>
  <div class="fibbing">
    <v-card v-if="question" class="mx-auto" max-width="400">
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
        <v-textarea
          outlined
          label="Fib"
          v-model="fib"
          name="input-7-4"
          placeholder="Go on, lie your little heart out."
        ></v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="saveFib" :disabled="saving" color="orange">
          Submit Fib
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import graphqlClient from "@/utils/api";
import { AddNewFibMutation } from "@/utils/graphql";

export default {
  name: "Fibbing",
  data: () => ({
    saving: false,
    fib: undefined,
    question: undefined
  }),
  computed: {
    ...mapGetters(["currentGameDetails"])
  },
  methods: {
    async saveFib() {
      this.saving = true;
      /* Construct the variables */
      const variables = {
        text: this.fib,
        questionId: this.question.id
      };
      /* Save the question */
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
      setTimeout(this.loadQuestion, 2000);
    },
    async loadQuestion() {
      this.loading = true;
      this.fib = undefined;
      this.question = undefined;

      const question = await this.nextFibbableQuestion();

      this.question = question;
      this.loading = false;
    },
    ...mapActions(["nextFibbableQuestion"])
  },
  created() {
    this.loadQuestion();
  }
};
</script>
