import {getRepository} from "typeorm";
import {User} from "../entities/User";
import {hashedPassword, matchPassword} from "../utils/password";
import {Sign} from "../utils/jwt";
import SanitizeUser from "../utils/security";

interface UserSignUpData {
    username: string,
    password: string,
    email: string
}

interface UserLoginData {
    email: string,
    password: string
}

export async function createUser(data: UserSignUpData) {


    //Check for Data Validity
    if (!data.username) throw new Error('username is blank');
    if (!data.email) throw new Error('email is blank');
    if (!data.password) throw new Error('password is blank');

    const repo = await getRepository(User);

    //Check if user exists
    const existing = await repo.findOne(data.email);
    if (existing) throw new Error('email already exists');

    //Create User and return back
    try {
        //Using Constructor
        const user = new User(data.email, data.username, await hashedPassword(data.password));
        // user.username = data.username;
        // user.email = data.email;
        // user.password = await hashedPassword(data.password);

        await getRepository(User).save(user);

        user.token = await Sign(user)
        return SanitizeUser(user);
    } catch (e) {
        console.error(e)
    }

}

export async function loginUser(data: UserLoginData) {

    //Check for Data Validity
    if (!data.email) throw new Error('email is blank');
    if (!data.password) throw new Error('password is blank');

    const repo = getRepository(User);

    //Check if email exists
    const user = await repo.findOne(data.email) as User
    if (!user) throw new Error('No User with this email id');

    //Check if password matches
    const match = await matchPassword(user.password!, data.password);

    if (match === false) throw new Error('Incorrect Password');

    user.token = await Sign(user);

    return SanitizeUser(user);
}