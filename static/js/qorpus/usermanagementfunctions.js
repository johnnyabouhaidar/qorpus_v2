
baseurl = window.location.origin
function edituser(id){

    data = {
                "id":id,
                "username":"",
                "password":"",
                "isAdmin":"",
                "access":[],

            }
    data["username"] = document.getElementById(`username${id}`).value
    data["password"] = document.getElementById(`password${id}`).value
    data["isAdmin"] = document.getElementById(`adminRadio${id}`).checked
    var checkboxes = document.querySelectorAll(`input[name=rolescheckbox${id}]:checked`)
    accessarrays = []
    for (var i=0;i<checkboxes.length;i++)
    {
        accessarrays.push(checkboxes[i].value)
    }
    data["access"]=accessarrays
    //console.log(data)
    const response = fetch(`${baseurl}/edit_user`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((response) => {
        return response.json();
      }).then((json) => {})

      
    const myTimeout = setTimeout(function(){var table = $('table').DataTable();
 
    table
        .clear()
        .draw();
        populate_table()}, 1000);
    

}

function delete_multiple()
{
    var array = []
var checkboxes = document.querySelectorAll('input[name=selectrowtype]:checked')

for (var i = 0; i < checkboxes.length; i++) {
  array.push(checkboxes[i].value)
  
//$("#table").DataTable().clear()
}
delete_records(array)
const myTimeout = setTimeout(function(){var table = $('table').DataTable();
 
table
    .clear()
    .draw();
    populate_table()}, 1000);

//alert(array)
}

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
        input_cell.setAttribute("name","selectrowtype")
        input_cell.setAttribute("id",`checkboxNoLabel${users[i][0]}`)
        input_cell.setAttribute("value",`${users[i][0]}`)
        input_cell.setAttribute("aria-label","...")
        table_row_header.appendChild(input_cell)
        
        let table_row_functions = document.createElement("td");
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
                                                                    <p class="mb-2 text-muted">Username</p><input type="text" class="form-control" id="username${users[i][0]}" value="${users[i][1]}">
                                                                </div>
                                                                <div class="col-12 mt-4">
                                                                    <p class="mb-2 text-muted">Password</p><input type="text" class="form-control" id="password${users[i][0]}" value="${users[i][2]}">
                                                                </div>
                                                                <div class="col-12 mt-4" id ="isAdmin${users[i][0]}">
                                                                    <p class="mb-2 text-muted">Role</p> 

                                                                </div>
                                                                <div class="col-12 mt-4" id ="accessrightsdiv${users[i][0]}">
                                                                    
                                                                    <p class="mb-2 text-muted">Accès</p>
                                                                    
                                                                </div>
                                                                



                                                                <div class="col-12 mt-4">
                                                                    <input type="button" class="form-control btn btn-primary" id="input-button${users[i][0]}" onclick="edituser(${users[i][0]})" value="Modifier" data-bs-dismiss="modal">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`
                                            
                                    
                                
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
        admin <i class="bi bi-key"></i>
        </span> `
                role = divelement.innerHTML
        }else{
            role = users[i][3]
        }
        
        if (users[i][1]=="admin"){
            t.row.add(["","",users[i][0], users[i][1],"","",role,tmp_div.innerHTML,'---']).draw(false);    
            
        }else{
            t.row.add([table_row_header.innerHTML, table_row_functions.innerHTML,users[i][0], users[i][1],"","",role,tmp_div.innerHTML,'---']).draw(false);    
            
            var rolesmapping_dict=[['setup','Setup'],['doctors','Docteurs'],['payments','Paiements'],['facturation','Facturations'],['retrocession','Retrocessions'],['dentisterie','Dentisterie'],['encaissement','Encaissement'],['fraismateriel','Frais Materiel'],['paiement_medecin','Paiement du médecin'],['reports','Reports Generation']]
            var accessrightsdiv = document.getElementById(`accessrightsdiv${users[i][0]}`)
            for (var roleindex=0;roleindex<rolesmapping_dict.length;roleindex++)
            {
                //alert(rolesmapping_dict[roleindex][0]);
                var newitem = document.createElement("div");
                
                if (access_items_arr.includes(rolesmapping_dict[roleindex][0]))
                {
                    newitem.innerHTML = `<input class="form-check-input rowCheckbox3 ms-2" name="rolescheckbox${users[i][0]}" type="checkbox" value="${rolesmapping_dict[roleindex][0]}" checked>
                                    <span>${rolesmapping_dict[roleindex][1]}</span>`
                }else{
                    newitem.innerHTML = `<input class="form-check-input rowCheckbox3 ms-2" name="rolescheckbox${users[i][0]}" type="checkbox" value="${rolesmapping_dict[roleindex][0]}">
                                    <span>${rolesmapping_dict[roleindex][1]}</span>`
                }
                accessrightsdiv.appendChild(newitem)    
            }
    
            var isAdmindiv=document.getElementById(`isAdmin${users[i][0]}`)
            
            
            var admincheck = document.createElement("div")
            if (users[i][3]=="admin"){
            admincheck.innerHTML=`<input class="form-check-input" type="checkbox" name="userType" id="adminRadio${users[i][0]}" value="admin" checked>
            <label class="form-check-label ms-2" for="adminRadio">Admin</label>`}
            else{
                admincheck.innerHTML=`<input class="form-check-input" type="checkbox" name="userType" id="adminRadio${users[i][0]}" value="admin">
            <label class="form-check-label ms-2" for="adminRadio">Admin</label>`}
            
            isAdmindiv.appendChild(admincheck)
        }
        
                              

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