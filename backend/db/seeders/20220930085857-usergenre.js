/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const userGenresData = [
      { userId: 1, genreId: 1 },
      { userId: 1, genreId: 3 },
      { userId: 2, genreId: 1 },
      { userId: 2, genreId: 3 },
      { userId: 2, genreId: 8 },
      { userId: 2, genreId: 15 },
      { userId: 3, genreId: 1 },
      { userId: 3, genreId: 3 },
      { userId: 4, genreId: 1 },
      { userId: 4, genreId: 3 },
      { userId: 4, genreId: 15 },
      { userId: 5, genreId: 2 },
      { userId: 5, genreId: 6 },
      { userId: 6, genreId: 6 },
      { userId: 6, genreId: 2 },
      { userId: 6, genreId: 16 },
      { userId: 7, genreId: 1 },
      { userId: 7, genreId: 3 },
      { userId: 8, genreId: 1 },
      { userId: 8, genreId: 12 },
      { userId: 9, genreId: 1 },
      { userId: 9, genreId: 13 },
      { userId: 10, genreId: 1 },
      { userId: 10, genreId: 3 },
      { userId: 10, genreId: 14 },
      { userId: 12, genreId: 2 },
      { userId: 12, genreId: 6 },
      { userId: 13, genreId: 13 },
      { userId: 13, genreId: 14 },
      { userId: 17, genreId: 1 },
      { userId: 17, genreId: 4 },

    ];

    const userGenres = userGenresData.map((userGenre) => ({
      ...userGenre,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('UserGenres', userGenres);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('UserGenres');
  },
};
