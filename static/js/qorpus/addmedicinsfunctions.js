
var baseurl = window.location.origin;

let percentage_activities_for_current_doctor=[]


let medtype_select = document.getElementById('type-select');
        
let medspec_select = document.getElementById('spec-select');

medtype_select.onchange = function () {
medtype = medtype_select.value;



fetch('/medicinspecs/' + encodeURI(medtype.trim()).toString().replaceAll('%','*')).then(function (response) {
response.json().then(function (data) {
    let optionHTML = '';

    optionHTML += "<option value='addnew'>Ajouter nouveau ?</option>";
    for (let spec of data.specs) {
        optionHTML += '<option value="' + spec.spec + '">' + spec.spec + '</option>';
    }

    medspec_select.innerHTML = optionHTML;
});
});

}


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
    $('#isemp-select').change(function(){
    
        if (this.value==='yes')
        {
        //this.myform['other'].style.visibility='visible'
        //$('input[name=paiementsNomALT]').show()
        
        $('#salaire').show()
        
        }
        else {
            //$('input[name=paiementsNomALT]').hide()
            $('#salaire').hide()
        
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



function append_percentage_activity(){

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

</div>`
    percentage_activities_for_current_doctor.push([pour_de,pour_a,pour_perc,rowUID])
    table.row.add([row_checkbox,row_functions,rowUID,pour_de,pour_a,pour_perc]).node().id = rowUID;
    table.draw(false);
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