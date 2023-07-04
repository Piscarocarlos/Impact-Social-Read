import React, { useState } from 'react'
import DefaultLayout from '../../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
export default function Create(){
  
    const { sectionfr } = usePage().props;
  const { data, post, setData, processing, errors } = useForm({
    msg_no_candidature :"",
    msg_candidature_cours :"",
    msg_candidature_attente :"",
    msg_info_candidature :"",
    section_one_id:""
  })

  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.section-one-candidate-ar.store'), {

    })
  }

  return (
    <DefaultLayout>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Les messages de notification en arabe</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Création</h2>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="my-2">
                            <label htmlFor="section_one_id" className="text-base">Ligne de correspondance en français</label>
                            <select type="text" value={data.section_one_id} onChange={e => setData('section_one_id', e.target.value)} className="form-select"  >
                                <option defaultValue={'selected'}>Sélectionner une ligne</option>
                                {sectionfr.map(item => (
                                <option key={item.id} value={item.id}>{item.msg_no_candidature}</option>
                                ))}
                            </select>
                            {errors.section_one_id && <div className="text-danger">{errors.section_one_id}</div>}
                        </div>
                      </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="msg_no_candidature" className="text-base">Message pour des personnes qui n'ont pas encore déposé la candidature  <span className='text-danger'>*</span></label>
                            <textarea type="text" value={data.msg_no_candidature} onChange={e => setData('msg_no_candidature', e.target.value)} className="form-input" />
                            {errors.msg_no_candidature && <div className="text-danger">{errors.msg_no_candidature}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="msg_candidature_cours" className="text-base">Message pour des personnes qui ont la candidature en attente de complément <span className='text-danger'>*</span></label>
                            <textarea type="text" value={data.msg_candidature_cours} onChange={e => setData('msg_candidature_cours', e.target.value)} className="form-input" />
                            {errors.msg_candidature_cours && <div className="text-danger">{errors.msg_candidature_cours}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="msg_candidature_attente" className="text-base">Message pour des personnes qui ont bien finalisé avec leur candidature <span className='text-danger'>*</span></label>
                            <textarea type="text" value={data.msg_candidature_attente} onChange={e => setData('msg_candidature_attente', e.target.value)} className="form-input" />
                            {errors.msg_candidature_attente && <div className="text-danger">{errors.msg_candidature_attente}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="msg_info_candidature" className="text-base">Message concernant l'ouverture et la fermeture de la candidature <span className='text-danger'>*</span></label>
                            <textarea type="text" value={data.msg_info_candidature} onChange={e => setData('msg_info_candidature', e.target.value)} className="form-input" />
                            {errors.msg_info_candidature && <div className="text-danger">{errors.msg_info_candidature}</div>}
                        </div>
                    </div>
                   
                    <div className="grid  gap-3 pt-4">
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
