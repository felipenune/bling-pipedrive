import { Request, Response } from "express";
import DealRepository from "../repositories/DealRepository";

export default class RetrieveDealController {
  async index(request: Request, response: Response): Promise<Response> {
    const dealRepository = new DealRepository();

    try {
      const deals = await dealRepository.listDeals();
      
      return response.status(200).json(deals);
    } catch (err) {
      console.log(err)
      return response.status(200).json({ erro: 'Erro retornar dados da collection'});
    }
  }
};