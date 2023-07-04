import React, { useState ,Fragment} from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { usePage } from '@inertiajs/inertia-react';
import Select from 'react-select';
import { Link } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia';
import { Dialog, Transition } from '@headlessui/react';
import { FiX } from "react-icons/fi";
import { GoSync,GoIssueReopened,GoPencil ,GoTrashcan } from "react-icons/go";
import { FiPrinter,FiClipboard,FiUsers,FiCalendar,FiFile,
    FiTrendingUp,FiPieChart,FiCheckSquare,FiGrid,FiEye,FiDivide,FiDownloadCloud } from "react-icons/fi";

export default function Create() {
    const { convention } = usePage().props;
    const myData = JSON.parse(convention.data)
    let {
        reporting,
        region,typeBeneficiary,
        province,
        ville,
        genre,
        filiere
        ,year
        ,situation
        ,handicap
        ,eps
        ,logement
        ,orphelin
        ,priseCharge,
        service
    }=""
    if(myData.service!==null){
        service=myData.service.map((dt)=>{
            return dt.value
        })
    }

    if(myData.modelReporting!==null){
       reporting=myData.modelReporting.map((dt)=>{
            return  dt.value
        })
    }
   
    if(myData.region!==null){
       region=myData.region.map((dt)=>{
            return dt.value
        })
    }
    if(myData.typeBeneficiary!==null){
       typeBeneficiary=myData.typeBeneficiary.map((dt)=>{
            return dt.value
        })
    }
   
   if(myData.province!==null){
   province=myData.province.map((dt)=>{
        return dt.value
    })
   }

   if(myData.ville!==null){
   ville=myData.ville.map((dt)=>{
        return dt.value
    })
   }

    if(myData.genre!==null){
       genre=myData.genre.map((dt)=>{
            return dt.value
        })
    }
   if(myData.filiere!==null){
   filiere=myData.filiere.map((dt)=>{
        return dt.value
    })
   }
    if(myData.year!==null){
       year=myData.year.map((dt)=>{
            return  dt.value
        })
    }
 if(myData.situation!==null){
   situation=myData.situation.map((dt)=>{
        return  dt.value
    })
 }
    
   if(myData.handicap!==null){
   handicap=myData.handicap.map((dt)=>{
        return  dt.value
    })
   }

    if(myData.eps!==null){
       eps=myData.eps.map((dt)=>{
            return  dt.value
        })
    }

    if(myData.logement!==null){
       logement=myData.logement.map((dt)=>{
            return  dt.value
        })
    }

   if(myData.orphelin!==null){
   orphelin=myData.orphelin.map((dt)=>{
        return dt.value
    })
   }
    
    if(myData.priseCharge!==null){
       priseCharge=myData.priseCharge.map((dt)=>{
            return  dt.value
        })
        
    }
    /**LA PARTIE DES VARIABLE NECESSAIRE POUR LES MODALE */
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalId, setModalId] = useState("");

    const [modalStatut, setModalStatut] = useState(false);
    const [modalStatutId, setModalStatutId] = useState("");

    const [modalDelete, setModalDelete] = useState(false);
    const [modalDeleteId, setModalDeleteId] = useState("");

    const [modalService, setModalService] = useState(false);
    const [modalServiceId, setModalServiceId] = useState("");

    const [modalView, setModalView] = useState(false);
    const [modalViewId, setModalViewId] = useState("");

    const handelUpdate=(modalId)=>{
        Inertia.get(route('dashboard.convention.edit',modalId));
      }
    const handelStatut=(modalStatutId)=>{
        Inertia.get(route('dashboard.convention-update.edit',modalStatutId));
      }
    const handelDelete=(modalDeleteId)=>{
        Inertia.get(route('dashboard.save-convention.show',modalDeleteId));
      }
    const handelService=(modalServiceId)=>{
        Inertia.get(route('dashboard.service-convention.edit',modalServiceId));
      }
    const handelView=(modalViewId)=>{
        Inertia.get(route('dashboard.service-convention.show',modalViewId));
      }
    const handleClick=(id)=>{
        setModalUpdate(true)
        setModalId(id)
      }

    const handleStatutChange=(id)=>{
        setModalStatut(true)
        setModalStatutId(id)
      }
      const handelEdit = (id)=>{
        setModalDelete(true)
        setModalDeleteId(id)
        
      }
      const handelEditService = (id)=>{
        setModalService(true)
        setModalServiceId(id)
        
      }
      const handelShowtService = (id)=>{
        setModalView(true)
        setModalViewId(id)
      }

      const handelPDF=(id)=>{
        Inertia.get(route('dashboard.file.convention',id));
      }

    //console.log(myData)
    return (
        <DefaultLayout>
            <div>
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Dossier de la convention</h5>
                </div>
                <div className="datatables mb-4">
                    <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                        <div className=" sm:w-full">
                            <div className="panel">
                                <div className="grid grid-cols-6 gap-3">
                                    <div className="my-2">
                                        <button className='btn btn-secondary w-full'  onClick={() =>handleClick(convention.id)}>
                                        <GoPencil />  Modifier
                                        </button>
                                    </div>
                                    <div className="my-2">
                                        <button className='btn btn-info w-full' onClick={()=>handleStatutChange(convention.id)}>
                                            <GoSync /> Statut</button>
                                    </div>
                                    <div className="my-2">
                                        <button className='btn btn-danger w-full' onClick={() =>handelEdit(convention.id)}>
                                            <GoTrashcan/> Supprimer
                                        </button>
                                    </div>
                                    <div className="my-2">
                                        <button className='btn btn-success w-full' onClick={()=>alert("Cette fonctionnalité est en attente de validation pour générer le document")}>
                                        <FiPrinter/> Document {/**target='_bank' href={`/dashboard/file-convention/${convention.id}`} */}
                                        </button>
                                    </div>
                                    <div className="my-2">
                                        <button className='btn btn-warning w-full' onClick={()=>handelEditService(convention.id)}>
                                        <FiDivide/>  Services 
                                        </button>
                                    </div>
                                    <div className="my-2">
                                        <button className='btn btn-primary w-full' onClick={()=>handelShowtService(convention.id)}>
                                        <FiEye/>  Voir service 
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="datatables mb-4">
                    <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                        <div className=" sm:w-full">
                            <div className="panel">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="my-2">
                                        <h2 className="text-lg mb-3 flex items-center"><FiClipboard/> Information sur la convention</h2>
                                        <hr className='mb-4' />
                                        <ul className="list-disc">
                                            <li className="ml-4 text-base">Numéro de la convention : {convention.id}</li>
                                            <li className="ml-4 text-base">Nouvelle convention : {myData.newConvention.value}</li>
                                            {
                                                myData.newConvention.value=="Non"?
                                                <li className="ml-4 text-base">Référence ancienne : {myData.reference}</li>
                                                :null
                                            }
                                            <li className="ml-4 text-base">Famille de la convention :  {myData.familleConvention.label}</li>
                                            <li className="ml-4 text-base">pack de la convention :  {myData.packConvention.value}</li>
                                        </ul>
                                    </div>
                                    <div className="my-2">
                                        <h2 className="text-lg mb-3 flex items-center"><FiUsers/>Information sur le partenaire</h2>
                                        <hr className='mb-4' />
                                        <ul className="list-disc">
                                            <li className="ml-4 text-base">Nombre de partenaire : {myData.numberPartner}</li>
                                            <li className="ml-4 text-base">Choix du partenaire : {myData.partnerId.label}</li>
                                            <li className="ml-4 text-base">Personne focale chez le partenaire : {myData.contactPartner.label}</li>
                                            <li className="ml-4 text-base"> Statut de la convention : {myData.statutConvention.value}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="datatables mb-4">
                    <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                        <div className=" sm:w-full">
                            <div className="panel">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="my-2">
                                        <h2 className="text-lg mb-3 flex items-center"><FiCalendar/> Information sur la durée</h2>
                                        <hr className='mb-4' />
                                        <ul className="list-disc">
                                            <li className="ml-4 text-base">Date signature : {myData.dateSignature}</li>
                                            <li className="ml-4 text-base">Durée de la convention : {myData.dureeConvention}</li>
                                            <li className="ml-4 text-base">Type de convention : {myData.typeConvention}</li>
                                            <li className="ml-4 text-base">Durée en année :  {myData.dureeEnAnnee!==null?myData.dureeEnAnnee:"Pas renseigner"}</li>
                                            <li className="ml-4 text-base">Nombre de cohorte :  {myData.numberCohorte!==null?myData.numberCohorte:"Pas renseigner"}</li>
                                        </ul>
                                    </div>
                                    {
                                      myData.typeConvention.toUpperCase()=="PACK"?
                                      <div className="my-2">
                                        <h2 className="text-lg mb-3 flex items-center"><FiFile/> Les fichiers rattachés à la convention</h2>
                                        <hr className='mb-4' />
                                        <ul className="list-disc">
                                            <li className="ml-4 text-base ">Document de la convention : <a target="_blank" rel="Document de la convention" href={'/storage/' + myData.fileConvention}>  Fichier convention</a></li>
                                            <li className="ml-4 text-base">Date d'effet du document : {myData.dateEffetFile}</li>
                                            <li className="ml-4 text-base">Date de fin u document : {myData.dateFinFile}</li>
                                        </ul>
                                    </div>
                                      :null 
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="datatables mb-4">
                    <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                        <div className=" sm:w-full">
                            <div className="panel">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="my-2">
                                        <h2 className="text-lg mb-3 flex items-center"><FiTrendingUp/> Information sur périodicité</h2>
                                        <hr className='mb-4' />
                                        <ul className="list-disc">
                                            <li className="ml-4 text-base">Durée d'accompagnement : {myData.dureeAccompagnement!==null?myData.dureeAccompagnement:"Pas reseigner"}</li>
                                            <li className="ml-4 text-base">Nombre de bénéficiaire total : {myData.numberBeneficiary!==null?myData.numberBeneficiary:"Pas renseigner"}</li>
                                            <li className="ml-4 text-base">Nombre de bénéficaire maximum : {myData.numberBeneficiaryMax!==null?myData.numberBeneficiaryMax:"Pas renseigner"}</li>
                                            <li className="ml-4 text-base">Date d'effet :  {myData.dateEffet}</li>
                                            <li className="ml-4 text-base">Date fin :  {myData.dateFin}</li>
                                            <li className="ml-4 text-base">Nombre de bénéficiaire de la cohorte :  {myData.numberCohorte!==null?myData.numberCohorte:"Pas renseigner"}</li>
                                            <li className="ml-4 text-base">Préavis :  {myData.preavis!==null?myData.preavis:"Pas renseigner"}</li>
                                            <li className="ml-4 text-base">Echéance de la convention :  {myData.echeance!==null?myData.echeance:"Pas renseigner"}</li>
                                            <li className="ml-4 text-base">Nombre de bénéficaire maximum par an :  {myData.numberBeneficiaryMax!==null?myData.numberBeneficiaryMax:"Pas renseigner"}</li>
                                           
                                            
                                        </ul>
                                    </div>
                                    <div className="my-2">
                                        <h2 className="text-lg mb-3 flex items-center"> <FiPieChart/>Information tarifaires</h2>
                                        <hr className='mb-4' />
                                        <ul className="list-disc">
                                            <li className="ml-4 text-base">Montant global de la convention : {myData.montantGlobal}</li>
                                            <li className="ml-4 text-base">Devise de la convention : {myData.devise.value}</li>
                                            <li className="ml-4 text-base">Contribution du partenaire : {myData.contributionPartnaire}</li>
                                            <li className="ml-4 text-base">Echéancier du réglement du partenaire : {myData.echeancierReglement}</li>
                                            <li className="ml-4 text-base">Date d'échéance du réglement : {myData.dateEcheanceReglement}</li>
                                            <li className="ml-4 text-base">Montant du réglement : {myData.montantReglement}</li>
                                            <hr className='mb-4 mt-4' />
                                            <li className="ml-4 text-base">Date limite pour sélection prochaine cohorte  : {myData.dateLimiteSelection}</li>
                                            <li className="ml-4 text-base">Nombre de bénéficiaire prochaine cohorte : {myData.numberBeneficiaryNextCohort}</li>
                                            <li className="ml-4 text-base">Marque Partenaire: {myData.modePartner.value}</li>
                                            <li className="ml-4 text-base">Critère de sélection  : {myData.critereSelected.value}</li>
                                        </ul>
                                    </div>
                                    <div className='grid grid-cols-1 gap-3'>
                                        <div className="my-2">
                                        <h2 className="text-lg mb-3 mt-4 flex items-center"><FiClipboard/> Information sur la convention</h2>
                                        <hr className='mb-4' />
                                            <ul className="list-disc">
                                                <li className="ml-4 text-base">Validation des bénéficiaires par partenaire : {myData.validateBeneficiary.value}</li>
                                                <li className="ml-4 text-base">Compte bancaire : {myData.accountBank.value}</li>
                                                <li className="ml-4 text-base">Open book  : {myData.openBook.value}</li>
                                                <li className="ml-4 text-base">Services assurés : {service.join(' , ')}    </li>
                                                <li className="ml-4 text-base">Les modèles de reporting : {reporting==null?"Pas renseigner":reporting.join(' , ')} </li>
                                                <li className="ml-4 text-base">RIB de la convention : {myData.ribConvention!==null?myData.ribConvention:"Pas renseigner"}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {myData.critereSelected.value=="Oui"?
                <div className="datatables mb-4">
                    <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                        <div className=" sm:w-full">
                            <div className="panel">
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="my-2">
                                        <h2 className="text-lg mb-3 flex items-center"><FiCheckSquare/>Validation des critères</h2>
                                        <hr className='mb-4' />
                                        <ul className="list-disc">
                                            <li className="ml-4 text-base">Type des bénéficiares : {typeBeneficiary==null? "Pas renseigner":typeBeneficiary.join(' , ')}</li>
                                            <li className="ml-4 text-base">Région : {region==null?"Pas renseigner":region.join(' , ')}</li>
                                            <li className="ml-4 text-base">Province : {province==null?"Pas renseigner":province.join(' , ')}</li>
                                            <li className="ml-4 text-base">Ville :  {ville==null?"Pas renseigner":ville.join(' , ')}</li>
                                            <li className="ml-4 text-base">Genre :  {genre==null?"Pas renseigner":genre.join(' , ')}</li>
                                            <li className="ml-4 text-base">Note du Bac régional :  {myData.noteBacRegional!==null?myData.noteBacRegional:"Pas renseigner"}</li>
                                            <li className="ml-4 text-base">Note du premier semestre :  {myData.noteSemestre!==null?myData.noteSemestre:"Pas renseigner"}</li>
                                            <li className="ml-4 text-base">Filière du Bac :  {filiere==null?"Pas renseigner":filiere.join(' , ')}</li>
                                            <li className="ml-4 text-base">Année du Bac :  {year==null?"Pas renseigner":year.join(' , ')}</li>
                                            <li className="ml-4 text-base">Situation sociale :  {situation==null?"Pas renseigner":situation.join(' , ')}</li>
                                            <li className="ml-4 text-base">Situation d'handicap :  {handicap==null?"Pas renseigner":handicap.join(' , ')}</li>
                                            <li className="ml-4 text-base">Prise en charge par un EPS :  {eps==null?"Pas renseigner":eps.join(' , ')}</li>
                                            <li className="ml-4 text-base">Type logement :  {logement==null?null:logement.join(' , ')}</li>
                                            <li className="ml-4 text-base">Type d'orphelin :  {orphelin==null?"Pas renseigner":orphelin.join(' , ')}</li>
                                            <li className="ml-4 text-base">Prise en charge par lequel des parents :  {priseCharge==null?"Pas renseigner":priseCharge.join(' , ')}</li>
                                            <li className="ml-4 text-base">Le montant de la pension :  {myData.montantPension!==null?myData.montantPension:"Pas renseigner"}</li>
                                            <li className="ml-4 text-base">Revenu mensuel des parents :  {myData.revenu!==null?myData.revenu:"Pas renseigner"}</li>
                                            <li className="ml-4 text-base">Nombre de frères et soeurs :  {myData.nbreFrSr!==null?myData.nbreFrSr:"Pas renseigner"}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :null
                }
            </div>
            {/*--------------------MODAL ICI-------------*/}
            <div>
          <Transition appear show={modalUpdate} as={Fragment}>
            <Dialog as="div" open={modalUpdate} onClose={() => setModalUpdate(false)}>
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
                      <button onClick={() => setModalUpdate(false)} type="button" className="text-white-dark hover:text-dark">
                        <FiX />
                      </button>
                    </div>
                    <div className="p-5">
                      <p>
                        Voulez-vous modifier cet élément ?
                      </p>
                      <div className="mt-8 flex items-center justify-end">
                        <button onClick={() => setModalUpdate(false)} type="button" className="btn btn-outline-danger">
                          Non
                        </button>
                        <button  onClick={() => handelUpdate(modalId)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
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
          <Transition appear show={modalStatut} as={Fragment}>
            <Dialog as="div" open={modalStatut} onClose={() => setModalStatut(false)}>
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
                      <h5 className="text-lg font-bold">Changement du statut</h5>
                      <button onClick={() => setModalStatut(false)} type="button" className="text-white-dark hover:text-dark">
                        <FiX />
                      </button>
                    </div>
                    <div className="p-5">
                      <p>
                        Voulez-vous changer le statut de cet élément ?
                      </p>
                      <div className="mt-8 flex items-center justify-end">
                        <button onClick={() => setModalStatut(false)} type="button" className="btn btn-outline-danger">
                          Non
                        </button>
                        <button  onClick={() => handelStatut(modalStatutId)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
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
          <Transition appear show={modalDelete} as={Fragment}>
            <Dialog as="div" open={modalDelete} onClose={() => setModalDelete(false)}>
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
                        <button  onClick={() => handelDelete(modalDeleteId)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
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
          <Transition appear show={modalService} as={Fragment}>
            <Dialog as="div" open={modalService} onClose={() => setModalService(false)}>
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
                      <h5 className="text-lg font-bold">Ouverture</h5>
                      <button onClick={() => setModalService(false)} type="button" className="text-white-dark hover:text-dark">
                        <FiX />
                      </button>
                    </div>
                    <div className="p-5">
                      <p>
                        Voulez-vous ouvrir cette partie ?
                      </p>
                      <div className="mt-8 flex items-center justify-end">
                        <button onClick={() => setModalService(false)} type="button" className="btn btn-outline-danger">
                          Non
                        </button>
                        <button  onClick={() => handelService(modalServiceId)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
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
          <Transition appear show={modalView} as={Fragment}>
            <Dialog as="div" open={modalView} onClose={() => setModalView(false)}>
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
                      <h5 className="text-lg font-bold">Ouverture</h5>
                      <button onClick={() => setModalView(false)} type="button" className="text-white-dark hover:text-dark">
                        <FiX />
                      </button>
                    </div>
                    <div className="p-5">
                      <p>
                        Voulez-vous ouvrir cette partie ?
                      </p>
                      <div className="mt-8 flex items-center justify-end">
                        <button onClick={() => setModalView(false)} type="button" className="btn btn-outline-danger">
                          Non
                        </button>
                        <button  onClick={() => handelView(modalViewId)} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
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
