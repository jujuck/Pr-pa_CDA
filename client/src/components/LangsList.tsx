import { Lang } from "../type/Lang";

type LangList = {
  langs: Lang[];
};

function LangsList({ langs }: LangList) {
  console.log(langs);
  return (
    <ul>
      {langs.map(({ id, name }: Lang) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
}

export default LangsList;
