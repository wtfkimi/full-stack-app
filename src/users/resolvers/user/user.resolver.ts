import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UserService} from "../../services/user/user.service";
import {UserEntity} from "../../entities/user.entity";
import {CreateUserInput} from "../../inputs/create-user.input";
import {UpdateUserInput} from "../../inputs/update-user.input";
import {User} from "@apollo/server/src/plugin/schemaReporting/generated/operations";

@Resolver('User')
export class UserResolver {

    constructor(private readonly userService: UserService) {

    }

    @Mutation(() => UserEntity) // Mutation graphQL
    async createUser(@Args('createUser') createUserInput: CreateUserInput): Promise<UserEntity> {
        return await this.userService.createUser(createUserInput)
    }

    @Mutation(() => UserEntity) // Mutation graphQL
    async updateUser(@Args('updateUser') updateUserInput: UpdateUserInput): Promise<UserEntity> {
        return await this.userService.updateUser(updateUserInput);
    }

    @Mutation(() => UserEntity) // Mutation graphQL
    async removeUser(@Args('id') id: number): Promise<number> {
        return await this.userService.removeUser(id);
    }

    @Query(() => UserEntity) // get
    async getOneUser(@Args('id') id: number): Promise<UserEntity> {
        return await this.userService.getOneUser(id);
    }

    @Query(() => [UserEntity]) // get users type in GraphQL
    async getAllUsers(): Promise<UserEntity[]> {
        return await this.userService.getAllUsers();
    }
}
