import { Lang } from "../generated/graphql-types";

type Props = {
  lang: Omit<Lang, "repos">;
  filterRepo: (id: string) => void;
};

function LangFilter({ lang, filterRepo }: Props) {
  return <li onClick={() => filterRepo(lang.id)}>{lang.name}</li>;
}

export default LangFilter;
