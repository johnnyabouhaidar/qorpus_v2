$(function (e) {

var numberElements = document.querySelectorAll('.number');

// Iterate through each element and format its content
numberElements.forEach(function(element) {
  // Get the text content and remove any existing thousands separators
  var numberText = element.textContent.replace(/,/g, '');

  // Parse the number as a float
  var number = parseFloat(numberText);

  // Check if the number has decimal places
  if (Number.isInteger(number)) {
    // If it's an integer, format without any decimal places
    var formattedNumber = number.toLocaleString('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  } else {
    // If it has decimal places, format with one decimal digit
    var formattedNumber = number.toLocaleString('fr-FR', { minimumFractionDigits: 1 });
  }

  // Update the content of the element with the new format
  element.textContent = formattedNumber;
});
  'use strict';
  var type = false;
  var nom = false;
  var montant = false;
  // responsive datatable
  const d = new Date();
  var table = $('#responsiveDataTable').DataTable({
    order: [],
    responsive: true,
    scrollCollapse: true,
   scrollY: '400px',
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
          {
            extend: 'excelHtml5',
            title: `${document.title} - ${d.getMonth()}${d.getDay()}${d.getFullYear()}-${d.getHours()}${d.getMinutes()}${d.getSeconds()}`
        },
          'copy', 'pdf', 'print'
        ],

      },
      
    ],
    pageLength: 10,
  
    drawCallback: function (settings) {
      // call the pivot tables for the 3 buttons type, nom and montant  
      if (type) {
        var api = this.api();
        var rows = api.rows({ page: 'all' }).nodes();
        var last = null;

        api.column(3, { page: 'all' })
          .data()
          .each(function (group, i) {
            if (last !== group) {
              var groupSum = 0; // Initialize sum for the group
              var groupRows = api.rows({ page: 'all', search: 'applied' })
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
        var rows = api.rows({ page: 'all' }).nodes();
        var last = null;

        api.column(4, { page: 'all' })
          .data()
          .each(function (group, i) {
            if (last !== group) {
              var groupSum = 0; // Initialize sum for the group
              var groupRows = api.rows({ page: 'all', search: 'applied' })
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
        var rows = api.rows({ page: 'all' }).nodes();
        var last = null;

        api.column(5, { page: 'all' })
          .data()
          .each(function (group, i) {
            if (last !== group) {
              var groupSum = 0; // Initialize sum for the group
              var groupRows = api.rows({ page: 'all', search: 'applied' })
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
        .column(sumColumnIndex, { page: 'all' })
        .data()
        .reduce(function (a, b) {
          // Ensure both a and b are strings
          var aValue = typeof a === 'string' ? a : a.toString();
          var bValue = typeof b === 'string' ? b : b.toString();
    
          // Remove non-breaking spaces
          aValue = aValue.replace('\u202F', '');
          bValue = bValue.replace('\u202F', '');
    
          // Replace the French decimal separator (comma) with a dot before parsing
          aValue = aValue.replace(',', '.');
          bValue = bValue.replace(',', '.');
    
          // Parse as float
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
    
          return aValue + bValue;
        }, 0);
    
      // Format the sum with French formatting
      var formattedSum = sum.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
      // Update the element with the formatted sum
      $('.table-somme-amount').html(formattedSum);
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
    table.page.len(-1);
    // Sort by the third column in ascending order 
    table.order([3, 'asc']).draw();
    type = true;
    nom = false;
    montant = false;
    table.draw();
    $('#responsiveDataTable tbody').off('click', 'tr.group'); // Unbind previous click event
    toggleGroupAndChildRows();
  });

  $('#nomButton').click(function () {
    table.page.len(-1);
    table.order([4, 'asc']).draw();
    table.scrollY = '100%'; // Set the scroll height to '100%'
    nom = true;
    type = false;
    montant = false;
    table.draw();
    $('#responsiveDataTable tbody').off('click', 'tr.group'); // Unbind previous click event
    toggleGroupAndChildRows();
  });

  $('#montantButton').click(function () {

    table.page.len(-1);
    table.order([5, 'asc']).draw();
    table.scrollY = '100%'; // Set the scroll height to '100%'
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
    scrollCollapse: true,
    scrollY: '400px',
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



