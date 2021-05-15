import React from 'react';
import './Login.scss'
import db from '../components/Db/Db'
import { UserCtx, TOKEN_KEY } from '../components/context/UserCtx'
import { useHistory } from "react-router-dom";
const LoginPage = props => {
    const { userData, setUserByType } = React.useContext(UserCtx)

    const history = useHistory();
    if (userData._id) history.push("/perfil");

    const Login = _ => {
        const [email, setEmail] = React.useState('')
        const [password, setPassword] = React.useState('')
        const history = useHistory();

        const handlePasswordChange = e => {
            setPassword(e.target.value)
        }

        const handleEmailChange = e => {
            setEmail(e.target.value)
        }
        const handleSubmit = async e => {
            e.preventDefault()
            alert('Aguarde')
            let user = await db.signIn(email, password)
            alert('Bem vindo')
            if (user) {
                setUserByType('user', user)
                localStorage.setItem(TOKEN_KEY, JSON.stringify({ user, type: 'user' }))
            }
            history.push("/perfil");
        }
        return (
            <div className="acc-box">
                <div className="acc">
                    <p>Pedrigui's com você de P a I</p>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder="E-mail"
                            value={email} onChange={handleEmailChange} />
                        <input type="password" placeholder="Senha"
                            value={password} onChange={handlePasswordChange} />
                        <a href="#crie-uma-nova-conta">Esqueceu sua senha?</a>

                        <div className="form-btn">
                            <a className="btn-acc" href="/account/create">Criar conta</a>
                            <button className="btn-submit" type="submit">Entrar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <Login />
    )
}

export default LoginPage;


