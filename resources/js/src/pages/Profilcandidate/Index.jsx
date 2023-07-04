import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { DataTable } from 'mantine-datatable'
import { useForm } from '@inertiajs/inertia-react'
import { useEffect, useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
import userImage from '../../assets/images/defauluser.png';
import Modal from './Modal';
import { Toaster, toast } from 'react-hot-toast'
import path from 'path';



export default function Index() {
    const { candidate } = usePage().props;
    console.log(candidate.avatar)
    const { data, post, setData, processing, errors,progress } = useForm({
        name: candidate.name,
        firstName : candidate.firstName,
        phoneNumber:candidate.phoneNumber,
        email : candidate.email,
        image:""
      })

   
   /*for the modal*/
   const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  
 const photo=`/storage/`+candidate.avatar

 console.log(photo)
 

  const submit = (e) => {
    console.log(data)
    e.preventDefault();
    post(route('dashboard.profil.candidate.id',candidate.id), {
        FormData:true,
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
        <Toaster/>
      <div className="panel">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold mb-3">Informations sur mon compte</h3>
        </div>
        <div className="datatables">
          <div className="flex justify-between flex-nowrap dark:text-white gap-4">
            <div className="w-4/6 sm:w-full">
                <h2 className="text-lg mb-3 font-bold">Image profil</h2>
                <hr className='mb-4'/>
                <div className='w-64'>
                    {
                        candidate.avatar==null?<img  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" width="150" src={userImage} alt="Image profil candidat" /> : 
                        <img  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" width="180" height="180" src={photo} alt="Image profil candidat" />
                    }
                </div>
            </div>
            <div className="w-2/6 sm:w-full">
                <h2 className="text-lg mb-3 font-bold">Informations personnelles</h2>
                <hr className='mb-4'/>
                <div className="grid gap-3 ml-5 ">
                    <ul className="list-disc text-base">
                        <li>Nom : {candidate.name}</li>
                        <li>Prénom : {candidate.firstName}</li>
                        <li>Adresse email : {candidate.email}</li>
                        <li>Portable : {candidate.phoneNumber}</li>
                        <li>Rôle : {candidate.user_type}</li>
                    </ul>
                    <button onClick={handleOpenModal} className="btn bg-lime-500 text-white border-lime-500">
                      <FiSave className="mr-4 rtl:order-2" />
                      <span>Modifier</span>
                    </button>
                </div>
            </div>
          </div>
        </div>
        <Modal data-modal-placement="top-left" isOpen={isOpen} onClose={handleCloseModal} >
        <form onSubmit={submit} >
                <div className="grid grid-cols-2 gap-3">
                    <div className="my-2">
                        <label htmlFor="name" className="text-base">Votre nom <span className='text-danger'>*</span></label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)}  className="form-input" placeholder="Votre nom" />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="my-2">
                        <label htmlFor="firstName" className="text-base">Votre prénom <span className='text-danger'>*</span></label>
                        <input type="text" value={data.firstName} onChange={e => setData('firstName', e.target.value)}  className="form-input" placeholder="Votre prénom" />
                        {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="my-2">
                        <label htmlFor="phoneNumber" className="text-base">Votre Téléphone <span className='text-danger'>*</span></label>
                        <input type="text" value={data.phoneNumber} onChange={e => setData('phoneNumber', e.target.value)}   className="form-input" placeholder="Votre Téléphone" />
                        {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                    </div>
                    <div className="my-2">
                        <label htmlFor="email" className="text-base">Votre adresse email <span className='text-danger'>*</span></label>
                        <input type="text" value={data.email} onChange={e => setData('email', e.target.value)}  className="form-input" placeholder="Votre adresse email" />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="my-2">
                        <label htmlFor="avatar" className="text-base">Image profil</label>
                        <input type="file"    onChange={e => setData('image', e.target.files[0]) }  className="form-input"  accept="image/png, image/jpeg, image/jpg" /> 
                        {errors.image && <div className="text-danger">{errors.image}</div>}
                    </div>
                </div>
            </form>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={submit}  data-modal-hide="staticModal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sauvegarder</button>
                <button onClick={handleCloseModal} data-modal-hide="staticModal" type="button" className="text-white bg-danger hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gwhite-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Fermer</button>
            </div>
        </Modal>
        
        
        
      </div>
    </DefaultLayout>
  )
}
