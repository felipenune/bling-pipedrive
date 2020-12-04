import { Router } from 'express';
import CreateOrderController from '../controllers/CreateOrderController';
import RetrieveOrderController from '../controllers/RetrieveOrderController';

const orderRoutes = Router();

const createOrder = new CreateOrderController();
const retrieveOrder = new RetrieveOrderController();

orderRoutes.post('/order', createOrder.create);
orderRoutes.get('/order', retrieveOrder.index);

export default orderRoutes;