import React from 'react';
import './ProductMenu.scss';
import Dropdown from '../Dropdown/Dropdown'
import api from '../Db/Db'
import { ProductCtx } from '../context/ProductsCtx'
// get our fontawesome imports

const ProductsPage = ({ title, search }) => {
    const [cardsBack, setCardsBack] = React.useState(null)
    const [cardsFilter, setCardsFilter] = React.useState(cardsBack)

    React.useEffect(() => {
        api.getProducts().then(res => {
            const Products = res.map(res => ({
                ...res,
                name: res.Nome,
                price: res.Preco,
                link: '#',
                Foto: res.Foto,
            }))
            const filter = Products.filter(p => p.Nome.includes(search))
            setCardsBack(Products)
            setCardsFilter(filter.length > 0 ? filter : Products)
        }).catch(e => console.log(e))
    }, [])

    const handleFilterDropdown = item => {
        const filter = item.filter([...cardsBack])
        setCardsFilter(filter)
    }

    const handleInputChange = search => {
        if (cardsBack !== null) {
            const filter = cardsBack.filter(p => p.Nome.includes(search))
            setCardsFilter(filter.length > 0 ? filter : cardsBack)
        }
    }

    return (
        <div className="Products-container">
            <h1 className="Products-title">{title}</h1>
            <SearchProduct onFilterChange={handleFilterDropdown} onInputChange={handleInputChange} />
            <ProductsGrid cards={cardsFilter} />
        </div>
    );
}

const HandleFilters = {
    HighPrice: price => {
        return price.sort((a, b) => b.price - a.price)
    },
    LowPrice: price => {
        return price.sort((a, b) => a.price - b.price)
    },
    Relevance: relevance => {
        return relevance.sort((a, b) => a.Estoque - b.Estoque)
    },
    Promotion: promotion => {
        return promotion.filter(p => p.Oferta)
    },
    Shipping: shipping => {
        return shipping.sort((a, b) => (a.FreteGratis === b.FreteGratis) ? 0 : a.FreteGratis ? -1 : 1)
    },
    None: arr => arr
}

const options = [
    {
        id: 0,
        title: 'Maior preço',
        selected: false,
        key: 'price',
        filter: HandleFilters.HighPrice
    },
    {
        id: 1,
        title: 'Menor Preço',
        selected: false,
        key: 'entrega',
        filter: HandleFilters.LowPrice
    },
    {
        id: 2,
        title: 'Relevância',
        selected: false,
        key: 'frete',
        filter: HandleFilters.Relevance
    },
    {
        id: 3,
        title: 'Promoção',
        selected: false,
        key: 'disponibilidade',
        filter: HandleFilters.Promotion
    },
    {
        id: 4,
        title: 'Frete',
        selected: false,
        key: 'location',
        filter: HandleFilters.Shipping
    }
]


const SearchProduct = ({ onFilterChange, onInputChange }) => {
    const [filterOptions, setFilterOptions] = React.useState(options)
    const [selectedId, setSelectedId] = React.useState(-1)
    const [listOpen, setListOpen] = React.useState(false)
    const [selectedOption, setSelectedOption] = React.useState({ title: 'Nenhum filtro' })
    const [search, setSearch] = React.useState('')

    const updateSelected = (item, id) => {
        setSelectedOption(item)
        if (id !== -1) onFilterChange(item)
        else onFilterChange({ filter: HandleFilters.None })
        setSelectedId(id)
    }

    const toggleSelected = (id) => {
        let temp = filterOptions

        // Uncheck current selected
        if (selectedId !== -1) temp[selectedId].selected = false

        // Remove current
        if (selectedId === id) {
            updateSelected({ title: 'Nenhum filtro' }, -1)
        } else { // check new filter
            temp[id].selected = true
            updateSelected(temp[id], id)
        }
        // Update
        setFilterOptions(temp)
    }

    const toggleList = () => {
        setListOpen(!listOpen)
    }

    const handleSearch = value => {
        setSearch(value)
        onInputChange(value)
    }

    return (
        <div className="Search-container">
            <div className="Search-container-box">
                <div className="input-box">
                    <input className="nav-search"
                        value={search}
                        onChange={e => handleSearch(e.target.value)}
                        type="search" autoComplete="onn"
                        name="product-filter"
                        placeholder="Pesquisar" />
                </div>
                <div className="input-box">
                    <input
                        className="nav-search filter"
                        onPointerDown={toggleList}
                        disabled={true}
                        placeholder={`Ordenar por: ${selectedOption.title}`} />
                    {listOpen ? <i className="fas fa-arrow-up dropdown-icon"></i>
                        : <i className="fas fa-arrow-down dropdown-icon"></i>}
                    <Dropdown
                        list={filterOptions}
                        toggleItem={toggleSelected}
                        listOpen={listOpen}
                        setListOpen={setListOpen}
                    />
                </div>
            </div>
        </div>
    )
}

const ProductsGrid = ({ cards }) => {
    const { Products } = React.useContext(ProductCtx)

    React.useEffect(() => {
        localStorage.setItem('Products', JSON.stringify(Products))
    }, [Products])

    const ProductCard = ({ card }) => {
        const { setProducts } = React.useContext(ProductCtx)
        const handleBuy = _ => {
            setProducts(card)
            alert('Produto adicionado com sucesso no carrinho')
        }
        return (
            <div className="product-grid-item" key={card.name}>
                <div className="P-card-product">
                    <div className="product-image">
                        <img src={require(`../../Images/produtos/${card.Foto}`)} alt="Imagem produto" />
                    </div>
                    <div className="product-info">
                        <p>{card.name}</p>
                        <p>R$: {card.price} </p>
                        {card.FreteGratis && <p style={{ fontSize: '1em' }}>Frete grátis</p>}
                    </div>
                    <div>
                        <button href="" className="product-buy" onClick={handleBuy}>Comprar</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="cards-p-container">
            <div className="cards-grid">
                {cards == null ? 'Carregando...' : cards.map(card => <ProductCard card={card} key={card._id} />)}
            </div>
        </div>
    )
}

export default ProductsPage;
