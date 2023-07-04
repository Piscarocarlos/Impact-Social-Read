import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { FiEdit, FiList, FiPlus, FiTrash } from 'react-icons/fi'
import { Link } from '@inertiajs/inertia-react'


export default function Index() {
    return (
        <DefaultLayout>
            {/* generate card in tailwind and insert table */}
           <div className="flex gap-3">
           <div className="w-1/2">
                <div className="bg-white shadow-md rounded-md p-4">
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-full my-6 pr-0 lg:pr-2">
                            <p className="text-xl pb-6 flex items-center">
                                <i className="fas fa-list mr-3"></i> Listes des CRUD
                            </p>

                            <div class="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th width="70%">Nom du CRUD</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='text-lg'>Régions</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.regions.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.regions.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Provinces</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.provinces.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.provinces.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Villes</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.villes.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.villes.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Pays</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.liste-pays.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Années Baccalauréat</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.annees-bac.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link  href={route('dashboard.annees-bac.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Ecoles</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.liste-ecole.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.liste-ecole.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Type d'handicap</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.type-handicap.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.type-handicap.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Pourcentage d'handicap</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.pourcentage-handicap.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.pourcentage-handicap.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div >

                </div>
            </div>

            <div className="w-1/2">
                <div className="bg-white shadow-md rounded-md p-4">
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-full my-6 pr-0 lg:pr-2">
                            <p className="text-xl pb-6 flex items-center">
                                <i className="fas fa-list mr-3"></i> Listes des CRUD
                            </p>

                            <div class="table-responsive">
                                <table>
                                    <thead>
                                        <tr>
                                            <th width="70%">Nom du CRUD</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                            <td className='text-lg'>Filières Baccalauréat</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.filiere-bac.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.filiere-bac.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Situations Socieles</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.situation-sociale.create')}  className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.situation-sociale.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Type d'orphelin</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.type-orphelin.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.type-orphelin.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Logements</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.type-logement.create')}  className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>
                                                <Link href={route('dashboard.type-logement.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Renseignements</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.connaissance-application.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>
                                                <Link href={route('dashboard.connaissance-application.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>SMTP configuration</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.smtp-configuration.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>
                                                <Link href={route('dashboard.smtp-configuration.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Période de candidature</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.periode-candidature.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>
                                                <Link href={route('dashboard.periode-candidature.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                      
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div >

                </div>
            </div>
           </div>

        </DefaultLayout >
    )
}
