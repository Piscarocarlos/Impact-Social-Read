import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';

export default function Create(){
  const { data, post, setData, processing, errors } = useForm({
    name_type: "",
  })

  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.type-orphelin.store'), {
    })
  }

  return (
    <DefaultLayout>
      <div >
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Type d'orphelin</h5>
        </div>
        <div className="datatables grid grid-rows-3">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className="md:w-3/5 sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Créer un cas d'orphelin</h2>
                <form onSubmit={submit}>
                  <div className="grid gap-3">
                    <div className="my-2">
                      <label htmlFor="name" className="text-base">Type d'orphelin <span className='text-danger'>*</span></label>
                      <input type="text" value={data.name_type} onChange={e => setData('name_type', e.target.value)} className="form-input border-dark " placeholder="Type d'orphelin" />
                      {errors.name_type && <div className="text-danger">{errors.name_type}</div>}
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
