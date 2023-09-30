var baseurl = window.location.origin;

function populate_medicins_table(){


    const response = fetch(`${baseurl}/get_module_data?moduletype=payment&startDate=${startdte}&endDate=${enddte}&minamount=${minamount}&maxamount=${maxamount}&validefilter=${validefilter}`).then((response) => {
        return response.json();
      }).then((json) => {let items = json
    
        var t = $('#responsiveDataTable').DataTable();
        var rows2add=[];
        for (var i=0;i<items.length;i++)
        {

            rows2add.push({"DT_RowId":items[i][0],"0":table_row_header.innerHTML,"1": table_row_functions.innerHTML,"2":items[i][0],"3": items[i][1],"4":items[i][2],"5":items[i][3],"6":dateisostr,"7":items[i][4],"8":items[i][6]})
        }
        t.rows.add(rows2add).draw()
    
    
    });


}