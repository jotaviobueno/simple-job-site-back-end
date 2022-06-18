import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { router } from './app/router/v1.js';

const app = express();

dotenv.config();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', router);

mongoose.connect(process.env.DB_HOST_CONNECT).then(() => {
    console.log('Connected to mongoose');

    app.listen(process.env.PORT || 8081, () => {
        console.log('listening on!');
        
    });
});