import { Request, Response } from "express";
import bling from "../apis/blingUrl";

var js2xmlparser = require('js2xmlparser')

export default class OrderBlingService {
  public async execute(
    name: string,
    email: string,
    id: number,
    deal: string,
    value: number,
  ): Promise<Object> {

    const order = {
      cliente: {
        nome: name,
        tipoPessoa: 'J',
        email: email,
      },
      itens: [
        {
          item: {
              codigo: id,
              descricao: deal,
              un: 'un',
              qtde: 1,
              vlr_unit: value,
          },
        },
      ]
    };
    
    const xmlData = encodeURIComponent(js2xmlparser.parse('pedido', order, { declaration: { encoding: 'UTF-8' } }))

    const apikey = process.env.API_KEY_BLING

    const resp = await bling.post(`/pedido/json/`, null, {
      params: {
        apikey,
        xml: xmlData,
      }
    }).then(response => {return response.data})

    return resp
  }
}