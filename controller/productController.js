const productModel = require('../models/productModel')


const getProducts = (req, res) => {
  const products = productModel.findProducts()
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(products))
}

const getProduct = (req, res, id) => {
  const product = productModel.findProduct(id)

  if (!product) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: "Product Not Found" }))
  } else {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(product))
  }
}

const createProduct = (req, res) => {
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })
  req.on('end', () => {
    // console.log(body);
    const productInput = JSON.parse(body)
    const newProduct = productModel.create(productInput)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(newProduct))
  })
}

const editProduct = (req, res, id) => {
  const product = productModel.findProduct(id)

  if (!product) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: "Product Not Found" }))
  } else {

    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })
    req.on('end', () => {
      // console.log(body);
      const productInput = JSON.parse(body)
      const productEdited = productModel.edit(id, productInput)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(productEdited))
    })
  }
}

const deleteProduct = (req, res, id) => {
  const product = productModel.findProduct(id)

  if (!product) {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: "Product Not Found" }))
  } else {
    productModel.deleteController(id)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: "Product Deleted Successfully" }))
  }
}



module.exports = {
  getProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
}