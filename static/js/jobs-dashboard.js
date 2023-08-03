

/* Candidates Chart */
var options = {
    series: [1754, 1234],
    labels: ["Female", "Male"],
    chart: {
        height: 250,
        type: 'donut'
    },
    dataLabels: {
        enabled: false,
    },

    legend: {
        show: false,
    },
    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'round',
        colors: "#fff",
        width: 0,
        dashArray: 0,
    },
    plotOptions: {

        pie: {
            expandOnClick: false,
            donut: {
                size: '80%',
                background: 'transparent',
                labels: {
                    show: true,
                    name: {
                        show: true,
                        fontSize: '20px',
                        color: '#495057',
                        offsetY: -4
                    },
                    value: {
                        show: true,
                        fontSize: '18px',
                        color: undefined,
                        offsetY: 8,
                        formatter: function (val) {
                            return val + "%"
                        }
                    },
                    total: {
                        show: true,
                        showAlways: true,
                        label: 'Total',
                        fontSize: '22px',
                        fontWeight: 600,
                        color: '#495057',
                    }

                }
            }
        }
    },
    colors: ["rgb(132, 90, 223)", "#23b7e5"],

};
document.querySelector("#candidates-chart").innerHTML = " ";
var chart = new ApexCharts(document.querySelector("#candidates-chart"), options);
chart.render();
function Candidates() {
    chart.updateOptions({
        colors: ["rgb(" + myVarVal + ")", "#23b7e5"],
    })
};
/* Candidates Chart */