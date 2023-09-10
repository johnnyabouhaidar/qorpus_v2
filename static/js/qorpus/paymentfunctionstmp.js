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
    

    var valid_filter = document.getElementById("filterselect").value
    
    var montantlower=document.getElementById("lower-value").innerText
    var montanthigher=document.getElementById("upper-value").innerText
    
    const myTimeout = setTimeout(function(){var table = $('table').DataTable();
 
    table
        .clear()
        .draw();
        populate_payment_table(startDatee.toISOString().split('T')[0],endDatee.toISOString().split('T')[0],montantlower,montanthigher,valid_filter)}, 200);
    //alert(montanthigher)
    //populate_payment_table(startDatee.toISOString().split('T')[0],endDatee.toISOString().split('T')[0],montantlower,montanthigher,valid_filter)
    
        //alert(startDatee.toISOString().split('T')[0])
    
}


var type = false;
var nom = false;
var montant = false;
// responsive datatable
var table2 = $('#responsiveDataTablepayment').DataTable({
    order: [],
    responsive: true, // Make the table responsive if needed
    
    serverSide: true,
    dom: 'Blfrtip',
    language: {
      searchPlaceholder: 'Search...',
      sSearch: '',
    },
    buttons: [
      {
        extend: 'collection',
        text: 'Exporter',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ],
      }
    ],
  pageLength: 10,
   ajax:{},
    columns: [
        // Checkbox column
        {
            data: null,
            orderable: false,
            searchable: false,
            render: function (data, type, row) {
                return '<input class="form-check-input rowCheckbox" type="checkbox" value="' + data.id + '" />';
            },
        },
        // Action column
        {
            data: null,
            orderable: false,
            searchable: false,
            render: function (data, type, row) {
                return `
                    <div class="hstack gap-2 fs-15">
                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-success-light "><i class="ri-check-line"></i></a>
                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow "><i class="ri-file-copy-line"></i></a>
                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                    </div>
                `;
            },
        },
        { data: 0 },
        { data: 1 },
        { data: 2 },
        { data: 3 },
        { data: 4 },
        { data: 5 },
        { data: 6 },
    ],
    
    drawCallback: function (settings) {
       // call the pivot tables for the 3 buttons type, nom and montant  
      if (type) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;

        api.column(3, { page: 'current' })
          .data()
          .each(function (group, i) {
            if (last !== group) {
              var groupSum = 0; // Initialize sum for the group
              var groupRows = api.rows({ page: 'current', search: 'applied' })
                .nodes()
                .toArray()
                .filter(function (row) {
                  return api.cell(row, 3).data() === group;
                });

              groupRows.forEach(function (row) {
                var value = parseFloat(api.cell(row, 5).data());
                groupSum += isNaN(value) ? 0 : value;
              });

              $(rows)
                .eq(i)
                .before(
                  '<tr class="group"><td colspan="5" class="group-bg">' +
                  '<i class="bx bx-chevron-right" style="font-size:18px; margin-right:10px; margin-top:5px"></i>' +
                  group + '</td>' +
                  '<td colspan="4" class="group-bg"><span class="group-sum">' + groupSum.toFixed(2) + '</span>' +
                  '</td></tr>'
                );

              last = group;
            }
          });
      }
      if (nom) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;

        api.column(4, { page: 'current' })
          .data()
          .each(function (group, i) {
            if (last !== group) {
              var groupSum = 0; // Initialize sum for the group
              var groupRows = api.rows({ page: 'current', search: 'applied' })
                .nodes()
                .toArray()
                .filter(function (row) {
                  return api.cell(row, 4).data() === group;
                });

              groupRows.forEach(function (row) {
                var value = parseFloat(api.cell(row, 5).data());
                groupSum += isNaN(value) ? 0 : value;
              });

              $(rows)
                .eq(i)
                .before(
                  '<tr class="group"><td colspan="5" class="group-bg">' +
                  '<i class="bx bx-chevron-right" style="font-size:18px; margin-right:10px; margin-top:5px"></i>' +
                  group + '</td>' +
                  '<td colspan="4" class="group-bg"><span class="group-sum">' + groupSum.toFixed(2) + '</span>' +
                  '</td></tr>'
                );
              last = group;
            }
          });
      }

      if (montant) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;

        api.column(5, { page: 'current' })
          .data()
          .each(function (group, i) {
            if (last !== group) {
              var groupSum = 0; // Initialize sum for the group
              var groupRows = api.rows({ page: 'current', search: 'applied' })
                .nodes()
                .toArray()
                .filter(function (row) {
                  return api.cell(row, 5).data() === group;
                });

              groupRows.forEach(function (row) {
                var value = parseFloat(api.cell(row, 5).data());
                groupSum += isNaN(value) ? 0 : value;
              });

              $(rows)
                .eq(i)
                .before(
                  '<tr class="group"><td colspan="5" class="group-bg">' +
                  '<i class="bx bx-chevron-right" style="font-size:18px; margin-right:10px; margin-top:5px"></i>' +
                  group + '</td>' +
                  '<td colspan="4" class="group-bg"><span class="group-sum">' + groupSum.toFixed(2) + '</span>' +
                  '</td></tr>'
                );

              last = group;
            }
          });
      }
    },
    footerCallback: function (row, data, start, end, display) {
      var api = this.api();
      var sumColumnIndex = 5;

      var sum = api
        .column(sumColumnIndex, { page: 'current' })
        .data()
        .reduce(function (a, b) {
          return parseFloat(a) + parseFloat(b);
        }, 0);
// somme of montant in the footer 
      $('.table-somme-amount').html(sum.toFixed(2));
    }
  });
  function toggleGroupAndChildRows() {
    $('#responsiveDataTablepayment tbody tr.group').each(function () {
      var groupRow = $(this);
      // Get the rows within the current group
      var groupRows = groupRow.nextUntil('tr.group');

      // Initially hide child rows
      groupRows.addClass('d-none');
    });

    $('#responsiveDataTablepayment tbody').on('click', 'tr.group', function () {
      var groupRow = $(this);
      // Get the rows within the current group
      var groupRows = groupRow.nextUntil('tr.group');

      // Toggle the class for child rows in the group  
      groupRows.toggleClass('d-none');
    });
  }
  
function populate_payment_table(startdte='1900-01-01',enddte='3000-01-01',minamount=0,maxamount=99999999,validefilter='')
{


    
    table2.ajax.url(`${baseurl}/get_module_data?moduletype=payment&startDate=${startdte}&endDate=${enddte}&minamount=${minamount}&maxamount=${maxamount}&validefilter=${validefilter}`).load()
    
    //table2.ajax.reload()
    // Handle payment type change


}

/*        ajax: {
            url: ,
            type: 'GET',
            
        },
        columns: [
            // Checkbox column
            {
                data: null,
                orderable: false,
                searchable: false,
                render: function (data, type, row) {
                    return '<input class="form-check-input rowCheckbox" type="checkbox" value="' + data[0] + '" />';
                },
            },
            // Action column
            {
                data: null,
                orderable: false,
                searchable: false,
                render: function (data, type, row) {
                    return `
                        <div class="hstack gap-2 fs-15">
                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-success-light "><i class="ri-check-line"></i></a>
                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow "><i class="ri-file-copy-line"></i></a>
                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                        </div>
                    `;
                },
            },
            { data: 0 },
            { data: 1 },
            { data: 2 },
            { data: 3 },
            { data: 4 },
            { data: 5 },
        ], */


