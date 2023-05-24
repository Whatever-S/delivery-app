import { Router } from 'express';
import {
  getShops
} from '../controllers/shop.controller.js';

const shopsRouter = Router();

shopsRouter.get('/', getShops)


export default shopsRouter;
