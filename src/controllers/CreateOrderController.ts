import { Request, Response } from "express";
import { IDealReturn } from "../dtos/IDeal";
import DealRepository from "../repositories/DealRepository";
import OrderBlingService from "../services/OrderBlingService";
import pipe from "../apis/pipeUrl";

const api_token = process.env.API_KEY_PIPE
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
        const checkDeal = await dealRepository.findByDealId(deal.id)

        if (checkDeal.length) {
          continue;
        }

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
          owner_name: deal.owner_name,
          person_name: deal.person_name,
          contact_email: deal.person_id && deal.person_id.email[0].value ,
          contact_phone: deal.person_id && deal.person_id.phone[0].value,
        })
      }
      
      return response.status(200).json({ok:true})
    } catch (err) {
      console.log(err)
      return response.status(200).json({ erro: 'Erro ao criar pedido'});
    }
  }
};