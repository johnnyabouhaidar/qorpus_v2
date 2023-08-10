
async function populate_table(){
    const response = await fetch("http://localhost:5000/get_users_data");
    const users = await response.json();
    //console.log(users);
    var tabe_body = document.createElement("body");
    for (var i=0;i<users.length;i++)
    {
        
        var table_row= document.createElement("tr");
        var table_row_header = document.createElement("th");
        table_row_header.setAttribute("class","form-check-input rowCheckbox")
        table_row_header.setAttribute("type","checkbox")
        table_row_header.setAttribute("id","checkboxNoLabel22")
        table_row_header.setAttribute("value","")
        table_row_header.setAttribute("aria-label","...")

        var table_row_functions = document.createElement("td");
        table_row_functions.innerHTML=`
                                    <div class="hstack gap-2 fs-15">

                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light"><i class="ri-file-copy-line"></i></a>
                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                    </div>`
                                
        table_row.appendChild(table_row_header)
        table_row.appendChild(table_row_functions)

        rowitem=document.createElement("td")
        rowitem.innerHTML=users[i][0]//id
        table_row.appendChild(rowitem)
        rowitem=document.createElement("td")
        rowitem.innerHTML=users[i][1]//user
        table_row.appendChild(rowitem)
        rowitem=document.createElement("td")
        rowitem.innerHTML=users[i][2]//pass
        table_row.appendChild(rowitem)
        rowitem=document.createElement("td")
        rowitem.innerHTML=users[i][3]//role
        table_row.appendChild(rowitem)

        

    }
    table_body.appendChild(table_row)

    //console.log(table_row.innerHTML)

    //return table_body
    var table_element = document.getElementById("responsiveDataTable");
    table_element.appendChild(table_body)
    
    console.log(tabble_body.innerHTML)
}