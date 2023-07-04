import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';

export default function Create(){

    const { durations } = usePage().props;

    const { data, put, setData, processing, errors } = useForm({
        type_duration: durations.type_duration,
        id:durations.id
    })

    const submit = (e) => {
        e.preventDefault();
        put(route('dashboard.duration-convention.update',durations.id), {

        })
    }

  return (
    <DefaultLayout>
      <div >
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Durée de convention</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className="md:w-3/5 sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Modification </h2>
                <form onSubmit={submit}>
                  <div className="grid gap-3">
                    <div className="my-2">
                      <label htmlFor="type_duration" className="text-base">Nom de la durée <span className='text-danger'>*</span></label>
                      <select type="text" value={data.type_duration} onChange={e => setData('type_duration', e.target.value)} className="form-select" placeholder="Sélectionner...." >
                                <option defaultValue={'selected'}>Sélectionner une durée</option>
                                <option value="MONO-COHORTE FERME">MONO-COHORTE FERME</option>
                                <option value="PLURI-COHORTE">PLURI-COHORTE</option>
                                <option value="ANNUELLE RENOUVELABLE">ANNUELLE RENOUVELABLE</option>
                                <option value="ANNUELLE FERME">ANNUELLE FERME</option>
                                <option value="OUVERTE">OUVERTE</option>
                      </select>
                      {errors.type_duration && <div className="text-danger">{errors.type_duration}</div>}
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
