baseurl = window.location.origin


function delete_types_multiple()
{
    var array = []
var checkboxes = document.querySelectorAll('input[name=selectrowtype]:checked')

for (var i = 0; i < checkboxes.length; i++) {
    var objectt = {"type":checkboxes[i].value.split("_")[0],"id":checkboxes[i].value.split("_")[1]}
    array.push(objectt)
  
//$("#table").DataTable().clear()
}
console.log(array)
delete_type_records(array)
const myTimeout = setTimeout(function(){var table = $('table').DataTable();
 
table
    .clear()
    .draw();
    populate_types_table()}, 1000);

//alert(array)
}

function delete_type_records(array){
    //console.log(array.toString())
    const response = fetch(`${baseurl}/delete_type`,{
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

function populate_types_table(){
    const response = fetch(`${baseurl}/get_types_data`).then((response) => {
        return response.json();
      }).then((json) => {let types = json
      console.log(types)

    var table_body = document.createElement("tbody");
    var table_element = document.getElementById("responsiveDataTable");
    //tbodyelement = document.getElementById("bodyid");

    for (var i=0;i<types.length;i++)
    {
        var table_roww = document.createElement("tr")
        var table_row_header = document.createElement("th");
        table_row_header.setAttribute("class","dtr-control sorting_1");
        table_row_header.setAttribute("tabindex","0");
        var input_cell = document.createElement("input")
        input_cell.setAttribute("class","form-check-input rowCheckbox")
        input_cell.setAttribute("type","checkbox")
        input_cell.setAttribute("name","selectrowtype")
        input_cell.setAttribute("id",`checkboxNoLabel${types[i][0]}`)
        input_cell.setAttribute("value",`${types[i][0]}_${types[i][1]}`)
        input_cell.setAttribute("aria-label","...")
        table_row_header.appendChild(input_cell)
        
        var table_row_functions = document.createElement("td");
        table_row_functions.innerHTML=`
                                    <div class="hstack gap-2 fs-15">

                                    <a aria-label="anchor" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#editUserManagmentModal${types[i][1]}${types[i][0]}" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                        <!--<a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light"><i class="ri-file-copy-line"></i></a>-->
                                        <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deleteUserManagementModal${types[i][1]}${types[i][0]}" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                    </div>
                                    
                                    <div class="modal fade mt-4" id="deleteUserManagementModal${types[i][1]}${types[i][0]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h6 class="modal-title" id="staticBackdropLabel">Delete</h6>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Are you sure you want to delete item: ${types[i][1]}?</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-danger deleterow" data-bs-dismiss="modal" onclick="delete_type_records([{'type':'${types[i][0]}','id':${types[i][1]}}])">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <div class="modal fade effect-rotate-left" id="editUserManagmentModal${types[i][1]}${types[i][0]}">
                                                <div class="modal-dialog modal-dialog-centered text-center" role="document">
                                                    <div class="modal-content modal-content-demo">
                                                        <div class="modal-header">
                                                            <h6 class="modal-title">Modifier Gestion des Utilisateurs</h6><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                                                        </div>
                                                        <div class="modal-body text-start">
                                                            <div class="row">
                                                                
                                                                <div class="col-12 mt-4">
                                                                    <p class="mb-2 text-muted">Type</p><input type="text" class="form-control" id="input" value="${types[i][2]}">
                                                                </div>
                                                                

                                                                <div class="col-12 mt-4">
                                                                    <input type="button" class="form-control btn btn-primary" id="input-button" value="Modifier" data-bs-dismiss="modal">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`
                                    /*`<div class="modal fade mt-4" id="modal${types[i][0]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal",onclick="delete_records([${types[i][0]}])">Close</button>
                                                            <button id="delbtn${types[i][0]}" type="button" class="btn btn-danger deleterow" data-bs-dismiss="modal">Delete</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`*/
                                
                                            //<span class="badge rounded-pill bg-primary-transparent">Installation</span> <span class="badge rounded-pill bg-primary-transparent">Médecins</span> <span class="badge rounded-pill bg-primary-transparent">Paiements</span> <span class="badge rounded-pill bg-primary-transparent">Facturation</span>
        
        
                                            var t = $('#responsiveDataTable2').DataTable();
                                            var typeframediv = document.createElement("div");
                                            typeframespan = document.createElement("span");
                                            
                                            typeframespan.setAttribute("class","badge rounded-pill bg-primary-transparent")
                                            typeframespan.innerHTML = types[i][0]
                                            typeframediv.appendChild(typeframespan)

                                            t.row.add([table_row_header.innerHTML, table_row_functions.innerHTML,`${types[i][1]}_${types[i][0]}`, types[i][2], typeframediv.innerHTML]).draw(false);

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