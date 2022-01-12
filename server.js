const http = require('http')
const productController = require('./controller/productController')

const server = http.createServer((req, res) => {
  // dapatkan semua product
  if (req.url === "/api/products" && req.method === "GET") {
    productController.getProducts(req, res)
    // dapatkan satu product
  } else if (req.url.match(/\/api\/product\/\w+/) && req.method === "GET") { // /api/product/1
    const id = req.url.split('/')[3] // [ '', 'api', 'products', '1' ]
    productController.getProduct(req, res, id)

    // create product
  } else if (req.url === "/api/products" && req.method === "POST") { // /api/product/1
    productController.createProduct(req, res)

    // edit product
  } else if (req.url.match(/\/api\/product\/\w+/) && req.method === "PUT") { // /api/product/1
    const id = req.url.split('/')[3] // [ '', 'api', 'products', '1' ]
    productController.editProduct(req, res, id)

    // delete product
  } else if (req.url.match(/\/api\/product\/\w+/) && req.method === "DELETE") { // /api/product/1
    const id = req.url.split('/')[3] // [ '', 'api', 'products', '1' ]
    productController.deleteProduct(req, res, id)
    // if route not match to anything
  } else {
    res.writeHead(404, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ message: "Route Not Found" }))
  }

})

const PORT = 5000
server.listen(PORT, () => {
  console.log("Server is running at port " + PORT)
})

