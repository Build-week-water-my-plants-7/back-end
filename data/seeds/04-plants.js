exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("plants").then(function () {
    // Inserts seed entries
    return knex("plants").insert([
      {
        nickname: "Lizard tails",
        frequency: 1,
        time: "9:00pm",
        date: "2021-08-22",
        creator_id: 1,
        species_id: 2,
        interval_id: 2,
        image: "image",
        watered: 0,
      },
      {
        nickname: "Flagellaria",
        frequency: 1,
        time: "9:00pm",
        date: "2021-08-22",
        creator_id: 1,
        species_id: 1,
        image: "image",
        watered: 0,
        interval_id: 3,
      },
      {
        nickname: "Pokeweed",
        frequency: 1,
        time: "9:00pm",
        date: "2021-08-22",
        creator_id: 2,
        species_id: 3,
        image: "image",
        watered: 0,
        interval_id: 2,
      },
      {
        nickname: "Viviania",
        frequency: 3,
        time: "9:00pm",
        date: "2021-08-22",
        creator_id: 3,
        species_id: 4,
        image: "image",
        watered: 0,
        interval_id: 2,
      },
      {
        nickname: "Hydrangea",
        frequency: 5,
        time: "9:00pm",
        date: "2021-08-22",
        creator_id: 3,
        species_id: 5,
        image: "image",
        watered: 0,
        interval_id: 1,
      },
    ]);
  });
};
