import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.svg';
import bg from '../../assets/bg.png';

const Home = () => {
    return (
        <>
            <div className="margin" id="page-home">
            <div className="login-container">
                <section className="form">
                    
                    <img src={logo} alt="Be My Hero" className="img-size header" />
                    
                    <main>
                        <h1>O melhor lugar para oferecer tudo para PETS.</h1>
                        <p>Cadastre abaixo seu estabelecimento em nosso sistema e alcance milhares de novos clientes que usam nosso aplicativo!</p>
                        <Link to="/create-point">
                            <span>
                                <FiLogIn/>
                            </span>
                            <strong>
                                CADASTRAR NOVO LOCAL
                            </strong>
                        </Link>
                        
                    </main>
                </section>
                <img src={bg} alt="Heroes" className="img-50"/>
            </div>
            </div>
        </>
    )
}

export default Home;