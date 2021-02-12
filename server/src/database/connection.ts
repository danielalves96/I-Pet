import knex from 'knex';

const connection = knex({
    client: 'pg',
    connection: {
        host: 'ec2-34-230-167-186.compute-1.amazonaws.com',
        database: 'd6das4ja8icvqk',
        user: 'zxxmahthusdyfk',
        password: '82443ce9917d3366a90d75772b15200e2796a8bf4e43ce6f5544fe478d41b1fa',
        ssl: {
            rejectUnauthorized: false
          }
    },
    useNullAsDefault: true
})

export default connection;