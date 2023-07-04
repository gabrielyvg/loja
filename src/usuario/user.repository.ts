import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [];

    async save(user: UserEntity) {
        this.users.push(user);
    }

    async list() {
        return this.users;
    }

    async existWithEmail(email: string) {
        const possibleUser = this.users.find(
            user => user.email === email
        );

        return possibleUser !== undefined;
    }

    async update(id, newValues: Partial<UserEntity>) {
        const user = this.searchId(id);

        Object.entries(newValues).forEach(([key, value]) => {
            if (key === 'id') {
                return;
            }

            user[key] = value;
        });

        return user;
    }

    async remove(id: string) {
        const user = this.searchId(id);

        this.users = this.users.filter(
            userSaved => userSaved.id !== id
        )
    }

    private searchId(id: string) {
        const possibleUser = this.users.find(
            userSaved => userSaved.id === id
        );

        if (!possibleUser) {
            throw new Error("Usuário não existe");
        }
        
        return possibleUser;
    }
}