import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import App from '../../App'

export default function Step2() {
  return (
    <App>
      <div className="text-black min-h-screen bg-cover bg-center dark:text-white bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')] ">
        <div className="lg:m-10 flex justify-center sm:m-2">
          <div className="shadow-lg p-8 dark:shadow-lg bg-white rounded-lg after:shadow-lg  lg:w-1/2 sm:w-full ">
            <div class="space-y-1">
              <div class="w-full h-4 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
                <div class="bg-primary h-4 rounded-full rounded-bl-full w-6/12 text-center text-white text-xs">50%</div>
              </div>
            </div>

            <div className="my-5">
              <h2 className="font-bold text-[1.1em]">VALIDATION DE COMPTE</h2>
            </div>

            <form class="space-y-5">
              <div>
                <label for="code">Entrer le code de validation</label>
                <input id="code" type="text" placeholder="*************" class="form-input" required />
              </div>
            </form>

            <p className="mt-5 text-[1.05em]">
              Le code de vérification est donné après que le paiement soit éffectué. Vous pouvez trouver celà dans votre fichier zippé installable
            </p>

            <p className="mt-5 text-[1.05em]">
              Pour toute autre question, consulter la <Link href="#" className="text-lime-500">documentation</Link> ou contactez le <Link href="#" className="text-lime-500">service client</Link>
            </p>

            <div className="flex justify-between mt-5">
              <Link href={route('install.step1')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
                  <g id="Group_22706" data-name="Group 22706" transform="translate(-770 -653)">
                    <g id="Ellipse_26" data-name="Ellipse 26" transform="translate(770 653)" fill="none" stroke="#cccccc" stroke-width="1">
                      <circle cx="20" cy="20" r="20" stroke="none" />
                      <circle class="inner" cx="20" cy="20" r="19.5" fill="none" />
                    </g>
                    <path id="e078aa9915b23dfe83446121b09a6213" class="arrow" d="M98.073,90.719H88.146l4.576-4.576L91.537,85,85,91.537l6.537,6.537,1.144-1.144-4.535-4.576h9.927Z" transform="translate(698.463 581.463)" fill="#cccccc" />
                  </g>
                </svg>
              </Link>
              <Link href={route('install.step3')} type="button" className="btn btn-danger bg-lime-500 border-lime-500">Continuer</Link>
            </div>
          </div>
        </div>
      </div>
    </App>
  )
}
