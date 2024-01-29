//convert pages to pdf
async function captureAndConvertToPDF() {
  // Get the content element
  const contentElement = document.getElementById('content');

  // Get the innerHTML of the content element
  const contentHTML = contentElement.innerHTML;
  // Add the logo image to the top of the content
  const logoHTML = '<img src="/images/qOne-logo.png" alt="Logo" style="width: 150px; height: auto;"><br>';

  // Capture an image of the datepicker using html2canvas
  const datepickerCanvas = await html2canvas(document.getElementById('mainCalendar'));
  const datepickerImage = datepickerCanvas.toDataURL('image/jpeg');

  // Create an image element with the datepicker image
  const datepickerImageElement = `<img src="${datepickerImage}" alt="Datepicker" style="max-width: 100%; margin-top:30px">`;

  // Combine all the content including images
  const contentWithImagesHTML = `
    ${logoHTML}
    ${datepickerImageElement}
    ${contentHTML}
  `;

  // Convert the HTML to a PDF using html2pdf.js
  const opt = {
    margin: [10, 10, 10, 10], // You can adjust the margins as needed
    filename: 'content_as_pdf.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 1 }, // You can adjust the scale as needed
    jsPDF: { unit: 'mm', format: 'a3', orientation: 'portrait', compressPDF: true },
  };

  await new Promise((resolve) => {
    // For example, wait for 2 seconds (adjust as needed)
    setTimeout(resolve, 2000);
  });

  html2pdf().from(contentWithImagesHTML).set(opt).save();
}


//datatable checkbox

$(document).ready(function () {
  // Initialize DataTable
  $('#responsiveDataTable').DataTable();

  // Select All checkbox click event
  $('#selectAllCheckbox').on('click', function () {
    $('.rowCheckbox').prop('checked', $(this).prop('checked'));
  });

  // Row checkbox click event
  $('.rowCheckbox').on('click', function () {
    if ($('.rowCheckbox:checked').length === $('.rowCheckbox').length) {
      $('#selectAllCheckbox').prop('checked', true);
    } else {
      $('#selectAllCheckbox').prop('checked', false);
    }
  });



  // Active Status button click event
  $('#activeStatus').on('click', function () {
    const selectedIds = $('.rowCheckbox:checked').map(function () {
      return $(this).val();
    }).get();
    // Now you can perform the update status action using the selectedIds
    console.log('Selected IDs:', selectedIds);
  });

  // Add more button click event handlers for other bulk actions if needed
});


//date calendar
function createDatePicker() {
  /*$('#mainCalendar').daterangepicker({
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
    startDate: moment().startOf('year'), // for example, 7 days ago
    endDate: moment().endOf('year'),
    showRanges: true, // Show the ranges by default
    showDropdowns: true, // Show year and month dropdowns
    showCustomRangeLabel: true, // Show custom range label
    showCalendars: true // Show the calendars by default
  });*/

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
// i have many datepicker because if you have many on the same page the same id didn't work
$(document).ready(function () {
  // Initialize the date picker
  $('#addDatePicker1').daterangepicker({
    singleDatePicker: true, // Display a single date picker
    showDropdowns: true,    // Show year and month dropdowns
    locale: {
      format: 'YYYY-MM-DD'  // Define the date format
    }
  });
});
$(document).ready(function () {
  // Initialize the date picker
  $('#addDatePicker2').daterangepicker({
    singleDatePicker: true, // Display a single date picker
    showDropdowns: true,    // Show year and month dropdowns
    locale: {
      format: 'YYYY-MM-DD'  // Define the date format
    }
  });
});
$(document).ready(function () {
  // Initialize the date picker
  $('#addDatePicker3').daterangepicker({
    singleDatePicker: true, // Display a single date picker
    showDropdowns: true,    // Show year and month dropdowns
    locale: {
      format: 'YYYY-MM-DD'  // Define the date format
    }
  });
});
$(document).ready(function () {
  // Initialize the date picker
  $('#addDatePicker4').daterangepicker({
    singleDatePicker: true, // Display a single date picker
    showDropdowns: true,    // Show year and month dropdowns
    locale: {
      format: 'YYYY-MM-DD'  // Define the date format
    }
  });
});
$(document).ready(function () {
  // Initialize the date picker
  $('#datedebut').daterangepicker({
    singleDatePicker: true, // Display a single date picker
    showDropdowns: true,    // Show year and month dropdowns
    locale: {
      format: 'DD.MM.YYYY'  // Define the date format
    }
    
  });
});
$(document).ready(function () {
  // Initialize the date picker
  $('#addsalairedate').daterangepicker({
    singleDatePicker: true, // Display a single date picker
    showDropdowns: true,    // Show year and month dropdowns
    locale: {
      format: 'DD.MM.YYYY'  // Define the date format
    }
    
  });
});
$(document).ready(function () {
  // Initialize the date picker
  $('#deactivatesalairedate').daterangepicker({
    singleDatePicker: true, // Display a single date picker
    showDropdowns: true,    // Show year and month dropdowns
    locale: {
      format: 'DD.MM.YYYY'  // Define the date format
    }
    
  });
});
// Populate dropdown options for KPIs, tables, and charts
populateDropdownOptions('kpi');
populateDropdownOptions('table');
populateDropdownOptions('line');
populateDropdownOptions('donut');

document.addEventListener('DOMContentLoaded', function () {



  const isDashboardPage = window.location.pathname.includes('/tableau-de-bord');
  const isWidgetPage = !window.location.pathname.includes('/tableau-de-bord');
  const removeButton = document.getElementById('remove-widget-btn');

  if (isWidgetPage) {
    removeButton.classList.add('d-none');
  }
  // Attach click event listeners to the "Remove" buttons
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('remove-widget-btn')) {
      const widget = event.target.closest('.widget');
      if (widget && isDashboardPage) {
        removeWidget(widget);
      }
    }
  });
  const drake = dragula([
    document.querySelector('#widgetContainer')
  ], {
    moves: function (el, container, handle) {
      return handle.classList.contains('handle');
    }
  });

  // Set up listeners for drag and drop events (optional)
  drake.on('drag', function (el) {
  });

  drake.on('drop', function (el, target, source, sibling) {
  });

  drake.on('over', function (el, container) {
  });



  // Attach click event listeners to modal buttons
  document.getElementById('loadKpiBtn').addEventListener('click', function () {
    loadWidget('kpi');
  });

  document.getElementById('loadTableBtn').addEventListener('click', function () {
    loadWidget('table');
  });

  document.getElementById('loadLineBtn').addEventListener('click', function () {
    loadWidget('line');
  });

  document.getElementById('loadDonutBtn').addEventListener('click', function () {
    loadWidget('donut');
  });

});
displaySavedDashboards();
// Function to populate dropdown options
function populateDropdownOptions(type) {
  fetch('widget')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');

      const dropdownId = `${type}Dropdown`;
      const widgetDropdown = document.getElementById(dropdownId);
      const widgetElements = Array.from(doc.querySelectorAll(`[data-type="${type}"]`));

      widgetElements.forEach(widgetElement => {
        const widgetId = widgetElement.id;
        const widgetTitle = widgetElement.getAttribute('data-title');
        const option = document.createElement('option');
        option.value = widgetId;
        option.textContent = widgetTitle;
        widgetDropdown.appendChild(option);
      });
    })

    .catch(error => console.error(`Error populating ${type} dropdown options:`, error));
}


// Function to load and display selected widget
function loadWidget(type) {
  const selectedWidgetId = document.getElementById(`${type}Dropdown`).value;
  fetch('widget')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const selectedWidget = doc.getElementById(selectedWidgetId);

      if (selectedWidget) {
        // Create a new widget element based on the selected widget's content
        const newWidget = selectedWidget.cloneNode(true);

        // Now, also append the new widget element to the row container in the dashboard
        const widgetRowContainer = document.getElementById('widgetContainer');
        widgetRowContainer.appendChild(newWidget.cloneNode(true));
        
        // Reinitialize the script for the new widget
        const scriptElement = document.createElement('script');
        scriptElement.src = '/js/apexcharts-pie.js';
        // You may also set other attributes like 'type' if needed
        const scriptElement1 = document.createElement('script');
        scriptElement1.src = '/js/apexcharts-line.js';

        const scriptElement2 = document.createElement('script');
        scriptElement2.src = '/js/apexcharts-column.js';

        // Append the script element to the document to load and execute the script
        document.body.appendChild(scriptElement);
        document.body.appendChild(scriptElement1);
        document.body.appendChild(scriptElement2);
      }
    })
    .catch(error => console.error('Error loading widget:', error));
}


// Load the saved dashboard content from LocalStorage on page load
function saveDashboard(dashboardName) {
  const widgetContainer = document.getElementById('widgetContainer');
  const dashboardContent = widgetContainer.innerHTML;
  localStorage.setItem(dashboardName, dashboardContent);
  console.log(`Dashboard "${dashboardName}" saved.`);
}

  const confirmSaveBtn = document.getElementById('confirmSaveBtn');
  const saveDashboardBtn = document.getElementById('saveDashboardBtn');
  const dashboardNameInput = document.getElementById('dashboardNameInput');

confirmSaveBtn.addEventListener('click', function () {
  const dashboardName = dashboardNameInput.value;
  if (dashboardName) {
    saveDashboard(dashboardName);
    console.log(`Saving dashboard: ${dashboardName}`);
    createNewDashboardPage(dashboardName);
    location.reload();
  } else {
    alert('Please enter a valid dashboard name.');
  }
});

function createNewDashboardPage(dashboardName) {
  const newPageUrl = `newdashboard-${dashboardName}`;// you should add .html
  // You can use window.location.href or a similar method to navigate to the new page
}

function displaySavedDashboards() {
  const savedDashboardsList = document.getElementById('savedDashboardsList');
  savedDashboardsList.innerHTML = '';

  for (let i = 0; i < localStorage.length; i++) {
    const dashboardName = localStorage.key(i);

    // Check if the key starts with "dashboard-" and is not a pendo-related key
    if (!dashboardName.startsWith('_pendo_')) {
      const listItem = document.createElement('li');

      // Create a link to the dashboard using the route function
      const link = document.createElement('a');
      link.classList.add('side-menu__item');
      const cleanName = dashboardName.replace('dashboard-', ''); // Remove the "dashboard-" prefix
      link.textContent = cleanName;
      link.href = `/dashboard/${cleanName}`; // Use the route function


      // Create a delete button for each dashboard
      const deleteIcon = document.createElement('i');
      deleteIcon.classList.add('bx', 'bx-x');
      deleteIcon.dataset.dashboardName = dashboardName;
      deleteIcon.addEventListener('click', deleteDashboard);

      listItem.appendChild(link);
      listItem.appendChild(deleteIcon);
      savedDashboardsList.appendChild(listItem);
   
     
    }
  }

  // Attach click event listeners to the delete buttons
  const deleteBtns = document.querySelectorAll('.delete-dashboard-btn');
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', deleteDashboard);
  });
}

// Function to delete a dashboard
function deleteDashboard(event) {
  const dashboardName = event.target.dataset.dashboardName;
  if (dashboardName) {
    localStorage.removeItem(dashboardName);
    console.log(`Dashboard "${dashboardName}" deleted.`);
    // Refresh the displayed dashboards
    window.location.href = '/tableau-de-bord';
  }
}
function removeWidget(widget) {
  widget.remove();
}
// active header
document.addEventListener('DOMContentLoaded', function () {
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

// active header
document.addEventListener('DOMContentLoaded', function () {
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

