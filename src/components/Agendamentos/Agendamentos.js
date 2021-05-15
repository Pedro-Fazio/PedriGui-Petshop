import React from 'react'
import Calendar from '../Calendar/Calendar'
import './Agendamentos.scss'
import api from '../Db/Db'
import { Route, Switch } from 'react-router-dom'
import { UserCtx } from '../context/UserCtx'
import AppointmentDetail from '../AppointmentInfo/AppointmentInfo'


const Agendamento = ({ title, changeFather, Events, ...props }) => {
    const [date, setDate] = React.useState("Selecione uma data")
    const [hour, setHour] = React.useState("HH:MM")
    const [petName, setPetName] = React.useState("nome")
    const [reason, setReason] = React.useState("Motivo da visita")
    const [dateObj, setDateObj] = React.useState(null)
    const { userData, type } = React.useContext(UserCtx)

    const handleBook = bookData => {
        const months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
        const prependZero = number => number < 9 ? `0${number}` : number
        const { day, month, year, hour, min } = bookData
        setDateObj(new Date(year, month, day, hour, min))

        setDate(`${day} de ${months[month]}, ${year}`)
        setHour(`${prependZero(hour)}:${prependZero(min)}`)
    }

    const handleInputChange = (set_, event) => {
        set_(event.target.value)
    }

    const handleClick = _ => {
        api.bookAppointment(
            { Date: dateObj, id: userData._id },
            { petName, reason }
        ).then(e => alert("Consulta agendada com sucesso"))
        alert("Sua consulta está sendo agendada :) Não saia da pagina enquanto isso")
    }

    return (
        <div className="agendamento-container">
            <Switch>
                <Route exact path="/perfil/agendamentos">
                    <Calendar handleBook={handleBook} Events={Events} />

                    <div className="agendamento-info">
                        <div className="click-info">
                            <h4>Data agendada: {date}</h4>
                            <h4>Horário: {hour}</h4>
                            <h4>Nome do pet: <input className="bookInput" onChange={event => handleInputChange(setPetName, event)} value={petName} /></h4>
                            <h4>Motivo: <input className="bookInput" onChange={event => handleInputChange(setReason, event)} value={reason} /></h4>
                        </div>
                        <div className="btn-add-container">
                            <button className="btn-add" onClick={handleClick}>Confirmar novo agendamento</button>
                        </div>
                    </div>
                </Route>
                {type === 'admin' ?
                    <Route path="/perfil/agendamentos">
                        <AppointmentDetail />
                    </Route> :
                    <div className="agendamento-msg-box">
                        Você precisa ser um administrador para acessar essa pagina. Veja suas consultas próximas em Meus Pets
                    </div>
                }

            </Switch>



        </div>
    )
}

export default Agendamento