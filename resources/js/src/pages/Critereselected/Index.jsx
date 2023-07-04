import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { DataTable } from 'mantine-datatable'
import { Link } from '@inertiajs/inertia-react'
import { useEffect, useState } from 'react';
import { GoSync,GoIssueReopened,GoPencil ,GoTrashcan } from "react-icons/go";
import { Inertia } from '@inertiajs/inertia';



export default function Index({ critere }) {
  const PAGE_SIZE = 15;
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(critere.slice(0, PAGE_SIZE));
  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(critere.slice(from, to));
  }, [page]);

   //UPDATE STATUS TYPE OPERATOR SERVICE
   const handleClick=(id)=>{
    Inertia.get(route('dashboard.critere-selection.edit',id));
  }

  //UPDATE FORM TYPE OPERATOR SERVICE
  const handelEdit = (id)=>{
    Inertia.get(route('dashboard.critere-selection.show',id));
  }
  const boutons = [
    { id: 1, label:'btn btn-info',labIcon:GoPencil,methode:handelEdit},
    /*{ id: 2, label:'btn btn-danger',labIcon:GoTrashcan,methode:handelDelete},*/
  ];
  
  return (
    <DefaultLayout>
      <div className="panel">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">Les critères de sélection</h3>
          <Link href={route('dashboard.critere-selection.create')} className="btn btn-success">Créer </Link>
        </div>
        
        <DataTable
          columns={[
            { accessor: 'critere', title: "Critère de sélection" }, 
            { accessor: 'status', title: "Statut",render: (row) => (
              row.status==true?<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
               Activé
              </span>:
             <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
              Désactivé
             </span>
            )},
            { accessor: 'created_at', title: "Date de création" },
            { accessor: '', title: "Actions",render: (row) => (
                row.status==true ? <div className='flex space-x-2'>
                  <button className="btn btn-warning"  onClick={() =>handleClick(row.id)}>
                  <GoIssueReopened />
                  </button>
                  {boutons.map((bouton) => (
                      <button key={bouton.id} className={bouton.label} onClick={() =>bouton.methode(row.id)}>
                        <bouton.labIcon />
                      </button>
                  ))}
                </div>
  
               :<div className='flex space-x-2'>
               <button className="btn btn-primary"  onClick={() =>handleClick(row.id)}>
                  <GoSync /> 
                </button>
                {boutons.map((bouton) => (
                      <button key={bouton.id} className={bouton.label} onClick={() =>bouton.methode(row.id)}>
                        <bouton.labIcon />
                      </button>
                  ))}
                </div>
                
              
              ),},
          ]}
          records={records}
          totalRecords={critere.length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </DefaultLayout>
  )
}
