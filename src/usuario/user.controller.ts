import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/CreateUser.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from "uuid";
import { ListUserDTO } from "./dto/ListUser.dto";
import { UpdateUserDTO } from "./dto/UpdateUser.dto";

@Controller('/users')
export class UserController {
    constructor(private userRepository: UserRepository) { }

    @Post()
    async createUser(@Body() user: CreateUserDTO) {
        const userEntity = new UserEntity();
        userEntity.id = uuid;
        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.password = user.password;

        this.userRepository.save(userEntity);
        return {
            user: new ListUserDTO(userEntity.id, userEntity.name),
            message: "Usuário criado com sucesso"
        }
    }

    @Get()
    async listUsers() {
        const usersSaved = await this.userRepository.list();
        const usersList = usersSaved.map(
            user => new ListUserDTO(
                user.id,
                user.name
            )
        );
        return usersList;
    }

    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() newValues: UpdateUserDTO) {
        const newUser = await this.userRepository.update(id, newValues);

        return {
            user: newUser,
            message: "Usuário atualizado com sucesso"
        }
    }

    @Delete('/:id')
    async removeUser(@Param('id') id: string) {
        const userRemoved = await this.userRepository.remove(id);

        return {
            user: userRemoved,
            message: 'Usuário removido com sucesso'
        }
    }
}