import React from 'react';
import './TopBar.scss';
import logo from '../../Images/logo.png'
import SearchProduct from '../SearchProduct/SearchProduct'

const TopBar = () => {
  return (
    <header id="h-index">
      <nav className="topbar">
        <div className="nav-left">
          {/* <FontAwesomeIcon icon={faBars} /> */}
          <a href="/" className="topbar-logo">
            <img src={logo} className="logo" alt="logo" />
          </a>
        </div>
        <div className="topbar-wrapper">
          <div className="nav-right">
            <SearchProduct />
            <NavItens />
          </div>
        </div>
      </nav>
    </header>
  );
}

const NavItens = _ => {
  const NavItens = [
    {
      link: '/perfil/agendamentos',
      content: 'Agendar Consulta'
    },
    {
      link: '/perfil/carrinho-compras',
      content: 'Meu Carrinho'
    },
    {
      link: '/account/login',
      content: 'Minha Conta'
    },
  ]

  const handleLogout = _ => {
    localStorage.clear()
  }

  return (
    <div key={1} className="nav-actions">
      {NavItens.map((sessionItem, i) => <NavItem key={'nav-i_' + i} {...sessionItem} />)}
      <div className="nav-item">
        <a href='/account' onClick={handleLogout}>Sair</a>
      </div>
    </div>
  )
}

const NavItem = props => {
  return (
    <div className="nav-item">
      <a href={props.link}>{props.content}</a>
    </div>
  )
}

export default TopBar;
