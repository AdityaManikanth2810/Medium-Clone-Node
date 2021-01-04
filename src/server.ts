import express from 'express';
import {createConnection} from "typeorm";
import {Article} from "./entities/Article";
import {User} from "./entities/User";

const app = express();

app.get('/', (req, res, next) => {
    res.send('Hello World');
})

async function start() {

    await createConnection({
        type: 'postgres',
        username: 'freak2810',
        password: 'Sheena&mani01',
        database: 'mediumclone',
        entities: [Article, User],
        synchronize: true,
        dropSchema:true, // TODO: Not for production
        logging: true,
        logger: 'advanced-console'
    })

    app.listen(3232, () => {
        console.log('Server running on http://localhost:3232')
    });
}


start();
