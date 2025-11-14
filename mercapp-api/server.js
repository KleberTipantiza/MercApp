const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const productRoutes = require('./routes/products')
const categoryRoutes = require('./routes/categories')

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en http://localhost:${PORT}`)
})
