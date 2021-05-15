import React from 'react'
import './Dropdown.scss'

const Dropdown = ({list, toggleItem, listOpen, setListOpen }) => {    

    const handleClickOutside = () => {
        setListOpen(false)
    }

    return (
        <div className="dd-wrapper">
            {listOpen && <ul className="dd-list">
                {list.map((item) => (
                    <li className="dd-list-item" key={item.title}
                        onClick={() => { toggleItem(item.id); handleClickOutside(); }}>
                        {item.title} {item.selected ? <i style={{paddingLeft: '0.7em', alignSelf: 'center'}} className="fas fa-times"></i> : ''}
                    </li>
                ))}
            </ul>}
        </div>
    )
}

export default Dropdown