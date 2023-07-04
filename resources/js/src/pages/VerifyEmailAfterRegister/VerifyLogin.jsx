import { useForm, usePage } from '@inertiajs/inertia-react';
import { useDispatch, useSelector, } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Toaster, toast } from 'react-hot-toast';


function VerifyLogin({email}) {

    const {post, setData, data, processing, errors} = useForm({
        email:email,
        password: ""
    })
    const [showbutton, SetShowbutton]= useState(false);
    const {flash} = usePage().props
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Verification de mot de passe'));
    });

    const submitForm = (e) => {
        const queryParameters =   window.location.href;
        const idAsh= queryParameters.split('/');
        const id = idAsh[4];
        e.preventDefault();
        post(route('verify',id), {
            onSuccess: (data)=>{
                if(data?.props?.flash.error) {
                    toast.error(data?.props?.flash.error, {
                        position: "top-center"
                    })
                }
            },
        })
    };

  return (
    <div>
         <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel sm:w-[480px] m-6 max-w-lg w-full dark:text-white p-12">
                <div>
                    <img src="/assets/images/Ip1.png" alt=""  className= "rounded-full shadow-sm"/>
                </div>
                <h2 className="font-black text-base mb-3">CHANGEMENT DE MOT DE PASSE.</h2>
                <p className="mb-7  bg-lime-300 border-lime-500  rounded-sm p-2 font-bold"><span className="text-danger ">*</span>Verifiez qu'il s'agit bien de votre email.</p>
                <form className="space-y-5" onSubmit={submitForm}>
                    <div>
                        <label htmlFor="email"><span className='text-danger'>*</span> Adresse e-mail</label>
                        <input id="email" value={data.email} onChange={e=> setData('email', e.target.value)} type="email"
                        className="form-input" placeholder="Entrer votre adresse e-mail" readOnly />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div>
                        <label htmlFor="password"><span className='text-danger'>*</span> Nouveau Mot de passe</label>
                        <input id="password" value={data.password} onChange={e=> setData('password', e.target.value)} type="password"
                        className="form-input" placeholder="Entrer votre mot de passe"  />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <div>
                        {
                            data.password.length>7?<button
                            type="submit" className="btn bg-lime-500 border-lime-500 text-white w-full">
                                {processing && <span  className="animate-spin border-2  mr-3 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>}
                                NOUVEAU MOT DE PASSE
                            </button> : showbutton
                        }
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    </div>
  )
}

export default VerifyLogin
