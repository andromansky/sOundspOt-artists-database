/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const userBandsData = [
      { userId: 1, bandId: 1, status: true },
      { userId: 2, bandId: 1, status: true },
      { userId: 3, bandId: 1, status: true },
      { userId: 4, bandId: 1, status: true },
      { userId: 7, bandId: 2, status: true },
      { userId: 8, bandId: 2, status: true },
      { userId: 9, bandId: 2, status: true },
      { userId: 10, bandId: 2, status: true },
      { userId: 11, bandId: 2, status: true },
      { userId: 13, bandId: 3, status: true },
      { userId: 14, bandId: 3, status: true },
      { userId: 15, bandId: 3, status: true },
      { userId: 16, bandId: 3, status: true },
    ];

    const userBands = userBandsData.map((userBand) => ({
      ...userBand,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('UserBands', userBands);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('UserBands');
  },
};
