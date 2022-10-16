/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const bandGenresData = [
      { bandId: 1, genreId: 1 },
      { bandId: 1, genreId: 3 },
      { bandId: 1, genreId: 11 },
      { bandId: 1, genreId: 22 },
      { bandId: 2, genreId: 1 },
      { bandId: 2, genreId: 3 },
      { bandId: 3, genreId: 1 },
      { bandId: 3, genreId: 14 },
      { bandId: 4, genreId: 10 },
      { bandId: 4, genreId: 3 },
      { bandId: 5, genreId: 4 },
      { bandId: 5, genreId: 1 },
      { bandId: 5, genreId: 8 },
      { bandId: 5, genreId: 8 },
    ];
    const bandGenres = bandGenresData.map((bandGenre) => ({
      ...bandGenre,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('BandGenres', bandGenres);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('BandGenres');
  },
};
