import {Router} from "express";
import {createUser} from "../controllers/users";

const route = Router();

// POST /login/login            -- Login an existing user
route.post('/', async (req, res, next) => {

    try {
        const user = await createUser(req.body.user);
        return res.status(201).json(user);
    } catch (e) {
        console.error(e);
        res.status(422).json({
            errors: {body: ['Could not crate user']}
        });
    }
});

// POST /users                  -- Register a new user
// route.post('/', (req, res, next) => {
//
// })

export const usersRoute = route;