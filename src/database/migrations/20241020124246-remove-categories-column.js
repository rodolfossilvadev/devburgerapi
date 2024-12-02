/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const tableDescription = await queryInterface.describeTable('Products');
    if (tableDescription.category) {
      await queryInterface.removeColumn('Products', 'category');
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'category', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
