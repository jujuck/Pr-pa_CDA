import { Lang } from "../generated/graphql-types";

type LangList = {
  langs: Lang[];
};

function LangsList({ langs }: LangList) {
  return (
    <ul>
      {langs.map(({ id, name }: Lang) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
}

export default LangsList;
