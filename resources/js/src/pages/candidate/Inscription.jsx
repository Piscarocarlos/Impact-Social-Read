import React, { useEffect, useRef, useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import CodeHighlight from '../../components/Highlight';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

// import { IRootState } from '../../store';
import { GiConfirmed } from 'react-icons/gi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { useForm, usePage } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';
// import { useForm } from 'react-hook-form';
// Import Swiper styles


function Inscription({ myInscription, candidat, cities, ecoles, situation__socials, filiere_bacs, logements, orphelinats, pays, provinces, regions, information__pluses, handicapType }) {
    const { appName, user } = usePage().props;
    const dataForms = JSON.parse(myInscription?.dataForm)
    const [country, setCountry] = useState([]);
    const [city, setCity] = useState(cities);
    const [region, setRegion] = useState(regions);
    const [province, setProvince] = useState(provinces);
    const [citySchool, setCitySchool] = useState(cities);
    const [regionSchool, setRegionSchool] = useState(regions);
    const [provinceSchool, setProvinceSchool] = useState(provinces);
    const [school, setSchool] = useState(ecoles);
    const [filiere, setFiliere] = useState(filiere_bacs)
    const [social, setSocial] = useState(situation__socials);
    const [housing, setHousing] = useState(logements);
    const [orphelinat, setOrphelinat] = useState(orphelinats);
    const [info, setInfo] = useState(information__pluses);
    const [handicapTypes, setHandicapTypes] = useState(handicapType);
    const [saveForm, setSaveForm] = useState(false);
    const [dataInscription, setDataInscription] = useState(dataForms);
  
    // const [typeHandicap, setTypeHandicap] = useState(Type_handicap);

    //  console.log("inscrip", handicapTypes);

    const getUniqueNames = (step) => {
        const uniqueNames = [];
        const data = step.steps;
        data.forEach((step) => {
            step.tasks.forEach((task) => {
                if (!uniqueNames.includes(task.unique_name)) {
                    uniqueNames.push(task.unique_name);
                }
            })
        })
        return uniqueNames;
    }

    const step = JSON.parse(candidat.steps)
    // console.log({...getUniqueNames(step)});
    // format array to object in format {unique_name: value}
    const formatData = (data) => {
        const obj = {};
        // data.forEach((item) => {
        //     if ( obj[item] =null) {
        //         obj[item] = '';     
        //     }

        // })
        return obj;
    }
    const initialiseData = (myObject) => {
        for (let key in myObject) {
            if (myObject.hasOwnProperty(key) && myObject[key] === null) {
                myObject[key] = '';
            }
            // console.log("dataonvcsd",myObject);    
        }
    }
    initialiseData(dataForms)


    const { data, setData, processing, errors, reset, put, post } = useForm(dataForms);
    const verifyValidation = (tab, validation) => tab.some(item => item.value === validation);
    //     vb  &&é&

    // console.log('My daya', step);

    const [dataSteps, setDataSteps] = useState([]);
    const swiperRef = useRef();
    const dispatch = useDispatch();
    useEffect(() => {
        setCountry(pays);
        setDataSteps(step.steps);
        dispatch(setPageTitle('Inscription'));
        const newDatas = { ...data, dataInscription };
        setData(newDatas);
       
    }, [])
    useEffect(() => {
        setCountry(pays);
        setDataSteps(step.steps);
        dispatch(setPageTitle('Inscription'));
        if (data.socialSituation === "Abandonné" || data.socialSituation === "" || data.socialSituation === "Normale") {
            const newData1 = { ...data, orphelinType: "", parentalCare: "" ,amountPension:""};
            
            setData(newData1);
            console.log('1',newData1);
            console.log('23',data);
        }
        console.log('45',data);
        if (data.socialSituation == "Parent divorcés") {
            const newData2 = { ...data, orphelinType: "" };
            setData(newData2);
            console.log('2');
        }
        if (data.socialSituation == "Orphelin") {
            const newData3 = { ...data, parentalCare: "",amountPension:""};
            setData(newData3);
            console.log('4');
        }

        if (data.orphelinType == 'de pere' || data.parentalCare === "Ma mere") {

            const newData4 = { ...data, workSituationFather: '' };
            setData(newData4);
            // console.log(" new datapere ",data);

        }


    }, [data.socialSituation]);
    useEffect(() => {
        setCountry(pays);
        setDataSteps(step.steps);
        dispatch(setPageTitle('Inscription'));
        if (data.orphelinType == 'de pere' || data.parentalCare === "Ma mere") {

            const newData5 = { ...data, workSituationFather: '' };
            setData(newData5);

        }
        if (data.orphelinType == 'de mere' || data.parentalCare == "Mon pere") {

            const newData6 = { ...data, workSituationMother: '' };
            setData(newData6);
        }
    }, [data.orphelinType, data.parentalCare]);
    // if (data.orphelinType=='de mere'||data.parentalCare=="Mon pere") {

    //     const newDatas= {...data, workSituationMother:''};
    //     setData(newDatas);
    // }  
    // if (data.orphelinType=='de mere'||data.parentalCare=="Mon pere") {

    //     const newData1= {...data, workSituationMother:''};
    //     setData(newData1);
    // }
    const themeConfig = useSelector((state) => state.themeConfig);
    const lenghtStep = dataSteps?.length;
    const [activeTab4, setActiveTab4] = useState(1);
    // step layout
    // console.log(dataSteps);
    // console.log(" new data2 ", data);
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
    const handleNextClick = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            setActiveTab4(activeTab4 >= 1 && activeTab4 < lenghtStep + 1 ? (activeTab4 + 1) : lenghtStep)

            swiperRef.current.swiper.slideNext();
        }
    };
    const handlePrevClick = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            setActiveTab4(activeTab4 > 1 && activeTab4 < lenghtStep + 1 ? (activeTab4 - 1) : 1)
            swiperRef.current.swiper.slidePrev();
        }
    };
    const submit = (e) => {
        e.preventDefault();
        if (saveForm === true) {

            setSaveForm(false);
            post(route('dashboard.subscribe.candidate.saveForm', user.id), {
                onSuccess: () => {
                    showMessage('Sauvegarde reussie.');


                },
            })

        } else {


            if (activeTab4 == 1) {
                // put(route('dashboard.subscribe.candidate.step1', 1))

                post(route('dashboard.subscribe.candidate.step1', user.id), {
                    onSuccess: () => {
                        handleNextClick();
                    },
                    onError: (errors) => {

                        // Actions à effectuer en cas d'erreur
                    }
                });
            } else if (activeTab4 === 2) {
                post(route('dashboard.subscribe.candidate.step2', user.id), {
                    onSuccess: () => {
                        handleNextClick();
                    },
                    onError: (errors) => {

                        // Actions à effectuer en cas d'erreur
                    }
                });
            }
            else if (activeTab4 === 3) {
                post(route('dashboard.subscribe.candidate.step3', 1), {
                    onSuccess: () => {
                        handleNextClick();
                    },
                    onError: (errors) => {

                        // Actions à effectuer en cas d'erreur
                    }
                });
            }
            else if (activeTab4 === 4) {
                post(route('dashboard.subscribe.candidate.step4', user.id), {
                    onSuccess: () => {
                        handleNextClick();
                    },
                    onError: (errors) => {
                        console.log('errors4', errors);

                        // Actions à effectuer en cas d'erreur
                    }
                });
            }
            else if (activeTab4 === 5) {
                post(route('dashboard.subscribe.candidate.step5', user.id), {
                    onSuccess: () => {
                        handleNextClick();
                    },
                    onError: (errors) => {
                        console.log('errors', errors)
                    }
                });
            }
            else if (activeTab4 === 6) {
                post(route('dashboard.subscribe.candidate.step6', user.id), {
                    onSuccess: () => {
                        handleNextClick();
                    },
                    onError: (errors) => {
                        // Actions à effectuer en cas d'erreur
                    }
                });
            }
            else if (activeTab4 === 7) {
                post(route('dashboard.subscribe.candidate.step7', user.id), {
                    onSuccess: () => {
                        handleNextClick();

                    },
                    onError: (errors) => {
                        console.log(data);
                        console.log('errors', errors);
                        // Actions à effectuer en cas d'erreur
                    }
                });
            }
        }
        // post('subscribe-candidate')

    }
    return (

        <DefaultLayout>
            <div className="panel ">
                {
                    (myInscription.etat == 0 || myInscription.etat == null) ?
                        <div className="">
                            <div className="flex items-center justify-between mb-5">
                                <h5 className="font-semibold text-lg dark:text-white-light">Candidate Register</h5>

                            </div>
                            <div className="mb-5">
                                <div className="inline-block w-full">
                                    <div className="relative z-[1]">
                                        <div
                                            // className={`${activeTab4 === 1 ? 'w-[100%]' : activeTab4 === 2 ? 'w-[25%]' : activeTab4 === 3 ? 'w-[50%]' : 'w-[75%]'}
                                            className='bg-dark bg-opacity-100 w-[1OO%] h-1 absolute ltr:left-0 rtl:right-0 top-[30px] m-auto -z-[1] transition-[width]' ></div>
                                        <ul className="flex justify-center items-center flex-nowrap">

                                            {dataSteps?.map((step, key) => (

                                                <li className="mx-auto " key={key}>
                                                    <div className="mx-auto ">
                                                        <button
                                                            type="button"
                                                            className={`${activeTab4 === key + 1 ? '!border-primary !bg-primary text-white' : activeTab4 > (key + 1) ? '!border-success !bg-success text-white' : ''}
                                            border-[3px] border-[#f3f2ee] mx-auto bg-white dark:bg-[#253b5c] dark:border-[#1b2e4b] flex justify-center items-center flex-nowrap  w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full`}

                                                        >
                                                            <span className='font-bold text-xl sm:text-2xl md:text-3xl transition-all duration-1000'>{activeTab4 > (key + 1) ? <GiConfirmed /> : key + 1} </span>

                                                        </button>
                                                        <span className={`${activeTab4 === (key + 1) ? ' text-primary ' : activeTab4 > (key + 1) ? ' text-success ' : ' '}text-center block mt-2`}>Étape {key + 1}</span>
                                                    </div>
                                                </li>
                                            ))}

                                        </ul>
                                    </div>
                                    <form onSubmit={submit}>
                                        <Swiper
                                            ref={swiperRef}
                                            modules={[Navigation]}
                                            navigation={{ nextEl: '.swiper-button-next-ex1', prevEl: '.swiper-button-prev-ex1' }}
                                            mousewheel={false}
                                            simulateTouch={false}
                                            className="swiper  mx-auto  mb-6 h-auto   "
                                            id="slider1"
                                            autoHeight
                                            allowTouchMove={false}
                                            dir={themeConfig.rtlClass}
                                            key={themeConfig.rtlClass === 'rtl' ? 'true' : 'false'}
                                            onSwiper={(swiper) => console.log('swipe')}
                                        >
                                            {dataSteps?.map((step, keys) => (


                                                <SwiperSlide key={keys} className='min-h-[60vh] !important'>
                                                  

                                                        <div className="flex items-center justify-between my-6">
                                                            <h5 className="font-semibold text-lg dark:text-white-light">{step.title}</h5>

                                                        </div>
                                                        <div className="my-3 ">
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" id="disabling_options">
                                                                {step.tasks.filter((task) => ((task.is_field_hide == "OUI" &&
                                                                    (((data.socialSituation == task.field_hidden_value) || (data.socialSituation == task.field_hidden_value2) || (data.socialSituation == task.field_hidden_value3))
                                                                        || ((data.parentalCare == task.field_hidden_value) || (data.parentalCare == task.field_hidden_value2) || (data.parentalCare == task.field_hidden_value3))
                                                                        || ((data.orphelinType == task.field_hidden_value) || (data.orphelinType == task.field_hidden_value2) || (data.orphelinType == task.field_hidden_value3))
                                                                        || ((data.handicapSituation == task.field_hidden_value) || (data.handicapSituation == task.field_hidden_value2) || (data.handicapSituation == task.field_hidden_value3))
                                                                        || ((data.supportByAnEPS == task.field_hidden_value) || (data.supportByAnEPS == task.field_hidden_value2) || (data.supportByAnEPS == task.field_hidden_value3))
                                                                        || (((data.housing == task.field_hidden_value) && (data.supportByAnEPS !== "Oui")) || (data.housing == task.field_hidden_value2) || (data.housing == task.field_hidden_value3) || (data.housing == task.field_hidden_value2) || (data.housing == task.field_hidden_value3))
                                                                        // || ((data.housing == task.field_hidden_value) || (data.housing == task.field_hidden_value2) || (data.housing == task.field_hidden_value3))
                                                                        || ((data.workSituationFather == task.field_hidden_value) || (data.workSituationFather == task.field_hidden_value2) || (data.workSituationFather == task.field_hidden_value3))
                                                                        || ((data.workSituationMother == task.field_hidden_value) || (data.workSituationMother == task.field_hidden_value2) || (data.workSituationMother == task.field_hidden_value3))
                                                                        || ((data.situationBankMother == task.field_hidden_value) || (data.situationBankMother == task.field_hidden_value2) || (data.situationBankMother == task.field_hidden_value3))
                                                                        || ((data.situationBankFather == task.field_hidden_value) || (data.situationBankFather == task.field_hidden_value2) || (data.situationBankFather == task.field_hidden_value3))

                                                                    ))
                                                                    || task.is_field_hide == "NON"))
                                                                    .map((task, index) => (
                                                                        <div key={index} className='w-[100%] mt-2'>


                                                                            {task.type && task.type.value === "select" ? (

                                                                                <div className={(errors[task?.unique_name] ? 'has-error ' : ' ')}>
                                                                                    <label htmlFor={`${task.unique_name}`}>{task.title}
                                                                                        {verifyValidation(task?.validations, "required") ? <span className="text-danger font-bold"> *</span> : null}
                                                                                    </label>

                                                                                    <select id={`${task.unique_name}`} name={`${task.title}`} className="form-select" value={data[task?.unique_name] ? data[task?.unique_name] : 'eu'} onChange={(e) => { setData(`${task.unique_name}`, e.target.value) }}>

                                                                                        <option value="">Sélectionner...</option>
                                                                                        {task.title === 'Pays' ?
                                                                                            country.map((item, index) => (<option key={index} value={item.fr}>{item.fr}</option>))

                                                                                            : (task.title === "Région d'origine") ?
                                                                                                region.map((item, index) => (<option key={index} value={item.id}>{item.name_region}</option>))
                                                                                                : task.title === 'Région du lycée' ?
                                                                                                    regionSchool.map((item, index) => (<option key={index} value={item.id}>{item.name_region}</option>))

                                                                                                    : task.title === "Votre Ville" ?
                                                                                                        city.filter((item) => (item.province_id == data.provinceOfOrigin)).map((item, index) => (<option key={index} value={item.name_city}>{item.name_city}</option>))
                                                                                                        : task.title === "Ville du Lycée" ?
                                                                                                            citySchool.filter((item) => (item.province_id == data.schoolProvince)).map((item, index) => (<option key={index} value={item.name_city}>{item.name_city}</option>))

                                                                                                            : task.title === "Genre" ?
                                                                                                                (<><option value="Masculin">Masculin</option>
                                                                                                                    <option value="Féminin">Féminin</option>
                                                                                                                </>)
                                                                                                                : task.title === "Nom du lycée" ?
                                                                                                                    school.map((item, index) => (<option key={index} value={item.nom_fr}>{item.nom_fr}</option>))

                                                                                                                    : task.title === "Comment avez vous connu JADARA FOOUNDATION ?" ?
                                                                                                                        info.map((item, index) => (<option key={index} value={item.name_information}>{item.name_information}</option>))

                                                                                                                        : task.title === "Filière du Bac" ?
                                                                                                                            filiere.map((item, index) => (<option key={index} value={item.name_filiere}>{item.name_filiere}</option>))
                                                                                                                            : task.title === "Situation sociale" ?
                                                                                                                                social.map((item, index) => (<option key={index} value={item.name_situation}>{item.name_situation}</option>))

                                                                                                                                : (task.title === "Prise en charge par un EPS") ? (<>
                                                                                                                                    <option value="Oui">Oui</option>
                                                                                                                                    <option value="Non">Non</option>
                                                                                                                                </>)
                                                                                                                                    : (task.title === "Êtes-vous en situation d'handicap ?") ? (<>
                                                                                                                                        <option value="yes">Oui</option>
                                                                                                                                        <option value="no">Non</option>
                                                                                                                                    </>)
                                                                                                                                        : (task.title === "Votre père a un compte bancaire ?") ? (<>
                                                                                                                                            <option value="trueFB">Oui</option>
                                                                                                                                            <option value="falseFB">Non</option>
                                                                                                                                        </>)
                                                                                                                                            : (task.title === "Votre mère a un compte bancaire ?") ? (<>
                                                                                                                                                <option value="trueMB">Oui</option>
                                                                                                                                                <option value="falseMB">Non</option>
                                                                                                                                            </>)
                                                                                                                                                : (task.title === "Votre père travaille ?") ? (<>
                                                                                                                                                    <option value="trueF">Oui</option>
                                                                                                                                                    <option value="falseF">Non</option>
                                                                                                                                                    <option value="retraite">Retraité</option>
                                                                                                                                                </>)
                                                                                                                                                    : (task.title === "Votre mère travaille ?") ? (<>
                                                                                                                                                        <option value="trueM">Oui</option>
                                                                                                                                                        <option value="falseM">Non</option>
                                                                                                                                                        <option value="retraiteM">Retraité</option>
                                                                                                                                                    </>)
                                                                                                                                                        : task.title === "Votre Province" ?

                                                                                                                                                            province.filter((item) => (item.region_id == data.regionOfOrigin)).map((item, index) => (<option key={index} value={item.id}>{item.name_province}</option>))
                                                                                                                                                            : task.title === "Province du lycée" ?

                                                                                                                                                                provinceSchool.filter((item) => (item.region_id == data.schoolRegion)).map((item, index) => (<option key={index} value={item.id}>{item.name_province}</option>))

                                                                                                                                                                : task.title === "Votre logement ?" ?
                                                                                                                                                                    housing.map((item, index) => (<option key={index} value={item.name_logement}>{item.name_logement}</option>))
                                                                                                                                                                    : task.title === "Vous êtes orphelin de ?" ?
                                                                                                                                                                        orphelinat.map((item, index) => (<option key={index} value={`${item.value_type}`}>{item.name_type}</option>))
                                                                                                                                                                        : task.title === "Prise en charge par lequel des parents" ?
                                                                                                                                                                            <>
                                                                                                                                                                                <option value="Mon pere">Mon pére</option>
                                                                                                                                                                                <option value="Ma mere">Ma mére</option>
                                                                                                                                                                            </>
                                                                                                                                                                            : task.title === "Année du Bac" ?
                                                                                                                                                                                <>
                                                                                                                                                                                    <option value="2020">2020</option>
                                                                                                                                                                                    <option value="2021">2021</option>
                                                                                                                                                                                    <option value="2022">2022</option>
                                                                                                                                                                                    <option value="2023">2023</option>
                                                                                                                                                                                </>
                                                                                                                                                                                : task.title == "Quel est votre type d'handicap ?" ?
                                                                                                                                                                                    handicapTypes.map((item, index) => (<option key={index} value={item.type_handicap}>{item.type_handicap}</option>))
                                                                                                                                                                                    : task.title === "Quel est le pourcentage de votre handicap ?" ?
                                                                                                                                                                                        <>
                                                                                                                                                                                            <option value="25%">25%</option>
                                                                                                                                                                                            <option value="50%">50%</option>
                                                                                                                                                                                            <option value="75%">75%</option>
                                                                                                                                                                                            <option value="100%">100%</option>
                                                                                                                                                                                        </>
                                                                                                                                                                                        : null

                                                                                        }

                                                                                    </select>
                                                                                    {errors[task?.unique_name] && <div className='text-red-500 text-xs'>{errors[task?.unique_name]}</div>}

                                                                                </div>)
                                                                                : task.type && task.type.value === "textarea" ?
                                                                                    <div className="">
                                                                                        <div className="">
                                                                                            <label htmlFor={`${task.unique_name}`}>{task.title}
                                                                                                {verifyValidation(task?.validations, "required") ? <span className="text-danger font-bold"> *</span> : null}
                                                                                            </label>
                                                                                            <textarea name={`${task.unique_name}`} id={`${task.unique_name}`} rows="3" className="form-textarea" onChange={(e) => setData(`${task.unique_name}`, e.target.value)}>{data[task?.unique_name]?data[task?.unique_name]:""}</textarea>

                                                                                        </div>

                                                                                    </div>
                                                                                    : task.type && task.type.value === "file" ?
                                                                                        (
                                                                                            (
                                                                                                <div className={(errors[task?.unique_name] ? 'has-error ' : ' ')}>
                                                                                                    <label >{task.title}
                                                                                                        {verifyValidation(task?.validations, "required") ? <span className="text-danger font-bold"> *</span> : null}
                                                                                                    </label>
                                                                                                    <input accept=".pdf" type={task.type ? task.type.value : null} placeholder={`Entrez votre ${task.title}`}
                                                                                                        className="form-input" name={`${task.title}`} onChange={(e) => setData(`${task.unique_name}`, e.target.files[0])} />
                                                                                                    {errors[task?.unique_name] && <div className='text-red-500 text-xs'>{errors[task?.unique_name]}</div>}
                                                                                                </div>)


                                                                                        )


                                                                                        : (
                                                                                            // (task.is_field_hide == "OUI" && ((data.socialSituation == task.field_hidden_value) || (data.handicapSituation == task.field_hidden_value) || (data.supportByAnEPS == task.field_hidden_value) || (data.housing == task.field_hidden_value))) || task.is_field_hide == "NON" ?
                                                                                            (
                                                                                                <div className={(errors[task?.unique_name] ? 'has-error ' : ' ')}>
                                                                                                    <label >{task.title}
                                                                                                        {verifyValidation(task?.validations, "required") ? <span className="text-danger font-bold"> *</span> : null}
                                                                                                    </label>
                                                                                                    <input type={task.type ? task.type.value : null} placeholder={`Entrez votre ${task.title}`} value={data[task?.unique_name]}
                                                                                                        className="form-input" name={`${task.title}`} onChange={(e) => setData(`${task.unique_name}`, e.target.value)} />
                                                                                                    {errors[task?.unique_name] && <div className='text-red-500 text-xs'>{errors[task?.unique_name]}</div>}
                                                                                                </div>)


                                                                                        )

                                                                            }
                                                                        </div>

                                                                    ))}

                                                            </div>
                                                        </div>

                                                    

                                                </SwiperSlide>

                                            ))}


                                            <div className="flex justify-between flex-wrap items-center mt-6 pt-6">
                                                <button disabled={processing} type="submit" className="btn btn-warning my-3  mx-auto" onClick={() => setSaveForm(true)}>Sauvegarder</button>

                                                <div className="flex justify-between w-full sm:w-1/2 md:w-1/3 lg:w-1/3 my-3  ">
                                                    <button type="button" className={`mx-4 swiper-button-prev-e btn btn-primary ${activeTab4 === 1 ? 'hidden' : ''}`} onClick={handlePrevClick}  >
                                                        précédent
                                                    </button>
                                                    <button disabled={processing} className={`mx-auto swiper-button-next-ex btn btn-primary ltr:ml-auto rtl:mr-auto ${activeTab4 === lenghtStep ? 'hidden' : ''}`} type='submit' >
                                                        Suivant
                                                    </button>
                                                    {activeTab4 >= lenghtStep ? <button type="submit" className="btn btn-success ">Envoyer</button> : null}

                                                </div>
                                            </div>
                                        </Swiper>
                                    </form >
                                </div>
                            </div>
                        </div>
                        :
                        <div className="">
                             <div className=" ">
                        <div className="relative flex items-center border p-3.5 rounded text-success bg-success-light border-success ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-success-dark-light">
                            <span className="absolute ltr:-left-11 rtl:-right-11 inset-y-0 text-white w-6 h-6 m-auto">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        opacity="0.5"
                                        d="M5.31171 10.7615C8.23007 5.58716 9.68925 3 12 3C14.3107 3 15.7699 5.58716 18.6883 10.7615L19.0519 11.4063C21.4771 15.7061 22.6897 17.856 21.5937 19.428C20.4978 21 17.7864 21 12.3637 21H11.6363C6.21356 21 3.50217 21 2.40626 19.428C1.31034 17.856 2.52291 15.7061 4.94805 11.4063L5.31171 10.7615Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path d="M12 8V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <circle cx="12" cy="16" r="1" fill="currentColor" />
                                </svg>
                            </span>
                            <span className="ltr:pr-2 rtl:pl-2">
                            <strong className="ltr:mr-1 rtl:ml-1">Votre inscription est en cours de traitement</strong> 
                            </span>
                            {/* <button type="button" className="ltr:ml-auto rtl:mr-auto hover:opacity-80">
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
                            </button> */}
                        </div>
                        
                    </div>
                           
                        </div>
                }
            </div>









        </DefaultLayout>
    )
}

export default Inscription











