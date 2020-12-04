import { Request, Response } from "express";
import { IDeal, IDealReturn } from "../dtos/IDeal";
import OrderBlingService from "../services/OrderBlingService";
import pipe from "../apis/pipeUrl";
import moment from "moment";
import OrderRepository from "../repositories/OrderRepository";

const api_token = process.env.API_KEY_PIPE
const status = 'won'

const orderBlingService = new OrderBlingService();

export default class CreateOrderController {
  async create(request: Request, response: Response): Promise<Response> {
    const orderRepository = new OrderRepository();

    try {
      //get the deals from pipedrive
      const deals = await pipe.get(`/deals`, {
        params: {
          api_token,
          status,
        }
      }).then(response => {
        return response.data
      })

      let dates: string[] = [];
      let new_deals: IDeal[] = []

      let deal: IDealReturn
      for (deal of deals.data) {
        //check if the date is already saved in database
        const checkDate = await orderRepository.findByDate(moment(deal.won_time).format('YYYY-MM-DD'))

        if (checkDate) {
          //if is already in database, look for the deal
          const checkDeal = await orderRepository.findDeal(deal.id, moment(deal.won_time).format('YYYY-MM-DD'))

          if(checkDeal) {
            //if the deal is already saved, skip to the next interation
            continue;
          } else {
            //if is not, create the order on bling and insert the neal deal on deals array
            orderBlingService.execute(
              deal.org_name, 
              deal.cc_email,
              deal.id,
              deal.title,
              deal.value,
            )

            await orderRepository.update({
              deal_id: deal.id,
              title: deal.title,
              value: deal.value,
              org_name: deal.org_name,
              cc_email: deal.cc_email,
              owner_name: deal.owner_name,
              person_name: deal.person_name,
              won_time: deal.won_time,
              contact_email: deal.person_id && deal.person_id.email[0].value ,
              contact_phone: deal.person_id && deal.person_id.phone[0].value,
            }, 
              moment(deal.won_time).format('YYYY-MM-DD'),
            )
          }
        } else {
          //if the date is not saved, create the order on bling
          orderBlingService.execute(
            deal.org_name, 
            deal.cc_email,
            deal.id,
            deal.title,
            deal.value,
          )
          
          //check if the dates array already includes the won_time
          if(!dates.includes(moment(deal.won_time).format('YYYY-MM-DD'))) {
            dates.push(moment(deal.won_time).format('YYYY-MM-DD'));
          }
          
          new_deals.push({
            deal_id: deal.id,
            title: deal.title,
            value: deal.value,
            org_name: deal.org_name,
            cc_email: deal.cc_email,
            owner_name: deal.owner_name,
            person_name: deal.person_name,
            won_time: deal.won_time,
            contact_email: deal.person_id && deal.person_id.email[0].value ,
            contact_phone: deal.person_id && deal.person_id.phone[0].value,
          })
        }
      }

      for (const date of dates) {
        //return all deals for each date
        const final_deals = new_deals.filter((new_deal: IDeal) => date === moment(new_deal.won_time).format('YYYY-MM-DD'))

        let total_value = 0

        //calculate the total value
        final_deals.map((d: IDeal) => total_value += d.value);

        //save the order in the database
        await orderRepository.create({
          date,
          deals: final_deals,
          total: total_value
        })
      }
      
      return response.status(200).json({message: 'Dados inseridos com sucesso!'})
    } catch (err) {
      console.log(err)
      return response.status(200).json({ erro: 'Erro ao criar pedido'});
    }
  }
};