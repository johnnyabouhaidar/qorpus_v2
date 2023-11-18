
var baseurl = window.location.origin;
var widget_api_response="oldval"

function getChartByDivId(divname) {
    var charts = Apex.charts; // ApexCharts stores all instances in Apex.charts object
  
    for (var chartId in charts) {
      var chartInstance = charts[chartId];
      alert(chartInstance.container.name)
      if (chartInstance && chartInstance.container.name === divname) {
        return chartInstance;
      }
    }
  
    return null; // Chart not found
  }

function link_drag_cards(){
    dragula([
        document.querySelector('#kpi-1'), 
        document.querySelector('#kpi-2'),
         document.querySelector('#kpi-3'), 
         document.querySelector('#kpi-4'), 
         document.querySelector('#kpi-5'), 
         document.querySelector('#kpi-6'), 
         document.querySelector('#kpi-7'), 
         document.querySelector('#kpi-8'), 
         document.querySelector('#chart-1'), 
         document.querySelector('#chart-2'), 
         document.querySelector('#chart-3'), 
         document.querySelector('#chart-4'), 
         document.querySelector('#table-1'), 
         document.querySelector('#table-2'), 
         document.querySelector('#table-3'),
          document.querySelector('#table-4'), 
          document.querySelector('#table-5'),
           document.querySelector('#table-6')],
           {


            moves: function (el, container, handle) {
                return handle.classList.contains('handle');
            }
        });
        $('#mainCalendar').daterangepicker({
            locale: {
              format: 'MMM D, YYYY', // Updated date format
              separator: ' - ',
              applyLabel: 'Appliquer', // Custom "Apply" button label in French
              cancelLabel: 'Annuler', // Custom "Cancel" button label in French
              customRangeLabel: 'Choisir', // Custom label for the custom range option in French
              daysOfWeek: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'], // Custom day labels in French
              monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'], // Custom month labels in French
            },
            ranges: {
              'Aujourd\'hui': [moment(), moment()],
              'Hier': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
              'Les 7 Derniers Jours': [moment().subtract(6, 'days'), moment()],
              'Les 30 Derniers Jours': [moment().subtract(29, 'days'), moment()],
              'Ce Mois': [moment().startOf('month'), moment().endOf('month')],
              'Le Mois Dernier': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            },
            startDate: moment().startOf('year'), // for example, 7 days ago
            endDate: moment().endOf('year'),
            showRanges: true, // Show the ranges by default
            showDropdowns: true, // Show year and month dropdowns
            showCustomRangeLabel: true, // Show custom range label
            showCalendars: true // Show the calendars by default
          });
        $('#mainCalendar').on('apply.daterangepicker', function (ev, picker) {
            console.log('Date de Début : ' + picker.startDate.format('YYYY-MM-DD'));
            console.log('Date de Fin : ' + picker.endDate.format('YYYY-MM-DD'));
            console.log('!!!!')
            
            reload_kpi_views(picker.startDate.format('YYYY-MM-DD'),picker.endDate.format('YYYY-MM-DD'))
          });
    
}


function build_table_bar(module){
    var inner_text2=`<div class="col-xl-12 resizable widget" id="table-1" data-type="table" data-title="Centre">
<div class="card custom-card overflow-hidden specific-height">
    <div class="handle">...</div>
    <div class="card-header justify-content-between">
        <div class="card-title">${module} du Centre</div>
        <div class="d-flex align-items-center gap-3">
            <div class="dropdown">
                <a href="javascript:void(0);" class="p-2 fs-12 text-muted" data-bs-toggle="dropdown" aria-expanded="false">Date<i class="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i> </a>
                <ul class="dropdown-menu" role="menu" id="chartyearselect${module}">
                    <!--<li><a class="dropdown-item" href="javascript:void(0);">last 12 months</a></li>
                    <li><a class="dropdown-item" href="javascript:void(0);">year to date</a></li>
                    <li><a class="dropdown-item" href="javascript:void(0);">2023</a></li>
                    <li><a class="dropdown-item" href="javascript:void(0);">2022</a></li>
                    <li><a class="dropdown-item" href="javascript:void(0);">2021</a></li>-->
                </ul>
            </div>
        </div>
    </div>
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table text-nowrap" id="${module}_tbl">
                <thead>
                    <tr>
                        <th scope="col">${module}</th>
                        <th scope="col">Janvier</th>
                        <th scope="col">Février</th>
                        <th scope="col">Mars</th>
                        <th scope="col">Avril</th>
                        <th scope="col">Mai</th>
                        <th scope="col">Juin</th>
                        <th scope="col">Juillet</th>
                        <th scope="col">Août</th>
                        <th scope="col">Septembre</th>
                        <th scope="col">Octobre</th>
                        <th scope="col">Novembre</th>
                        <th scope="col">Decembre</th>
                    </tr>
                </thead>
                <tbody id="${module}_table_id">
                    
                    
                </tbody>
            </table>
        </div>
           <!-- column-basic & column-basic2 in apexchart-column -->
        <div id="column-basic" name="${module}_bar_graph" class="px-3 mt-5"></div>
    </div>
</div>
</div>`

    return inner_text2;
}


function build_pnl_chart_widget()
{

    var inner_text = `<div class="col-xl-12 " id="chart-1">
    <div class="card custom-card">  <div class="handle">...</div>
        <div class="card custom-card overflow-hidden">
            <div class="card-header justify-content-between">
                <div class="card-title">Compte de pertes et profits</div>
                <div class="d-flex align-items-center gap-3">
                    <div class="dropdown">
                    <a href="javascript:void(0);" class="p-2 fs-12 text-muted" data-bs-toggle="dropdown" aria-expanded="false">Date<i class="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i> </a>
                        <ul class="dropdown-menu" role="menu" id="pnlyearselect">  
                        <!--                                   
                            <li><a class="dropdown-item" href="javascript:void(0);">2023</a></li>
                            <li><a class="dropdown-item" href="javascript:void(0);">2022</a></li>
                            <li><a class="dropdown-item" href="javascript:void(0);">2021</a></li>
                            -->
                        </ul>
                    </div>
                </div>
            </div>
            <div class="card-body p-0">
                <div id="subscriptionOverview" class="px-3 mt-sm-0 mt-3"></div>
            </div>
        </div>
    </div>
</div>



`

return inner_text;
}

function build_kpi_card(titleid,title,total,percentagechange,oldfromdate,newtodate,cardindex)
{

    //var formattedtotal = total.toLocaleString("en-US");
    var formattedtotal = Intl.NumberFormat('fr-FR').format(total)
    var percentagechangerouded = Math.round(percentagechange);
    var divcolor="success"
    if (percentagechangerouded<0){
        divcolor = "danger"
    }
    var inner_text=`<div class="col-lg-6 col-sm-12 col-md-6 col-xl-4 col-xxl-3 resizable widget" id="kpi-${cardindex}" data-type="kpi" data-title="${titleid}">    
    <div class="card custom-card specific-height"> <div class="handle">...</div>
        <div class="card-body">
     
            <div class="row">
                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 d-flex align-items-center justify-content-center ecommerce-icon px-0">
                    <span class="rounded p-3 bg-primary-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" class="svg-white primary" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                            <g>
                                <rect fill="none" height="24" width="24" />
                                <path
                                    d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"
                                />
                            </g>
                        </svg>
                    </span>
                </div>
                <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 ps-0">
                    <div class="mb-2">${title}</div>
                    <div class="text-muted mb-1 fs-12"><span class="text-dark fw-semibold fs-19 lh-1 vertical-bottom"> CHF ${formattedtotal} </span></div>
                    <div>
                        <span
                            class="badge bg-${divcolor}-transparent text-${divcolor} mx-1"
                            tabindex="0"
                            data-bs-toggle="popover"
                            data-bs-trigger="hover focus"
                            data-bs-content="Par rapport à la période équivalente: ${oldfromdate} - ${newtodate}"
                        >
                            ${percentagechangerouded}%
                        </span>
                    </div>
                </div>
           
            </div>
        </div>
    </div>
</div>`

return inner_text;
}

function filltable_plus_chart_data(module,year)
{
    //year_select=document.getElementById(`chartyearselect${module}`)
    var tablechartrows = document.getElementById(`${module}tablebarchart-rows`)
        
    tablechartrows.innerHTML="";
    tablebarchart = document.createElement("div");
    tablebarchart.innerHTML = build_table_bar(module);
    tablechartrows.appendChild(tablebarchart.firstChild);
    $(`#${module}_table_id tr`).remove();
    
  
    
    
    
    $(`#chartyearselect${module}`).empty()


    fetch('/get_last_x_years?x=7').then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '';
        
        
            
            for (let year of data) {
                
                
                $(`#chartyearselect${module}`).append(`<li><a class="dropdown-item" onclick="filltable_plus_chart_data('${module}',${year})" href="javascript:void(0);">${year}</a></li>`)
            }
            
            
        });
        });
    
    const response = fetch(`${baseurl}/get_dashboard_table`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
    "module":module,
    "year":year

})
      }).then((response) => {
        return response.json();
      }).then((json) => {
        rows=json;
        
        var table_body=document.getElementById(`${module}_table_id`)
        data_for_chart=[];
        titles_for_chart=[];
        for (var i=0;i<rows.length;i++)
        {
            var tbl_row=document.createElement('tr')
            var row_content=`<th scope="row">
            <div class="d-flex align-items-center">
                <div><span class="fw-semibold">${rows[i][0]}</span></div>
            </div>
        </th>
        <td>${Intl.NumberFormat('fr-FR').format(rows[i][1])}</td>
        <td>${Intl.NumberFormat('fr-FR').format(rows[i][2])}</td>
        <td>${Intl.NumberFormat('fr-FR').format(rows[i][3])}</td>
        <td>${Intl.NumberFormat('fr-FR').format(rows[i][4])}</td>
        <td>${Intl.NumberFormat('fr-FR').format(rows[i][5])}</td>
        <td>${Intl.NumberFormat('fr-FR').format(rows[i][6])}</td>
        <td>${Intl.NumberFormat('fr-FR').format(rows[i][7])}</td>
        <td>${Intl.NumberFormat('fr-FR').format(rows[i][8])}</td>
        <td>${Intl.NumberFormat('fr-FR').format(rows[i][9])}</td>
        <td>${Intl.NumberFormat('fr-FR').format(rows[i][10])}</td>
        <td>${Intl.NumberFormat('fr-FR').format(rows[i][11])}</td>
        <td>${Intl.NumberFormat('fr-FR').format(rows[i][12])}</td>`
        //alert(Intl.NumberFormat('fr-FR').format(Math.round(rows[i][13])))
        data_for_chart.push(Math.round(rows[i][13]))
        titles_for_chart.push(rows[i][0])
        tbl_row.innerHTML= row_content
        table_body.append(tbl_row)
        //alert(table_body.innerHTML)
        }
        var options = {
            series: [{
                name: 'Net Profit',
                data: []
            }],
            chart: {
                toolbar:{
                    show:true,
                },
                type: 'bar',
                height: 320
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '35%',
                    endingShape: 'rounded'
                },
            },
            grid: {
                borderColor: '#f2f5f7',
            },
            dataLabels: {
                enabled: false
            },
            colors: ["#23b7e5"],
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: titles_for_chart,
                labels: {
                    show: true,
                    style: {
                        colors: "#8c9097",
                        fontSize: '11px',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                }
            },
            yaxis: {    
                labels: {
                    formatter: function (val) {
                        //return val.toFixed(2)
                        return Intl.NumberFormat('fr-FR').format(val)
                    },
                    show: true,
                    style: {
                        colors: "#8c9097",
                        fontSize: '11px',
                        fontWeight: 600,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                }
            },
            fill: {
                opacity: 1
            },
          
        };
        const chart = new ApexCharts(document.querySelector(`div[name="${module}_bar_graph"]`), options);
        chart.render();  
        var options = [{
            
                name: 'Net Profit',
                data: data_for_chart,
                categories:titles_for_chart
                
            }
        ];
        
        //var chart = new ApexCharts(document.querySelector(`div[name="${module}_bar_graph"]`), options);
        chart.updateSeries(options);
        
        

    }) 
    /*
 */
}



function reload_kpi_views(fromdate,todate){
    
    const response =  fetch(`${baseurl}/get_kpi_cards?fromdate=${fromdate}&todate=${todate}`,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        
      }).then((response) => {
        return response.json();
      }).then((json) => {
        kpis=json;
        
        //alert(kpis["payment"]["newtotal"])
        var kpirows= document.getElementById("kpis-rows")
        
        /*var tablechartrows = document.getElementById("facturationtablebarchart-rows")
        
        tablechartrows.innerHTML="";*/
              
        kpirows.innerHTML="";
        paymentkpi = document.createElement("div");
        paymentkpi.innerHTML=build_kpi_card("paymentkpi","Paiement Total",kpis["payment"]["newtotal"],kpis["payment"]["percentagechange"],kpis["payment"]["oldfrom"],kpis["payment"]["oldto"],1)
        kpirows.appendChild(paymentkpi.firstChild)
        
        

        facturationkpi = document.createElement("div");
        facturationkpi.innerHTML=build_kpi_card("facturationkpi","Facturation Total",kpis["facturation"]["newtotal"],kpis["facturation"]["percentagechange"],kpis["facturation"]["oldfrom"],kpis["facturation"]["oldto"],2)
        kpirows.appendChild(facturationkpi.firstChild)

        retrocessionkpi = document.createElement("div");
        retrocessionkpi.innerHTML=build_kpi_card("retrocessionkpi","Retrocession Total",kpis["retrocession"]["newtotal"],kpis["retrocession"]["percentagechange"],kpis["retrocession"]["oldfrom"],kpis["retrocession"]["oldto"],3)
        kpirows.appendChild(retrocessionkpi.firstChild)

        encaissementkpi = document.createElement("div");
        encaissementkpi.innerHTML=build_kpi_card("encaissementkpi","Encaissement Total",kpis["encaissement"]["newtotal"],kpis["encaissement"]["percentagechange"],kpis["encaissement"]["oldfrom"],kpis["encaissement"]["oldto"],4)
        kpirows.appendChild(encaissementkpi.firstChild)

        pnlkpi = document.createElement("div");
        pnlkpi.innerHTML=build_kpi_card("pnlkpi","PNL Total",kpis["pnl"]["newtotal"],kpis["pnl"]["percentagechange"],kpis["pnl"]["oldfrom"],kpis["pnl"]["oldto"],5)
        kpirows.appendChild(pnlkpi.firstChild)
        


/*
        tablebarchart = document.createElement("div");
        tablebarchart.innerHTML = build_table_bar("facturation");
        tablechartrows.appendChild(tablebarchart.firstChild);
        
        //$("#facturation_table_id tr").remove(); 
        filltable_plus_chart_data("facturation",new Date().getFullYear())

        tablebarchart = document.createElement("div");
        tablebarchart.innerHTML = build_table_bar("paiement");
        tablechartrows.appendChild(tablebarchart.firstChild);
        
        //$("#paiement_table_id tr").remove(); 
        filltable_plus_chart_data("paiement",new Date().getFullYear())        */






        

        link_drag_cards()

        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

        


      })
}

function generate_pnl_chart(year){
    var chartrows=document.getElementById("pnlchart-rows")
    chartrows.innerHTML="";  

    pnlchart = document.createElement("div");
    pnlchart.innerHTML = build_pnl_chart_widget();
    chartrows.appendChild(pnlchart.firstChild);
    $(`#pnlyearselect`).empty()


    fetch('/get_last_x_years?x=7').then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '';
        
        
            
            for (let year of data) {
                
                
                $(`#pnlyearselect`).append(`<li><a class="dropdown-item" onclick="generate_pnl_chart(${year})" href="javascript:void(0);">${year}</a></li>`)
            }
            
            
        });
        });

    fetch(`${baseurl}/getpnlhistory?year=${year}`).then(function (response) {
        response.json().then(function (yearpnl) {
            
       
    var options = {
        series: [{
            name: "PNL",
            data: yearpnl["1"]
        },{
            name: "PNL Précédente",
            data: yearpnl["2"]
        }
        
        ],
        chart: {
            toolbar: {
                show: true
            },
            height: 285,
            type: 'line',
            zoom: {
                enabled: false
            },
            dropShadow: {
                enabled: true,
                enabledOnSeries: undefined,
                top: 5,
                left: 0,
                blur: 3,
                color: '#000',
                opacity: 0.15
            },
        },
        grid: {
            borderColor: '#f1f1f1',
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [2, 2],
            curve: ['smooth', 'smooth'],
            lineCap: 'butt',
            dashArray: [0, 0]
        },
        title: {
            text: undefined,
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'center',
            fontWeight: 600,
            fontSize: '11px',
            tooltipHoverFormatter: function (val, opts) {
                return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
            },
            labels: {
                colors: '#74767c',
            },
            markers: {
                width: 7,
                height: 7,
                strokeWidth: 0,
                radius: 12,
                offsetX: 0,
                offsetY: 0
            },
        },
        markers: {
            discrete: [{
                seriesIndex: 0,
                dataPointIndex: 5,
                fillColor: '#305cfc',
                strokeColor: '#fff',
                size: 4,
                shape: "circle"
            },
            {
                seriesIndex: 0,
                dataPointIndex: 11,
                fillColor: '#305cfc',
                strokeColor: '#fff',
                size: 4,
                shape: "circle"
            },
            {
                seriesIndex: 1,
                dataPointIndex: 10,
                fillColor: '#23b7e5',
                strokeColor: '#fff',
                size: 4,
                shape: "circle"
            }, {
                seriesIndex: 1,
                dataPointIndex: 4,
                fillColor: '#23b7e5',
                strokeColor: '#fff',
                size: 4,
                shape: "circle"
            }],
            hover: {
                sizeOffset: 6
            }
        },
        yaxis: {
            title: {
                style: {
                    color: '#adb5be',
                    fontSize: '14px',
                    fontFamily: 'poppins, sans-serif',
                    fontWeight: 600,
                    cssClass: 'apexcharts-yaxis-label',
                },
            },
            labels: {
                formatter: function (val) {
                    //return val.toFixed(2)
                    return Intl.NumberFormat('fr-FR').format(val)
                },
                
                show: true,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        xaxis: {
            type: 'day',
            categories: ['Jan','Fev','Mar','Avr','Mai','Jun','July','Aug','Sep','Oct','Nov','Dec'
            ],
            axisBorder: {
                show: true,
                color: 'rgba(119, 119, 142, 0.05)',
                offsetX: 0,
                offsetY: 0,
            },
            axisTicks: {
                show: true,
                borderType: 'solid',
                color: 'rgba(119, 119, 142, 0.05)',
                width: 6,
                offsetX: 0,
                offsetY: 0
            },
            labels: {
                rotate: -90,
                style: {
                    colors: "#8c9097",
                    fontSize: '11px',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-label',
                },
            }
        },
        tooltip: {
            shared:true,
            y: [
                {
                    title: {
                        formatter: function (val) {
                            return val
                        }
                    }
                },
                {
                    title: {
                        formatter: function (val) {
                            return val
                        }
                    }
                },
                {
                    title: {
                        formatter: function (val) {
                            return val;
                        }
                    }
                }
            ]
            
        },
        colors: ["rgb(132, 90, 223)", "#23b7e5"],
    };
    var chart = new ApexCharts(document.querySelector("#subscriptionOverview"), options);
  chart.render();
});
});
}





