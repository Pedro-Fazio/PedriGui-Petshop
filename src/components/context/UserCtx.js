import React from 'react'
import ProductContext from './ProductsCtx';

export const TOKEN_KEY = "Petshop";

const commonData = {
    id: 0,
    logged: true,
    Nome: 'Pedro',
    Email: 'exemplo@exemplo.com',
    Foto: 'marcos.jpg',
    token: TOKEN_KEY,
    Nascimento: '17/09/2000'
}

const defaultUserData = {
    isDefault: true,
    Telefone: '9999999999',
    signo: 'leaozinho',
    Animais: [],
    ...commonData
}

export const UserCtx = React.createContext(defaultUserData)
const UserCtxProvider = UserCtx.Provider
const UserCtxConsumer = UserCtx.Consumer

export function UserContext(props) {
    const [userData, setUserData] = React.useState(defaultUserData)
    const [type, setType] = React.useState('user')

    React.useEffect(_ => {
        let user = JSON.parse(localStorage.getItem(TOKEN_KEY))
        if (user) {
            user = user.user
            setUserData(user)
            setType(user.type)
        }
    }, [])

    const setUserAdmin = userData => {
        setType('admin')
        setUserData(userData)
    }

    const setUserClient = userData => {
        setType('user')
        setUserData(userData)
    }

    const setUserByType = (type, data) => {
        if (type === 'user') setUserClient(data)
        else setUserAdmin(data)
    }
    return (
        <UserCtxProvider value={{
            type,
            userData,
            setUserByType
        }}>
            <ProductContext>
                {props.children}
            </ProductContext>
        </UserCtxProvider>
    )
}

export const UserCtxHOC = Component => props => (
    <UserCtxConsumer>
        {state => <Component  {...props} state={state}/>}
    </UserCtxConsumer>
)