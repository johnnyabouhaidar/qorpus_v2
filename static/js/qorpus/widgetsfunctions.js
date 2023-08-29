
var baseurl = window.location.origin;
var widget_api_response="oldval"

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
}
function build_kpi_card(titleid,title,total,percentagechange,oldfromdate,newtodate,cardindex)
{
    var formattedtotal = total.toLocaleString("en-US");
    var percentagechangerouded = Math.round(percentagechange);
    var divcolor="success"
    if (percentagechangerouded<0){
        divcolor = "danger"
    }
    var inner_text=`<div class="col-lg-6 col-sm-12 col-md-6 col-xl-4 col-xxl-3 widget" id="kpi-${cardindex}" data-type="kpi" data-title="${titleid}">    
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
</div>
`
return inner_text;
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
        
        link_drag_cards()



      })
}

$('#mainCalendar').on('apply.daterangepicker', function (ev, picker) {
    console.log('Date de Début : ' + picker.startDate.format('YYYY-MM-DD'));
    console.log('Date de Fin : ' + picker.endDate.format('YYYY-MM-DD'));
    //alert(picker.endDate.format('YYYY-MM-DD'))
    reload_kpi_views(picker.startDate.format('YYYY-MM-DD'),picker.endDate.format('YYYY-MM-DD'))
  });



