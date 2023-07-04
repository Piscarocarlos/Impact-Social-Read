import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { DataTable } from 'mantine-datatable'
import { Link } from '@inertiajs/inertia-react'
import { useEffect, useState } from 'react';
import { GoSync,GoIssueReopened,GoTrashcan  } from "react-icons/go";
import { Inertia } from '@inertiajs/inertia';

export default function Index({periode}) {
  const PAGE_SIZE = 15;
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(periode.slice(0, PAGE_SIZE));
  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(periode.slice(from, to));
  }, [page]);

     //UPDATE STATUS OF PERIODE CANDIDATURE
     const handleClick=(id)=>{
      Inertia.get(route('dashboard.periode-candidature.edit',{id}));
    }
     const handleDelete=(id)=>{
      Inertia.get(route('dashboard.periode-candidature.show',{id}));
    }

  return (
    <DefaultLayout>
      <div className="panel">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">Liste des périodes de candidature</h3>
        
        </div>
        <DataTable
          columns={[
            { accessor: 'date_debut', title: "Date de début" }, 
            { accessor: 'date_fin', title: "Date de fin" },
            { accessor: 'status', title: "Autorisation d'inscription" ,render: (row) => (
              row.status==true?<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                Oui
              </span>:
             <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
            Non
             </span>
            ) },
            { accessor: 'created_at', title: "Date de création" },
            { accessor: '', title: "Actions sur la période",render: (row) => (
              row.status==true?
              <div className='flex space-x-2'>
                <button className="btn btn-warning"  onClick={() =>handleClick(row.id)}>
                  <GoIssueReopened />
                </button>
                <button className='btn btn-danger' onClick={() =>handleDelete(row.id)}>
                  <GoTrashcan />
                </button>
             </div>:
             <div className='flex space-x-2'>
             <button className="btn btn-primary"  onClick={() =>handleClick(row.id)}>
                <GoSync /> 
              </button>
              <button className='btn btn-danger' onClick={() =>handleDelete(row.id)}>
                  <GoTrashcan />
                </button>
              </div>
            ),  },
          ]}
          records={records}
          totalRecords={periode.length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </DefaultLayout>
  )
}
