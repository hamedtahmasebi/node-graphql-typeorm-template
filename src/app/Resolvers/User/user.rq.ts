import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class RegisterRq {
    @Field()
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @Field()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
