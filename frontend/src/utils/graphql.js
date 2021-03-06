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
      nickname
      pictureUrl
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
      tokens
      nickname
      pictureUrl
    }
  }
`;
/**
 * Player scores
 */
export const PlayerGameScores = gql`
  query {
    attemptsList(
      groupBy: {
        query: {
          points: { as: "PlayerPoints", fn: { aggregate: SUM } }
          player: { tokens: { as: "PlayerTokens" } }
        }
      }
      filter: { player: { is_self: true } }
    ) {
      groups {
        PlayerPoints: Int
        PlayerTokens: Int
      }
    }
  }
`;
/**
 * Get the users play stats.
 */
export const PlayerGameStats = gql`
  query($eventId: ID!) {
    answers: answersList(
      filter: {
        truth: { equals: false }
        author: { is_self: true }
        question: {
          categories: {
            some: { events: { some: { id: { equals: $eventId } } } }
          }
        }
      }
    ) {
      count
    }

    attempts: attemptsList(
      filter: {
        createdBy: { is_self: true }
        gameCode: { event: { id: { equals: $eventId } } }
      }
    ) {
      count
    }

    points: attemptsList(
      groupBy: {
        query: {
          type: { as: "label" }
          points: { as: "value", fn: { aggregate: SUM } }
        }
      }
      filter: {
        player: { is_self: true }
        gameCode: { event: { id: { equals: $eventId } } }
      }
    ) {
      groups {
        label: String
        value: Int
      }
    }
  }
`;
/**
 * List of users GameCodes with event info
 */
export const PlayerGameCodes = gql`
  query {
    gameCodesList(filter: { player: { is_self: true } }) {
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
          email: { as: "PlayerName" }
        }
        sort: { alias: "PlayerScore", direction: DESC }
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
/**
 * Get answerable questions.
 */
export const PlayableQuestionForPlayer = gql`
  query($eventId: ID!) {
    questionsList(
      first: 1
      filter: {
        categories: { some: { events: { some: { id: { equals: $eventId } } } } }
        attempts: { none: { createdBy: { is_self: true } } }
      }
    ) {
      items {
        id
        text
        picture {
          fileId
          downloadUrl
        }
        answers(
          filter: { author: { is_self: false } }
          sort: { truth: DESC }
          first: 5
        ) {
          items {
            id
            text
            author {
              id
            }
          }
        }
      }
    }
  }
`;
/**
 * Submit a new attempt at answering a question
 */
export const SubmitAttempt = gql`
  mutation($answerId: ID!, $questionId: ID!, $gameCode: String!) {
    submitAttempt(
      answerId: $answerId
      questionId: $questionId
      gameCode: $gameCode
    ) {
      truth
      points
    }
  }
`;
/**
 * Check if gamecode exists
 */
export const GameCodeQuery = gql`
  query($code: String!) {
    user: user {
      id
    }

    gameCode(code: $code) {
      event {
        name
        description
        banner {
          downloadUrl
        }
      }
      id
      code
      claimed
    }
  }
`;
/**
 * Register the gameCode
 */
export const RegisterGameCodeMutation = gql`
  mutation($codeId: ID!, $playerId: ID!) {
    userUpdate(
      data: { id: $playerId, gameCodes: { connect: [{ id: $codeId }] } }
    ) {
      gameCodes {
        items {
          event {
            name
            description
            banner {
              downloadUrl
            }
          }
          player {
            id
          }
          id
          code
        }
      }
    }
  }
`;
