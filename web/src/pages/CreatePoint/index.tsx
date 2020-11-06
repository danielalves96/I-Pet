import React from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import "./styles.css";

import logo from "../../assets/logo.svg";

const CreatePoint = () => {
  return (
    <div id="page-create-point">
      <header>
        <img className="width-15" src={logo} alt="I-PET" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form>
        <h1>Cadastro de novo estabelecimento</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome do estabelecimento*</label>
            <input type="text" name="name" id="name" />
          </div>

          <div className="field">
            <label htmlFor="email">E-mail*</label>
            <input type="email" name="email" id="email" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </div>

            <div className="field">
              <label htmlFor="phone">Telefone fixo</label>
              <input type="text" name="phone" id="phone" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa *</span>
          </legend>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf">
                <option value="0">Selecione um estado</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione uma cidade</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Categorias de serviço</h2>
            <span>Selecione uma ou mais categorias</span>
          </legend>

          <ul className="items-grid">
            <li>
              <img src="http://localhost:3333/uploads/adoption.svg" alt="teste"/>
              <span>Oleo de cozinha</span>
            </li>
            <li className="selected">
              <img src="http://localhost:3333/uploads/adoption.svg" alt="teste"/>
              <span>Oleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/adoption.svg" alt="teste"/>
              <span>Oleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/adoption.svg" alt="teste"/>
              <span>Oleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/adoption.svg" alt="teste"/>
              <span>Oleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/adoption.svg" alt="teste"/>
              <span>Oleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/adoption.svg" alt="teste"/>
              <span>Oleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/adoption.svg" alt="teste"/>
              <span>Oleo de cozinha</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/adoption.svg" alt="teste"/>
              <span>Oleo de cozinha</span>
            </li>

          </ul>
        </fieldset>

        <button type="submit">Cadastrar estabelecimento</button>
      </form>
    </div>
  );
};

export default CreatePoint;
