import type { Lang } from "../type/Lang";

type Props = {
  lang: Lang;
  filterRepo: (id: string) => void;
};

function LangFilter({ lang, filterRepo }: Props) {
  return <li onClick={() => filterRepo(lang.id)}>{lang.name}</li>;
}

export default LangFilter;
