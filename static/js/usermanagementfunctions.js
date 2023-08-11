baseurl = window.location.origin
function populate_table(){
    const response = fetch(`${baseurl}/get_users_data`).then((response) => {
        return response.json();
      }).then((json) => {let users = json
      console.log(users)

    var table_body = document.createElement("tbody");
    var table_element = document.getElementById("responsiveDataTable");
    tbodyelement = document.getElementById("bodyid");

    for (var i=0;i<users.length;i++)
    {

        var table_row_header = document.createElement("th");
        table_row_header.setAttribute("class","dtr-control sorting_1");
        table_row_header.setAttribute("tabindex","0");
        var input_cell = document.createElement("input")
        input_cell.setAttribute("class","form-check-input rowCheckbox")
        input_cell.setAttribute("type","checkbox")
        input_cell.setAttribute("id","checkboxNoLabel22")
        input_cell.setAttribute("value","")
        input_cell.setAttribute("aria-label","...")
        table_row_header.appendChild(input_cell)

        var table_row_functions = document.createElement("td");
        table_row_functions.innerHTML=`
                                    <div class="hstack gap-2 fs-15">

                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light"><i class="ri-file-copy-line"></i></a>
                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                    </div>`
                                


        var t = $('#responsiveDataTable').DataTable();
        t.row.add([table_row_header.innerHTML, table_row_functions.innerHTML,users[i][0], users[i][1],"","",users[i][3],'7','8']).draw(false);

    }
    


});
}