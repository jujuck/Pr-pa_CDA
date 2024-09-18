import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

import type { Lang } from "../type/Lang";
import { Repo } from "../type/Repo";

const POST_COMMENT = gql`
  mutation createNewComment($data: NewComment!) {
    createNewComment(data: $data) {
      text
      gitHubKey
    }
  }
`;
function Card({ name, url, langs, id, gitHubKey }: Repo) {
  const [addComment] = useMutation(POST_COMMENT);

  const postComment = async () => {
    addComment({
      variables: {
        data: {
          gitHubKey: gitHubKey,
          text: `Commentaire sur le repo ${name}`,
        },
      },
    });
  };
  return (
    <article className="col-3 py-2">
      <div className="card m-2 p-1 h-100">
        <h3 className="text-center">{name}</h3>
        <a href={url} className="text-center">
          Voir le repo
        </a>
        <br />
        <ul>
          {langs.map(({ id, name }: Lang) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
        <br />
        <Link to={`/${id}`}>En savoir plus</Link>
        <button type="button" onClick={postComment}>
          Ajout commentaire
        </button>
      </div>
    </article>
  );
}

export default Card;
