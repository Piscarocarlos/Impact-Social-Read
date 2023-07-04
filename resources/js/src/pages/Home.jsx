import React from 'react'
import { Link } from 'react-router-dom';
import CodeHighlight from '../components/Highlight';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

import ReactApexChart from 'react-apexcharts';
import { setPageTitle } from '../store/themeConfigSlice';
import DefaultLayout from '../components/Layouts/DefaultLayout'
import { useForm } from '@inertiajs/inertia-react'
import Candidate from './Kpi/Candidate'
import Partner from './Kpi/Partner'


export default function Home({ candidat,
    candidateValidate,
    candidateInValidate,


    totalFinish,
    totalPaused,
    totalInscris,

    inscris,
    province,

    partenaire,
    partnerNoAccount,

    conventionF,
    conventionP
}) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tabs'));
    });

    const [tabs, setTabs] = useState([]);
    const toggleCode = (name) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };



    const data1 = candidateValidate
    const data2 = candidateInValidate

    const data3 = totalFinish
    const data4 = totalPaused
    const data5 = totalInscris
    const data6 = inscris
    const data7 = province

    const dataPartenaire = partenaire
    const dataAccountpartner = partnerNoAccount
    const dataConventionF = conventionF
    const dataConventionP = conventionP


    return (
        <DefaultLayout>
            <div className="mb-5 panel w-100">
                <div className="flex justify-between">
                    <h3 className="text-xl font-bold mb-5">Les statistiques de l'application</h3>
                </div>
                <Tab.Group>
                    <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''}
                                                    dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                >
                                    Candidature
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''}
                                                    dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                >
                                    Partenaire & Convention
                                </button>
                            )}
                        </Tab>
                        <Tab as={Fragment}>
                            {({ selected }) => (
                                <button
                                    className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''}
                                                    dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                >
                                    Module à faire
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <div className="active pt-5">
                            <Candidate prop1={data1} prop2={data2} prop3={data3} prop4={data4} prop5={data5} prop6={data6} prop7={data7} />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>
                           
                                <div className=" pt-5">
                                <Partner propPartner={dataPartenaire} propContact={dataAccountpartner} propConventionF={dataConventionF} propConventionP={dataConventionP} />
                                </div>
                          
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="pt-5">
                                <p>
                                    En cours d'intégration
                                </p>
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
           
            
        </DefaultLayout>
    )
}
