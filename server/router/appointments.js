
const router = require('express').Router()
const db = require('../db');

router.get('/', async (req, res, next) => {
    try {
        await db.initialize()
        const resp = await db.getAllFutureBook()
        await db.destroy()
        res.send(resp)
    } catch (e) {
        console.log(e)
    }
})  
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        await db.initialize()
        let resp = await db.getAppointmentInfo(id)
        // console.log(resp[0])
        await db.destroy()
        res.send(resp)
    } catch (e) {
        console.log(e)
    }
})
router.get('/pet/:id', async (req, res, next) => {
    try {
        const userId = req.params.id
        await db.initialize()
        let resp = await db.getAppointmentPet(userId)
        await db.destroy()
        res.send(resp)
    } catch (e) {
        console.log(e)
    }
})
router.post('/', async (req, res, next) => {
    const data = req.body

    try {
        await db.initialize()
        let resp = await db.bookAppointment(data)
        console.log(resp)
        await db.destroy()
        res.send(resp)

    } catch (e) {
        console.log(e)
    }
})

module.exports = router