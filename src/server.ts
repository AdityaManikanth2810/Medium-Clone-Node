import express from 'express';
import {createConnection} from "typeorm";
import {Article} from "./entities/Article";
import {User} from "./entities/User";
import {usersRoute} from "./routes/users";
import {userRoute} from "./routes/user";
import bodyParser from "body-parser";

const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.send('Hello World');
})

app.use('/api/users',usersRoute);
app.use('/api/user',userRoute);


createConnection({
    type: 'postgres',
    username: 'Aditya',
    password: 'shubhasya',
    database: 'mediumClone',
    entities: [Article, User],
    synchronize: true,
    dropSchema: true, // TODO: Not for production
    logging: true,
    logger: 'advanced-console'
})
    .then(() => {
        app.listen(3232, () => {
            console.log('Server running on http://localhost:3232')
        });
    })




