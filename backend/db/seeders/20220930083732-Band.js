/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const bandsData = [
      {
        createrId: 1,
        name: 'The Beatles',
        about: 'The Beatles were an English rock band, formed in Liverpool in 1960, that comprised John Lennon, Paul McCartney, George Harrison and Ringo Starr.',
        photo: 'https://cdn.theculturetrip.com/wp-content/uploads/2016/03/roger-flickr1-1024x768.jpg',
      },
      {
        createrId: 7,
        name: 'One Direction',
        about: 'English-Irish pop boy band formed in London, England in 2010',
        photo: 'https://avatars.yandex.net/get-music-content/63210/afa460b3.p.588481/m1000x1000',
      },
      {
        createrId: 13,
        name: 'The Kooks',
        about: 'English pop-rock band formed in 2004 in Brighton.',
        photo: 'https://i.pinimg.com/originals/26/ac/2d/26ac2d280a5bb4a5ded46c07d5fb92f7.jpg',
      },
      {
        createrId: 16,
        name: 'Metallica',
        about: 'American heavy metal band',
        photo: 'https://www.ghostcultmag.com/wp-content/uploads/Metallica-2018-by-Ross-Halfin-ghostcultmag.jpg',
      },
      {
        createrId: 17,
        name: 'The Band Perry',
        about: 'American band composed of siblings Kimberly Perry (lead vocals, guitar), Reid Perry (bass guitar, background vocals), and Neil Perry (mandolin, bouzouki, background vocals).',
        photo: 'https://townsquare.media/site/204/files/2014/11/The-Band-Perry.jpg?w=980&q=75',
      },
    ];
    const bands = bandsData.map((band) => ({
      ...band,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Bands', bands);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Bands');
  },
};
