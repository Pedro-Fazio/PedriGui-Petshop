import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom'
import HomePage from './Pages/Home'
import PerfilPage from './Pages/Perfil/Perfil'
import LayoutAccount from './Pages/LayoutAccount/LayoutAccount'
import { UserContext } from './components/context/UserCtx'
import ProductPage from './Pages/Products/Products'
import SobrenosPage from './components/sobrenos/sobrenos';
import Contato from './components/Contato/Contato';

const App = () => {
  return (
    <Switch>
      <UserContext>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/account*" component={LayoutAccount} />
        <Route exact path="/perfil*" component={PerfilPage} />
        <Route exact path="/produtos" component={ProductPage} />
        <Route exact path="/contato" component={Contato} />       
        <Route exact path="/sobrenos" component={SobrenosPage} />
      </UserContext>
    </Switch>
  );
}

export default App;