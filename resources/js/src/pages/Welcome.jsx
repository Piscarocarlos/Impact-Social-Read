import { Link } from '@inertiajs/inertia-react'
import React from 'react'
import { FiUser } from 'react-icons/fi'

export default function Welcome() {
  return (
    <div className="flex min-h-screen">
      <div className="bg-gradient-to-t from-[#ff1361bf] to-[#44107A] w-1/2 min-h-screen hidden lg:flex flex-col items-center justify-center text-white dark:text-black p-4">
        <div className="w-full mx-auto mb-5">
          <img src="/assets/images/auth-cover.svg" alt="coming_soon" className="lg:max-w-[370px] xl:max-w-[500px] mx-auto" />
        </div>
        <h3 className="text-3xl font-bold mb-4 text-center">Rejoindre la communauté de Jadara</h3>
        <p>Vous pouvez créer un compte gratuitement !</p>
      </div>
      <div className="w-full lg:w-1/2 relative ">
        {/* Generate 3 cards tailwind responsive */}
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full lg:w-1/2 p-4">
            <Link href={route('login')}>
            <div className="bg-white dark:bg-black rounded-lg shadow-lg p-4">
              <div className="w-full text-center mb-6">
                <div className="flex items-center flex-col">
                  <FiUser className="text-4xl"/>
                  <div className="mt-2">
                    <h3 className="text-2xl font-bold">Accès Candidat</h3>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full lg:w-1/2 p-4">
            <div className="bg-white dark:bg-black rounded-lg shadow-lg p-4">
              <div className="w-full text-center mb-6">
                <div className="flex items-center flex-col">
                  <FiUser className="text-4xl"/>
                  <div className="mt-2">
                    <h3 className="text-2xl font-bold">Accès Béneficiare</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full lg:w-1/2 p-4">
            <div className="bg-white dark:bg-black rounded-lg shadow-lg p-4">
              <div className="w-full text-center mb-6">
                <div className="flex items-center flex-col">
                  <FiUser className="text-4xl"/>
                  <div className="mt-2">
                    <h3 className="text-2xl font-bold">Accès Partenaire</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full lg:w-1/2 p-4">
            <div className="bg-white dark:bg-black rounded-lg shadow-lg p-4">
              <div className="w-full text-center mb-6">
                <div className="flex items-center flex-col">
                  <FiUser className="text-4xl"/>
                  <div className="mt-2">
                    <h3 className="text-2xl font-bold">Accès Team</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
