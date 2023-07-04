import React from 'react'
import ReactApexChart from 'react-apexcharts';

 function Partner(props) {
    const {  propPartner, propContact ,propConventionF,propConventionP} = props;

    const pieChart = {
        series: [propPartner, propContact],
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
            labels: ["Partenaires qui ont un compte","Partenaire qui n'ont pas de compte"],
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
        series: [propConventionF, propConventionP],
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
            labels: ['Finalisées', 'En attente'],
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

   
  return (
    <div>
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 flex gap-3 datatables">
                <div className="my-2">
                        <div className="w-full lg:w-full my-6 pr-0 lg:pr-2 panel">
                            <div className="mb-5 flex items-center justify-between">
                                <h5 className="text-lg font-semibold dark:text-white">Statistique partenaire</h5>
                            </div>
                            <ReactApexChart series={pieChart.series} options={pieChart.options} className="rounded-lg bg-white dark:bg-black" type="pie" height={300} />
                        </div>
                </div>

                <div className="my-2">
                        <div className="w-full lg:w-full my-6 pr-0 lg:pr-2 panel">
                            <div className="mb-5 flex items-center justify-between">
                                <h5 className="text-lg font-semibold dark:text-white">Statistique convention</h5>
                            </div>
                            <ReactApexChart series={donutChart.series} options={donutChart.options} className="rounded-lg bg-white dark:bg-black" type="donut" height={300} />
                    </div>
                </div>
            </div>
            
    </div>
  )
}
export default Partner;
