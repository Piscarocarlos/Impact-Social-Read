import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
//pour data table
import { DataTable } from 'mantine-datatable';
import sortBy from 'lodash/sortBy';
import { setPageTitle } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
//fin lien utile

import { Link } from '@inertiajs/inertia-react'
import { useEffect, useState,Fragment } from 'react';
import { GoSync,GoIssueReopened,GoPencil ,GoTrashcan } from "react-icons/go";
import { Inertia } from '@inertiajs/inertia';
import { Dialog, Transition } from '@headlessui/react';
import { FiX, FiEdit, FiZap } from "react-icons/fi";
import Swal from 'sweetalert2';



export default function Index({ conventions,success }) {
  //DATA TABBLE########################################
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Column Chooser Table'));
  });

  
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(conventions, 'id'));
  const [recordsData, setRecordsData] = useState(initialRecords);

  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: 'id',
    direction: 'asc',
  });

  const [hideCols, setHideCols] = useState(['created_at']);

  const showHideColumns = (col, value) => {
    if (hideCols.includes(col)) {
      setHideCols((col) => hideCols.filter((d) => d !== col));
    } else {
      setHideCols([...hideCols, col]);
    }
  };

  const cols = [
    { accessor: 'id', title: 'Id' },
    { accessor: 'type_convention', title: 'Type' },
    { accessor: 'Status', title: 'Statut' },
    { accessor: 'created_at', title: 'Date' },
  ];

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
      return conventions.filter((item) => {
        return (
          item.id.toString().includes(search.toLowerCase()) ||
          item.type_convention.toLowerCase().includes(search.toLowerCase()) ||
          item.status.toString().includes(search.toLowerCase())
        );
      });
    });
  }, [search]);

  useEffect(() => {
    const data = sortBy(initialRecords, sortStatus.columnAccessor);
    setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    setPage(1);
  }, [sortStatus]);
  //FIN DATA TABLE

  const [modal10, setModal10] = useState(false);
  const [modalId, setModalId] = useState("");
  const showMessage = (success = '', type = 'success') => {
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

  useEffect(()=>{
    if (success) {
      showMessage(success);
    }
  },[success])

   //UPDATE STATUS TYPE CONVENTION
   const handleClick=(id)=>{
    Inertia.get(route('dashboard.type-convention.edit',id));
  }

  //UPDATE FORM TYPE CONVENTION
  const handelEdit = (id)=>{
    setModal10(true)
    setModalId(id)
   
  }
  const handelState=(modalId)=>{
    Inertia.get(route('dashboard.type-convention.show',modalId));
  }

  const boutons = [
    { id: 1, label:'btn btn-info',labIcon:FiEdit,methode:handelEdit},
   
  ];
  function toPascalCase(str) {
    return str
      .replace(/\w+/g, function (match) {
        return match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
      })
      .replace(/\s/g, '');
  }
  
  return (
    <DefaultLayout>
      <div className="panel datatables">
        <div className="flex justify-between mb-5">
          <h3 className="text-lg">Type de convention</h3>
        </div>


        <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
        <Link href={route('dashboard.type-convention.create')} className="btn btn-success">Création</Link>
          <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
            <div className="flex md:items-center md:flex-row flex-col gap-5">
              <div className="dropdown">
                <Dropdown
                  btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                  button={
                    <>
                      <span className="ltr:mr-1 rtl:ml-1">Colonnes</span>
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 9L12 15L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  }
                >
                  <ul className="!min-w-[140px]">
                    {cols.map((col, i) => {
                      return (
                        <li
                          key={i}
                          className="flex flex-col"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <div className="flex items-center px-4 py-1">
                            <label className="cursor-pointer mb-0">
                              <input
                                type="checkbox"
                                checked={!hideCols.includes(col.accessor)}
                                className="form-checkbox"
                                defaultValue={col.accessor}
                                onChange={(event) => {
                                  setHideCols(event.target.value);
                                  showHideColumns(col.accessor, event.target.checked);
                                }}
                              />
                              <span className="ltr:ml-2 rtl:mr-2">{col.title}</span>
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </Dropdown>
              </div>
            </div>
            <div className="text-right">
              <input type="text" className="form-input" placeholder="Recherche...." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>

        <DataTable
          className="whitespace-nowrap table-hover"
          records={recordsData}
          columns={[
            { accessor: 'id', title: 'Id', sortable: true, hidden: hideCols.includes('id') },
            {
              accessor: 'type_convention',
              title: 'Type',
              sortable: true,
              hidden: hideCols.includes('type_convention'),
              render: (row) => (
                toPascalCase(row.type_convention)
              )
            },
            {
              accessor: 'status',
              title: 'Statut',
              sortable: true,
              hidden: hideCols.includes('status'),
              render: (row) => (
                row.status == true ? <span className="badge bg-success">
                  Activé
                </span> :
                  <span className="badge bg-danger">
                    Désactivé
                  </span>
              )
            },
            { accessor: 'created_at', title: 'Date création', sortable: true, hidden: hideCols.includes('created_at') },
            {
              accessor: '', title: 'Action', sortable: true, hidden: hideCols.includes('Action'),
              render: (row) => (
                row.status == true ? <div className='flex space-x-2'>
                  <button className="btn btn-success" onClick={() => handleClick(row.id)}>
                    <FiZap />
                  </button>
                  {boutons.map((bouton) => (
                    <button key={bouton.id} className={bouton.label} onClick={() => bouton.methode(row.id)}>
                      <bouton.labIcon />
                    </button>
                  ))}
                </div>

                  : <div className='flex space-x-2'>
                    <button className="btn btn-danger" onClick={() => handleClick(row.id)}>
                      <FiZap />
                    </button>
                    {boutons.map((bouton) => (
                      <button key={bouton.id} className={bouton.label} onClick={() => bouton.methode(row.id)}>
                        <bouton.labIcon />
                      </button>
                    ))}
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
                      <h5 className="text-lg font-bold">Modification</h5>
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
                        <button  onClick={() => handelState(modalId)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
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
    </DefaultLayout>
  )
}
