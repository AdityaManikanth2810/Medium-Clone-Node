import {Router} from "express";

const route = Router();


// GET /user
route.get('/',(req,res,next)=>{
    res.send('GET /user has been hit');
});

export const userRoute = route;