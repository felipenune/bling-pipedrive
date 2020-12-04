import { Request, Response } from "express";
import OrderRepository from "../repositories/OrderRepository";

export default class RetrieveOrderController {
  async index(request: Request, response: Response): Promise<Response> {
    const orderRepository = new OrderRepository();

    try {
      //list all orders saved in the database
      const orders = await orderRepository.listOrders();
      
      return response.status(200).json(orders);
    } catch (err) {
      console.log(err)
      return response.status(200).json({ erro: 'Erro retornar dados da collection'});
    }
  }
};