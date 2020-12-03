import { Request, Response } from "express";
import { IDeal, IDealReturn } from "../dtos/IDeal";
import DealRepository from "../repositories/DealRepository";
import OrderBlingService from "../services/OrderBlingService";
import pipe from "../services/pipeUrl";

const api_token = 'e23d20cc4da337516714521aed2f32ae100a45b9'
const status = 'won'

const orderBlingService = new OrderBlingService();

export default class CreateOrderController {
  async create(request: Request, response: Response): Promise<Response> {
    const dealRepository = new DealRepository();

    try {
      const deals = await pipe.get(`/deals`, {
        params: {
          api_token,
          status,
        }
      }).then(response => {
        return response.data
      })

      let deal: IDealReturn
      for (deal of deals.data) {
        orderBlingService.execute(
          deal.org_name, 
          deal.cc_email,
          deal.id,
          deal.title,
          deal.value,
        )

        await dealRepository.create({
          deal_id: deal.id,
          title: deal.title,
          value: deal.value,
          org_name: deal.org_name,
          cc_email: deal.cc_email,
        })
      }
      
      return response.status(200).json({ok:true})
    } catch (err) {
      console.log(err)
      return response.status(200).json({ erro: 'Erro ao criar pedido'});
    }
  }
};