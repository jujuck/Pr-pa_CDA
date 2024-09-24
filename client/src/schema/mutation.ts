import { gql } from "@apollo/client";

export const POST_COMMENT = gql`
  mutation CreateNewComment($data: NewComment!) {
    createNewComment(data: $data) {
      text
      gitHubKey
    }
  }
`;

export const LOGIN = gql`
  mutation SignUp($data: Sign!) {
    signIn(data: $data) {
    user {
      email
      id
    }
    token
  }
}`;