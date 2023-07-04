import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';


export default function Create({reporting}){
  const { data, put, setData, processing, errors } = useForm({
   type: reporting.type,
  })

  const submit = (e) => {
    e.preventDefault();
    put(route('dashboard.model-reporting.update',reporting.id), {

    })
  }

  return (
    <DefaultLayout>
      <div >
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Modèle de reporting</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className="md:w-3/5 sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Modification </h2>
                <form onSubmit={submit}>
                  <div className="grid gap-3">
                    <div className="my-2">
                      <label htmlFor="type" className="text-base">Type de modèle <span className='text-danger'>*</span></label>
                      <input type="text" value={data.type} onChange={e => setData('type', e.target.value)} className="form-input" placeholder="Type de modèle" />
                      {errors.type && <div className="text-danger">{errors.type}</div>}
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
