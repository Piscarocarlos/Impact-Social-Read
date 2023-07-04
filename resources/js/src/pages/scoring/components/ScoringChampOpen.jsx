import React, { useEffect, useState, Fragment } from 'react'
import { MdCreate } from "react-icons/md";
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';
import Select from 'react-select';
import { Dialog, Transition } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/inertia-react';
import { useDispatch } from 'react-redux';

const ScoringChampOpen = ({id,fieldOpen,titleField}) => {
    const [modal1, setModal1] = useState(false);
const [choice,setChoice]=useState();
const [fieldOpenValue,setFieldOpenValue]=useState(fieldOpen)
    const optionSelect = [
        // { value: '', label: 'Selectionnez une methode....' },
        { value: 'Methode par tranche', label: 'Methode par tranche' },
        { value: 'Methode par Coefficient', label: 'Methode par Coefficient' }
    ]

    
    const convertJsonData=(data)=>{
const obj=JSON.parse(data);
return obj;

    }
const [saveMax,setSaveMax]=useState(0);

  
useEffect(()=>{
    setFieldOpenValue(fieldOpen);
  
 if (fieldOpen.length!==0) {
    if (fieldOpen[0].type==='coefficient') {
   setChoice("Methode par Coefficient")     
    }else{
        setChoice("Methode par tranche")
    }
 }
    const saveLastData = (data) => {
        const lengthArray = data.length;
        return data[lengthArray - 1];
      };
    
      if (fieldOpen.length !== 0) {
        setSaveMax(convertJsonData(saveLastData(fieldOpen).data).max);
      }else{
        setSaveMax(0)
      }
},[fieldOpen])

console.log(saveMax);
let min;
if (saveMax) {
min = saveMax;
} else {
min = '';
}
    const { data, setData, processing, errors, reset, put, post } = useForm({
        min,
        max:'',
        val:'',
        type:'tranche',
     });
     const { data: dataForm2,setData:setDataForm2, errors: errorsForm2, put: putForm2, post: postForm2 } = useForm(
        {
            type:'coefficient',
            alpha:'',
            beta:'',

        }
     );
     useEffect(()=>{

if(saveMax!==0){
   const newData2 = { ...data, min: saveMax};
         setData(newData2)
}
     },[data.max])
     const submit = (e) => {
         e.preventDefault();
      
         post(route('dashboard.scoring.save.tranch.method',id), {
            onSuccess: () => {
                setFieldOpenValue(fieldOpen)
                setModal1(false);
            },
            onError: (errors) => {

                // Actions à effectuer en cas d'erreur
            }
         });
     
     }
     const submit2 = (e) => {
        e.preventDefault();
       
        postForm2(route('dashboard.scoring.save.tranch.method',id), {
            onSuccess: () => {
                setFieldOpenValue(fieldOpen)
             
            }
        });

        console.log(dataForm2);
      
    }
     console.log('rrrrrr',fieldOpen);
     console.log('rruuuuur',fieldOpenValue);
    return (
        <div>

            
                <h2 className='text-2xl text-center'>{titleField}</h2>
                <div className="flex flex-wrap -mx-3 mb-6">
                 {  fieldOpen.length===0? <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  dark:bg-black dark:text-white" htmlFor="grid-password">
                            Choisissez Une methode
                        </label>
                        <Select className='dark:bg-dark ' onChange={e=>setChoice(e.value)} options={optionSelect} isSearchable={true} />
                    </div>:null}
                </div>
{ choice==="Methode par Coefficient"?  (<div className="coefficient">
{fieldOpen.length? 

<div className="table-responsive mb-5">
<table>
    <thead>
        <tr>
            
            <th> N°</th>
         
            <th>Alpha</th>
            <th>Beta</th>

            <th className="!text-center">Action</th>
        </tr>
    </thead>
    <tbody>
        {fieldOpen?.map((item, index) => (<tr key={index}>
            <td>Variable</td>

            <td>{convertJsonData(item.data).alpha} </td>
            <td> {convertJsonData(item.data).beta}</td>
            
       
            <td className="flex justify-around">
            {/* <Link href={route('dashboard.scoring.create',item.id)} className='text-white p-2 rounded hover:text-gray-100 mr-2 bg-green-600'>
                    <FiEdit />
                </Link> */}
                <Link href={route('dashboard.delete.tranch.method',item.id)} method="delete" className='text-white p-2 rounded hover:text-gray-100 mr-2 bg-red-600'>
                    <FiTrash />
                </Link>
              
            </td>
        </tr>))}



    </tbody>
</table>
</div>:
<div className="">
<h4 className='text-center'>Methode Indisponible </h4>

{/* <form onSubmit={submit2}>
                <div className="flex flex-wrap -mx-3 mb-6">
                                                    <div className="w-1/2 px-3">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  dark:bg-black dark:text-white" htmlFor="grid-password">
                                                            donnez une valeur Alpha
                                                        </label>
                                                        <input  min={0} onChange={e => setDataForm2('alpha', e.target.value)} className="appearance-none form-input form-input block w-full  dark:bg-black dark:text-white  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            type="number" placeholder="Alpha..." />
                                                    </div>
                                                    <div className="w-1/2 px-3">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  dark:bg-black dark:text-white" htmlFor="grid-password">
                                                            donnez une valeur Beta
                                                        </label>
                                                        <input  min={0} onChange={e => setDataForm2('beta', e.target.value)} className="appearance-none form-input form-input block w-full  dark:bg-black dark:text-white  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            type="number" placeholder="Beta..." />
                                                    </div>
                                                    </div>
                                                    <div className="w-full px-3">

                                                <button type="submit" className="bg-green-500 w-full mt-5 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                                    valider
                                                </button>
                                               
                                            </div>
                                            </form> */}
                                            </div>
}
</div>): choice==="Methode par tranche" ?
               ( <div className="tranche">
                    <div className="flex w-full justify-end my-4">
                        <button onClick={() => setModal1(true)} type="button" className="btn btn-success w-1/3 gap-2 ">
                            <MdCreate />
                            Ajouter une tranche
                        </button>
                    </div>
                    <div className="panel rounded-md p-4 ">
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-full my-2 pr-0 lg:pr-2">
                                <p className="text-base font-bold pb-6 flex items-center">
                                    <i className="fas fa-list mr-3"></i> Liste des Champs pour le scoring
                                </p>
                            </div>
                            {/* <div className="flex w-full justify-end my-4">
                                <button onClick={() => setModal1(true)} type="button" className="btn btn-success w-1/3 gap-2 ">
                                    <MdCreate />
                                    Créer un champ
                                </button>
                            </div> */}
                        </div>

                        <div className="table-responsive mb-5">
                            <table>
                                <thead>
                                    <tr>
                                        
                                        <th>Tranche N°</th>
                                        <th>Valeur</th>
                                        <th>minimum</th>
                                        <th>maximum</th>

                                        <th className="!text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fieldOpen?.map((item, index) => (<tr key={index}>
                                        <td>Tranche {index+1}</td>
                                        <td>{convertJsonData(item.data).val} </td>
                                        <td>{convertJsonData(item.data).min} </td>
                                        <td> {convertJsonData(item.data).max}</td>
                                        
                                   
                                        <td className="flex justify-around">
                                        {/* <Link href={route('dashboard.scoring.create',item.id)} className='text-white p-2 rounded hover:text-gray-100 mr-2 bg-green-600'>
                                                <FiEdit />
                                            </Link> */}
                                            {fieldOpen.length===index+1?
                                            <Link href={route('dashboard.delete.tranch.method',item.id)} method="delete" className='text-white p-2 rounded hover:text-gray-100 mr-2 bg-red-600'>
                                                <FiTrash />
                                            </Link>:
                                         <span>-</span>
                                         }
                                        </td>
                                    </tr>))}



                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>)
                :null
}

            
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
                                    <h5 className="text-lg font-bold">Methode par tranche</h5>
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
                                            <div className={errors.val ? 'has-error  w-full px-3' : ' w-full px-3'}>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  dark:bg-black dark:text-white" htmlFor="grid-password">
                                                    Donnez la valeur de la tranche
                                                </label>
                                                <input min={0}  onChange={e => setData('val', e.target.value)} className="appearance-none form-input form-input block w-full  dark:bg-black dark:text-white  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                    id="" type="number" placeholder="Valeur de la tranche" />
                                               {errors.val&& <div className='text-red-500 text-xs'>{errors.val}</div>}
                                            </div>
                                           
                                                {saveMax!==0?
                                                 <div className= 'w-1/2 px-3 '>
                                                 <label className="block tracking-wide text-gray-500 text-xs font-bold mb-2  dark:bg-black dark:text-white" htmlFor="grid-password">
                                                    L'ancien max devient le nouveau min!
                                                 </label>
                                                 <input  value={saveMax}  readOnly  className=" appearance-none form-input form-input block w-full  dark:bg-black dark:text-white  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                 type="text" placeholder="min..." 
                                                 
                                                 />
                                                
                                                 </div>
                                                 :
                                                 <div className={errors.min ? 'has-error  w-1/2 px-3' : 'w-1/2 px-3 '}>
                                                 <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  dark:bg-black dark:text-white" htmlFor="grid-password">
                                                     donnez une valeur minimum
                                                 </label>
                                                 <input  min={0} onChange={e => setData('min', e.target.value)} className="appearance-none form-input form-input block w-full  dark:bg-black dark:text-white  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                 type="number" placeholder="min..." 
                                                 
                                                 />
                                                 {errors.min&& <div className='text-red-500 text-xs'>{errors.min}</div>}

                                                 </div>
                                                }
                                               
                                            
                                            <div className={errors.min ? 'has-error  w-1/2 px-3' : 'w-1/2 px-3 '}>
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  dark:bg-black dark:text-white" htmlFor="grid-password">
                                                    donnez une valeur maximum
                                                </label>
                                                <input  min={0} onChange={e => setData('max', e.target.value)} className="appearance-none form-input form-input block w-full  dark:bg-black dark:text-white  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                    type="number" placeholder="max...." />
                                               {errors.max && <div className='text-red-500 text-xs'>{errors.max}</div>}

                                            </div>

                                            {/* button de validation en vert */}
                                            <div className="w-full px-3">
                                                <button type="submit"  className="bg-green-500 w-full mt-5 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                                    valider
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default ScoringChampOpen
