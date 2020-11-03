import path from 'path';

module.exports = {
    client: 'pg',
    connection: {
        database: "ipet",
        user:"postgres",
        password: "rx12345"
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true
}