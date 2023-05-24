import { Router } from 'express';
import {
  getOrders,
  createOrder
} from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter
  .get('/', getOrders)
  .post('/', createOrder)


export default orderRouter;
