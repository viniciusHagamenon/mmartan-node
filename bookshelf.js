const knexConfigs = require('./knexfile')
const knex = require('knex')(knexConfigs.development)

module.exports = require('bookshelf')(knex)
