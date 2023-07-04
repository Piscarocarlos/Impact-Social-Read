import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Toaster, toast } from 'react-hot-toast';

const LoginBoxed = () => {
    const {post, setData, data, processing, errors, reset, clearErrors} = useForm({
        email: "",
        password: ""
    })
    const {flash} = usePage().props
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Login'));
    });
    const isDark = useSelector((state) => state.themeConfig.theme) === 'dark' ? true : false;

    const submitForm = (e) => {
        e.preventDefault();
        post(route('login'), {
            onSuccess: (data)=>{
                if(data?.props?.flash.error) {
                    toast.error(data?.props?.flash.error, {
                        position: "top-center"
                    })
                }
                // reset()
            },
        })
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel sm:w-[480px] m-6 max-w-lg w-full dark:text-white">
                <h2 className="font-bold text-2xl mb-3">CONNEXION</h2>
                <p className="mb-7">Nous sommes heureux de vous revoir...</p>
                <form className="space-y-5" onSubmit={submitForm}>
                    <div>
                        <label htmlFor="email">Adresse e-mail</label>
                        <input id="email" value={data.email} onChange={e=> setData('email', e.target.value)} type="email"
                        className="form-input" placeholder="Entrer votre adresse e-mail" />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe</label>
                        <input id="password" value={data.password} onChange={e=> setData('password', e.target.value)} type="password"
                        className="form-input" placeholder="Entrer votre mot de passe" />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <div>
                        <label className="cursor-pointer">
                            <input type="checkbox" className="form-checkbox" />
                            <span className="text-white-dark ml-4">Se rappeler de moi</span>
                        </label>
                    </div>
                    <button disabled={processing} type="submit" className="btn bg-lime-500 border-lime-500 text-white w-full">
                        {processing && <span  className="animate-spin border-2 mr-3 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>}
                        CONNEXION
                    </button>
                </form>
                <div className="relative my-7 h-5 text-center before:w-full before:h-[1px] before:absolute before:inset-0 before:m-auto before:bg-[#ebedf2] dark:before:bg-[#253b5c]">
                    <div className="font-bold text-white-dark bg-white dark:bg-black px-2 relative z-[1] inline-block">
                        <span>OR</span>
                    </div>
                </div>
                <ul className="flex justify-center gap-2 sm:gap-5 mb-5">
                    <li>
                        <Link href={route('google_auth')}>
                        <button
                            type="button"
                            className="btn flex gap-1 sm:gap-2 text-black shadow-none bg-white-dark/30 dark:border-[#253b5c] dark:hover:bg-[#1b2e4b] dark:bg-transparent dark:text-white hover:bg-white "
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 256 193" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                                <g>
                                    <path
                                        d="M58.1818182,192.049515 L58.1818182,93.1404244 L27.5066233,65.0770089 L0,49.5040608 L0,174.59497 C0,184.253152 7.82545455,192.049515 17.4545455,192.049515 L58.1818182,192.049515 Z"
                                        fill="#4285F4"
                                    ></path>
                                    <path
                                        d="M197.818182,192.049515 L238.545455,192.049515 C248.203636,192.049515 256,184.224061 256,174.59497 L256,49.5040608 L224.844415,67.3422767 L197.818182,93.1404244 L197.818182,192.049515 Z"
                                        fill="#34A853"
                                    ></path>
                                    <polygon
                                        fill="#EA4335"
                                        points="58.1818182 93.1404244 54.0077618 54.4932827 58.1818182 17.5040608 128 69.8676972 197.818182 17.5040608 202.487488 52.4960089 197.818182 93.1404244 128 145.504061"
                                    ></polygon>
                                    <path
                                        d="M197.818182,17.5040608 L197.818182,93.1404244 L256,49.5040608 L256,26.2313335 C256,4.64587897 231.36,-7.65957557 214.109091,5.28587897 L197.818182,17.5040608 Z"
                                        fill="#FBBC04"
                                    ></path>
                                    <path
                                        d="M0,49.5040608 L26.7588051,69.5731646 L58.1818182,93.1404244 L58.1818182,17.5040608 L41.8909091,5.28587897 C24.6109091,-7.65957557 0,4.64587897 0,26.2313335 L0,49.5040608 Z"
                                        fill="#C5221F"
                                    ></path>
                                </g>
                            </svg>
                            Google
                        </button>
                        </Link>
                    </li>

                    {/* <li>
                        <button
                            type="button"
                            className="btn flex gap-1 sm:gap-2 text-black shadow-none bg-white-dark/30 dark:border-[#253b5c] dark:hover:bg-[#1b2e4b] dark:bg-transparent dark:text-white hover:bg-white"
                        >
                            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 256 209" version="1.1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                                <g>
                                    <path
                                        d="M256,25.4500259 C246.580841,29.6272672 236.458451,32.4504868 225.834156,33.7202333 C236.678503,27.2198053 245.00583,16.9269929 248.927437,4.66307685 C238.779765,10.6812633 227.539325,15.0523376 215.57599,17.408298 C205.994835,7.2006971 192.34506,0.822 177.239197,0.822 C148.232605,0.822 124.716076,24.3375931 124.716076,53.3423116 C124.716076,57.4586875 125.181462,61.4673784 126.076652,65.3112644 C82.4258385,63.1210453 43.7257252,42.211429 17.821398,10.4359288 C13.3005011,18.1929938 10.710443,27.2151234 10.710443,36.8402889 C10.710443,55.061526 19.9835254,71.1374907 34.0762135,80.5557137 C25.4660961,80.2832239 17.3681846,77.9207088 10.2862577,73.9869292 C10.2825122,74.2060448 10.2825122,74.4260967 10.2825122,74.647085 C10.2825122,100.094453 28.3867003,121.322443 52.413563,126.14673 C48.0059695,127.347184 43.3661509,127.988612 38.5755734,127.988612 C35.1914554,127.988612 31.9009766,127.659938 28.694773,127.046602 C35.3777973,147.913145 54.7742053,163.097665 77.7569918,163.52185 C59.7820257,177.607983 37.1354036,186.004604 12.5289147,186.004604 C8.28987161,186.004604 4.10888474,185.75646 0,185.271409 C23.2431033,200.173139 50.8507261,208.867532 80.5109185,208.867532 C177.116529,208.867532 229.943977,128.836982 229.943977,59.4326002 C229.943977,57.1552968 229.893412,54.8901664 229.792282,52.6381454 C240.053257,45.2331635 248.958338,35.9825545 256,25.4500259"
                                        fill="#55acee"
                                    ></path>
                                </g>
                            </svg>
                            Twitter
                        </button>
                    </li> */}
                </ul>
                <p className="text-center">
                    Vous n'avez pas de compte ?
                    <Link href={route('register')} className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1 ml-3">
                         Créez-en un par ici
                    </Link>
                </p>
            </div>
            <Toaster />
        </div>
    );
};

export default LoginBoxed;
