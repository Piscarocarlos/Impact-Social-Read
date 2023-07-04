import React, { useState,useEffect } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
import Select from 'react-select';

export default function Create({ categories, sources, pays, contact, users, partner }) {

  const [selectedContact, setSelectedContact] = useState([]);

  const { data, post, setData, processing, errors } = useForm({
    name_partner: "",
    categorie_partner: "",
    adresse_partner: "",
    region_partner: "",
    ville_partner: "",
    pays_partner: "",
    web_site_partner: "",
    tel_standard_partner: "",
    likedin_partner: "",
    source_partner: "",
    contact: "",
    //user_id:"",
    tag: "",
    email:''
  })

  const option = contact.map(item => (
    { key: item.id, "value": item.id, "label": item.name }
  ));

  const handleContactChange = (event) => {
    data.contact = event
  };

  const dataUserPartnerId = partner.map((item) => {
    return item.user_id
  }
  )

  const elementsDifferents = users.filter((element, index) => {
    return element.id !== dataUserPartnerId[index];
  });
  const options3 = elementsDifferents.map(item => (
    { key: item.id, "value": item.id, "label": item.name + ' | ' + item.email }
  ));

  const handelUserId = (e) => {
    const val = e
    data.user_id = val['key']
    //console.log("valeur h : ", data.user_id);
  }
  const handelTag = (e) => {
    setData('tag',e.target.value)
    //data.tag=e.target.value
  }
  useEffect(()=>{
    if(data.tag==0){
      data.email=""
    }
  },[data.tag])


  const submit = (e) => {
    e.preventDefault();
    setData("contact", selectedContact),
      post(route('dashboard.liste-partenaire.store'), {

      })
  }

  return (
    <DefaultLayout>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Partenaires</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Créer un partenaire</h2>
                <form onSubmit={submit}>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="my-2">
                      <label htmlFor="name_partner" className="text-base">Nom du partenaire</label>
                      <input type="text" value={data.name_partner} onChange={e => setData('name_partner', e.target.value)} className="form-input  " placeholder="Nom du partenaire" />
                      {errors.name_partner && <div className="text-danger">{errors.name_partner}</div>}
                    </div>
                    <div className="my-2">
                      <label htmlFor="categorie_partner" className="text-base">Catégorie du partenaire</label>
                      <select type="text" value={data.categorie_partner} onChange={e => setData('categorie_partner', e.target.value)} className="form-select" placeholder="Nom de la permission" >
                        <option defaultValue={'selected'}>Sélectionner une categorie</option>
                        {categories.map(item => (
                          <option key={item.id} value={item.name_categorie}>{item.name_categorie}</option>
                        ))}
                      </select>
                      {errors.categorie_partner && <div className="text-danger">{errors.categorie_partner}</div>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="my-2">
                      <label htmlFor="adresse_partner" className="text-base">Adresse partenaire</label>
                      <input type="text" value={data.adresse_partner} onChange={e => setData('adresse_partner', e.target.value)} className="form-input  " placeholder="Adresse partenaire" />
                      {errors.adresse_partner && <div className="text-danger">{errors.adresse_partner}</div>}
                    </div>
                    <div className="my-2">
                      <label htmlFor="region_partner" className="text-base">Région partenaire</label>
                      <input type="text" value={data.region_partner} onChange={e => setData('region_partner', e.target.value)} className="form-input  " placeholder="Région partenaire" />
                      {errors.region_partner && <div className="text-danger">{errors.region_partner}</div>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="my-2">
                      <label htmlFor="ville_partner" className="text-base">Ville partenaire</label>
                      <input type="text" value={data.ville_partner} onChange={e => setData('ville_partner', e.target.value)} className="form-input  " placeholder="Ville partenaire" />
                      {errors.ville_partner && <div className="text-danger">{errors.ville_partner}</div>}
                    </div>
                    <div className="my-2">
                      <label htmlFor="pays_partner" className="text-base">Pays partenaire</label>
                      <select type="text" value={data.pays_partner} onChange={e => setData('pays_partner', e.target.value)} className="form-select" placeholder="Nom de la permission" >
                        <option defaultValue={'selected'}>Sélectionner une categorie</option>
                        {pays.map(item => (
                          <option key={item.id} value={item.fr}>{item.fr}</option>
                        ))}
                      </select>
                      {errors.pays_partner && <div className="text-danger">{errors.pays_partner}</div>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="my-2">
                      <label htmlFor="web_site_partner" className="text-base">Site web partenaire</label>
                      <input type="text" value={data.web_site_partner} onChange={e => setData('web_site_partner', e.target.value)} className="form-input  " placeholder="Site web partenaire" />
                      {errors.web_site_partner && <div className="text-danger">{errors.web_site_partner}</div>}
                    </div>
                    <div className="my-2">
                      <label htmlFor=" tel_standard_partner" className="text-base">Téléphone standard</label>
                      <input type="text" value={data.tel_standard_partner} onChange={e => setData('tel_standard_partner', e.target.value)} className="form-input  " placeholder="Téléphone standard" />
                      {errors.tel_standard_partner && <div className="text-danger">{errors.tel_standard_partner}</div>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="my-2">
                      <label htmlFor="likedin_partner" className="text-base">Page linkedin partenaire</label>
                      <input type="text" value={data.likedin_partner} onChange={e => setData('likedin_partner', e.target.value)} className="form-input  " placeholder="Page linkedin partenaire" />
                      {errors.likedin_partner && <div className="text-danger">{errors.likedin_partner}</div>}
                    </div>
                    <div className="my-2">
                      <label htmlFor="source_partner" className="text-base">Sources</label>
                      <select type="text" value={data.source_partner} onChange={e => setData('source_partner', e.target.value)} className="form-select" placeholder="Nom de la permission" >
                        <option defaultValue={'selected'}>Sélectionner une source</option>
                        {sources.map(item => (
                          <option key={item.id} value={item.type_source}>{item.type_source}</option>
                        ))}
                      </select>
                      {errors.source_partner && <div className="text-danger">{errors.source_partner}</div>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="my-2 custom-select">
                      <label htmlFor="contact" className="text-base">Contact partenaire</label>
                      <Select options={option} multiple={true} onChange={handleContactChange} type="text" isMulti isSearchable={false} defaultValue={data.contact} placeholder="Sélectionner les contacts" />
                      {errors.contact && <div className="text-danger">{errors.contact}</div>}
                    </div>
                    {/*<div className="my-2">
                      <label htmlFor="user_id" className="text-base">Choisir le compte du partenaire</label>
                      <Select placeholder="Sélectionner" onChange={handelUserId}  defaultValue={data.user_id} type="text" options={options3} isSearchable={true}/>
                      {errors.user_id && <div className="text-danger">{errors.user_id}</div>}
                        </div>*/}
                    <div className="my-2">
                      <label htmlFor="source_partner" className="text-base">Le partenaire souhaite avoir un compte ?</label>
                      <select type="text" value={data.tag} onChange={handelTag} className="form-select" placeholder="Nom de la permission" >
                        <option defaultValue={'selected'}>Sélectionner une source</option>
                        <option value="1">Oui</option>
                        <option value="0">Non</option>
                      </select>
                      {errors.tag && <div className="text-danger">{errors.tag}</div>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {
                      data.tag==1?
                      <div className="my-2">
                      <label htmlFor="email" className="text-base">Adresse email de connexion</label>
                      <input type="text" value={data.email} onChange={e => setData('email', e.target.value)} className="form-input  " placeholder="Adresse email" />
                      {errors.email && <div className="text-danger">{errors.email}</div>}
                      </div>:null
                    }
                  </div>
                  <div className="grid  gap-3 pt-4">
                    <button type="submit" className="btn bg-lime-500 text-white border-lime-500">
                      <FiSave className="mr-4 rtl:order-2" />
                      <span>Sauvegarder</span>
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
