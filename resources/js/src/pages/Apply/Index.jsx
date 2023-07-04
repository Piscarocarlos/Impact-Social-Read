import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import Dropdown from '../../components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';

import { setPageTitle } from '../../store/themeConfigSlice';
import { FiEdit, FiPlus, FiSave, FiTrash2, FiX } from 'react-icons/fi';
import AddField from './AddField';
import { useForm } from '@inertiajs/inertia-react';
import Select from 'react-select';


export default function Index({ candidat }) {
    const step = JSON.parse(candidat.steps)
    const [projectList, setProjectList] = useState(
        candidat.steps ? step.steps.map((obj) => (
            {
                id: obj.id,
                title: obj.title,
                tasks: obj.tasks,
            }
        ),) : [{
            id: 1,
            title: 'Etape 1',
            tasks: [],
        }]
    );

    const { post, processing, data, setData, transform } = useForm({
        steps: projectList,
    });

    // console.log("step",step.steps[0].tasks);
    const options = [
        { value: 'text', label: 'Text' },
        { value: 'email', label: 'Email' },
        { value: 'date', label: 'Date' },
        { value: 'hour', label: 'Hour' },
        { value: 'number', label: 'Number' },
        { value: 'password', label: 'Password' },
        { value: 'select', label: 'Select' },
        { value: 'file', label: 'File' },
        { value: 'textarea', label: 'Textarea' },
    ];


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Candidate'));
    });

    const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const changeValue = (e) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };
    const [params, setParams] = useState({
        id: null,
        title: '',
    });
    const [paramsTask, setParamsTask] = useState({
        projectId: null,
        id: null,
        title: '',
        dataSelect: '',
        dataRequired: false,
        type: '',
        unique_name: '',
        validations: [],
        date: '',
        is_field_hide: "",
        field_hidden: "",
        field_hidden_value: "",
        field_hidden2: "",
        field_hidden_value2: "",
        field_hidden3: "",
        field_hidden_value3: ""
    });

    const [selectedTask, setSelectedTask] = useState(null);
    const [isAddProjectModal, setIsAddProjectModal] = useState(false);
    const [isAddTaskModal, setIsAddTaskModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);

    const addEditProject = (project = null) => {
        setTimeout(() => {
            setParams({
                id: null,
                title: '',
            });
            if (project) {
                let projectData = JSON.parse(JSON.stringify(project));
                setParams(projectData);
            }
            setIsAddProjectModal(true);
        });
    };

    const showMessage = (msg = '', type = 'success') => {
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

    const saveProject = () => {
        if (!params.title) {
            showMessage('Title is required.', 'error');
            return false;
        }

        if (params.id) {
            //update project
            const project = projectList.find((d) => d.id === params.id);
            project.title = params.title;
        } else {
            //add project
            const lastId = projectList.reduce((max, obj) => (obj.id > max ? obj.id : max), projectList[0].id) || 0;

            const project = {
                id: lastId + 1,
                title: params.title,
                tasks: [],
            };
            projectList.push(project);
        }

        showMessage('L\'étape a été créée avec succès.');
        setIsAddProjectModal(false);
    };

    const deleteProject = (project) => {
        setProjectList(projectList.filter((d) => d.id !== project.id));
        showMessage('L\'étape a été supprimée avec succès.');
    };

    const clearProjects = (project) => {
        setParamsTask((project.tasks = []));
    };
    const [isChoiceSelect, setIsChoiceSelect] = useState('false');
    const addTaskData = (e) => {

        if (e.target != undefined) {
            const { value, id } = e.target;
            setParamsTask({ ...paramsTask, [id]: value });
        } else {

            if (e[0] != undefined) {
                paramsTask.validations = e;
            }else if(e?.value === "OUI" || e?.value === "NON"){
                paramsTask.is_field_hide = e.value;
            }
            else {
                if (e.value === "select") {
                    setIsChoiceSelect(true);
                } else {
                    setIsChoiceSelect(false);
                }
                console.log('type:', paramsTask.type);
                setParamsTask({ ...paramsTask, type: e })
            }
        }
    };

    const addEditTask = (projectId, task = null) => {
        setParamsTask({
            projectId: projectId,
            id: null,
            title: '',
            type: '',
            dataSelect: '',
            dataRequired: false,
            validations: [],
            unique_name: '',
            data: '',
            date: '',
            is_field_hide: "NON",
            field_hidden: "",
            field_hidden_value: "",
            field_hidden2: "",
            field_hidden_value2: "",
            field_hidden3: "",
            field_hidden_value3: ""
        });
        if (task) {
            let data = JSON.parse(JSON.stringify(task));
            data.projectId = projectId;
            data.tags = data.tags ? data.tags.toString() : '';
            setParamsTask(data);
        }
        setIsAddTaskModal(true);
    };

    const saveTask = (e) => {
        e.preventDefault()
        if (!paramsTask.title) {
            showMessage('Le titre est obligatoire.', 'error');
            return false;
        }
        const project = projectList.find((d) => d.id === paramsTask.projectId);
        if (paramsTask.id) {
            //update task
            const task = project.tasks.find((d) => d.id === paramsTask.id);
            task.title = paramsTask.title;
            task.type = paramsTask.type;
            task.validations = paramsTask.validations;
        } else {
            //add task
            console.log(paramsTask);

            let maxId = 0;
            maxId = project.tasks?.length ? project.tasks.reduce((max, obj) => (obj.id > max ? obj.id : max), project.tasks[0].id) : 0;

            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth()); //January is 0!
            const yyyy = today.getFullYear();
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const task = {
                projectId: paramsTask.projectId,
                id: maxId + 1,
                title: paramsTask.title,
                type: paramsTask.type,
                unique_name: paramsTask.unique_name,
                date: dd + ' ' + monthNames[mm] + ', ' + yyyy,
                validations: paramsTask.validations,
                dataSelect: paramsTask.dataSelect,
                dataRequired: paramsTask.dataRequired,
                is_field_hide: paramsTask.is_field_hide,
                field_hidden: paramsTask.field_hidden,
                field_hidden_value: paramsTask.field_hidden_value,
                field_hidden2: paramsTask.field_hidden2,
                field_hidden_value2: paramsTask.field_hidden_value2,
                field_hidden3: paramsTask.field_hidden3,
                field_hidden_value3: paramsTask.field_hidden_value3,
            };
            setParamsTask(project.tasks.push(task));
            setIsChoiceSelect(false);
            console.log("task", task);
        }

        showMessage('Task has been saved successfully.');
        setIsAddTaskModal(false);
        console.log("params", paramsTask);
    };

    const deleteConfirmModal = (projectId, task = null) => {
        setSelectedTask(task);
        setTimeout(() => {
            setIsDeleteModal(true);
        }, 10);
    };
    const deleteTask = () => {
        let project = projectList.find((d) => d.id === selectedTask.projectId);
        project.tasks = project.tasks.filter((d) => d.id !== selectedTask.id);
        showMessage('Task has been deleted successfully.');
        setIsDeleteModal(false);
    };

    const saveCandidate = async () => {
        setData({
            ...data,
            steps: await projectList
        });
        console.log("candidat", data);
        post(route('dashboard.update.candidate', candidat.id))
    }
    const optionSelectExemple = [
        { value: 'First option', label: 'First option' },
        { value: 'Second option', label: 'Second option' },
        { value: 'third option', label: 'third option' }
    ]
    return (
        <DefaultLayout>
            <h3 className="text-xl my-5 font-bold">Creation des champs pour le formulaire de candidature : {candidat.name}</h3>

            <div>
                <form action="">
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="btn btn-primary flex"
                            onClick={() => {
                                addEditProject();
                            }}
                        >
                            <FiPlus className="text-lg mr-2" />
                            Ajouter une étape
                        </button>


                    </div>
                    {/* project list  */}
                    <div className="relative pt-5">
                        <div className="perfect-scrollbar h-full -mx-2">
                            <div className="overflow-x-auto flex items-start flex-nowrap gap-5 pb-2 px-2">
                                {projectList.map((project) => {
                                    return (
                                        <div key={project.id} className="panel w-80 flex-none" data-group={project.id}>
                                            <div className="flex justify-between mb-5">
                                                <h4 className="text-base font-semibold">{project.title}</h4>

                                                <div className="flex items-center">
                                                    <button onClick={() => addEditTask(project.id)} type="button" className="hover:text-primary ltr:mr-2 rtl:ml-2">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                                            <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                                            <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        </svg>
                                                    </button>
                                                    <div className="dropdown">
                                                        <Dropdown
                                                            offset={[0, 5]}
                                                            placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                            button={
                                                                <svg
                                                                    className="w-7 h-5 text-black/70 dark:text-white/70 hover:!text-primary"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                                                    <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                                                    <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                                                </svg>
                                                            }
                                                        >
                                                            <ul>
                                                                <li>
                                                                    <button type="button" onClick={() => addEditProject(project)}>
                                                                        Modifier
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button type="button" onClick={() => deleteProject(project)}>
                                                                        Supprimer
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button type="button" onClick={() => clearProjects(project)}>
                                                                        Tout effacer
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </div>
                                            <ReactSortable
                                                list={project.tasks}
                                                setList={(newState, sortable) => {
                                                    if (sortable) {
                                                        const groupId = sortable.el.closest('[data-group]')?.getAttribute('data-group') || 0;
                                                        const newList = projectList.map((task) => {
                                                            if (parseInt(task.id) === parseInt(groupId)) {
                                                                task.tasks = newState;
                                                            }

                                                            return task;
                                                        });
                                                        setProjectList(newList);
                                                    }
                                                }}
                                                animation={200}
                                                group={{ name: 'shared', pull: true, put: true }}
                                                ghostClass="sortable-ghost"
                                                dragClass="sortable-drag"
                                                className="connect-sorting-content min-h-[150px]"
                                            >
                                                {project.tasks?.map((task) => {
                                                    return (
                                                        <div className="sortable-list " key={project.id + '' + task.id}>
                                                            <div className="shadow bg-[#f4f4f4] dark:bg-white-dark/20 p-3 pb-5 rounded-md mb-5 space-y-3 cursor-move">
                                                                {task.image ? <img src="/assets/images/carousel1.jpeg" alt="images" className="h-32 w-full object-cover rounded-md" /> : ''}
                                                                <div className="flex items-center gap-2">
                                                                    <div>
                                                                        <label htmlFor="ctnEmail">{task.title}</label>
                                                                        {task.type?.value === "select" ?
                                                                            <Select id={task.type?.value} options={optionSelectExemple} /> :
                                                                            <input id={task.type?.value} type={task.type?.value} placeholder={`Entrez votre ${task.title}`} className="form-input" required />
                                                                        }
                                                                    </div>
                                                                    <div className="flex items-center justify-between">

                                                                        <div className="flex items-center mt-6">
                                                                            <button onClick={() => addEditTask(project.id, task)} type="button" className="hover:text-info">
                                                                                <FiEdit className="text-lg mr-1" />
                                                                            </button>
                                                                            <button onClick={() => deleteConfirmModal(project.id, task)} type="button" className="hover:text-danger">
                                                                                <FiTrash2 className="text-lg mr-1" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </ReactSortable>
                                            <div className="pt-3">
                                                <button type="button" className="btn btn-primary mx-auto" onClick={() => addEditTask(project.id)}>
                                                    <svg
                                                        className="w-5 h-5"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="1.5"
                                                        fill="none"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                    Ajouter un champ
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    {/* add project modal */}
                    <Transition appear show={isAddProjectModal} as={Fragment}>
                        <Dialog as="div" open={isAddProjectModal} onClose={() => setIsAddProjectModal(false)} className="relative z-50">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <div className="fixed inset-0 bg-[black]/60" />
                            </Transition.Child>
                            <div className="fixed inset-0 z-[999] px-4 overflow-y-auto">
                                <div className="flex items-center justify-center min-h-screen">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                            <button
                                                type="button"
                                                onClick={() => setIsAddProjectModal(false)}
                                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                                            >
                                                <FiX className="text-lg mr-2" />
                                            </button>
                                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                                {params.id ? 'Modifier l\'étape' : 'Ajouter une étape'}
                                            </div>
                                            <div className="p-5">
                                                <form onSubmit={saveProject}>
                                                    <div className="grid gap-5">
                                                        <div>
                                                            <label htmlFor="title">Nom de l'étape</label>
                                                            <input id="title" value={params.title} onChange={changeValue} type="text" className="form-input mt-1" placeholder="Enter Name" />
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-end items-center mt-8">
                                                        <button type="button" className="btn btn-outline-danger" onClick={() => setIsAddProjectModal(false)}>
                                                            Annuler
                                                        </button>
                                                        <button type="submit" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                            {params.id ? 'Mettre à jour' : 'Ajouter'}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                    {/* add task modal */}
                    <AddField isAddTaskModal={isAddTaskModal} setIsAddTaskModal={setIsAddTaskModal} saveTask={saveTask}
                        paramsTask={paramsTask} options={options} addTaskData={addTaskData} setParamsTask={setParamsTask} isChoiceSelect={isChoiceSelect} setIsChoiceSelect={setIsChoiceSelect} />
                    {/* delete task modal */}
                    <Transition appear show={isDeleteModal} as={Fragment}>
                        <Dialog as="div" open={isDeleteModal} onClose={() => setIsDeleteModal(false)} className="relative z-50">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                                <div className="fixed inset-0 bg-[black]/60" />
                            </Transition.Child>
                            <div className="fixed inset-0 z-[999] overflow-y-auto">
                                <div className="flex items-center justify-center min-h-screen px-4 ">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden md:w-full max-w-lg w-[90%] my-8">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsDeleteModal(false);
                                                }}
                                                className="absolute top-4 ltr:right-4 rtl:left-4 text-white-dark"
                                            >
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
                                            <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">Delete Task</div>
                                            <div className="p-5 text-center">
                                                <div className="text-white bg-danger ring-4 ring-danger/30 p-4 rounded-full w-fit mx-auto">
                                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            opacity="0.5"
                                                            d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        />
                                                        <path d="M20.5001 6H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path
                                                            d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                        />
                                                        <path opacity="0.5" d="M9.5 11L10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                        <path opacity="0.5" d="M14.5 11L14 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                </div>
                                                <div className="text-base sm:w-3/4 mx-auto mt-5">Are you sure you want to delete Task?</div>

                                                <div className="flex justify-center items-center mt-8">
                                                    <button
                                                        onClick={() => {
                                                            setIsDeleteModal(false);
                                                        }}
                                                        type="button"
                                                        className="btn btn-outline-danger"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button onClick={deleteTask} type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4">
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                    <button
                        type="button"
                        className="btn btn-danger flex w-full mt-5"
                        onClick={() => {
                            saveCandidate();
                        }}
                    >
                        <FiSave className="text-lg mr-2" />
                        Sauvegarder
                    </button>
                </form>
            </div>


        </DefaultLayout>
    )
}
