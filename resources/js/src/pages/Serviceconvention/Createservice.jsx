import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
import Select from 'react-select';

export default function Create(){
    const { convention,service } = usePage().props;
    const myData = JSON.parse(convention.data)

    const [valeur, setValeur] = useState('');
    const [operateur, setOperateur] = useState('');
    const [total, setTotal] = useState('');

    const { data, put, setData, processing, errors } = useForm({
        service_id:"",
        convention_id:convention.id,
        cout:"",
        partner:myData.partnerId.label,
        objectif:"",
        cout_service:"",
        type_operator:"",
    })

    const reqService=myData.service;
    

   

    const optionEngagement = reqService.map(item => (
      { key:item.key, "value": item.value, "label":item.label }
    ));
    const handleEngagementChange = (event) => {
      data.service_id=event
      const id=data.service_id.key
      const result = service.find(item => item.id == id);
      setValeur(result.cout_unitaire)
      setOperateur(result.operator_service)
    };
    const handelNumber=(e)=>{
      setData('objectif',e.target.value)
      setTotal(valeur*e.target.value)
    }

  



  const submit = (e) => {
    e.preventDefault();
   data.cout=valeur
   data.cout_service=total
   data.type_operator=operateur
 
    put(route('dashboard.service-convention.update',convention.id), {

    })
  }

  return (
    <DefaultLayout>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Service à la convention</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Création</h2>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2 custom-select">
                            <label htmlFor="service_id" className="text-base">Choix du service <span className='text-danger'>*</span></label>
                            <Select onChange={handleEngagementChange} defaultValue={data.service_id} options={optionEngagement} isSearchable={false}  />
                            {errors.service_id && <div className="text-danger">{errors.service_id}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="convention_id" className="text-base">Numéro de la convention <span className='text-danger'>*</span></label>
                            <input type="number" value={data.convention_id} onChange={e => setData('convention_id', e.target.value)} className="form-input  " placeholder="Numéro de la convention" readOnly/>
                            {errors.convention_id && <div className="text-danger">{errors.convention_id}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                    <div className="my-2">
                            <label htmlFor="cout" className="text-base">Cout unitaire <span className='text-danger'>*</span></label>
                            <input type="text" value={valeur} onChange={e => setData('cout', e.target.value)} className="form-input  " placeholder="Cout unitaire" />
                            {errors.cout && <div className="text-danger">{errors.cout}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="partner" className="text-base">Partenaire de la convention <span className='text-danger'>*</span></label>
                            <input type="text" value={data.partner} onChange={e => setData('partner', e.target.value)} className="form-input  " placeholder="Partenaire de la convention" readOnly/>
                            {errors.partner && <div className="text-danger">{errors.partner}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                    <div className="my-2">
                            <label htmlFor="objectif" className="text-base">Objectif(Nombre de fois à assurer le service) <span className='text-danger'>*</span></label>
                            <input type="number" value={data.objectif} onChange={handelNumber} className="form-input  " placeholder="Objectif" />
                            {errors.objectif && <div className="text-danger">{errors.objectif}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="cout_service" className="text-base">Cout du service <span className='text-danger'>*</span></label>
                            <input type="text" value={total} onChange={e => setData('cout_service', e.target.value)} className="form-input  " placeholder="Cout du service" readOnly/>
                            {errors.cout_service && <div className="text-danger">{errors.cout_service}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="type_operator" className="text-base">Type d'opérateur de service <span className='text-danger'>*</span></label>
                            <input type="text" value={operateur} onChange={e => setData('type_operator', e.target.value)} className="form-input  " placeholder="Type d'opérateur de service" />
                            {errors.type_operator && <div className="text-danger">{errors.type_operator}</div>}
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
