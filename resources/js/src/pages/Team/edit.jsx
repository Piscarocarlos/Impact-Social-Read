import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';


export default function Edit() {

    const { team, roles, team_user } = usePage().props;

    const { data, put, setData, processing, errors } = useForm({
        id:team_user.id,
        name: team_user.name,
        email: team_user.email,
        user_id: team.user_id,
        phoneNumber: team_user.phoneNumber,
        role_id:team.role_id,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('dashboard.teams.update', team_user.id), {
            preserveScroll: true,
        });
        showMessage(success);
    }



    const showMessage = (success = "Modification faites avec succès", type = 'success') => {
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

    return (
        <DefaultLayout>

            <div className="p-32">
                <div className="flex items-center justify-between mb-5 ">
                    <h5 className="font-semibold text-lg dark:text-white-light">Teams</h5>
                </div>
                <div className="datatables  ">
                    <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                        <div className=" sm:w-full">
                            <div className="panel">
                                <h2 className="text-lg mb-3 font-bold">Mofications membre d'equipe</h2>

                                <form
                                    onSubmit={submit}
                                >
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="my-2">
                                            <label htmlFor="name" className="text-base">Nom <span className='text-danger'>*</span></label>
                                            <input type="text"
                                                value={data.name} onChange={e => setData('name', e.target.value)}
                                                className="form-input " placeholder="Nom"/>
                                            {errors.name && <div className="text-danger">{errors.name}</div>}
                                        </div>
                                        <div className="my-2">
                                            <label htmlFor="email" className="text-base">Email <span className='text-danger'>*</span></label>
                                            <input type="text"
                                                value={data.email} onChange={e => setData('email', e.target.value)}
                                                className="form-input " placeholder="E-mail" />
                                            {errors.email && <div className="text-danger">{errors.email}</div>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="my-2">
                                            <label htmlFor="phoneNumber" className="text-base">Téléphone</label>
                                            <input type="text"
                                                value={data.phoneNumber} onChange={e => setData('phoneNumber', e.target.value)}
                                                className="form-input " placeholder="Phone" />
                                            {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                                        </div>
                                        <div className="my-2">
                                            <label htmlFor="role" className="text-base">Role <span className='text-danger'>*</span></label>
                                            <select type="text"
                                                value={data.role_id} onChange={e => setData('role_id', e.target.value)}
                                                className="form-select" placeholder="Role" >
                                                <option defaultValue={'selected'}  disabled="disabled" >Sélectionner un role</option>
                                                {roles.map((role, index) => (
                                                    <option
                                                        key={index} value={role.id}
                                                    >
                                                        {role.name}
                                                    </option>
                                                ))}
                                            </select>

                                            {errors.role_id && <div className="text-danger">{errors.role_id}</div>}
                                        </div>
                                    </div>

                                    <div className="grid  gap-3 pt-4">
                                        <button type="submit" className="btn btn-success border-lime-500">
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
