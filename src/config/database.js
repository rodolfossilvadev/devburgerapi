module.exports = {
    dialect: 'postgres',
    url: 'postgresql://devburger_2ovt_user:qklOcY71IgJQUlvKFHfvmNIW7T7FHpCF@dpg-ct8f81d6l47c739klma0-a.oregon-postgres.render.com/devburger_2ovt',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
};