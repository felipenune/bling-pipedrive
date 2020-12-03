import { Request, Response } from "express";
import bling from "../services/blingUrl";

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

    const apikey = '1024c9e994ed53ca6ed4653f0ce58d6aeccdead7b1dd6c42592caf3ce5fee25d888c0b4e'

    const resp = await bling.post(`/pedido/json/`, null, {
      params: {
        apikey,
        xml: xmlData,
      }
    }).then(response => {return response.data})

    return resp
  }
}