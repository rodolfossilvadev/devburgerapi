import express from 'express';
import routes from './routes.js';
import { resolve } from 'node:path';
import cors from 'cors';
import './database';

const corsOption = {
    origin: 'https://joyful-cat-76ad2f.netlify.app',
    credentials: true,
};

class App {
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors(corsOption));
        this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')));
        this.app.use('/category-file', express.static(resolve(__dirname, '..', 'uploads')));
    }

    routes() {
        this.app.use(routes);
    }
}

export default new App().app;