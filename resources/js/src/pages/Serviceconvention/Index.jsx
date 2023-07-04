import React, { useState,useEffect } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiEdit, FiList, FiPlus, FiTrash,FiSave } from 'react-icons/fi'
import { usePage } from '@inertiajs/inertia-react';
import Select from 'react-select';
import { Link } from '@inertiajs/inertia-react'
import { DataTable } from 'mantine-datatable'
import { Inertia } from '@inertiajs/inertia';

export default function Create({service,id,convention,serachService}){
    const PAGE_SIZE = 15;
    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(service.slice(0, PAGE_SIZE));
    useEffect(() => {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRecords(service.slice(from, to));
    }, [page]);

    const myData = JSON.parse(convention.data)
    let nbr;
    if(myData.numberBeneficiary!==null){
      nbr=myData.numberBeneficiary
    }
    else{
      nbr=1
    }

    const valeurs = service.map(item => item.cout_service*nbr);
    const reqValeur=valeurs.map(item=>item)

    const somme = reqValeur.reduce((accumulateur, valeur) => accumulateur + valeur, 0);
    const totalServiceBeneficiary=somme/nbr

    const handleClick=(id)=>{
      Inertia.get(route('dashboard.save-convention.edit',id));
    }
   
console.log('service : ',serachService)

  return (
    <DefaultLayout>
      <div>
        <div className="flex items-center justify-between mb-5">
        </div>
        <div className="datatables mb-5">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
              <div className="flex justify-between mb-4">
                <h3 className="text-xl  mb-4">Les services rattachés à la convention numéro {id} assuré par le partenaire <span class="badge bg-success">{myData.partnerId['label']}</span> </h3>
                </div>
              <DataTable
          columns={[
            { accessor: 'service_id', title: "Numéro service ",render:(row)=>(
              <span>S{row.service_id}</span>
            ) }, 
            { accessor: 'cout', title: "Cout unitaire" },
            //{ accessor: 'partner', title: "Partenaire" },
            { accessor: 'objectif', title: "Objectif" },
            { accessor: 'cout_service', title: "Cout service" },
            { accessor: 'type_operator', title: "Type opérateur" },
            { accessor: '', title: "Action",render: (row) => (
              <button className='btn btn-danger' onClick={()=>handleClick(row.id)}>
                <FiTrash/>
              </button>
            ) },
            ,
          ]}
          records={records}
          totalRecords={service.length}
          recordsPerPage={PAGE_SIZE}
          page={page}
          onPageChange={(p) => setPage(p)}
        />
              </div>
            </div>
          </div>
        </div>

        <div className="datatables">
          <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
            <div className=" sm:w-full">
              <div className="panel">
              <div className="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Services</th>
                                            <th>Cout applicable</th>
                                            <th>1ère année</th>
                                            <th>Global</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                          service.map((item)=>{
                                           return(
                                            <>
                                            <tr key={item.id}>
                                              <td>S{item.service_id}</td>
                                              <td>{item.cout_service*nbr} {myData.devise.value}</td>
                                              <td>A voir</td>
                                              <td>A voir</td>
                                            </tr>
                                            </>
                                           )
                                          })
                                        }
                                        <tr>
                                          <td>Total des services</td>
                                          <td>{somme} {myData.devise.value}</td>
                                          <td>A voir</td>
                                          <td>A voir</td>
                                        </tr>
                                        <tr>
                                          <td>Total des services par bénéficiaire</td>
                                          <td>{totalServiceBeneficiary} {myData.devise.value}</td>
                                          <td>A voir</td>
                                          <td>A voir</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
