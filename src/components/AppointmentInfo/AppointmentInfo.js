import React from 'react'
import api from '../Db/Db'
import './AppointmentInfo.scss'

const AppointmentDetail = props => {
    const [AppInfo, setAppInfo] = React.useState(undefined)
    // Animal

    React.useEffect(_ => {
        if (!AppInfo) {
            const AppointmentID = window.location.pathname.split('/')[3]

            api.getAppointmentDetail(AppointmentID).then(data => {
                const { Animal, Cliente, Data, Descricao, Veterinario, _id } = data[0]
                setAppInfo({
                    Animal,
                    Cliente: Cliente[0],
                    Data: new Date(Data),
                    Descricao,
                    Veterinario: Veterinario[0],
                    _id
                })
                alert("Consulta agendada com sucesso")
            })
        }

    }, [AppInfo])

    const formatPhoneNumber = str => {
        //Filter only numbers from the input
        let cleaned = ('' + str).replace(/\D/g, '');
        //Check if the input is of correct
        let match = cleaned.match(/^(\d{2}|)?(\d{2})(\d{5})(\d{4})$/);
        if (match) {
            //Remove the matched extension code
            //Change this to format for any country code.
            let intlCode = (match[1] ? '+55 ' : '')
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }

        return null;
    }

    const formatCPFNumber = str => {
        //Filter only numbers from the input
        let cleaned = ('' + str).replace(/\D/g, '');
        //Check if the input is of correct
        let match = cleaned.match(/^(\d{3}|)(\d{3})(\d{3})(\d{2})$/);
        if (match)
            return [match[1], '.', match[2], '.', match[3], '-', match[4]].join('')

        return null;
    }
    const parseClientData = data => {
        return [
            { label: 'Nome', content: data.Nome },
            { label: 'Email', content: data.Email },
            { label: 'Telefone', content: formatPhoneNumber(data.Telefone) },
            { label: 'Data de nascimento', content: new Date(data.Nascimento).toLocaleDateString('pt-BR') },
            { label: 'CPF', content: formatCPFNumber(data.CPF) },
            { label: 'Foto', content: <img alt="Cliente foto" src={require(`../../Images/users/${data.Foto}`)}></img> },
            { label: 'Pet', content: data.Pet }
        ]
    }

    const parseVetData = data => {
        return [
            { label: 'Nome', content: data.Nome },
            { label: 'Email', content: data.Email },
        ]
    }

    return AppInfo ?
        (<div className="Appointment-container">
            <div className="Appointment-box">
                <div className="Appointment-title">
                    <h3>Consulta: {AppInfo.Data.toLocaleDateString('pt-BR')}</h3>
                    <p>Descrição: {AppInfo.Descricao}</p>
                </div>

                <div className="Appointment-data">
                    <BoxInfo Title="Dados do cliente" content={parseClientData({ ...AppInfo.Cliente, Pet: AppInfo.Animal })} />
                    <BoxInfo Title="Dados do veterinário" content={parseVetData(AppInfo.Veterinario)} />
                </div>
            </div>
        </div>) : 'Carregando...'
}

const BoxInfo = ({ Title, content }) => {
    return (
        <div className="Appointment-data-box">
            <h4 className="Appointment-data-title">{Title}</h4>

            {content.map(v => (
                <div key={v.content} className="Appointment-data-field">
                    <p className="Appointment-data-field-label">{v.label}:</p>
                    <p className="Appointment-data-field-content">{v.content}</p>
                </div>)
            )}
        </div>
    )
}

export default AppointmentDetail