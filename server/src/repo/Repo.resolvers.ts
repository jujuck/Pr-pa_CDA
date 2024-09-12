import {
  Arg,
  Query,
  Resolver,
} from "type-graphql";
import { Repo } from "./Repo.entities";

@Resolver(Repo)
export default class RepoResolver {
  @Query(() => [Repo])
  async getAllRepos() {
    const repos = await Repo.find();
    return repos;
  }

  @Query(() => Repo)
  async getRepoById(@Arg("repoId") repoId: string) {
    const ad = await Repo.findOneOrFail({
      where: { id: repoId },
    });
    return ad;
  }
}