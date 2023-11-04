var baseurl = window.location.origin;
let curr_urll=window.location;
var url = new URL(curr_urll);
var id = url.searchParams.get("id");

var percentage_activities=[]
var empsalaire_edit=[]

function bulk_delete_employee_perc_TMP_4edit()
{
    var array = []
    var checkboxes = document.querySelectorAll('input[name=selectrowact]:checked')
    
    for (var i = 0; i < checkboxes.length; i++) {
        delete_employee_perc_TMP_4edit(checkboxes[i].value)
    }
}


function delete_employee_perc_TMP_4edit(id)
{
    var row = $(`#${id}`).closest('tr');
    
    let table = $('#responsiveDataTable').DataTable();

    for (var i=0;i<percentage_activities.length;i++){
        if (percentage_activities[i][5]==id){
            percentage_activities.splice(i, 1);
        }
    }
    
    table.row(row).remove().draw(false);
    //alert(percentage_activities)
    
}

function delete_employee_salaire_TMP_4edit(id)
{
    var row = $(`#${id}`).closest('tr');
    
    let table = $('#responsiveDataTable2').DataTable();

    for (var i=0;i<empsalaire_edit.length;i++){
        if (empsalaire_edit[i][4]==id){
            empsalaire_edit.splice(i, 1);
        }
    }
    
    table.row(row).remove().draw(false);
    //alert(percentage_activities)
    //alert(empsalaire_edit)
    
}

function activate_deactivate_empsalaire(id){
    var row = $(`#${id}`).closest('tr');
    
    let table = $('#responsiveDataTable2').DataTable();
    let updated_date = document.getElementById(`addDatePicker${id}`).value;
    for (var i=0;i<empsalaire_edit.length;i++){
        if (empsalaire_edit[i][4]==id){
            empsalaire_edit[i][3]=updated_date
        }
    }
    table.cell( row ,4).data( updated_date ).draw( false );    
    //alert(empsalaire_edit)

}

function activate_deactivate_empperc(id){
    var row = $(`#${id}`).closest('tr');
    
    let table = $('#responsiveDataTable').DataTable();
    let updated_date = document.getElementById(`addDatePicker${id}perc`).value;
    for (var i=0;i<percentage_activities.length;i++){
        if (percentage_activities[i][5]==id){
            percentage_activities[i][4]=updated_date
        }
    }
    table.cell( row ,6).data( updated_date ).draw( false );    
    //alert(percentage_activities)

}

function add_item_to_percentage_table_4edit_perc(){
    fonction=document.getElementById("fonction").value;
    empmed = document.getElementById("empmed").value;
    empperc = document.getElementById("empperc").value;
    percstartdate = document.getElementById("addDatePicker44").value;
    
    let rowUID = new Date().valueOf()
    let table = $('#responsiveDataTable').DataTable();

    let row_checkbox=`<input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel${rowUID}" name="selectrowact" value="${rowUID}" aria-label="..." />`

    let row_functions=`<div class="hstack gap-2 fs-15">
    <!-- duplicaterow2 and duplicaterow is important -->
    <!--<a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>-->
    <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#valideemp${rowUID}" class="btn btn-icon waves-effect waves-light btn-sm btn-warning-light"><i class="bi bi-power" data-bs-toggle="tooltip" data-bs-placement="top" title="activé/désactivé"></i></a>
    <div class="modal fade mt-4" id="valideemp${rowUID}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h6 class="modal-title" id="staticBackdropLabel">Désactivation</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <label for="product-name-add" class="form-label">Date de Désactivation:</label>
                <input type="date" id="addDatePicker${rowUID}perc" value="" class="form-control text-muted" />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="activate_deactivate_empperc(${rowUID})">Confirmer</button>
            </div>
        </div>
    </div>
    </div>
    
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
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="delete_employee_perc_TMP_4edit(${rowUID})">Delete</button>
                </div>
            </div>
        </div>
    </div>

</div>`
    percentage_activities.push([fonction,empmed,empperc,percstartdate,"",rowUID])
    table.row.add([row_checkbox,row_functions,fonction,empmed,empperc,percstartdate,""]).node().id = rowUID;
    table.draw(false);
    //alert(percentage_activities)
}

function add_item_to_salaire_table_4edit_emp(){
    let salairee=document.getElementById("salairee").value;
    let  monthnumbers = document.getElementById("monthsnumbers").value;
    let fromdate = document.getElementById("addDatePicker22").value;
    //let todate = document.getElementById("addDatePicker2").value;
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
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="activate_deactivate_empsalaire(${rowUID})">Confirmer</button>
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
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="delete_employee_salaire_TMP_4edit(${rowUID})">Delete</button>
                </div>
            </div>
        </div>
    </div>


</div>`
empsalaire_edit.push([salairee,monthnumbers,fromdate,"",rowUID])
//alert(empsalaire_edit)
table.row.add([row_functions,salairee,monthnumbers,fromdate,""]).node().id = rowUID;
table.draw(false);
}

function modify_employee(){
    let empnom = document.getElementById("empnom").value;
    let empaddress = document.getElementById("empaddress").value;
    let emptel = document.getElementById("emptel").value;
    let empemail = document.getElementById("empemail").value;
    let empcoordbanc = document.getElementById("empcoordbanc").value;
    let empnoavs = document.getElementById("empnoavs").value;
    let emppole = document.getElementById("emppole").value;
    let empposte = document.getElementById("empposte").value;
    let empdatedebut = document.getElementById("addDatePicker1").value;
  //alert(percentage_activities_for_current_doctor)
  //newdoctorform  
  if($("#editemployeeform")[0].checkValidity()) {
      //alert('validated');
      const response = fetch(`${baseurl}/edit_module_item`,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
      "module":"employee",
      "id":id,
      "empnom":empnom,
      "empaddress":empaddress,
      "emptel":emptel,
      "empemail":empemail,
      "empcoordbanc":empcoordbanc,
      "empnoavs":empnoavs,
      "emppole":emppole,
      "empposte":empposte,
      "empdatedebut":empdatedebut,
      "percentage_activities":percentage_activities,
      "empsalaires":empsalaire_edit

      //"percentage_activities_for_current_doctor":percentage_activities_for_current_doctor

  
  })
        }).then((response) => {
          return response.json();
        }).then((json) => {
          //go back to main screen
          window.location.href = 'employees';
      }) 
  }
  else {
      $("#editemployeeform")[0].reportValidity();
  }  

  

}


function load_employee_dataa(){

    const response = fetch(`${baseurl}/get_module_data?moduletype=employee&id=${id}`).then((response) => {
        return response.json();
      }).then((json) => {let items = json
      console.log(items)
        

      
      document.getElementById("empnom").value =items['empnom'];
      document.getElementById("empaddress").value = items['empaddress'];
      document.getElementById("emptel").value=items['emptelephone'];
      document.getElementById("empemail").value=items["empemail"]
      document.getElementById("empcoordbanc").value=items["empcoordonnebanc"]
      document.getElementById("empnoavs").value=items["empnoavs"]
      document.getElementById("emppole").value=items["emppole"]
      document.getElementById("empposte").value=items["empintituleposte"]
      
      document.getElementById("addDatePicker1").value=items["empdatedebut"]
      
      

      //document.getElementById("salaire").value = items['medsalaire'];
      //document.getElementById("nombre-mois-salaire-an").value = items['salaireparan'];
      //$("#secretaire").val(items['secretaire']);
      //document.getElementById("secretaire-pourcentage").value = items['secretaire_perc'];

      
    
      let table = $('#responsiveDataTable').DataTable();


      perc_act = items['activities']
      for (var i=0;i<perc_act.length;i++){
        let row_checkbox=`<input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel${perc_act[i]["0"]}" name="selectrowact" value="${perc_act[i]["0"]}" aria-label="..." />`

        let row_functions=`<div class="hstack gap-2 fs-15">
        <!-- duplicaterow2 and duplicaterow is important -->
        <!--<a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>-->
        <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#valideDoctors${perc_act[i]["0"]}" class="btn btn-icon waves-effect waves-light btn-sm btn-warning-light"><i class="bi bi-power" data-bs-toggle="tooltip" data-bs-placement="top" title="activé/désactivé"></i></a>
        <div class="modal fade mt-4" id="valideDoctors${perc_act[i]["0"]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h6 class="modal-title" id="staticBackdropLabel">Désactivation</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <label for="product-name-add" class="form-label">Date de Désactivation:</label>
                    <input type="date" id="addDatePicker${perc_act[i]["0"]}perc" value="" class="form-control text-muted" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="activate_deactivate_empperc(${perc_act[i]["0"]})">Confirmer</button>
                </div>
            </div>
        </div>
        </div>
        
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
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="delete_employee_perc_TMP_4edit(${perc_act[i]["0"]})">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    
    </div>`

        perc_date_fin=""
        if(perc_act[i]["5"]!='1900-01-01'){
            perc_date_fin=perc_act[i]["5"];
        }

        percentage_activities.push([perc_act[i]["1"],perc_act[i]["2"],perc_act[i]["3"],perc_act[i]["4"],perc_date_fin,perc_act[i]["0"]])
        table.row.add([row_checkbox,row_functions,perc_act[i]["1"],perc_act[i]["2"],perc_act[i]["3"],perc_act[i]["4"],perc_date_fin,perc_act[i]["6"]]).node().id = perc_act[i]["0"];
        table.draw();
      }

      let tablesalaire = $('#responsiveDataTable2').DataTable();
      sal = items['empsalaires']
      
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
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="activate_deactivate_empsalaire(${sal[i]["0"]})">Confirmer</button>
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
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="delete_employee_salaire_TMP_4edit(${sal[i]["0"]})">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    
    </div>`
    let datefin=""    
    if (sal[i][4]!='1900-01-01')
        {datefin=sal[i][4]}
        empsalaire_edit.push([sal[i]["1"],sal[i]["2"],sal[i]["3"],datefin,sal[i]["0"]])
        tablesalaire.row.add([row_functions,sal[i]["1"],sal[i]["2"],sal[i]["3"],datefin]).node().id = sal[i]["0"];
        tablesalaire.draw();
      }
      
      /*table.row.add([row_checkbox,row_functions,rowUID,pour_de,pour_a,pour_perc]).node().id = rowUID;*/
      //alert(percentage_activities)
    
    });
    
}