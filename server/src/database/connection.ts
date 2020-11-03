import knex from 'knex';

const connection = knex({
    client: 'pg',
    connection: {
        database: "ipet",
        user:"postgres",
        password: "rx12345"
    },
    useNullAsDefault: true
})

export default connection;