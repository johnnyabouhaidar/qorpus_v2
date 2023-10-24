var baseurl = window.location.origin;

let percentage_activities_for_current_employee=[]
let empsalaire=[]


function add_new_employee(){
    let empnom = document.getElementById("empnom").value;
    let empaddress = document.getElementById("empaddress").value;
    let emptel = document.getElementById("emptel").value;
    let empemail = document.getElementById("empemail").value;
    let empcoordbanc = document.getElementById("empcoordbanc").value;
    let empnoavs = document.getElementById("empnoavs").value;
    let emppole = document.getElementById("emppole").value;
    let empposte = document.getElementById("empposte").value;
    let empdatedebut = document.getElementById("addDatePicker1").value;
    

    if($("#newemployeeform")[0].checkValidity()) {
        //alert('validated');
        const response = fetch(`${baseurl}/addemployeeitems`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
        "empnom":empnom,
        "empaddress":empaddress,
        "emptel":emptel,
        "empemail":empemail,
        "empcoordbanc":empcoordbanc,
        "empnoavs":empnoavs,
        "emppole":emppole,
        "empposte":empposte,
        "empdatedebut":empdatedebut,


        //"percentage_activities_for_current_doctor":percentage_activities_for_current_doctor,
        //"medsalaires":medsalaire

    
    })
          }).then((response) => {
            return response.json();
          }).then((json) => {
            //go back to main screen
            window.location.href = 'employees';
        }) 
    }
    else {
        $("#newemployeeform")[0].reportValidity();
    }
}