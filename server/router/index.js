const router = require('express').Router()
const Products = require('./products')
const Services = require('./services')
const Appointments = require('./appointments')
const Auth = require('./auth')
const Pets = require('./Pets')

router.get('/', (req, res, next) => {
    res.send({ PetGui: 'Sucesso, bem vindo à melhor petshop do BRASIL!' })
})

router.use('/auth', Auth)
router.use('/products', Products)
router.use('/services', Services)
router.use('/appointments', Appointments)
router.use('/pets', Pets)

module.exports = router