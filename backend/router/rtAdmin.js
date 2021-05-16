const express = require('express')
const rtAdmin = express.Router()
const adminController = require('../controllers/adminController')
const orderController = require('../controllers/orderController')
const productController = require('../controllers/productController')
const clientController = require('../controllers/clientController')
const { checkUser, requireAuth } = require('../helpers/validation')


// Check user authentication
rtAdmin.get('*', checkUser)

// Login routes
rtAdmin.get('/', adminController.login)
rtAdmin.post('/', adminController.signin)
rtAdmin.get('/logout', adminController.logout)

// Client routes
rtAdmin.get('/clientes', requireAuth, clientController.clientsList)
rtAdmin.get('/clientes/:id', requireAuth, clientController.clientsFindById)
rtAdmin.put('/clientes/:id', requireAuth, clientController.clientsUpdate)
rtAdmin.get('/clientes/pedidos/historial/:id', requireAuth, clientController.clientOrders)
rtAdmin.get('/clientes/pedidos/confirmados/:id', requireAuth, clientController.clientConfirmedOrders)

// Product routes
rtAdmin.get('/productos', requireAuth, productController.productsList)
rtAdmin.post('/productos', requireAuth, productController.productsSave)
rtAdmin.delete('/productos/:id', requireAuth, productController.productsDelete)
rtAdmin.get('/productos/:id', requireAuth, productController.productsFindById)
rtAdmin.delete('/:img', requireAuth, productController.imagesDelete)
rtAdmin.put('/productos/:id', requireAuth, productController.productsUpdate)

// Order routes
rtAdmin.get('/pedidos', requireAuth, orderController.showOrders)
rtAdmin.delete('/pedidos/:id', requireAuth, orderController.deleteOrders)
rtAdmin.get('/pedidos/:id', requireAuth, orderController.showOrderDetail)
rtAdmin.delete('/borrado/:id', requireAuth, orderController.deleteProduct)
rtAdmin.put('/pedidos/:id', orderController.updateOrder)

module.exports= rtAdmin