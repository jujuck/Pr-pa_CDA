import { gql } from "@apollo/client";

export const POST_COMMENT = gql`
  mutation CreateNewComment($data: NewComment!) {
    createNewComment(data: $data) {
      text
      gitHubKey
    }
  }
`;