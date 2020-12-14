import React, { useEffect, useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';

import api from '../../services/api'

import "./styles.css";

import logo from "../../assets/logo.svg";
import { LeafletMouseEvent } from "leaflet";


const CreatePoint = () => {

  interface Item {
    id: Number,
    title: string,
    image_url: string
  }

  interface UFIBGEResponse {
    sigla: string;
  }

  interface CityIBGEResponse {
    nome: string;
  }

  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [state, setState] = useState<string[]>([])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  })


  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([-25.4278237, -49.2334783])

  useEffect(() => {
    api.get('items').then(response => {
      setItems(response.data);
    })
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    axios.get<UFIBGEResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);

      setUfs(ufInitials);
    });
  }, [])

  useEffect(() => {

    if (selectedUf === '0') {
      return;
    }

    axios.get<CityIBGEResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const cityNames = response.data.map(city => city.nome);

      setCities(cityNames);
    });

  }, [selectedUf])

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;

    setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;

    setSelectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng])
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.name, event.target.value);

  }

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
            <input type="text" name="name" id="name" onChange={handleInputChange} />
          </div>

          <div className="field">
            <label htmlFor="email">E-mail*</label>
            <input type="email" name="email" id="email" onChange={handleInputChange} />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} />
            </div>

            <div className="field">
              <label htmlFor="phone">Telefone fixo</label>
              <input type="text" name="phone" id="phone" onChange={handleInputChange} />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa *</span>
          </legend>

          <Map center={[-25.4278237, -49.2334783]} zoom={8} onclick={handleMapClick}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUf}
              >
                <option disabled value="0">Selecione um estado</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
              >
                <option disabled value="0">Selecione uma cidade</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
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

          {/* <div className="field">
            <label htmlFor="services">Adicione todos os outros serviços que se enquadram em sua categoria</label>
            <input type="text" name="services" id="services" onChange={handleInputChange} data-role="tagsinput" />
          </div> */}

        </fieldset>

        <button type="submit">Cadastrar estabelecimento</button>
      </form>
    </div>
  );
};

export default CreatePoint;
