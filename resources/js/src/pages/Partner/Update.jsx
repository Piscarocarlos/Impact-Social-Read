import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
import Select from 'react-select';

export default function Create(){
    const { categories,sources,pays,partner,contact} = usePage().props;
    const [selectedContact, setSelectedContact] = useState([]);

  const { data, put, setData, processing, errors } = useForm({
    name_partner:partner.name_partner,
    categorie_partner:partner.categorie_partner,
    adresse_partner:partner.adresse_partner,
    region_partner:partner.region_partner,
    ville_partner:partner.ville_partner,
    pays_partner:partner.pays_partner,
    web_site_partner:partner.web_site_partner,
    tel_standard_partner:partner.tel_standard_partner,
    likedin_partner:partner.likedin_partner,
    source_partner:partner.source_partner,
    id:partner.id,
    contact:JSON.parse(partner.contact_partner_id),
  })

  const option=contact.map(item => (
    { key:item.id, "value": item.id, "label":item.name }
  ));

  const handleContactChange = (event) => {
    const selectedValues = [];
    data.contact=event
    setSelectedContact(selectedValues);
  };

  const submit = (e) => {
    e.preventDefault();
    setData("contact",selectedContact),
    put(route('dashboard.liste-partenaire.update',partner.id), {

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
                <h2 className="text-lg mb-3 font-bold">Modification</h2>
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
                            {errors. tel_standard_partner && <div className="text-danger">{errors. tel_standard_partner}</div>}
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
                    <div className="grid grid-cols-1 gap-3">
                        <div className="my-2 custom-select">
                            <label htmlFor="contact" className="text-base">Contact partenaire</label>
                            <Select options={option} multiple={true} onChange={handleContactChange} type="text" isMulti isSearchable={false}  defaultValue={data.contact}    placeholder="Sélectionner les contacts" />
                            {errors.contact && <div className="text-danger">{errors.contact}</div>}
                        </div>
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
