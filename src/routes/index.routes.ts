import { Router } from 'express';

import orderRoutes from './order.routes';

const routes = Router();

routes.use(orderRoutes);

export default routes;