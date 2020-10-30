import { Seeder } from "knex"

import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('items').insert([
        { title: 'Clínicas', image: 'clinic.svg'},
        { title: 'Pet Shop', image: 'shop.svg'},
        { title: 'Hotel PET', image: 'hostel.svg'},
        { title: 'Lojas', image: 'store.svg'},
        { title: 'ONGs', image: 'ong.svg'},
        { title: 'Pontos de adoção', image: 'adoption.svg'},
    ])

}