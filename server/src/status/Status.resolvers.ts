import {
  Arg,
  Query,
  Resolver,
} from "type-graphql";
import { Status } from "./Status.entities";

@Resolver(Status)
export default class StatusResolver {
  @Query(() => [Status])
  async getAllStatus() {
    const Statuss = await Status.find();
    return Statuss;
  }

  @Query(() => Status)
  async getStatusById(@Arg("StatusId") StatusId: string) {
    const ad = await Status.findOneOrFail({
      where: { id: Number(StatusId) },
    });
    return ad;
  }
}