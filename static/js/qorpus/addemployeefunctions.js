var baseurl = window.location.origin;

let percentage_activities_for_current_employee=[]
let empsalaire=[]


med_select=document.getElementById("empmed");


fetch('/get_doctors_list').then(function (response) {
    response.json().then(function (data) {
        let optionHTML = '';
    
        //optionHTML += "<option value='addnew'>Ajouter nouveau ?</option>";
        for (let spec of data) {
            optionHTML += '<option value="' + spec + '">' + spec + '</option>';
        }
    
        med_select.innerHTML = optionHTML;
    });
    });


function add_new_employee(){
    let empnom = document.getElementById("empnom").value;
    let empaddress = document.getElementById("empaddress").value;
    let emptel = document.getElementById("emptel").value;
    let empemail = document.getElementById("empemail").value;
    let empcoordbanc = document.getElementById("empcoordbanc").value;
    let empnoavs = document.getElementById("empnoavs").value;
    let emppole = document.getElementById("emppole").value;
    let empposte = document.getElementById("empposte").value;
    let empdatedebut = document.getElementById("addDatePicker11").value;
    

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
        "empsalaire":empsalaire,
        "percentage_activities_for_current_employee":percentage_activities_for_current_employee
    
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

function delete_employee_perc_TMP(id)
{
    var row = $(`#${id}`).closest('tr');
    
    let table = $('#responsiveDataTable').DataTable();

    for (var i=0;i<percentage_activities_for_current_employee.length;i++){
        if (percentage_activities_for_current_employee[i][5]==id){
            percentage_activities_for_current_employee.splice(i, 1);
        }
    }
    
    table.row(row).remove().draw(false);
    
    alert(percentage_activities_for_current_employee)
}

function add_item_to_percentage_table_emp(){
    fonction=document.getElementById("fonction").value;
    empmed = document.getElementById("empmed").value;
    empperc = document.getElementById("empperc").value;
    percstartdate = document.getElementById("addDatePicker4").value;
    
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
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="delete_employee_perc_TMP(${rowUID})">Delete</button>
                </div>
            </div>
        </div>
    </div>

</div>`
    
if($("#addpercempform")[0].checkValidity()) {
    $('#addEmployeePercentage').modal('hide');
    percentage_activities_for_current_employee.push([fonction,empmed,empperc,percstartdate,"",rowUID])
    table.row.add([row_checkbox,row_functions,fonction,empmed,empperc,percstartdate,""]).node().id = rowUID;
    table.draw(false);
}    else {
    $("#addpercempform")[0].reportValidity();
}
    //alert(percentage_activities_for_current_employee)
}

function delete_employee_salaire_TMP(id)
{
    var row = $(`#${id}`).closest('tr');
    
    let table = $('#responsiveDataTable2').DataTable();

    for (var i=0;i<empsalaire.length;i++){
        if (empsalaire[i][3]==id){
            empsalaire.splice(i, 1);
        }
    }
    
    table.row(row).remove().draw(false);
    
    
}

function add_item_to_emp_salaire_table(){
  let salairee=document.getElementById("empsalaire").value;
  let  monthnumbers = document.getElementById("empnombremois").value;
  let fromdate = document.getElementById("addDatePicker2").value;
  //let todate = document.getElementById("addDatePicker2").value;
  let todate="";
  let rowUID = new Date().valueOf()
  let table = $('#responsiveDataTable2').DataTable();

  //let row_checkbox=`<input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel${rowUID}" name="selectrowact" value="${rowUID}" aria-label="..." />`

  let row_functions=`<div class="hstack gap-2 fs-15">
  <!-- duplicaterow2 and duplicaterow is important -->
  <!--<a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>-->
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
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="delete_employee_salaire_TMP(${rowUID})">Delete</button>
              </div>
          </div>
      </div>
  </div>

</div>`
if($("#addsalaireempform")[0].checkValidity()) {
    $('#addEmployeeSalary').modal('hide');
  empsalaire.push([salairee,monthnumbers,fromdate,todate,rowUID])
  table.row.add([row_functions,salairee,monthnumbers,fromdate,""]).node().id = rowUID;
  table.draw(false);
}    else {
    $("#addsalaireempform")[0].reportValidity();
}
  
}