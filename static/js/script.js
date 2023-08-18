async function captureAndConvertToPDF() {
  // Get the content element
  const contentElement = document.getElementById('content');

  // Get the innerHTML of the content element
  const contentHTML = contentElement.innerHTML;

  // Add the logo image to the top of the content
  const logoHTML = '<img src="/images/qOne-logo.png" alt="Logo" style="width: 150px; height: auto;">';
  const contentWithLogoHTML = logoHTML + contentHTML;

  // Convert the HTML to a PDF using html2pdf.js
  const opt = {
    margin: [10, 10, 10, 10], // You can adjust the margins as needed
    filename: 'content_as_pdf.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 }, // You can adjust the scale as needed
    jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape', compressPDF: true },
  };

  await new Promise((resolve) => {
    // For example, wait for 2 seconds (adjust as needed)
    setTimeout(resolve, 2000);
  });

  html2pdf().from(contentWithLogoHTML).set(opt).save();
}


    //datatable

    $(document).ready(function() {
      // Initialize DataTable
      $('#responsiveDataTable').DataTable();
  
      // Select All checkbox click event
      $('#selectAllCheckbox').on('click', function() {
        $('.rowCheckbox').prop('checked', $(this).prop('checked'));
      });
  
      // Row checkbox click event
      $('.rowCheckbox').on('click', function() {
        if ($('.rowCheckbox:checked').length === $('.rowCheckbox').length) {
          $('#selectAllCheckbox').prop('checked', true);
        } else {
          $('#selectAllCheckbox').prop('checked', false);
        }
      });
  
      // Delete Selected button click event
      $('#deleteSelected').on('click', function() {
        const selectedIds = $('.rowCheckbox:checked').map(function() {
          return $(this).val();
        }).get();
        // Now you can perform the delete action using the selectedIds
        console.log('Selected IDs:', selectedIds);
      });
  
      // Active Status button click event
      $('#activeStatus').on('click', function() {
        const selectedIds = $('.rowCheckbox:checked').map(function() {
          return $(this).val();
        }).get();
        // Now you can perform the update status action using the selectedIds
        console.log('Selected IDs:', selectedIds);
      });
  
      // Add more button click event handlers for other bulk actions if needed
    });
//date calendar

function createDatePicker() {
  $('#mainCalendar').daterangepicker({
    locale: {
      format: 'MMM D, YYYY', // Updated date format
      separator: ' - ',     
      applyLabel: 'Appliquer', // Custom "Apply" button label in French
      cancelLabel: 'Annuler', // Custom "Cancel" button label in French
      customRangeLabel: 'Choisir', // Custom label for the custom range option in French
      daysOfWeek: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'], // Custom day labels in French
      monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'], // Custom month labels in French
    },
    ranges: {
      'Aujourd\'hui': [moment(), moment()],
      'Hier': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Les 7 Derniers Jours': [moment().subtract(6, 'days'), moment()],
      'Les 30 Derniers Jours': [moment().subtract(29, 'days'), moment()],
      'Ce Mois': [moment().startOf('month'), moment().endOf('month')],
      'Le Mois Dernier': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment(),
    endDate: moment(),
    showRanges: true, // Show the ranges by default
    showDropdowns: true, // Show year and month dropdowns
    showCustomRangeLabel: true, // Show custom range label
    showCalendars: true // Show the calendars by default
  });

  // Optionally, you can add event listeners to handle date range changes
  $('#mainCalendar').on('apply.daterangepicker', function (ev, picker) {
    console.log('Date de Début : ' + picker.startDate.format('YYYY-MM-DD'));
    console.log('Date de Fin : ' + picker.endDate.format('YYYY-MM-DD'));
    
  });
}

// Wait for the document to fully load before creating the date range picker
$(document).ready(function () {
  createDatePicker();
});

// add popups date 

$(document).ready(function() {
  // Initialize the date picker
  $('#addDatePicker1').daterangepicker({
    singleDatePicker: true, // Display a single date picker
    showDropdowns: true,    // Show year and month dropdowns
    locale: {
      format: 'YYYY-MM-DD'  // Define the date format
    }
  });
});
$(document).ready(function() {
  // Initialize the date picker
  $('#addDatePicker2').daterangepicker({
    singleDatePicker: true, // Display a single date picker
    showDropdowns: true,    // Show year and month dropdowns
    locale: {
      format: 'YYYY-MM-DD'  // Define the date format
    }
  });
});
$(document).ready(function() {
  // Initialize the date picker
  $('#addDatePicker3').daterangepicker({
    singleDatePicker: true, // Display a single date picker
    showDropdowns: true,    // Show year and month dropdowns
    locale: {
      format: 'YYYY-MM-DD'  // Define the date format
    }
  });
});
$(document).ready(function() {
  // Initialize the date picker
  $('#addDatePicker4').daterangepicker({
    singleDatePicker: true, // Display a single date picker
    showDropdowns: true,    // Show year and month dropdowns
    locale: {
      format: 'YYYY-MM-DD'  // Define the date format
    }
  });
});
function loadWidgetById(widgetId, chartData) {
  fetch('widget') // Assuming the widgets are stored in widget.html
    .then(response => response.text())
    .then(data => {
      console.log(data); // Check the content of the data variable
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');

      // Get the specific widget by ID from widget.html
      const selectedWidget = doc.getElementById(widgetId);

      console.log(selectedWidget); // Check if selectedWidget is null or not

      if (selectedWidget) {
                // Append the widget to the widgetContainer in dashboard.html
                const widgetContainer = document.getElementById('widgetContainer');
                widgetContainer.appendChild(selectedWidget.cloneNode(true));
            } else {
                console.error('Widget not found');
            }
    })
    .catch(error => console.error('Error loading widget:', error));
}
// Function to dynamically populate the dropdown options with widget ids
function populateDropdownOptions() {
  fetch('widget')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');

      const widgetDropdown = document.getElementById('widgetDropdown');
      widgetDropdown.innerHTML = '';

      // Get all widget ids from widget.html
      const widgetIds = Array.from(doc.querySelectorAll('[id^="kpi-"]')).map(widget => widget.id);

      // Create and add the dropdown options
      widgetIds.forEach(widgetId => {
        const option = document.createElement('option');
        option.value = widgetId;
        option.textContent = widgetId;
        widgetDropdown.appendChild(option);
      });
    })
    .catch(error => console.error('Error populating dropdown options:', error));
}

// Add event listener to the "Load Widget" button
const loadWidgetsBtn = document.getElementById('loadWidgetsBtn');
loadWidgetsBtn.addEventListener('click', function () {
  const widgetId = document.getElementById('widgetDropdown').value;
  const chartData = JSON.parse(localStorage.getItem('apexChartData'));
  loadWidgetById(widgetId, chartData);
});

// Add event listener to the "Save Dashboard" button
const saveDashboardBtn = document.getElementById('saveDashboardBtn');
saveDashboardBtn.addEventListener('click', function () {
  const widgetContainer = document.getElementById('widgetContainer');
  const dashboardContent = widgetContainer.innerHTML;
  localStorage.setItem('dashboard', dashboardContent);
  alert('Dashboard saved successfully!');
});

// Populate the dropdown options on page load
populateDropdownOptions();

// Load the saved dashboard content from LocalStorage on page load
document.addEventListener('DOMContentLoaded', function () {
  const savedDashboard = localStorage.getItem('dashboard');
  if (savedDashboard) {
    const widgetContainer = document.getElementById('widgetContainer');
    widgetContainer.innerHTML = savedDashboard;
  }
});


// active header
    document.addEventListener('DOMContentLoaded', function() {
      // Get the current page's URL (you may need to modify this based on your project's URL structure)
      var currentPageUrl = window.location.href;

      // Get all the anchor links in the header
      var navLinks = document.querySelectorAll('.header-element .header-link');

      // Loop through the anchor links to find the one that matches the current page's URL
      for (var i = 0; i < navLinks.length; i++) {
        var linkUrl = navLinks[i].getAttribute('href');
        if (currentPageUrl.includes(linkUrl)) {
          // Add the "active" class to the matching header item
          navLinks[i].classList.add('active');
          break; // Stop the loop once we find the matching link
        }
      }
    });


