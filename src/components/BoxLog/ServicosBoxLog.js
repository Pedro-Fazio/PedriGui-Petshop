import React from 'react'
import './BoxLog.scss'
import api from '../Db/Db'
import { UserCtx } from '../context/UserCtx'


const generateList = array => array.map(row => generateItem(row))

const generateItem = array => (
    <>
        <div className="item item-1">{array[0]}</div>
        {array.slice(1).map(item => <div className="item" key={item}>{item}</div>)}
    </>
)

const generateBoxHeader = labels => labels.map(
    label => <div key={label}>{label}</div>
)

const BoxLog = ({ title, headerLabels, getData }) => {
    const [Services, setServices] = React.useState()
    const [isPopUpVisible, setIsPopUpVisible] = React.useState(false)
    const [popUpInputs, setPopUpInputs] = React.useState([])
    const [popUpType, setPopUpType] = React.useState()
    const [isDisabled, setIsDisabled] = React.useState(true)
    const { type } = React.useContext(UserCtx)

    const ID_LEN = 8
    const AddLayout = [
        ['Nome', ''],
        ['Preco', ''],
        ['Oferta', false, 'bool'],
        ['Descricao', ''],
    ]

    const EditLayout = [
        ['Código', ''],
        ...AddLayout
    ]

    const DeleteLayout = [
        ['Código', '']
    ]

    React.useEffect(_ => {
        if (!Array.isArray(Services))
            api.getServices().then(products => {
                setServices(products.filter(p => !p.deleted))
            })
    }, [Services])

    React.useEffect(_ => {
        // Edit Product
        if (Services)
            if (popUpInputs.length > 2 && popUpInputs[0][0] === 'Código' &&
                popUpInputs[0][1].length === ID_LEN) {
                if (isDisabled) {
                    let input = Array.from({ length: EditLayout.length }).fill('')
                    input[0] = popUpInputs[0][1]

                    for (let I of Services)
                        if (I._id.slice(0, ID_LEN) === popUpInputs[0][1]) {
                            input = [
                                I._id.slice(0, ID_LEN),
                                I.Nome,
                                I.Preco,
                                I.Oferta,
                                I.Descricao,
                            ]
                            break
                        }

                    let popUpIn = [...EditLayout]

                    setPopUpInputs(popUpIn.map((P, idx) => {
                        P[1] = input[idx]
                        return P
                    }))
                    setIsDisabled(false)
                }
            } else setIsDisabled(true)

    }, [popUpInputs])

    const ParseInventory = Services => Services.map(I => [
        I._id.slice(0, ID_LEN),
        I.Nome,
        I.Preco
    ])

    const handleClick = action => {
        switch (action) {
            case 'Edit':
                console.log('Edit', EditLayout)
                setPopUpInputs([...EditLayout])
                setPopUpType('Edit')
                break
            case 'Add':
                console.log('Add', AddLayout)
                setPopUpInputs([...AddLayout])
                setPopUpType('Add')
                break;
            case 'Delete':
                console.log('Delete', DeleteLayout)
                setPopUpInputs([...DeleteLayout])
                setPopUpType('Delete')
                break
            default:
                break
        }
        setIsPopUpVisible(!isPopUpVisible)
    }

    const handleAction = e => {
        switch (popUpType) {
            case 'Edit':
                try {
                    let { _id, ...Product } = Services.find(I => I._id.slice(0, ID_LEN) === popUpInputs[0][1])
                    let [id, ...inputParse] = popUpInputs
                    inputParse = inputParse.map(i => i[1])
                    inputParse[1] = parseFloat(inputParse[1])
                    let idx = 0
                    for (let i in Product) {
                        console.log(i, 'i')
                        Product[i] = inputParse[idx++]
                    }
                    Product = { _id, ...Product }
                    console.log(Product)
                    api.updateService(Product).then(e => {
                        setServices(undefined)
                        alert('Serviço atualizado com sucesso')
                    })
                    setIsPopUpVisible(false)
                } catch (e) {
                    alert('Código Inválido')
                }
                break
            case 'Add':
                try {
                    let { _id, ...Product } = Services[0]
                    let inputParse = [...popUpInputs]
                    console.log(_id, Product, inputParse)
                    inputParse = inputParse.map(i => {
                        let value = i[1]
                        if (value === '') throw new Error('Campo invalido')
                        return i[1]
                    })
                    inputParse[1] = parseFloat(inputParse[1])
                    if (!inputParse[1]) throw new Error('Campo invalido')
                    let idx = 0
                    for (let i in Product) {
                        console.log(i, 'i')
                        Product[i] = inputParse[idx++]
                    }
                    api.AddService(Product).then(e => {
                        setServices(undefined)
                        alert('Serviço adicionado com sucesso')
                    })
                    setIsPopUpVisible(false)
                } catch (e) {
                    alert('Formato invalido')
                }
                break;
            case 'Delete':
                try {
                    const { _id, } = Services.find(I => I._id.slice(0, ID_LEN) === popUpInputs[0][1])

                    api.deleteService(_id)
                        .then(e => {
                            setServices(undefined)
                            alert('Serviço deletado com sucesso')
                        })
                        .catch(e => {
                            alert('Tente novamente')
                        })
                    setIsPopUpVisible(false)
                } catch (e) {
                    alert('Código Inválido')
                }
                break
            default:
                break
        }

    }

    const showInputsPopUp = _ => popUpInputs.map((p, idx) => {
        const inputs = [...popUpInputs]
        return (
            <span key={p[0]}>
                <p>{p[0]}:</p>
                <input
                    value={p[1]}
                    onChange={e => {
                        inputs[idx][1] = p[2] ? e.target.checked : e.target.value
                        setPopUpInputs(inputs)
                    }}
                    disabled={inputs.length > 0 && idx && inputs[0][0] === 'Código' && isDisabled}
                    type={p[2] ? 'checkbox' : "text"}
                    checked={p[1]} />
            </span>
        )
    })


    return (
        <div className="box-info">
            <div className="box-container">
                <div className="box-header">
                    <h1>{title}</h1>
                </div>
                <div className="box-grid-container container-service">
                    <div className="box-grid grid-service"> {/* Grid */}
                        {generateBoxHeader(headerLabels)}
                        {Services ? generateList(ParseInventory(Services)) : 'Carregando...'}

                    </div>
                    {type === 'admin' &&
                        <div className="box-action">
                            <div className="inventory-actions">
                                <button id="buy-store" onClick={_ => handleClick('Edit')}>
                                    Editar serviço
                            </button>
                                <button id="buy-store" onClick={_ => handleClick('Add')}>
                                    Add serviço
                            </button>
                                <button id="buy-store" onClick={_ => handleClick('Delete')}>
                                    Deletar serviço
                            </button>

                            </div>
                        </div>
                    }

                    {isPopUpVisible &&
                        <div className="box-edit-popup">
                            {showInputsPopUp()}
                            <button onClick={handleAction}>Confirmar</button>
                        </div>
                    }

                </div>

            </div>
        </div>
    )
}

export default BoxLog