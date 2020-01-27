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
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img :src="userData.pictureUrl" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ userData.nickname }}</v-list-item-title>
          <v-list-item-subtitle>CloudyFib Player</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

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
import { mapActions, mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["userData"])
  },
  methods: {
    ...mapActions(["logout"])
  }
};
</script>
