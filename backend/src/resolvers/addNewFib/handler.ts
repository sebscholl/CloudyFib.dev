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

const VALIDATE_ANSWER_AND_USER_QUERY = gql`
  query($questionId: ID!, $text: String!) {
    # Current user tokens
    user: user {
      id
      tokens
    }
    # Validate the users fib
    validate: answersList(
      filter: {
        question: { id: { equals: $questionId } }
        text: { contains: $text }
      }
    ) {
      count
    }
  }
`;

const CREATE_ANSWER_AND_UPDATE_USER_TOKENS_MUTATION = gql`
  mutation($authorId: ID!, $tokens: Int!, $questionId: ID!, $text: String!) {
    user: userUpdate(data: { id: $authorId, tokens: $tokens }) {
      tokens
    }

    answer: answerCreate(
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

export default async (event: any, ctx: any): Promise<any> => {
  const { questionId, text } = event.data;

  /* Get current user info and see if the answer exists */
  const {
    user: { id, tokens },
    validate: { count }
  } = await ctx.api.gqlRequest(VALIDATE_ANSWER_AND_USER_QUERY, {
    questionId,
    text
  });

  /* If the answer already exists, return an error */
  if (count > 0) {
    return {
      errors: [
        {
          message: "That Fib already exists! Make up another one...",
          code: "RecordValidationError"
        }
      ]
    };
  }

  /* Create the new answer/fib and updates the users token balance */
  await ctx.api.gqlRequest(
    CREATE_ANSWER_AND_UPDATE_USER_TOKENS_MUTATION,
    {
      tokens: tokens + 1,
      authorId: id,
      questionId,
      text
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
