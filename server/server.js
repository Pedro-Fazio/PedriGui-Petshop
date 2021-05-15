const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router/index')

const server = async () => {
    const app = express()
    const PORT = 8080

    app.use((req, res, next) => { // tirar cors
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header(
            'Access-Control-Allow-Headers',
            'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
        );
        if (req.method === 'OPTIONS') {
            res.send();
        } else {
            next();
        }
    });

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })    

    app.use('/', router)
}

server()