import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { DataTable } from 'mantine-datatable'
import { useForm } from '@inertiajs/inertia-react'
import { useEffect, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
import { Link } from '@inertiajs/inertia-react'
import { FiEdit, FiList, FiPlus, FiTrash } from 'react-icons/fi'

import { Toaster, toast } from 'react-hot-toast'



export default function Index() {
  
    const { data, put, setData, processing, errors,progress } = useForm({
       
      })

   
   /*for the modal*/
   const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  
 
 

  const submit = (e) => {
    console.log(data)
    e.preventDefault();
    put(route('dashboard.profil.candidate.id',candidate.id), {
        onSuccess: (data)=>{
            if(data?.props?.flash.success) {
                toast.success(data?.props?.flash.success, {
                    position: "top-center"
                })
                handleCloseModal()
            }
            
        },
    })
  }

  return (
    
    <DefaultLayout>
            {/* generate card in tailwind and insert table */}
           <div className="flex gap-3">
           <div className="w-1/2">
                <div className="p-4">
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-full my-6 pr-0 lg:pr-2 panel">
                            <p className="text-xl pb-6 flex items-center">
                                <i className="fas fa-list mr-3"></i>Paramétrage page d'accueil(Française)
                            </p>
                            <div class="table-responsive ">
                                <table>
                                    <thead>
                                        <tr>
                                            <th width="70%">Liste des sections FR</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='text-lg'>Section 1</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.section-one-candidate.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.section-one-candidate.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Section 2</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.section-two-candidate.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.section-two-candidate.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Section 3</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.section-three-candidate.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.section-three-candidate.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
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

           <div className="w-1/2">
                <div className="p-4 ">
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-full my-6 pr-0 lg:pr-2 panel">
                            <p className="text-xl pb-6 flex items-center">
                                <i className="fas fa-list mr-3"></i>Paramétrage page d'accueil(Arabe)
                            </p>
                            <div class="table-responsive datatables">
                                <table>
                                    <thead>
                                        <tr>
                                            <th width="70%">Liste des sections AR</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='text-lg'>Section 1</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.section-one-candidate-ar.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.section-one-candidate-ar.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Section 2</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.section-two-candidate-ar.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.section-two-candidate-ar.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Section 3</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.section-three-candidate-ar.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.section-three-candidate-ar.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
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

        </DefaultLayout >
  )
}
