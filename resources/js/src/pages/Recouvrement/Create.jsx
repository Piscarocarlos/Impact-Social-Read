import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
import Select from 'react-select';

export default function Create(){
    const { convention } = usePage().props;

    const [visible, setVisible] = useState();
    

    const { data, post, setData, processing, errors } = useForm({
      convention:"",
      date:"",
      nature:"",
      debit:"",
      credit:"",
      solde:"",
      myError:"",
      check:""
    })

  const option=convention.map(item => (
    { key:item.id, "value": item.id, "label":item.id }
  ));
  const optionsCheck = [
    { value: 1, label: 'Créditer le compte'},
    { value: 0, label: 'Débiter le compte'},
];
  const handleConventionChange = (event) => {
    data.convention=event
  };

  const handleChekChange = (event) => {
    data.check=event
    const d=data.check["value"];
    if(d==1){
      setVisible(true)
      data.debit=0
    }
    else{
      setVisible(false)
      data.credit=0
    }
    //console.log(visible)
  };



  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.recouvrement.store'), {

    })
  }

  return (
    <DefaultLayout>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Recouvrement</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Création d'un recouvrement</h2>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2 custom-select">
                            <label htmlFor="convention" className="text-base">Numéro de la convention <span className='text-danger'>*</span></label>
                            <Select onChange={handleConventionChange} defaultValue={data.convention} options={option} isSearchable={true}  />
                            {errors.convention && <div className="text-danger">{errors.convention}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="date" className="text-base">Date d'opération <span className='text-danger'>*</span></label>
                            <input type="date" value={data.date} onChange={e => setData('date', e.target.value)} className="form-input"  />
                            {errors.date && <div className="text-danger">{errors.date}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="nature" className="text-base">Nature d'opération <span className='text-danger'>*</span></label>
                            <input type="text" value={data.nature} onChange={e => setData('nature', e.target.value)} className="form-input" placeholder="Nature d'opération" />
                            {errors.nature && <div className="text-danger">{errors.nature}</div>}
                        </div> 
                        <div className="my-2 custom-select">
                            <label htmlFor="check" className="text-base">Choisir le type d'opération <span className='text-danger'>*</span></label>
                            <Select onChange={handleChekChange} defaultValue={data.check} options={optionsCheck} isSearchable={true}  />
                            {errors.check && <div className="text-danger">{errors.check}</div>}
                        </div>
                    </div>
                    {
                      visible==true?
                      <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                              <label htmlFor="credit" className="text-base">Montant de crédit  <span className='text-danger'>*</span></label>
                              <input type="number" value={data.credit} onChange={e => setData('credit', e.target.value)} className="form-input" placeholder="Montant de crédit" />
                              {errors.credit && <div className="text-danger">{errors.credit}</div>}
                        </div>
                      </div>
                      :null
                    }
                    {
                      visible==false?
                      <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                          <label htmlFor="debit" className="text-base">Montant de débit <span className='text-danger'>*</span></label>
                          <input type="number" value={data.debit} onChange={e => setData('debit', e.target.value)} className="form-input" placeholder="Montant de débit" />
                          {errors.debit && <div className="text-danger">{errors.debit}</div>}
                          {errors.myError && <div className="text-danger">{errors.myError}</div>}
                        </div>
                      </div>
                      :null
                    }
                     
                  
                         
                         
                  
                    
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
