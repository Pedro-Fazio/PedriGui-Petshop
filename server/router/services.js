const router = require('express').Router()
const db = require('../db');

router.get('/', async (req, res, next) => {
    try {
        console.log('oi')
        await db.initialize()

        let resp = await db.getServices()
        console.log(resp)

        await db.destroy()
        res.send(resp)

    } catch (e) {
        console.log(e)
    }
})
router.post('/', async (req, res, next) => {
    try {
        const {data} = req.body
        await db.initialize()
        const resp = await db.AddService(data)
        await db.destroy()
        res.send(data)
    }catch(e) {
        console.log(e)
    }
})
router.post('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        const { Product } = req.body
        await db.initialize()
        let resp = await db.updateService(id, Product)
        await db.destroy()
        res.send(resp)
    } catch (e) {
        console.log(e)
    }
})
router.post('/delete/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        console.log(id)
        await db.initialize()
        const resp = await db.deleteService(id)
        console.log(resp)
        await db.destroy()
        res.send(resp)
    }catch(e) {
        console.log(e)
    }
})

module.exports = router