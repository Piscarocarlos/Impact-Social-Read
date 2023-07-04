import React, { useEffect, useState, Fragment } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { Link, useForm } from '@inertiajs/inertia-react';
import Dropdown from '../../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi'
import { MdWarning } from 'react-icons/md';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/react';


export default function Create({ candidats }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Create'));
    });

    const { data, setData, processing, errors, reset, put ,post } = useForm({
        name: "",
    });

    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [selectIdForStatus, setSelectIdForStatus] = useState();
    const [selectIdForDelete, setSelectIdForDelete] = useState();
    const showMessage = (msg = '', type = 'success') => {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    const handleModalStatus = (id) => {
        // setSelectIdForStatus(id);
        // setModal1(true)
        // alert(id)
        put(route('dashboard.update.candidate.status', id))
    }


    const handleModalDelete = (id) => {
        setSelectIdForDelete(id);
        setModal2(true)
    }
    const findById = (id, tab) => {
        return tab.find(obj => obj.id === id);
    }
    const nameCandidat = (id, tab) => findById(id, tab)?.name;
    const statusCandidat = (id, tab) => findById(id, tab)?.activated;
    const handleDelete = (e) => {
        e.preventDefault();
        showMessage('Le formulaire de  candidature a été supprimé avec succès.');
        Inertia.delete(route('dashboard.delete.candidate', selectIdForDelete))
        setModal2(false)
    }

    const handleChangeStatus = (e) => {
        e.preventDefault();


    }

    const submit = (e) => {
        e.preventDefault();
        post(route('dashboard.store.candidate'), {});
    }


    return (
        <DefaultLayout>
            <div className="flex gap-3">
                <div className="md:w-1/3 sm:full">
                    <div className="bg-white shadow-md rounded-md p-4 dark:bg-black dark:text-white">
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-full my-6 pr-0 lg:pr-2">
                                <p className="text-base font-bold pb-6 flex items-center">
                                    <i className="fas fa-list mr-3"></i> Créer un nouveau formulaire de candidature
                                </p>
                                {/* form with input name */}
                                <form onSubmit={submit}>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  dark:bg-black dark:text-white" htmlFor="grid-password">
                                                Nom du formulaire
                                            </label>
                                            <input value={data.name} onChange={e => setData('name', e.target.value)} className="appearance-none block w-full  dark:bg-black dark:text-white  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                id="grid-password" type="text" placeholder="Nom du formulaire" />
                                            {errors.name && <div className="text-red-500 text-xs">{errors.name}</div>}
                                            <p className="text-gray-600 text-xs italic">Le nom qui sera donné à votre campagne</p>
                                        </div>
                                        {/* button de validation en vert */}
                                        <div className="w-full px-3">
                                            <button className="bg-green-500 w-full mt-5 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                                Créer
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-2/3 sm:w-full ">
                    <div className="panel rounded-md p-4 ">
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-full my-2 pr-0 lg:pr-2">
                                <p className="text-base font-bold pb-6 flex items-center">
                                    <i className="fas fa-list mr-3"></i> Liste des formulaires des candidatures
                                </p>
                            </div>
                        </div>

                        <div className="table-responsive mb-5">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nom</th>
                                        <th>Statut</th>
                                        <th className="!text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {candidats.map((candidat, keys) => {
                                        return (
                                            <tr key={keys}>
                                                <td>{keys + 1} </td>
                                                <td>
                                                    <div className="whitespace-nowrap">{candidat.name}</div>
                                                </td>

                                                <td>
                                                    <span
                                                        onClick={() => handleModalStatus(candidat.id)}
                                                        className={`cursor-pointer badge whitespace-nowrap ${candidat.activated ? ' bg-success ' : ' bg-pink-500 '

                                                            }`}
                                                    >
                                                        {candidat.activated ? <span>Activée</span> : <span>Desactivée</span>}
                                                    </span>

                                                </td>
                                                <td className="flex justify-around">

                                                    <Link href={route("dashboard.apply", candidat.id)} className='text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600'>
                                                        <FiEye />
                                                    </Link>

                                                    <span onClick={() => handleModalDelete(candidat.id)} className='cursor-pointer text-white p-2 rounded hover:text-gray-100 mr-2 bg-danger'>
                                                        <FiTrash />
                                                    </span>

                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>



                {/* Modal Basic */}
                {/* Modal change status */}

                <div className="mb-5">
                    <Transition appear show={modal1} as={Fragment}>
                        <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0" />
                            </Transition.Child>
                            <div id="zoomIn_up_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                                <div className="flex min-h-screen items-start justify-center px-4">
                                    <Dialog.Panel className="panel animate__animated animate__zoomInUp my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                            <div className="text-lg font-bold">Changer la visibilité du  formulaire {nameCandidat(selectIdForStatus, candidats)}</div>

                                            <button onClick={() => setModal1(false)} type="button" className="text-white-dark hover:text-dark">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="p-5">
                                            <p className='text-danger font-bold '>
                                                {statusCandidat(selectIdForStatus, candidats) === 0 ?
                                                    <span>Ce formulaire est deja desactivé</span> :
                                                    <span> Sachez que le fait d'activer ce formulaire desactivera automatiquement le formulaire actif </span>

                                                }
                                            </p>

                                            <div className="mt-8 flex items-center justify-end">
                                                <button onClick={() => setModal1(false)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    Retour
                                                </button>
                                                {statusCandidat(selectIdForStatus, candidats) === 1 ?
                                                    <button onClick={(e) => handleChangeStatus(e)} type="button" className="btn btn-outline-green">
                                                        Modifier
                                                    </button>
                                                    : null}

                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
                {/* Modal change status */}


                {/* Modal delete  */}
                <div className="mb-5">
                    <Transition appear show={modal2} as={Fragment}>
                        <Dialog as="div" open={modal2} onClose={() => setModal2(false)}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0" />
                            </Transition.Child>
                            <div id="zoomIn_up_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                                <div className="flex min-h-screen items-start justify-center px-4">
                                    <Dialog.Panel className="panel animate__animated animate__zoomInUp my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 bg-danger ">
                                            <div className="text-lg font-bold  text-white">Suppression du formulaire </div>
                                            <button onClick={() => setModal2(false)} type="button" className="text-white hover:text-dark">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="p-5">
                                            <p className='text-danger font-semibold flex  font-bold text-lg'>
                                                Voulez-vous vraiment Supprimer le  formulaire  {nameCandidat(selectIdForDelete, candidats)} ?
                                            </p>
                                            <div className="mt-8 flex items-center justify-end">
                                                <button onClick={() => setModal2(false)} type="button" className="btn btn-primary">
                                                    Retour
                                                </button>
                                                <button onClick={(e) => handleDelete(e)} type="button" className="btn btn-outline-danger  ltr:ml-4 rtl:mr-4">
                                                    Supprimer
                                                </button>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
                {/* Modal delete */}

            </div>
        </DefaultLayout>
    )
}
