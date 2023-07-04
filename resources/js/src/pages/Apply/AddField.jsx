import { Dialog, Transition } from '@headlessui/react'
import { data } from 'autoprefixer';
import React, { Fragment, useState } from 'react'
import Select from 'react-select';
import { toggleLocale } from '../../store/themeConfigSlice';
export default function AddField({ setParamsTask, isAddTaskModal, setIsAddTaskModal, paramsTask, saveTask, addTaskData, options, isChoiceSelect, setIsChoiceSelect }) {
    const [checked, setChecked] = useState([]);
    const [radioSelect, setRadioSelect] = useState('');
    const [radioRequired, setRadioRequired] = useState();
    const [isChecked, setIsChecked] = useState(false);
    const [isFieldHide, setIsFieldHide] = useState(false);
    const [addContraint,setAddConytrainte]=useState(false);
    const handleToggle = (e) => {
        e.preventDefault();
        setIsChecked(!isChecked);

        setParamsTask({ ...paramsTask, dataRequired: isChecked });
    };
    const addDataSelect = (e) => {
        e.preventDefault();
        setRadioSelect(e.target.value);
        setParamsTask({ ...paramsTask, dataSelect: radioSelect });
    }

    const twoCalls = e => {
        addTaskData(e)
        changeSelectOption()
      }

      const changeSelectOption = () => {
        setIsFieldHide(!isFieldHide);
        // setParamsTask({ ...paramsTask, is_field_hide: isFieldHide });
        }

    const validations = [
        { value: 'required', label: 'Obligatoire' },
        { value: 'email', label: 'Email' },
        { value: 'min', label: 'Min', default: 2 },
        { value: 'max', label: 'Max', default: 10 },
        { value: 'required,regex:/^[^\d]*$/,max:50', label: 'Name Family' },
        { value: 'required,regex:/^[^\d]*$/,max:50,unique:durations', label: 'Duration' }

    ]
const toggleContraint=(e)=>{
    e.preventDefault();
    setAddConytrainte(!addContraint);
}

    return (
        <Transition appear show={isAddTaskModal} as={Fragment}>
            <Dialog as="div" open={isAddTaskModal} onClose={() => { setIsChoiceSelect(false); setIsAddTaskModal(false) ;setAddConytrainte(false)}} className="relative z-50">
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-[black]/60" />
                </Transition.Child>
                <div className="fixed inset-0 z-[999] overflow-y-auto">
                    <div className="flex  justify-center min-h-screen px-4">
                        <Dialog.Panel className="panel border-0 p-0 rounded-lg  w-full m-20 text-black dark:text-white-dark">
                            <button onClick={() => { setIsChoiceSelect(false); setIsAddTaskModal(false);setAddConytrainte(false) }} type="button" className="absolute top-4 ltr:right-4 rtl:left-4 text-white-dark hover:text-dark">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
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
                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">{paramsTask.id ? 'Modifier ' : 'Ajouter '} un champ</div>
                            <div className="p-5">
                                <form onSubmit={saveTask}>
                                    <div className="grid gap-5">
                                        <div className="flex gap-3">
                                            <div className="w-1/2">
                                                <label htmlFor="taskTitle">Titre du champ</label>
                                                <input id="title" value={paramsTask.title} onChange={addTaskData} type="text" className="form-input" placeholder="Enter Name" />
                                            </div>
                                            <div className="w-1/2">
                                                <label htmlFor="taskTitle">Nom unique du champ <span className="text-xs text-orange-400">Attention ce nom est unique seulement pour ce champ</span></label>
                                                <input id="unique_name" value={paramsTask.unique_name} onChange={addTaskData} type="text" className="form-input" placeholder="Enter Name" />
                                            </div>
                                        </div>
                                        {/* <div className="my-1">

                                            <div className="flex gap-2 flex-wrap">
                                                <label className="switch">
                                                    <input type="checkbox" onChange={handleToggle} className="form-checkbox" defaultChecked={paramsTask.dataRequired && paramsTask.dataRequired === true ? true : false} />
                                                    <span className="slider round"></span>
                                                </label>
                                                <label className="" htmlFor="required">Indiquez si ce champ doit être obligatoire</label>

                                            </div>
                                        </div> */}

                                        <div>
                                            <label htmlFor="type">Type de données</label>
                                            <Select id="type" className="dark:bg-dark" defaultValue={paramsTask.id ? paramsTask.type : null} onChange={addTaskData} options={options} isSearchable={true} />
                                        </div>

                                        <div>
                                            <label htmlFor="is_field_hide">Ce champ sera t-il en mode Show/Hide ?</label>
                                            <Select id="is_field_hide" className="dark:bg-dark" onChange={twoCalls} options={[{ label: "OUI", value: "OUI" }, { label: "NON", value: "NON" }]} isSearchable={true} />
                                        </div>

                                        {
                                            // console.log(paramsTask)
                                            paramsTask?.is_field_hide === "OUI" && <> <div className="w-full">
                                                <label htmlFor="taskTitle">Nom du champ parent</label>
                                                <input id="field_hidden" value={paramsTask.field_hidden} onChange={addTaskData} type="text" className="form-input" placeholder="Enter Name" />
                                            </div>

                                                <div className="w-full">
                                                    <label htmlFor="taskTitle">Si ce champ possède quelle valeur ?</label>
                                                    <input id="field_hidden_value" value={paramsTask.field_hidden_value} onChange={addTaskData} type="text" className="form-input" placeholder="Enter Name" />
                                                </div></> 
                                        }
                                  {
                                         paramsTask?.is_field_hide === "OUI" &&   <div className="">
{addContraint===false?
<button onClick={(e)=>toggleContraint(e)}  className="btn btn-success ">Ajouter  d'autres contraintes</button> :
<button onClick={(e)=>toggleContraint(e)} className="btn btn-danger ">Supprimer les contraintes</button> 
 }
 { 
                                            addContraint === true && <> <div className="w-full mt-6">
                                                <label htmlFor="field_hidden2">Nom du champ du deuxième parent</label>
                                                <input id="field_hidden2" value={paramsTask.field_hidden2} onChange={addTaskData} type="text" className="form-input" placeholder="Enter Name" />
                                            </div>

                                                <div className="w-full">
                                                    <label htmlFor="taskTitle">Si ce champ possède quelle valeur ?</label>
                                                    <input id="field_hidden_value2" value={paramsTask.field_hidden_value2} onChange={addTaskData} type="text" className="form-input" placeholder="Enter Name" />
                                                </div>
                                                <div className="w-full mt-6">
                                                <label htmlFor="field_hidden3">Nom du champ du troisième parent</label>
                                                <input id="field_hidden3" value={paramsTask.field_hidden3} onChange={addTaskData} type="text" className="form-input" placeholder="Enter Name" />
                                            </div>

                                                <div className="w-full">
                                                    <label htmlFor="field_hidden_value3">Si ce champ possède quelle valeur ?</label>
                                                    <input id="field_hidden_value3" value={paramsTask.field_hidden_value3} onChange={addTaskData} type="text" className="form-input" placeholder="Enter Name" />
                                                </div>
                                                </> 
                                                }
                                                </div>
                                        }
                                        {isChoiceSelect === true ?
                                            <div>
                                                <label htmlFor="validation">Validation  type select</label>
                                                <div className="flex gap-2 flex-wrap">

                                                    <div>
                                                        <label className="inline-flex">
                                                            <input type="radio" value="province" defaultChecked={paramsTask.dataSelect === 'province' ? true : false}
                                                                onChange={addDataSelect} className="form-radio" name='radio' />
                                                            <span>Province</span>
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label className="inline-flex">
                                                            <input type="radio" value="region" defaultChecked={paramsTask.dataSelect === 'region' ? true : false}
                                                                onChange={addDataSelect} className="form-radio" name='radio' />
                                                            <span>Region</span>
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label className="inline-flex">
                                                            <input type="radio" value="Ville" defaultChecked={paramsTask.dataSelect === 'Ville' ? true : false}
                                                                onChange={addDataSelect} className="form-radio" name='radio' />
                                                            <span>Ville</span>
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label className="inline-flex">
                                                            <input type="radio" value="Année" defaultChecked={paramsTask.dataSelect === 'Année' ? true : false}
                                                                onChange={addDataSelect} className="form-radio" name='radio' />
                                                            <span>Année</span>
                                                        </label>
                                                    </div> <div>
                                                        <label className="inline-flex">
                                                            <input type="radio" value="Filière" defaultChecked={paramsTask.dataSelect === 'Filière' ? true : false}
                                                                onChange={addDataSelect} className="form-radio" name='radio' />
                                                            <span>Filière</span>
                                                        </label>
                                                    </div> <div>
                                                        <label className="inline-flex">
                                                            <input type="radio" value="Lycée" defaultChecked={paramsTask.dataSelect === 'Lycée' ? true : false}
                                                                onChange={addDataSelect} className="form-radio" name='radio' />
                                                            <span>Lycée</span>
                                                        </label>
                                                    </div> <div>
                                                        <label className="inline-flex">
                                                            <input type="radio" value="Genre" defaultChecked={paramsTask.dataSelect === 'Genre' ? true : false}
                                                                onChange={addDataSelect} className="form-radio" name='radio' />
                                                            <span>Genre</span>
                                                        </label>
                                                    </div> <div>
                                                        <label className="inline-flex">
                                                            <input type="radio" value="Pays" defaultChecked={paramsTask.dataSelect === 'Pays' ? true : false}
                                                                onChange={addDataSelect} className="form-radio" name='radio' />
                                                            <span>Pays</span>
                                                        </label>
                                                    </div> <div>
                                                        <label className="inline-flex">
                                                            <input type="radio" value="Booleen" defaultChecked={paramsTask.dataSelect === 'Booléen' ? true : false}
                                                                onChange={addDataSelect} className="form-radio" name='radio' />
                                                            <span>Booléen</span>
                                                        </label>
                                                    </div> <div>
                                                        <label className="inline-flex">
                                                            <input type="radio" value="Situation sociale" defaultChecked={paramsTask.dataSelect === 'Situation Social' ? true : false}
                                                                onChange={addDataSelect} className="form-radio" name='radio' />
                                                            <span>Situation sociale</span>
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label className="inline-flex">
                                                            <input type="radio" value="Handicap" defaultChecked={paramsTask.dataSelect === 'Handicap' ? true : false}
                                                                onChange={addDataSelect} className="form-radio" name='radio' />
                                                            <span>Handicap</span>
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label className="inline-flex">
                                                            <input type="radio" value="Pourcentage" defaultChecked={paramsTask.dataSelect === 'Pourcentage' ? true : false}
                                                                onChange={addDataSelect} className="form-radio" name='radio' />
                                                            <span>Pourcentage</span>
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label className="inline-flex">
                                                            <input type="radio" value="Logement" defaultChecked={paramsTask.dataSelect === 'Logement' ? true : false}
                                                                onChange={addDataSelect} className="form-radio" name='radio' />
                                                            <span>Logement</span>
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label className="inline-flex">
                                                            <input type="radio" value="InfoPlus" defaultChecked={paramsTask.dataSelect === 'InfoPlus' ? true : false}
                                                                onChange={addDataSelect} className="form-radio" name='radio' />
                                                            <span>InfoPlus</span>
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label className="inline-flex">
                                                            <input type="radio" value="Parent" defaultChecked={paramsTask.dataSelect === 'Parent' ? true : false}
                                                                onChange={addDataSelect} className="form-radio" name='radio' />
                                                            <span>Parent</span>
                                                        </label>
                                                    </div>
                                                    {/* <div>
                                        <label className="inline-flex">
                                            <input type="radio" value="Handicape" defaultChecked={paramsTask.dataSelect==='region' ? true : false} 
                                            onChange={addDataSelect} className="form-radio" name='radio' />
                                            <span>Handicape</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" value="Handicape" defaultChecked={paramsTask.dataSelect==='region' ? true : false} 
                                            onChange={addDataSelect} className="form-radio" name='radio' />
                                            <span>Handicape</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="inline-flex">
                                            <input type="radio" value="Handicape" defaultChecked={paramsTask.dataSelect==='region' ? true : false} 
                                            onChange={addDataSelect} className="form-radio" name='radio' />
                                            <span>Handicape</span>
                                        </label>
                                    </div> */}
                                                </div>
                                            </div>
                                            : null}
                                        <div>
                                            <label htmlFor="validation">Validations</label>
                                            <div>
                                                <Select id="validations" isMulti={true} className="dark:bg-dark" onChange={addTaskData} options={validations} isSearchable={true} />

                                                {/* <div>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" value="required" defaultChecked={paramsTask.validations && paramsTask.validations.includes('required') ? true : false}
                                                            onChange={addValidations} className="form-checkbox" />
                                                        <span>Required</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" value="string" defaultChecked={paramsTask.validations && paramsTask.validations.includes('string') ? true : false} onChange={addValidations} className="form-checkbox" />
                                                        <span>String</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" value="integer" defaultChecked={paramsTask.validations && paramsTask.validations.includes('integer') ? true : false} name="validations[]" onChange={addValidations} className="form-checkbox" />
                                                        <span>Integer</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" value="email" defaultChecked={paramsTask.validations && paramsTask.validations.includes('email') ? true : false} onChange={addValidations} className="form-checkbox" />
                                                        <span>Email</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" value="unique" defaultChecked={paramsTask.validations && paramsTask.validations.includes('unique') ? true : false} onChange={addValidations} className="form-checkbox" />
                                                        <span>Unique</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" value="min" name="validations[]" onChange={addValidations} className="form-checkbox" />
                                                        <span>Minimum</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" value="max" name="validations[]" onChange={addValidations} className="form-checkbox" />
                                                        <span>Maximum</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" value="autocomplete" name="validations[]" onChange={addValidations} className="form-checkbox" />
                                                        <span>Autocomplete</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" value="minlength" name="validations[]" onChange={addValidations} className="form-checkbox" />
                                                        <span>Minlength</span>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" value="maxlength" name="validations[]" onChange={addValidations} className="form-checkbox" />
                                                        <span>Maxlength</span>
                                                    </label>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end items-center mt-8">
                                        <button onClick={() => { setIsChoiceSelect(false);setAddConytrainte(false); setIsAddTaskModal(false) }} type="button" className="btn btn-outline-danger">
                                            Annuler
                                        </button>
                                        <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                            {paramsTask.id ? 'Mettre à jour' : 'Ajouter'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}
