import React, { useState } from 'react'
import DefaultLayout from '../../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';

export default function Create(){
  
  const { data, post, setData, processing, errors } = useForm({
    titre :"",
    description :"",
    image:""
  })

 

  const submit = (e) => {
   
    e.preventDefault();
    post(route('dashboard.section-three-candidate.store'), {
     
    });
  }

  return (
    <DefaultLayout>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Enregistrement d'un card</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Création</h2>
                <form onSubmit={submit} >
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="titre" className="text-base">Titre du contenu <span className='text-danger'>*</span></label>
                            <input type="text" value={data.titre} onChange={e => setData('titre', e.target.value)} className="form-input" placeholder='Titre de contenu'/>
                            {errors.titre && <div className="text-danger">{errors.titre}</div>}
                        </div>
                        <div className="my-2">
                        <label htmlFor="image" className="text-base">Icon ullustratif <span className='text-danger'>*</span></label>
                            <input type="file"   onChange={e => setData('image', e.target.files[0])} className="form-input"  accept="image/png, image/jpeg, image/jpg" />
                            {errors.image && <div className="text-danger">{errors.image}</div>}
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
