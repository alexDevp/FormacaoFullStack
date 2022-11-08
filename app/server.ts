import http from 'http';
import express, {Express} from 'express';
import morgan from 'morgan';
import {router as PostRouter} from './routes/posts';

import mongoose from 'mongoose';
import mongoConfig from './config/mongo';
mongoose.connect(mongoConfig.url)

const router: Express = express();

router.use(express.urlencoded({extended: false}));

router.use(express.json());

router.use("/", PostRouter);

router.get('/', (res, req)=>{
    console.log("Hello World")
})

router.listen (8080, () =>{
    console.log("Servidor started")
})