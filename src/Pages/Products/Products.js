import React from 'react';
import Topbar from '../../components/TopBar/TopBar';
import ProductMenu from '../../components/ProductMenu/ProductMenu'
import Footer from '../../components/Footer/Footer'
import queryString from 'query-string';
import './Products.scss'

const HomePage = props => {
    // const [] =  get url params
    const productQuery = queryString.parse(props.location.search,  { ignoreQueryPrefix: true })['product-q']

    return (
        <div className={"App"}>
            <Topbar />
            <ProductMenu title="Acessórios" search={productQuery} />
            <Footer />
        </div>
    )
}

export default HomePage;

