import { useState, SyntheticEvent } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql, useMutation } from "@apollo/client";
import LangsList from "../components/LangsList";
import type { Comment } from "../type/Comment";

const GET_REPO = gql`
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

const POST_COMMENT = gql`
  mutation CreateNewComment($data: NewComment!) {
    createNewComment(data: $data) {
      text
      gitHubKey
    }
  }
`;

function OneRepo() {
  const { repoId } = useParams();
  const [comment, setComment] = useState("");
  const { data, error, loading, refetch } = useQuery(GET_REPO, {
    variables: { repoId: repoId },
  });
  const [addComment] = useMutation(POST_COMMENT);

  const handleComments = (e: SyntheticEvent) => {
    e.preventDefault();
    addComment({
      variables: {
        data: {
          gitHubKey: data.getRepoById.gitHubKey,
          text: comment,
        },
      },
    });
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <main className="container">
      <h1>{data.getRepoById.name}</h1>
      <h3>{data.getRepoById.isPrivate.label}</h3>
      <LangsList langs={data.getRepoById.langs} />
      <a href={data.getRepoById.url}>Aller visiter le repo</a>
      {data.getRepoById.comments.map((comment: Comment) => (
        <p key={comment.id}>{comment.text}</p>
      ))}
      <form onSubmit={handleComments}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} />
        <button type="submit" onClick={handleComments}>
          Ajouter le commentaire
        </button>
      </form>
    </main>
  );
}

export default OneRepo;
