/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const userInstrumentsData = [
      { userId: 1, instrumentId: 1 },
      { userId: 1, instrumentId: 5 },
      { userId: 2, instrumentId: 1 },
      { userId: 2, instrumentId: 2 },
      { userId: 2, instrumentId: 3 },
      { userId: 3, instrumentId: 8 },
      { userId: 3, instrumentId: 11 },
      { userId: 4, instrumentId: 14 },
      { userId: 4, instrumentId: 10 },
      { userId: 5, instrumentId: 3 },
      { userId: 5, instrumentId: 4 },
      { userId: 5, instrumentId: 1 },
      { userId: 6, instrumentId: 8 },
      { userId: 6, instrumentId: 12 },
      { userId: 7, instrumentId: 8 },
      { userId: 7, instrumentId: 19 },
      { userId: 7, instrumentId: 11 },
      { userId: 8, instrumentId: 3 },
      { userId: 8, instrumentId: 5 },
      { userId: 8, instrumentId: 13 },
      { userId: 9, instrumentId: 16 },
      { userId: 9, instrumentId: 17 },
      { userId: 10, instrumentId: 5 },
      { userId: 10, instrumentId: 6 },
      { userId: 11, instrumentId: 1 },
      { userId: 11, instrumentId: 12 },
      { userId: 12, instrumentId: 15 },
      { userId: 12, instrumentId: 18 },
      { userId: 13, instrumentId: 4 },
      { userId: 13, instrumentId: 10 },
      { userId: 14, instrumentId: 14 },
      { userId: 14, instrumentId: 1 },
      { userId: 14, instrumentId: 7 },
      { userId: 15, instrumentId: 9 },
      { userId: 15, instrumentId: 8 },
      { userId: 15, instrumentId: 16 },
      { userId: 16, instrumentId: 7 },
      { userId: 16, instrumentId: 14 },
      { userId: 16, instrumentId: 18 },
      { userId: 17, instrumentId: 19 },
      { userId: 17, instrumentId: 20 },
      { userId: 17, instrumentId: 5 },
    ];
    const userInstruments = userInstrumentsData.map((userInstrument) => ({
      ...userInstrument,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('UserInstruments', userInstruments);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('UserInstruments');
  },
};
