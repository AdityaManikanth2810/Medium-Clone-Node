import {getRepository} from "typeorm";
import {User} from "../entities/User";

interface UserSignUpData {
    username: string,
    // password: string //TODO : securely handle passwords
    email: string
}

export async function createUser(data: UserSignUpData) {

    try {
        const createdUser = await getRepository(User).save({
            username: data.username,
            email: data.email
        });

        return createdUser;
    } catch (e) {
        console.error(e)
    }

}