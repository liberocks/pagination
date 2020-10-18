"use strict";

const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const totalBatch = 400000;
    const itemPerBatch = 250;

    for (const batch of Array(totalBatch).keys()) {
      const items = Array(itemPerBatch)
        .fill(0)
        .map((item) => ({
          email: faker.internet.email(),
          profile_picture: faker.image.people(),
          first_name: faker.name.firstName(),
          middle_name: Math.random() < 0.5 ? null : faker.name.firstName(),
          last_name: faker.name.lastName(),
          age: Math.random() < 0.25 ? null : Math.round(Math.random() * 100),
          is_verified: Math.random() < 0.5 ? true : false,
          is_suspended: Math.random() < 0.5 ? true : false,
          passwordHash: faker.internet.password(),
          address: JSON.stringify({
            street_address: faker.address.streetAddress(),
            zip_code: faker.address.zipCode(),
            country: faker.address.country(),
            city: faker.address.city(),
          }),
          ip_addresses: JSON.stringify({
            list: Array(Math.round(1 + Math.random() * 10))
              .fill(0)
              .map((item) => faker.internet.ip()),
          }),
          created_at: faker.date.past(),
          updated_at: faker.date.recent(),
        }));

      await queryInterface.bulkInsert("people", items, {});

      if (batch % 100 === 0) {
        console.log(
          `Seeding ${(
            (100 * ((batch + 1) * itemPerBatch)) /
            (totalBatch * itemPerBatch)
          ).toFixed(2)}% (${(batch + 1) * itemPerBatch}/${
            totalBatch * itemPerBatch
          })`
        );
      }
    }
    console.log("Finish seeding");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("people", null, {});
  },
};
