import gql from "graphql-tag";
/**
 * Query the current users details.
 */
export const CURRENT_USER_QUERY = gql`
  query {
    user {
      id
      email
      tokens
    }
  }
`;
/**
 * Sign up a new user mutation.
 */
export const USER_SIGN_UP_MUTATION = gql`
  mutation UserSignUp($user: UserCreateInput!, $authProfileId: ID) {
    userSignUpWithToken(user: $user, authProfileId: $authProfileId) {
      id
      email
    }
  }
`;
/**
 * List of users GameCodes with event info
 */
export const PlayerGameCodes = gql`
  query {
    gameCodesList {
      items {
        event {
          name
          description
          banner {
            downloadUrl
          }
        }
        id
        code
      }
    }
  }
`;
/**
 * Get current Game Details for state.
 */
export const CurrentGameDetails = gql`
  query($code: String!) {
    gameCode(code: $code) {
      event {
        id
        name
        banner {
          downloadUrl
        }
      }
      code
    }
  }
`;
/**
 * Leaderboard query for current game.
 */
export const CurrentGameLeaderboard = gql`
  query($eventId: ID!) {
    usersList(
      groupBy: {
        query: {
          attempts: { points: { as: "PlayerScore", fn: { aggregate: SUM } } }
          id: { as: "PlayerId" }
          firstName: { as: "PlayerName" }
        }
        sort: { alias: "PlayerScore", direction: ASC }
      }
      filter: { gameCodes: { some: { event: { id: { equals: $eventId } } } } }
      first: 10
    ) {
      groups {
        PlayerId: ID
        PlayerName: String
        PlayerScore: Int
      }
    }
  }
`;
/**
 * Query 1 question that the user hasn't fibbed on yet.
 */
export const FibbableQuestionForPlayer = gql`
  query($eventId: ID!) {
    questionsList(
      first: 1
      filter: {
        categories: { some: { events: { some: { id: { equals: $eventId } } } } }
        answers: { none: { author: { is_self: true } } }
      }
    ) {
      items {
        id
        text
        picture {
          fileId
          downloadUrl
        }
      }
    }
  }
`;
/**
 * Create Fib Mutation.
 */
export const AddNewFibMutation = gql`
  mutation($text: String!, $questionId: ID!) {
    addNewFib(text: $text, questionId: $questionId) {
      playerTokens
    }
  }
`;
