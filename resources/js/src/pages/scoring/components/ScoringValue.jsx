
import React, { useEffect, useState, Fragment } from 'react'
import { MdCreate } from "react-icons/md";
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';
import Select from 'react-select';
import { Dialog, Transition } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/inertia-react';
import { useDispatch } from 'react-redux';

const ScoringValue=({ dataValue,title,id,fieldClose})=> {
    const convertJsonData=(dataE)=>{
        const obj=JSON.parse(dataE);
        return obj;
        
            }
            const [modal1, setModal1] = useState(false);
const[editId,setEditId]=useState()
    const [val,setVal]=useState(dataValue)
    const [val1,setVal1]=useState() 
    const [item, setItem] = useState();

const mydata=dataValue;

     
       console.log( 'heloo',dataValue);

       const getName=()=>{
return null

       }
       console.log(getName);
     useEffect(()=>{
      
        const formatData = (datavl) => {
            const obj = {};
            datavl?.forEach((item) => {
                    obj[item.id] = null;  
            })
            return obj;
          }

         setData(formatData(dataValue))

if (fieldClose.length > 0) { setVal(JSON.parse(fieldClose[0].data)) }        
     },[dataValue])

     
      
        const formatData = (datavl) => {
            const obj = {};
            datavl?.forEach((item) => {
                    obj[item.id] = 0;  
            })
            return obj;
          }

      const { data, setData, processing, errors, reset, put, post } = useForm(formatData(mydata));
      const { data: dataForm1,setData:setDataForm1, errors: errorsForm1, put: putForm1, post: postForm1 } = useForm(val)
      const submit = (e) => {
          e.preventDefault();
          post(route('dashboard.scoring.save',id))
          console.log('ee',errors);
        }
        useEffect(()=>{
          if(fieldClose.length!==0){
            const newData1 = { ...JSON.parse(fieldClose[0].data), item:dataForm1.item};
            setDataForm1(newData1)
          }
         
        },[dataForm1.item])
        const submit1 = (e) => {
            e.preventDefault();
           
             postForm1(route('dashboard.update.close.field.value',editId), {
                onSuccess: () => {
                    
                    setModal1(false);
                },
                onError: (errors) => {
    
                    // Actions à effectuer en cas d'erreur
                }
             });
    
            console.log(dataForm1);
          
        }
       
        const searchByIds = (myarray, id) => {
            return myarray?.find(item => item.id === id);
          }
          const elmt=(monObjet)=>{
            return  monObjet[1];
          }

          const res=dataValue?.find(item => item.id === 5);
        //   console.log("tre",);
          const handleEditModale=(id,item)=>{
            setModal1(true)
            setEditId(id)
            setItem(item)
            // console.log('rtre',item);
            // if (title === 'region') {
            //     setVal1(searchByIds(dataValue, +item)?.name_region);
            //   } else if (title === 'province') {
            //     setVal1(searchByIds(dataValue, +item)?.name_province);
            //   } else if (title === 'ville') {
            //     setVal1(searchByIds(dataValue, +item)?.name_city);
            //   } else 
              if (title === 'situation social') {
                setVal1(searchByIds(dataValue, +item)?.name_situation);
              } else if (title === "logement") {
                setVal1(searchByIds(dataValue, +item)?.name_logement);
              } else if (title === 'orphelin') {
                setVal1(searchByIds(dataValue, +item)?.name_type);
              } else if (title === "type d'handicap") {
                setVal1(searchByIds(dataValue, +item)?.type_handicap);
              } else if (title === 'filiére du bac') {
                setVal1(searchByIds(dataValue, +item)?.name_filiere);
              } else if (title === 'lycée') {
                setVal1(searchByIds(dataValue, +item)?.nom_fr);
              } else if (title === "Comment avez vous connu JADARA FOOUNDATION") {
                setVal1(searchByIds(dataValue, +item)?.name_information);
              } else {
                setVal1(searchByIds(dataValue, +item)?.name);
              }
            console.log("eee",val1);
          }
  return (
    <div>
            
    <div className="mb-5">
    {fieldClose.length!==0? 

<div className="table-responsive mb-5">
<h1 className='text-2xl text-center my-3 pb-6'>{title}</h1>
<table>
    <thead>
        <tr>
            
            <th> N°</th>
            <th>name</th>
            <th>Valeur</th>
            

            <th className="!text-center">Action</th>
        </tr>
    </thead>
    <tbody>
        {Object.keys(JSON.parse(fieldClose[0].data))?.map((item, index) => (<tr key={index}>
            <td>{index+1}</td>
            <td>{
                   title==='region'?searchByIds(dataValue, +item)?.name_region
                   :title==='province'?searchByIds(dataValue, +item)?.name_province
                   :title==='ville'?searchByIds(dataValue, +item)?.name_city
                   :title==='situation social'?searchByIds(dataValue, +item)?.name_situation
                   :title==="logement"?searchByIds(dataValue, +item)?.name_logement
                   :title==='orphelin'?searchByIds(dataValue, +item)?.name_type
                   :title==="type d'handicap"?searchByIds(dataValue, +item)?.type_handicap
                   :title==='filiére du bac'?searchByIds(dataValue, +item)?.name_filiere
                   :title==='lycée'?searchByIds(dataValue, +item)?.nom_fr
                   :title==="Comment avez vous connu JADARA FOOUNDATION"?searchByIds(dataValue, +item)?.name_information
                   :searchByIds(dataValue, +item)?.name
              }
            </td>
            <td>{(JSON.parse(fieldClose[0].data))[item]} </td>
            {/* <td> {convertJsonData(item.data).beta}</td> */}
            
       
            <td className="flex justify-around">
            <button onClick={()=>handleEditModale(fieldClose[0].id,item)} type="button"  className='text-white p-2 rounded hover:text-gray-100 mr-2 bg-green-600'>
                    <FiEdit />
                </button>
                {/* href={route('dashboard.scoring.create',fieldClose[0].id)} */}
          
            </td>
      
        </tr>))}



    </tbody>
</table>
</div>:





  
                            
                            <div className="panel">
                                <h1 className='text-2xl text-center  pb-6'>{title}</h1>
 <form onSubmit={submit}>
 
                                        <div className="flex flex-wrap  mb-6">
                                        
                                 
    {dataValue?.map((item,index)=>(
                                        <div className="w-1/2 px-2" key={index}>
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2  " htmlFor="grid-password">
                                                            {
                                                             title==='region'?item.name_region
                                       :title==='province'?item.name_province
                                       :title==='ville'?item.name_city
                                       :title==='situation social'?item.name_situation
                                       :title==="logement"?item.name_logement
                                       :title==='orphelin'?item.name_type
                                       :title==="type d'handicap"?item.type_handicap
                                       :title==='filiére du bac'?item.name_filiere
                                       :title==='lycée'?item.nom_fr
                                       :title==="Comment avez vous connu JADARA FOOUNDATION"?item.name_information
                                       :item.name
                                       }
                                                        </label>
                                                        <input  onChange={e => {setData(`${item.id}`, e.target.value)}} className="appearance-none block w-full  dark:bg-black dark:text-white  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            id={index+1} type="number" placeholder="donnez un point"  />
                                                        {errors[item.id] && <div className="text-red-500 text-xs">{errors[item.id]}</div>}
                                                    </div>
                                                    ))}
                                            {/* button de validation en vert */}
                                            <div className="w-full px-3">
                                                <button type="submit" className="bg-green-500 w-full mt-5 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                                    valider
                                                </button>
                                            </div>
                                       
                                        </div>
                                    </form>

                            </div>


}
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
                                    <h5 className="text-lg font-bold">Modifier la valeur</h5>
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
                                    <form onSubmit={submit1}>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                     
                                        <div className="w-full px-2  bg-[#fbfbfb]  dark:bg-[#121c2c]" >
                                                        <label className="block uppercase tracking-wide text-lg font-bold mb-2  " htmlFor="grid-password">
                                                       {val1}
                                                        </label>
                                                        <input  onChange={e => {setDataForm1(`${item}`, e.target.value)}} className="appearance-none block w-full  dark:bg-black dark:text-white  text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                                            id={item} type="number" placeholder="donnez un point"  required/>
                                                        {errorsForm1[item] && <div className="text-red-500 text-xs">{errorsForm1[item]}</div>}
                                                    </div>
                                                  
                                            </div>

                                            {/* button de validation en vert */}
                                            <div className="w-full px-3">
                                                <button type="submit" className="bg-green-500 w-full mt-5 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                                    valider
                                                </button>
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

export default ScoringValue
