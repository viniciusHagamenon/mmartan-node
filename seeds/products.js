const productsSeed = require('../seeds_base/products_seed')
const imagesSeed = require('../seeds_base/images_seed')

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('products').del(),
    knex('images').del()
  ])
  .then(function () {
    return Promise.all([
      // Inserts seed entries
      knex('products').insert(productsSeed),
      knex('images').insert(imagesSeed)
    ])
  })
}
