import { useQuery, gql } from "@apollo/client";
import type { Repo } from "./type/Repo";

import "./App.css";
import Card from "./components/Card";
import LangFilter from "./components/LangFilter";
import { Lang } from "./type/Lang";

const GET_REPOS = gql`
  query GetAllRepos($filter: String) {
    getAllRepos(filter: $filter) {
      id
      name
      gitHubKey
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
    getAllStatus {
      id
      label
      repos {
        name
      }
    }
    getAllComments {
      id
      text
      gitHubKey
      repo {
        name
        gitHubKey
      }
    }
  }
`;

function App() {
  const { loading, error, data, refetch } = useQuery(GET_REPOS, {
    variables: {
      filter: null,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const filterRepo = (filter: string | null) => {
    refetch({ filter });
  };

  return (
    <main className="container">
      <h1 className="text-center">Mes repo GitHub</h1>
      <section>
        <ul className="d-flex flex-row justify-content-between">
          <li onClick={() => filterRepo(null)}>Aucun filtre</li>
          {data.getAllLangs.map((lang: Lang) => (
            <LangFilter lang={lang} key={lang.id} filterRepo={filterRepo} />
          ))}
        </ul>
      </section>
      <section className="row">
        {data.getAllRepos.map(({ id, name, url, langs, gitHubKey }: Repo) => (
          <Card
            key={id}
            langs={langs}
            name={name}
            url={url}
            id={id}
            gitHubKey={gitHubKey}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
