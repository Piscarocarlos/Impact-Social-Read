import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
import Select from 'react-select';

export default function Create(){
    const { services } = usePage().props;

    const [selectedService, setSelectedService] = useState([]);

    const { data, post, setData, processing, errors } = useForm({
      name_pack:"",
      service_pack:[],
      price:"",
    })

  const option=services.map(item => (
    { key:item.id, "value": item.name_service, "label":item.name_service }
  ));


  const handleServiceChange = (event) => {
    const selectedValues = [];
    data.service_pack=event
    setSelectedService(selectedValues);
  };

  const submit = (e) => {
    e.preventDefault();
    setData("service_pack",selectedService),
    post(route('dashboard.list-pack.store'), {

    })
  }

  return (
    <DefaultLayout>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Pack de convention</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Création d'un pack</h2>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="name_pack" className="text-base">Nom du pack <span className='text-danger'>*</span></label>
                            <input type="text" value={data.name_pack} onChange={e => setData('name_pack', e.target.value)} className="form-input" placeholder="Nom du pack" />
                            {errors.name_pack && <div className="text-danger">{errors.name_pack}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="price" className="text-base">Prix du pack <span className='text-danger'>*</span></label>
                            <input type="text" value={data.price} onChange={e => setData('price', e.target.value)} className="form-input" placeholder="Prix du pack" />
                            {errors.price && <div className="text-danger">{errors.price}</div>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <div className="my-2">
                            <label htmlFor="service_pack" className="text-base">Service <span className='text-danger'>*</span></label>
                            <Select options={option} multiple={true} onChange={handleServiceChange} type="text" isMulti isSearchable={false}  defaultValue={data. service_pack}    placeholder="Sélectionner...." />
                            {errors.service_pack && <div className="text-danger">{errors.service_pack}</div>}
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
