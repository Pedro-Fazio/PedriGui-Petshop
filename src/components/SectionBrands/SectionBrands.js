import React from 'react'
import './SectionBrands.scss'

const Marcas = [
    'hills.png',
    'whiskas.png',
    'pedigree.png',
    'petfit.png',
    'absolute-bites.png'
]

const Brands = _ => {
    return (
        <div id="image">
            {Marcas.map((brand, j) => <img className="brand-img" key={j} src={require(`../../Images/Marcas/${brand}`)} alt="" />)}
        </div>
    )
}

const SectionBrand = ({ title }) => {

    return (
        <div className="brands-container">
            <div className="brands-wrapper">
                <h1 className="category-title">{title}</h1>
                <div className="all-brands">
                    <Brands />
                </div>
            </div>
        </div>
    )
}


export default SectionBrand;

