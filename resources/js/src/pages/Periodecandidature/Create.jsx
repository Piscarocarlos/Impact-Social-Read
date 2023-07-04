import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';

export default function Create(){
  const { data, post, setData, processing, errors } = useForm({
    date_debut: "",
    date_fin:"",
  })

  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.periode-candidature.store'), {

    })
  }

  return (
    <DefaultLayout>
      <div >
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Périodes de candidature</h5>
        </div>
        <div className="datatables grid grid-rows-3">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className="md:w-3/5 sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Créer une une période</h2>
                <form onSubmit={submit}>
                  <div className="grid gap-3">
                    <div className="my-2">
                      <label htmlFor="date_debut" className="text-base">Date de début</label>
                      <input type="date" value={data.date_debut} onChange={e => setData('date_debut', e.target.value)} className="form-input border-dark " placeholder="" />
                      {errors.date_debut && <div className="text-danger">{errors.date_debut}</div>}
                    </div>
                    <div className="my-2">
                        <label htmlFor="date_fin" className='text-base'>Date fin</label>
                        <input type="date" value={data.date_fin} onChange={e => setData('date_fin', e.target.value)} className="form-input border-dark " placeholder="" />
                        {errors.date_fin && <div className="text-danger">{errors.date_fin}</div>}
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
