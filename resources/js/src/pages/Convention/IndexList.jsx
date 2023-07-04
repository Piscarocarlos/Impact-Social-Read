import React, { useState,useEffect } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiEdit, FiList, FiPlus, FiTrash,FiSave } from 'react-icons/fi'
import { usePage } from '@inertiajs/inertia-react';
import Select from 'react-select';
import { Link } from '@inertiajs/inertia-react'
import Swal from 'sweetalert2';

export default function Create({success,errors}){
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
  const showMessageError = (errors = '', type = 'error') => {
    const toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      customClass: { container: 'toast' },
    });
    toast.fire({
      icon: type,
      title: errors,
      padding: '10px 20px',
    });
  };
 

  useEffect(()=>{
    if (success) {
      showMessage(success);
    }
  },[success])

  useEffect(()=>{
    if (errors) {
      showMessageError(errors);
    }
  },[errors])

  return (
    <DefaultLayout>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Conventions</h5>
          <Link href={route('dashboard.convention.create')} className="btn btn-success">Créer une convention</Link>
        </div>
        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
              <div class="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th width="100%">Liste des conventions</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='text-lg'>Conventions finalisées</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.convention.finish')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Conventions en attente de finalisation</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.convention.attente')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
