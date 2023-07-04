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
    Inertia.get(route('dashboard.section-three-candidate.edit',{id}));
  }
  const handelEdit = (id)=>{
    Inertia.get(route('dashboard.section-three-candidate.show',id));
  }
  const handelDelete = (id)=>{
    Inertia.delete(route('dashboard.section-three-candidate.destroy',id));
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
          <h3 className="text-xl font-bold">Liste des cards</h3>
          <Link href={route('dashboard.section-three-candidate.create')} className="btn btn-success">Créer un card</Link>
        </div>
        
        <DataTable
          columns={[
            { accessor: 'titre', title: "Titre",render: (row) => (
                row.titre!=null>0? 
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"  onClick={() =>handleClick(row.id)}>
                     {row.titre}
                </button>
            :"error"
            ) }, 
            { accessor: 'status', title: "Statut du message",render: (row) => (
              row.status==true?<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                Activé
              </span>:
             <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
              Désactivé
             </span>
            )},
            { accessor: '', title: "Action",render: (row) => (
              row.status==true?
                <div className='flex space-x-2'>
                    <button className="btn btn-warning"  onClick={() =>handleClick(row.id)}>
                        <GoIssueReopened />
                    </button>
                    {boutons.map((bouton) => (
                        <button key={bouton.id} className={bouton.label} onClick={() =>bouton.methode(row.id)}>
                            <bouton.labIcon />
                        </button>
                    ))}
                </div>
             :
             <div className='flex space-x-2'>
                <button className="btn btn-primary"  onClick={() =>handleClick(row.id)}>
                    <GoSync /> 
                </button>
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
