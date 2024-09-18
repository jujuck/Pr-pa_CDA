import { Link } from "react-router-dom";

import type { Lang } from "../type/Lang";
import { Repo } from "../type/Repo";

function Card({ name, url, langs, id }: Repo) {
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
      </div>
    </article>
  );
}

export default Card;
