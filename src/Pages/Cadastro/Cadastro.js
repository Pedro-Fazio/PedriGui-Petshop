import React from 'react';
import './Cadastro.scss'
// import { UserCtx } from '../components/context/UserCtx'
import db from '../../components/Db/Db'

const Cadastro = _ => {
    const [name, setName] = React.useState('Roberto')
    const [email, setEmail] = React.useState('marcos_robertinho@hotmail.com')
    const [CPF, setCPF] = React.useState('43143143130')
    const [date, setDate] = React.useState('')
    const [phone, setPhone] = React.useState('551199999999')
    const [pass, setPass] = React.useState('senha.dificil')
    const [confirmPass, setConfirmPass] = React.useState('senha.dificil')

    const inputs = [
        { type: 'text', data: { value: name, handle: setName }, placeholder: 'Nome completo' },
        { type: 'text', data: { value: CPF, handle: setCPF }, placeholder: 'CPF' },
        { type: 'email', data: { value: email, handle: setEmail }, placeholder: 'E-mail' },
        { type: 'date', data: { value: date, handle: setDate }, placeholder: 'Data de nascimento' },
        { type: 'text', data: { value: phone, handle: setPhone }, placeholder: 'Telefone' },
        { type: 'password', data: { value: pass, handle: setPass }, placeholder: 'Senha' },
        { type: 'password', data: { value: confirmPass, handle: setConfirmPass }, placeholder: 'Confirme sua senha' }
    ]

    const handleSubmit = e => {
        e.preventDefault()
        if(pass === confirmPass)
        db.signUpClient({name, email, CPF, date, phone, pass})

    }

    return (
        <div className="acc-box">
            <div className="acc cadastro">
                <p>Pedrigui's com você de P a I</p>
                <h1>Cadastro</h1>
                <form>
                    {inputs.map(i => <input type={i.type} value={i.data.value} onChange={e => i.data.handle(e.target.value)} placeholder={i.placeholder} />)}
                    <div className="form-btn align-center">
                        <a className="btn-acc" type="submit" onClick={handleSubmit} href="#CRIADA">Criar conta</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Cadastro;


