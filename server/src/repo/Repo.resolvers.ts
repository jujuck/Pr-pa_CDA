import {
  Arg,
  Query,
  Resolver,
  Mutation
} from "type-graphql";
import { Repo, NewRepo } from "./Repo.entities";
import { Status } from "../status/Status.entities";
import { Lang } from "../lang/Lang.entities";
import { In } from "typeorm";

@Resolver(Repo)
export default class RepoResolver {
  @Query(() => [Repo])
  async getAllRepos() {
    const repos = await Repo.find({
      relations: { langs: true, isPrivate: true }
    });
    return repos;
  }

  @Query(() => Repo)
  async getRepoById(@Arg("repoId") repoId: string) {
    const ad = await Repo.findOneOrFail({
      where: { id: Number(repoId) },
      relations: { langs: true, isPrivate: true }
    });
    console.log("ad", ad)
    return ad;
  }

  @Mutation(() => Repo)
  async createNewRepo(@Arg("data") newRepo: NewRepo) {
    const status = await Status.findOneOrFail({ where: { id: Number(newRepo.isPrivate)}})
    const langs = await Lang.find({where : { id: In(newRepo.langs.map(l => Number(l))) }});
    const myRepo = await Repo.save({
      ...newRepo,
      isPrivate: status,
      langs: langs
    });
    const result = await Repo.findOneOrFail({
      where: {id: myRepo.id},
      relations: { langs: true, isPrivate: true }
    })

    return result;
  }

  @Mutation(() => Boolean)
  async deleteRepo(@Arg("repoId") repoId: string) {
    const result = await Repo.delete(
        {id: Number(repoId)}
    );

    return result.affected;
  }
}