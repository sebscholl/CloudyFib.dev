import auth from "@/utils/auth.js";
import * as gql from "@/utils/graphql";
import graphqlClient from "@/utils/api";
/**
 * State maintains the authentication state using Vuex.
 * Determines "authenticated" status by presence of
 * "idToken" in local storage while storing the
 * idTokens value returned by the auth provider.
 */
const state = {
  userData: JSON.parse(localStorage.getItem("user_data")) || {},
  authenticated: !!localStorage.getItem("id_token"),
  idToken: localStorage.getItem("id_token")
};
/**
 * State getters for retrieving state properties.
 */
const getters = {
  /**
   * Getter for retrieving authenticated status.
   */
  authenticated(state) {
    return state.authenticated;
  },
  /**
   * Getter for retrieving ID token.
   */
  idToken(state) {
    return state.idToken;
  },
  /**
   * Current user info.
   */
  userData(state) {
    return state.userData;
  }
};
/**
 * State mutations for setting state properties.
 */
const mutations = {
  /**
   * Updates the Vuex state's authentication data
   */
  authenticated(state, authData) {
    state.authenticated = true;
    state.idToken = authData.idToken;

    localStorage.setItem("id_token", state.idToken);
  },
  /**
   * Cleans Vuex state's authentication data
   */
  logout(state) {
    state.authenticated = false;
    state.userData = false;
    state.idToken = false;

    localStorage.removeItem("id_token");
    localStorage.removeItem("user_data");
  },
  /**
   * Add user data to state
   */
  setUserData(state, userData) {
    state.userData = userData;

    localStorage.setItem("user_data", JSON.stringify(state.userData));
  }
};
/**
 * State actions for async and sync state related functions.
 */
const actions = {
  /**
   * launches Auth0 authentication
   */
  login() {
    auth.authorize();
  },
  /**
   * Logs out and updates Vuex state's authentication data
   */
  logout({ commit }) {
    auth.logout();

    commit("logout");
  },
  /**
   * Checks if user is registered in 8base, if not signs up the user.
   * Afterwards stores the authentication data in Vuex State.
   *
   * This function utilizes methods available on the auth model that is
   * stored in utils/auth.js.
   */
  async handleAuthentication({ commit }) {
    const authResult = await auth.getAuthorizedData();
    /**
     * Auth headers for communicating with the 8base API.
     */
    const context = {
      headers: {
        authorization: `Bearer ${authResult.idToken}`
      }
    };
    /**
     * Check if user exists in 8base.
     */
    try {
      const {
        data: { user }
      } = await graphqlClient.query({
        query: gql.CURRENT_USER_QUERY,
        context
      });
      commit("setUserData", user);
    } catch {
      /**
       * If user doesn't exist, an error will be
       * thrown, which then the new user can be
       * created using the authResult values.
       */
      const {
        data: { userSignUpWithToken }
      } = await graphqlClient.mutate({
        mutation: gql.USER_SIGN_UP_MUTATION,
        variables: {
          user: {
            email: authResult.email,
            nickname: authResult.idTokenPayload.nickname,
            pictureUrl: authResult.idTokenPayload.picture
          },
          authProfileId: process.env.VUE_APP_AUTH_PROFILE_ID
        },
        context
      });
      commit("setUserData", userSignUpWithToken);
    }
    /* commit the auth data to state */
    commit("authenticated", authResult);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
