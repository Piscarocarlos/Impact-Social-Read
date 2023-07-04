import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { FiEdit, FiList, FiPlus, FiTrash } from 'react-icons/fi'
import { Link } from '@inertiajs/inertia-react'


export default function Index() {
    return (
        <DefaultLayout>
            {/* generate card in tailwind and insert table */}
           <div className="flex gap-3 datatables">
           <div className="w-1/2 ">
               
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-full my-6 pr-0 lg:pr-2 panel">
                            <p className="text-xl pb-6 flex items-center">
                                <i className="fas fa-list mr-3"></i> Listes des CRUD
                            </p>

                            <div class="table-responsive datatables">
                                <table>
                                    <thead>
                                        <tr>
                                            <th width="70%">Nom du CRUD</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className='text-lg'>Type d'opérateurs de service</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.type-operateur-service.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.type-operateur-service.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Type de bénéficiaire</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.type-beneficiaire.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.type-beneficiaire.index')}   className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Type de convention</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.type-convention.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.type-convention.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Durée de la convention</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.duration-convention.create')}  className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.duration-convention.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Devises</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.liste-devise.create')}  className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.liste-devise.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Civilités</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.liste-civilite.create')}  className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.liste-civilite.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Statut convention</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.statut-convention.create')}  className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.statut-convention.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Modèle de reporting</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.model-reporting.create')}  className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.model-reporting.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        {/* <tr>
                                            <td className='text-lg'>Critères de sélection</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.critere-selection.create')}  className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                               *<Link href={route('dashboard.critere-selection.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>*/}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div >

               
            </div>

            <div className="w-1/2 ">
              
                    <div className="flex flex-wrap">
                        <div className="w-full panel lg:w-full my-6 pr-0 lg:pr-2">
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
                                            <td className='text-lg'>Type des partenaires</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.liste-partenaire-type.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.liste-partenaire-type.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Source partenaires</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.liste-source.create')}  className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.liste-source.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Catégorie des partenaires</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.liste-categorie-partenaire.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.liste-categorie-partenaire.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Services</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.service.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.service.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Opérateurs de services</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.operateur-service.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.operateur-service.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Famille de convention</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.famille-convention.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.famille-convention.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Pack de convention</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.list-pack.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.list-pack.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
                                                    <FiList />
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='text-lg'>Les intitulés de actes</td>
                                            <td className='flex'>
                                                <Link href={route('dashboard.intitule-acte.create')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-blue-600">
                                                    <FiPlus />
                                                </Link>

                                                <Link href={route('dashboard.intitule-acte.index')} className="text-white p-2 rounded hover:text-gray-100 mr-2 bg-yellow-600">
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

        </DefaultLayout >
    )
}
