import { Router } from 'express';

import orderRoutes from './order.routes';
import dealsRoutes from './deals.routes';

const routes = Router();

routes.use(orderRoutes);

routes.use(dealsRoutes);

export default routes;