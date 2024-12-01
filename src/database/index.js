import Sequelize from "sequelize";
import mongoose from "mongoose";

import configDatabase from "../config/database.js";

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
        this.connection = new Sequelize(configDatabase);
        models.map(model => model.init(this.connection))
            .map(
                model => model.associate && model.associate(this.connection.models),
            );
    }
    mongo() {
        this.mongoConnection = mongoose.connect(
            process.env.MONGO_URL
        );
    }
}

export default new Database();