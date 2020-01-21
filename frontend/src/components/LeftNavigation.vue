<template>
  <v-navigation-drawer
    v-model="primaryDrawer.model"
    :clipped="primaryDrawer.clipped"
    :floating="primaryDrawer.floating"
    :mini-variant="primaryDrawer.mini"
    :permanent="primaryDrawer.type === 'permanent'"
    :temporary="primaryDrawer.type === 'temporary'"
    app
    overflow
  >
    <v-list>
      <v-list-item v-for="item in menu" :to="item.to" :key="item.to" exact>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn @click="logout" block>Logout</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    primaryDrawer: {
      required: true,
      type: Object
    }
  },
  data: () => ({
    menu: [
      {
        to: "/game",
        icon: "mdi-clipboard-list-outline",
        text: "Leader Board"
      },
      {
        to: "/game/fib",
        icon: "mdi-alien",
        text: "Start Fibbing"
      },
      {
        to: "/game/play",
        icon: "mdi-ticket",
        text: "Answer Questions"
      }
    ]
  }),
  methods: {
    ...mapActions(["logout"])
  }
};
</script>
