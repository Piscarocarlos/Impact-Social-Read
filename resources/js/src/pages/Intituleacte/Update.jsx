import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';

export default function Create(){
    
    const { actes } = usePage().props;
  const { data, put, setData, processing, errors } = useForm({
    title: actes.title,
  })

  const submit = (e) => {
    e.preventDefault();
    put(route('dashboard.intitule-acte.update',actes.id), {

    })
  }

  return (
    <DefaultLayout>
      <div >
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Les intitulés de actes</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className="md:w-3/5 sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Création </h2>
                <form onSubmit={submit}>
                  <div className="grid gap-3">
                    <div className="my-2">
                      <label htmlFor="title" className="text-base">Intitulé d'acte <span className='text-danger'>*</span></label>
                      <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="form-input" placeholder="Intitulé d'acte" />
                      {errors.title && <div className="text-danger">{errors.title}</div>}
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
