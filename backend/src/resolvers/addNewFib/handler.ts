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
 *    addNewFib:
 *      ...
 *
 * Data that is sent to this function can be accessed on the event argument at:
 *  event.data[KEY_NAME]
 *
 * To invoke this function locally, run:
 *  8base invoke-local addNewFib -p src/resolvers/addNewFib/mocks/request.json
 */
import gql from "graphql-tag";

const CREATE_ANSWER_MUTATION = gql`
  mutation($authorId: ID!, $questionId: ID!, $text: String!) {
    answerCreate(
      data: {
        truth: false
        text: $text
        question: { connect: { id: $questionId } }
        author: { connect: { id: $authorId } }
      }
    ) {
      id
    }
  }
`;

const CURRENT_USER_QUERY = gql`
  query {
    user {
      id
      tokens
    }
  }
`;

const UPDATE_USER_TOKENS_MUTATION = gql`
  mutation($id: ID!, $tokens: Int!) {
    userUpdate(data: { id: $id, tokens: $tokens }) {
      tokens
    }
  }
`;

export default async (event: any, ctx: any): Promise<any> => {
  const { questionId, text } = event.data;
  /* Get current user info */
  const {
    user: { id, tokens }
  } = await ctx.api.gqlRequest(CURRENT_USER_QUERY);
  /* Create the new answer/fib */
  await ctx.api.gqlRequest(
    CREATE_ANSWER_MUTATION,
    {
      authorId: id,
      questionId,
      text
    },
    { checkPermissions: false }
  );
  /* Updates the users token balance */
  await ctx.api.gqlRequest(
    UPDATE_USER_TOKENS_MUTATION,
    {
      id,
      tokens: tokens + 1
    },
    { checkPermissions: false }
  );
  /* Return result */
  return {
    data: {
      playerTokens: tokens + 1
    }
  };
};
