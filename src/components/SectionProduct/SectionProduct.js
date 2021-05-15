import React from 'react';
import './SectionProduct.scss';
// import logo from '../../Images/logo.png'
// get our fontawesome imports
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ProductsLeftMenu from '../ProductsLeftMenu/ProductsLeftMenu'

const SectionProduct = props => {
    const { sessionTitle, cards } = props

    const generateCards = cardsArray => {
        return cardsArray.map((card, i) => {
            let img = require(`../../Images/produtos/${card.img}`)
            return (
                <div className="card-product" key={card + i}
                    style={{ backgroundImage: `url(${img})` }}>
                    <div className="card-product-title">
                        <h1>{card.title}</h1>
                    </div>

                    <div className="product-subtitle">
                        {card.content}
                    </div>

                </div>
            )
        })
    }
    return (
        <section className="product-category">
            <h1 className="category-title">{sessionTitle}</h1>
            <div className="cards-wrapper">
                {generateCards(cards)}
            </div>
        </section>
    );
}

export default SectionProduct;
