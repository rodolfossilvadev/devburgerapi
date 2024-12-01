/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface) {
     // Remover ou comentar a linha abaixo
      await queryInterface.removeColumn('products', 'category');
   },
 
   async down(queryInterface, Sequelize) {
     await queryInterface.addColumn('products', 'category', {
       type: Sequelize.STRING,
       allowNull: true,
     });
   }
 };
 