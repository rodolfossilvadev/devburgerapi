import Sequelize from "sequelize";
import mongoose from "mongoose";

import User from "../app/models/user.js";
import Products from "../app/models/products.js";
import Category from "../app/models/category.js";

const models = [User, Products, Category];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize('postgresql://postgres_devburger_user:afGvzL6N5fNSPHU6a13t0TZ5ZCLpl66A@dpg-ct734jaj1k6c73b2p6e0-a.oregon-postgres.render.com/postgres_devburger', {
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        });

        models.map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }

    mongo() {
        this.mongoConnection = mongoose.connect(process.env.MONGO_URL);
    }
}

export default new Database();
