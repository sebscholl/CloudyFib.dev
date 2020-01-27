/**
 * This file was generated using 8base CLI.
 *
 * To learn more about writing custom GraphQL resolver functions, visit
 * the 8base documentation at:
 *
 * https://docs.8base.com/8base-console/custom-functions/resolvers
 *
 * To update this functions invocation settings, update its configuration block
 * in the projects 8base.yml file:
 *  functions:
 *    submitAttempt:
 *      ...
 *
 * Data that is sent to this function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * To invoke this function locally, run:
 *  8base invoke-local submitAttempt -p src/resolvers/submitAttempt/mocks/request.json
 */
import gql from "graphql-tag";

const USER_ANSWER_TRUE_QUERY = gql`
  query($answerId: ID!) {
    user: user {
      id
    }

    answer: answer(id: $answerId) {
      truth
      author {
        id
      }
    }
  }
`;

const ATTEMPT_CREATE_MUTATION = gql`
  mutation(
    $questionId: ID
    $answerId: ID!
    $playerId: ID!
    $gameCode: String!
    $type: String!
  ) {
    attemptCreate(
      data: {
        type: $type
        question: { connect: { id: $questionId } }
        answer: { connect: { id: $answerId } }
        player: { connect: { id: $playerId } }
        gameCode: { connect: { code: $gameCode } }
      }
    ) {
      id
      points
    }
  }
`;

export default async (event: any, ctx: any): Promise<any> => {
  const { questionId, answerId, gameCode } = event.data;
  /* Get the answer */
  const {
    user,
    answer: { truth, author }
  } = await ctx.api.gqlRequest(USER_ANSWER_TRUE_QUERY, { answerId });

  let data = {
    questionId,
    answerId,
    gameCode
  };

  if (truth) {
    Object.assign(data, {
      type: "trivia_points",
      playerId: user.id
    });
  } else {
    Object.assign(data, {
      type: "fib_points",
      playerId: author.id
    });
  }

  const {
    attemptCreate: { points }
  } = await ctx.api.gqlRequest(ATTEMPT_CREATE_MUTATION, data, {
    checkPermissions: false
  });

  return {
    data: {
      truth,
      points
    }
  };
};
