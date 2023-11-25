
var baseurl = window.location.origin;


let vershontype_select = document.getElementById('vershon-type');
        
let vershonname_select = document.getElementById('vershon-nom');

vershontype_select.onchange = function () {
vershontype = vershontype_select.value;



fetch('/vershonnames/' + encodeURI(vershontype.trim()).toString().replaceAll('%','*').replaceAll('/','~')).then(function (response) {
response.json().then(function (data) {
    let optionHTML = '';

    optionHTML += "<option value='addnew'>Ajouter nouveau ?</option>";
    for (let vershonname of data.vershonnames) {
        optionHTML += '<option value="' + vershonname.name + '">' + vershonname.name + '</option>';
    }

    vershonname_select.innerHTML = optionHTML;
});
});

}


$('#vershon-nom').change(function(){
    
    if (this.value==='addnew')
    {
    //this.myform['other'].style.visibility='visible'
    $('input[name=vershonNomALT]').show()
    $('#nouveaunomlbl').show()
    }
    else {
        $('input[name=vershonNomALT]').hide()
        $('#nouveaunomlbl').hide()
    
    };
    
    })
function bulk_delete_vershon_module()
{
    var array = []
    var checkboxes = document.querySelectorAll('input[name=selectrowvershon]:checked')
    
    for (var i = 0; i < checkboxes.length; i++) {
        delete_vershon_item(checkboxes[i].value)
    }
}

function bulk_validate_vershon_module()
{
    var array = []
    var checkboxes = document.querySelectorAll('input[name=selectrowvershon]:checked')
    
    for (var i = 0; i < checkboxes.length; i++) {
        validate_vershon_item(checkboxes[i].value)
    }
}

function edit_vershon_module_item(id){
    var type2edit = document.getElementById(`modifier-vershon-type${id}`).value;
    var name2edit = document.getElementById(`modifier-vershon-nom${id}`).value;
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
    "module":"vershon",
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

function duplicate_vershon_item(id){
    /*const response = fetch(`${baseurl}/duplicate_module_item`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id":id,
    "module":"vershon"})
      }).then((response) => {
        return response.json();
      }).then((json) => {location.reload()})*/
      var row = $(`#${id}`).closest('tr');
      let table = $('#responsiveDataTable').DataTable();
      
      $("#vershon-type").val(table.cell( row ,3).data())
      fetch('/vershonnames/' + encodeURI(table.cell( row ,3).data().trim()).toString().replaceAll('%','*').replaceAll('/','~')).then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '';
        
            optionHTML += "<option value='addnew'>Ajouter nouveau ?</option>";
            for (let vershonname of data.vershonnames) {
                optionHTML += '<option value="' + vershonname.name + '">' + vershonname.name + '</option>';
            }
        
            vershonname_select.innerHTML = optionHTML;
            $("#vershon-nom").val(table.cell( row ,4).data())
        });
        });
      
      $('input[name="somme"]').val(table.cell( row ,5).data())
      $('input[name="date"]').val(table.cell( row ,6).data())
      $('textarea[name="comment"]').val(table.cell( row ,7).data())
      $("#addvershontModal").modal('show')
}


function delete_vershon_item(id)
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
    "module":"vershon"})
      }).then((response) => {
        return response.json();
      }).then((json) => {table.row(row).remove().draw(false);})
}


function validate_vershon_item(id){
    var row = $(`#${id}`).closest('tr');
    let table = $('#responsiveDataTable').DataTable();
    
    const response = fetch(`${baseurl}/validate_item`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"id":id,
    "module":"vershon"})
      }).then((response) => {
        return response.json();
      }).then((json) => {table.cell( row ,8).data( "Visé" ).draw( false );
      document.getElementById(`validatevershonid${id}`).remove()})

}        



function apply_vershon_filters()
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
        populate_vershon_table(startDatee.toISOString().split('T')[0],endDatee.toISOString().split('T')[0],montantlower,montanthigher,valid_filter)}, 200);
        //alert(startDatee.toISOString().split('T')[0])
    
}


function populate_vershon_table(startdte='1900-01-01',enddte='3000-01-01',minamount=0,maxamount=99999999,validefilter='%%')
{


    const response = fetch(`${baseurl}/get_module_data?moduletype=vershon&startDate=${startdte}&endDate=${enddte}&minamount=${minamount}&maxamount=${maxamount}&validefilter=${validefilter}`).then((response) => {
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
        input_cell.setAttribute("name","selectrowvershon")
        input_cell.setAttribute("id",`checkboxNoLabel${items[i][0]}`)
        input_cell.setAttribute("value",`${items[i][0]}`)
        input_cell.setAttribute("aria-label","...")
        table_row_header.appendChild(input_cell)
        
    
       

        /*<select class="js-example-basic-single text-muted drop" id="modifier-vershon-type${items[i][0]}" name="modifier-vershon-type${items[i][0]}">
                                                            ${vershontypeitems}
                                                        </select>*/


        
        let vershontype_select = document.createElement("select");
        vershontype_select.setAttribute("class","");
        vershontype_select.setAttribute("id",`modifier-vershon-type${items[i][0]}`);
        vershontype_select.setAttribute("name",`modifier-vershon-type${items[i][0]}`);
        

        let vershonname_select = document.createElement("select");
        vershonname_select.setAttribute("class","");
        vershonname_select.setAttribute("id",`modifier-vershon-nom${items[i][0]}`);
        vershonname_select.setAttribute("name",`modifier-vershon-nom${items[i][0]}`);

        let nameopt = document.createElement("option");
        nameopt.value = items[i][2].trim()
        nameopt.innerHTML = items[i][2].trim()
        nameopt.setAttribute("selected","selected");
        vershonname_select.appendChild(nameopt)
        
        //vershontype_items.innerHTML=vershontypeitems
        let typeitems = document.getElementById("vershon-type").options;
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
            vershontype_select.appendChild(opt)
            //alert(typeitems[i].text)
        }



        $(document).on("change", `#modifier-vershon-type${items[i][0]}`, function(){
            
            var vershontype = $(this).val();
            let index_no = ($(this)[0].id).replace(/^\D+/g, '')
            
            $(`#modifier-vershon-nom${index_no}`)
    .find('option')
    .remove()
    .end()
            
            fetch('/vershonnames/' + encodeURI(vershontype.trim()).toString().replaceAll('%','*').replaceAll('/','~')).then(function (response) {
            response.json().then(function (data) {
                let optionHTML = '';
            
                
                $(`#modifier-vershon-nom${index_no}`).append("<option value='addnew'>Ajouter nouveau ?</option>")
                for (let vershonname of data.vershonnames) {
                    
                    
                    $(`#modifier-vershon-nom${index_no}`).append('<option value="' + vershonname.name + '">' + vershonname.name + '</option>')
                }
                
                
            });
            });
            
          });
        
      
            
        vershontypeshtml =  vershontype_select.outerHTML
        vershonnomhtml =  vershonname_select.outerHTML
        



                
        //let vershontype_select = document.getElementById(`modifier-vershon-type${items[i][0]}`);
        
        //let vershonname_select = document.getElementById(`modifier-vershon-nom${items[i][0]}`);
      
        /*var full_year=items[i][5].getFullYear();
        alert(full_year)*/
        var table_row_functions = document.createElement("td");
        if (items[i][6]=='pasvalide')
        {
            valid_btn=`<a id=validatevershonid${items[i][0]} aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-success-light" data-bs-toggle="modal" and data-bs-target="#validatevershonModal${items[i][0]}"><i class="ri-check-line"></i></a>`
        }else
        {
            valid_btn=""
        }
        table_row_functions.innerHTML=`
                                    <div class="hstack gap-2 fs-15">

                                    ${valid_btn}
                                    <a aria-label="anchor" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#editvershontModal${items[i][0]}" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                    <button type="submit" aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow" onclick=duplicate_vershon_item(${items[i][0]})><i class="ri-file-copy-line"></i></button>
                                    <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deletevershonModal${items[i][0]}" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light" ><i class="ri-delete-bin-line"></i></a>
                                    </div>
                                    
                                    <div class="modal fade mt-4" id="deletevershonModal${items[i][0]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h6 class="modal-title" id="staticBackdropLabel">Delete</h6>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <p>Are you sure do you want to delete this row? <br> ${items[i][1]} - ${items[i][2]}</p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-danger deleterow" data-bs-dismiss="modal" onclick=delete_vershon_item(${items[i][0]})>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal fade mt-4" id="validatevershonModal${items[i][0]}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h6 class="modal-title" id="staticBackdropLabel">Validate</h6>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <p>Are you sure do you want to validate this row? <br> ${items[i][1]} - ${items[i][2]}</p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick=validate_vershon_item(${items[i][0]})>Validate</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <div class="modal fade effect-rotate-left" id="editvershontModal${items[i][0]}">
                                    <div class="modal-dialog modal-dialog-centered text-center" role="document">
                                        <div class="modal-content modal-content-demo">
                                            <div class="modal-header">
                                                <h6 class="modal-title">Modifier vershon</h6><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div class="modal-body text-start">
                                                <div class="row">
                                                    <div class="col-12">
                                                        <p class="mb-2 text-muted">Type</p>
                                                        ${vershontypeshtml}
                                                        
                                                    </div>
                                                    <div class="col-12 mt-4">
                                                        <p class="mb-2 text-muted">Nom</p>
                                                        ${vershonnomhtml}
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
                                                        <input type="button" class="form-control btn btn-primary" id="input-button" value="Modifier" data-bs-dismiss="modal" onclick=edit_vershon_module_item(${items[i][0]})>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>                                    
                                    `
                                            
                                    
                                
                                            //<span class="badge rounded-pill bg-primary-transparent">Installation</span> <span class="badge rounded-pill bg-primary-transparent">Médecins</span> <span class="badge rounded-pill bg-primary-transparent">vershons</span> <span class="badge rounded-pill bg-primary-transparent">vershon</span>
      
                                            

        
    
        
                                                                
                                          
                                            
                                            var valideval = ""                                 
                                            if(items[i][6]=="pasvalide"){
                                                valideval = "à Visé"
                                            }else{
                                                valideval = "Visé"
                                            }
                                            rows2add.push({"DT_RowId":items[i][0],"0":table_row_header.innerHTML,"1": table_row_functions.innerHTML,"2":items[i][0],"3": items[i][1],"4":items[i][2],"5":items[i][3],"6":dateisostr,"7":items[i][4],"8":valideval})
        


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





