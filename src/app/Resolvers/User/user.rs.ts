import { Field, ObjectType } from "type-graphql";
import { User } from "@database/models";

@ObjectType()
export class AuthActionResponse {
    @Field()
    auth_token: string;

    @Field(() => User)
    user: User;
}
