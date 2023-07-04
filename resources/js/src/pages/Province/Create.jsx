import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';

export default function Create(){
  const { data, post, setData, processing, errors } = useForm({
    province: "",
    region:"",
  })
  //Les data renvoyées par inertia
  const { regions } = usePage().props;

  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.provinces.store'), {

    })
  }

  return (
    <DefaultLayout>
      <div >
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Province</h5>
        </div>
        <div className="datatables grid grid-rows-3">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className="md:w-3/5 sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Créer une province</h2>
                <form onSubmit={submit}>
                  <div className="grid gap-3">
                    <div className="my-2">
                      <label htmlFor="province" className="text-base">Nom de la province</label>
                      <input type="text" value={data.province} onChange={e => setData('province', e.target.value)} className="form-input border-dark " placeholder="Nom de la province" />
                      {errors.province && <div className="text-danger">{errors.province}</div>}
                    </div>
                    <div className="my-2">
                        <label htmlFor="region" className='text-base'>Section</label>
                        <select type="text" value={data.region} onChange={e => setData('region', e.target.value)} className="form-select" placeholder="Nom de la permission" >
                            <option defaultValue={'selected'}>Selectionner une région</option>
                            {regions.map(item => (
                              <option key={item.id} value={item.id}>{item.name_region}</option>
                            ))}
                        </select>
                        {errors.region && <div className="text-danger">{errors.region}</div>}
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
