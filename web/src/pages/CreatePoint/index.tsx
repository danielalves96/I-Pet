import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import api from '../../services/api'

import "./styles.css";

import logo from "../../assets/logo.svg";
import TagsInput from "../../components/TagsInput";

const CreatePoint = () => {

  interface Item {
    id: Number,
    title: string,
    image_url: string
  }

  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    })
    window.scrollTo(0, 0);
  }, []);

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

          <MapContainer center={[-25.4278237, -49.2334783]} zoom={15}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[-25.4278237, -49.2334783]} />
          </MapContainer>

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
            {items.map(item =>
              (<li>
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>)
            )}

          </ul>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Outros serviços</h2>
          </legend>
          <div className="field">
            <label htmlFor="services">Adicione todos os outros serviços que se enquadram em sua categoria</label>
            <TagsInput/>
          </div>
        </fieldset>

        <button type="submit">Cadastrar estabelecimento</button>
      </form>
    </div>
  );
};

export default CreatePoint;
