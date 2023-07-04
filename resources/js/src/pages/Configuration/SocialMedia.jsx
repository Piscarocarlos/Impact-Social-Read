import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useForm, usePage } from '@inertiajs/inertia-react'
import { FiSave } from 'react-icons/fi';
import { toast } from 'react-hot-toast'

export default function Index() {

    const { id_client_google, cle_api_google, id_client_facebook, cle_api_facebook, api_key_twitter, api_secret_key_twitter, access_token_twitter, access_token_secret_twitter } = usePage().props;

    const { data, post, setData, processing, errors } = useForm({
        id_client_google: id_client_google ? id_client_google.value : "",
        cle_api_google: cle_api_google ? cle_api_google.value : "",
        id_client_facebook: id_client_facebook ? id_client_facebook.value : "",
        cle_api_facebook: cle_api_facebook ? cle_api_facebook.value : "",
        api_key_twitter: api_key_twitter ? api_key_twitter.value : "",
        api_secret_key_twitter: api_secret_key_twitter ? api_secret_key_twitter.value : "",
        access_token_twitter: access_token_twitter ? access_token_twitter.value : "",
        access_token_secret_twitter: access_token_secret_twitter ? access_token_secret_twitter.value : "",
    })

    const submitGoogle = (e) => {
        e.preventDefault();
        post(route('dashboard.configuration.save.google'), {
            onSuccess: (data) => {
                if (data?.props?.flash.success) {
                    toast.success(data?.props?.flash.success, {
                        position: "top-center"
                    })
                }
            },
        })
    }

    const submitFacebook = (e) => {
        e.preventDefault();
        post(route('dashboard.configuration.save.facebook'), {
            onSuccess: (data) => {
                if (data?.props?.flash.success) {
                    toast.success(data?.props?.flash.success, {
                        position: "top-center"
                    })
                }
            },
        })
    }

    const submitTwitter = (e) => {
        e.preventDefault();
        post(route('dashboard.configuration.save.twitter'), {
            onSuccess: (data) => {
                if (data?.props?.flash.success) {
                    toast.success(data?.props?.flash.success, {
                        position: "top-center"
                    })
                }
            },
        })
    }

    return (
        <DefaultLayout>
            <div>
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Social Media</h5>
                </div>
                <div className="datatables">
                    <div className=" flex justify-between flex-nowrap dark:text-white gap-4">
                        <div className=" sm:w-full">
                            <div className="panel">
                                <h2 className="text-lg mb-3 font-bold">Google</h2>
                                <form onSubmit={submitGoogle}>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="my-2">
                                            <label htmlFor="id_client_google" className="text-base">ID Client</label>
                                            <input id="id_client_google" type="text" value={data.id_client_google} onChange={e => setData('id_client_google', e.target.value)} className="form-input " placeholder="ID Client" />
                                            {errors.id_client_google && <div className="text-danger">{errors.id_client_google}</div>}
                                        </div>
                                        <div className="my-2">
                                            <label htmlFor="cle_api_google" className="text-base">Clé API</label>
                                            <input id="cle_api_google" type="text" value={data.cle_api_google} onChange={e => setData('cle_api_google', e.target.value)} className="form-input " placeholder="Clé API" />
                                            {errors.cle_api_google && <div className="text-danger">{errors.cle_api_google}</div>}
                                        </div>
                                    </div>
                                    <div className="grid gap-3 pt-4 grid-cols-6">
                                        <button type="submit" className="btn bg-lime-500 text-white border-lime-500">
                                            <FiSave className="mr-4 rtl:order-2" />
                                            <span>Sauvegarder</span>
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="panel mt-5">
                                <h2 className="text-lg mb-3 font-bold">Facebook</h2>
                                <form onSubmit={submitFacebook}>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="my-2">
                                            <label htmlFor="id_client_facebook" className="text-base">ID Client</label>
                                            <input id="id_client_facebook" type="text" value={data.id_client_facebook} onChange={e => setData('id_client_facebook', e.target.value)} className="form-input " placeholder="ID Client" />
                                            {errors.id_client_facebook && <div className="text-danger">{errors.id_client_facebook}</div>}
                                        </div>
                                        <div className="my-2">
                                            <label htmlFor="cle_api_facebook" className="text-base">Clé API</label>
                                            <input id="cle_api_facebook" type="text" value={data.cle_api_facebook} onChange={e => setData('cle_api_facebook', e.target.value)} className="form-input " placeholder="Clé API" />
                                            {errors.cle_api_facebook && <div className="text-danger">{errors.cle_api_facebook}</div>}
                                        </div>
                                    </div>
                                    <div className="grid gap-3 pt-4 grid-cols-6">
                                        <button type="submit" className="btn bg-lime-500 text-white border-lime-500">
                                            <FiSave className="mr-4 rtl:order-2" />
                                            <span>Sauvegarder</span>
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div className="panel mt-5">
                                <h2 className="text-lg mb-3 font-bold">Twitter</h2>
                                <form onSubmit={submitTwitter}>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="my-2">
                                            <label htmlFor="api_key_twitter" className="text-base">API KEY</label>
                                            <input id="api_key_twitter" type="text" value={data.api_key_twitter} onChange={e => setData('api_key_twitter', e.target.value)} className="form-input " placeholder="API KEY" />
                                            {errors.api_key_twitter && <div className="text-danger">{errors.api_key_twitter}</div>}
                                        </div>
                                        <div className="my-2">
                                            <label htmlFor="api_secret_key_twitter" className="text-base">API SECRET KEY </label>
                                            <input id="api_secret_key_twitter" type="text" value={data.api_secret_key_twitter} onChange={e => setData('api_secret_key_twitter', e.target.value)} className="form-input " placeholder="API SECRET KEY" />
                                            {errors.api_secret_key_twitter && <div className="text-danger">{errors.api_secret_key_twitter}</div>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="my-2">
                                            <label htmlFor="access_token_twitter" className="text-base">ACCESS TOKEN</label>
                                            <input id="access_token_twitter" type="text" value={data.access_token_twitter} onChange={e => setData('access_token_twitter', e.target.value)} className="form-input " placeholder="ACCESS TOKEN" />
                                            {errors.access_token_twitter && <div className="text-danger">{errors.access_token_twitter}</div>}
                                        </div>
                                        <div className="my-2">
                                            <label htmlFor="access_token_secret_twitter" className="text-base">ACCESS SECRET TOKEN</label>
                                            <input id="access_token_secret_twitter" type="text" value={data.access_token_secret_twitter} onChange={e => setData('access_token_secret_twitter', e.target.value)} className="form-input " placeholder="ACCESS SECRET TOKEN" />
                                            {errors.access_token_secret_twitter && <div className="text-danger">{errors.access_token_secret_twitter}</div>}
                                        </div>
                                    </div>
                                    <div className="grid gap-3 pt-4 grid-cols-6">
                                        <button type="submit" className="btn bg-lime-500 text-white border-lime-500">
                                            <FiSave className="mr-4 rtl:order-2" />
                                            <span>Sauvegarder</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}
