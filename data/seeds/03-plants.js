exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("plants")
    .del()
    .then(function () {
    // Inserts seed entries
    return knex("plants").insert([
      {
        id: 1,
        nickname: "Blue Sage",
        species: "Salvia farinacea",
        h2o_frequency: "1 week",
        image: "testurl",
      },
      {
        id: 2,
        nickname: "Garden Lily",
        species: "Lilium",
        h2o_frequency: "1 week",
        image: "testurl",
      },
      {
        id: 3,
        nickname: "Lavender",
        species: "Lavendula angustifolia",
        h2o_frequency: "3 days",
        image: "testurl",
      },
      {
        id: 4,
        nickname: "Petunia",
        species: "Petunia x hybrida",
        h2o_frequency: "1 week",
        image: "testurl",
      },
      {
        id: 5,
        nickname: "Sunflower",
        species: "Helianthus annuus",
        h2o_frequency: "1 week",
        image: "testurl",
      },
      {
        id: 6,
        nickname: "Daylily",
        species: "Hemerocallis hybrids",
        h2o_frequency: "4 days",
        image: "testurl",
      },
      {
        id: 7,
        nickname: "Lilac",
        species: "Syringa vulgaris",
        h2o_frequency: "4 days",
        image: "image",
      },
      {
        id: 8,
        nickname: "French Marigold",
        species: "Tagetes patula",
        h2o_frequency: "1 week",
        image: "testurl",
      },
      {
        id: 9,
        nickname: "Peony",
        species: "Paeonia Iactiflora",
        h2o_frequency: "2 weeks",
        image: "testurl",
      },
      {
        id: 10,
        nickname: "Siberian Iris",
        species: "Iris sibirica",
        h2o_frequency: "1 week",
        image: "testurl",
      },
    ]);
  });
};
