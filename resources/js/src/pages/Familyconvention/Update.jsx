import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
import Select from 'react-select';

export default function Create(){
    const { beneficiaires,conventions,durations,familles } = usePage().props;

    const [selectedCible, setSelectedCible] = useState([]);

    const [selectedTypeConvention, setselectedTypeConvention] = useState([]);

    const [selectedEngagement, setselectedEngagement] = useState([]);

    const { data, put, setData, processing, errors } = useForm({
      name_family:familles.name_family,
      cible:JSON.parse(familles.cible),
      type_convention:JSON.parse(familles.type_convention),
      engagement:JSON.parse(familles.engagement),
      id:familles.id

    })
    const option=beneficiaires.map(item => (
      { key:item.id, "value": item.type_beneficiary, "label":item.type_beneficiary }
    ));
    const optionSimple = conventions.map(item => (
      { key:item.id, "value": item.type_convention, "label":item.type_convention }
    ));
  
    const optionEngagement = durations.map(item => (
      { key:item.id, "value": item.type_duration, "label":item.type_duration }
    ));

 

  const handleCategoryChange = (event) => {
    const selectedValues = [];
    data.cible=event
    //console.log(data.cible)
    setSelectedCible(selectedValues);
  };

  const handleTypeConventionChange = (event) => {
    const selectedValues = [];
    data.type_convention=event
    setselectedTypeConvention(selectedValues);
  };

  const handleEngagementChange = (event) => {
    const selectedValues = [];
    data.engagement=event
    setselectedEngagement(selectedValues);
  };

  const submit = (e) => {
    e.preventDefault();
    setData("cible",selectedCible),
    setData("type_convention",selectedTypeConvention),
    setData("engagement",selectedEngagement),
    put(route('dashboard.famille-convention.update',familles.id), {

    })
  }

  return (
    <DefaultLayout>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Famille des conventions</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Modification</h2>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="name_family" className="text-base">Nom de la famille <span className='text-danger'>*</span></label>
                            <input type="text" value={data.name_family} onChange={e => setData('name_family', e.target.value)} className="form-input" placeholder="Nom de la famille" />
                            {errors.name_family && <div className="text-danger">{errors.name_family}</div>}
                        </div>
                        <div className="my-2 custom-select">
                            <label htmlFor="cible" className="text-base">Cible bénéficiare <span className='text-danger'>*</span></label>
                            <Select options={option} multiple={true} onChange={handleCategoryChange} type="text" isMulti isSearchable={false}  defaultValue={data.cible}    placeholder="Sélectionner les cibles" />
                            {errors.cible && <div className="text-danger">{errors.cible}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2 custom-select">
                            <label htmlFor="type_convention" className="text-base">Type de convention <span className='text-danger'>*</span></label>
                            <Select onChange={handleTypeConventionChange} defaultValue={data.type_convention} options={optionSimple} isSearchable={false}  />
                            {errors.type_convention && <div className="text-danger">{errors.type_convention}</div>}
                        </div>
                        <div className="my-2 custom-select">
                            <label htmlFor="engagement" className="text-base">Engagement <span className='text-danger'>*</span></label>
                            <Select onChange={handleEngagementChange} defaultValue={data.engagement} options={optionEngagement} isSearchable={false}  />
                            {errors.engagement && <div className="text-danger">{errors.engagement}</div>}
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
