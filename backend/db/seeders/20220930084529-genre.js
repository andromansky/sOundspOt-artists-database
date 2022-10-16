/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const genresData = [
      { genre: 'pop' },
      { genre: 'hip-hop' },
      { genre: 'rock' },
      { genre: 'country' },
      { genre: 'funk' },
      { genre: 'rap' },
      { genre: 'disco' },
      { genre: 'electro' },
      { genre: 'blues' },
      { genre: 'metal' },
      { genre: 'beat' },
      { genre: 'r&b' },
      { genre: 'alternative' },
      { genre: 'indie' },
      { genre: 'classical' },
      { genre: 'lo-fi' },
      { genre: 'grunge' },
      { genre: 'symphony' },
      { genre: 'chant' },
      { genre: 'techno' },
      { genre: 'jazz' },
      { genre: 'psychedelia' },
    ];
    const genres = genresData.map((genre) => ({
      ...genre,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Genres', genres);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Genres');
  },
};
