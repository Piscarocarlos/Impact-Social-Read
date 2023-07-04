import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiEdit, FiList, FiPlus, FiTrash, FiSave } from 'react-icons/fi'
import { usePage } from '@inertiajs/inertia-react';
import Select from 'react-select';
import { Link } from '@inertiajs/inertia-react'


export default function Create() {

    const { convention, statut } = usePage().props;

    const myData = JSON.parse(convention.data)

    const { data, put, setData, processing, errors } = useForm({
        statutConvention: myData.statutConvention
    })
    const optionStatut = statut.map(item => (
        { key: item.id, "value": item.title, "label": item.title }
    ));
    const handleStatutChange = (event) => {
        data.statutConvention = event
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('dashboard.convention-update.update', convention.id), {

        })
    }
    return (
        <DefaultLayout>
            <div>
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Conventions</h5>
                </div>
                <div className="datatables">
                    <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                        <div className=" sm:w-full">
                            <div className="panel">
                                <form onSubmit={submit}>
                                    <div className="grid gap-3 mb-4">
                                        <div className="my-2">
                                            <label htmlFor="statutConvention" className="text-base">Statut de la convention <span className='text-danger'>*</span></label>
                                            <Select onChange={handleStatutChange} defaultValue={data.statutConvention} options={optionStatut} isSearchable={false} />
                                            {errors.statutConvention && <div className="text-danger">{errors.statutConvention}</div>}
                                        </div>
                                    </div>
                                    <div className="grid  gap-3 pt-4">
                                        <div className="my-2">
                                            <button type="submit" className="btn btn-success">
                                                <FiSave className="mr-4 rtl:order-2" />
                                                <span>Sauvegarder</span>
                                            </button>
                                        </div>
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
