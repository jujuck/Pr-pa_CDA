import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import LangsList from "../components/LangsList";
import { useCallback } from "react";

const GET_REPO = gql`
  query GetRepoById($repoId: String!) {
    getRepoById(repoId: $repoId) {
      id
      name
      url
      langs {
        id
        name
      }
      isPrivate {
        label
      }
    }
  }
`;

function OneRepo() {
  const { repoId } = useParams();
  const { data, error, loading } = useQuery(GET_REPO, {
    variables: { repoId: repoId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <main className="container">
      <h1>{data.getRepoById.name}</h1>
      <h3>{data.getRepoById.isPrivate.label}</h3>
      <LangsList langs={data.getRepoById.langs} />
      <a href={data.getRepoById.url}>Aller visiter le repo</a>
    </main>
  );
}

export default OneRepo;
