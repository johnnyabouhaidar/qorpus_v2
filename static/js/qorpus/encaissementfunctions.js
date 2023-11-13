
var baseurl = window.location.origin;


$('#encaissement-nom').change(function(){
    
    if (this.value==='addnew')
    {
    //this.myform['other'].style.visibility='visible'
    $('input[name=encaissementNomALT]').show()
    $('#nouveaunomlbl').show()
    }
    else {
        $('input[name=encaissementNomALT]').hide()
        $('#nouveaunomlbl').hide()
    
    };
    
    })



function bulk_delete_encaissement_module()
{
    var array = []
    var checkboxes = document.querySelectorAll('input[name=selectrowencaissement]:checked')
    
    for (var i = 0; i < checkboxes.length; i++) {
        delete_encaissement_item(checkboxes[i].value)
    }
}

function bulk_validate_encaissement_module()
{
    var array = []
    var checkboxes = document.querySelectorAll('input[name=selectrowencaissement]:checked')
    
    for (var i = 0; i < checkboxes.length; i++) {
        validate_encaissement_item(checkboxes[i].value)
    }
}

function edit_encaissement_module_item(id){
    //var type2edit = document.getElementById(`modifier-encaissement-type${id}`).value;
    var name2edit = document.getElementById(`modifier-encaissement-nom${id}`).value;
    var banque2edit = document.getElementById(`modifier-encaissement-banque${id}`).value;
    var ALTname2edit = document.getElementById(`itemname${id}`).value;
    var amount2edit = document.getElementById(`itemamount${id}`).value;
    var date2edit = document.getElementById(`itemdate${id}`).value;
    var comment2edit = document.getElementById(`itemcomment${id}`).value;
    if (name2edit=='Ajouter Nouveau ?'){
        name2edit = ALTname2edit
    }
    
    var row = $(`#${id}`).closest('tr');
    
    let table = $('#responsiveDataTable').DataTable();

    const response = fetch(`${baseurl}/edit_module_item`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id":id,
    "module":"encaissement",
    "newbanque":banque2edit,
    "newname":name2edit,
    "newamount":amount2edit,
    "newdate":date2edit,
    "newcomment":comment2edit

})
      }).then((response) => {
        return response.json();
      }).then((json) => {
        table.cell( row ,3).data( banque2edit ).draw( false );
        table.cell( row ,4).data( name2edit ).draw( false );
        table.cell( row ,5).data( amount2edit ).draw( false );
        table.cell( row ,6).data( date2edit).draw( false );
        table.cell( row ,7).data( comment2edit ).draw( false );
    })    

}

function duplicate_encaissement_item(id){
    /*const response = fetch(`${baseurl}/duplicate_module_item`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id":id,
    "module":"encaissement"})
      }).then((response) => {
        return response.json();
      }).then((json) => {location.reload()})*/
      var row = $(`#${id}`).closest('tr');
      let table = $('#responsiveDataTable').DataTable();
      
      $("#encaissement-nom").val(table.cell( row ,4).data())

      
      $('input[name="montant"]').val(table.cell( row ,5).data())
      $('input[name="encaissementDate"]').val(table.cell( row ,6).data())
      $('textarea[name="comment"]').val(table.cell( row ,7).data())
      $('#banque').val(table.cell( row ,3).data())
      $("#addencaissementtModal").modal('show')
}


function delete_encaissement_item(id)
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
    "module":"encaissement"})
      }).then((response) => {
        return response.json();
      }).then((json) => {table.row(row).remove().draw(false);})
}


function validate_encaissement_item(id){
    var row = $(`#${id}`).closest('tr');
    let table = $('#responsiveDataTable').DataTable();
    
    const response = fetch(`${baseurl}/validate_item`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id":id,
    "module":"encaissement"})
      }).then((response) => {
        return response.json();
      }).then((json) => {table.cell( row ,8).data( "Visé" ).draw( false );
      document.getElementById(`validateencaissementid${id}`).remove()})

}        



function apply_encaissement_filters()
{


    var daterange = document.getElementById("mainCalendar")
    var startDatee = new Date(daterange.value.split(" - ")[0])
    var endDatee = new Date(daterange.value.split(" - ")[1])
    

    var valid_filter = document.getElementById("filterselect").value
    
    var montantlower=document.getElementById("lower-value").innerText
    var montanthigher=document.getElementById("upper-value").innerText
    
    //alert(montanthigher)
    const myTimeout = setTimeout(function(){var table = $('table').DataTable();
 
    table
        .clear()
        .draw();
        populate_encaissement_table(startDatee.toISOString().split('T')[0],endDatee.toISOString().split('T')[0],montantlower,montanthigher,valid_filter)}, 200);
        //alert(startDatee.toISOString().split('T')[0])
    
}


function populate_encaissement_table(startdte='1900-01-01',enddte='3000-01-01',minamount=0,maxamount=99999999,validefilter='%%')
{


    const response = fetch(`${baseurl}/get_module_data?moduletype=encaissement&startDate=${startdte}&endDate=${enddte}&minamount=${minamount}&maxamount=${maxamount}&validefilter=${validefilter}`).then((response) => {
        return response.json();
      }).then((json) => {let items = json
      console.log(items)

    var table_body = document.createElement("tbody");
    var table_element = document.getElementById("responsiveDataTable");
    //tbodyelement = document.getElementById("bodyid");

    var rows2add=[];
    var t = $('#responsiveDataTable').DataTable();
    for (var i=0;i<items.length;i++)
    {
        var table_roww = document.createElement("tr")
        var table_row_header = document.createElement("th");
        table_row_header.setAttribute("class","dtr-control sorting_1");
        table_row_header.setAttribute("tabindex","0");
        var input_cell = document.createElement("input")
        input_cell.setAttribute("class","form-check-input rowCheckbox")
        input_cell.setAttribute("type","checkbox")
        input_cell.setAttribute("name","selectrowencaissement")
        input_cell.setAttribute("id",`checkboxNoLabel${items[i][0]}`)
        input_cell.setAttribute("value",`${items[i][0]}`)
        input_cell.setAttribute("aria-label","...")
        table_row_header.appendChild(input_cell)
        
    
       

        /*<select class="js-example-basic-single text-muted drop" id="modifier-encaissement-type${items[i][0]}" name="modifier-encaissement-type${items[i][0]}">
                                                            ${encaissementtypeitems}
                                                        </select>*/


        


        let encaissementname_select = document.createElement("select");
        encaissementname_select.setAttribute("class","");
        encaissementname_select.setAttribute("id",`modifier-encaissement-nom${items[i][0]}`);
        encaissementname_select.setAttribute("name",`modifier-encaissement-nom${items[i][0]}`);

        let encaissementname_options = document.getElementById("encaissement-nom").options;
        for (let j=0;j<encaissementname_options.length;j++)
        {
            let opt = document.createElement("option");
            opt.value = encaissementname_options[j].text;
            //alert(typeitems[i].text.trim()+ items[i][1].trim())
            
            if (encaissementname_options[j].text.trim() == items[i][1].trim()){
                
                opt.setAttribute("selected","selected")
            }
            opt.innerHTML = encaissementname_options[j].text;
            encaissementname_select.appendChild(opt)
            //alert(typeitems[i].text)
        }

        let banque_select = document.createElement("select")
        banque_select.setAttribute("class","");
        banque_select.setAttribute("id",`modifier-encaissement-banque${items[i][0]}`);
        banque_select.setAttribute("name",`modifier-encaissement-banque${items[i][0]}`);

        let banque_options = document.getElementById("banque").options;
        for (let j=0;j<banque_options.length;j++)
        {
            let opt = document.createElement("option");
            opt.value = banque_options[j].text;
            //alert(typeitems[i].text.trim()+ items[i][1].trim())
            
            if (banque_options[j].text.trim() == items[i][4].trim()){
                
                opt.setAttribute("selected","selected")
            }
            opt.innerHTML = banque_options[j].text;
            banque_select.appendChild(opt)
            //alert(typeitems[i].text)
        }        

        /*
        let nameopt = document.createElement("option");
        nameopt.value = items[i][1].trim()
        nameopt.innerHTML = items[i][1].trim()
        nameopt.setAttribute("selected","selected");
        encaissementname_select.appendChild(nameopt)*/
        
        //encaissementtype_items.innerHTML=encaissementtypeitems

        var mydate = new Date(items[i][2]);        
        var dateisostr=mydate.toISOString().split("T")[0];                           




       
        
      
            
    
        encaissementnomhtml =  encaissementname_select.outerHTML
        banqueselecthtml = banque_select.outerHTML
        



                
        //let encaissementtype_select = document.getElementById(`modifier-encaissement-type${items[i][0]}`);
        
        //let encaissementname_select = document.getElementById(`modifier-encaissement-nom${items[i][0]}`);
      
        /*var full_year=items[i][5].getFullYear();
        alert(full_year)*/
        var table_row_functions = document.createElement("td");
        if (items[i][6]=='pasvalide')
        {
            valid_btn=`<a id=validateencaissementid${items[i][0]} aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-success-light" data-bs-toggle="modal" and data-bs-target="#validateEncaissementModal${items[i][0]}"><i class="ri-check-line"></i></a>`
        }else
        {
            valid_btn=""
        }
        table_row_functions.innerHTML=`
                                    <div class="hstack gap-2 fs-15">

                                    ${valid_btn}
                                    <a aria-label="anchor" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#editencaissementtModal${items[i][0]}" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                    <button type="submit" aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow" onclick=duplicate_encaissement_item(${items[i][0]})><i class="ri-file-copy-line"></i></button>
                                    <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deleteencaissementModal${items[i][0]}" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light" ><i class="ri-delete-bin-line"></i></a>
                                    </div>
                                    
                                    <div class="modal fade mt-4" id="deleteencaissementModal${items[i][0]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h6 class="modal-title" id="staticBackdropLabel">Delete</h6>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <p>Are you sure do you want to delete this row? <br> ${items[i][0]} - ${items[i][1]}</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-danger deleterow" data-bs-dismiss="modal" onclick=delete_encaissement_item(${items[i][0]})>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal fade mt-4" id="validateEncaissementModal${items[i][0]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h6 class="modal-title" id="staticBackdropLabel">Validate</h6>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <p>Are you sure do you want to validate this row? <br> ${items[i][1]}</p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick=validate_encaissement_item(${items[i][0]})>Validate</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div class="modal fade effect-rotate-left" id="editencaissementtModal${items[i][0]}">
                                    <div class="modal-dialog modal-dialog-centered text-center" role="document">
                                        <div class="modal-content modal-content-demo">
                                            <div class="modal-header">
                                                <h6 class="modal-title">Modifier encaissement</h6><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div class="modal-body text-start">
                                                <div class="row">
                                                    
                                                    <div class="col-12 mt-4">
                                                        <p class="mb-2 text-muted">Nom</p>
                                                        ${encaissementnomhtml}
                                                    </div>
                                                    <div class="col-12 mt-4">
                                                        <p class="mb-2 text-muted">Banque</p>
                                                        ${banqueselecthtml}
                                                    </div>
                                                    <div class="col-12 mt-4">
                                                        <p class="mb-2 text-muted">Nouveau Nom</p><input type="text" class="form-control" id="itemname${items[i][0]}">
                                                    </div>
                                                    <div class="col-12 mt-4">
                                                        <p class="mb-2 text-muted">Montant</p><input type="number" class="form-control" id="itemamount${items[i][0]}" value="${items[i][3]}">
                                                    </div>
                                                    <div class="col-12 mt-4">
                                                        <p class="mb-2 text-muted">Date</p> <input type="date" name="dates" id="itemdate${items[i][0]}" class="form-control text-muted" value= "${dateisostr}"/>
                                                    </div>
                                                    <div class="col-12 mt-4">
                                                        <p class="mb-2 text-muted">Commentaire</p><textarea class="form-control" id="itemcomment${items[i][0]}">${items[i][5]}</textarea>
                                                    </div>
                                                    <div class="col-12 mt-4">
                                                        <input type="button" class="form-control btn btn-primary" id="input-button" value="Modifier" data-bs-dismiss="modal" onclick=edit_encaissement_module_item(${items[i][0]})>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                    
                                    `
                                            
                                    
                                
                                            //<span class="badge rounded-pill bg-primary-transparent">Installation</span> <span class="badge rounded-pill bg-primary-transparent">Médecins</span> <span class="badge rounded-pill bg-primary-transparent">encaissements</span> <span class="badge rounded-pill bg-primary-transparent">encaissement</span>
      
                                            

        
    
        
                                                                
                                          
                                            
                                            var valideval = ""                                 
                                            if(items[i][6]=="pasvalide"){
                                                valideval = "à Visé"
                                            }else{
                                                valideval = "Visé"
                                            }
                                            rows2add.push({"DT_RowId":items[i][0],"0":table_row_header.innerHTML,"1": table_row_functions.innerHTML,"2":items[i][0],"3": items[i][4],"4":items[i][1],"5":items[i][3],"6":dateisostr,"7":items[i][5],"8":valideval})
        


    }
    t.rows.add(rows2add).draw()
    
   /* $('.deleterow').on('click', function () {
        
      var tablename = $(this).closest('table').DataTable();
      var button = this; // Store the reference to the button
      
      var row = $(button).closest('tr'); // Get the closest row
      
      // Wait for 1 second before removing the row
      setTimeout(function () {
        tablename.row(row).remove().draw();
      }, 500);
    });*/
    /*
    $('.duplicaterow').on('click', function () {
      var table = $(this).closest('table').DataTable();
      var button = this;
      var row = $(button).closest('tr');
      var clonedRow = row.clone(); // Clone the row
    
      // Insert the cloned row after the original row
      table.row.add(clonedRow);
    
      // Sort the table by column 3 in descending order
      table.order([[2, 'asc']]);
    
      // Redraw the table to apply the sorting
      table.draw();
    });*/
      
});


}





