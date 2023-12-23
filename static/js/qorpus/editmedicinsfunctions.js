var baseurl = window.location.origin;
let curr_url=window.location;
var url = new URL(curr_url);
var id = url.searchParams.get("id");

var percentage_activities=[]
var medsalaire_edit=[]

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

function bulk_delete_medicins_perc_TMP_4edit()
{
    var array = []
    var checkboxes = document.querySelectorAll('input[name=selectrowact]:checked')
    
    for (var i = 0; i < checkboxes.length; i++) {
        delete_medicins_perc_TMP_4edit(checkboxes[i].value)
    }
}


function delete_medicins_perc_TMP_4edit(id)
{
    var row = $(`#${id}`).closest('tr');
    
    let table = $('#responsiveDataTable').DataTable();

    for (var i=0;i<percentage_activities.length;i++){
        if (percentage_activities[i][3]==id){
            percentage_activities.splice(i, 1);
        }
    }
    
    table.row(row).remove().draw(false);
    //alert(percentage_activities)
    
}

function delete_medicins_salaire_TMP_4edit(id)
{
    var row = $(`#${id}`).closest('tr');
    
    let table = $('#responsiveDataTable2').DataTable();

    for (var i=0;i<medsalaire_edit.length;i++){
        if (medsalaire_edit[i][4]==id){
            medsalaire_edit.splice(i, 1);
        }
    }
    
    table.row(row).remove().draw(false);
    //alert(percentage_activities)
    
}

function activate_deactivate_medsalaire(id){
    var row = $(`#${id}`).closest('tr');
    
    let table = $('#responsiveDataTable2').DataTable();
    let updated_date = document.getElementById(`addDatePicker${id}`).value;
    for (var i=0;i<medsalaire_edit.length;i++){
        if (medsalaire_edit[i][4]==id){
            medsalaire_edit[i][3]=updated_date
        }
    }
    table.cell( row ,5).data( updated_date ).draw( false );    

}

function add_item_to_percentage_table_4edit(){
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
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="delete_medicins_perc_TMP_4edit(${rowUID})">Delete</button>
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
</div>`
if($("#addpercdocform_edit")[0].checkValidity()) {
    $('#addDoctorsPercentage').modal('hide');
    percentage_activities.push([pour_de,pour_a,pour_perc,rowUID])
    table.row.add([row_checkbox,row_functions,rowUID,pour_de,pour_a,pour_perc]).node().id = rowUID;
    table.draw(false);
    //alert(percentage_activities)
}
else {
    $("#addpercdocform_edit")[0].reportValidity();
}
}

function add_item_to_salaire_table_4edit(){
    let salairee=document.getElementById("salairee").value;
    let  monthnumbers = document.getElementById("monthsnumbers").value;
    let fromdate = document.getElementById("addDatePicker1").value;
    //let todate = document.getElementById("addDatePicker2").value;
    let todate = "";
    let rowUID = new Date().valueOf()
    let table = $('#responsiveDataTable2').DataTable();

    let row_checkbox=`<input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel${rowUID}" name="selectrowact" value="${rowUID}" aria-label="..." />`

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
                <input type="date" id="addDatePicker${rowUID}" value="" class="form-control text-muted" />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="activate_deactivate_medsalaire(${rowUID})">Confirmer</button>
            </div>
        </div>
    </div>
    </div>
    <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deletesal${rowUID}" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
    <div class="modal fade mt-4" id="deletesal${rowUID}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="delete_medicins_salaire_TMP_4edit(${rowUID})">Delete</button>
                </div>
            </div>
        </div>
    </div>


</div>`
if($("#addsalairedocform_edit")[0].checkValidity()) {
    $('#addDoctorsSalaire').modal('hide');
medsalaire_edit.push([salairee,monthnumbers,fromdate,todate,rowUID])
table.row.add(["",row_functions,salairee,monthnumbers,fromdate,todate]).node().id = rowUID;
table.draw(false);}
else {
    $("#addsalairedocform_edit")[0].reportValidity();
}
}

function modify_doctor(){
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
  //let doctor_salaire = document.getElementById("salaire").value;
  //let doctor_nombre_mois_salaire_an = document.getElementById("nombre-mois-salaire-an").value;
  //let doctor_secretaire =document.getElementById("secretaire").value;
  //let doctor_sec_percentage = document.getElementById("secretaire-pourcentage").value;
  //let doctor_logiciel = document.getElementById("logiciel").options.Length;
  let doctor_telephone = document.getElementById("telephone").value;
  let doctor_coordbank=document.getElementById("coordbank").value;
  let doctor_noavs=document.getElementById("noavs").value;    
  let doctor_email=document.getElementById("email").value;
  let doctor_date_debut=document.getElementById("datedebut").value;
  let doctor_isemp = document.getElementById("isemp-select").value;
  var logiciel_selected = [];
  for (var option of document.getElementById('logiciel').options)
  {
      if (option.selected) {
          logiciel_selected.push(option.value);
      }
  }
  //alert(percentage_activities_for_current_doctor)
  //newdoctorform  
  if($("#editdoctorform")[0].checkValidity()) {
      //alert('validated');
      const response = fetch(`${baseurl}/edit_module_item`,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
      "module":"medicins",
      "id":id,
      "mednom":doctor_name,
      "medspeciality":doctor_speciality,
      "medtype":doctor_type,
      "medpourcentage":doctor_percentage,
      "medaddress":doctor_address,
      "medchargesociales":doctor_charge_sociales,
      "medsurfaceaccordee":doctor_surface_accordee,
      //"medsalaire":doctor_salaire,
      //"mednombremoissalaireparan":doctor_nombre_mois_salaire_an,
      //"medsecretaire":doctor_secretaire,
      //"medpourcentagesecretaire":doctor_sec_percentage,
      "medlogiciels":logiciel_selected,
      "medtelephone":doctor_telephone,
      "medcoordonneebanc":doctor_coordbank,
      "mednoavs":doctor_noavs,
      "medemail":doctor_email,
      "medstartdate":doctor_date_debut,
      "isemployee":doctor_isemp,
      "percentage_activities":percentage_activities,
      "medsalaires":medsalaire_edit

      //"percentage_activities_for_current_doctor":percentage_activities_for_current_doctor

  
  })
        }).then((response) => {
          return response.json();
        }).then((json) => {
          //go back to main screen
          window.location.href = 'medicins';
      }) 
  }
  else {
      $("#editdoctorform")[0].reportValidity();
  }  

  

}
function edit_item_to_percentage_tableEDIT(rowUID){
    var row = $(`#${rowUID}`).closest('tr');
    
    let table = $('#responsiveDataTable').DataTable();
    //let updated_date = document.getElementById(`addDatePicker${id}`).value;
    let updated_de = document.getElementById(`edit-input-de${rowUID}`).value;
    let updated_a = document.getElementById(`edit-input-a${rowUID}`).value;
    let updated_perc = document.getElementById(`edit-input-perc${rowUID}`).value;
    for (var i=0;i<percentage_activities.length;i++){
        if (percentage_activities[i][3]==rowUID){
            percentage_activities[i][0]=updated_de;
            percentage_activities[i][1]=updated_a;
            percentage_activities[i][2]=updated_perc;
        }
    }
    table.cell( row ,3).data( updated_de ).draw( false );    
    table.cell( row ,4).data( updated_a ).draw( false );    
    table.cell( row ,5).data( updated_perc ).draw( false );    
    //alert(medsalaire)
}

function load_medicins_data(){

    const response = fetch(`${baseurl}/get_module_data?moduletype=medicins&id=${id}`).then((response) => {
        return response.json();
      }).then((json) => {let items = json
      console.log(items)
        
     
      
      document.getElementById("doctor-name").value = items['name']
      //document.getElementById("spec-select").value =items['speciality'];
      
      fetch('/medicinspecs/' + encodeURI(items['type']).toString().replaceAll('%','*')).then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '';
        
            optionHTML += "<option value='addnew'>Ajouter nouveau ?</option>";
            for (let spec of data.specs) {
                optionHTML += '<option value="' + spec.spec + '">' + spec.spec + '</option>';
            }
        
            medspec_select.innerHTML = optionHTML;
            $("#spec-select").val(items['speciality']);
            $("#type-select").val(items['type']);
        });
        });
      
      
      
      document.getElementById("pourcentage-medicins").value =items['perc_share'];
      document.getElementById("charges-sociales").value = items['charge_soc'];
      document.getElementById("surface-accordee").value=items['surface_accorde'];
      document.getElementById("telephone").value=items["medtelephone"]
      document.getElementById("address").value=items["medaddress"]
      document.getElementById("email").value=items["medemail"]
      document.getElementById("coordbank").value=items["medcoordonneebanc"]
      document.getElementById("noavs").value=items["mednoavs"]
      
      document.getElementById("datedebut").value=items["medstartdate"]
      
      document.getElementById("isemp-select").value=items["isemployee"]

      if (items["isemployee"]=='yes')
      {$('#salaire').show()
      $('#charges-sociales').show()
      $('#charges-sociales-lbl').show()
      $('#noavs').show()
      $('#noavs-lbl').show()}

      //document.getElementById("salaire").value = items['medsalaire'];
      //document.getElementById("nombre-mois-salaire-an").value = items['salaireparan'];
      //$("#secretaire").val(items['secretaire']);
      //document.getElementById("secretaire-pourcentage").value = items['secretaire_perc'];

      $.each(items['logiciel'].split("||"), function(i,e){
        $("#logiciel option[value='" + e + "']").prop("selected", true);
        
    });
    
      let table = $('#responsiveDataTable').DataTable();


      perc_act = items['activities']
      for (var i=0;i<perc_act.length;i++){
        let row_checkbox=`<input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel${perc_act[i]["0"]}" name="selectrowact" value="${perc_act[i]["0"]}" aria-label="..." />`

        let row_functions=`<div class="hstack gap-2 fs-15">
        <!-- duplicaterow2 and duplicaterow is important -->
        <!--<a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>-->
        <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deletepourcentageshare${perc_act[i]["0"]}" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
        <div class="modal fade mt-4" id="deletepourcentageshare${perc_act[i]["0"]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="delete_medicins_perc_TMP_4edit(${perc_act[i]["0"]})">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <a aria-label="anchor" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#editDoctorsPercentage${perc_act[i]["0"]}" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
    <div class="modal fade effect-rotate-left" id="editDoctorsPercentage${perc_act[i]["0"]}">
    <div class="modal-dialog modal-dialog-centered text-center" role="document">
        <div class="modal-content modal-content-demo">
            <div class="modal-header">
                <h6 class="modal-title">Ajouter Pourcentage</h6><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body text-start">
                <div class="row">
                    <div class="col-12">
                        <label for="input-de" class="form-label">De *</label> <input type="text" class="form-control" value=${perc_act[i]["1"]} id="edit-input-de${perc_act[i]["0"]}" />
                    </div>
                    <div class="col-12 mt-4">
                        <label for="input-a" class="form-label">A *</label> <input type="text" class="form-control" value=${perc_act[i]["2"]} id="edit-input-a${perc_act[i]["0"]}" />
                    </div>
                    <div class="col-12 mt-4">
                        <label for="input-perc" class="form-label">Pourcentage:</label> <input type="text" class="form-control" value=${perc_act[i]["3"]} id="edit-input-perc${perc_act[i]["0"]}" />
                    </div>
                    <div class="col-12 mt-4">
                        <input type="button" class="form-control btn btn-primary" id="input-button" onclick="edit_item_to_percentage_tableEDIT(${perc_act[i]["0"]})" data-bs-dismiss="modal" value="Modifier">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>`

        percentage_activities.push([perc_act[i]["1"],perc_act[i]["2"],perc_act[i]["3"],perc_act[i]["0"]])
        table.row.add([row_checkbox,row_functions,perc_act[i]["0"],perc_act[i]["1"],perc_act[i]["2"],perc_act[i]["3"]]).node().id = perc_act[i]["0"];
        table.draw();
      }

      let tablesalaire = $('#responsiveDataTable2').DataTable();
      sal = items['medsalaires']
      
      for (var i=0;i<sal.length;i++){
        //let row_checkbox=`<input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel${perc_act[i]["0"]}" name="selectrowact" value="${perc_act[i]["0"]}" aria-label="..." />`

        let row_functions=`<div class="hstack gap-2 fs-15">
        <!-- duplicaterow2 and duplicaterow is important -->
        <!--<a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>-->
        <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#valideDoctors${sal[i]["0"]}" class="btn btn-icon waves-effect waves-light btn-sm btn-warning-light"><i class="bi bi-power" data-bs-toggle="tooltip" data-bs-placement="top" title="activé/désactivé"></i></a>
        <div class="modal fade mt-4" id="valideDoctors${sal[i]["0"]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="staticBackdropLabel">Désactivation</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="product-name-add" class="form-label">Date de Désactivation:</label>
                    <input type="date" id="addDatePicker${sal[i]["0"]}" value="" class="form-control text-muted" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="activate_deactivate_medsalaire(${sal[i]["0"]})">Confirmer</button>
                </div>
            </div>
        </div>
        </div>
        <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deletesal${sal[i]["0"]}" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
        <div class="modal fade mt-4" id="deletesal${sal[i]["0"]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="delete_medicins_salaire_TMP_4edit(${sal[i]["0"]})">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    
    </div>`

        medsalaire_edit.push([sal[i]["1"],sal[i]["2"],sal[i]["3"],sal[i]["4"],sal[i]["0"]])
        tablesalaire.row.add(["",row_functions,sal[i]["1"],sal[i]["2"],sal[i]["3"],sal[i]["4"]]).node().id = sal[i]["0"];
        tablesalaire.draw();
      }
      
      /*table.row.add([row_checkbox,row_functions,rowUID,pour_de,pour_a,pour_perc]).node().id = rowUID;*/
      //alert(percentage_activities)
    
    });
    
}