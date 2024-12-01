import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer.js'
import authMiddlewares from './app/middlewares/auth.js';

import UserController from './app/controllers/UserController.js';
import SessionControllers from './app/controllers/SessionControllers.js';
import ProductController from './app/controllers/ProductController.js';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';
import CreatePaymentIntentController from './app/controllers/stripe/CreatePaymentIntentController.js';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionControllers.store);

routes.use(authMiddlewares);

routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);
routes.put('/products/:id', upload.single('file'), ProductController.update);
routes.delete('/products/:id', ProductController.delete);


routes.post('/categories', upload.single('file'), CategoryController.store);
routes.get('/categories', CategoryController.index);
routes.put('/categories/:id', upload.single('file'), CategoryController.update);
routes.delete('/categories/:id', CategoryController.delete);


routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

routes.post("/create-payment-intent", CreatePaymentIntentController.store)

export default routes;
