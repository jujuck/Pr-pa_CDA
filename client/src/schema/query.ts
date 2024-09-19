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

 export const GET_REPOS = gql`
  query GetAllRepos($filter: String) {
    getAllRepos(filter: $filter) {
      id
      name
      url
      langs {
        id
        name
      }
      isPrivate {
        id
        label
      }
    }
    getAllLangs {
      id
      name
    }
  }
`;