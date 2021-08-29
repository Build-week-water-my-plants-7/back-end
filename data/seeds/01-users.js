
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "test", phone_number: "1234567890", password: "1234" },
        {
          id: 2,
          username: "Chris",
          phone_number: "2517067845",
          password: "1234",
        },
        {
          id: 3,
          username: "Stephanie",
          phone_number: "8974545364",
          password: "1234",
        },
        {
          id: 4,
          username: "Stephen",
          phone_number: "6453749070",
          password: "1234",
        },
      ]);
    });
};