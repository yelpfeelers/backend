
exports.up = (knex) => {
  return knex.schema.createTable('bookmarks', tbl => {
    tbl.increments();
    tbl.string('business_id');
    tbl.string('name');
    tbl.string('image_url');
    tbl.integer('rating').unsigned()
    // tbl.string('alias');
    // tbl.boolean('is_closed');
    // tbl.string('categories');
    // tbl.string('latitude');
    // tbl.string('longitude');
    // tbl.string('transactions');
    // tbl.string('price');
    // tbl.string('location');
    // tbl.string('display_phone');
    // tbl.string('my_rating');
    // {
    //   business_id: “ssJJPFuV6tTDgHYe2w9csQ”,
    //   image_url: “https://s3-media1.fl.yelpcd////n.com/bphoto/       nmtXm16znYiTmTIP5MQdBA/o.jpg,“,
    //   name: “slopy tacos”,
    //   rating: 0
    //   }
    // business_id, alias, image_url, is_closed, categories, rating , latitude, longtitude, transactions, price, location, display_phone
  })
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('bookmarks')
};
