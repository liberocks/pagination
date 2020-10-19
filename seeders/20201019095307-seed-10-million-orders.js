"use strict";

const faker = require("faker");
const { default: ShortUniqueId } = require("short-unique-id");
const uuid = new ShortUniqueId();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const totalBatch = 25000;
    const itemPerBatch = 400;

    for (const batch of Array(totalBatch).keys()) {
      const items = Array(itemPerBatch)
        .fill(0)
        .map((item) => {
          const people_id = Math.round(Math.random() * 1000000);
          const amount = Math.random() * 1000000;

          return {
            order_number: `${uuid()}${uuid()}`,
            description: Math.random() < 0.15 ? null : faker.lorem.sentence(),
            total_amount: amount,
            total_amount_after_vat: amount * 1.1,
            item_name: faker.commerce.productName(),
            item_count: Math.round(Math.random() * 25),
            people_id: people_id === 0 ? 1 : people_id,
            created_at: faker.date.past(),
            updated_at: faker.date.recent(),
          };
        });

      await queryInterface.bulkInsert("Orders", items, {});

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
    await queryInterface.bulkDelete("Orders", null, {});
  },
};
