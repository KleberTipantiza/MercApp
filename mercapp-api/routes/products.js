const express = require('express')
const fs = require('fs')
const router = express.Router()

// Cargar datos desde el archivo JSON
const productsFile = './data/products.json'

// Get /api/products
router.get('/', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFile))
    res.json(products)
})

// Get /api/products/:id
router.get('/:id', (req, res) => {
    try {
        const products = JSON.parse(fs.readFileSync(productsFile))
        const product = products.find(p => p.id === parseInt(req.params.id))
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado'})
        }
        res.json(product)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error del servidor'})
    }
})

// POST /api/products
router.post('/', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsFile))
    const newProduct = req.body

    // Validación completa según estructura de products.json
    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.imageUrl ||
      !newProduct.categoryId ||
      newProduct.price <= 0 ||
      newProduct.stock < 0
    ) {
      return res.status(400).json({ message: 'Datos inválidos' })
    }

    newProduct.id = products.length ? products[products.length - 1].id + 1 : 1
    products.push(newProduct)
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2))

    res.status(201).json(newProduct)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al crear producto' })
  }
})


// Put /api/products/:id
router.put('/:id', (req, res) => {
    const products = JSON.parse(fs.readFileSync(productsFile))
    const index = products.findIndex(p => p.id === parseInt(req.params.id))
    if (index === -1) return res.status(404).json({ message: 'Producto no encontrado'})

    const updatedProduct = { ...products[index], ...req.body }
    products[index] = updatedProduct
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2))
    res.json(updatedProduct)
})

// Delete /api/products/:id
router.delete('/:id', (req, res) => {
    let products = JSON.parse(fs.readFileSync(productsFile))
    const index = products.findIndex(p => p.id === parseInt(req.params.id))
    if (index === -1) return res.status(404).json({ message: 'Producto no encontrado'})

    const deleted = products.splice(index, 1)
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2))
    res.json(deleted[0])
})

module.exports = router