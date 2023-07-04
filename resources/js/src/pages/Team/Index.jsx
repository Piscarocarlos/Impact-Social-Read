import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
//pour data table
import { DataTable } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import { useDispatch } from 'react-redux';
//fin lien utile
import { Link, usePage, useForm } from '@inertiajs/inertia-react'
import { useEffect, useState, Fragment } from 'react';
import { GoTrashcan } from "react-icons/go";
import { Inertia } from '@inertiajs/inertia';
import { Dialog, Transition } from '@headlessui/react';
import { FiX, FiEdit, FiSave, FiTrash } from "react-icons/fi";

import Swal from 'sweetalert2';



export default function Index({ teams, success }) {

    const { roles } = usePage().props;

    const { data, post, setData, errors, reset } = useForm({
        name: "",
        email: "",
        phoneNumber: "",
        role_id: "",
        id: "",
    })

    const submit = (e) => {
        e.preventDefault();
        post(route('dashboard.teams.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setModal20(false);
                showMessage(success);
                reset();
            }
        });


    }

    // Edn modal

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Teams'));
    });


    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(teams, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [sortStatus, setSortStatus] = useState({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [hideCols, setHideCols] = useState(['created_at']);
    const [search, setSearch] = useState('');
    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);
    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    useEffect(() => {
        setInitialRecords(() => {
            return teams.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);


    const [modal10, setModal10] = useState(false);
    const [modalId, setModalId] = useState("");

    const [modaldelete, setModalDelete] = useState(false);
    const [modaldeletId, setModalDeleteId] = useState("");
    const [modal20, setModal20] = useState(false);


    const handleClick = (id) => {
        setModal10(true)
        setModalId(id)
    }
    const handelState = (modalId) => {
        Inertia.get(route('dashboard.teams.edit', modalId));
    }

    const handleDelete = (id) => {
        setModalDelete(true)
        setModalDeleteId(id)

    }
    const handelStateDelete = (modaldeletId) => {
        setModalDelete(false);
        console.log('bannir');
        Inertia.delete(route('dashboard.teams.destroy', modaldeletId));
    }
    const showMessage = (success = "Membre Créer avec succès", type = 'success') => {
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

    useEffect(() => {
        if (success) {
            showMessage(success);
        }
    }, [success])

    return (
        <DefaultLayout>
            <div className="panel datatables">
                <div className="flex justify-between mb-5">
                    <h3 className="text-lg">Teams Informations.</h3>
                </div>
                <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
                    <button onClick={() => setModal20(true)} className="btn btn-success">Créer un membre.</button>
                    <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                        <div className="flex md:items-center md:flex-row flex-col gap-5">
                        </div>
                        <div className="text-right">
                            <input type="text" className="form-input" placeholder="Recherche...." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                </div>
                <DataTable
                    className="whitespace-nowrap table-hover "
                    records={recordsData}
                    columns={[
                        {
                            accessor: 'keys', title: 'Keys', sortable: true, hidden: hideCols.includes('keys'),
                            render: (row) => (row.keys)
                        },
                        {
                            accessor: 'name',
                            title: 'Nom',
                            sortable: true,
                            hidden: hideCols.includes('Nom'),
                            render: (row) => (
                                row.name
                            )
                        },
                        {
                            accessor: 'email',
                            title: 'E-mail',
                            sortable: true,
                            hidden: hideCols.includes('E-mail'),
                            render: (row) => (
                                row.email
                            )
                        },
                        {
                            accessor: 'phone',
                            title: 'Phone',
                            sortable: true,
                            hidden: hideCols.includes('Role'),
                            render: (row) => (
                                row.phone
                            )
                        },
                        {
                            accessor: 'role',
                            title: 'Role',
                            sortable: true,
                            hidden: hideCols.includes('Role'),
                            render: (row) => (
                                row.role
                            )
                        },
                        {
                            accessor: 'created_at',
                            title: "Création",
                            sortable: true,
                            hidden: hideCols.includes('Date'),
                            render: (row) => (
                                row.created_at
                            )
                        },

                        {
                            accessor: 'created_at', title: 'création', sortable: true, hidden: hideCols.includes('created_at'),
                            render: (row) => (
                                row.created_at
                            )
                        },
                        {
                            accessor: 'status', title: 'Status', sortable: true, hidden: hideCols.includes('Status'),
                            render: (row) => (
                                row.status === "nv" ? <div className='flex space-x-1'>
                                    <button className="btn btn-warning  w-20">
                                        En cours
                                    </button>
                                </div> : <div className='flex space-x-1'>
                                    <button className="btn btn-success w-20">
                                        Confirmer
                                    </button>
                                </div>
                            ),
                        },
                        {
                            accessor: '', title: 'Action', sortable: true, hidden: hideCols.includes('Action'),
                            render: (row) => (
                                <div className='flex space-x-2'>
                                    <span className="btn btn-danger" onClick={() => handleDelete(row.id)}>
                                        <GoTrashcan />
                                    </span>
                                    <span className="btn btn-info" onClick={() => handleClick(row.id)}>
                                        <FiEdit />
                                    </span>
                                </div>
                            ),
                        },


                    ]}
                    highlightOnHover
                    totalRecords={initialRecords.length}
                    recordsPerPage={pageSize}
                    page={page}
                    onPageChange={(p) => setPage(p)}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={setPageSize}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    minHeight={200}
                    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                />
            </div>

            <div>
                <Transition appear show={modal10} as={Fragment}>
                    <Dialog as="div" open={modal10} onClose={() => setModal10(false)}>
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
                        <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                            <div className="flex min-h-screen items-start justify-center px-4">

                                <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <h5 className="text-lg font-bold">Modifications</h5>
                                        <button onClick={() => setModal10(false)} type="button" className="text-white-dark hover:text-dark">
                                            <FiX />
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <p>
                                            Voulez-vous modifier cet élément ?
                                        </p>
                                        <div className="mt-8 flex items-center justify-end">
                                            <button onClick={() => setModal10(false)} type="button" className="btn btn-outline-danger">
                                                Non
                                            </button>
                                            <button onClick={() => handelState(modalId)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Oui
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>


                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>

            <div>
                <Transition appear show={modaldelete} as={Fragment}>
                    <Dialog as="div" open={modaldelete} onClose={() => setModal10(false)}>
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
                        <div id="slideIn_down_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                            <div className="flex min-h-screen items-start justify-center px-4">
                                <Dialog.Panel className="panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                        <h5 className="text-lg font-bold text-danger">Bannissement</h5>
                                        <button onClick={() => setModalDelete(false)} type="button" className="text-white-dark hover:text-dark">
                                            <FiX />
                                        </button>
                                    </div>
                                    <div className="p-5">
                                        <p>
                                            Voulez-vous bannir ce membre ?
                                        </p>
                                        <div className="mt-8 flex items-center justify-end">
                                            <button onClick={() => setModalDelete(false)} type="button" className="btn btn-outline-danger">
                                                Non
                                            </button>
                                            <button onClick={() => handelStateDelete(modaldeletId)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                Oui
                                            </button>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>



            <div>
                <Transition appear show={modal20} as={Fragment}>
                    <Dialog as="div" open={modal20} onClose={() => setModal20(false)}>
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
                        <div id="login_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                            <div className="flex min-h-screen items-start justify-center px-4">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="panel my-8 w-3/4 overflow-hidden rounded-lg border-0 py-1 px-4 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-between p-5 text-lg font-semibold dark:text-white">
                                            <h5 className="text-bold">Créer un membre </h5>
                                            <button type="button" onClick={() => setModal20(false)} className="text-white-dark hover:text-dark">
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

                                        <div className="p-5 m-5">


                                            <form
                                                onSubmit={submit}
                                            >
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="my-2">
                                                        <label htmlFor="name" className="text-base">Nom <span className='text-danger'>*</span></label>
                                                        <input type="text"
                                                            value={data.name} onChange={e => setData('name', e.target.value)}
                                                            className="form-input " placeholder="Nom " />


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
                                                        <label htmlFor="phoneNumber" className="text-base">Téléphone <span className='text-danger'>*</span></label>
                                                        <input type="text"
                                                            value={data.phoneNumber} onChange={e => setData('phoneNumber', e.target.value)}
                                                            className="form-input " placeholder="Phone" />
                                                        {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
                                                    </div>
                                                    <div className="my-2">
                                                        <label htmlFor="role_id" className="text-base">Role <span className='text-danger'>*</span></label>
                                                        <select type="text"
                                                            value={data.role_id} onChange={e => setData('role_id', e.target.value)}
                                                            className="form-select" placeholder="Role" >
                                                            <option defaultValue={''} desabled="desabled">Sélectionner un role</option>
                                                            {roles.map((role, index) => (
                                                                <option
                                                                    key={index} value={role.id}>
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
                                                    <button onClick={() => setModal20(false)} type="button" className="btn btn-outline-danger gap-1 ">
                                                        <FiTrash className="mr-4 rlt:order-2" />
                                                        <span>Annuler</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </DefaultLayout>
    )
}
