import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { DataTable } from 'mantine-datatable'
import { Link } from '@inertiajs/inertia-react'
import { useEffect, useState } from 'react';
import { GoPencil, GoTrashcan } from "react-icons/go";
import { Inertia } from '@inertiajs/inertia';


export default function Index({ handicap }) {
  const PAGE_SIZE = 15;
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(handicap.slice(0, PAGE_SIZE));
  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(handicap.slice(from, to));
  }, [page]);

 
  const handleClick=(id)=>{
    Inertia.get(route('dashboard.type-handicap.edit',{id}));
  }
  const handleDelete=(id)=>{
    Inertia.get(route('dashboard.type-handicap.show',id));
  }
  
  return (
    <DefaultLayout>
      <div className="panel">
        <div className="flex justify-between">
          <h3 className="text-xl font-bold">Les types d'handicap</h3>
         
        </div>
        
        <DataTable
          columns={[
            { accessor: 'type_handicap', title: "Type d'handicap" }, 
            { accessor: '', title: "Actions",render: (row) => (
              <div className='flex space-x-2'>
                  <button className="btn btn-primary"  onClick={() =>handleClick(row.id)}>
                     <GoPencil /> 
                 </button>
                 <button className="btn btn-danger"  onClick={() =>handleDelete(row.id)}>
                 <GoTrashcan />
                 </button>
                 
              </div>
             ), },
          ]}
          records={records}
          totalRecords={handicap.length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
        />
      </div>
    </DefaultLayout>
  )
}
