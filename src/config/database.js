module.exports = {
    dialect: 'postgres',
    url: 'postgresql://postgres_devburger_user:afGvzL6N5fNSPHU6a13t0TZ5ZCLpl66A@dpg-ct734jaj1k6c73b2p6e0-a.oregon-postgres.render.com/postgres_devburger',
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
