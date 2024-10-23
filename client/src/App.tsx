import "./App.css";
import Card from "./components/Card";
import LangFilter from "./components/LangFilter";
import { useGetAllReposQuery } from "./generated/graphql-types";

function App() {
  const { loading, error, data, refetch } = useGetAllReposQuery({
    variables: {
      filter: null,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const filterRepo = (filter: string | null) => {
    refetch({ filter });
  };

  if (data) {
    return (
      <main className="container">
        <h1 className="text-center">Mes repo GitHub</h1>
        <section>
          <ul className="d-flex flex-row justify-content-between">
            <li onClick={() => filterRepo(null)}>Aucun filtre</li>
            {data.getAllLangs.map((lang) => (
              <LangFilter lang={lang} key={lang.id} filterRepo={filterRepo} />
            ))}
          </ul>
        </section>
        <section className="row">
          {data.getAllRepos.map((repo) => (
            <Card key={repo.id} repo={repo} />
          ))}
        </section>
      </main>
    );
  }
}

export default App;
