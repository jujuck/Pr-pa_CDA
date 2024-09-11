import { Repo } from "./Repo.entities";

const readAll = async () => {
  return await Repo.find()
}

export default {
  readAll
}