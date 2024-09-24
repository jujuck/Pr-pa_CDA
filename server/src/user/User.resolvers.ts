import { Mutation, Resolver, Arg, Ctx } from "type-graphql";
import { Sign, SignInResponse, User } from "./User.entities";
import { validate } from "class-validator";
import jwt from "jsonwebtoken";


@Resolver(User)
export default class UserResolver {
  @Mutation(() => User)
  async signUp(@Arg("data") signUp: Sign) {
    const errors = await validate(signUp)
    // Argon2 Hash du mot de pass

    if (errors.length > 0) {
      console.log(errors)
      throw new Error("Champs incorrectes")
    }
    const resultUser = await User.save({
      ...signUp
    })

    return resultUser;
  }

  @Mutation(() => SignInResponse)
  async signIn(@Arg("data") signIn: Sign, @Ctx() context: any) {
    const errors = await validate(signIn);

    if (errors.length > 0) {
      throw new Error("Champs invalid")
    }

    try {
      const user = await User.findOneByOrFail({ email: signIn.email});
      // check du argon normalement

      if (user.password === signIn.password) {
        const token = jwt.sign({id: user.id, email: user.email}, "masuperclesecretemegatroplongue");//Clé sotckée en .env
        context.res.setHeader(
          "Set-Cookie",
          `token=${token};secure;httpOnly;SameSite:none`
        );
        return {user, token}
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      console.log(error)
      throw new Error("Invalid credentials")
    }
  }
}