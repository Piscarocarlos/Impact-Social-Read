import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2';

export default function Activation({ settings }) {
    console.log('settings', settings);
    const tableauFiltre = settings.filter(element => element.category == 1);
    const tableauFiltre2 = settings.filter(element => element.category == 2);
    const tableauFiltre3 = settings.filter(element => element.category == 3);
    const [setting, setSetting] = useState(settings);
    useEffect(() => {
        setSetting(settings)
    }, [])

    const [https, setHttps] = useState(settings.filter(element => element.type == 'https'));
    const [maintenance, setMaintenance] = useState(setting.filter(element => element.type == 'maintenance_mode'));
    const [candidature, setCandidture] = useState(setting.filter(element => element.type == 'candidature'));
    const [partenaire, setPartenaire] = useState(setting.filter(element => element.type == 'partenaire'));
    const [scoring, setScoring] = useState(setting.filter(element => element.type == 'scoring'));
    const [benificiaire, setBeneficiaire] = useState(setting.filter(element => element.type == 'beneficiaire'));
    const [boursier, setBoursier] = useState(setting.filter(element => element.type == 'boursier'));
    const [operation, setOperation] = useState(setting.filter(element => element.type == 'operation'));
    const [mail, setMail] = useState(setting.filter(element => element.type == 'mail_de_confirmation'));
    const [change, setChange] = useState(false);
    const { post, data, setData, put } = useForm({
        dataMaintenance: +maintenance[0].value,
        dataHttps: +https[0].value,
        dataCandidature: +candidature[0].value,
        dataPartenaire: +partenaire[0].value,
        dataScoring: +scoring[0].value,
        dataBeneficiaire: +benificiaire[0].value,
        dataBoursier: +boursier[0].value,
        dataOperation: +operation[0].value,
        dataMail: +mail[0].value,

    })
    useEffect(() => {
        // Soumettre le formulaire lorsque switchValue est mis à jour
        if (change) {
            submitForm();
        }

    }, [change]);
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
    }

    const handleSwitchChange = (e, key) => {
        let switchValue = '9';
        if (e.target.checked) {
            switchValue = '1';
        } else {
            switchValue = '0';
        }
        console.log('restu', switchValue);
        setData(key, switchValue);

        setChange(true)
    }

    console.log('erfed', setting);
    const submitForm = () => {
        post(route('dashboard.activation.update'), {
            onSuccess: () => {
                showMessage('Modification reussie!')
                setChange(false)
                console.log('er', change)
            }
        });
    };


    return (
        <DefaultLayout>
            <div>
                <div className="">
                    <div className="relative flex items-center border p-3.5 rounded text-warning bg-warning-light border-warning ltr:border-l-[64px] rtl:border-r-[64px] dark:bg-success-dark-light">
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
                            <strong className="ltr:mr-1 rtl:ml-1">Attention cette partie activation est gèrée par un développeur expériementé ! </strong>
                        </span>

                    </div>
                    <div className="activation-systeme">

                        <div className="first-section mx-auto mb-5 ">
                            <h2 className="text-xl font-bold text-gray-500 text-center mb-5">Activation systéme</h2>
                            <div className=" grid grid-cols-3 gap-4">

                                {maintenance && <div className="panel ">
                                    <div className="flex items-center justify-center mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light text-center">Activation maintenance</h5>

                                    </div>
                                    <div className="flex items-center justify-center mb-5">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" defaultChecked={data.dataMaintenance} value={data.dataMaintenance} onChange={e => handleSwitchChange(e, 'dataMaintenance')} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>

                                </div>}
                                {https && <div className="panel ">
                                    <div className="flex items-center justify-center mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light text-center">Activation HTTPS</h5>

                                    </div>
                                    <div className="flex items-center justify-center mb-5">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" defaultChecked={data.dataHttps} value={data.dataHttps} onChange={e => handleSwitchChange(e, 'dataHttps')} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>

                                </div>}

                            </div>
                        </div>
                        <div className="second-section mb-5">
                            <h2 className="text-xl text-xl font-bold text-gray-500 text-center mb-5">Activation Module</h2>
                            <div className=" grid grid-cols-3 gap-4">
                                {candidature && <div className="panel ">
                                    <div className="flex items-center justify-center mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light text-center">Candidature</h5>

                                    </div>
                                    <div className="flex items-center justify-center mb-5">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" defaultChecked={data.dataCandidature} value={data.dataCandidature} onChange={e => handleSwitchChange(e, 'dataCandidature')} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>

                                </div>}
                                {scoring && <div className="panel ">
                                    <div className="flex items-center justify-center mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light text-center">Scoring</h5>

                                    </div>
                                    <div className="flex items-center justify-center mb-5">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" defaultChecked={data.dataScoring} value={data.dataScoring} onChange={e => handleSwitchChange(e, 'dataScoring')} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>

                                </div>}
                                {partenaire && <div className="panel ">
                                    <div className="flex items-center justify-center mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light text-center">Partenaire</h5>

                                    </div>
                                    <div className="flex items-center justify-center mb-5">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" defaultChecked={data.dataPartenaire} value={data.dataPartenaire} onChange={e => handleSwitchChange(e, 'dataPartenaire')} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>

                                </div>}
                                {benificiaire && <div className="panel ">
                                    <div className="flex items-center justify-center mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light text-center">Bénéficiaire</h5>

                                    </div>
                                    <div className="flex items-center justify-center mb-5">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" defaultChecked={data.dataBeneficiaire} value={data.dataBeneficiaire} onChange={e => handleSwitchChange(e, 'dataBeneficiaire')} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>

                                </div>}
                                {boursier && <div className="panel ">
                                    <div className="flex items-center justify-center mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light text-center">Boursier</h5>

                                    </div>
                                    <div className="flex items-center justify-center mb-5">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" defaultChecked={data.dataBoursier} value={data.dataBoursier} onChange={e => handleSwitchChange(e, 'dataBoursier')} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>

                                </div>}
                                {operation && <div className="panel ">
                                    <div className="flex items-center justify-center mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light text-center">Opération</h5>

                                    </div>
                                    <div className="flex items-center justify-center mb-5">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" defaultChecked={data.dataOperation} value={data.dataOperation} onChange={e => handleSwitchChange(e, 'dataOperation')} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>

                                </div>}

                            </div>
                        </div>
                        <div className="tree-section mb-5">
                            <h2 className="text-xl font-bold text-gray-500 text-center">Autres Activations</h2>
                            <div className=" grid grid-cols-3 gap-4">
                                {mail && <div className="panel ">
                                    <div className="flex items-center justify-center mb-5">
                                        <h5 className="font-semibold text-lg dark:text-white-light text-center">Mail de Confirmation</h5>

                                    </div>
                                    <div className="flex items-center justify-center mb-5">
                                        <label className="w-12 h-6 relative">
                                            <input type="checkbox" defaultChecked={data.dataMail} value={data.dataMail} onChange={e => handleSwitchChange(e, 'dataMail')} className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                            <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                        </label>
                                    </div>

                                </div>}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}
