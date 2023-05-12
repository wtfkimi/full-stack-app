import {Field, InputType} from "@nestjs/graphql";


@InputType() // for dto
export class CreateUserInput {
    @Field()
    email: string

    @Field({nullable: true})
    name: string
}