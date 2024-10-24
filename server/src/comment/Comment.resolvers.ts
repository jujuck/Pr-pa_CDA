import { Arg, Query, Resolver, Mutation } from "type-graphql";
import { Comment, NewComment } from "./Comment.entities";
import { Repo } from "../repo/Repo.entities";
import { GraphQLError } from "graphql";

@Resolver(Comment)
export default class LangResolver {
  @Query(() => [Comment])
  async getAllComments() {
    throw new GraphQLError("Test d'erreur avec message personnalisé", {
      extensions: {
        code: 404,
      },
    });
    const comments = await Comment.find({
      relations: { repo: true },
    });
    return comments;
  }

  @Mutation(() => Comment)
  async createNewComment(@Arg("data") newComment: NewComment) {
    const myRepo = await Repo.findOneOrFail({
      where: { gitHubKey: newComment.gitHubKey },
    });
    const myComment = await Comment.save({
      ...newComment,
      gitHubKey: newComment.gitHubKey,
      repo: myRepo,
    });

    return myComment;
  }
}
