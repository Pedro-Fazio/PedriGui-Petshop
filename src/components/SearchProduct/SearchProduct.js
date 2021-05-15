import React from 'react';
import './SearchProduct.scss';
// get our fontawesome imports
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TopBar = () => {
    return (
        <div className="search">
            <form role="search" method="get" action="/produtos">
                <input className="nav-search" type="search" autoComplete="off" name="product-q" placeholder="O que seu pet precisa?" />
                <FontAwesomeIcon icon={faSearch} />
            </form>
        </div>
    );
}

export default TopBar;
