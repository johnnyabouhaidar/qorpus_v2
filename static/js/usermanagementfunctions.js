
baseurl = window.location.origin
function delete_records(array){
    const response = fetch(`${baseurl}/delete_user`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"ids":array})
      }).then((response) => {
        return response.json();
      }).then((json) => {})
}

function populate_table(){
    const response = fetch(`${baseurl}/get_users_data`).then((response) => {
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
        input_cell.setAttribute("id",`checkboxNoLabel${users[i][0]}`)
        input_cell.setAttribute("value","")
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
                                                                    <p class="mb-2 text-muted">Role</p> <input class="form-check-input" type="radio" name="userType" id="adminRadio" value="admin" checked>
                                                                    <label class="form-check-label ms-2" for="adminRadio">Admin</label>
                                                                    <input class="form-check-input ms-2" type="radio" name="userType" id="userRadio" value="user">
                                                                    <label class="form-check-label ms-2" for="userRadio">User</label>
                                                                </div>
                                                                <div class="col-12 mt-4">
                                                                    <p class="mb-2 text-muted">Accès</p>
                                                                    
                                                                </div>



                                                                <div class="col-12 mt-4">
                                                                    <input type="button" class="form-control btn btn-primary" id="input-button" value="Modifier">
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
        var access_items_arr=users[i][4].split(" ")
        tmp_div=document.createElement("div")
        for (var j=0;j<access_items_arr.length;j++){
            var access_items=document.createElement("span");
            access_items.setAttribute("class","badge rounded-pill bg-primary-transparent");
            access_items.innerText=access_items_arr[j];
            tmp_div.appendChild(access_items)
            //access_items_text=access_items_text+access_items.innerHTML
        }
        

        var t = $('#responsiveDataTable').DataTable();
        /*   <span
                                      
                                        tabindex="0"
                                        data-bs-toggle="popover"
                                        data-bs-trigger="hover focus"
                                        data-bs-content="Propriétaire du compte"
                                    >
                                    Admin <i class="bi bi-key"></i>
                                    </span>  
                                     */
        var role="";
        if (users[i][3]=="admin" && users[i][4]=="all")
        {
            divelement = document.createElement("div")
            divelement.innerHTML=`<span
                                      
            tabindex="0"
            data-bs-toggle="popover"
            data-bs-trigger="hover focus"
            data-bs-content="Propriétaire du compte"
        >
        Admin <i class="bi bi-key"></i>
        </span> `
                role = divelement.innerHTML
        }else{
            role = users[i][3]
        }
        t.row.add([table_row_header.innerHTML, table_row_functions.innerHTML,users[i][0], users[i][1],"","",role,tmp_div.innerHTML,'---']).draw(false);

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