import express from 'express';
import "reflect-metadata";
import bodyParser from 'body-parser'
import CreateOrderController from './controllers/CreateOrderController';

import './connection'

const createOrder = new CreateOrderController();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/order', createOrder.create)


app.listen(3333)