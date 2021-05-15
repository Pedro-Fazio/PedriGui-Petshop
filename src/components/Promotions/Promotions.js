import React from 'react'
import './Promotions.scss'
import Hammer from "react-hammerjs"
import { useState } from 'react'
import api from '../Db/Db'

const Promotions = props => {
    const initialDegree = 2
    const rotateInc = 32
    const carrouselLen = 3
    const [cards, setCards] = useState()
    const [maxSwipes, setMaxSwipes] = useState()
    const [rotationGrid, setRotationGrid] = useState(initialDegree) // degree rotate
    const [selectedGrid, setSelectedGrid] = useState(1) // Element at center

    React.useEffect(() => {
        api.getPromotions().then(p => {
            const cards = p.map(
                p => ({
                    title: p.Titulo,
                    message: p.Conteudo,
                    price: p.Subtitulo,
                    btn: 'Comprar',
                    link: '/produtos?product-q=',
                    img: p.Imagem
                }))
            setCards(cards)
            setMaxSwipes(cards.length - carrouselLen - 1)
        })
    }, [])


    const RotateLeft = _ => {
        if (rotationGrid < -initialDegree) {
            setRotationGrid(rotationGrid + rotateInc)
            setSelectedGrid(selectedGrid - 1)
        }
    }

    const RotateRight = _ => {
        if (rotationGrid > -(rotateInc * maxSwipes)) {
            setRotationGrid(rotationGrid - rotateInc)
            setSelectedGrid(selectedGrid + 1)
        }
    }
    return (
        <div className="Promotions-container">
            <div className="Promotions-wrapper">
                <h1>Promoções</h1>
                <div className="Promotions-cards-container">
                    <div className="Promotions-cards-wrapper">
                        <i className="material-icons seta-parc" style={{ fontSize: '200%' }}
                            onClick={RotateLeft}
                        >keyboard_arrow_left</i>
                        <div className="carrousel-box">
                            <Hammer
                                onSwipeRight={RotateLeft} onSwipeLeft={RotateRight} >
                                {/* 32% rotaion */}
                                <div className="promotions-carrousel" style={{ transform: `translateX(${rotationGrid}%` }}>
                                    {cards && generateCards(cards, selectedGrid)}
                                </div>
                            </Hammer>
                        </div>

                        <i
                            className="material-icons seta-parc"
                            style={{ fontSize: '200%' }}
                            onClick={RotateRight}
                        >keyboard_arrow_right</i>
                    </div>
                </div>
            </div>

        </div>
    )
}

const generateCards = (cards, selectedGrid) => cards.map(
    (card, i) => (
        <div className="p-card" key={card + i} style={i === selectedGrid ? { height: '350px' } : {}}>
            <div className="p-card-wrap">
                <h3 className="p-card-title">{card.title}</h3>
                <div className="p-card-content">
                    <div className="img" style={{backgroundImage: `url(${require('../../Images/produtos/' + card.img)})`}}></div>
                    <p>{card.message}</p>
                    <p>{card.price}</p>
                </div>
                <a className="p-card-link" href={card.link}>{card.btn}</a>
            </div>
        </div>
    )
)

export default Promotions