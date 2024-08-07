import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { ERRORS } from "@core/errors";
import { jwt } from "@core/utilities";
import { IAppContext } from "@core/context";
import { AuthMiddleware } from "@core/middlewares/auth";
import { RegisterRq } from "./user.rq";
import { User } from "@database/models";
import { AuthActionResponse } from "./user.rs";

@InputType()
export class UserRq {
    @Field()
    name: string;
}

@Resolver()
export class UserResolver {
    @Mutation(() => AuthActionResponse)
    async register(
        @Arg("body") registerData: RegisterRq
    ): Promise<AuthActionResponse> {
        const foundUser = await User.findOneBy({
            username: registerData.username,
        });

        if (foundUser) throw ERRORS.DUPLICATE_RECORD;

        const createdUser = await User.save({
            ...registerData,
        });

        if (!createdUser) throw ERRORS.INTERNAL_SERVER_ERROR;

        const authToken = jwt.sign(createdUser.token);

        return {
            auth_token: authToken,
            user: createdUser,
        };
    }

    @Query(() => User)
    @UseMiddleware([AuthMiddleware])
    getCurrentUser(@Ctx() ctx: IAppContext) {
        return ctx.user;
    }
}
