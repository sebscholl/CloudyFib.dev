import Vue from "vue";
import VueApollo from "vue-apollo";
import apolloClient from "@/utils/api";

Vue.use(VueApollo);

export default new VueApollo({
  defaultClient: apolloClient
});
