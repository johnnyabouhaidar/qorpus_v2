
var baseurl = window.location.origin;

let percentage_activities_for_current_doctor=[]


function delete_medicins_perc_TMP(id)
{
    var row = $(`#${id}`).closest('tr');
    
    let table = $('#responsiveDataTable').DataTable();

    for (var i=0;i<percentage_activities_for_current_doctor.length;i++){
        if (percentage_activities_for_current_doctor[i][3]==id){
            percentage_activities_for_current_doctor.splice(i, 1);
        }
    }
    
    table.row(row).remove().draw(false);
    
}



function append_percentage_activity(){

}

function add_item_to_percentage_table(){
    pour_de=document.getElementById("input-de").value;
    pour_a = document.getElementById("input-a").value;
    pour_perc = document.getElementById("input-perc").value;
    let rowUID = new Date().valueOf()
    let table = $('#responsiveDataTable').DataTable();

    let row_checkbox=`<input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel${rowUID}" value="" aria-label="..." />`

    let row_functions=`<div class="hstack gap-2 fs-15">
    <!-- duplicaterow2 and duplicaterow is important -->
    <!--<a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>-->
    <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deletepourcentageshare${rowUID}" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
    <div class="modal fade mt-4" id="deletepourcentageshare${rowUID}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="staticBackdropLabel">Delete</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure do you want to delete this row?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                    <!-- deleterow is important -->
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="delete_medicins_perc_TMP(${rowUID})">Delete</button>
                </div>
            </div>
        </div>
    </div>

</div>`
    percentage_activities_for_current_doctor.push([pour_de,pour_a,pour_perc,rowUID])
    table.row.add([row_checkbox,row_functions,rowUID,pour_de,pour_a,pour_perc]).node().id = rowUID;
    table.draw(false);
}


function add_new_doctor(){
    let doctor_name = document.getElementById("doctor-name").value;
    let doctor_speciality = document.getElementById("doctor-speciality").value;
    let doctor_type = document.getElementById("type-select").value;
    let doctor_percentage = document.getElementById("pourcentage-medicins").value;
    let doctor_charge_sociales = document.getElementById("charges-sociales").value;
    let doctor_surface_accordee = document.getElementById("surface-accordee").value;
    let doctor_salaire = document.getElementById("salaire").value;
    let doctor_nombre_mois_salaire_an = document.getElementById("nombre-mois-salaire-an").value;
    let doctor_secretaire =document.getElementById("secretaire").value;
    let doctor_sec_percentage = document.getElementById("secretaire-pourcentage").value;
    //let doctor_logiciel = document.getElementById("logiciel").options.Length;
    var logiciel_selected = [];
    for (var option of document.getElementById('logiciel').options)
    {
        if (option.selected) {
            logiciel_selected.push(option.value);
        }
    }
    //alert(percentage_activities_for_current_doctor)
    //newdoctorform  
    if($("#newdoctorform")[0].checkValidity()) {
        //alert('validated');
        const response = fetch(`${baseurl}/addmedicinsitems`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
        "mednom":doctor_name,
        "medspeciality":doctor_speciality,
        "medtype":doctor_type,
        "medpourcentage":doctor_percentage,
        "medchargesociales":doctor_charge_sociales,
        "medsurfaceaccordee":doctor_surface_accordee,
        "medsalaire":doctor_salaire,
        "mednombremoissalaireparan":doctor_nombre_mois_salaire_an,
        "medsecretaire":doctor_secretaire,
        "medpourcentagesecretaire":doctor_sec_percentage,
        "medlogiciels":logiciel_selected,
        "percentage_activities_for_current_doctor":percentage_activities_for_current_doctor

    
    })
          }).then((response) => {
            return response.json();
          }).then((json) => {
            //go back to main screen
            window.location.href = 'medicins';
        }) 
    }
    else {
        $("#newdoctorform")[0].reportValidity();
    }
}

//add_new_doctor()