const router = require('express').Router()
const db = require('../db');

router.get('/', async (req, res, next) => {
    try {
        console.log('oi')
        await db.initialize()

        let resp = await db.getProducts()
        console.log(resp)

        await db.destroy()
        res.send(resp)

    } catch (e) {
        console.log(e)
    }
})
router.get('/promotions', async (req, res, next) => {
    try {
        await db.initialize()
        let resp = await db.getPromotions()
        console.log(resp)
        await db.destroy()
        res.send(resp)
    } catch (e) {
        console.log(e)
    }
})
router.get('/highlights', async (req, res, next) => {
    try {
        await db.initialize()
        let resp = await db.getProductsHighlights()
        console.log(resp)
        await db.destroy()
        res.send(resp)
    } catch (e) {
        console.log(e)
    }
})
router.get('/:id', async (req, res, next) => {
    try {
        console.log('chamou', req.params.id)
        await db.initialize()
        let resp = await db.getCartById(req.params.id)

        res.send(resp)
        await db.destroy()
    } catch (e) {
        console.log(e)
    }
})
router.post('/', async (req, res, next) => {
    try {
        const { data } = req.body
        await db.initialize()
        const resp = await db.AddProduct(data)
        await db.destroy()
        res.send(data)
    } catch (e) {
        console.log(e)
    }
})
router.post('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const { Product } = req.body
        await db.initialize()
        let resp = await db.updateProduct(id, Product)
        await db.destroy()
        res.send(resp)
    } catch (e) {
        console.log(e)
    }
})
router.post('/buy', async (req, res, next) => {
    const data = req.body
    try {
        await db.initialize()
        const resp = await db.AddPurchase(data)
        await db.destroy()
        res.send(resp)
    } catch (e) {
        console.log(e)
        res.status(404)
    }
})
router.post('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        await db.initialize()
        const resp = await db.deleteProduct(id)
        console.log(resp)
        await db.destroy()
        res.send(resp)
    } catch (e) {
        console.log(e)
    }
})

module.exports = router