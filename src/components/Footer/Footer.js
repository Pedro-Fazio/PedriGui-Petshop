import React from 'react'
import './Footer.scss'
import { } from '@fortawesome/fontawesome-svg-core'

const Footer = props => {
    const infos = {
        email: 'pedriguis@exemplo.com',
        cel: "(99) 99999-9999",
        address: 'Exemplo, nº9999 | São Carlos - SP'
    }

    const links = [
        { label: "Home", link: "/#Home" },
        { label: "Banho e tosa", link: "/contato" },
        { label: "Produtos", link: "/produtos" }]

    const SocialMedias = [
        { classBtn: "fab fa-facebook", link: "https://facebook.com.br" },
        { classBtn: "fab fa-instagram", link: "https://instagram.com.br" }
    ]

    return (
        <div id="footer">
            <div className="footer-container">
                <LeftSide {...infos} />
                <RightSide links={links} SocialMedias={SocialMedias} />
            </div>
        </div>
    )
}

const LeftSide = props => {
    return (
        <div className="site-info">
            <p>Email: {props.email}</p>
            <p>Celular/Whatsapp: {props.cel}</p>
            <p>{props.address}</p>
            <p>Copyright ©2020</p>
        </div>
    )
}

const RightSide = props => {
    const generateSocialMediasBtns = SocialMedias => SocialMedias.map(
        SocialMedia => (
            <a className="social-media-btn" href={SocialMedia.link} key={SocialMedia.classBtn} rel="noopener noreferrer" target="_blank">
                <i className={SocialMedia.classBtn}></i>
            </a>
        ))

    return (
        <div className="footer-right">
            <div className="footer-inner-links">
                <h3>Links úteis</h3>
                {props.links.map(v => (
                    <a className="footer-link" href={v.link} key={v.label}>{v.label}</a>
                ))}
            </div>
            <div className="footer-social-medias">
                <h3>Redes Sociais</h3>
                <div className="social-btns">
                    {generateSocialMediasBtns(props.SocialMedias)}
                </div>

            </div>
        </div>
    )
}

export default Footer