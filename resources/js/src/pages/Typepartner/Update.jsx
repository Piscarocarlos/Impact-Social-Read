import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';

export default function Create(){
    
    const { partenaires } = usePage().props;

    const { data, put, setData, processing, errors } = useForm({
        type_partner: partenaires.type_partner,
        id:partenaires.id
    })

    const submit = (e) => {
        e.preventDefault();
        put(route('dashboard.liste-partenaire-type.update',partenaires.id), {

        })
    }

  return (
    <DefaultLayout>
      <div >
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Type de partenaire</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className="md:w-3/5 sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Modification </h2>
                <form onSubmit={submit}>
                  <div className="grid gap-3">
                    <div className="my-2">
                      <label htmlFor="type_partner" className="text-base">Type de partenaire <span className='text-danger'>*</span></label>
                      <input type="text" value={data.type_partner} onChange={e => setData('type_partner', e.target.value)} className="form-input" placeholder="Type de partenaire" />
                      {errors.type_partner && <div className="text-danger">{errors.type_partner}</div>}
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
