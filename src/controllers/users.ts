import {getRepository} from "typeorm";
import {User} from "../entities/User";
import {hashedPassword} from "../utils/password";

interface UserSignUpData {
    username: string,
    password: string,
    email: string
}

export async function createUser(data: UserSignUpData) {

    if (!data.username) throw new Error('username is blank');
    if (!data.email) throw new Error('email is blank');
    if (!data.password) throw new Error('password is blank');

    const repo = await getRepository(User);

    const existing = repo.find({email: data.email})

    if(existing) throw new Error('email already exists');

    try {
        const user = new User();
        user.username = data.username;
        user.email = data.email;
        user.password = await hashedPassword(data.password);

        await getRepository(User).save(user);
        return user;
    } catch (e) {
        console.error(e)
    }

}