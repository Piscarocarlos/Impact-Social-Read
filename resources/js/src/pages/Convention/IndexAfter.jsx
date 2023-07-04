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
import { useEffect, useState, Fragment } from 'react';
import { GoSync, GoIssueReopened, GoPencil, GoTrashcan } from "react-icons/go";
import { FiEye } from "react-icons/fi";
import { Inertia } from '@inertiajs/inertia';
import { Dialog, Transition } from '@headlessui/react';
import { FiX, FiEdit, FiZap } from "react-icons/fi";



export default function Index({ convention }) {
  //DATA TABBLE########################################
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Column Chooser Table'));
  });


  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(convention, 'id'));
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
    { accessor: 'familleConvention', title: 'Famille convention' },
    { accessor: 'newConvention', title: 'Convention nouvelle' },
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
      return convention.filter((item) => {
        return (
          item.id.toString().includes(search.toLowerCase()) ||
          item.type_operator.toLowerCase().includes(search.toLowerCase()) ||
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

  const [modaldelete, setModalDelete] = useState(false);
  const [modaldeletId, setModalDeleteId] = useState("");


  const handleClick = (id) => {
    setModal10(true)
    setModalId(id)
  }
  const handelState = (modalId) => {
    Inertia.get(route('dashboard.convention.edit', modalId));
  }

  const handelEdit = (id) => {
    setModalDelete(true)
    setModalDeleteId(id)

  }
  const handelStateDelete = (modaldeletId) => {
    Inertia.get(route('dashboard.save-convention.show', modaldeletId));
  }

  const boutons = [
    { id: 1, label: 'btn btn-info', labIcon: GoPencil, methode: handelEdit },
    /*{ id: 2, label:'btn btn-danger',labIcon:GoTrashcan,methode:handelDelete},*/
  ];
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(convention.length / 15);

  const startIndex = (currentPage - 1) * 15;
  const endIndex = startIndex + 15;

  const currentItems = convention.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handelDataConvention = (defaultData) => {
    const data = JSON.parse(defaultData)
    return data
  }

  console.log(
    convention.map((item, index) =>
      JSON.parse(item.data)
    )
  )
  return (
    <DefaultLayout>
      <div className="panel datatables">
        <div className="flex justify-between mb-5">
          <h3 className="text-lg">Liste des conventions en attente de finalisation</h3>
        </div>
        <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
          <Link href={route('dashboard.convention.index')} className="btn btn-warning">Retour</Link>
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
            { accessor: 'id', title: 'Convention', sortable: true, hidden: hideCols.includes('id'),render:(row)=>(
              <span>Convention numéro {row.id}</span>
            ) },
            {
              accessor: 'familleConvention',
              title: 'Famille convention',
              sortable: true,
              hidden: hideCols.includes('familleConvention'),
              render: (row) => (
                handelDataConvention(row.data).familleConvention.label
              )
            },
            {
              accessor: 'newConvention',
              title: 'Convention nouvelle',
              sortable: true,
              hidden: hideCols.includes('newConvention'),
              render: (row) => (
                handelDataConvention(row.data).newConvention.value
              )
            },
            {
              accessor: 'status',
              title: 'Statut',
              sortable: true,
              hidden: hideCols.includes('status'),
              render: (row) => (
                <span className="badge bg-warning">En attente</span>
              )
            },
            { accessor: 'created_at', title: 'Date création', sortable: true, hidden: hideCols.includes('created_at') },
            {
              accessor: '', title: 'Action', sortable: true, hidden: hideCols.includes('Action'),
              render: (row) => (
                <div className='flex space-x-2'>
                  <button className="btn btn-info" onClick={() => handleClick(row.id)}>
                    <FiEdit />
                  </button>
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
                      <button onClick={() => handelState(modalId)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
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


      <div>
        <Transition appear show={modaldelete} as={Fragment}>
          <Dialog as="div" open={modaldelete} onClose={() => setModal10(false)}>
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
                    <h5 className="text-lg font-bold">Suppression</h5>
                    <button onClick={() => setModalDelete(false)} type="button" className="text-white-dark hover:text-dark">
                      <FiX />
                    </button>
                  </div>
                  <div className="p-5">
                    <p>
                      Voulez-vous supprimer cet élément ?
                    </p>
                    <div className="mt-8 flex items-center justify-end">
                      <button onClick={() => setModalDelete(false)} type="button" className="btn btn-outline-danger">
                        Non
                      </button>
                      <button onClick={() => handelStateDelete(modaldeletId)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
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
