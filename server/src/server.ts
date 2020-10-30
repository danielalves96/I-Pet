import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    console.log('Listagem true');

    response.json([
        'Diego',
        "dracula"
    ]);
});

app.listen(3333);