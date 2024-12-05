import express from 'express';
import routes from './routes.js';
import { resolve } from 'node:path';
import cors from 'cors';

import './database';

const corsOptions = {
    origin: 'https://joyful-cat-76ad2f.netlify.app',
    credentials: true,
};

class App {
    constructor() {
        this.app = express();

        this.app.use(cors(corsOptions));
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());

        this.app.use(
            '/product-file',
            (req, res, next) => {
                console.log('Requisição de produto:', req.path);
                next();
            },
            express.static(resolve(__dirname, '..', 'uploads', 'products'))
        );

        this.app.use(
            '/category-file',
            (req, res, next) => {
                console.log('Requisição de categoria:', req.path);
                next();
            },
            express.static(resolve(__dirname, '..', 'uploads', 'categories'))
        );
    }

    routes() {
        this.app.use(routes);
    }
}

export default new App().app;
