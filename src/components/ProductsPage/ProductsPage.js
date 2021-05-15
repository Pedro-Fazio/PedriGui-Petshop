import React from 'react';
import './ProductsPage.scss';
// get our fontawesome imports
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ProductsLeftMenu from '../ProductsLeftMenu/ProductsLeftMenu'
import SectionProduct from '../SectionProduct/SectionProduct'
import SectionBrands from '../SectionBrands/SectionBrands'
import Promotions from '../Promotions/Promotions'
import Atendimento from '../Atendimento/Atendimento'
import Equipe from '../Equipe/Equipe'
import api from '../../components/Db/Db'

const ProductsPage = () => {
    const [sessions, setSessions] = React.useState(null)

    const cards = Array.from(
        { length: 7 },
        () => ({
            title: "Carregando...",
            content: "",
            img: 'dog-food.svg'
        })
    )
    const sessionsContent = [{
        sessionTitle: "Ofertas para cachorro",
        cards
    },
    {
        sessionTitle: "Produtos mais vendidos",
        cards
    }]

    React.useEffect(_ => {
        if (sessions == null)
            api.getProductsHighlights().then(e => {
                console.log(e)
                setSessions(e)
            })
    })

    const generateProductsSession = _ => sessions.map(
        s => {
            const sessionData = {
                sessionTitle: s.Titulo,
                cards: s.Produtos.map(p => {
                    return ({
                        title: p.Nome,
                        content: p.Tags[0],
                        img: p.Foto
                    })
                })
            }

            return <SectionProduct {...sessionData} key={s.Titulo} />
        })


    return (
        <div className="Product-container">
            {/* <ProductsLeftMenu /> */}
            <Promotions />
            <div className="section-wrapper">
                <SectionBrands title="Principais marcas" />
                {sessions && generateProductsSession()}
                {!sessions && <>
                    <SectionProduct {...sessionsContent[0]} />
                    <SectionProduct {...sessionsContent[1]} /> </>}


            </div>
            <Atendimento />
            <Equipe title="Equipe" />
        </div>
    );
}

export default ProductsPage;
