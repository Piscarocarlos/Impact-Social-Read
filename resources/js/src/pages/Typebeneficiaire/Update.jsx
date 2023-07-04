import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
export default function Create(){

    const { beneficiaires } = usePage().props;

    const { data, put, setData, processing, errors } = useForm({
        type_beneficiary: beneficiaires.type_beneficiary,
        id:beneficiaires.id
    })

    const submit = (e) => {
        e.preventDefault();
        put(route('dashboard.type-beneficiaire.update',beneficiaires.id), {

        })
    }

  return (
    <DefaultLayout>
      <div >
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Type de bénéficiare</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className="md:w-3/5 sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Modification </h2>
                <form onSubmit={submit}>
                  <div className="grid gap-3">
                    <div className="my-2">
                      <label htmlFor="name" className="text-base">Nom du type de bénéficiare <span className='text-danger'>*</span></label>
                      <input type="text" value={data.type_beneficiary} onChange={e => setData('type_beneficiary', e.target.value)} className="form-input" placeholder="Type de bénéficiaire" />
                      {errors.type_beneficiary && <div className="text-danger">{errors.type_beneficiary}</div>}
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
