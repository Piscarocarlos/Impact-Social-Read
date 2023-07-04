import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
import ImageIfon from '../../assets/images/info_info.png'
import ImageAlarm from '../../assets/images/info_alarm.png'

export default function Create(){
  
    const { section1,section2,section3 } = usePage().props;
    console.log(section3)

  return (
    <DefaultLayout>
      <div>
        <div className="datatables">
            <div className='container mb-5'>
                    <div className='grid md:grid-cols-2 gap-4 p-5 sm:grid-cols-2 panel'>
                        <div className='flex'>
                            <div className='flex items-center'>
                                <img  className="block max-w-sm p-6 "  src={ImageIfon} alt="Image profil candidat" />
                            </div>
                            <div>
                                <p className="font-medium text-base mb-4 t text-blue-900/100">
                                    {section1?.msg_no_candidature}
                                </p>
                            </div>
                        </div>
                        <div className='flex'>
                            <div className='flex items-center'>
                                <img  className="block max-w-sm p-6 "  src={ImageAlarm} alt="Image profil candidat" />
                            </div>
                            <p className="font-medium text-base mb-4 t text-blue-900/100">
                                {section1?.msg_info_candidature}
                            </p>
                        </div>
                    </div>
            </div>
            <div className='container mb-5'>
                    <div className='grid md:grid-cols-2 gap-4 p-5 sm:grid-cols-2 panel text-center'>
                        <div>
                            <h2 className="font-medium text-lg mb-4 t text-blue-800/100">
                                {section2?.titre}
                            </h2>
                            <p className="font-medium text-base mb-4 t text-blue-900/100">
                            {section2?.description} 
                            </p>
                        </div>
                        <div >
                            <iframe width="100%" height="315" src={section2?.lin_video} frameborder="0"  allowfullscreen></iframe>
                        </div>
                    </div>
            </div>
            <div className="grid md:grid-cols-3 sm:grid-cols-3  gap-4 panel">
            {section3?.map((item) => (
                <div key={item.id}  className="block w-65 max-w-md p-6 bg-gray-100 hover:bg-gray-300 cursor-pointer border border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h2 className="font-medium text-base text-center mb-4 t text-blue-800/100">{item.titre}</h2>
                    <div>
                        <div className='flex justify-center  mb-4'>
                            <img  className="block  p-6 rounded-full   shadow" width="90" height="90" src={`/storage/`+item.image} alt="Icon card" />
                        </div>
                        <div>
                            <p className="font-medium text-base mb-4 text-center t text-blue-900/100">{item.description}</p>
                        </div>
                    </div>
                </div>
            ))}
                    
                
            </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
