module.exports = {
    dialect: 'postgres',
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    username: 'postgres',
    password: 'postgres',
    database: 'devburger',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
