import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, usePage } from '@inertiajs/inertia-react';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { FiDatabase, FiGrid, FiHome, FiUserCheck, FiClipboard, FiUserPlus, FiUsers, FiDivideSquare } from "react-icons/fi";
import { FaDeviantart } from "react-icons/fa";
import { useState, useEffect } from 'react';
import SidebarUser from './SidebarUser';

const Sidebar = () => {
    const { appName, user } = usePage().props;


    console.log("user", user.user_type);
    const [currentMenu, setCurrentMenu] = useState('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state) => state.themeConfig);
    const semidark = useSelector((state) => state.themeConfig.semidark);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul = selector.closest('ul.sub-menu');
            if (ul) {
                let ele = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);


    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}>
                <div className={user.user_type == "admin" ? "text-blue-600 dark:bg-black h-full" : "bg-[#213E60] text-blue-600 dark:bg-black h-full"}>
                    <div className="flex  justify-between items-center px-4 py-3">
                        <Link href={user.user_type == 'admin' ? "/" : route('dashboard.candidate.home')} className="main-logo flex items-center shrink-0">
                            <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo1.png" alt="logo" />
                            <span className="text-xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">{appName}</span>
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 m-auto">
                                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                                               
                            <li className="nav-item">
                                {user.user_type === "admin" ?
                                    <ul>


                                
                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'candidate' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('candidate')}>
                                                <div className="flex items-center">
                                                    <FiUsers />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Candidature')}</span>
                                                </div>

                                                <div className={currentMenu === 'candidate' ? 'rotate-90' : 'rtl:rotate-180'}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </button>


                                            <AnimateHeight duration={300} height={currentMenu === 'candidate' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <Link href={route('dashboard.list.candidate')}>{t('Liste')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('dashboard.result.scoring.candidate')}>{t('Resultat')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('dashboard.create.candidate')}>{t('Formulaire')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route('dashboard.home.candidate')}>{t('Parametre')}</Link>
                                                    </li>
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'benificiary' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('benificiary')}>
                                                <div className="flex items-center">
                                                    <FiUsers />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Bénéficiaire')}</span>
                                                </div>

                                                <div className={currentMenu === 'benificiary' ? 'rotate-90' : 'rtl:rotate-180'}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </button>

                                            <AnimateHeight duration={300} height={currentMenu === 'benificiary' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <Link href={route('dashboard.list.beneficiare')}>{t('Liste')}</Link>
                                                    </li>
                                                    {/* <li>
                                                        <Link href='#'>{t('Resultat')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link href='#'>{t('Formulaire')}</Link>
                                                    </li> */}
                                                  
                                                </ul>
                                            </AnimateHeight>
                                        </li>

                                        <li className="nav-item">
                                            <Link href={route('dashboard.roles.index')} className="group">
                                                <div className="flex items-center">
                                                    <FiUserCheck />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Roles')}</span>
                                                </div>
                                            </Link>
                                        </li>
                                        {/* Team Links */}
                                        <li className="nav-item">
                                            <Link href={route('dashboard.teams.index')} className="group">
                                                <div className="flex items-center">
                                                    <FiUserCheck />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Teams')}</span>
                                                </div>
                                            </Link>
                                        </li>
                                        {/* link for all data */}
                                        <li className="nav-item">
                                            <Link href={route('dashboard.all-data-crud')} className="group">
                                                <div className="flex items-center">
                                                    <FiDatabase />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Toutes les données')}</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href={route('dashboard.all-data-crud-partner')} className="group">
                                                <div className="flex items-center">
                                                    <FiDatabase />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Données partenaires')}</span>
                                                </div>
                                            </Link>
                                        </li>
                                      
                                        <li className="nav-item">
                                            <Link href={route('dashboard.liste-partenaire.index')} className="group">
                                                <div className="flex items-center">
                                                    <FiUserPlus />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Partenaires')}</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href={route('dashboard.convention.index')} className="group">
                                                <div className="flex items-center">
                                                    <FiClipboard />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Conventions')}</span>
                                                </div>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href={route('dashboard.recouvrement.index')} className="group">
                                                <div className="flex items-center">
                                                    <FiDivideSquare />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Recouvrement')}</span>
                                                </div>
                                            </Link>
                                        </li>


                                   
                                  
                                
                                    <li className="nav-item">
                                        <Link href={route('dashboard.contact-partenaires.index')} className="group">
                                            <div className="flex items-center">
                                                <FiGrid/>
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Contacts')}</span>
                                            </div>
                                        </Link>
                                    </li>
                               
                                   
                                 


                                        <li className="nav-item">
                                            <Link href={route('dashboard.scoring')} className="group">
                                                <div className="flex items-center">
                                                    <FiDatabase />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Scoring')}</span>
                                                </div>
                                            </Link>
                                        </li>






                                        {/*<li className="nav-item">

                                    <li className="nav-item">

                                        <Link href="#" className="group">
                                            <div className="flex items-center">
                                                <FiGrid/>
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Gestion des données')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                   {/* <li className="nav-item">
                                        <Link href="#" className="group">
                                            <div className="flex items-center">
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('Villes')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="#" className="group">
                                            <div className="flex items-center">

                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('scrumboard')}</span>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link href="#" className="group">
                                            <div className="flex items-center">
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('contacts')}</span>
                                            </div>
                                        </Link>
                                    </li> */}

                                        <li className="menu nav-item">
                                            <button type="button" className={`${currentMenu === 'configuration' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('configuration')}>
                                                <div className="flex items-center">
                                                    <FiUsers />
                                                    <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('configuration')}</span>
                                                </div>

                                                <div className={currentMenu === 'configuration' ? 'rotate-90' : 'rtl:rotate-180'}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </button>

                                           

                                            <AnimateHeight duration={300} height={currentMenu === 'configuration' ? 'auto' : 0}>
                                                <ul className="sub-menu text-gray-500">
                                                    <li>
                                                        <Link href={route('dashboard.activation.module.configuration')}>{t('Activation')}</Link>
                                                    </li>
                                                    <li>
                                                        <Link href={route("dashboard.currency.setting")}>{t('Devise')}</Link>
                                                    </li>
                                                    <li>
                                                    <Link href={route('dashboard.configuration.index.social.media')}>{t('Social Media')}</Link>
                                                    </li>


                                                </ul>
                                            </AnimateHeight>
                                        </li>
                                    </ul>
                                    : <SidebarUser />}

                            </li>
                        </ul>

                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
