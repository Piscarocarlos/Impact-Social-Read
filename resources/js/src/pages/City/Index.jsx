import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { DataTable } from 'mantine-datatable'
import { Link } from '@inertiajs/inertia-react'
import { useEffect, useState } from 'react';
import { GoSync,GoIssueReopened } from "react-icons/go";
import { Inertia } from '@inertiajs/inertia';

export default function Index({ cities }) {
  const PAGE_SIZE = 15;
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(cities.slice(0, PAGE_SIZE));
  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(cities.slice(from, to));
  }, [page]);

   //UPDATE STATUS OF CITY
   const handleClick=(id)=>{
    Inertia.get(route('dashboard.villes.edit',{id}));
  }

  return (
    <DefaultLayout>
      <div className="panel">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">Liste des villes</h3>
        </div>
        <DataTable
          columns={[
            { accessor: 'name_city', title: "Nom de la ville" }, 
            { accessor: 'province_id', title: "Province" },
            { accessor: 'status_cities', title: "Statut de la ville",render: (row) => (
              row.status_cities==true?<span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                Activé
              </span>:
             <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
              Désactivé
             </span>
            )  },
            { accessor: 'created_at', title: "Date de création" },
            { accessor: '', title: "Actions sur la ville" ,render: (row) => (
              row.status_cities==true?<button className="btn btn-warning"  onClick={() =>handleClick(row.id)}>
                <GoIssueReopened />
             </button>:<button className="btn btn-primary"  onClick={() =>handleClick(row.id)}>
                <GoSync /> 
              </button>
            ),},
          ]}
          records={records}
          totalRecords={cities.length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </DefaultLayout>
  )
}
