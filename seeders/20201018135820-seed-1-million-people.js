"use strict";

const faker = require("faker");
const { default: ShortUniqueId } = require("short-unique-id");
const uuid = new ShortUniqueId();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const totalBatch = 2500;
    const itemPerBatch = 400;

    for (const batch of Array(totalBatch).keys()) {
      const items = Array(itemPerBatch)
        .fill(0)
        .map((item) => ({
          email: `${uuid()}@${uuid()}.com`,
          profile_picture: `https://${uuid()}.com/${uuid()}.jpg`,
          first_name: faker.name.firstName(),
          middle_name: Math.random() < 0.5 ? null : faker.name.firstName(),
          last_name: faker.name.lastName(),
          age: Math.random() < 0.25 ? null : Math.round(Math.random() * 100),
          is_verified: Math.random() < 0.5 ? true : false,
          is_suspended: Math.random() < 0.5 ? true : false,
          passwordHash: `${uuid()}${uuid()}${uuid()}${uuid()}${uuid()}`,
          address: JSON.stringify({
            street_address:
              Math.random() < 0.15 ? null : faker.address.streetAddress(),
            zip_code: Math.random() < 0.15 ? null : faker.address.zipCode(),
            country: Math.random() < 0.15 ? null : faker.address.country(),
            city: Math.random() < 0.15 ? null : faker.address.city(),
          }),
          created_at: faker.date.past(),
          updated_at: faker.date.recent(),
        }));

      await queryInterface.bulkInsert("People", items, {});

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
    await queryInterface.bulkDelete("People", null, {});
  },
};
