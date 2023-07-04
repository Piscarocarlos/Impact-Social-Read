import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';

export default function Create(){
  const { data, post, setData, processing, errors } = useForm({
    mail_transport : "",
    mail_host : "",
    email_port : "",
    mail_username : "",
    mail_password : "",
    mail_encryption : "",
    mail_from : "",
    mail_name : "",
  })

  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.smtp-configuration.store'), {

    })
  }

  return (
    <DefaultLayout>
      <div>
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Smtp</h5>
        </div>
        <div className="datatables grid grid-rows-3">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Créer un paramètre smtp</h2>
                <form onSubmit={submit}>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="name" className="text-base">Mail transport</label>
                            <input type="text" value={data.mail_transport} onChange={e => setData('mail_transport', e.target.value)} className="form-input border-dark " placeholder="Mail transport" />
                            {errors.mail_transport && <div className="text-danger">{errors.mail_transport}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="name" className="text-base">Mail host</label>
                            <input type="text" value={data.mail_host} onChange={e => setData('mail_host', e.target.value)} className="form-input border-dark " placeholder="Mail host" />
                            {errors.mail_host && <div className="text-danger">{errors.mail_host}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="name" className="text-base">Email port</label>
                            <input type="text" value={data.email_port} onChange={e => setData('email_port', e.target.value)} className="form-input border-dark " placeholder="Email port" />
                            {errors.email_port && <div className="text-danger">{errors.email_port}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="name" className="text-base">Mail username</label>
                            <input type="text" value={data.mail_username} onChange={e => setData('mail_username', e.target.value)} className="form-input border-dark " placeholder="Mail username" />
                            {errors.mail_username && <div className="text-danger">{errors.mail_username}</div>}
                        </div>
                       
                      
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="my-2">
                            <label htmlFor="name" className="text-base">Mail password</label>
                            <input type="text" value={data.mail_password} onChange={e => setData('mail_password', e.target.value)} className="form-input border-dark " placeholder="Mail password" />
                            {errors.mail_password && <div className="text-danger">{errors.mail_password}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="name" className="text-base">Mail encryption</label>
                            <input type="text" value={data.mail_encryption} onChange={e => setData('mail_encryption', e.target.value)} className="form-input border-dark " placeholder="Mail encryption" />
                            {errors.mail_encryption && <div className="text-danger">{errors.mail_encryption}</div>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        
                        <div className="my-2">
                            <label htmlFor="name" className="text-base">Mail from</label>
                            <input type="text" value={data.mail_from} onChange={e => setData('mail_from', e.target.value)} className="form-input border-dark " placeholder="Mail from" />
                            {errors.mail_from && <div className="text-danger">{errors.mail_from}</div>}
                        </div>
                        <div className="my-2">
                            <label htmlFor="name" className="text-base">Mail name</label>
                            <input type="text" value={data.mail_name} onChange={e => setData('mail_name', e.target.value)} className="form-input border-dark " placeholder="Mail name" />
                            {errors.mail_name && <div className="text-danger">{errors.mail_name}</div>}
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
