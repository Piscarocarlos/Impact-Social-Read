import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
import Select from 'react-select';

export default function Create(){
    const { operator,devise,beneficiare } = usePage().props;

    
    const [selectedCible, setSelectedCible] = useState([]);
    const { data, post, setData, processing, errors } = useForm({
      name_service:"",
      description:"",
      cible:[],
      cout_unitaire:"",
      devise:"",
      operator_service:"",
      status:"",
    })


    const option=beneficiare.map(item => (
      { key:item.id, "value": item.type_beneficiary, "label":item.type_beneficiary }
    ));

   

    const handleCategoryChange = (event) => {
      const selectedValues = [];
      data.cible=event
      //console.log(data.cible)
      setSelectedCible(selectedValues);
    };



  

  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.service.store'), {

    })
  }

  return (
    
    <DefaultLayout>
      
      <div>
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Service d'accompagnement</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Créer un service</h2>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="name_service" className="text-base">Nom du service <span className='text-danger'>*</span></label>
                            <input type="text" value={data.name_service} onChange={e => setData('name_service', e.target.value)} className="form-input  " placeholder="Nom du service" />
                            {errors.name_service && <div className="text-danger">{errors.name_service}</div>}
                        </div>
                        <div className="my-2 custom-select ">
                            <label htmlFor="cible" className="text-base">Cible conserné <span className='text-danger'>*</span></label>
                            <Select options={option} multiple={true} onChange={handleCategoryChange} type="text" isMulti isSearchable={false}  defaultValue={data.cible}    placeholder="Sélectionner les cibles" />
                            {errors.cible && <div className="text-danger">{errors.cible}</div>}
                        </div>
                        
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="cout_unitaire" className="text-base">Coût unitaire <span className='text-danger'>*</span></label>
                            <input type="text" value={data.cout_unitaire} onChange={e => setData('cout_unitaire', e.target.value)} className="form-input  " placeholder="Titre" />
                            {errors.cout_unitaire && <div className="text-danger">{errors.cout_unitaire}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="devise" className="text-base">Devise <span className='text-danger'>*</span></label>
                            <select type="text" value={data.devise} onChange={e => setData('devise', e.target.value)} className="form-select" placeholder="Nom de la permission" >
                                <option defaultValue={'selected'}>Sélectionner une devise</option>
                                {devise.map(item => (
                                <option key={item.id} value={item.type_devise}>{item.type_devise}</option>
                                ))}
                            </select>
                            {errors.devise && <div className="text-danger">{errors.devise}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="operator_service" className="text-base">Type d'opérateur de service <span className='text-danger'>*</span></label>
                            <select type="text" value={data.operator_service} onChange={e => setData('operator_service', e.target.value)} className="form-select" placeholder="Nom de la permission" >
                                <option defaultValue={'selected'}>Sélectionner...</option>
                                {operator.map(item => (
                                <option key={item.id} value={item.type_operator}>{item.type_operator}</option>
                                ))}
                            </select>
                            {errors.operator_service && <div className="text-danger">{errors.operator_service}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="description" className="text-base">Description <span className='text-danger'>*</span></label>
                            <textarea type="text" value={data.description} onChange={e => setData('description', e.target.value)} className="form-input  " placeholder="Description" />
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
