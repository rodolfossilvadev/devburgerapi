import * as Yup from 'yup';
import Category from '../models/category.js';
import User from '../models/user.js';

class CategoryController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
        });

        try {
            await schema.validateSync(request.body, { abortEarly: false });
        } catch (erro) {
            return response.status(400).json({ error: erro.errors });
        }

        const user = await User.findByPk(request.userId);
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        const { admin: isAdmin } = user;
        if (!isAdmin) {
            return response.status(401).json({ error: 'Unauthorized' });
        }

        const { filename: path } = request.file || {};
        if (!path) {
            return response.status(400).json({ error: 'File not provided' });
        }

        const { name } = request.body;

        const categoryExist = await Category.findOne({ where: { name } });
        if (categoryExist) {
            return response.status(400).json({ error: 'Categoria já existe' });
        }

        try {
            const { id } = await Category.create({ name, path });
            return response.status(201).json({ id, name, path });
        } catch (error) {
            console.error('Error creating category:', error);
            return response.status(500).json({ error: 'Internal server error' });
        }
    }

    async update(request, response) {
        const schema = Yup.object({
            name: Yup.string(),
        });

        try {
            await schema.validateSync(request.body, { abortEarly: false });
        } catch (erro) {
            return response.status(400).json({ error: erro.errors });
        }

        const user = await User.findByPk(request.userId);
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        const { admin: isAdmin } = user;
        if (!isAdmin) {
            return response.status(401).json({ error: 'Unauthorized' });
        }

        const { id } = request.params;
        const categoryExist = await Category.findByPk(id);
        if (!categoryExist) {
            return response.status(404).json({ message: 'Categoria não encontrada' });
        }

        const { name } = request.body;
        let path;
        if (request.file) {
            path = request.file.filename;
        }

        if (name) {
            const categoryNameExist = await Category.findOne({
                where: { name },
            });
            if (categoryNameExist && categoryNameExist.id !== +id) {
                return response.status(400).json({ error: 'Categoria já existe' });
            }
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (path) updateData.path = path;

        await Category.update(updateData, { where: { id } });
        return response.status(200).json({ message: 'Categoria atualizada com sucesso' });
    }

    async index(request, response) {
        const categories = await Category.findAll();
        return response.json(categories);
    }

    async delete(request, response) {
        const user = await User.findByPk(request.userId);
        if (!user) {
            return response.status(404).json({ error: 'Usuário não encontrado' });
        }

        const { admin: isAdmin } = user;
        if (!isAdmin) {
            return response.status(401).json({ error: 'Não autorizado' });
        }

        const { id } = request.params;

        const category = await Category.findByPk(id);
        if (!category) {
            return response.status(404).json({ error: 'Categoria não encontrada' });
        }

        await Category.destroy({ where: { id } });

        return response.status(200).json({ message: 'Categoria deletada com sucesso' });
    }
}

export default new CategoryController();
