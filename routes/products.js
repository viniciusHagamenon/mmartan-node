const express = require('express')
const router = express.Router()

const Product = require('../models/Product')

/* GET products listing with search and pagination. */
router.get('/', function (req, res, next) {
  const search = req.query.search
  const page = req.query.page || 1
  const pageSize = req.query.pageSize || 10

  Promise.all([
    Product.query(function (qb) {
      if (search) {
        qb.where('name', 'like', '%' + search + '%')
      }
    }).count(),
    Product
      .query(function (qb) {
        if (search) {
          qb.where('name', 'like', '%' + search + '%')
        }

        qb.offset((page - 1) * pageSize).limit(pageSize)
      })
      .fetchAll({
        withRelated: ['images']
      })
  ])
  .then(function (result) {
    const count = result[0]
    const products = result[1]

    if (!products) {
      res.status(404).send('Products Not Found!')
    }

    res.send({
      count: count,
      data: products
    })
  })
  .catch(function (err) {
    res.status(400).send(err)
  })
})

router.get('/:id', function (req, res, next) {
  Product.where({ id: req.params.id })
    .fetch({
      withRelated: ['images']
    })
    .then(function (product) {
      if (!product) {
        res.status(404).send('Product Not Found!')
      }

      res.send(product)
    })
    .catch(function (err) {
      res.status(400).send(err)
    })
})

module.exports = router
