import React, { useState } from 'react'
import Hammer from "react-hammerjs"
import './registroPet.scss'
import api from '../Db/Db'
import { UserCtxHOC } from '../../components/context/UserCtx'

const RegistroPet = ({ state, ...props }) => <Registro state={state} />

const cardsPattern = [{
    img: 'cachorro',
    nasc: 'Nascimento',
    nome: 'Nome',
    porte: 'Porte',
    situacao: 'Situacao'
}]

const parseAge = birthday => {
    const initial_year = 1970
    const dob = new Date(birthday)
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms);

    const Years = age_dt.getFullYear() - initial_year
    const months = age_dt.getMonth()
    const Days = age_dt.getDate()

    return `${Years} ano${Years > 1 ? 's' : ''}, ${months} ${months > 1 ? 'meses' : 'mês'} e ${Days} dia${Days > 1 ? 's' : ''}`
}

const Registro = ({ state }) => {
    const initialDegree = 2
    const rotateInc = 32
    const carrouselLen = 3
    const [userData, setUserData] = useState(state.userData)
    const [cards, setCards] = useState(cardsPattern)
    const [maxSwipes, setMaxSwipes] = useState(cards.length - carrouselLen - 1)
    const [page, setPage] = useState(0)
    const [rotationGrid, setRotationGrid] = useState(initialDegree) // degree rotate
    const [selectedGrid, setSelectedGrid] = useState(1) // Element at center
    const [appointments, setAppointments] = useState({})
    const [PetInfo, setPetInfo] = useState({
        nasc: 'DD/MM/AAAA',
        nome: 'Scooby',
        porte: 'pequeno/medio/grande',
        situacao: 'saudável',
        especie: 'cachorro',
        consulta: 'Agende sua consulta'
    })

    React.useEffect(_ => {
        const userData = state.userData
        if (userData['_id'])
            setUserData({
                ...userData,
                atualizado: true
            })
    }, [state])

    React.useEffect(() => {
        // console.log()
        if (userData.atualizado && userData.Animais.length > 0) {
            console.log(userData, 'oi')
            api.getPetAppointment(userData['_id']).then(appointments => {
                setAppointments(appointments)
            })
            setCards(parsePets(userData.Animais))
            setMaxSwipes(userData.Animais.length - carrouselLen - 1)
            const petInfo = parsePets(
                [userData.Animais[selectedGrid]])[0]
            setPetInfo({
                ...petInfo,
                consulta: 'Carregando'
            })
        }

    }, [userData])

    React.useEffect(_ => {
        if (userData['_id'] && userData.Animais.length > 0) {
            const petInfo = parsePets(
                [userData.Animais[selectedGrid % cards.length]]
            )[0]
            setPetInfo({
                ...petInfo,
                consulta: appointments[petInfo.nome] ? new Date(appointments[petInfo.nome].Data).toLocaleDateString('pt-BR')
                    : appointments.len ? 'Nenhuma consulta' : 'Carregando'
            })
        }

    }, [selectedGrid, appointments])

    const RotateLeft = _ => {
        if (rotationGrid < -initialDegree) {
            setRotationGrid(rotationGrid + rotateInc)
            setSelectedGrid(page)
            setPage(page - 1)
        }
    }

    const RotateRight = _ => {
        if (rotationGrid > -(rotateInc * maxSwipes)) {
            setRotationGrid(rotationGrid - rotateInc)
            setSelectedGrid(page + carrouselLen - 1)
            setPage(page + 1)
        }
    }

    const parsePets = Animals => {
        if (Animals[0])
            return Animals.map(
                a => ({
                    img: a['Especie'],
                    nasc: a['Nascimento'],
                    nome: a['Nome'],
                    porte: a['Porte'],
                    situacao: a['Situacao']
                })
            )
    }

    const handleClick = idx => {
        setSelectedGrid(idx)
    }

    const generateCards = (cards, selectedGrid) => cards.map(
        (card, i) => (
            <div className="pet-card" key={card + i}
                onClick={_ => handleClick(i)}
                style={i === selectedGrid ? { height: '200px' } : {}}>
                <img src={require(`./Pets/${card.img}.jpg`)} alt="Imagem de um coelho" id="coelho" />
            </div>
        )
    )

    const handleDelete = _ => {
        api.removePet(userData['_id'], PetInfo.nome).then(e => {
            const Animais = userData.Animais.filter(a => a.Nome !== PetInfo.nome)
            const aux = Animais.length - carrouselLen - 1
            const swipes = aux < 0 ? 0 : aux
            const user = {
                ...userData,
                Animais,
                atualizado: false
            }
            setUserData(user)
            setCards([...parsePets(Animais)])
            setMaxSwipes(swipes || -1)
            alert('Removido com sucesso')
            setSelectedGrid((page * swipes))
            localStorage.setItem('Petshop', JSON.stringify({
                type: 'user',
                user
            }))
        })
    }

    return userData.Animais.length > 0 ?
        (
            <section id="registro-section">
                <div id="registro-section-container">

                    <div className="selecionar-pet">
                        <div id="titulo">
                            <h1> Selecione seu pet </h1>
                        </div>
                        <div className="Promotions-cards-container">
                            <div className="Promotions-cards-wrapper">
                                <i className="material-icons seta-parc" style={{ fontSize: '200%' }}
                                    onClick={RotateLeft}
                                >keyboard_arrow_left</i>
                                <div className="carrousel-box"
                                    style={cards.length <= 2 ? { width: '50%' } : {}}>
                                    <Hammer
                                        onSwipeRight={RotateLeft} onSwipeLeft={RotateRight} >
                                        {/* 32% rotaion */}
                                        <div className="promotions-carrousel"
                                            style={{
                                                transform: `translateX(${rotationGrid}%`,
                                                ...(cards.length <= 2 ? { justifyContent: 'center' } : {})
                                            }}>
                                            {generateCards(cards, selectedGrid)}
                                        </div>
                                    </Hammer>
                                </div>

                                <i className="material-icons seta-parc"
                                    style={{ fontSize: '200%' }}
                                    onClick={RotateRight}
                                >keyboard_arrow_right</i>
                            </div>
                        </div>

                    </div>

                    <div className="dados">
                        <div className="info-pet">
                            <div id="titulo"> <h1> Informações do Pet </h1> </div>
                            <div id="info">
                                <div> Nome: <span>{PetInfo.nome}</span> </div>
                                <div> Idade: <span>{parseAge(PetInfo.nasc)}</span></div>
                                <div> Tipo: <span>{PetInfo.img}</span></div>
                                <div className="actions-btn">
                                    <button onClick={handleDelete}>Remover registro</button>
                                </div>
                            </div>
                        </div>

                        <div className="status-pet">
                            <h3> Próxima Consulta:  {PetInfo.consulta}</h3>
                            <ul>
                                <li id="situacao-atual"> Situação Atual: {PetInfo.situacao}</li>
                            </ul>
                        </div>
                    </div>

                    <div className="registrar-btn">
                        <a href="/perfil/registrar-pet"> Registrar novo Pet </a>
                        <hr />
                    </div>

                </div>
            </section >
        ) : <h2>Desculpe, não encontramos pets</h2>
}

export default UserCtxHOC(RegistroPet)