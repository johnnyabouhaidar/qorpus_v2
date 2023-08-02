<!DOCTYPE html>
<html lang="fr" dir="ltr" data-nav-layout="vertical" data-theme-mode="light" data-header-styles="light" data-menu-styles="dark" data-toggled="close">

<head>
    <!-- Meta Data -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <title>qOne</title>
    <meta name="Description" content="" />
    <meta name="Author" content="" />
    <meta name="keywords" content="" />

    <!-- Favicon -->
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">

    <!-- Main Theme Js -->
    <script src="/js/main.js"></script>
    <!-- Bootstrap Css -->
    <link id="style" href="/libs/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <!-- Style Css --> 
    <link href="/css/styles.css" rel="stylesheet" />

    <!-- Icons Css -->
    <link href="/css/icons.css" rel="stylesheet" />
    <!-- Node Waves Css -->
    <link href="/libs/node-waves/waves.min.css" rel="stylesheet" />
    <!-- Simplebar Css -->
    <link href="/libs/simplebar/simplebar.min.css" rel="stylesheet" />
    <!-- Color Picker Css --><link rel="stylesheet" href="/libs/nouislider/nouislider.min.css">
 
    <link rel="stylesheet" href="/libs/flatpickr/flatpickr.min.css" />
    <link rel="stylesheet" href="/libs/simonwep/pickr/themes/nano.min.css" />
    <!-- Choices Css -->
    <link rel="stylesheet" href="/libs/choices.js/public/assets/styles/choices.min.css" />

    <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.3.0/css/responsive.bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.2.3/css/buttons.bootstrap5.min.css" />
    <!-- Date Calendar Css -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/daterangepicker@3.0.5/daterangepicker.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <!-- Apex Charts Css -->
    <link rel="stylesheet" href="/libs/apexcharts/apexcharts.css" />
    <!-- Dragula Css -->
    <link rel="stylesheet" href="/libs/dragula/dragula.min.css">
    <!-- PDF Css -->
    <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.debug.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    
</head>

<body>
    <div class="page">

        @include('layouts.header')

        @include('layouts.sidebar')

        @yield('content')

        @include('layouts.footer')

    </div>

    <div class="scrollToTop">
        <span class="arrow"><i class="ri-arrow-up-s-fill fs-20"></i></span>
    </div>

    <div id="responsive-overlay"></div>

    <script src="https://code.jquery.com/jquery-3.6.1.min.js" integrity="sha256-o88AwQnZB+VDvE9tvIXrMQaPlFFSUTR+nldQm1LuPXQ=" crossorigin="anonymous"></script>

    <!-- Popper JS -->
    <script src="/libs/popperjs/core/umd/popper.min.js"></script>
    <!-- Bootstrap JS -->
    <script src="/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- Defaultmenu JS -->
    <script src="/js/defaultmenu.min.js"></script>
    <!-- Node Waves JS-->
    <script src="/libs/node-waves/waves.min.js"></script>
    <!-- Sticky JS -->
    <script src="/js/sticky.js"></script>
    <!-- Simplebar JS -->
    <script src="/libs/simplebar/simplebar.min.js"></script>
    <script src="/js/simplebar.js"></script>
    <!-- Color Picker JS -->
    <script src="/libs/simonwep/pickr/pickr.es5.min.js"></script>
    <!-- Apex Charts JS -->
    <script src="/libs/apexcharts/apexcharts.min.js"></script>
    <!-- Used In Zoomable TIme Series Chart -->
    <script src="/js/dataseries.js"></script>
    <!---Used In Annotations Chart-->
    <script src="/js/apexcharts-stock-prices.js"></script>
    <!-- Internal Apex Charts JS -->
    <script src="/js/apexcharts-column.js"></script>
    <script src="/js/apexcharts-line.js"></script>
    <script src="/js/apexcharts-pie.js"></script>
    <script src="/js/jobs-dashboard.js"></script>

    <!-- Datatables Cdn -->
    <script src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.datatables.net/responsive/2.3.0/js/dataTables.responsive.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/dataTables.buttons.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.print.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.6/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/2.2.3/js/buttons.html5.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
    <!-- Internal Datatables JS -->
    <script src="/js/datatables.js"></script>

    <!-- Dragula JS -->
    <script src="/libs/dragula/dragula.min.js"></script>
    <!-- Internal Dragula JS -->
    <script src="/js/draggable-cards.js"></script>

    <!-- Date JS -->
    <script src="https://cdn.jsdelivr.net/npm/moment@2.29.1/moment.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/daterangepicker@3.0.5/daterangepicker.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="/libs/nouislider/nouislider.min.js"></script>
    <script src="/js/nouislider.js"></script>
    <!-- Custom JS -->
    <script src="/js/custom.js"></script>
    <script src="/js/script.js"></script>
</body>

</html>