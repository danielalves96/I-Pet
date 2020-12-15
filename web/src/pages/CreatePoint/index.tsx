import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import InputMask from "react-input-mask";

import api from '../../services/api'

import "./styles.css";

import logo from "../../assets/logo.svg";
import { LeafletMouseEvent } from "leaflet";

import MultiSelect from "react-multi-select-component";

const CreatePoint = () => {

  interface Item {
    id: number,
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
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    cep: '',
    number: '',
    street: '',
    phone: '',
    complement: ''
  })

  const options = [
    { label: "Banho", value: "banho" },
    { label: "Hidratação", value: "hidratação" },
    { label: "Tosa na máquina ", value: "tosa na máquina" },
    { label: "Tosa na tesoura ✂️", value: "tosa na tesoura" },
    { label: "Tosa higiênica", value: "tosa higiênica" },
    { label: "Desembaraçamento", value: "desembaraçamento" },
    { label: "Tingimento dos pelos", value: "tingimento dos pelos" },
    { label: "Escovação de dentes", value: "Escovação de dentes" },
    { label: "Limpeza de ouvido", value: "limpeza de ouvido" },
    { label: "Corte de unhas", value: "corte de unhas" },
    { label: "Consultas clínicas gerais e especialidades", value: "consultas clínicas gerais e especialidades" },
    { label: "Atendimento domiciliar", value: "atendimento domiciliar" },
    { label: "Vacinação ", value: "vacinação" },
    { label: "Exames preventivos ", value: "preventivos" },
    { label: "Cirurgias ", value: "cirurgias" },
    { label: "Adestramento ", value: "adestramento" },
    { label: "Hospedagem ", value: "hospedagem" },
    { label: "Taxi dog", value: "taxi dog" },
    { label: "Passeador", value: "passeador" },
    { label: "Pet Sitter", value: "pet Sitter" },
    { label: "Venda de rações", value: "Venda de rações" },
    { label: "Venda de acessórios ", value: "Venda de acessórios" },
    { label: "Farmácia ", value: "farmácia" },
    { label: "Hotel ", value: "hotel" },
    { label: "Adoção ", value: "adoção" },
  ];

  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([-25.4278237, -49.2334783])

  const internacionalization = {
    "selectSomeItems": "Selecione aqui todos os serviços que realiza",
    "allItemsAreSelected": "Todos os itens estão selecionados.",
    "selectAll": "Selecionar todos",
    "search": "Pesquisar",
    "clearSearch": "Limpar pesquisa"
  }

  const history = useHistory();

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
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value })

  }

  function handleSelectItem(id: number) {

    const areadySelected = selectedItems.findIndex(item => item === id);

    if (areadySelected >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);

    } else {
      setSelectedItems([...selectedItems, id])
    }

  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, whatsapp, email, cep, number, street, phone, complement } = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;
    const services = selectedOptions.map(val => val.label).join(', ');
    const address = `${street} - N.º${number} - ${complement}| CEP:${cep} `

    const data = {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      address,
      services,
      phone,
      items,
    }

    await api.post('points', data);

    alert('Estabalecimento cadastrado com sucesso!');

    history.push('/')

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

      <form onSubmit={handleSubmit}>
        <h1>Cadastro de novo estabelecimento</h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome do estabelecimento*</label>
            <input type="text" name="name" id="name" onChange={handleInputChange} required placeholder="Ex.: Aviário do seu Pedro" />
          </div>

          <div className="field">
            <label htmlFor="email">E-mail*</label>
            <input type="email" name="email" id="email" onChange={handleInputChange} required placeholder="Ex.: aviario@example.org" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <InputMask mask="(99)99999-9999" type="text" name="whatsapp" id="whatsapp" onChange={handleInputChange} required placeholder="Ex.: (41)99999-9999" />
            </div>

            <div className="field">
              <label htmlFor="phone">Telefone fixo</label>
              <InputMask mask="(99)9999-9999" type="text" name="phone" id="phone" onChange={handleInputChange} placeholder="Ex.: (41)9999-9999" />
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
                required
              >
                <option disabled value="0">Selecione um estado ▼</option>
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
                required
              >
                <option disabled value="0">Selecione uma cidade ▼</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="cep">CEP</label>
              <InputMask mask="99.999-999" type="text" name="cep" id="cep" onChange={handleInputChange} required placeholder="Ex.: 81.900-456" />
            </div>

            <div className="field">
              <label htmlFor="number">Número do imóvel</label>
              <input type="text" name="number" id="number" onChange={handleInputChange} placeholder="Ex.: 1900" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="street">Nome da rua</label>
            <input type="text" name="street" id="street" onChange={handleInputChange} required placeholder="Ex.: Rua Julio Peréz" />
          </div>

          <div className="field">
            <label htmlFor="complement">Complemento</label>
            <input type="text" name="complement" id="complement" onChange={handleInputChange} required placeholder="Ex.: Casa branca" />
          </div>

        </fieldset>

        <fieldset>
          <legend>
            <h2>Categorias de serviço</h2>
            <span>Selecione uma ou mais categorias</span>
          </legend>

          <ul className="items-grid">
            {items.map(item =>
              (<li key={item.id} onClick={() => handleSelectItem(item.id)} className={selectedItems.includes(item.id) ? 'selected' : ''}>
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

          <MultiSelect
            options={options}
            value={selectedOptions}
            onChange={setSelectedOptions}
            labelledBy={"Select"}
            overrideStrings={internacionalization}
          />

        </fieldset>

        <button className="btn-submit" type="submit">Cadastrar estabelecimento</button>
      </form>
    </div>
  );
};

export default CreatePoint;
