import {Router} from "express";
import {createUser, loginUser} from "../controllers/users";

const route = Router();

// POST /login/login            -- Login an existing user
route.post('/', async (req, res, next) => {
    try {
        const user = await createUser(req.body.user);
        return res.status(201).json(user);
    } catch (e) {
        console.error(e);
        res.status(422).json({
            errors: {body: ['Could not create user', e.message]}
        });
    }
});

route.post('/login', async (req,res,next) => {
    try {
        const user = await loginUser(req.body.user);
        return res.status(200).json(user);
    } catch(e) {
        console.error(e);
        res.status(422).json({
            errors: {body: ['Login Failed', e.message]}
        });
    }
})

// POST /users                  -- Register a new user
// route.post('/', (req, res, next) => {
//
// })

export const usersRoute = route;