import express from 'express';
import "reflect-metadata";
import bodyParser from 'body-parser'
import 'dotenv/config';

import './connection'
import routes from './routes/index.routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(routes);


app.listen(3333)