const router = require('express').Router()
const db = require('../db');

router.get('/login', async (req, res, next) => {
    const { email, password } = req.query;
    try {
        await db.initialize()
        let user = await db.signIn(email, password)
        let msg = user == null ? { erro: 'Usuário não encontrado' } : user
        console.log(user)
        await db.destroy()
        res.send(msg)
    } catch (e) {
        console.log(e)
        res.status(404).send(e.message)
    }
})

router.post('/add-user/user', async (req, res, next) => {
    const { name, email, CPF, date, phone, pass } = req.body

    try {
        await db.initialize()

        await db.signUpClient({
            Nome: name,
            Email: email,
            Nascimento: new Date(date),
            Foto: 'marcos.jpg',
            Senha: pass,
            Telefone: phone,
            CPF,
            Animais: []
        })

        res.send('Usuário adicionado com sucesso')

        await db.destroy()
    } catch (e) {
        console.log(e)
        res.status(404).send(e.message)
    }
})

router.post('/add-user/admin', async (req, res, next) => {
    const { name, email, pass } = req.body
    try {
        await db.initialize()

        const resp = await db.signUpAdmin({
            Nome: name,
            Email: email,
            Senha: pass
        })
        await db.destroy()
        res.send('Veterinário adicionado com sucesso')

    } catch (e) {
        res.status(404)
        console.log(e)
    }
})

module.exports = router