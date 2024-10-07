import { Lang } from "./Lang.entities";

const readAll = async () => {
  return await Lang.find();
};

export default {
  readAll,
};
