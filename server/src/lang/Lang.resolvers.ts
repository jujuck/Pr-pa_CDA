import {
  Arg,
  Query,
  Resolver,
} from "type-graphql";
import { Lang } from "./Lang.entities";

@Resolver(Lang)
export default class LangResolver {
  @Query(() => [Lang])
  async getAllLangs() {
    const langs = await Lang.find({
      relations: { repos: true}
    });
    return langs;
  }

  @Query(() => Lang)
  async getLangById(@Arg("LangId") LangId: string) {
    const ad = await Lang.findOneOrFail({
      where: { id: Number(LangId) },
      relations: {repos: true}
    });
    return ad;
  }
}