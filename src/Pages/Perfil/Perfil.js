import './Perfil.scss'
import TopBar from '../../components/TopBar/TopBar';
import Footer from '../../components/Footer/Footer'
import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { UserCtx } from '../../components/context/UserCtx'

import BoxLog from '../../components/BoxLog/BoxLog'
import InventoryBoxLog from '../../components/BoxLog/InventoryBoxLog'
import HistoryBoxLog from '../../components/BoxLog/HistoryBoxLog'
import ServicosBoxLog from '../../components/BoxLog/ServicosBoxLog'
import Agendamentos from '../../components/Agendamentos/Agendamentos'
import AddClient from '../../components/AddClient/AddClient'
import AddAdmin from '../../components/AddAdmin/AddAdmin';
import api from '../../components/Db/Db'
import RegistroPet from '../../components/registroPet/registroPet';
import AddPet from '../../components/AddPet/AddPet';

const InfoForm = ({ info }) => {
    return (
        <div key={info.label} className="info-row">
            <p className="info-label">{info.label}</p>
            <p className="info-data">{info.content}</p>
            <button className="edit-btn" disabled={!info.editable}>
                <i className="fas fa-edit"></i>
            </button>
        </div>
    )
}

const generateUserActions = actions => {
    const actionList = actions.map(action => (
        <Link
            to={action.ref} key={action.label} className="action-item"
        >{action.label}</Link>)
    )

    return (
        <div className="action-list">
            <h2>Compras</h2>
            {actionList}
        </div>
    )
}

const generateAdminActions = actions => {
    const actionList = actions.map(action => (
        <Link
            to={action.ref} key={action.label} className="action-item"
        >{action.label}</Link>)
    )

    return (
        <div className="action-list" style={{ marginTop: '-5em' }}>
            <h2>Ações</h2>
            {actionList}
        </div>
    )
}

const Perfil = props => {
    const { userData, type } = React.useContext(UserCtx)

    const generateUserInfo = userInfo => {
        const birth = new Date(userInfo.Nascimento)
        const signos = ['Aquário', 'Peixes', 'Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem', 'Libra', 'Escorpião', 'Sagitário', 'Capricórnio']
        const arrInfo = [
            {
                label: 'Nome:',
                content: userInfo.Nome,
                editable: true
            },
            {
                label: 'Email:',
                content: userInfo.Email,
                editable: true
            },
            {
                label: 'Telefone:',
                content: userInfo.Telefone,
                editable: true
            },
            {
                label: 'Data de nascimento:',
                content: birth.toLocaleDateString('pt-BR'),
                editable: true
            },
            {
                label: 'Signo:',
                content: signos[birth.getMonth() - 1],
                editable: false
            }
        ]

        return (
            <div className="info-box">
                <h2 className="user-container-label">Sobre</h2>
                {arrInfo.map((info, i) => <InfoForm key={info + i} info={info} />)}
            </div>
        )
    }
    const generateAdminInfo = userInfo => {
        return (
            <div className="info-box">
                <h2 className="user-container-label">{userInfo.Nome}</h2>
                <p>{userInfo.Email}</p>
            </div>
        )
    }

    const Profile = _ => {
        const userActions = [
            {
                label: "Histórico de compras",
                ref: '/perfil/historico-compras'
            },
            {
                label: "Carrinho de compras",
                ref: '/perfil/carrinho-compras'
            },
            {
                label: "Agendamentos",
                ref: '/perfil/agendamentos'
            },
            {
                label: "Serviços",
                ref: '/perfil/servicos'
            },
            {
                label: "Meus Pets",
                ref: '/perfil/pets'
            },
            {
                label: "Registro de pet",
                ref: '/perfil/registrar-pet'
            }
        ]
        const AdminActions = [
            {
                label: "Cadastrar novo admin",
                ref: '/perfil/cadastrar-adm'
            },
            {
                label: "Cadastrar Cliente",
                ref: '/perfil/cadastrar-cliente'
            },
            {
                label: "Inventário",
                ref: '/perfil/inventario'
            },
            {
                label: "Serviços",
                ref: '/perfil/servicos'
            },
            {
                label: "Meus agendamentos",
                ref: '/perfil/agendamentos'
            }
        ]
        const [action, setAction] = React.useState(generateUserActions(userActions))
        const [generateInfo, setgenerateInfo] = React.useState('Carregando...')

        React.useEffect(() => {
            if (type === 'user') {
                setgenerateInfo(generateUserInfo(userData))
                setAction(_ => generateUserActions(userActions))
            } else {
                setgenerateInfo(generateAdminInfo(userData))
                setAction(_ => generateAdminActions(AdminActions))
            }

        }, [type])

        return (
            <div className="Perfil-info">
                <div className="user-data-container">
                    <div className="user-data-box">
                        {generateInfo}
                    </div>
                    <div className="foto-box">
                        <img src={require(`../../Images/users/${userData.Foto}`)} alt="Foto de perfil" />
                    </div>
                </div>

                <div className="actions-container">
                    {action}
                    <div className="patinha">
                        <svg width="150" viewBox="0 0 298 503" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M193.181 394.993C182.39 393.375 174.822 389.992 170.022 384.653C152.141 364.699 124.247 357.829 102.73 368.985C81.2152 380.14 70.0359 407.268 76.0449 433.392C77.6307 440.369 76.04 448.515 71.1452 458.276C65.1926 470.171 66.3902 483.172 74.275 492.219C83.7585 503.106 103.287 507.035 122.144 497.258C130.117 493.125 136.625 487.147 140.956 479.984C143.824 475.21 148.844 470.866 154.112 468.135C159.376 465.405 165.084 464.177 170.693 464.552C179.075 465.152 187.672 463.309 195.572 459.213C214.418 449.442 222.574 431.23 219.127 417.121C216.275 405.46 206.323 396.984 193.181 394.993Z" fill="#FFF069" />
                            <path d="M48.0901 397.315C41.5988 384.795 21.3946 369.972 9.69338 376.038C-2.00498 382.104 -1.5368 407.159 4.95452 419.679C11.139 431.607 25.8517 436.299 37.7411 430.135C49.6305 423.971 54.2746 409.243 48.0901 397.315Z" fill="#FFF069" />
                            <path d="M161.389 297.387C149.691 303.453 150.159 328.508 156.65 341.028C162.835 352.956 177.548 357.648 189.437 351.484C201.326 345.32 205.971 330.592 199.786 318.664C193.295 306.143 173.091 291.321 161.389 297.387Z" fill="#FFF069" />
                            <path d="M91.0765 320.114C97.2624 332.045 111.975 336.737 123.865 330.573C135.754 324.408 140.398 309.68 134.212 297.749C127.721 285.229 107.518 270.409 95.8169 276.476C84.1157 282.543 84.5852 307.594 91.0765 320.114Z" fill="#FFF069" />
                            <path d="M58.4416 364.493C70.331 358.328 74.975 343.6 68.7891 331.669C62.2978 319.149 42.0922 304.331 30.3938 310.396C18.6926 316.463 19.1594 341.516 25.6507 354.036C31.8366 365.967 46.5493 370.658 58.4416 364.493Z" fill="#FFF069" />
                            <path d="M270.71 120.51C259.919 118.892 251.977 114.788 247.177 109.448C229.295 89.4945 201.056 83.7191 179.539 94.8752C158.025 106.03 147.19 132.064 153.199 158.188C154.787 165.168 153.569 174.032 148.675 183.797C142.723 195.691 143.919 208.689 151.805 217.74C161.287 228.623 180.816 232.553 199.673 222.776C207.646 218.642 214.155 212.667 218.485 205.501C221.353 200.728 225.653 196.756 230.921 194.025C236.186 191.296 242.613 189.694 248.222 190.069C256.604 190.669 265.202 188.829 273.103 184.733C291.948 174.962 300.103 156.747 296.655 142.638C293.803 130.978 283.853 122.504 270.71 120.51Z" fill="#FFF069" />
                            <path d="M125.621 122.831C119.129 110.311 98.9222 95.4891 87.2211 101.556C75.5227 107.621 75.9909 132.677 82.4822 145.197C88.6666 157.125 103.379 161.817 115.269 155.652C127.161 149.487 131.805 134.759 125.621 122.831Z" fill="#FFF069" />
                            <path d="M238.918 22.9048C227.22 28.9701 227.688 54.0257 234.179 66.5457C240.364 78.4738 255.076 83.1657 266.966 77.0013C278.858 70.8355 283.502 56.1076 277.318 44.1794C270.826 31.6594 250.619 16.838 238.918 22.9048Z" fill="#FFF069" />
                            <path d="M168.606 45.6344C174.79 57.5625 189.503 62.2544 201.392 56.09C213.282 49.9257 217.926 35.1977 211.741 23.2696C205.25 10.7496 185.046 -4.07325 173.345 1.99352C161.643 8.0603 162.114 33.1144 168.606 45.6344Z" fill="#FFF069" />
                            <path d="M103.184 79.5544C109.368 91.4826 124.081 96.1745 135.97 90.0101C147.86 83.8457 152.504 69.1178 146.319 57.1897C139.828 44.6697 119.621 29.8483 107.922 35.9136C96.2213 41.9804 96.6922 67.0344 103.184 79.5544Z" fill="#FFF069" />
                        </svg>

                    </div>
                </div>
            </div >
        )
    }

    const ProfilePage = props => {
        const [events, setEvents] = React.useState([])
        //  Get data from storage first 
        // const { userData, type } localstorage.getItem(TOKEN_KEY)
        // localStorage.setItem(TOKEN_KEY, JSON.stringify({ userData, type }))
        const headerLabels = [
            'Em estoque',
            'Item',
            'Nome',
            'Qtd',
            'Preço'
        ]
        const headerLabelsHistory = [
            'Data',
            'Item',
            'Nome',
            'Qtd',
            'Preço'
        ]
        const headerLabelsInventory = [
            'Código',
            'Item',
            'Nome',
            'Qtd',
            'Preço Un'
        ]

        const headerLabelsService = [
            'Código',
            'Nome',
            'Preço'
        ]

        React.useEffect(_ => {
            // console.log(window.location.pathname, userData)
            if (!userData.isDefault && window.location.pathname === '/perfil/agendamentos') {
                api.getAllFutureAppointments().then(e => {
                    alert('Carregado com sucesso')
                    setEvents(e)
                }).catch(e => {
                    console.log(e, 'o-ou')
                    alert('o-ou')
                })
            }
        }, [])

        return (
            <div className={`Perfil-container ${window.location.pathname === '/perfil/agendamentos' & !userData.isDefault ? 'calendar' : ''}`}>
                {userData.isDefault ? <p>Você precisa estar logado para realizar essa ação</p> :
                    <Switch>
                        <Route exact path="/perfil/carrinho-compras">
                            <BoxLog title="Carrinho de compras" headerLabels={headerLabels} />
                        </Route>
                        <Route exact path="/perfil/historico-compras">
                            <HistoryBoxLog title="Historico de compras" headerLabels={headerLabelsHistory} />
                        </Route>
                        <Route path="/perfil/agendamentos">
                            <Agendamentos title="Inventário" Events={events} />
                        </Route>
                        <Route exact path="/perfil/servicos">
                            <ServicosBoxLog title="Serviços" headerLabels={headerLabelsService} />
                        </Route>
                        <Route exact path="/perfil/registrar-pet">
                            <AddPet title="Cadastro" />
                        </Route>
                        <Route exact path="/perfil/pets">
                            <RegistroPet />
                        </Route>

                        {type === 'admin' &&
                            <Route exact path="/perfil/cadastrar-cliente">
                                <AddClient title="Cadastro" />
                            </Route>
                        }
                        {type === 'admin' &&
                            <Route exact path="/perfil/inventario">
                                <InventoryBoxLog title="Inventário" headerLabels={headerLabelsInventory} />
                            </Route>
                        }
                        {type === 'admin' &&
                            <Route exact path="/perfil/cadastrar-adm">
                                <AddAdmin title="Cadastro" />
                            </Route>
                        }
                        <Route path="/">
                            <Profile />
                        </Route>
                        {/* <Redirect path="/perfil" exact to="/account/login" />  */}
                    </Switch>
                }
            </div>
        )
    }

    return (
        <div id="Perfil">
            <TopBar />
            <ProfilePage />
            <Footer />
        </div>
    )
}

export default Perfil;