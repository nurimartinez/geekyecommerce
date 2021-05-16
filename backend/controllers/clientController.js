const User = require('../models/User')
const Order = require('../models/Order')

// Show the clients list
const clientsList = async (req, res) => {

  let clients = await User.find({ admin : false }).lean()
  res.render('clients', { title: 'Admin | Clientes', src: 'clients.js', css: 'styles', clients })

}

// Show the client's specific details
const clientsFindById = (req, res) => {

  User.findById(req.params.id).lean()
    .then(client => res.render('client', { client, title: 'Admin | Cliente', css: 'styles' }))
    .catch(err => res.json(err.message))

}

// Update the client's information
const clientsUpdate = async (req, res) => {

  const { id, firstname, lastname, email, active } = req.body

  await User.findByIdAndUpdate({_id : id}, { firstname, lastname, email, active })
  User.findById(id).lean()
    .then(client => res.render('client', { 
        client, 
        title: 'Admin | Clientes',
        css: 'styles',
        message: 'Cliente actualizado correctamente'}))
    .catch(err => console.log(err.message))

}

// Show the client's confirmed orders
const clientConfirmedOrders = async (req, res) => {

  let id = req.params.id
  const orders = await Order.find({userId:id, state:"confirmado"}).lean()
  res.render('confirmedorders', { orders, title: 'Admin | Pedidos confirmados', css: 'styles' })

}

// Show the client's orders history
const clientOrders = async (req, res) => {

  let id = req.params.id
  const orders = await Order.find({ userId: id }).lean()
  res.render('clientorders', { orders, title: 'Admin | Historial de pedidos', css: 'styles', src: 'clientOrders.js' })

}

module.exports = {
  clientsList,
  clientsFindById,
  clientsUpdate,
  clientOrders,
  clientConfirmedOrders
}