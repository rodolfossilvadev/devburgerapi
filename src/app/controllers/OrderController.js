import * as Yup from 'yup';
import Order from '../schemas/Order.js';
import Products from '../models/products.js';
import Category from '../models/category.js';
import User from '../models/user.js';

class OrderController {
    async store(request, response) {
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                }),
            ),
        });

        try {
            await schema.validateSync(request.body, { abortEarly: false });
        } catch (erro) {
            return response.status(400).json({ error: erro.errors });
        }

        const { products } = request.body;

        const productsId = products.map((product) => product.id);
        const findProducts = await Products.findAll({
            where: {
                id: productsId,
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name'],
                },
            ],
        });

        const formattedProducts = findProducts.map(product => {
            const productIndex = products.findIndex(item => item.id === product.id);

            const newProduct = {
                id: product.id,
                name: product.name,
                category: product.category.name,
                price: product.price,
                url: product.url,
                quantity: products[productIndex].quantity,
            };

            return newProduct;
        });

        const order = {
            user: {
                id: request.userId,
                name: request.userName,
            },
            products: formattedProducts,
            status: 'Pedido realizado',
        };

        const createdOrder = await Order.create(order);

        return response.status(201).json(createdOrder);
    }

    async index(request, response) {
        const orders = await Order.find();

        return response.json(orders)
    }

    async update(request, response) {
        const schema = Yup.object({
            status: Yup.string().required(),
        });

        try {
            await schema.validateSync(request.body, { abortEarly: false });
        } catch (erro) {
            return response.status(400).json({ error: erro.errors });
        }

        const { admin: isAdmin } = await User.findByPk(request.userId);
        if (!isAdmin) {
            return response.status(401).json();
        }


        const { id } = request.params;
        const { status } = request.body;

        try {
            await Order.updateOne({ _id: id }, { status });
        } catch (erro) {
            return response.status(400).json({ error: erro.message });
        }

        return response.json({ message: 'Status alterado com sucesso' });
    }
}

export default new OrderController();
