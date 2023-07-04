import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';

export default function Create(){
    
    const { type_partenaires } = usePage().props;

    const { data, post, setData, processing, errors } = useForm({
        name_categorie: "",
        type_partner:""
    })

    const submit = (e) => {
        e.preventDefault();
        post(route('dashboard.liste-categorie-partenaire.store'), {

        })
    }

  return (
    <DefaultLayout>
      <div >
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Catégorie</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className="md:w-3/5 sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Créer une catégorie </h2>
                <form onSubmit={submit}>
                  <div className="grid gap-3">
                    <div className="my-2">
                        <label htmlFor="type_partner" className='text-base'>Type de partenaire <span className='text-danger'>*</span></label>
                        <select type="text" value={data.type_partner} onChange={e => setData('type_partner', e.target.value)} className="form-select" placeholder="" >
                            <option defaultValue={'selected'}>Selectionner un type de partenaire</option>
                            {type_partenaires.map(item => (
                              <option key={item.id} value={item.id}>{item.type_partner}</option>
                            ))}
                        </select>
                        {errors.type_partner && <div className="text-danger">{errors.type_partner}</div>}
                    </div>
                    <div className="my-2">
                      <label htmlFor="name" className="text-base">Nom de la catégorie</label>
                      <input type="text" value={data.name_categorie} onChange={e => setData('name_categorie', e.target.value)} className="form-input" placeholder="Nom de la catégorie" />
                      {errors.name_categorie && <div className="text-danger">{errors.name_categorie}</div>}
                    </div>
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
