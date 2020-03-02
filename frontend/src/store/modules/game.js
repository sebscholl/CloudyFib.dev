import graphqlClient from "@/utils/api";
import {
  GameCodeQuery,
  PlayerGameCodes,
  CURRENT_USER_QUERY,
  PlayerGameStats,
  CurrentGameDetails,
  CurrentGameLeaderboard,
  FibbableQuestionForPlayer,
  PlayableQuestionForPlayer,
  RegisterGameCodeMutation
} from "@/utils/graphql";
/**
 * Game state maintains the current game being
 * played by the player.
 */
const state = {
  gameCodes: localStorage.getItem("game_codes") || [],
  playerTokens: localStorage.getItem("player_tokens") || 0,
  currentGameDetails: JSON.parse(localStorage.getItem("current_game_details"))
};
/**
 * State getters for retrieving state properties.
 */
const getters = {
  /**
   * Getter for retrieving the games.
   */
  gameCodes(state) {
    return state.gameCodes;
  },
  /**
   * Getter for retrieving player tokens.
   */
  playerTokens(state) {
    return state.playerTokens;
  },
  /**
   * Getter for retrieving the currentGameDetails.
   */
  currentGameDetails(state) {
    return state.currentGameDetails;
  }
};
/**
 * State mutations for setting state properties.
 */
const mutations = {
  /**
   * Setter for gameCodes.
   */
  setGames(state, gameCodes) {
    state.gameCodes = gameCodes;
  },
  /**
   * Getter for retrieving player tokens.
   */
  setPlayerTokens(state, number) {
    state.playerTokens = number;
  },
  /**
   * Subtracts 1 from tokens balance.
   */
  useToken(state) {
    state.playerTokens = state.playerTokens - 1;
  },
  /**
   * Switch games.
   */
  setCurrentGameDetails(state, eventGameData) {
    state.currentGameDetails = eventGameData;

    localStorage.setItem(
      "current_game_details",
      JSON.stringify(state.currentGameDetails)
    );
  }
};
/**
 * State actions for async and sync state related functions.
 */
const actions = {
  /**
   *
   * Get and set the Player tokens
   */
  async fetchPlayerTokens({ commit }) {
    const {
      data: {
        user: { tokens }
      }
    } = await graphqlClient.query({ query: CURRENT_USER_QUERY });

    commit("setPlayerTokens", tokens);
  },
  /**
   * Query event information from game code.
   */
  async fetchGames({ commit }) {
    const {
      data: {
        gameCodesList: { items }
      }
    } = await graphqlClient.query({
      query: PlayerGameCodes
    });

    commit("setGames", items);
  },
  /**
   * Query event information from game code.
   */
  async switchGames({ commit }, code) {
    const {
      data: { gameCode }
    } = await graphqlClient.query({
      query: CurrentGameDetails,
      variables: { code }
    });

    commit("setCurrentGameDetails", gameCode);
  },
  /**
   * Get the leaderboard of the current game
   */
  async currentGameLeaderboard({ state }) {
    const eventId = state.currentGameDetails.event.id;

    const {
      data: {
        usersList: { groups }
      }
    } = await graphqlClient.query({
      query: CurrentGameLeaderboard,
      variables: { eventId }
    });

    return groups;
  },
  /**
   * Get the next fibbable question
   */
  async nextFibbableQuestion({ state }) {
    const eventId = state.currentGameDetails.event.id;

    const {
      data: {
        questionsList: { items }
      }
    } = await graphqlClient.query({
      query: FibbableQuestionForPlayer,
      variables: { eventId },
      fetchPolicy: "no-cache"
    });

    return items[0];
  },
  /**
   * Get the next playable question
   */
  async nextPlayableQuestion({ state }) {
    const eventId = state.currentGameDetails.event.id;

    const {
      data: {
        questionsList: { items }
      }
    } = await graphqlClient.query({
      query: PlayableQuestionForPlayer,
      variables: { eventId },
      fetchPolicy: "no-cache"
    });

    return items[0];
  },
  /**
   * Fetches the players stats.
   */
  async fetchPlayerStats({ state }) {
    const eventId = state.currentGameDetails.event.id;

    const {
      data: {
        answers,
        attempts,
        points: { groups }
      }
    } = await graphqlClient.query({
      query: PlayerGameStats,
      variables: { eventId },
      fetchPolicy: "no-cache"
    });

    return {
      answers,
      attempts,
      groups
    };
  },
  /**
   * Registers the players in a game.
   */
  async registerGameCode({ commit }, code) {
    const {
      data: { gameCode, user }
    } = await graphqlClient.query({
      query: GameCodeQuery,
      variables: { code },
      fetchPolicy: "no-cache"
    });

    /* Ensure the code exists and is not claimed */
    if (gameCode === null || gameCode.claimed === true) {
      return false;
    } else {
      const {
        data: {
          userUpdate: { gameCodes }
        }
      } = await graphqlClient.mutate({
        mutation: RegisterGameCodeMutation,
        variables: {
          playerId: user.id,
          codeId: gameCode.id
        }
      });

      commit("setGames", gameCodes);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
