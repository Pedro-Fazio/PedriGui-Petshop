import React from 'react'
import './BoxLog.scss'
import api from '../../components/Db/Db'
import { UserCtx } from '../context/UserCtx'
import { ProductCtx } from '../context/ProductsCtx'

const BoxLog = ({ title, headerLabels }) => {
    const { Products, setProducts, clear, setProduct } = React.useContext(ProductCtx)
    const { userData } = React.useContext(UserCtx)

    React.useEffect(() => {
        const products = JSON.parse(localStorage.getItem('Products'))
        if (products)
            setProducts(products)
    }, [])

    const parseItems = items => items.map(item => {
        item['Qtd'] = 1
        return ([
            `${item.Estoque} unidades`,
            <div className="img cover" style={{backgroundImage: `url(${require('../../Images/produtos/' + item.Foto)})`}}></div>,
            item.Nome,
            item.Qtd,
            item.Preco,
        ])
    })

    const handleClick = _ => {
        if (Products.length > 0) {
            api.buyProducts(Products
                .map(p => ({ Date: new Date(), userId: userData._id, ...p })))
                .then(e => {
                    alert("Compra realizada com sucesso!")
                    clear()
                })
        }else {
            alert("Seu carrinho está vazio. Adicione mais produtos")
        }
    }

    const generateList = array => {
        if (array[0])
            return array.map((row, idx) => generateItem(row, idx))
    }
    const handleRemove = idx => {
        let arr = [...Products]
        arr.splice(idx, 1)
        if (arr.length === 0) clear()
        else setProduct(arr)
        localStorage.setItem('Products', JSON.stringify(arr))
    }
    const generateItem = (array, idx) => (
        <>
            <div className="item item-1" key={idx + array[0]}>
                <span className="item-x" onClick={_ => handleRemove(idx)}>x</span>
                {array[0]}
            </div>
            {array.slice(1).map(item => <div className="item" key={item}>{item}</div>)}
        </>
    )

    const generateBoxHeader = labels => labels.map(
        label => <div>{label}</div>
    )

    const calculatePrice = Products => {
        if (Products[0])
            return Products.reduce((acc, el) => acc + parseFloat(el.price), 0)
    }

    return (
        <div className="box-info">
            <div className="box-container">
                <div className="box-header">
                    <h1>{title}</h1>
                    <h3>Devido ao COVID limitamos as compras a 1 unidade</h3>
                </div>
                <div className="box-grid-container">
                    <div className="box-grid"> {/* Grid */}
                        {generateBoxHeader(headerLabels)}
                        {!Products.length[0] && generateList(parseItems(Products))}

                    </div>

                    <div className="box-action">
                        <h3>Preço estimado: R$ {calculatePrice(Products)}</h3>
                        <div className="buy-items">
                            <button id="buy-store" onClick={handleClick}>
                                Comprar
                            </button>

                        </div>
                    </div>

                </div>

            </div>
            <div id="teste">
            </div>

        </div>
    )
}

export default BoxLog