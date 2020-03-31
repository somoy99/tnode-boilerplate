import express from 'express';
import compression from 'compression';
import helmet from "helmet";
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import methodOverride from 'method-override';
import routes from './routes';
import { dbConnect } from './config/database';


const app = express();


app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms"),
    helmet(),
    compression(),
    cors(),
    bodyParser.json({ 'limit': '1mb' }),
    bodyParser.urlencoded({ extended: true }),
    methodOverride(),
    (err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ 'error': 'Something broke!' });
        next();
    },
);

dotenv.config({
    path: path.resolve('./.env')
});


app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), () => {
    console.log(process.env.NAME);
    console.log('Express server listening on port ' + server.address().port);
    dbConnect()
        .on('error', console.error.bind(console, 'connection error:'))
        .once('open', () => {
            console.log('database connection established');
        });
});

app.get('/', (req, res) => {
    res.status(200).send('Hi You Reached the API, now REST!');
});

app.use(routes);