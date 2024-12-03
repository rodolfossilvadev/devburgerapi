import express from 'express';
import routes from './routes.js';
import { resolve } from 'node:path';
import cors from 'cors';

import './database';

class App {
    constructor() {
        this.app = express();

        this.app.use(cors({
            origin: 'https://joyful-cat-76ad2f.netlify.app',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());

        this.app.use(
            '/product-file',
            express.static(resolve(__dirname, '..', 'uploads'))
        );
        this.app.use(
            '/category-file',
            express.static(resolve(__dirname, '..', 'uploads'))
        );
    }

    routes() {
        this.app.use(routes);
    }
}

export default new App().app;
