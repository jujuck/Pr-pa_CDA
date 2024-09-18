import { gql } from "@apollo/client";

export const GET_REPO = gql`
  query GetRepoById($repoId: String!) {
    getRepoById(repoId: $repoId) {
      id
      gitHubKey
      name
      url
      langs {
        id
        name
      }
      isPrivate {
        label
      }
      comments {
        id
        text
      }
    }
  }
`;