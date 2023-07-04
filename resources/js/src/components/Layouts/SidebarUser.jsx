import { Link, usePage } from '@inertiajs/inertia-react'
import React from 'react'
import { FiUsers,FiUser, FiHome,FiList} from 'react-icons/fi'
import { encodeID } from '../../keys/Index';

export default function SidebarUser() {
  const { appName, user } = usePage().props;

  return (
    <ul>
      <li className="nav-item active">
        <Link href={route('dashboard.candidate.home')} className="group ">
          <div className="flex items-center">
            <FiHome />
            <span className="ltr:pl-3 rtl:pr-3 text-blue-200/100 dark:text-[#506690] dark:group-hover:text-white-dark">Accueil</span>
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <Link href={route('dashboard.candidate.inscription')} className="group">
          <div className="flex items-center">
            <FiUsers />
            <span className="ltr:pl-3 rtl:pr-3 text-blue-200/100 dark:text-[#506690] dark:group-hover:text-white-dark">Candidature</span>
          </div>
        </Link>
      </li>
      <li className="nav-item">
        <Link href={route('dashboard.profil.candidate')} className="group">
          <div className="flex items-center">
          <span className=" text-[#506690]! dark:group-hover:text-white-dark">
          <FiUser /> 
          </span>

            
            <span className="ltr:pl-3 rtl:pr-3 text-blue-200/100 dark:text-[#506690] dark:group-hover:text-white-dark">Profil</span>
          </div>
        </Link>
        <Link href={route('dashboard.candidate.view',encodeID(user.id))} className="group">
          <div className="flex items-center ">
            <FiList />
            <span className="ltr:pl-3 rtl:pr-3 text-blue-200/100 dark:text-[#506690] dark:group-hover:text-white-dark">Ma fiche d'inscription</span>
          </div>
        </Link>
      </li>
    </ul>
  )
}
