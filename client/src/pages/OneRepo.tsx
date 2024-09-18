import { useState } from "react";
import { useParams } from "react-router-dom";
import LangsList from "../components/LangsList";
import {
  useCreateNewCommentMutation,
  useGetRepoByIdQuery,
  Comment,
} from "../generated/graphql-types";

function OneRepo() {
  const { repoId } = useParams<{ repoId: string }>();
  const [comment, setComment] = useState("");
  const { data, error, loading, refetch } = useGetRepoByIdQuery({
    variables: { repoId: repoId || "" },
  });
  const [addComment] = useCreateNewCommentMutation();

  const handleComments = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data && data.getRepoById) {
      addComment({
        variables: {
          data: {
            gitHubKey: data.getRepoById.gitHubKey,
            text: comment,
          },
        },
      });
      refetch();
    }
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (data) {
    return (
      <main className="container">
        <h1>{data.getRepoById.name}</h1>
        <h3>{data.getRepoById.isPrivate.label}</h3>
        <LangsList langs={data.getRepoById.langs} />
        <a href={data.getRepoById.url}>Aller visiter le repo</a>
        {data.getRepoById.comments.map(
          (comment: Omit<Comment, "gitHubKey" | "repo">) => (
            <p key={comment.id}>{comment.text}</p>
          )
        )}
        <form onSubmit={handleComments}>
          <input value={comment} onChange={(e) => setComment(e.target.value)} />
          <button type="submit">Ajouter le commentaire</button>
        </form>
      </main>
    );
  }
}

export default OneRepo;
