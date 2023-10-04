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
                <button type="button" class="btn btn-outline-secondary btn-wave mb-0" id="saveDashboardBtn" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#SaveNameModal"><i class="ri-upload-cloud-line me-2 align-middle d-inline-block"></i>sauvegarder</button>
                
                <div class="modal fade effect-rotate-left" id="SaveNameModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
                    <div class="modal-dialog modal-dialog-centered text-center" role="document">
                        <div class="modal-content modal-content-demo">
                            <div class="modal-header">
                                <h6 class="modal-title">Name</h6>
                                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="py-3 pl-4 pr-4">
                            <input type="text" id="dashboardNameInput" placeholder="Enter dashboard name" class="form-control">
                                <button id="confirmSaveBtn" class="btn btn-primary btn-wave mt-4" aria-label="Close" class="btn-close" data-bs-dismiss="modal">Sauvegarder</button>
                            </div>
                        </div>
                    </div>
                </div>

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
                        <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#lineModal"> Ligne </a>
                    </li>
                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#donutModal"> Camembert </a>
                    </li>
                </ul>
                <div class="modal fade effect-rotate-left" id="kpiModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
                    <div class="modal-dialog modal-dialog-centered text-center" role="document">
                        <div class="modal-content modal-content-demo">
                            <div class="modal-header">
                                <h6 class="modal-title">Selectionnez</h6>
                                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="py-3 pl-4 pr-4">
                                <select class="js-example-basic-single text-muted" name="state" id="kpiDropdown">

                                </select>
                                <button id="loadKpiBtn" class="btn btn-primary btn-wave mt-4" aria-label="Close" class="btn-close" data-bs-dismiss="modal">Charger le widget</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade effect-rotate-left" id="tableModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
                    <div class="modal-dialog modal-dialog-centered text-center" role="document">
                        <div class="modal-content modal-content-demo">
                            <div class="modal-header">
                                <h6 class="modal-title">Selectionnez</h6>
                                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="py-3 pl-4 pr-4">
                                <select class="js-example-basic-single text-muted" name="state" id="tableDropdown">

                                </select>
                                <button id="loadTableBtn" class="btn btn-primary btn-wave mt-4" aria-label="Close" class="btn-close" data-bs-dismiss="modal">Charger le widget</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal fade effect-rotate-left" id="lineModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
                    <div class="modal-dialog modal-dialog-centered text-center" role="document">
                        <div class="modal-content modal-content-demo">
                            <div class="modal-header">
                                <h6 class="modal-title">Selectionnez</h6>
                                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="py-3 pl-4 pr-4">
                                <select class="js-example-basic-single text-muted" name="state" id="lineDropdown">

                                </select>
                                <button id="loadLineBtn" class="btn btn-primary btn-wave mt-4" aria-label="Close" class="btn-close" data-bs-dismiss="modal">Charger le widget</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal fade effect-rotate-left" id="donutModal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="overflow:hidden;">
                    <div class="modal-dialog modal-dialog-centered text-center" role="document">
                        <div class="modal-content modal-content-demo">
                            <div class="modal-header">
                                <h6 class="modal-title">Selectionnez</h6>
                                <button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="py-3 pl-4 pr-4">
                                <select class="js-example-basic-single text-muted" name="state" id="donutDropdown">

                                </select>
                                <button id="loadDonutBtn" class="btn btn-primary btn-wave mt-4" aria-label="Close" class="btn-close" data-bs-dismiss="modal">Charger le widget</button>
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
        <div id="widgetContainer" class="row">


        </div>
        
    </div>
</div>
@endsection