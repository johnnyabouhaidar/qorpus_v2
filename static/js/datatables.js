$(function (e) {
  'use strict';
  var type = false;
  var nom = false;
  var montant = false;
  // responsive datatable
  var table = $('#responsiveDataTable').DataTable({
    order: [],
    responsive: true,
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
                  '<td colspan="3" class="group-bg"><span class="group-sum">' + groupSum.toFixed(2) + '</span>' +
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
                  '<td colspan="3" class="group-bg"><span class="group-sum">' + groupSum.toFixed(2) + '</span>' +
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
                  '<td colspan="3" class="group-bg"><span class="group-sum">' + groupSum.toFixed(2) + '</span>' +
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
// open the rows pivot to show the specific datatable of each one
  function toggleGroupAndChildRows() {
    $('#responsiveDataTable tbody tr.group').each(function () {
      var groupRow = $(this);
      // Get the rows within the current group
      var groupRows = groupRow.nextUntil('tr.group');

      // Initially hide child rows
      groupRows.addClass('d-none');
    });

    $('#responsiveDataTable tbody').on('click', 'tr.group', function () {
      var groupRow = $(this);
      // Get the rows within the current group
      var groupRows = groupRow.nextUntil('tr.group');

      // Toggle the class for child rows in the group  
      groupRows.toggleClass('d-none');
    });
  }


  // acive buttons change background color  
  var buttons = $('.sortButton');

  buttons.click(function () {
    buttons.removeClass('activeButton');
    $(this).addClass('activeButton');

  });
  // 3 buttons on click
  $('#typeButton').click(function () {

    table.order([3, 'asc']).draw();
    type = true;
    nom = false;
    montant = false;
    table.draw();
    $('#responsiveDataTable tbody').off('click', 'tr.group'); // Unbind previous click event
    toggleGroupAndChildRows();
  });

  $('#nomButton').click(function () {
    table.order([4, 'asc']).draw();
    nom = true;
    type = false;
    montant = false;
    table.draw();
    $('#responsiveDataTable tbody').off('click', 'tr.group'); // Unbind previous click event
    toggleGroupAndChildRows();
  });

  $('#montantButton').click(function () {
    table.order([5, 'asc']).draw();
    montant = true;
    nom = false;
    type = false;
    table.draw();
    $('#responsiveDataTable tbody').off('click', 'tr.group'); // Unbind previous click event
    toggleGroupAndChildRows();
  });

// filter button
  $('#clearFilterButton').click(function () {
    location.reload();
  });
// delete Selected Rows (bulk delete)
  $('#deleteSelectedRowsButton').click(function () {
    var selectedRows = $('#responsiveDataTable tbody .rowCheckbox:checked').closest('tr');

    // Remove the selected rows from the DataTable
    table.rows(selectedRows).remove().draw();
  });

// delete a specific row with modal
  $('.deleterow').on('click', function () {
    var tablename = $(this).closest('table').DataTable();
    var button = this; // Store the reference to the button
    var row = $(button).closest('tr'); // Get the closest row

    // Wait for 1 second before removing the row
    setTimeout(function () {
      tablename.row(row).remove().draw();
    }, 1500);
  });

// duplicate a specific row 
  $('.duplicaterow').on('click', function () {
    var table = $(this).closest('table').DataTable();
    var button = this;
    var row = $(button).closest('tr');
    var clonedRow = row.clone(); // Clone the row

    // Insert the cloned row after the original row
    table.row.add(clonedRow);

    // Sort the table by column 3 in descending order
    table.order([[3, 'asc']]);

    // Redraw the table to apply the sorting
    table.draw();
  });

});






//table for gestion des types & add doctors


$(function (e) {
  'use strict';

  var table = $('#responsiveDataTable2').DataTable({
    order: [],
    responsive: true,
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

  })

  $('#deleteSelectedRowsButton').click(function () {
    var selectedRows = $('#responsiveDataTable2 tbody .rowCheckbox:checked').closest('tr');

    // Remove the selected rows from the DataTable
    table.rows(selectedRows).remove().draw();
  });

  $('.deleterow').on('click', function () {
    var tablename = $(this).closest('table').DataTable();
    var button = this; // Store the reference to the button
    var row = $(button).closest('tr'); // Get the closest row

    // Wait for 1 second before removing the row
    setTimeout(function () {
      tablename.row(row).remove().draw();
    }, 1500);
  });

  // used in add doctors percentage share
  $('.duplicaterow2').on('click', function () {
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
  });
});



