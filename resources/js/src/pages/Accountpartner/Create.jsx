import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
import Select from 'react-select';
import { useEffect, useState, Fragment } from 'react';
import Swal from 'sweetalert2';

export default function Create({role,success}) {

    const { data, post, setData, processing, errors } = useForm({
        name: "",
        email: "",
        role: ""
    })

    const submit = (e) => {
        e.preventDefault();
        post(route('dashboard.account-partner.store'), {

        })
    }
    const showMessage = (success = '', type = 'success') => {
        const toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          customClass: { container: 'toast' },
        });
        toast.fire({
          icon: type,
          title: success,
          padding: '10px 20px',
        });
      };
    
      useEffect(()=>{
        if (success) {
          showMessage(success);
            data.name= "",
            data.email= "",
            data.role= ""
        }
      },[success])

    return (

        <DefaultLayout>
            <div>
                <div className="flex items-center justify-between mb-5 ml-10 mr-10">
                    <h5 className="font-semibold text-lg dark:text-white-light">Création d'un compte du partenaire</h5>
                </div>
                <div className="datatables ml-10 mr-10">
                    <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                        <div className=" sm:w-full">
                            <div className="panel">
                                <h2 className="text-lg mb-3 font-bold">Création</h2>
                                <form onSubmit={submit}>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="my-2">
                                            <label htmlFor="name" className="text-base">Nom <span className='text-danger'>*</span></label>
                                            <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="form-input  " placeholder="Nom du partenaire" />
                                            {errors.name && <div className="text-danger">{errors.name}</div>}
                                        </div>
                                        <div className="my-2">
                                            <label htmlFor="email" className="text-base">Adresse email <span className='text-danger'>*</span></label>
                                            <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className="form-input  " placeholder="Adresse email partenaire" />
                                            {errors.email && <div className="text-danger">{errors.email}</div>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">

                                        <div className="my-2">
                                            <label htmlFor="role" className="text-base">Rôle <span className='text-danger'>*</span></label>
                                            <select type="text" value={data.role} onChange={e => setData('role', e.target.value)} className="form-select" >
                                                <option defaultValue={'selected'}>Sélectionner....</option>
                                                {role.map(item=>(
                                                        <option key={item.id} value={item.name}>{item.name}</option>
                                                        )
                                                    ) }
                                               
                                            </select>
                                            {errors.role && <div className="text-danger">{errors.role}</div>}
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
