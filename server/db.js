const assert = require('assert');
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID
let client;
let db;
const Crypto = require('./Crypto');

const initialize = async _ => {
    const uri = "mongodb+srv://petshop:admim@cluster0-il6hs.mongodb.net/petshop?retryWrites=true&w=majority";

    client = await MongoClient.connect(uri, { useUnifiedTopology: true });

    db = client.db('petshop')
}

const destroy = async _ => {
    client.close();
}

const signIn = async (email, password) => {
    const user = await db.collection('users').findOne({ Email: email })

    if (Crypto.Compare(password, user.Senha))
        return user
    else throw new Error('Invalid password')
}

const signUpClient = async (userData) => {
    const pass = await Crypto.Encrypt(userData.Senha)
    userData.Senha = pass
    return db.collection('users').insertOne({ type: 'user', ...userData })
}

const signUpAdmin = async (adminData) => {
    const pass = await Crypto.Encrypt(adminData.Senha)
    adminData.Senha = pass
    return db.collection('veterinarios').insertOne({ type: 'admin', ...adminData })
}

const getShopBoughtById = async id => db.collection('compras').find(
    { Cliente: new ObjectID(id) })
    .toArray()

const getProductsById = async id => db.collection('produtos').find({
    _id: {
        "$in": id
    }
}).toArray()

const getCartById = async (userID) => {
    const HistoryCart = await getShopBoughtById(userID)

    const productsId = HistoryCart.map(e => e.Produto)

    const productsBought = await getProductsById(productsId)

    return productsBought.map(p => {
        const shopping = HistoryCart
            .filter(H => JSON.stringify(H.Produto) === JSON.stringify(p._id))
            .map(s => ({ Qtd: s.Quantidade, Price: s.PrecoUnitario, Date: s.Date, key: s._id }))

        return ({
            ...p,
            history: shopping
        })
    })
}

const getProducts = async _ => {
    return db.collection('produtos').find({}).toArray()
}

const getServices = async _ => {
    return db.collection('servicos').find({}).toArray()
}

const AddProduct = async data => {
    return db.collection('produtos').insertOne(data)
}

const AddService = async data => {
    return db.collection('servicos').insertOne(data)
}


const updateProduct = async (_id, data) => {
    return db.collection('produtos').updateOne(
        { _id: new ObjectID(_id) },
        {
            $set: data
        }
    )
}

const updateService = async (_id, data) => {
    return db.collection('servicos').updateOne(
        { _id: new ObjectID(_id) },
        {
            $set: data
        }
    )
}

const deleteProduct = async _id => {
    return db.collection('produtos').updateOne(
        { _id: new ObjectID(_id) },
        {
            $set: {
                deleted: true
            }
        }
    )
}

const deleteService = async _id => {
    return db.collection('servicos').updateOne(
        { _id: new ObjectID(_id) },
        {
            $set: {
                deleted: true
            }
        }
    )
}

const getProductsHighlights = async _ => {
    return db.collection('ofertas').aggregate([{
        "$lookup": {
            from: 'produtos',
            localField: 'Produtos',
            foreignField: '_id',
            as: 'Produtos'
        }
    }]).toArray()
}

const getPromotions = async _ => {
    return db.collection('destaques').find({}).toArray()
}

const getAppointmentInfo = Id => {
    return db.collection('consultas').aggregate([
        {
            $match: { _id: new ObjectID(Id) }
        },
        {
            "$lookup": {
                from: 'users',
                localField: 'Cliente',
                foreignField: '_id',
                as: 'Cliente'
            }
        },
        {
            "$lookup": {
                from: 'veterinarios',
                localField: 'Veterinario',
                foreignField: '_id',
                as: 'Veterinario'
            }
        },
        {
            $project: {
                Cliente: {
                    Senha: 0,
                },
                Veterinario: {
                    Senha: 0
                }
            }
        }
    ]).toArray()
}

const getAppointmentPet = async Id => {
    const resp = await db.collection('users').aggregate([
        {
            $match: { _id: new ObjectID(Id) }
        },
        {
            "$lookup": {
                from: 'consultas',
                localField: 'Animais.Nome',
                foreignField: 'Animal',
                as: 'consultas'
            }
        },
        {
            $project: {
                consultas: 1
            }
        },
        {
            $limit: 1
        }
    ]).next()

    const NearestDateByPet = {}
    let len = 0

    //Set nearest Date by Pet
    resp.consultas.forEach(a => {
        let Nearest = new Date(a.Data)
        let diff = new Date().getTime() - Nearest.getTime()
        if (diff > 0) return // Pass date
        if (!(a.Animal in NearestDateByPet)) {
            NearestDateByPet[a.Animal] = a
            len++
        } else {
            Nearest = new Date(NearestDateByPet[a.Animal].Data)
            diff = new Date(a.Data).getTime() - Nearest.getTime()
            if (diff < 0)
                NearestDateByPet[a.Animal] = a
        }
    })

    NearestDateByPet['len'] = len

    return NearestDateByPet
}
const getAllFutureBook = async _ => {
    return db.collection('consultas').find({
        Data: {
            $gte: new Date()
        }
    }).toArray()
}

const bookAppointment = async ({ ClientData, PetData }) => {
    return db.collection('consultas').insertOne({
        Cliente: new ObjectID(ClientData.id),
        Veterinario: new ObjectID('5ed960d4caaf62cc4627eb7c'),
        Animal: PetData.petName,
        Data: new Date(ClientData.Date),
        Descricao: PetData.reason
    })
}

const AddPurchase = async Products => {
    const data = Products.map(product => ({
        Cliente: new ObjectID(product.userId),
        Produto: new ObjectID(product._id),
        Quantidade: 1,
        PrecoUnitario: product.Preco,
        Date: new Date(product.Date)
    }))

    return db.collection('compras').insertMany(data)
}

const AddPet = async (PetData, id) => {
    const { name, tipo, date, porte } = PetData
    const data = {
        Nome: name,
        Nascimento: new Date(date),
        Especie: tipo,
        Porte: porte,
        Situacao: ''
    }
    return db.collection('users').updateOne(
        { _id: new ObjectID(id) },
        {
            $push: {
                Animais: data
            }
        }
    )
}

const RemovePet = async (PetName, _id) => {
    return db.collection('users').updateOne(
        { _id: new ObjectID(_id) },
        {
            $pull: {
                Animais: {
                    Nome: PetName
                }
            }
        }
    )
}

module.exports = {
    initialize,
    signIn,
    signUpClient,
    signUpAdmin,
    getCartById,
    getProducts,
    getServices,
    AddProduct,
    AddService,
    AddPet,
    RemovePet,
    updateProduct,
    updateService,
    deleteProduct,
    deleteService,
    getProductsHighlights,
    getAppointmentInfo,
    getAppointmentPet,
    bookAppointment,
    getPromotions,
    getAllFutureBook,
    AddPurchase,
    destroy,
}


/*
Usuário: Nome, email, senha, telefone, CPF, animais
animais: Nome, idade, especie, situação_animal
situação animal: registro_pet[]
consultas: dia, animal, dono, vet
*/