"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("EventTickets", [
      // =======================================================
      // 1. Annual Tech Conference Tickets
      // =======================================================
      {
        eventticket_id: "41043979-5f1f-4378-9886-d21e626e4f40",
        event_id: "7399c126-69d2-4f14-804a-22c663d5d407",
        price: 25.0,
        quantity: 500,
        start_sale_date: new Date("2025-12-15 05:00:00"),
        end_sale_date: new Date("2025-12-30 23:59:59"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        eventticket_id: "3e49411b-2a4f-459a-abea-535e0a649067",
        event_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        price: 100.0,
        quantity: 50,
        start_sale_date: new Date("2025-12-15 05:00:00"),
        end_sale_date: new Date("2025-12-30 23:59:59"),
        created_at: new Date(),
        updated_at: new Date(),
      },

      // =======================================================
      // 2. Full-Stack Developer Workshop Tickets
      // =======================================================
      {
        eventticket_id: "9016e46a-ef22-4eba-a767-68d8367c86d8",
        event_id: "cd110769-3a7f-4fad-9461-d80e4342d950",
        price: 10.0,
        quantity: 30,
        start_sale_date: new Date("2025-12-15 05:00:00"),
        end_sale_date: new Date("2025-12-30 23:59:59"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        eventticket_id: "8e426b3b-597b-40d2-9735-830250a28222",
        event_id: "79c4a02d-5f8c-4793-9983-04b7ff123dda",
        price: 15.0,
        quantity: 20,
        start_sale_date: new Date("2025-12-15 05:00:00"),
        end_sale_date: new Date("2025-12-30 23:59:59"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        eventticket_id: "278de93c-31fc-4378-b9b2-c8474d196ff2",
        event_id: "cde50c11-c9db-4251-9b53-fa2f7bcae98a",
        price: 0.0,
        quantity: 100,
        start_sale_date: new Date("2025-12-15 05:00:00"),
        end_sale_date: new Date("2025-12-30 23:59:59"),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("EventTickets", null, {});
  },
};
