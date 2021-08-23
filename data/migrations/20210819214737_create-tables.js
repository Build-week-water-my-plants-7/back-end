
exports.up = async function(knex) {
    await knex.schema
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 200).notNullable();
      users.string("password", 200).notNullable();
      users.string("phoneNumber").notNullable().unique();
      users.timestamps(true, true);
    })
    .createTable("species", (species) => {
      species.increments("species_id");
      species.string("species_name");
    })
    .createTable("intervals", (interval) => {
      interval.increments("interval_id");
      interval.string("interval_type_name");
    })
    .createTable("plants", (plants) => {
      plants.increments("plant_id");
      plants.string("nickname").notNullable().unique();
      plants.integer("frequency").notNullable();
      plants.string("time");
      plants.string("date").notNullable();
      plants.string("image");
      plants.boolean("watered").notNullable();
      plants
        .integer("creator_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      plants
        .integer("species_id")
        .unsigned()
        .notNullable()
        .references("species_id")
        .inTable("species")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      plants
        .integer("interval_id")
        .unsigned()
        .notNullable()
        .references("interval_id")
        .inTable("intervals")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      plants.timestamps(true, true);
    });
};

exports.down = async function(knex) {
    await knex.schema
    .dropTableIfExists("plants")
    .dropTableIfExists("intervals")
    .dropTableIfExists("species")
    .dropTableIfExists("users");
};
