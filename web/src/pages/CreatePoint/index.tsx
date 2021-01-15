import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import InputMask from "react-input-mask";
import MultiSelect from "react-multi-select-component";
import { LeafletMouseEvent } from "leaflet";
import { Translate } from '../../Internacionalization/PR_BR';

import api from '../../services/api'

import "./styles.css";

import logo from "../../assets/logo.svg";

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
    { label: "Adestramento", value: "adestramento" },
    { label: "Adoção", value: "adoção" },
    { label: "Atendimento domiciliar", value: "atendimento domiciliar" },
    { label: "Banho", value: "banho" },
    { label: "Cirurgias", value: "cirurgias" },
    { label: "Consultas clínicas gerais e especialidades", value: "consultas clínicas gerais e especialidades" },
    { label: "Corte de unhas", value: "corte de unhas" },
    { label: "Desembaraçamento", value: "desembaraçamento" },
    { label: "Escovação de dentes", value: "Escovação de dentes" },
    { label: "Exames preventivos ", value: "preventivos" },
    { label: "Farmácia", value: "farmácia" },
    { label: "Hidratação", value: "hidratação" },
    { label: "Hospedagem", value: "hospedagem" },
    { label: "Hotel", value: "hotel" },
    { label: "Limpeza de ouvido", value: "limpeza de ouvido" },
    { label: "Passeador", value: "passeador" },
    { label: "Pet Sitter", value: "pet Sitter" },
    { label: "Taxi dog", value: "taxi dog" },
    { label: "Tingimento dos pelos", value: "tingimento dos pelos" },
    { label: "Tosa higiênica", value: "tosa higiênica" },
    { label: "Tosa na máquina", value: "tosa na máquina" },
    { label: "Tosa na tesoura", value: "tosa na tesoura" },
    { label: "Vacinação", value: "vacinação" },
    { label: "Venda de acessórios", value: "Venda de acessórios" },
    { label: "Venda de rações", value: "Venda de rações" },
  ];

  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])

  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])

  const internacionalization = {
    "selectSomeItems": "Selecione aqui todos os serviços que realiza",
    "allItemsAreSelected": "Todos os itens estão selecionados.",
    "selectAll": "Selecionar todos",
    "search": "Pesquisar",
    "clearSearch": "Limpar pesquisa"
  }

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    })
  }, [])

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

    alert(Translate.map(app => app.CreatePoint.SUCCESS_MESAGE).toString());

    history.push('/')

  }

  // Página HTML em TSX
  return (
    <div id="page-create-point">
      <header>
        <img className="width-15" src={logo} alt="I-PET" />

        <Link to="/">
          <FiArrowLeft />
          {Translate.map(app => app.CreatePoint.BACK_HOME)}
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>{Translate.map(app => app.CreatePoint.NEW_POINT)}</h1>

        <fieldset>
          <legend>
            <h2>{Translate.map(app => app.CreatePoint.DATA)}</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">{Translate.map(app => app.CreatePoint.POINT_NAME)}</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
              required
              placeholder={Translate.map(app => app.CreatePoint.POINT_NAME_EXAMPLE).toString()}
            />
          </div>

          <div className="field">
            <label htmlFor="email">{Translate.map(app => app.CreatePoint.EMAIL)}</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
              required
              placeholder={Translate.map(app => app.CreatePoint.EMAIL_EXAMPLE).toString()}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="whatsapp">{Translate.map(app => app.CreatePoint.WHATSAPP)}</label>
              <InputMask
                mask="(99)99999-9999"
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
                required
                placeholder="Ex.: (41)99999-9999"
              />
            </div>

            <div className="field">
              <label htmlFor="phone">{Translate.map(app => app.CreatePoint.PHONE)}</label>
              <InputMask
                mask="(99)9999-9999"
                type="text"
                name="phone"
                id="phone"
                onChange={handleInputChange}
                placeholder="Ex.: (41)9999-9999"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>{Translate.map(app => app.CreatePoint.ADDRESS)}</h2>
            <span>{Translate.map(app => app.CreatePoint.SELECT_ADDRESS)}</span>
          </legend>

          <Map center={initialPosition} zoom={16} onclick={handleMapClick}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">{Translate.map(app => app.CreatePoint.STATE)}</label>
              <select
                name="uf"
                id="uf"
                value={selectedUf}
                onChange={handleSelectUf}
                required
              >
                <option disabled value="0">{Translate.map(app => app.CreatePoint.SELECT_STATE)}</option>
                {ufs.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">{Translate.map(app => app.CreatePoint.CITY)}</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
                required
              >
                <option disabled value="0">{Translate.map(app => app.CreatePoint.SELECT_CITY)}</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="cep">{Translate.map(app => app.CreatePoint.POSTAL_CODE)}</label>
              <InputMask
                mask="99.999-999"
                type="text"
                name="cep"
                id="cep"
                onChange={handleInputChange}
                required
                placeholder="Ex.: 81.900-456"
              />
            </div>

            <div className="field">
              <label htmlFor="number">{Translate.map(app => app.CreatePoint.HOUSE_NUMBER)}</label>
              <input
                type="text"
                name="number"
                id="number"
                onChange={handleInputChange}
                placeholder="Ex.: 1900"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="street">{Translate.map(app => app.CreatePoint.STREET)}</label>
            <input
              type="text"
              name="street"
              id="street"
              onChange={handleInputChange}
              required
              placeholder={Translate.map(app => app.CreatePoint.STREET_EXAMPLE).toString()}
            />
          </div>

          <div className="field">
            <label htmlFor="complement">{Translate.map(app => app.CreatePoint.COMPLEMENT)}</label>
            <input
              type="text"
              name="complement"
              id="complement"
              onChange={handleInputChange}
              required
              placeholder={Translate.map(app => app.CreatePoint.COMPLEMENT_EXAMPLE).toString()}
            />
          </div>

        </fieldset>

        <fieldset>
          <legend>
            <h2>{Translate.map(app => app.CreatePoint.SERVICE_CATEGORY)}</h2>
            <span>{Translate.map(app => app.CreatePoint.SERVICE_CATEGORY)}</span>
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
            <h2>{Translate.map(app => app.CreatePoint.OTHER_SERVICES)}</h2>
          </legend>

          <MultiSelect
            options={options}
            value={selectedOptions}
            onChange={setSelectedOptions}
            labelledBy={"Select"}
            overrideStrings={internacionalization}
          />
        </fieldset>

        <button className="btn-submit" type="submit">{Translate.map(app => app.CreatePoint.SUBMIT)}</button>
      </form>
    </div>
  );
};

export default CreatePoint;
