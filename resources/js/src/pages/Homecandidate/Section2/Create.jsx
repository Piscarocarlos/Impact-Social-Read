import React, { useState } from 'react'
import DefaultLayout from '../../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';

export default function Create(){
  

  const { data, post, setData, processing, errors } = useForm({
    titre :"",
    description :"",
    lin_video :"",
 
  })

  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.section-two-candidate.store'), {

    })
  }

  return (
    <DefaultLayout>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Les messages de notification</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Création</h2>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="titre" className="text-base">Titre du contenu <span className='text-danger'>*</span></label>
                            <input type="text" value={data.titre} onChange={e => setData('titre', e.target.value)} className="form-input" placeholder='Titre de contenu'/>
                            {errors.titre && <div className="text-danger">{errors.titre}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="lin_video" className="text-base">Lien de la vidéo youtube <span className='text-danger'>*</span></label>
                            <input type="text" value={data.lin_video} onChange={e => setData('lin_video', e.target.value)} className="form-input"  placeholder='Lien de la vidéo youtube '/>
                            {errors.lin_video && <div className="text-danger">{errors.lin_video}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="my-2">
                            <label htmlFor="description" className="text-base">Description du contenu <span className='text-danger'>*</span></label>
                            <textarea type="text" value={data.description} onChange={e => setData('description', e.target.value)} className="form-input" placeholder='Description du contenu' />
                            {errors.description && <div className="text-danger">{errors.description}</div>}
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
