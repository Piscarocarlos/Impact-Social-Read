import React from 'react'
import DefaultLayout from '../../../components/Layouts/DefaultLayout'
import { DataTable } from 'mantine-datatable'
import { Link } from '@inertiajs/inertia-react'
import { useEffect, useState } from 'react';
import { GoSync,GoIssueReopened,GoPencil ,GoTrashcan } from "react-icons/go";
import { Inertia } from '@inertiajs/inertia';




export default function Index({ section }) {
  const PAGE_SIZE = 15;
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(section.slice(0, PAGE_SIZE));
  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(section.slice(from, to));
  }, [page]);

  //UPDATE STATUS OF REGION
  const handleClick=(id)=>{
    Inertia.get(route('dashboard.section-one-candidate-ar.edit',{id}));
  }
  const handelEdit = (id)=>{
    Inertia.get(route('dashboard.section-one-candidate-ar.show',id));
  }
  const handelDelete = (id)=>{
    Inertia.delete(route('dashboard.section-one-candidate-ar.destroy',id));
    window.location.reload();
  }
  const boutons = [
    { id: 1, label:'btn btn-info',labIcon:GoPencil,methode:handelEdit},
    { id: 2, label:'btn btn-danger',labIcon:GoTrashcan,methode:handelDelete},
  ];
  /*for the modal*/
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  
  
  
  return (
    <DefaultLayout>
      <div className="panel">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">Liste des messages en arabe</h3>
          <Link href={route('dashboard.section-one-candidate-ar.create')} className="btn btn-success">Créer un message</Link>
        </div>
        <DataTable
          columns={[
            { accessor: '', title: "Message",render: (row) => (
                row.msg_info_candidature!=null>0? 
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"  onClick={() =>handleClick(row.id)}>
                     {row.msg_info_candidature}
                </button>
            :"error"
            ) }, 
           
            { accessor: '', title: "Action",render: (row) => (
             
                <div className='flex space-x-2'>
                    {boutons.map((bouton) => (
                        <button key={bouton.id} className={bouton.label} onClick={() =>bouton.methode(row.id)}>
                            <bouton.labIcon />
                        </button>
                    ))}
                </div>
            ), },
          ]}
          records={records}
          totalRecords={section.length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
        />
      </div>
     
    </DefaultLayout>
  )
}
