const router = require('express').Router()
const db = require('../db');

router.post('/:id', async (req, res, next) => {
    try {
        const userId = req.params.id
        const { PetData } = req.body
        await db.initialize()
        const resp = await db.AddPet(PetData, userId)
        await db.destroy()
        res.send(resp)
    } catch (e) {
        console.log(e)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        res.send('fou')
        const userId = req.params.id
        const { PetName } = req.query
        await db.initialize()
        const resp = await db.RemovePet(PetName, userId)
        await db.destroy()
        res.send(resp)
    } catch (e) {
        console.log(e)
    }
})


module.exports = router