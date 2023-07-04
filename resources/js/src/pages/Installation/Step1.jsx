import React from 'react'
import App from '../../App'
import { Link } from '@inertiajs/inertia-react'

export default function Step1({permission}) {
  console.log(permission);
  return (
    <App>
      <div className="text-black min-h-screen bg-cover bg-center dark:text-white bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
        <div className="lg:m-10 flex justify-center sm:m-2">
          <div className="shadow-lg p-8 dark:shadow-lg bg-white rounded-lg after:shadow-lg  lg:w-1/2 sm:w-full ">
            <div className="space-y-1">
              <div className="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
                <div className="bg-primary h-4 rounded-full rounded-bl-full w-3/12 text-center text-white text-xs">25%</div>
              </div>
            </div>
            <h3 className="my-4 font-bold text-base">
              VERIFICATION DES PERMISSIONS
            </h3>
            <p className="text-[1.1em] mb-3">
              Nous avons effectué un diagnostic sur votre serveur. Passez en revue les éléments marqués.  Si tout est vert, vous pouvez passer à l'étape suivante.
            </p>
            <div className="flex mt-4 flex-col rounded-md border border-[#e0e6ed] dark:border-[#1b2e4b]">
              <div className="border-b flex justify-between border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5">
                <div className="font-semibold text-[1.2em]">Php version {">="} 8.0 </div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13.435" height="13.435" viewBox="0 0 13.435 13.435">
                    <path id="Union_2" data-name="Union 2" d="M-4076.25,7a.75.75,0,0,1-.75-.75V.75a.75.75,0,0,1,.75-.75.75.75,0,0,1,.75.75V5.5h9.75a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(2882.875 -2874.389) rotate(-45)" 
                    fill={permission.php_version >= 8.0 ? "#00ac47" : "#fe2b25"} />
                  </svg>
                </div>
              </div>
              <div className="border-b flex justify-between border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5">
                <div className="font-semibold text-[1.2em]">Activation Curl</div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13.435" height="13.435" viewBox="0 0 13.435 13.435">
                    <path id="Union_2" data-name="Union 2" d="M-4076.25,7a.75.75,0,0,1-.75-.75V.75a.75.75,0,0,1,.75-.75.75.75,0,0,1,.75.75V5.5h9.75a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(2882.875 -2874.389) rotate(-45)" 
                    fill={permission.curl_enabled ? "#00ac47" : "#fe2b25"} />
                  </svg>
                </div>
              </div>
              <div className="border-b flex justify-between border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5">
                <div className="font-semibold text-[1.2em]">Permission du fichier .env</div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13.435" height="13.435" viewBox="0 0 13.435 13.435">
                    <path id="Union_2" data-name="Union 2" d="M-4076.25,7a.75.75,0,0,1-.75-.75V.75a.75.75,0,0,1,.75-.75.75.75,0,0,1,.75.75V5.5h9.75a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(2882.875 -2874.389) rotate(-45)" 
                    fill={permission.db_file_write_perm ? "#00ac47" : "#fe2b25"} />
                  </svg>
                </div>
              </div>
              <div className="border-b flex justify-between border-[#e0e6ed] dark:border-[#1b2e4b] px-4 py-2.5">
                <div className="font-semibold text-[1.2em]">Permission du fichier RouteServiceProvider.php</div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13.435" height="13.435" viewBox="0 0 13.435 13.435">
                    <path id="Union_2" data-name="Union 2" d="M-4076.25,7a.75.75,0,0,1-.75-.75V.75a.75.75,0,0,1,.75-.75.75.75,0,0,1,.75.75V5.5h9.75a.75.75,0,0,1,.75.75.75.75,0,0,1-.75.75Z" transform="translate(2882.875 -2874.389) rotate(-45)" 
                    fill={permission.routes_file_write_perm ? "#00ac47" : "#fe2b25"} />
                  </svg>
                </div>
              </div>
            </div>
           
            <div className="flex justify-between mt-5">
                  <Link href={route('install.step0')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                        <g id="Group_22706" data-name="Group 22706" transform="translate(-770 -653)">
                          <g id="Ellipse_26" data-name="Ellipse 26" transform="translate(770 653)" fill="none" stroke="#cccccc" stroke-width="1">
                            <circle cx="20" cy="20" r="20" stroke="none"/>
                            <circle class="inner" cx="20" cy="20" r="19.5" fill="none"/>
                          </g>
                          <path id="e078aa9915b23dfe83446121b09a6213" class="arrow" d="M98.073,90.719H88.146l4.576-4.576L91.537,85,85,91.537l6.537,6.537,1.144-1.144-4.535-4.576h9.927Z" transform="translate(698.463 581.463)" fill="#cccccc"/>
                        </g>
                    </svg>
                  </Link>
                  <Link href={route('install.step2')} type="button" className="btn btn-danger bg-lime-500 border-lime-500">Continuer</Link>
              </div>
          </div>
        </div>
      </div>
    </App>
  )
}
