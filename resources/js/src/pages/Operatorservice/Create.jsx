import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';

export default function Create(){
    const { operator } = usePage().props;

  const { data, post, setData, processing, errors } = useForm({
    name_operator:"",
    type_operator:"",
    phone:"",
    email:"",
    adresse:"",
    ville:"",
    rib:"",
    ice:"",
  })

  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.operateur-service.store'), {

    })
  }

  return (
    <DefaultLayout>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Opérateur de service</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Créer un opérateur</h2>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="name_operator" className="text-base">Nom <span className='text-danger'>*</span></label>
                            <input type="text" value={data.name_operator} onChange={e => setData('name_operator', e.target.value)} className="form-input" placeholder="Nom" />
                            {errors.name_operator && <div className="text-danger">{errors.name_operator}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="type_operator" className="text-base">Type d'opérateur <span className='text-danger'>*</span></label>
                            <select type="text" value={data.type_operator} onChange={e => setData('type_operator', e.target.value)} className="form-select" placeholder="Nom de la permission" >
                                <option defaultValue={'selected'}>Sélectionner...</option>
                                {operator.map(item => (
                                <option key={item.id} value={item.type_operator}>{item.type_operator}</option>
                                ))}
                            </select>
                            {errors.type_operator && <div className="text-danger">{errors.type_operator}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="phone" className="text-base">Téléphone <span className='text-danger'>*</span></label>
                            <input type="text" value={data.phone} onChange={e => setData('phone', e.target.value)} className="form-input" placeholder="Téléphone" />
                            {errors.phone && <div className="text-danger">{errors.phone}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="email" className="text-base">Adresse email <span className='text-danger'>*</span></label>
                            <input type="text" value={data.email} onChange={e => setData('email', e.target.value)} className="form-input" placeholder="Adresse email" />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="adresse" className="text-base">Adresse <span className='text-danger'>*</span></label>
                            <input type="text" value={data.adresse} onChange={e => setData('adresse', e.target.value)} className="form-input" placeholder="Adresse" />
                            {errors.adresse && <div className="text-danger">{errors.adresse}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="ville" className="text-base">Ville <span className='text-danger'>*</span></label>
                            <input type="text" value={data.ville} onChange={e => setData('ville', e.target.value)} className="form-input" placeholder="Ville" />
                            {errors.ville && <div className="text-danger">{errors.ville}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="rib" className="text-base">Rib <span className='text-danger'>*</span></label>
                            <input type="text" value={data.rib} onChange={e => setData('rib', e.target.value)} className="form-input" placeholder="Rib" />
                            {errors.rib && <div className="text-danger">{errors.rib}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="ice" className="text-base">Ice <span className='text-danger'>*</span></label>
                            <input type="text" value={data.ice} onChange={e => setData('ice', e.target.value)} className="form-input" placeholder="Ice" />
                            {errors.ice && <div className="text-danger">{errors.ice}</div>}
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
