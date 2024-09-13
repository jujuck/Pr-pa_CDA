import {
  Arg,
  Query,
  Resolver,
  Mutation
} from "type-graphql";
import { Status, NewStatus } from "./Status.entities";

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

  @Mutation(() => Status)
  async createNewStatus(@Arg("data") NewStatus: NewStatus) {
    const resultFromSave = await Status.save({ ...NewStatus });
    const resultForApi = await Status.find({
      where: { id: resultFromSave.id },
    });
    return resultForApi[0];
  }
}