import { useQuery, gql } from "@apollo/client";
import type { Repo } from "./type/Repo";

import "./App.css";
import Card from "./components/Card";

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

  return (
    <main className="container">
      <section className="row">
        <h1 className="text-center">Mes repo GitHub</h1>
        {data.getAllRepos.map(({ id, name, url, langs }: Repo) => (
          <Card key={id} langs={langs} name={name} url={url} id={id} />
        ))}
      </section>
    </main>
  );
}

export default App;
