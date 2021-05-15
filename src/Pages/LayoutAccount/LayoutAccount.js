import React from 'react';
import Topbar from '../../components/TopBar/TopBar'
import './LayoutAccount.scss'
import { Route, Switch, Redirect } from 'react-router-dom'
import Cadastro from '../Cadastro/Cadastro'
import Login from '../Login'

const LayoutAccount = props => {
    // const slogan = "Pedrigui's a clinica veterina e petshop mais completa que você ja viu"
    const benefits = "Só na Pedrigui's você encontra tudo o que precisa para o bem estar do seu pet. E só os membros da Pedrigui's encontram os melhores preços e benefícios."
    const topics = [
        "Tenha acesso a consultas veterinária, banho e tosa e a Petshop mais completa em um só lugar",
        "Acompanhe seu pet de perto tendo o registro completo de como anda a saúde do seu bichinho",
        "Oferecemos diversos descontos para nossos petlovers"
    ]

    const showTopic = topics => {
        return (
            <ul className="acc-reasons">
                {topics.map(reason => <li key={reason}>{reason}</li>)}
            </ul>

        )
    }

    return (
        <div className={"App"}>
            <Topbar />
            <div className="acc-container">
                <div className="acc-wrapper">

                    <div className="acc-reasons">
                        <p className="acc-reasons-p">{benefits}</p>

                        {showTopic(topics)}
                    </div>

                    <Switch>
                        <Route path="/account/create/" exact component={Cadastro} />                                            
                        <Route path="/account/login/" exact component={Login} />
                        <Redirect path="/account" exact to="/account/login" />    
                    </Switch>
                </div>

            </div>
        </div>
    )
}

export default LayoutAccount;