import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';

export default function Create(){
  const { data, post, setData, processing, errors } = useForm({
    year_bac: "",
  })

  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.annees-bac.store'), {
    })
  }

  return (
    <DefaultLayout>
      <div >
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Années baccalauréat</h5>
        </div>
        <div className="datatables grid grid-rows-3">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className="md:w-3/5 sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Créer une année du bac</h2>
                <form onSubmit={submit}>
                  <div className="grid gap-3">
                    <div className="my-2">
                      <label htmlFor="name" className="text-base">Entrez une année</label>
                      <input type="text" value={data.year_bac} onChange={e => setData('year_bac', e.target.value)} className="form-input border-dark " placeholder="Année du bac" />
                      {errors.year_bac && <div className="text-danger">{errors.year_bac}</div>}
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
