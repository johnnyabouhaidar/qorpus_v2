var baseurl = window.location.origin;

        
let paymenttype_select = document.getElementById('paiement-type');
        
let paymentname_select = document.getElementById('paiement-nom');

paymenttype_select.onchange = function () {
paymenttype = paymenttype_select.value;



fetch('/paymentnames/' + encodeURI(paymenttype.trim()).toString().replaceAll('%','*')).then(function (response) {
response.json().then(function (data) {
    let optionHTML = '';

    optionHTML += "<option value='addnew'>Ajouter nouveau ?</option>";
    for (let paymentname of data.paymentnames) {
        optionHTML += '<option value="' + paymentname.name + '">' + paymentname.name + '</option>';
    }

    paymentname_select.innerHTML = optionHTML;
});
});
}


function apply_payment_filters()
{


    
    var daterange = document.getElementById("mainCalendar")
    var startDatee = new Date(daterange.value.split(" - ")[0])
    var endDatee = new Date(daterange.value.split(" - ")[1])
    

    var valid_filter = document.getElementById("filterselect")
    
    var montantlower=document.getElementById("lower-value").innerText
    var montanthigher=document.getElementById("upper-value").innerText
    
    alert(montanthigher)
    const myTimeout = setTimeout(function(){var table = $('table').DataTable();
 
    table
        .clear()
        .draw();
        populate_payment_table(startDatee.toISOString().split('T')[0],endDatee.toISOString().split('T')[0],montantlower,montanthigher)}, 200);
        //alert(startDatee.toISOString().split('T')[0])
    
}


function populate_payment_table(startdte='1900-01-01',enddte='3000-01-01',minamount=0,maxamount=99999999)
{


    const response = fetch(`${baseurl}/get_module_data?moduletype=payment&startDate=${startdte}&endDate=${enddte}&minamount=${minamount}&maxamount=${maxamount}`).then((response) => {
        return response.json();
      }).then((json) => {let items = json
      console.log(items)

    var table_body = document.createElement("tbody");
    var table_element = document.getElementById("responsiveDataTable");
    //tbodyelement = document.getElementById("bodyid");

    for (var i=0;i<items.length;i++)
    {
        var table_roww = document.createElement("tr")
        var table_row_header = document.createElement("th");
        table_row_header.setAttribute("class","dtr-control sorting_1");
        table_row_header.setAttribute("tabindex","0");
        var input_cell = document.createElement("input")
        input_cell.setAttribute("class","form-check-input rowCheckbox")
        input_cell.setAttribute("type","checkbox")
        input_cell.setAttribute("name","selectrowtype")
        input_cell.setAttribute("id",`checkboxNoLabel${items[i][0]}`)
        input_cell.setAttribute("value",`${items[i][0]}`)
        input_cell.setAttribute("aria-label","...")
        table_row_header.appendChild(input_cell)
        
        var table_row_functions = document.createElement("td");
        table_row_functions.innerHTML=`
                                    <div class="hstack gap-2 fs-15">

                                    <a aria-label="anchor" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#editUserManagmentModal${items[i][0]}" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                        <!--<a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light"><i class="ri-file-copy-line"></i></a>-->
                                        <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deleteUserManagementModal${items[i][0]}" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                    </div>
                                    
                                    <div class="modal fade mt-4" id="deleteUserManagementModal${items[i][0]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h6 class="modal-title" id="staticBackdropLabel">Delete</h6>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <p>Are you sure you want to delete item: ${items[i][1]} - ${items[i][2]}?</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" class="btn btn-danger deleterow" data-bs-dismiss="modal" onclick="delete_records([${items[i][0]}])">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <div class="modal fade effect-rotate-left" id="editUserManagmentModal${items[i][0]}">
                                                <div class="modal-dialog modal-dialog-centered text-center" role="document">
                                                    <div class="modal-content modal-content-demo">
                                                        <div class="modal-header">
                                                            <h6 class="modal-title">Modifier Gestion des Utilisateurs</h6><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                                                        </div>
                                                        <div class="modal-body text-start">
                                                            <div class="row">
                                                                <div class="col-12">
                                                                    <p class="mb-2 text-muted">Username</p><input type="text" class="form-control" id="username${items[i][0]}" value="${items[i][1]}">
                                                                </div>
                                                                <div class="col-12 mt-4">
                                                                    <p class="mb-2 text-muted">Password</p><input type="text" class="form-control" id="password${items[i][0]}" value="${items[i][2]}">
                                                                </div>
                                                                <div class="col-12 mt-4" id ="isAdmin${items[i][0]}">
                                                                    <p class="mb-2 text-muted">Role</p> 

                                                                </div>
                                                                <div class="col-12 mt-4" id ="accessrightsdiv${items[i][0]}">
                                                                    
                                                                    <p class="mb-2 text-muted">Accès</p>
                                                                    
                                                                </div>
                                                                



                                                                <div class="col-12 mt-4">
                                                                    <input type="button" class="form-control btn btn-primary" id="input-button${items[i][0]}" onclick="edituser(${items[i][0]})" value="Modifier" data-bs-dismiss="modal">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`
                                            
                                    
                                
                                            //<span class="badge rounded-pill bg-primary-transparent">Installation</span> <span class="badge rounded-pill bg-primary-transparent">Médecins</span> <span class="badge rounded-pill bg-primary-transparent">Paiements</span> <span class="badge rounded-pill bg-primary-transparent">Facturation</span>
      
        

        var t = $('#responsiveDataTable').DataTable();
    
        
        
        if (items[i][1]=="admin"){
            t.row.add(["","",items[i][0], items[i][1],items[i][2],items[i][3],items[i][4],items[i][5],items[i][6]]).draw(false);    
        }else{
            t.row.add([table_row_header.innerHTML, table_row_functions.innerHTML,items[i][0], items[i][1],items[i][2],items[i][3],items[i][5],items[i][4],items[i][6]]).draw(false);    
            
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


