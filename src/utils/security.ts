import {User} from "../entities/User";
import deleteProperty = Reflect.deleteProperty;

export default function SanitizeUser(user: User) {
    if (user.password) deleteProperty(user, 'password')
    return user;
}