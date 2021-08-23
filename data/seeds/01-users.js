
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { user_id: 1, username: "test", phoneNumber: "1234567890", password: "1234" },
        {
          user_id: 2,
          username: "Chris",
          phoneNumber: "2517067845",
          password: "1234",
        },
        {
          user_id: 3,
          username: "Stephanie",
          phoneNumber: "8974545364",
          password: "1234",
        },
        {
          user_id: 4,
          username: "Stephen",
          phoneNumber: "6453749070",
          password: "1234",
        },
      ]);
    });
};