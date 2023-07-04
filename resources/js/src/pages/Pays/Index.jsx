import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { DataTable } from 'mantine-datatable'
import { Link } from '@inertiajs/inertia-react'
import { useEffect, useState } from 'react';
import { GoSync,GoIssueReopened } from "react-icons/go";
import { Inertia } from '@inertiajs/inertia';


export default function Index({ pays }) {
  const PAGE_SIZE = 15;
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(pays.slice(0, PAGE_SIZE));
  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(pays.slice(from, to));
  }, [page]);

  //UPDATE STATUS OF REGION
 /* const handleClick=(id)=>{
    Inertia.get(route('dashboard.liste-pays.edit',{id}));
  }*/
  
  return (
    <DefaultLayout>
      <div className="panel">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">Liste des pays</h3>
        </div>
        <DataTable
          columns={[
            { accessor: 'code', title: "Code pays" }, 
            { accessor: 'fr', title: "Nom en français" }, 
            { accessor: 'en', title: "Nom en anglais" }, 
          ]}
          records={records}
          totalRecords={pays.length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </DefaultLayout>
  )
}
