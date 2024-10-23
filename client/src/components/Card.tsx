import { Link } from "react-router-dom";

// import { Repo } from "../type/Repo";
import { Repo, Lang } from "../generated/graphql-types";

interface CardProps {
  repo: Omit<Repo, "gitHubKey" | "comments" | "isPrivate">;
}

function Card({ repo }: CardProps) {
  return (
    <article className="col-3 py-2">
      <div className="card m-2 p-1 h-100">
        <h3 className="text-center">{repo.name}</h3>
        <a href={repo.url} className="text-center">
          Voir le repo
        </a>
        <br />
        <ul>
          {repo.langs.map(({ id, name }: Omit<Lang, "repos">) => (
            <li key={id}>{name}</li>
          ))}
        </ul>
        <br />
        <Link to={`/${repo.id}`}>En savoir plus</Link>
      </div>
    </article>
  );
}

export default Card;
