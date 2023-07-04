import { useForm } from '@inertiajs/inertia-react'
import React from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { FiSave } from 'react-icons/fi'

export default function Permission() {

    const {data, setData, errors, processing, post, reset} = useForm({
        name: "",
        parent: ""
    })

    const savePermission = e =>{
        e.preventDefault()
        post(route('dashboard.permission.save'), {
            onSuccess: (data)=>{
                console.log(data);
                if(data?.props?.flash.success) {
                    toast.success(data?.props?.flash.success, {
                        position: "top-center"
                    })
                    reset()
                }
                // reset()
            },
        })
    }

    return (
        <>
        <Toaster/>
            <div className="bg-white rounded shadow p-3">
                <h2 className="text-lg mb-6 font-bold">Créer une permission</h2>
                <form onSubmit={savePermission}>
                    <div className="mt-3">
                        <label htmlFor="name" className='text-base'>Nom de la permission</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="form-input" placeholder="Nom de la permission" />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="name" className='text-base'>Section</label>
                        <select type="text" value={data.parent} onChange={e => setData('parent', e.target.value)} className="form-select" placeholder="Nom de la permission" >
                            <option defaultValue={'selected'}>Selectionner une section</option>
                            <option value="candidats">Candidats</option>
                            <option value="partners">Partners</option>
                        </select>
                        {errors.parent && <div className="text-danger">{errors.parent}</div>}
                    </div>
                    <button type="submit" className="btn mt-7  bg-lime-500 text-white border-lime-500 ltr:ml-4 rtl:mr-4">
                        <FiSave className="mr-4 rtl:order-2" />
                        <span>Sauvegarder</span>
                    </button>
                </form>
            </div>
        </>
    )
}
