var baseurl = window.location.origin;

function activate_deactivate_employee(id){
    var row = $(`#${id}`).closest('tr');
    
    let table = $('#responsiveDataTable').DataTable();
    let enddate = document.getElementById(`addDatePicker${id}`).value;
    
    const response = fetch(`${baseurl}/edit_module_item`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
    "module":"employeeenddate",
    "id":id,
    "empenddate":enddate,


    //"percentage_activities_for_current_doctor":percentage_activities_for_current_doctor


})
      }).then((response) => {
        return response.json();
      }).then((json) => {
        //go back to main screen
        table.cell( row ,8).data( enddate ).draw( false );    
    }) 
    
}

function bulk_delete_employee_module()
{
    var array = []
    var checkboxes = document.querySelectorAll('input[name=selectrowemployee]:checked')
    
    for (var i = 0; i < checkboxes.length; i++) {
        delete_employee_item(checkboxes[i].value)
    }
}

function delete_employee_item(id)
{
    var row = $(`#${id}`).closest('tr');
    
    let table = $('#responsiveDataTable').DataTable();
    
    const response = fetch(`${baseurl}/delete_module_item`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id":id,
    "module":"employee"})
      }).then((response) => {
        return response.json();
      }).then((json) => {table.row(row).remove().draw(false);})
}


function populate_employees_table(){


    const response = fetch(`${baseurl}/get_person_data?entity=employee`).then((response) => {
        return response.json();
      }).then((json) => {let items = json
    
        var t = $('#responsiveDataTable').DataTable();
        var rows2add=[];
        for (var i=0;i<items.length;i++)
        {

            let checkbox_html = `<input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel${items[i][0]}"  name="selectrowemployee" value="${items[i][0]}" aria-label="..." />`;
            let enddate=items[i][10]
            if (enddate=='1900-01-01'){
                enddate=""
            }

            let functions_btns = `<div class="hstack gap-2 fs-15">
            
            <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#valideDoctors${items[i][0]}" class="btn btn-icon waves-effect waves-light btn-sm btn-warning-light"><i class="bi bi-power" data-bs-toggle="tooltip" data-bs-placement="top" title="activé/désactivé"></i></a>
            <a aria-label="anchor" href="medicinsedit?id=${items[i][0]}" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
            <!--<a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>-->
            <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deleteDoctorsModal${items[i][0]}" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
            <div class="modal fade mt-4" id="valideDoctors${items[i][0]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog  modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title" id="staticBackdropLabel">Désactivation</h6>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label for="product-name-add" class="form-label">Date de Désactivation:</label>
                        <input type="date" id="addDatePicker${items[i][0]}" value="${enddate}" class="form-control text-muted" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="activate_deactivate_employee(${items[i][0]})">Confirmer</button>
                    </div>
                </div>
            </div>
        </div>
            <div class="modal fade mt-4" id="deleteDoctorsModal${items[i][0]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h6 class="modal-title" id="staticBackdropLabel">Delete</h6>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure do you want to delete this row? - ${items[i][1]}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="delete_employee_item(${items[i][0]})">Delete</button>
                    </div>
                </div>
            </div>

        
        </div>`;
            rows2add.push({"DT_RowId":items[i][0],"0":checkbox_html,"1":functions_btns,"2":items[i][0],"3": items[i][1],"4":items[i][8],"5":items[i][9],"6":"test<br>test<br>test","7":"test<br>test<br>test","8":enddate})
        }
        t.rows.add(rows2add).draw()
    
    
    });


}