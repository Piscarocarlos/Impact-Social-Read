import React, { useEffect } from 'react'
import jadara from '../assets/images/jadaralogo.png'
import impact from '../assets/images/impactlogo.png'
import beneficiaire from '../assets/images/beneficiaire.png'
import benef from '../assets/images/benef.png'
import partenaire from '../assets/images/partenaire.png'
import team from '../assets/images/utilisateur.png'
import { useDispatch, useSelector } from 'react-redux'
import { setPageTitle } from '../store/themeConfigSlice'
import { Link } from '@inertiajs/inertia-react'

 const HomePage= ()=> {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login'));
    });
    const isDark = useSelector((state) => state.themeConfig.theme) === 'dark' ? true : false;

  return (
    <div className="min-h-screen bg-cover bg-center  bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
        <div className="container mx-auto px-4 grid grid-cols-2 gap-4 ">
            <div className='ml-3 flex justify-left items-center '>
                <img width="150" src={impact} alt="impactsocial" />
            </div>
            <div className='mr-4 flex justify-end items-center'>
                <img width="80" src={jadara} alt="jadara fundation" />
            </div>
        </div>

        <div className='container'>
            <h1 className="font-bold text-3xl mb-3 text-center mt-6">Quel est votre rôle ?</h1>
            <div className='grid md:grid-cols-4 gap-4 p-5 sm:grid-cols-2'>

                <Link href={route('login')}>
                    <div className='flex flex-col items-center p-6 gap-3 border-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-lg '>

                        <img  className='mb-2 mt-5 ' src={beneficiaire} alt="image candidat" />

                        <h2 className="font-medium text-2xl  mb-4 text-white">Candidat</h2>
                    </div>
                </Link>
                <a href="#">
                    <div className='flex flex-col items-center p-6 gap-3 border-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-lg '>
                         <img className='mb-2 mt-5 '  src={benef} alt="image beneficiare" />
                        <h1 className="font-medium text-2xl mb-3 text-center text-white">Bénéficiare</h1>
                    </div>
                </a>
               <a href="#">
                    <div className='flex flex-col items-center p-6 gap-3 border-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-lg '>
                         <img className='mb-2 mt-5 '  src={partenaire} alt="image partenaire" />
                        <h1 className="font-medium text-2xl mb-3 text-center text-white">Partenaire</h1>
                    </div>
               </a>
               <Link href={route('login')}>
                    <div className='flex flex-col items-center p-6 gap-3 border-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-lg '>
                         <img className='mb-2 mt-5 '  src={team} alt="image team" />
                        <h1 className="font-medium text-2xl mb-3 text-center text-white">Accès Team</h1>
                    </div>
               </Link>

           </div>
        </div>
    </div>
  );
}
export default HomePage;
