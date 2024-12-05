import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import Product from '../app/models/products';
import User from '../app/models/user';
import Category from '../app/models/category';


const models = [User, Product, Category];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize('postgresql://devburger_zqa5_user:gxbztxYUHm7nHwG5JLYOx5PaQDYUf54S@dpg-ct8eutm8ii6s73c9mqb0-a.oregon-postgres.render.com/devburger_zqa5');
        models
            .map((model) => model.init(this.connection))
            .map(
                (model) => model.associate && model.associate(this.connection.models),
            );
    }

    mongo() {
        this.mongoConnection = mongoose.connect(process.env.MONGO_URL);
    }
}

export default new Database();
