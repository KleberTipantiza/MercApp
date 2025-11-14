const express = require('express')
const fs = require('fs')
const router = express.Router()

const categoriesFile = './data/categories.json'

// Get /api/categories
router.get('/', (req, res) => {
    const categories = JSON.parse(fs.readFileSync(categoriesFile))
    res.json(categories)
})

module.exports = router