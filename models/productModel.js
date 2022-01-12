const fs = require('fs')
const products = require('../data/products.json')

const findProducts = () => {
  return products
}

const findProduct = (id) => {
  return products.find((product) => product.id === id)
}

const create = (product) => {
  console.log(product);
  const newProduct = {
    id: (Number(products.length) + 1).toString(),
    name: product.name,
    description: product.description,
    price: Number(product.price)
  }
  products.push(newProduct)
  fs.writeFile('./data/products.json', JSON.stringify(products, null, 4), err => {
    if (err) console.log(err);
  })
  return newProduct
}

const edit = (id, product) => {


  //cari index product
  let index = products.findIndex((p) => p.id === id)
  products[index] = {
    id: id,
    name: product.name,
    description: product.description,
    price: product.price
  }

  fs.writeFile('./data/products.json', JSON.stringify(products, null, 4), err => {
    if (err) console.log(err);
  })
  return products[index]
}

const deleteController = (id) => {


  //cari index product
  let productDeleted = products.filter((p) => p.id !== id)

  fs.writeFile('./data/products.json', JSON.stringify(productDeleted, null, 4), err => {
    if (err) console.log(err);
  })
}

module.exports = {
  findProducts,
  findProduct,
  create,
  edit,
  deleteController
}