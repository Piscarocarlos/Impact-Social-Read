import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import { Link, useForm } from '@inertiajs/inertia-react';
import { FiEdit, FiEye, FiTrash } from 'react-icons/fi';
import Select from 'react-select';
import { encodeID } from '../../keys/Index';
const Index=({beneficiaries,regions,provinces,cities,ecoles})=>{
    console.log(beneficiaries)
    const beneficiaryObj=JSON.parse(beneficiaries[0].dataBeneficiary)
    console.log('re',beneficiaryObj)
    const beneficiary = beneficiaryObj.dataBenificiary;
    console.log('re',beneficiary)
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    //Skin: Striped

    const [page, setPage] = useState(1);
    const [regionSearch, setRegionSearch] = useState('');
    const [provinceSearch, setProvinceSearch] = useState('');
    const [citySearch, setCitySearch] = useState('');
    const [schoolSearch, setSchoolSearch] = useState('');
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(beneficiary);
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [lengthTab,setLengthTab]=useState()
    const { data, setData, processing, errors, reset, put, post } = useForm(
       
    );
    const [search, setSearch] = useState('');

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords?.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return beneficiary.filter((item, index) => {

                return (
                    item.keys.toString().includes(search.toLowerCase()) ||

                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.totalPoints.includes(search.toLowerCase()) ||
                    item.region.toLowerCase().includes(search.toLowerCase()) ||
                    item.city.toLowerCase().includes(search.toLowerCase()) ||
                    item.province.toLowerCase().includes(search.toLowerCase()) ||
                    item.school.toLowerCase().includes(search.toLowerCase()) ||
                    item.id.toString().includes(search.toLowerCase())


                );
            });
        });
    }, [search]);
    useEffect(() => {
        setInitialRecords(() => {
            return beneficiary.filter((item, index) => item.region.toLowerCase().includes(regionSearch.toLowerCase()));
        });
    }, [regionSearch]);
    useEffect(() => {
        setInitialRecords(() => {
            return beneficiary.filter((item, index) => item.city.toLowerCase().includes(citySearch.toLowerCase()));
        });
    }, [citySearch]);
    useEffect(() => {
        console.log('province');
        setInitialRecords(() => {
            return beneficiary.filter((item, index) => item.province.toLowerCase().includes(provinceSearch.toLowerCase()));
        });
    }, [provinceSearch]);
    useEffect(() => {
        setInitialRecords(() => {
            return beneficiary.filter((item, index) => item.school.toLowerCase().includes(schoolSearch.toLowerCase()));
        });
    }, [schoolSearch]);
return(
    <DefaultLayout>



    <div className="space-y-6">
     
        <div className="panel">

            <div className="flex items-center justify-between mb-5">

                <h5 className="font-semibold text-lg dark:text-white-light">Les bénéficiaire Selectionner</h5>
                <input type="text" className="form-input w-auto" placeholder="Recherche rapide..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex items-center justify-between mb-5">
                <select className='form-select w-auto mx-1 ' name="region" id="" onChange={e => setRegionSearch(e.target.value)}><option value="">Selectionner  une region...</option >{regions.map((item, keys) => (<option value={item.name_region}>{item.name_region} </option>))} </select>
                <select className='form-select w-auto mx-1' name="province" id="" onChange={e => setProvinceSearch(e.target.value)}><option value="">Selectionner  une province...</option>{provinces.map((item, keys) => (<option value={item.name_province} >{item.name_province} </option>))} </select>
                <select className='form-select w-auto mx-1' name="city" id="" onChange={e => setCitySearch(e.target.value)}><option value="">Selectionner  une ville...</option>{cities.map((item, keys) => (<option value={item.name_city}>{item.name_city} </option>))} </select>
                <select className='form-select w-auto mx-1' name="school" id="" onChange={e => setSchoolSearch(e.target.value)}><option value="">Selectionner  une école...</option>{ecoles.map((item, keys) => (<option value={item.nom_fr} >{item.nom_fr} </option>))} </select>

            </div>
            <div className="datatables">
                <DataTable
                    striped
                    className="whitespace-nowrap table-striped"
                    records={recordsData}
                    columns={[
                        { accessor: 'keys', title: 'Rang' },
                        { accessor: 'name', title: 'Nom' },

                        { accessor: 'region', title: 'Region' },
                        { accessor: 'province', title: 'Province' },
                        { accessor: 'city', title: 'Ville' },
                        { accessor: 'school', title: "Lycée" },
                        {
                            accessor: 'totalPoints',
                            title: 'Point',
                            render: ({ totalPoints }) => <span className='text-white inline-block p-2 rounded hover:text-gray-100 mr-2 bg-danger '>{totalPoints} </span>,

                        },
                        {
                            accessor: 'id',
                            title: 'Action',
                            render: ({ id }) => <Link href={route('dashboard.detail.scoring.candidate', encodeID(id))} className='text-white inline-block p-2 rounded hover:text-gray-100 mr-2 bg-blue-600 '><FiEye /></Link>,
                        },
                    ]}
                    totalRecords={initialRecords?.length}
                    recordsPerPage={pageSize}
                    page={page}
                    onPageChange={(p) => setPage(p)}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={setPageSize}
                    minHeight={200}
                    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                />
            </div>
        </div>

    </div>
</DefaultLayout>
)
}
export default Index;