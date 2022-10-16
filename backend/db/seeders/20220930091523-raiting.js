/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const raitingsData = [
      { userSourceId: 1, userTargetId: 2, rating: 6 },
      { userSourceId: 1, userTargetId: 3, rating: 7 },
      { userSourceId: 1, userTargetId: 4, rating: 5 },
      { userSourceId: 1, userTargetId: 5, rating: 6 },
      { userSourceId: 2, userTargetId: 1, rating: 4 },
      { userSourceId: 2, userTargetId: 3, rating: 3 },
      { userSourceId: 2, userTargetId: 4, rating: 5 },
      { userSourceId: 3, userTargetId: 2, rating: 5 },
      { userSourceId: 3, userTargetId: 1, rating: 7 },
      { userSourceId: 4, userTargetId: 5, rating: 5 },
      { userSourceId: 4, userTargetId: 2, rating: 6 },
      { userSourceId: 5, userTargetId: 3, rating: 7 },
      { userSourceId: 5, userTargetId: 4, rating: 4 },
      { userSourceId: 6, userTargetId: 1, rating: 3 },
      { userSourceId: 6, userTargetId: 4, rating: 7 },
      { userSourceId: 7, userTargetId: 2, rating: 6 },
      { userSourceId: 7, userTargetId: 9, rating: 7 },
      { userSourceId: 8, userTargetId: 9, rating: 7 },
      { userSourceId: 9, userTargetId: 6, rating: 6 },
      { userSourceId: 10, userTargetId: 3, rating: 7 },
      { userSourceId: 11, userTargetId: 10, rating: 6 },
      { userSourceId: 11, userTargetId: 12, rating: 7 },
      { userSourceId: 12, userTargetId: 16, rating: 5 },
      { userSourceId: 13, userTargetId: 15, rating: 6 },
      { userSourceId: 12, userTargetId: 10, rating: 4 },
      { userSourceId: 12, userTargetId: 13, rating: 3 },
      { userSourceId: 14, userTargetId: 9, rating: 5 },
      { userSourceId: 16, userTargetId: 4, rating: 5 },
      { userSourceId: 16, userTargetId: 17, rating: 7 },
      { userSourceId: 14, userTargetId: 12, rating: 5 },
      { userSourceId: 17, userTargetId: 7, rating: 6 },
      { userSourceId: 17, userTargetId: 14, rating: 7 },
      { userSourceId: 15, userTargetId: 14, rating: 4 },
      { userSourceId: 14, userTargetId: 13, rating: 3 },
      { userSourceId: 16, userTargetId: 7, rating: 7 },
      { userSourceId: 7, userTargetId: 9, rating: 6 },
      { userSourceId: 7, userTargetId: 13, rating: 7 },
      { userSourceId: 8, userTargetId: 11, rating: 7 },
      { userSourceId: 9, userTargetId: 10, rating: 6 },
      { userSourceId: 10, userTargetId: 7, rating: 7 },
    ];

    const ratings = raitingsData.map((rating) => ({
      ...rating,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Ratings', ratings);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Ratings');
  },
};
