import {Router} from "express";
import {authByToken} from "../middleware/auth";
import {createArticle} from "../controllers/articles";

const route = Router();

route.get('/', async (req, res) => {

});

route.get('/feed', authByToken, async (req, res) => {

});

route.get('/:slug', async (req, res) => {

});

route.post('/', authByToken, async (req, res) => {
    try {
        const article = await createArticle(req.body.article, (req as any).user.email);
        res.status(201).json({article})
    } catch (e) {
        console.error(e);
        res.status(422).json({
            errors: {body: ['Could not create article', e.message]}
        });
    }

});

route.patch('/:slug', async (req, res) => {

});

route.delete('/:slug', async (req, res) => {

});


export const articlesRoute = route;