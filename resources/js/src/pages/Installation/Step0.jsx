import React from 'react'
import App from "../../App"
import { Link } from '@inertiajs/inertia-react'

import Logo from "../../assets/images/logo1.png"
import Back from "../../assets/images/back.png"


export default function Step1() {
    return (
        <App>
            <div className="text-black min-h-screen bg-cover bg-center dark:text-white bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
                <div className="lg:m-10 flex justify-center sm:m-2">
                    <div className="shadow-lg p-8 dark:shadow-lg bg-white rounded-lg after:shadow-lg  lg:w-1/2 sm:w-full ">
                        <div className="w-full text-center flex items-center flex-col">
                            <img src={Logo} alt="Logo de Impact Social" width={150}/>
                            <h2 className="text-xl my-3 font-bold">Installation de Impact Social</h2>
                        </div>
                        <p className="text-base">
                            Bonjour cher client, <br />
                            Avant de commencer l'aventure, nous aurions besoin de vérifier et de configurer quelques informations de bases :
                        </p>

                        <div className=" mt-4">
                            <div className="max-w-[900px] mx-auto">
                                <div className="flex">
                                    <p className="text-[#3b3f5c] dark:text-white-light min-w-[65px] max-w-[100px] text-base font-semibold py-2.5">Etape 1</p>
                                    <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-primary before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-primary after:rounded-full"></div>
                                    <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                                        <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">Extensions obligatoires</p>
                                        <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">Requirements</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <p className="text-[#3b3f5c] dark:text-white-light min-w-[65px] max-w-[100px] text-base font-semibold py-2.5">Etape 2</p>
                                    <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-secondary before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-secondary after:rounded-full"></div>
                                    <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                                        <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">Informations de la base de données</p>
                                        <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">DB Connexion</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <p className="text-[#3b3f5c] dark:text-white-light min-w-[65px] max-w-[100px] text-base font-semibold py-2.5">Etape 3</p>
                                    <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-success before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-success after:rounded-full"></div>
                                    <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                                        <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">Migration des données</p>
                                        <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">Migration Data</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <p className="text-[#3b3f5c] dark:text-white-light min-w-[65px] max-w-[100px] text-base font-semibold py-2.5">Etape 4</p>
                                    <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-danger before:rounded-full after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[25px] after:-bottom-[15px] after:w-0 after:h-auto after:border-l-2 after:border-danger after:rounded-full"></div>
                                    <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                                        <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">Compte Admin</p>
                                        <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">Admin Account</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <p className="text-[#3b3f5c] dark:text-white-light min-w-[65px] max-w-[100px] text-base font-semibold py-2.5">Etape 5</p>
                                    <div className="relative before:absolute before:left-1/2 before:-translate-x-1/2 before:top-[15px] before:w-2.5 before:h-2.5 before:border-2 before:border-info before:rounded-full"></div>
                                    <div className="p-2.5 self-center ltr:ml-2.5 rtl:ltr:mr-2.5 rtl:ml-2.5">
                                        <p className="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px]">Installation terminée</p>
                                        <p className="text-white-dark text-xs font-bold self-center min-w-[100px] max-w-[100px]">Finished Install</p>
                                    </div>
                                </div>
                            </div>
                            <p className="my-2 text-[1.1em]">
                                Pendant le processus d'installation, nous vérifierons si les fichiers qui doivent être écrits (fichier .env) ont les droits d'écriture. Nous vérifierons également si curl est activé sur votre serveur ou non.
                            </p>
                            <div className="flex justify-end">
                                <Link href={route('install.step1')} type="button" className="btn btn-danger bg-lime-500 border-lime-500">Commencer l'installation</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </App>
    )
}
