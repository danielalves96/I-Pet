import knex from '../database/connection';
import { Request, Response } from 'express';
import hostUrl  from '../contants'

class ItemsController {
    async index (request: Request, response: Response) {
        const items = await knex('items').select('*');
    
        const serializedItems = items.map(item =>{
            return {
                id: item.id,
                title: item.title,
                image_url: `${hostUrl}:3333/items/${item.image}`
            }
        })
        response.json(serializedItems);
    }
}

export default ItemsController;