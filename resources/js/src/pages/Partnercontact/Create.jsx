import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';

export default function Create(){
    const { partner,civilite } = usePage().props;

  const { data, post, setData, processing, errors } = useForm({
    name:"",
    first_name:"",
    function:"",
    title:"",
    civility:"",
    email:"",
    phone_mobile:"",
    phone_fixe:"",
    profil_linkedin:"",
  })

  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.contact-partenaires.store'), {

    })
  }

  return (
    <DefaultLayout>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Contact</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Créer un contact</h2>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="name" className="text-base">Nom du contact <span className='text-danger'>*</span></label>
                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="form-input " placeholder="Nom du contact" />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="first_name" className="text-base">Prénom du contact <span className='text-danger'>*</span></label>
                            <input type="text" value={data.first_name} onChange={e => setData('first_name', e.target.value)} className="form-input " placeholder="Prénom du contact" />
                            {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="function" className="text-base">Fonction</label>
                            <input type="text" value={data.function} onChange={e => setData('function', e.target.value)} className="form-input " placeholder="Fonction" />
                            {errors.function && <div className="text-danger">{errors.function}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="title" className="text-base">Titre</label>
                            <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="form-input " placeholder="Titre" />
                            {errors.title && <div className="text-danger">{errors.title}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="civility" className="text-base">Civilité <span className='text-danger'>*</span></label>
                            <select type="text" value={data.civility} onChange={e => setData('civility', e.target.value)} className="form-select" placeholder="Nom de la permission" >
                                <option defaultValue={'selected'}>Sélectionner une civilité</option>
                                {civilite.map(item => (
                                <option key={item.id} value={item.type_civility}>{item.type_civility}</option>
                                ))}
                            </select>
                            {errors.civility && <div className="text-danger">{errors.civility}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="email" className="text-base">Adresse email <span className='text-danger'>*</span></label>
                            <input type="text" value={data.email} onChange={e => setData('email', e.target.value)} className="form-input " placeholder="Adresse email" />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="phone_mobile" className="text-base">Téléphone 1 <span className='text-danger'>*</span></label>
                            <input type="text" value={data.phone_mobile} onChange={e => setData('phone_mobile', e.target.value)} className="form-input " placeholder="Téléphone 1" />
                            {errors.phone_mobile && <div className="text-danger">{errors.phone_mobile}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="phone_fixe" className="text-base">Téléphone 2</label>
                            <input type="text" value={data.phone_fixe} onChange={e => setData('phone_fixe', e.target.value)} className="form-input " placeholder="Téléphone 2" />
                            {errors.phone_fixe && <div className="text-danger">{errors.phone_fixe}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="profil_linkedin" className="text-base">Lien profil linkedin</label>
                            <input type="text" value={data.profil_linkedin} onChange={e => setData('profil_linkedin', e.target.value)} className="form-input " placeholder="Lien profil linkedin" />
                            {errors.profil_linkedin && <div className="text-danger">{errors.profil_linkedin}</div>}
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
