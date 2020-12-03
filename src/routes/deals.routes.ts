import { Router } from 'express';
import RetrieveDealController from '../controllers/RetrieveDealController';

const dealssRoutes = Router();

const retrieveDeal = new RetrieveDealController();

dealssRoutes.get('/deals', retrieveDeal.index);

export default dealssRoutes;