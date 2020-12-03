import { Router } from 'express';
import CreateOrderController from '../controllers/CreateOrderController';

const orderRoutes = Router();

const createOrder = new CreateOrderController();

orderRoutes.post('/order', createOrder.create);

export default orderRoutes;