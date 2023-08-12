$(function (e) {
  'use strict';

  // basic datatable
  $('#datatable-basic').DataTable({
    language: {
      searchPlaceholder: 'Search...',
      sSearch: '',
    },
    "pageLength": 10,
    scrollX: true
  });
  // basic datatable

  // responsive datatable
  $('#responsiveDataTable').DataTable({
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

  // responsive datatable
  // responsive datatable
  $('#responsiveDataTable2').DataTable({
    responsive: true,
    dom: 'Blfrtip',

    language: {
      searchPlaceholder: 'Search...',
      sSearch: '',
    },
    buttons: [
      {
        extend: 'collection',
        text: 'Export',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ],
      }
    ],
    pageLength: 10,
  });
  // responsive datatable
  // responsive modal datatable
  $('#responsivemodal-DataTable').DataTable({
    responsive: {
      details: {
        display: $.fn.dataTable.Responsive.display.modal({
          header: function (row) {
            var data = row.data();
            return data[0] + ' ' + data[1];
          }
        }),
        renderer: $.fn.dataTable.Responsive.renderer.tableAll({
          tableClass: 'table'
        })
      }
    }
  });
  // responsive modal datatable

  // file export datatable
  $('#file-export').DataTable({
    dom: 'Bfrtip',
    buttons: [
      'copy', 'csv', 'excel', 'pdf', 'print'
    ],
    scrollX: true
  });
  // file export datatable

  // delete row datatable
  var table = $('#delete-datatable').DataTable({
    language: {
      searchPlaceholder: 'Search...',
      sSearch: '',
    }
  });
  $('#delete-datatable tbody').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    }
    else {
      table.$('tr.selected').removeClass('selected');
      $(this).addClass('selected');
    }
  });
  $('#button').on("click", function () {
    table.row('.selected').remove().draw(false);
  });
  // delete row datatable

  // scroll vertical 
  $('#scroll-vertical').DataTable({
    scrollY: '265px',
    scrollCollapse: true,
    paging: false,
    scrollX: true,
  });
  // scroll vertical 

  // hidden columns
  $('#hidden-columns').DataTable({
    columnDefs: [
      {
        target: 2,
        visible: false,
        searchable: false,
      },
      {
        target: 3,
        visible: false,
      },
    ],
    "pageLength": 10,
    scrollX: true
  });
  // hidden columns

  // add row datatable
  var t = $('#add-row').DataTable();
  var counter = 1;
  $('#addRow').on('click', function () {
    t.row.add([counter + '.1', counter + '.2', counter + '.3', counter + '.4', counter + '.5']).draw(false);
    counter++;
  });
  // add row datatable

});

