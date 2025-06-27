'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Remove a constraint antiga
    await queryInterface.removeConstraint('comentario', 'comentario_flow_id_fkey');

    // Adiciona a nova com ON DELETE CASCADE
    await queryInterface.addConstraint('comentario', {
      fields: ['flow_id'],
      type: 'foreign key',
      name: 'comentario_flow_id_fkey', // mesmo nome da original
      references: {
        table: 'flow',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
async down(queryInterface) {
    // Reverte a alteração, removendo a nova constraint
    await queryInterface.removeConstraint('comentario', 'comentario_flow_id_fkey');

    // E adiciona de volta como era antes (sem cascade)
    await queryInterface.addConstraint('comentario', {
      fields: ['flow_id'],
      type: 'foreign key',
      name: 'comentario_flow_id_fkey',
      references: {
        table: 'flow',
        field: 'id',
      },
      onDelete: 'RESTRICT', // ou omitir, que equivale a NO ACTION
      onUpdate: 'CASCADE',
    });
  }
};
