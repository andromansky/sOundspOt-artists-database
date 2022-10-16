/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const spotsData = [
      {
        name: 'Neon Sound - Recording Studio',
        latitude: 46.474600,
        longitude: 30.737038,
        description: 'Looking for theatrical rehearsal space, a fully equipped casting studio, a shoot location or a great spot to host an event? RWS Studios is designed to make your rehearsal, meeting, shoot or commercial project a seamless experience. From extended ceiling heights to overnight rentals, the RWS Studios staff has made every effort to ensure your needs are exceeded.',
        address: 'Bazarnaya ulitsa, d.82',
        contact: 't.me/neonSound',
      },
      {
        name: 'Best Rehearsal Studios Near Me in New York, NY',
        latitude: 46.482613,
        longitude: 30.742497,
        description: 'Neon Sound is a Recording and Rehearsal studio that services musicians in all genres which include: Hip-Hop, Rap, Pop, Trap, Orchestra, Country, Rock, Punk, Scores, Jazz, Blues, Podcasting and much more. ',
        address: 'Grecheskaya ulitsa, d.18',
        contact: 't.me/BRSNM_NY',
      },
      {
        name: 'OPEN JAR STUDIOS',
        latitude: 46.482490,
        longitude: 30.747335,
        description: 'OPEN JAR STUDIOS is home to the largest rehearsal studios, making it the ideal location for rehearsals, auditions, classes and support offices for theatre, dance, and film productions of all sizes.',
        address: 'Yuriya Oleshy str., 5A',
        contact: 't.me/OpenJar',
      },
      {
        name: 'The Drama League Studio Lab',
        latitude: 46.469039,
        longitude: 30.750681,
        description: 'The Stewart F. Lane and Bonnie Comley Studio Lab is a private creative space open for rehearsals, classes, readings, workshops, private events, and more. Conveniently located inside The Drama League Theater Center in Tribeca, less than two blocks from seven major subway lines, the Studio Lab offers unparalleled quiet and privacy for your creative imagination.',
        address: 'Panteleymonovskaya str., 14',
        contact: 't.me/dramalab',
      },
      {
        name: 'New 42 Studios',
        latitude: 46.471567,
        longitude: 30.739549,
        description: 'A professional rehearsal facility with clean, beautiful, column-free studios, we have a successful history of renting our spaces for professional rehearsals, readings, work sessions, invited presentations, auditions and filming for a variety of theater, dance, opera and music groups. ',
        address: 'Rishelyevskaya str., 59',
        contact: 't.me/42Studios',
      },
      {
        name: 'Sunlight Studios',
        latitude: 46.453120,
        longitude: 30.756870,
        description: 'Sunlight Studios is a series of spaces for. Our state-of-the-art facility offers eight studios of various sizes and features, which can be rented by the hour, day, week or more for rehearsals, readings, fitness classes, events, you name it.',
        address: 'Shampanskyi lane, 2',
        contact: 't.me/SunlightSound',
      },
      {
        name: 'Shetler',
        latitude: 46.431025,
        longitude: 30.745593,
        description: 'Shetler Studios sits and contains a multitude of studio spaces "that support projects from audition to rehearsal to performance." You can book a space to rehearse seven days a week. Their rates start at just $10 an hour and apply 9AM-12PM and 9PM to 11PM.',
        address: 'Ivana Franko str., 36',
        contact: 't.me/SoundShelter',
      },
    ];

    const spots = spotsData.map((spotData) => ({
      ...spotData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Spots', spots);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Spots');
  },
};
