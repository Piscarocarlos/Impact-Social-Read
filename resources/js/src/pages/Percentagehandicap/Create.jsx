import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

export default function Create() {
  const { data, post, setData, processing, errors } = useForm({
    pourcentage: "",
  })

  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.pourcentage-handicap.store'), {
      onSuccess: () => {
        // toast.success("jp^m")
      }
    })
  }

  return (
    <DefaultLayout>
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Pourcentage  d'handicap</h5>
        </div>
        <div className="datatables ">
          <div className=" flex justify-center flex-nowrap dark:text-white gap-4">
            <div className="md:w-3/5 sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Créer un pourcentage</h2>
                <form onSubmit={submit}>
                  <div className="grid gap-3">
                    <div className="my-2">
                      <label htmlFor="pourcentage" className="text-base">Pourcentage <span className='text-danger'>*</span></label>
                      <input type="text" value={data.pourcentage} onChange={e => setData('pourcentage', e.target.value)} className="form-input border-dark " placeholder="Pourcentage" />
                      {errors.pourcentage && <div className="text-danger">{errors.pourcentage}</div>}
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
    </DefaultLayout>
  )
}
