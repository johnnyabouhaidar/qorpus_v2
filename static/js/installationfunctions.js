baseurl = window.location.origin


function populate_types_table(){
    const response = fetch(`${baseurl}/get_types_data`).then((response) => {
        return response.json();
      }).then((json) => {let users = json
      console.log(users)

    var table_body = document.createElement("tbody");
    var table_element = document.getElementById("responsiveDataTable");
    //tbodyelement = document.getElementById("bodyid");

    for (var i=0;i<users.length;i++)
    {
        var table_roww = document.createElement("tr")
        var table_row_header = document.createElement("th");
        table_row_header.setAttribute("class","dtr-control sorting_1");
        table_row_header.setAttribute("tabindex","0");
        var input_cell = document.createElement("input")
        input_cell.setAttribute("class","form-check-input rowCheckbox")
        input_cell.setAttribute("type","checkbox")
        input_cell.setAttribute("name","type")
        input_cell.setAttribute("id",`checkboxNoLabel${users[i][0]}`)
        input_cell.setAttribute("value",`${users[i][0]}`)
        input_cell.setAttribute("aria-label","...")
        table_row_header.appendChild(input_cell)
        
        var table_row_functions = document.createElement("td");
        table_row_functions.innerHTML=`
                                    <div class="hstack gap-2 fs-15">

                                    <a aria-label="anchor" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#editUserManagmentModal${users[i][0]}" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                        <!--<a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light"><i class="ri-file-copy-line"></i></a>-->
                                        <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deleteUserManagementModal${users[i][0]}" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                    </div>
                                    
                                    <div class="modal fade mt-4" id="deleteUserManagementModal${users[i][0]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h6 class="modal-title" id="staticBackdropLabel">Delete</h6>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Are you sure you want to delete user: ${users[i][1]}?</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-danger deleterow" data-bs-dismiss="modal" onclick="delete_records([${users[i][0]}])">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <div class="modal fade effect-rotate-left" id="editUserManagmentModal${users[i][0]}">
                                                <div class="modal-dialog modal-dialog-centered text-center" role="document">
                                                    <div class="modal-content modal-content-demo">
                                                        <div class="modal-header">
                                                            <h6 class="modal-title">Modifier Gestion des Utilisateurs</h6><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                                                        </div>
                                                        <div class="modal-body text-start">
                                                            <div class="row">
                                                                <div class="col-12">
                                                                    <p class="mb-2 text-muted">Username</p><input type="text" class="form-control" id="input" value="${users[i][1]}">
                                                                </div>
                                                                <div class="col-12 mt-4">
                                                                    <p class="mb-2 text-muted">Password</p><input type="text" class="form-control" id="input" value="${users[i][2]}">
                                                                </div>
                                                                <div class="col-12 mt-4">
                                                                    <p class="mb-2 text-muted">Role</p> 

                                                                </div>
                                                                <div class="col-12 mt-4">
                                                                    
                                                                    <p class="mb-2 text-muted">Accès</p>
                                                                    <div>
                                                                        <input class="form-check-input ms-2" type="checkbox" value="" id="selectAllCheckboxAddMethod">
                                                                        <span>Tout</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="" checked>
                                                                        <span>Paiement</span>
                                                                    </div>
                                                                    <div>

                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Facturation</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Retrocession</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Dentisterie</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Encaissement Avance</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Médecins</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Dentiste et Hygieniste</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Employé(e)s</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Patients</span>
                                                                    </div>
                                                                </div>
                                                                



                                                                <div class="col-12 mt-4">
                                                                    <input type="button" class="form-control btn btn-primary" id="input-button" value="Modifier" data-bs-dismiss="modal">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`
                                    /*`<div class="modal fade mt-4" id="modal${users[i][0]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal",onclick="delete_records([${users[i][0]}])">Close</button>
                                                            <button id="delbtn${users[i][0]}" type="button" class="btn btn-danger deleterow" data-bs-dismiss="modal">Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`*/
                                
                                            //<span class="badge rounded-pill bg-primary-transparent">Installation</span> <span class="badge rounded-pill bg-primary-transparent">Médecins</span> <span class="badge rounded-pill bg-primary-transparent">Paiements</span> <span class="badge rounded-pill bg-primary-transparent">Facturation</span>
        
        
                                            var t = $('#responsiveDataTable').DataTable();
                                            t.row.add([table_row_header.innerHTML, table_row_functions.innerHTML,users[i][0], users[i][1], users[i][2]]).draw(false);

    }
    

    $('.deleterow').on('click', function () {
        
        var tablename = $(this).closest('table').DataTable();
        var button = this; // Store the reference to the button
        
        var row = $(button).closest('tr'); // Get the closest row
        
        // Wait for 1 second before removing the row
        setTimeout(function () {
          tablename.row(row).remove().draw();
        }, 500);
      });

      
});
}