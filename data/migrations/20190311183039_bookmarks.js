
exports.up = (knex) => {
  return knex.schema.createTable('bookmarks', tbl => {
    tbl.increments();
    tbl.string('business_id');
    tbl.string('alias');
    tbl.string('image_url');
    tbl.boolean('is_closed');
    tbl.string('categories');
    tbl.integer('rating').unsigned()
    tbl.integer('latitude');
    tbl.integer('longitude');
    tbl.string('transactions');
    tbl.string('price');
    tbl.string('location');
    tbl.string('display_phone');

    // business_id, alias, image_url, is_closed, categories, rating , latitude, longtitude, transactions, price, location, display_phone
  })
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('bookmarks')
};
