import React from 'react'
import { useForm } from '@inertiajs/inertia-react'
import ReactApexChart from 'react-apexcharts';

 function Candidate(props) {
    const { prop1, prop2, prop3,prop4,prop5,prop6,prop7 } = props;
    const { data, post, setData, processing, errors } = useForm({
        provinceName: "",
    })
    
    const dataInscription = prop6.map((item) => {
        return JSON.parse(item.dataForm)
    }
    );
    const dataProvince = dataInscription.map((item) => {
        return item.provinceOfOrigin
    })
    const tabIdProvinceInscription = dataProvince.map((item) => {
        return item;
    })
    const tabIdProvinceInscriptionEntiers = tabIdProvinceInscription.map((element) => parseInt(element, 10));
    

    //const filteredItems = province.filter(item=> tabIdProvinceInscriptionEntiers.includes(item.id));
    //console.log('my :', tabIdProvinceInscriptionEntiers)

    const filteredArray = tabIdProvinceInscriptionEntiers.flatMap(searchItem => prop7.filter(item => item.id === searchItem));

        //console.log('mk :',filteredArray);


    const handleProvinceChange = (event) => {
        setData('provinceName', event.target.value)
        console.log("Choix : ", data.provinceName)
    };

    const val = filteredArray.map((item) => {
        return item;
    })
    

    const count = val.filter(item => item.name_province === data.provinceName).length;
   
    

    //console.log('Résultat des province candidature   :', filteredItems);
    //console.log('Les provinces qui sont dans la candidature :', tabIdProvinceInscription);
    //console.log('Liste de toutes les provinces :', province);

    //const isDark = useSelector((state= IRootState) => state.themeConfig.theme) === 'dark' ? true : false;
    //const isRtl = useSelector((state=IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(setPageTitle('Charts'));
    // });




    // const isDark = useSelector((state) => state.themeConfig.theme) === 'dark' ? true : false;
    // const isRtl = useSelector((state) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    // pieChartOptions
    const totalprovince=prop5-count;
    const pieChart = {
        series: [totalprovince, count],
        options: {
            chart: {
                height: 300,
                type: 'pie',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            labels: ["Effectif", data.provinceName],
            colors: ['#4361ee', '#e2a03f'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                    },
                },
            ],
            stroke: {
                show: false,
            },
            legend: {
                position: 'bottom',
            },
        },
    };




    // donutChartOptions
    const donutChart = {
        series: [prop1, prop2],
        options: {
            chart: {
                height: 300,
                type: 'donut',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            stroke: {
                show: false,
            },
            labels: ['Validés', 'Non validés'],
            colors: ['#805dca', '#e2a03f'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                    },
                },
            ],
            legend: {
                position: 'bottom',
            },
        },
    };

    const donutChartI2 = {
        series: [prop3 ,prop4],
        options: {
            chart: {
                height: 300,
                type: 'donut',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            stroke: {
                show: false,
            },
            labels: ['Candidatures finalisées', 'Candidatures en attente'],
            colors: ['#805dca', '#e2a03f'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                    },
                },
            ],
            legend: {
                position: 'bottom',
            },
        },
    };

    // radialBarChartOptions
    const radialBarChart = {
        series: [prop3, prop4],
        options: {
            chart: {
                height: 300,
                type: 'radialBar',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ['#805dca', '#e2a03f'],

            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: '22px',
                        },
                        value: {
                            fontSize: '16px',
                        },
                        total: {
                            show: true,
                            label: 'Total inscriptions',
                            formatter: function (w) {
                                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                                return prop3 + prop4;
                            },
                        },
                    },
                },
            },
            labels: ['Inscriptions finalisées', 'Inscriptions en attente'],
            fill: {
                opacity: 0.85,
            },
        },
    };
  return (
    <div>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 flex gap-3 datatables ">
                <div className="my-2">
                        <div className="w-full lg:w-full sm:w-full lg:my-6 sm:my-6 pr-2 lg:pr-2 sm:pr-0 panel ">
                            <div className="flex">
                                <h5 className="text-lg font-semibold dark:text-white">Répartition par compte</h5>
                            </div>
                            <ReactApexChart series={donutChart.series} options={donutChart.options} className="rounded-lg bg-white dark:bg-black" type="donut" height={300} />
                        </div>
                </div>

                <div className="my-2">
                        <div className="w-full lg:w-full sm:w-full my-6 sm:my-6 pr-2 sm:pr-0 panel">
                            <div className="flex">
                                <h5 className="text-lg font-semibold dark:text-white">Répartition par Candidature</h5>
                            </div>
                            <ReactApexChart series={donutChartI2.series} options={donutChartI2.options} className="rounded-lg bg-white dark:bg-black" type="donut" height={300} />
                        </div>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 sm:grid-cols-1 flex gap-3 datatables mb-4">
                <div className="my-2">
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-full sm:w-full my-6 pr-0 lg:pr-2 panel">
                            <div className="mb-5 flex items-center justify-between">
                                <h5 className="text-lg font-semibold dark:text-white">Statistique inscription par province</h5>
                            </div>
                            <form>
                                <div className="my-2 mb-2">
                                    <select type="text" value={data.provinceName} onChange={handleProvinceChange} className="form-select mb-3"  >
                                        <option defaultValue={'selected'}>Sélectionner une province...</option>
                                        {
                                            prop7.map((item) => (
                                                <option key={item.id} value={item.name_province}>{item.name_province}</option>
                                            ))
                                        }
                                    </select>
                                    {errors.provinceName && <div className="text-danger">{errors.provinceName}</div>}
                             
                               {
                                count!==0?
                                <ReactApexChart series={pieChart.series} options={pieChart.options} className="rounded-lg bg-white dark:bg-black" type="pie" height={300} />
                                :
                                <ReactApexChart series={pieChart.series} options={pieChart.options} className="rounded-lg bg-white dark:bg-black" type="pie" height={300} />
                            }
                                </div>
                            
                                
                                  
                            </form>
                           
                        </div>
                    </div>
                </div>
   


            </div>
    </div>
  )
}
export default Candidate;
