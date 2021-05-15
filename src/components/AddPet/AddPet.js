import React from 'react';
import db from '..//Db/Db'
import { UserCtx } from '../context/UserCtx'


const AddPet = _ => {
    const [name, setName] = React.useState('')
    const [tipo, setTipo] = React.useState('')
    const [date, setDate] = React.useState('')
    const [porte, setPorte] = React.useState('')
    const { userData } = React.useContext(UserCtx)

    const inputs = [
        { type: 'text', data: { value: name, handle: setName }, placeholder: 'Nome do pet' },
        { type: 'text', data: { value: tipo, handle: setTipo }, placeholder: 'Tipo' },
        { type: 'text', data: { value: porte, handle: setPorte }, placeholder: 'Porte' },
        { type: 'date', data: { value: date, handle: setDate }, placeholder: 'Data de nascimento' },
    ]

    const checkInputsValue = _ => {
        const validPorte = ['pequeno', 'médio', 'grande']
        const validTipo = ['cachorro', 'gato', 'coelho', 'ave']
        const inputs = name + tipo + date + porte

        if (inputs === '') throw new Error('Verifique se nenhum campo está vazio')
        if (!(validPorte.includes(porte))) throw new Error('Portes válidos: pequeno, médio, grande')
        if (!validTipo.includes(tipo)) throw new Error('Tipos válidos: cachorro, gato, coelho, ave')
    }

    const handleSubmit = e => {
        e.preventDefault()
        try {
            checkInputsValue()
            db.AddPet({ name, tipo, date, porte }, userData['_id']).then(e => {
                alert('Pet adicionado com sucesso')
            })
        } catch (e) {
            alert(e.message)
        }

    }

    return (
        <div className="acc-box">
            <div className="acc cadastro">
                <p>Pedrigui's com você de P a I</p>
                <h1>Adicionar pet</h1>
                <form>
                    {inputs.map(i => <input type={i.type} placeholder={i.placeholder}
                        value={i.data.value} onChange={e => i.data.handle(e.target.value)} />)}
                    <div className="form-btn align-center">
                        <a className="btn-acc" type="submit" onClick={handleSubmit} href="#CRIADA">Adicionar Animal</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddPet;


