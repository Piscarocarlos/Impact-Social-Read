import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';

export default function Create(){
  const { data, post, setData, processing, errors } = useForm({
    title: "",
    description:"",
  })

  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.statut-convention.store'), {

    })
  }

  return (
    <DefaultLayout>
      <div >
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Statut des conventions</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className="md:w-3/5 sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Créer un statut </h2>
                <form onSubmit={submit}>
                  <div className="grid gap-3">
                    <div className="my-2">
                      <label htmlFor="title" className="text-base">Titre du statut <span className='text-danger'>*</span></label>
                      <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} className="form-input" placeholder="Titre du statut" />
                      {errors.title && <div className="text-danger">{errors.title}</div>}
                    </div>
                    <div className="my-2">
                      <label htmlFor="description" className="text-base">Description <span className='text-danger'>*</span></label>
                      <textarea type="text" value={data.description} onChange={e => setData('description', e.target.value)} className="form-input" placeholder="Description" />
                      {errors.description && <div className="text-danger">{errors.description}</div>}
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
