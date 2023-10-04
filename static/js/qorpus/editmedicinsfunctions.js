var baseurl = window.location.origin;
let curr_url=window.location;
var url = new URL(curr_url);
var id = url.searchParams.get("id");

var percentage_activities=[]

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

</div>`
    percentage_activities.push([pour_de,pour_a,pour_perc,rowUID])
    table.row.add([row_checkbox,row_functions,rowUID,pour_de,pour_a,pour_perc]).node().id = rowUID;
    table.draw(false);
    //alert(percentage_activities)
}

function modify_doctor(){
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
      "medchargesociales":doctor_charge_sociales,
      "medsurfaceaccordee":doctor_surface_accordee,
      "medsalaire":doctor_salaire,
      "mednombremoissalaireparan":doctor_nombre_mois_salaire_an,
      "medsecretaire":doctor_secretaire,
      "medpourcentagesecretaire":doctor_sec_percentage,
      "medlogiciels":logiciel_selected,
      "percentage_activities":percentage_activities
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


function load_medicins_data(){

    const response = fetch(`${baseurl}/get_module_data?moduletype=medicins&id=${id}`).then((response) => {
        return response.json();
      }).then((json) => {let items = json
      console.log(items)
        
     
      
      document.getElementById("doctor-name").value = items['name']
      document.getElementById("doctor-speciality").value =items['speciality'];
      $("#type-select").val(items['type']);
      
      document.getElementById("pourcentage-medicins").value =items['perc_share'];
      document.getElementById("charges-sociales").value = items['charge_soc'];
      document.getElementById("surface-accordee").value=items['surface_accorde'];
      document.getElementById("salaire").value = items['medsalaire'];
      document.getElementById("nombre-mois-salaire-an").value = items['salaireparan'];
      $("#secretaire").val(items['secretaire']);
      document.getElementById("secretaire-pourcentage").value = items['secretaire_perc'];

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
    
    </div>`

        percentage_activities.push([perc_act[i]["1"],perc_act[i]["2"],perc_act[i]["3"],perc_act[i]["0"]])
        table.row.add([row_checkbox,row_functions,perc_act[i]["0"],perc_act[i]["1"],perc_act[i]["2"],perc_act[i]["3"]]).node().id = perc_act[i]["0"];
        table.draw();
      }
      
      /*table.row.add([row_checkbox,row_functions,rowUID,pour_de,pour_a,pour_perc]).node().id = rowUID;*/
      //alert(percentage_activities)
    
    });
    
}