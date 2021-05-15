import React from 'react';
// import { UserCtx } from '../components/context/UserCtx'
import db from '../Db/Db'

const AddAdmin = _ => {
    const [name, setName] = React.useState('Roberto')
    const [email, setEmail] = React.useState('marcos_robertinho@hotmail.com')
    const [pass, setPass] = React.useState('senha.dificil')
    const [confirmPass, setConfirmPass] = React.useState('senha.dificil')

    const inputs = [
        { type: 'text', data: { value: name, handle: setName }, placeholder: 'Nome completo' },
        { type: 'email', data: { value: email, handle: setEmail }, placeholder: 'E-mail' },
        { type: 'password', data: { value: pass, handle: setPass }, placeholder: 'Senha' },
        { type: 'password', data: { value: confirmPass, handle: setConfirmPass }, placeholder: 'Confirme sua senha' }
    ]

    const handleSubmit = e => {
        e.preventDefault()
        alert('Aguarde')
        if (pass === confirmPass)
            db.signUpAdmin({ name, email, pass })
                .then(e => alert('Adicionado com sucesso'))
                .catch(e => 'Houve um problema, tente novamente')

    }
    return (
        <div className="acc-box">
            <div className="acc cadastro">
                <p>Pedrigui's com você de P a I</p>
                <h1>Cadastrar Adm</h1>
                <form>
                    {inputs.map(i => <input
                        value={i.data.value} onChange={e => i.data.handle(e.target.value)}
                        type={i.type} placeholder={i.placeholder} />)}
                    <div className="form-btn align-center">
                        <a className="btn-acc" type="submit" onClick={handleSubmit} href="#CRIADA">Criar conta</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddAdmin;


