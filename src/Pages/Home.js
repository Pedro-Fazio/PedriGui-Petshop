import React from 'react';
import Topbar from '../components/TopBar/TopBar';
import ProductsPage from '../components/ProductsPage/ProductsPage'
import Footer from '../components/Footer/Footer'

const HomePage = props => {
    return (
        <div className={"App"}>
            <Topbar />
            <ProductsPage />
            <Footer />
        </div>
    )
}

export default HomePage;

