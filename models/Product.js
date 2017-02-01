const bookshelf = require('../bookshelf')

const Product = bookshelf.Model.extend({
  tableName: 'products',
  images: function () {
    return this.hasMany(Image)
  }
})

const Image = bookshelf.Model.extend({
  tableName: 'images',
  product: function () {
    return this.belongsTo(Product)
  }
})

module.exports = Product
