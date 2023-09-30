
var baseurl = window.location.origin;

let percentage_activities_for_current_doctor=[]


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
    <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deletepourcentageshare" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
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
                    <button type="button" class="btn btn-danger deleterow" data-bs-dismiss="modal">Delete</button>
                </div>
            </div>
        </div>
    </div>

</div>`
    percentage_activities_for_current_doctor.push([pour_de,pour_a,pour_perc])
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
    let doctor_salaire_percentage = document.getElementById("secretaire-pourcentage");
    //let doctor_logiciel = document.getElementById("logiciel").options.Length;
    var logiciel_selected = [];
    for (var option of document.getElementById('logiciel').options)
    {
        if (option.selected) {
            logiciel_selected.push(option.value);
        }
    }
    alert(percentage_activities_for_current_doctor)
    //newdoctorform  
    if($("#newdoctorform")[0].checkValidity()) {
        alert('validated');
    }
    else {
        $("#newdoctorform")[0].reportValidity();
    }
}

//add_new_doctor()