import React from 'react';
import Topbar from '../TopBar/TopBar';
import Footer from '../Footer/Footer'
import './Contato.scss'
import { FaFacebook } from 'react-icons/fa'
import { AiFillInstagram } from "react-icons/ai";
import { IoMdMail, IoLogoWhatsapp } from "react-icons/io";
import { GrMapLocation } from 'react-icons/gr'

const Contato = props => {

    return (
        <div className={"App"}>
            <Topbar />
            <ContatoContainer />
            <Footer />
        </div>
    )
}

const ContatoContainer = _ => {
    const title = "Entre em contato conosco!"

    const contact = [
        {
            label: "Email:",
            icon: <IoMdMail size={'1.4em'} />,
            content: "pedriguis@exemplo.com"
        },
        {
            label: "Rua:",
            icon: <GrMapLocation size={'1.4em'} />,
            content: "Exemplo, nº 9999 | São Carlos - SP"
        },
        {
            label: "Celular/Whatsapp:",
            icon: <IoLogoWhatsapp size={'1.4em'} />,
            content: "(99) 99999-9999"
        }
    ]

    const generateContact = contact => contact.map(
        i => (
            <div className="contact-info-item" key={i.label}>
                <span>{i.icon}</span>
                <span>{i.label}</span>
                <span>{i.content}</span>
            </div>
        ))

    return (
        <div className="Contato-container">
            <div className="Contato-box">
                <div className="Contato-title">
                    <h2>{title}</h2>
                </div>

                <div className="social-media-icons">
                    <div className="social-media-icons-label">
                        <h3>Redes Sociais</h3>
                    </div>
                    <div className="sm-icons">
                        <a href="https://facebook.com.br" rel="noopener noreferrer" target="_blank">
                            <FaFacebook size={'3em'} color={'#297BF0'} />
                        </a>
                        <a href="https://instagram.com.br"  rel="noopener noreferrer" target="_blank">
                            <AiFillInstagram size={'3.4em'} color={'#dd2a7b'} style={{ borderRadius: '0%' }} />
                        </a>
                    </div>
                </div>

                <div className="contact-info">
                    {generateContact(contact)}
                </div>
            </div>
        </div>
    )
}

export default Contato;

