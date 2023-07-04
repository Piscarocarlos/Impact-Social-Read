import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import Permission from './Permission';

export default function Create({ permissions }) {
  const { data, post, setData, processing, errors } = useForm({
    name: "",
    permissions: []
  })
  const getPermissions = (e) => {
    const isChecked = e.target.checked
    if (isChecked) {
      setData('permissions', [...data.permissions, e.target.value])
    } else {
      const index = data.permissions.indexOf(e.target.value);
      data.permissions.splice(index, 1);
      setData('permissions', data.permissions)
    }
  }

  const submit = (e) => {
    e.preventDefault();
    post(route('dashboard.roles.store'), {

    })
  }

  return (
    <DefaultLayout>
      <div >
        <div className="flex items-center justify-between mb-5">
          <h5 className="font-semibold text-lg dark:text-white-light">Roles et permissions</h5>
          {/* <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} /> */}
        </div>
        <div className="datatables">
          <div className="flex justify-between flex-nowrap dark:text-white gap-4">
            <div className="w-4/6 sm:w-full">
              <div className="panel">
                <h2 className="text-lg mb-3 font-bold">Créer un role</h2>
                <form onSubmit={submit}>
                  <div className="grid gap-3">
                    <div className="my-2">
                      <label htmlFor="name" className="text-base">Nom du rôle</label>
                      <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="form-input border-dark " placeholder="Nom du rôle" />
                    </div>



                    <div className="mt-3" >
                      <label htmlFor="name" className="text-base">Permissions</label>

                      {
                        permissions.map((item, key) => {
                          return <div className="panel mb-5" key={key}>
                            <h4 className='font-bold text-base'>{item[0].section}</h4>
                            <div className="flex gap-3 flex-wrap">
                            {
                              item.map((permission, index)=>{
                                return <div className="mt-2" key={index}>
                                <label className="inline-flex">
                                  <input type="checkbox" name="permissions" value={permission.name} onChange={getPermissions} className="form-checkbox" />
                                  <span>{permission.name}</span>
                                </label>
                              </div>
                              })
                            }
                            </div>
                          </div>
                        })
                      }



                      {/* <div className="mt-2">
                        <label className="inline-flex">
                          <input type="checkbox" name="permissions" value="candidate" onChange={getPermissions} className="form-checkbox" />
                          <span>Gestion des candidatures</span>
                        </label>
                      </div>

                      <div className="mt-2">
                        <label className="inline-flex">
                          <input type="checkbox" name="permissions" value="partners" onChange={getPermissions} className="form-checkbox" />
                          <span>Gestion des partenaires</span>
                        </label>
                      </div> */}
                    </div>

                    <button type="submit" className="btn bg-lime-500 text-white border-lime-500 ltr:ml-4 rtl:mr-4">
                      <FiSave className="mr-4 rtl:order-2" />
                      <span>Sauvegarder</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="w-2/6 sm:w-full">
              <Permission />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
