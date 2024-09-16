import { useQuery, gql } from "@apollo/client";
import type { Lang } from "./type/Lang";
import type { Repo } from "./type/Repo";

import "./App.css";

const GET_REPOS = gql`
  query GetAllRepos {
    getAllRepos {
      id
      name
      url
      langs {
        id
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_REPOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.getAllRepos.map(({ id, name, url, langs }: Repo) => (
    <div key={id}>
      <h3>{name}</h3>
      <p>{url}</p>
      <br />
      <ul>
        {langs.map(({ id, name }: Lang) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
      <br />
    </div>
  ));
}

export default App;
