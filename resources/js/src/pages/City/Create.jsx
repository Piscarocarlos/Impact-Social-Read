import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';

export default function Create(){
  const { data, post, setData, processing, errors } = useForm({
    province: "",
    ville:"",
  })
  const { provinces } = usePage().props;
  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.villes.store'), {

    })
  }

  return (
    <DefaultLayout>
      <div >
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Ville</h5>
        </div>
        <div className="datatables grid grid-rows-3">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className="md:w-3/5 sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Créer une ville</h2>
                <form onSubmit={submit}>
                  <div className="grid gap-3">
                    <div className="my-2">
                      <label htmlFor="ville" className="text-base">Nom de la ville</label>
                      <input type="text" value={data.ville} onChange={e => setData('ville', e.target.value)} className="form-input border-dark " placeholder="Nom de la ville" />
                      {errors.ville && <div className="text-danger">{errors.ville}</div>}
                    </div>
                    <div className="my-2">
                        <label htmlFor="province" className='text-base'>Section</label>
                        <select type="text" value={data.province} onChange={e => setData('province', e.target.value)} className="form-select" placeholder="Nom de la permission" >
                            <option defaultValue={'selected'}>Selectionner une province</option>
                            {provinces.map(item => (
                              <option key={item.id} value={item.id}>{item.name_province}</option>
                            ))}
                        </select>
                        {errors.province && <div className="text-danger">{errors.province}</div>}
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
