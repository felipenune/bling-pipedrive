import { Request, Response } from "express";
import { IDeal } from "../interfaces/deals";
import OrderBlingService from "../services/OrderBlingService";
import pipe from "../services/pipeUrl";

const api_token = 'e23d20cc4da337516714521aed2f32ae100a45b9'
const status = 'won'

const orderBlingService = new OrderBlingService();

export default class CreateOrderController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const deals = await pipe.get(`/deals`, {
        params: {
          api_token,
          status,
        }
      }).then(response => {
        return response.data
      })

      let deal: IDeal
      for (deal of deals.data) {
        const order = orderBlingService.execute(
          deal.org_name, 
          deal.cc_email,
          deal.id,
          deal.title,
          deal.value,
        )
      }
      
      return response.status(200).json({ok:true})
    } catch (err) {
      console.log(err)
      return response.status(200).json({ erro: 'Erro ao criar pedido'});
    }
  }
};