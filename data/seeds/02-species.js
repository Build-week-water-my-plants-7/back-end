
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex("species").then(function () {
      // Inserts seed entries
      return knex("species").insert([
        {
          species_name: "Flagellariaceae",
        },
        {
          species_name: "Saururaceae",
        },
        {
          species_name: "Phytolaccaceae",
        },
        {
          species_name: "Vivianiaceae",
        },
        {
          species_name: "Hydrangeaceae",
        },
      ]);
    });
  };