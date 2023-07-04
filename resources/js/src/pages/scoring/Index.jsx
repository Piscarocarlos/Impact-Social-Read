import React, { useEffect, useState, Fragment } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { MdCreate } from "react-icons/md";
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';
import Select from 'react-select';
import { Dialog, Transition } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';

const Index = ({champScoring,totalcoef}) => {
    const [modal1, setModal1] = useState(false);
    const [dataChampScoring,setDataChampScoring]=useState();
    const [currentCoef,setCurrentCoef]=useState()
    const [id,setId]=useState(0)
console.log(dataChampScoring);
    const handleModalStatus = (id,coef) =>{ setModal1(true); setId(id);setCurrentCoef(coef)}
    const { data, setData, processing, errors, reset, put, post } = useForm({
        coef: null,
    });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Index'));
        setDataChampScoring(champScoring);
    });
    const showMessage = (msg = '', type = 'error') => {
        const toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };
    const submit = (e) => {
        e.preventDefault();
        if (data.coef<currentCoef) {
            post(route('dashboard.scoring.update.status',id), {});
            setModal1(false); 
        }
      else  if ((((100-totalcoef)+currentCoef)-data.coef)<0) {
            showMessage('Le cummule des Poids depasse 100%')
        } else {
            post(route('dashboard.scoring.update.status',id), {});
            setModal1(false); 
        }
       
    }
    
    const dataChamp = [
        { "id": 1, "name": "Région", "value": "region", "type": true, "status": true, "coef":5 },
        { "id": 2, "name": "Province", "value": "province", "type": true, "status": false, "coef":5 },
        { "id": 3, "name": "Ville", "value": "city", "type": true, "status": true, "coef":5 },
        { "id": 4, "name": "Situation sociale", "value": "socialSituation", "type": true, "status": true, "coef":5 },
        { "id": 5, "name": "Situation d'handicap", "value": "handicapSituation", "type": true, "status": true, "coef":5 },
        { "id": 6, "name": "Prise en charge par un EPS", "value": "supportByAnEPS", "type": true, "status": true, "coef":5 },
        { "id": 7, "name": "Logement", "value": "housing", "type": true, "status": true, "coef":5 },
        { "id": 8, "name": "Orphelin", "value": "orphelinType", "type": true, "status": true, "coef":5 },
        { "id": 9, "name": "Prise en charge par le parent", "value": "parentalCare", "type": true, "status": true, "coef":5 },
        { "id": 10, "name": "Le montant de la pension", "value": "amountPension", "type": true, "status": true, "coef":5 },
        { "id": 11, "name": "Type d'handicap", "value": "handicapType", "type": true, "status": true, "coef":5 },
        { "id": 12, "name": "Le pourcentage de votre handicap", "value": "handicapPercentage", "type": true, "status": true, "coef":5 },
        { "id": 13, "name": "Votre père travaille", "value": "workSituationFather", "type": true, "status": true, "coef":5 },
        { "id": 14, "name": "Votre mère travaille", "value": "workSituationMother", "type": true, "status": true, "coef":5 },
        { "id": 15, "name": "Compte bancaire du père", "value": "situationBankFather", "type": true, "status": true, "coef":5 },
        { "id": 16, "name": "Compte bancaire de la mère", "value": "situationBankMother", "type": true, "status": true, "coef":5 },
        { "id": 17, "name": "Revenu mensuel du père", "value": "fatherMonthlyAmount", "type": true, "status": true, "coef":5 },
        { "id": 18, "name": "Revenu mensuel de la mère", "value": "motherMonthlyAmount", "type": true, "status": true, "coef":5 },
        { "id": 19, "name": "Année du Bac", "value": "yearBac", "type": true, "status": true, "coef":5 },
        { "id": 20, "name": "Nom du lycée", "value": "schoolName", "type": true, "status": true, "coef":5 },
        { "id": 21, "name": "Filière du Bac", "value": "bacStream", "type": true, "status": true, "coef":5 },
        { "id": 22, "name": "Note du Bac régional", "value": "regionalBacScore", "type": false, "status": false, "coef":5 },
        { "id": 23, "name": "Note du premier semestre ", "value": "firstSemesterGrade", "type": false, "status": true, "coef":5 },
        { "id": 24, "name": "Nombre total de frères et soeurs", "value": "TotalNumberOfSiblings", "type": false, "status": true, "coef":5 },
        { "id": 25, "name": "Nombre de frères et soeurs mariés", "value": "NumberOfSiblingsMarried", "type": false, "status": true, "coef":5 },
        { "id": 26, "name": "Nombre de frères et soeurs qui travaillent", "value": "NumberOfWorkingSiblings", "type":false, "status": true, "coef":5 },
    ]
console.log('coef',totalcoef);
    return (
        <DefaultLayout>
            <div>
                <div className=" ">
                    <div className="panel rounded-md p-4 ">
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-full my-2 pr-0 lg:pr-2 flex">
                                <p className="text-base font-bold pb-6 flex items-center">
                                    <i className="fas fa-list mr-3"></i> Liste des Champs pour le scoring
                                </p>
                            </div>
                            <div className="flex w-full justify-end my-4">
                                {/* <button onClick={() => setModal1(true)} type="button" className="btn btn-success w-1/3 gap-2 ">
                                    <MdCreate />
                                    Créer un champ
                                </button> */}
                                <p className="text-base font-bold pb-6 flex items-center">
                                 Poids restant : {100-totalcoef}%
                                </p>
                            </div>
                        </div>

                        <div className="table-responsive mb-5">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nom</th>
                                        <th>Type</th>
                                        <th>Poids</th>
                                        <th>Statut</th>

                                        <th className="!text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataChampScoring?.map((item, index) => (<tr>
                                        <td>{index + 1} </td>
                                        <td>{item.name} </td>
                                        <td> {item.type ? <span>Fermé</span> : <span>Ouvert</span>}</td>
                                        <td>
                                         { item.status?  <span
                                                onClick={() => handleModalStatus(item.id,item.coef)}
                                                className="cursor-pointer badge whitespace-nowrap  bg-dark"
                                            >
                                                {item.coef}%
                                            </span>
                                        :
                                        <span  className=" badge whitespace-nowrap  bg-danger">
                                                {'-'}
                                            </span>    
                                        }

                                        </td>
                                        <td>
                                           <Link href={route('dashboard.scoring.update.status',item.id)} method="post"  as="button"><span
                                                className={`cursor-pointer badge whitespace-nowrap ${item.status ? ' bg-success ' : ' bg-pink-500 '

                                                    }`}
                                            >
                                                {item.status? <span>Activé</span> : <span>Desactivé</span>}
                                            </span>
                                            </Link> 
                                        </td>
                                        <td className="flex justify-around">
                                            {/* <Link href="#" className='text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600'>
                                                <FiEye />
                                            </Link> */}
                                            <Link href={route('dashboard.scoring.create',item.id)} className='text-white p-2 rounded hover:text-gray-100 mr-2 bg-green-600'>
                                                <MdCreate />
                                            </Link>
                                        </td>
                                    </tr>))}



                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Transition appear show={modal1} as={Fragment}>
                        <Dialog as="div" open={modal1} onClose={() => setModal1(false)}>
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
                            <div id="zoomIn_up_modal" className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
                                <div className="flex min-h-screen items-start justify-center px-4">
                                    <Dialog.Panel className="panel animate__animated animate__zoomInUp my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                        <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                                            <h5 className="text-lg font-bold">Modal Title</h5>
                                            <button onClick={() => setModal1(false)} type="button" className="text-white-dark hover:text-dark">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="p-5">
                                            <form onSubmit={submit}>
                                                <div className="flex flex-wrap -mx-3 mb-6">
                                                    <div className="w-full px-3">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  dark:bg-black dark:text-white" htmlFor="grid-password">
                                                         Changer le poids du champ
                                                        </label>
                                                        
                                                        <input  onChange={e => setData('coef', e.target.value)} className="appearance-none block w-full  dark:bg-black dark:text-white  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            id={id} type="number" placeholder="Poid du champ" />
                                                        {errors.coef && <div className="text-red-500 text-xs">{errors.coef}</div>}
                                                        <span className='text-gray-600 text-xs italic'>poids actuel du champ {currentCoef}% </span>

                                                        {/* <p className="text-gray-600 text-xs italic">ce poid servira</p> */}
                                                    </div>
                                                    
                                                    {/* button de validation en vert */}
                                                    <div className="w-full px-3">
                                                        <button type="submit"  className="bg-green-500 w-full mt-5 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                                          valider
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                            {/* <div className="mt-8 flex items-center justify-end">
                                                <button onClick={() => setModal1(false)} type="button" className="btn btn-outline-danger">
                                                    Discard
                                                </button>
                                                <button  type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                    Save
                                                </button>
                                            </div> */}
                                        </div>
                                    </Dialog.Panel>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            </div>
        </DefaultLayout>
    )
}

export default Index
