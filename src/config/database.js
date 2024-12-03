module.exports = {
    dialect: 'postgres',
    url: 'postgresql://postgres:postgres@devburger-postgres:5432/devburger',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
