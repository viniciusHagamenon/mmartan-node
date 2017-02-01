
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', function (table) {
      table.increments('id').primary()
      table.string('name')
      table.text('description')
      table.string('category')
      table.string('size')
      table.float('price')
      table.float('discountPrice')
      table.timestamps()
    }).createTable('images', function (table) {
      table.increments('id').primary()
      table.string('image')
      table.integer('product_id').references('products.id')
      table.timestamps()
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('products')
      .dropTable('images')
  ])
}
