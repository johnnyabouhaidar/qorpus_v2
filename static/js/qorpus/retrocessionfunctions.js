
var baseurl = window.location.origin;


let retrocessiontype_select = document.getElementById('retrocession-type');
        
let retrocessionname_select = document.getElementById('retrocession-nom');

retrocessiontype_select.onchange = function () {
retrocessiontype = retrocessiontype_select.value;



fetch('/retrocessionnames/' + encodeURI(retrocessiontype.trim()).toString().replaceAll('%','*').replaceAll('/','~')).then(function (response) {
response.json().then(function (data) {
    let optionHTML = '';

    optionHTML += "<option value='addnew'>Ajouter nouveau ?</option>";
    for (let retrocessionname of data.retrocessionnames) {
        optionHTML += '<option value="' + retrocessionname.name + '">' + retrocessionname.name + '</option>';
    }

    retrocessionname_select.innerHTML = optionHTML;
});
});

}


$('#retrocession-nom').change(function(){
    
    if (this.value==='addnew')
    {
    //this.myform['other'].style.visibility='visible'
    $('input[name=retrocessionNomALT]').show()
    $('#nouveaunomlbl').show()
    }
    else {
        $('input[name=retrocessionNomALT]').hide()
        $('#nouveaunomlbl').hide()
    
    };
    
    })
function bulk_delete_retrocession_module()
{
    var array = []
    var checkboxes = document.querySelectorAll('input[name=selectrowretrocession]:checked')
    
    for (var i = 0; i < checkboxes.length; i++) {
        delete_retrocession_item(checkboxes[i].value)
    }
}

function bulk_validate_retrocession_module()
{
    var array = []
    var checkboxes = document.querySelectorAll('input[name=selectrowretrocession]:checked')
    
    for (var i = 0; i < checkboxes.length; i++) {
        validate_retrocession_item(checkboxes[i].value)
    }
}

function edit_retrocession_module_item(id){
    var type2edit = document.getElementById(`modifier-retrocession-type${id}`).value;
    var name2edit = document.getElementById(`modifier-retrocession-nom${id}`).value;
    var ALTname2edit = document.getElementById(`itemname${id}`).value;
    var amount2edit = document.getElementById(`itemamount${id}`).value;
    var date2edit = document.getElementById(`itemdate${id}`).value;
    var comment2edit = document.getElementById(`itemcomment${id}`).value;
    if (name2edit=='addnew'){
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
    "module":"retrocession",
    "newtype":type2edit,
    "newname":name2edit,
    "newamount":amount2edit,
    "newdate":date2edit,
    "newcomment":comment2edit

})
      }).then((response) => {
        return response.json();
      }).then((json) => {
        table.cell( row ,3).data( type2edit ).draw( false );
        table.cell( row ,4).data( name2edit ).draw( false );
        table.cell( row ,5).data( amount2edit ).draw( false );
        table.cell( row ,6).data( date2edit).draw( false );
        table.cell( row ,7).data( comment2edit ).draw( false );
    })    

}

function duplicate_retrocession_item(id){
    /*const response = fetch(`${baseurl}/duplicate_module_item`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id":id,
    "module":"retrocession"})
      }).then((response) => {
        return response.json();
      }).then((json) => {location.reload()})*/
      var row = $(`#${id}`).closest('tr');
      let table = $('#responsiveDataTable').DataTable();
      
      $("#retrocession-type").val(table.cell( row ,3).data())
      fetch('/retrocessionnames/' + encodeURI(table.cell( row ,3).data().trim()).toString().replaceAll('%','*').replaceAll('/','~')).then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '';
        
            optionHTML += "<option value='addnew'>Ajouter nouveau ?</option>";
            for (let retrocessionname of data.retrocessionnames) {
                optionHTML += '<option value="' + retrocessionname.name + '">' + retrocessionname.name + '</option>';
            }
        
            retrocessionname_select.innerHTML = optionHTML;
            $("#retrocession-nom").val(table.cell( row ,4).data())
        });
        });
      
      var amount = table.cell( row ,5).data().replaceAll(",",".").replaceAll(/\s+/g,"")
      $('input[name="somme"]').val((parseFloat(amount)))
      $('input[name="date"]').val(table.cell( row ,6).data())
      $('textarea[name="comment"]').val(table.cell( row ,7).data())
      $("#addretrocessiontModal").modal('show')
}


function delete_retrocession_item(id)
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
    "module":"retrocession"})
      }).then((response) => {
        return response.json();
      }).then((json) => {table.row(row).remove().draw(false);})
}


function validate_retrocession_item(id){
    var row = $(`#${id}`).closest('tr');
    let table = $('#responsiveDataTable').DataTable();
    
    const response = fetch(`${baseurl}/validate_item`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id":id,
    "module":"retrocession"})
      }).then((response) => {
        return response.json();
      }).then((json) => {table.cell( row ,8).data( "Visé" ).draw( false );
      document.getElementById(`validateretrocessionid${id}`).remove()})

}        



function apply_retrocession_filters()
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
        populate_retrocession_table(startDatee.toISOString().split('T')[0],endDatee.toISOString().split('T')[0],montantlower,montanthigher,valid_filter)}, 200);
        //alert(startDatee.toISOString().split('T')[0])
    
}


function populate_retrocession_table(startdte='1900-01-01',enddte='3000-01-01',minamount=0,maxamount=99999999,validefilter='%%')
{


    const response = fetch(`${baseurl}/get_module_data?moduletype=retrocession&startDate=${startdte}&endDate=${enddte}&minamount=${minamount}&maxamount=${maxamount}&validefilter=${validefilter}`).then((response) => {
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
        input_cell.setAttribute("name","selectrowretrocession")
        input_cell.setAttribute("id",`checkboxNoLabel${items[i][0]}`)
        input_cell.setAttribute("value",`${items[i][0]}`)
        input_cell.setAttribute("aria-label","...")
        table_row_header.appendChild(input_cell)
        
    
       

        /*<select class="js-example-basic-single text-muted drop" id="modifier-retrocession-type${items[i][0]}" name="modifier-retrocession-type${items[i][0]}">
                                                            ${retrocessiontypeitems}
                                                        </select>*/


        
        let retrocessiontype_select = document.createElement("select");
        retrocessiontype_select.setAttribute("class","");
        retrocessiontype_select.setAttribute("id",`modifier-retrocession-type${items[i][0]}`);
        retrocessiontype_select.setAttribute("name",`modifier-retrocession-type${items[i][0]}`);
        

        let retrocessionname_select = document.createElement("select");
        retrocessionname_select.setAttribute("class","");
        retrocessionname_select.setAttribute("id",`modifier-retrocession-nom${items[i][0]}`);
        retrocessionname_select.setAttribute("name",`modifier-retrocession-nom${items[i][0]}`);

        let nameopt = document.createElement("option");
        nameopt.value = items[i][2].trim()
        nameopt.innerHTML = items[i][2].trim()
        nameopt.setAttribute("selected","selected");
        retrocessionname_select.appendChild(nameopt)
        
        //retrocessiontype_items.innerHTML=retrocessiontypeitems
        let typeitems = document.getElementById("retrocession-type").options;
        var mydate = new Date(items[i][5]);        
        var dateisostr=mydate.toISOString().split("T")[0];                           
        for (let j=0;j<typeitems.length;j++)
        {
            let opt = document.createElement("option");
            opt.value = typeitems[j].text;
            //alert(typeitems[i].text.trim()+ items[i][1].trim())
            
            if (typeitems[j].text.trim() == items[i][1].trim()){
                
                opt.setAttribute("selected","selected")
            }
            opt.innerHTML = typeitems[j].text;
            retrocessiontype_select.appendChild(opt)
            //alert(typeitems[i].text)
        }



        $(document).on("change", `#modifier-retrocession-type${items[i][0]}`, function(){
            
            var retrocessiontype = $(this).val();
            let index_no = ($(this)[0].id).replace(/^\D+/g, '')
            
            $(`#modifier-retrocession-nom${index_no}`)
    .find('option')
    .remove()
    .end()
            
            fetch('/retrocessionnames/' + encodeURI(retrocessiontype.trim()).toString().replaceAll('%','*').replaceAll('/','~')).then(function (response) {
            response.json().then(function (data) {
                let optionHTML = '';
            
                
                $(`#modifier-retrocession-nom${index_no}`).append("<option value='addnew'>Ajouter nouveau ?</option>")
                for (let retrocessionname of data.retrocessionnames) {
                    
                    
                    $(`#modifier-retrocession-nom${index_no}`).append('<option value="' + retrocessionname.name + '">' + retrocessionname.name + '</option>')
                }
                
                
            });
            });
            
          });
        
      
            
        retrocessiontypeshtml =  retrocessiontype_select.outerHTML
        retrocessionnomhtml =  retrocessionname_select.outerHTML
        



                
        //let retrocessiontype_select = document.getElementById(`modifier-retrocession-type${items[i][0]}`);
        
        //let retrocessionname_select = document.getElementById(`modifier-retrocession-nom${items[i][0]}`);
      
        /*var full_year=items[i][5].getFullYear();
        alert(full_year)*/
        var table_row_functions = document.createElement("td");
        if (items[i][6]=='pasvalide')
        {
            valid_btn=`<a id=validateretrocessionid${items[i][0]} aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-success-light" data-bs-toggle="modal" and data-bs-target="#validateRetrocessionModal${items[i][0]}"><i class="ri-check-line"></i></a>`
        }else
        {
            valid_btn=""
        }
        table_row_functions.innerHTML=`
                                    <div class="hstack gap-2 fs-15">

                                    ${valid_btn}
                                    <a aria-label="anchor" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#editretrocessiontModal${items[i][0]}" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                    <button type="submit" aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow" onclick=duplicate_retrocession_item(${items[i][0]})><i class="ri-file-copy-line"></i></button>
                                    <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deleteretrocessionModal${items[i][0]}" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light" ><i class="ri-delete-bin-line"></i></a>
                                    </div>
                                    
                                    <div class="modal fade mt-4" id="deleteretrocessionModal${items[i][0]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h6 class="modal-title" id="staticBackdropLabel">Delete</h6>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <p>Êtes-vous sûr de vouloir supprimer cette ligne ? <br> ${items[i][1]} - ${items[i][2]}</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-danger deleterow" data-bs-dismiss="modal" onclick=delete_retrocession_item(${items[i][0]})>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal fade mt-4" id="validateRetrocessionModal${items[i][0]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h6 class="modal-title" id="staticBackdropLabel">Validate</h6>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <p>Êtes-vous sûr de vouloir valider cette ligne ? <br> ${items[i][1]} - ${items[i][2]}</p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick=validate_retrocession_item(${items[i][0]})>Validate</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div class="modal fade effect-rotate-left" id="editretrocessiontModal${items[i][0]}">
                                    <div class="modal-dialog modal-dialog-centered text-center" role="document">
                                        <div class="modal-content modal-content-demo">
                                            <div class="modal-header">
                                                <h6 class="modal-title">Modifier retrocession</h6><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div class="modal-body text-start">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <p class="mb-2 text-muted">Type</p>
                                                        ${retrocessiontypeshtml}
                                                        
                                                    </div>
                                                    <div class="col-12 mt-4">
                                                        <p class="mb-2 text-muted">Nom</p>
                                                        ${retrocessionnomhtml}
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
                                                        <p class="mb-2 text-muted">Commentaire</p><textarea class="form-control" id="itemcomment${items[i][0]}">${items[i][4]}</textarea>
                                                    </div>
                                                    <div class="col-12 mt-4">
                                                        <input type="button" class="form-control btn btn-primary" id="input-button" value="Modifier" data-bs-dismiss="modal" onclick=edit_retrocession_module_item(${items[i][0]})>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                    
                                    `
                                            
                                    
                                
                                            //<span class="badge rounded-pill bg-primary-transparent">Installation</span> <span class="badge rounded-pill bg-primary-transparent">Médecins</span> <span class="badge rounded-pill bg-primary-transparent">retrocessions</span> <span class="badge rounded-pill bg-primary-transparent">retrocession</span>
      
                                            

        
    
        
                                                                
                                          
                                            
                                            var valideval = ""                                 
                                            if(items[i][6]=="pasvalide"){
                                                valideval = "à Visé"
                                            }else{
                                                valideval = "Visé"
                                            }
                                            rows2add.push({"DT_RowId":items[i][0],"0":table_row_header.innerHTML,"1": table_row_functions.innerHTML,"2":items[i][0],"3": items[i][1],"4":items[i][2],"5":Intl.NumberFormat('fr-FR').format(items[i][3]),"6":dateisostr,"7":items[i][4],"8":valideval})
        


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





