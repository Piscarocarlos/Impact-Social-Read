import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';

export default function Create(){
    const { regions,provinces,ecoles} = usePage().props;

  const { data, put, setData, processing, errors } = useForm({
    nom_fr:ecoles.nom_fr,
    nom_ar:ecoles.nom_ar,
    adresse_fr:ecoles.adresse_fr,
    adresse_ar:ecoles.adresse_ar,
    telephone:ecoles.telephone,
    region:ecoles.region_id,
    province:ecoles.province_id,
    id:ecoles.id
  })

  const submit = (e) => {
    e.preventDefault();
    put(route('dashboard.liste-ecole.update',ecoles.id), {

    })
  }

  return (
    <DefaultLayout>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Ecoles</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Modification</h2>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="nom_fr" className="text-base">Nom en français <span className='text-danger'>*</span></label>
                            <input type="text" value={data.nom_fr} onChange={e => setData('nom_fr', e.target.value)} className="form-input border-dark " placeholder="Nom en français" />
                            {errors.nom_fr && <div className="text-danger">{errors.nom_fr}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="nom_ar" className="text-base">Nom en arabe <span className='text-danger'>*</span></label>
                            <input type="text" value={data.nom_ar} onChange={e => setData('nom_ar', e.target.value)} className="form-input border-dark " placeholder="Nom en arabe" />
                            {errors.nom_ar && <div className="text-danger">{errors.nom_ar}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="adresse_fr" className="text-base">Adresse en français <span className='text-danger'>*</span></label>
                            <input type="text" value={data.adresse_fr} onChange={e => setData('adresse_fr', e.target.value)} className="form-input border-dark " placeholder="Adresse en français" />
                            {errors.adresse_fr && <div className="text-danger">{errors.adresse_fr}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="adresse_ar" className="text-base">Adresse en arabe <span className='text-danger'>*</span></label>
                            <input type="text" value={data.adresse_ar} onChange={e => setData('adresse_ar', e.target.value)} className="form-input border-dark " placeholder="Adresse en arabe" />
                            {errors.adresse_ar && <div className="text-danger">{errors.adresse_ar}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="region" className="text-base">Région du lycée <span className='text-danger'>*</span></label>
                            <select type="text" value={data.region} onChange={e => setData('region', e.target.value)} className="form-select" placeholder="Nom de la permission" >
                            <option defaultValue={'selected'}>Selectionner une région</option>
                            {regions.map(item => (
                              <option key={item.id} value={item.id}>{item.name_region}</option>
                            ))}
                            </select>
                            {errors.region && <div className="text-danger">{errors.region}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="province" className="text-base">Province du lycée <span className='text-danger'>*</span></label>
                            <select type="text" value={data.province} onChange={e => setData('province', e.target.value)} className="form-select" placeholder="Nom de la permission" >
                            <option defaultValue={'selected'}>Selectionner une région</option>
                            {provinces.map(item => (
                              <option key={item.id} value={item.id}>{item.name_province}</option>
                            ))}
                            </select>
                            {errors.province && <div className="text-danger">{errors.province}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="name" className="text-base">Téléphone <span className='text-danger'>*</span></label>
                            <input type="text" value={data.telephone} onChange={e => setData('telephone', e.target.value)} className="form-input border-dark " placeholder="Téléphone" />
                            {errors.telephone && <div className="text-danger">{errors.telephone}</div>}
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
