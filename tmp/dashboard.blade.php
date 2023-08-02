@extends('layouts.app')

@section('content')

<!-- Start::app-content -->
<div class="main-content app-content" id="content">
    <div class="container-fluid">
        <!-- Page Header -->
        <div class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
            <div>
                <h1 class="page-title fw-semibold fs-18 mb-0">Tableau de bord</h1>
            </div>

            <div class="btn-list mt-md-0 mt-2">
                <button type="button" class="btn btn-outline-secondary btn-wave mb-0" id="saveDashboardBtn"><i class="ri-upload-cloud-line me-2 align-middle d-inline-block"></i>sauvegarder</button>
                <button type="button" class="btn btn-primary btn-wave mb-0 dropdown-toggle" data-bs-auto-close="outside" data-bs-toggle="dropdown">
                    + Ajouter un widget
                </button>
                <ul class="main-header-dropdown dropdown-menu dropdown-menu-end" data-popper-placement="none">
                    <li>
                        <a class="dropdown-item d-flex align-items-center modal-effect" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#kpiModal"> KPI </a>
                    </li>
                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#tableModal"> Tableaux </a>
                    </li>
                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"> Barre empiliée </a>
                    </li>
                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"> Camembert </a>
                    </li>
                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"> Ligne </a>
                    </li>
                </ul>
                <div class="modal fade effect-rotate-left" id="kpiModal">
                    <div class="modal-dialog modal-dialog-centered text-center" role="document">
                        <div class="modal-content modal-content-demo">
                            <div class="modal-header">
                                <h6 class="modal-title">Selectionnez</h6>
                                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body text-start">
                                <div class="d-flex align-items-center m-1" role="search"><input class="form-control" type="search" placeholder="Recherche..." aria-label="Search" /></div>
                                <select id="widgetDropdown"> Dropdown options will be populated dynamically </select>
                <button id="loadWidgetsBtn">Load Widget</button> 
                            </div>
                        </div>
                    </div>
                </div>

            
                <button onclick="captureAndConvertToPDF()" class="border-0"><i class="ti ti-file fs-3"></i></button>
            </div>
        </div>
        <div class="col-xl-3">
            <input type="text" placeholder="Dates d'attribution" name="dates" id="mainCalendar" class="date-btn mb-4" />
        </div>
        <!-- Page Header Close -->
        <div id="widgetContainer">
          

          

 </div>
    </div>
</div>

@endsection
