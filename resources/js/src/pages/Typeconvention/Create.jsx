import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import Select from 'react-select';

export default function Create(){
  const [visible, setVisible] = useState();
  const { data, post, setData, processing, errors } = useForm({
    type_convention: "",
    type_convention1:"",
  })
  const optionsCheck = [
    { value: "Ecrite", label: 'Ecrite'},
    { value: "Pack", label: 'Pack'},
    { value: "Autres", label: 'Autres'},
];
const handleChekChange = (event) => {
  data.type_convention=event
  const d=data.type_convention["value"];
  if(d==="Pack" || d==="Ecrite"){
    setVisible(false)
    data.type_convention1=""
  }
  else{
    setVisible(true)
  }
  //console.log(visible)
};

  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.type-convention.store'), {

    })
  }


  return (
    <DefaultLayout>
      <div >
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Type de convention</h5>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className="md:w-3/5 sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Créer un type </h2>
                <form onSubmit={submit}>
                <div className="grid gap-3">
                    <div className="my-2 custom-select mb-4">
                            <label htmlFor="type_convention" className="text-base">Choisir le ype de convention  <span className='text-danger'>*</span></label>
                            <Select onChange={handleChekChange} defaultValue={data.type_convention} options={optionsCheck} isSearchable={true}  />
                            {errors.type_convention && <div className="text-danger">{errors.type_convention}</div>}
                        </div>
                  </div>
                  <div className="grid gap-3">
                    {
                      visible==true?
                      <div className="my-2 mb-4">
                      <label htmlFor="name" className="text-base">Nom du type de convention</label>
                      <input type="text" value={data.type_convention1} onChange={e => setData('type_convention1', e.target.value)} className="form-input" placeholder="Type de convention" />
                      {errors.type_convention1 && <div className="text-danger">{errors.type_convention1}</div>}
                      </div>:null
                    }
                    </div>
                    <div className="grid gap-3">
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
