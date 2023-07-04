import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Link } from '@inertiajs/inertia-react';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';
import { encodeID } from '../../keys/Index';
import CandidatureFiltre from '../filtre/Candidaturefiltre';


function List({ inscription }) {
    console.log(inscription);
    const [data, setData] = useState()
    const dataInscription = inscription.map((item, index) => {
        const newObj = { ...JSON.parse(item.dataForm), status: item.status, id: item.user_id, index: index + 1 }
        return newObj;
    })
    console.log("data", dataInscription);
    // const steps=JSON.parse(inscription[0].steps);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('List'));
    });
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    //Skin: Striped
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(dataInscription);
    const [recordsData, setRecordsData] = useState(initialRecords);

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
        setInitialRecords(() => {
            return dataInscription.filter((item) => {
                return (
                    item.index.toString().includes(search.toLowerCase()) ||

                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.lastName.toLowerCase().includes(search.toLowerCase()) ||
                    item.emailAddress.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.toLowerCase().includes(search.toLowerCase()) ||
                    item.id.toString().includes(search.toLowerCase())

                );
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    const randomColor = () => {
        const color = ['secondary', 'success', 'warning'];
        const random = Math.floor(Math.random() * color.length);
        return color[random];
    };

    const randomStatus = () => {
        const status = ['PAID', 'APPROVED'];
        const random = Math.floor(Math.random() * status.length);
        return status[random];
    };


    return (
        <DefaultLayout>


            <div className="space-y-6">
                {/* Skin: Striped  */}
                <div className="panel">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Liste des candidatures</h5>
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="datatables">

                        <DataTable
                            striped
                            className="whitespace-nowrap table-striped"
                            records={recordsData}
                            columns={[
                                { accessor: 'index', title: 'ID' },
                                { accessor: 'name', title: 'Nom' },
                                { accessor: 'lastName', title: 'Prènom' },
                                { accessor: 'emailAddress', title: "Email" },
                                {
                                    accessor: 'status',
                                    title: 'Traitement',
                                    render: ({ status }) => <span className={status == "En cours" ? `badge bg-warning ` : `badge bg-success `}>{status}</span>,
                                },
                                {
                                    accessor: 'id',
                                    title: 'Action',
                                    render: ({ id }) => <Link href={route('dashboard.candidate.view', encodeID(id))} className='text-white inline-block p-2 rounded hover:text-gray-100 mr-2 bg-blue-600 '><FiEye /></Link>,
                                },
                            ]}
                            totalRecords={initialRecords.length}
                            recordsPerPage={pageSize}
                            page={page}
                            onPageChange={(p) => setPage(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize}
                            minHeight={200}
                            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        />
                    </div>
                </div>

            </div>

        </DefaultLayout>
    )
}

export default List
