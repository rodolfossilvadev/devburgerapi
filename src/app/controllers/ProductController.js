import * as Yup from 'yup';
import Products from '../models/products.js';
import Category from '../models/category.js';
import User from '../models/user.js';

class ProductController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean(),
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

        const { filename: path } = request.file;
        const { name, price, category_id, offer } = request.body;

        const product = await Products.create({
            name,
            price,
            category_id,
            path,
            offer,
        });

        return response.status(201).json(product);
    }

    async update(request, response) {
        const schema = Yup.object({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number(),
            offer: Yup.boolean(),
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (erro) {
            return response.status(400).json({ error: erro.errors });
        }

        const { admin: isAdmin } = await User.findByPk(request.userId);
        if (!isAdmin) {
            return response.status(401).json();
        }

        const { id } = request.params;
        const findProduct = await Products.findByPk(id);
        if (!findProduct) {
            return response.status(401).json({ error: 'Id do produto está incorreto' });
        }

        let path;
        if (request.file) {
            path = request.file.filename;
        } else {
            path = findProduct.path;
        }

        const { name, price, category_id, offer } = request.body;

        await Products.update({
            name: name || findProduct.name,
            price: price || findProduct.price,
            category_id: category_id || findProduct.category_id,
            path,
            offer: offer !== undefined ? offer : findProduct.offer,
        }, {
            where: {
                id,
            },
        });

        return response.status(200).json({ message: 'Produto atualizado com sucesso' });
    }

    async index(request, response) {
        const products = await Products.findAll({
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name'],
            }],
        });

        return response.json(products);
    }

    async delete(request, response) {
        const { admin: isAdmin } = await User.findByPk(request.userId);
        if (!isAdmin) {
            return response.status(401).json({ error: 'Acesso não autorizado' });
        }

        const { id } = request.params;

        const product = await Products.findByPk(id);
        if (!product) {
            return response.status(404).json({ error: 'Produto não encontrado' });
        }

        await Products.destroy({ where: { id } });

        return response.status(200).json({ message: 'Produto deletado com sucesso' });
    }
}

export default new ProductController();
