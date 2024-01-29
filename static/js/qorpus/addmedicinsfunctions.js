
var baseurl = window.location.origin;

let percentage_activities_for_current_doctor=[]
let medsalaire=[]


let medtype_select = document.getElementById('type-select');
        
let medspec_select = document.getElementById('spec-select');

medtype_select.onchange = function () {
medtype = medtype_select.value;





fetch('/medicinspecs/' + encodeURI(medtype.trim()).toString().replaceAll('%','*')).then(function (response) {
response.json().then(function (data) {
    let optionHTML = '';

    optionHTML += "<option value='' selected disabled>---</option>";
    optionHTML += "<option value='addnew'>Ajouter nouveau ?</option>";
    for (let spec of data.specs) {
        optionHTML += '<option value="' + spec.spec + '">' + spec.spec + '</option>';
    }

    medspec_select.innerHTML = optionHTML;
});
});

}

$('#newspeclbl').hide()
$('#newspec').hide()

$('#spec-select').change(function(){
    
    if (this.value==='addnew')
    {
    //this.myform['other'].style.visibility='visible'
    //$('input[name=paiementsNomALT]').show()
    
    $('#newspec').show()
    $('#newspeclbl').show()
    }
    else {
        //$('input[name=paiementsNomALT]').hide()
        $('#newspeclbl').hide()
        $('#newspec').hide()
    
    };
    })

    $('#salaire').hide()
    $('#charges-sociales').hide()
    $('#charges-sociales-lbl').hide()
    $('#noavs').hide()
    $('#noavs-lbl').hide()
    $('#isemp-select').change(function(){
    
        if (this.value==='yes')
        {
        //this.myform['other'].style.visibility='visible'
        //$('input[name=paiementsNomALT]').show()
        
        $('#salaire').show()
        $('#charges-sociales').show()
        $('#charges-sociales-lbl').show()
        $('#noavs').show()
        $('#noavs-lbl').show()
        
        }
        else {
            //$('input[name=paiementsNomALT]').hide()
            $('#salaire').hide()
            $('#charges-sociales').hide()
            $('#charges-sociales-lbl').hide()
            $('#noavs').hide()
            $('#noavs-lbl').hide()
        
        };
        
        })


function bulk_delete_medicins_perc_TMP()
{
    var array = []
    var checkboxes = document.querySelectorAll('input[name=selectrowact]:checked')
    
    for (var i = 0; i < checkboxes.length; i++) {
        delete_medicins_perc_TMP(checkboxes[i].value)
    }
}


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
function delete_medicins_salaire_TMP(id)
{
    var row = $(`#${id}`).closest('tr');
    
    let table = $('#responsiveDataTable2').DataTable();

    for (var i=0;i<medsalaire.length;i++){
        if (medsalaire[i][3]==id){
            medsalaire.splice(i, 1);
        }
    }
    
    table.row(row).remove().draw(false);
    
}



function append_percentage_activity(){

}

function edit_item_to_percentage_table(rowUID){
    var row = $(`#${rowUID}`).closest('tr');
    
    let table = $('#responsiveDataTable').DataTable();
    //let updated_date = document.getElementById(`addDatePicker${id}`).value;
    let updated_de = document.getElementById(`edit-input-de${rowUID}`).value;
    let updated_a = document.getElementById(`edit-input-a${rowUID}`).value;
    let updated_perc = document.getElementById(`edit-input-perc${rowUID}`).value;
    for (var i=0;i<percentage_activities_for_current_doctor.length;i++){
        if (percentage_activities_for_current_doctor[i][3]==rowUID){
            percentage_activities_for_current_doctor[i][0]=updated_de;
            percentage_activities_for_current_doctor[i][1]=updated_a;
            percentage_activities_for_current_doctor[i][2]=updated_perc;
        }
    }
    table.cell( row ,3).data( updated_de ).draw( false );    
    table.cell( row ,4).data( updated_a ).draw( false );    
    table.cell( row ,5).data( updated_perc ).draw( false );    
    //alert(medsalaire)
}

function add_item_to_percentage_table(){
    pour_de=document.getElementById("input-de").value;
    pour_a = document.getElementById("input-a").value;
    pour_perc = document.getElementById("input-perc").value;
    let rowUID = new Date().valueOf()
    let table = $('#responsiveDataTable').DataTable();

    let row_checkbox=`<input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel${rowUID}" name="selectrowact" value="${rowUID}" aria-label="..." />`

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
    <a aria-label="anchor" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#editDoctorsPercentage${rowUID}" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
    <div class="modal fade effect-rotate-left" id="editDoctorsPercentage${rowUID}">
    <div class="modal-dialog modal-dialog-centered text-center" role="document">
        <div class="modal-content modal-content-demo">
            <div class="modal-header">
                <h6 class="modal-title">Ajouter Pourcentage</h6><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body text-start">
                <div class="row">
                    <div class="col-12">
                        <label for="input-de" class="form-label">De *</label> <input type="text" class="form-control" value=${pour_de} id="edit-input-de${rowUID}" />
                    </div>
                    <div class="col-12 mt-4">
                        <label for="input-a" class="form-label">A *</label> <input type="text" class="form-control" value=${pour_a} id="edit-input-a${rowUID}" />
                    </div>
                    <div class="col-12 mt-4">
                        <label for="input-perc" class="form-label">Pourcentage:</label> <input type="text" class="form-control" value=${pour_perc} id="edit-input-perc${rowUID}" />
                    </div>
                    <div class="col-12 mt-4">
                        <input type="button" class="form-control btn btn-primary" id="input-button" onclick="edit_item_to_percentage_table(${rowUID})" data-bs-dismiss="modal" value="Modifier">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

`
if($("#addpercdocform")[0].checkValidity()) {
    $('#addDoctorsPercentage').modal('hide');
    percentage_activities_for_current_doctor.push([pour_de,pour_a,pour_perc,rowUID])
    table.row.add([row_checkbox,row_functions,rowUID,pour_de,pour_a,pour_perc]).node().id = rowUID;
    table.draw(false);
}    else {
    $("#addpercdocform")[0].reportValidity();
}
}

function activate_deactivate_medsalaireTMP(id){
    var row = $(`#${id}`).closest('tr');
    
    let table = $('#responsiveDataTable2').DataTable();
    //let updated_date = document.getElementsByName(`addDatePicker${id}`)[0].value;
    let updated_date = $(`input[name="addDatePicker${id}"]`).data('daterangepicker').startDate.format('YYYY-MM-DD')
    for (var i=0;i<medsalaire.length;i++){
        if (medsalaire[i][4]==id){
            medsalaire[i][3]=updated_date
        }
    }
    table.cell( row ,4).data( updated_date ).draw( false );    
    //alert(medsalaire)

}

function add_item_to_salaire_table(){
    let salairee=document.getElementById("salairee").value;
    let  monthnumbers = document.getElementById("monthsnumbers").value;
    //alert()
    let fromdate = $("#addsalairedate").data('daterangepicker').startDate.format('YYYY-MM-DD');
    //let todate = document.getElementById("addDatePicker2").value;
    let todate = "";
    let rowUID = new Date().valueOf()
    let table = $('#responsiveDataTable2').DataTable();

    //let row_checkbox=`<input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel${rowUID}" name="selectrowact" value="${rowUID}" aria-label="..." />`
    
    let row_functions=`<div class="hstack gap-2 fs-15">
    <!-- duplicaterow2 and duplicaterow is important -->
    <!--<a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>-->
    <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#valideDoctors${rowUID}" class="btn btn-icon waves-effect waves-light btn-sm btn-warning-light"><i class="bi bi-power" data-bs-toggle="tooltip" data-bs-placement="top" title="activé/désactivé"></i></a>
    <div class="modal fade mt-4" id="valideDoctors${rowUID}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="modal-title" id="staticBackdropLabel">Désactivation</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <label for="product-name-add" class="form-label">Date de Désactivation:</label>
                <input type="text" id="deactivatesalairedate" name="addDatePicker${rowUID}" value="" class="form-control text-muted" />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="activate_deactivate_medsalaireTMP(${rowUID})">Confirmer</button>
            </div>
        </div>
    </div>
    </div>
    
    <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deletesalaire${rowUID}" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
    <div class="modal fade mt-4" id="deletesalaire${rowUID}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="delete_medicins_salaire_TMP(${rowUID})">Delete</button>
                </div>
            </div>
        </div>
    </div>

</div>`

if($("#addsalairedocform")[0].checkValidity()) {
    $('#addDoctorsSalary').modal('hide');
    medsalaire.push([salairee,monthnumbers,fromdate,todate,rowUID])
    table.row.add([row_functions,salairee,monthnumbers,fromdate,todate]).node().id = rowUID;
    table.draw(false);
    $(`input[name="addDatePicker${rowUID}"]`).daterangepicker({
        singleDatePicker: true, // Display a single date picker
        showDropdowns: true,    // Show year and month dropdowns
        locale: {
          format: 'DD.MM.YYYY'  // Define the date format
        }
        
      });}
    else {
        $("#addsalairedocform")[0].reportValidity();
    }
}

function add_new_doctor(){
    let doctor_name = document.getElementById("doctor-name").value;
    //let doctor_speciality = document.getElementById("doctor-speciality").value;
    let doctor_speciality = document.getElementById("spec-select").value;
    if (doctor_speciality=='addnew')
    {
        doctor_speciality=document.getElementById("newspec").value;
    }
    let doctor_type = document.getElementById("type-select").value;
    let doctor_percentage = document.getElementById("pourcentage-medicins").value;
    let doctor_address = document.getElementById("address").value;
    let doctor_charge_sociales = document.getElementById("charges-sociales").value;
    let doctor_surface_accordee = document.getElementById("surface-accordee").value;
    let doctor_telephone = document.getElementById("telephone").value;
    let doctor_coordbank=document.getElementById("coordbank").value;
    let doctor_noavs=document.getElementById("noavs").value;    
    let doctor_email=document.getElementById("email").value;
    let doctor_date_debut=document.getElementById("datedebut").value;
    let doctor_isemp = document.getElementById("isemp-select").value;
    //let doctor_salaire = document.getElementById("salaire").value;
    //let doctor_nombre_mois_salaire_an = document.getElementById("nombre-mois-salaire-an").value;
    //let doctor_secretaire =document.getElementById("secretaire").value;
    //let doctor_sec_percentage = document.getElementById("secretaire-pourcentage").value;
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
        "medsalaire":0,
        "mednombremoissalaireparan":0,
        "medsecretaire":"-",
        "medpourcentagesecretaire":0,
        "medlogiciels":logiciel_selected,
        "medtelephone":doctor_telephone,
        "medaddress":doctor_address,
        "medcoordonneebanc":doctor_coordbank,
        "mednoavs":doctor_noavs,
        "medemail":doctor_email,
        "medstartdate":doctor_date_debut,
        "medenddate":"",
        "isemployee":doctor_isemp,

        "percentage_activities_for_current_doctor":percentage_activities_for_current_doctor,
        "medsalaires":medsalaire

    
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