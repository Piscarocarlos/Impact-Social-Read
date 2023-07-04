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
import { GoPencil, GoTrashcan } from "react-icons/go";
import { Inertia } from '@inertiajs/inertia';
import { Dialog, Transition } from '@headlessui/react';
import { FiX, FiEdit, FiZap } from "react-icons/fi";
import Swal from 'sweetalert2';



export default function Index({ partner_contact,success }) {

  //DATA TABBLE########################################
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPageTitle('Column Chooser Table'));
  });


  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(partner_contact, 'id'));
  const [recordsData, setRecordsData] = useState(initialRecords);

  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState({
    columnAccessor: 'id',
    direction: 'asc',
  });

  const [hideCols, setHideCols] = useState(['created_at','function','title','phone_fixe','profil_linkedin']);

  const showHideColumns = (col, value) => {
    if (hideCols.includes(col)) {
      setHideCols((col) => hideCols.filter((d) => d !== col));
    } else {
      setHideCols([...hideCols, col]);
    }
  };

  const cols = [
    { accessor: 'id', title: 'Id' },
    { accessor: 'name', title: 'Nom' },
    { accessor: 'first_name', title: 'Prénom' },
    { accessor: 'function', title: 'Fonction' },
    { accessor: 'title', title: 'Titre' },
    { accessor: 'civility', title: 'Civilité' },
    { accessor: 'email', title: 'Email' },
    { accessor: 'phone_mobile', title: 'Téléphone 1' },
    { accessor: 'phone_fixe', title: 'Téléphone 2' },
    { accessor: 'profil_linkedin', title: 'Profil Linkedin' },
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
      return partner_contact.filter((item) => {
        return (
          item.id.toString().includes(search.toLowerCase()) ||
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.first_name.toLowerCase().includes(search.toLowerCase()) ||
          item.function.toLowerCase().includes(search.toLowerCase()) ||
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.civility.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())
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

  const [modal10, setModal10] = useState(false);
  const [modalId, setModalId] = useState("");

  const [modaldelete, setModalDelete] = useState(false);
  const [modaldeletId, setModalDeleteId] = useState("");


  const handleClick=(id)=>{
    setModal10(true)
    setModalId(id)

  }
  const handelState=(modalId)=>{
    Inertia.get(route('dashboard.contact-partenaires.edit',modalId));
  }

  const handleDelete=(id)=>{
    setModalDelete(true)
    setModalDeleteId(id)

  }
  const handelStateDelete=(modaldeletId)=>{
    Inertia.get(route('dashboard.contact-partenaires.show',modaldeletId));
  }



  return (
    <DefaultLayout>
      <div className="panel datatables">
        <div className="flex justify-between mb-5">
          <h3 className="text-lg">Liste des contacts</h3>
        </div>
        <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
        <Link href={route('dashboard.contact-partenaires.create')} className="btn btn-success">Création</Link>
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
              accessor: 'name',
              title: 'Nom',
              sortable: true,
              hidden: hideCols.includes('name'),
              render: (row) => (
                row.name
              )
            },
            {
              accessor: 'first_name',
              title: 'Prénom',
              sortable: true,
              hidden: hideCols.includes('first_name'),
              render: (row) => (
                row.first_name
              )
            },
            {
              accessor: 'function',
              title: 'Fonction',
              sortable: true,
              hidden: hideCols.includes('function'),
              render: (row) => (
                row.function
              )
            },

            {
              accessor: 'title',
              title: 'Titre',
              sortable: true,
              hidden: hideCols.includes('title'),
              render: (row) => (
                row.title
              )
            },
            {
              accessor: 'civility',
              title: 'Civilité',
              sortable: true,
              hidden: hideCols.includes('civility'),
              render: (row) => (
                row.civility
              )
            },
            {
              accessor: 'email',
              title: 'Email',
              sortable: true,
              hidden: hideCols.includes('email'),
              render: (row) => (
               row.email
              )
            },
            {
              accessor: 'phone_mobile',
              title: 'Téléphone 1',
              sortable: true,
              hidden: hideCols.includes('phone_mobile'),
              render: (row) => (
                row.phone_mobile
              )
            },
            {
              accessor: 'phone_fixe',
              title: 'Téléphone 2',
              sortable: true,
              hidden: hideCols.includes('phone_fixe'),
              render: (row) => (
                row.phone_fixe
              )
            },
            {
              accessor: 'profil_linkedin',
              title: 'Profil Linkedin',
              sortable: true,
              hidden: hideCols.includes('profil_linkedin'),
              render: (row) => (
                row.profil_linkedin
              )
            },

            { accessor: 'created_at', title: 'Date création', sortable: true, hidden: hideCols.includes('created_at') },
            {
              accessor: '', title: 'Action', sortable: true, hidden: hideCols.includes('Action'),
              render: (row) => (
                <div className='flex space-x-2'>
                  <button className="btn btn-danger"  onClick={() =>handleDelete(row.id)}>
                 <GoTrashcan />
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
                        <button  onClick={() => handelStateDelete(modaldeletId)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
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
