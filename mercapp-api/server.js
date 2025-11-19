const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const productRoutes = require('./routes/products')
const categoryRoutes = require('./routes/categories')

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

// Middleware de registro simple (para propósitos de depuración)
app.use((req, res, next) => {
  console.log('Petición recibida:', req.method, req.url)
  next()
})


app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en http://localhost:3000, iniciar tambien el front-end para probar la aplicación`)
})
