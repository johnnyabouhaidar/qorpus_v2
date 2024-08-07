@extends('layouts.app')

@section('content')

<!-- Start::app-content -->
<div class="main-content app-content">
    <div class="container-fluid">
        <!-- Page Header -->
        <a href="{{ route('employee') }}" class="btn rounded-pill waves-effect waves-light btn-sm btn-primary-light mt-4"><i class="bx bx-chevron-left fs-20 mt-1"></i></a>
        <div class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
            <h1 class="page-title fw-semibold fs-18 mb-0">Ajouter un nouveau employé</h1>
        </div>

        <div class="row">
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Nom Complet</label> <input type="text" class="form-control" id="product-name-add" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Adresse</label> <input type="text" class="form-control" id="product-name-add" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Tel</label> <input type="text" class="form-control" id="product-name-add" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">E-mail</label> <input type="text" class="form-control" id="product-name-add" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Coordonnée bancaire</label> <input type="text" class="form-control" id="product-name-add" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">No. AVS</label> <input type="text" class="form-control" id="product-name-add" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Pole</label> <input type="text" class="form-control" id="product-name-add" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Intitulé du Poste</label> <input type="text" class="form-control" id="product-name-add" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Date de Début de L'emploi</label> <input type="text" id="addDatePicker1" class="form-control text-muted" />
            </div>
        </div>
        <!-- Salaire -->

        <h2 class="page-title fw-semibold fs-18 mb-4 mt-5 ">Salaire</h2>
        <div class="d-md-flex d-block align-items-baseline justify-content-end mt-3 mb-4 page-header-breadcrumb">
            <div class="btn-list">
                <a class="btn btn-primary btn-wave mb-0" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#addEmployeeSalary">
                    + Ajouter
                </a>
            </div>
            <div class="modal fade effect-rotate-left" id="addEmployeeSalary">
                <div class="modal-dialog modal-dialog-centered text-center" role="document">
                    <div class="modal-content modal-content-demo">
                        <div class="modal-header">
                            <h6 class="modal-title">Ajouter Salaire</h6><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-start">
                            <div class="row">
                                <div class="col-12">
                                    <label for="product-name-add" class="form-label">Salaire</label> <input type="text" class="form-control" id="product-name-add" />
                                </div>
                                <div class="col-12 mt-4">
                                    <label for="product-name-add" class="form-label">Nombre de mois de salaire par an</label> <input type="text" class="form-control" id="product-name-add" />
                                </div>
                                <div class="col-12 mt-4">
                                    <label for="product-name-add" class="form-label">Date de Début:</label> <input type="text" id="addDatePicker2" class="form-control text-muted" />
                                </div>
                                <div class="col-12 mt-4">
                                    <input type="button" class="form-control btn btn-primary" id="input-button" value="Ajouter">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card custom-card">
                    <div class="card-header justify-content-between">
                        <div class="col-12">
                            <!-- responsiveDataTable2 is for the datatable columns number less than 5  & responsiveDataTable is for the datatable columns number more than 5-->
                            <table id="responsiveDataTable2" class="table table-bordered text-nowrap" style="width: 100%;">
                                <thead>
                                    <tr>
                                        <!--selectAllCheckbox is important -->

                                        <th class="w-10">Action</th>
                                        <th class="w-10">Salaire</th>
                                        <th>Nombre de mois de salaire par an</th>
                                        <th>Date de Début</th>
                                        <th>Date de Fin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <!-- rowCheckbox is important -->

                                        <td>
                                            <div class="hstack gap-2 fs-15">

                                                <!-- duplicaterow2 and duplicaterow is important -->
                                                <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#validesalaireemployee" class="btn btn-icon waves-effect waves-light btn-sm btn-warning-light"><i class="bi bi-power" data-bs-toggle="tooltip" data-bs-placement="top" title="activé/désactivé"></i></a>
                                                <div class="modal fade mt-4" id="validesalaireemployee" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                    <div class="modal-dialog  modal-dialog-centered">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h6 class="modal-title" id="staticBackdropLabel">Désactivation</h6>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <label for="product-name-add" class="form-label">Date de Désactivation:</label>
                                                                <input type="text" id="addDatePicker3" class="form-control text-muted" />
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
                                                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Confirmer</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </td>
                                        <td>19</td>
                                        <td>0</td>
                                        <td>2000</td>
                                        <td>20%</td>
                                    </tr>
                                    <tr>

                                        <td>
                                            <div class="hstack gap-2 fs-15">
                                                <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-warning-light"><i class="bi bi-power" data-bs-toggle="tooltip" data-bs-placement="top" title="activé/désactivé"></i></a>
                                            </div>
                                        </td>
                                        <td>20</td>
                                        <td>0</td>
                                        <td>2000</td>
                                        <td>20%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- lieu d'attribution  -->
        <h2 class="page-title fw-semibold fs-18 mb-4 mt-5">Pourcentage</h2>
        <div class="d-md-flex d-block align-items-baseline justify-content-end mt-3 mb-4 page-header-breadcrumb">
            <div class="btn-list">
                <a class="btn btn-primary btn-wave mb-0" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#addEmployeePercentage">
                    + Ajouter
                </a>
                <button type="button" class="btn btn-primary btn-wave mb-0 dropdown-toggle" data-bs-auto-close="outside" data-bs-toggle="dropdown">
                    Sélectionner des actions groupées
                </button>
                <ul class="main-header-dropdown dropdown-menu dropdown-menu-end" data-popper-placement="none">
                    <li>
                        <!-- deleteSelectedRowsButton in datatable.js to delete the selected checkbox rows -->
                        <button class="dropdown-item d-flex align-items-center text-danger" data-bs-toggle="modal" data-bs-target="#deleteBulkEmployeePercentage">Supprimer la sélection</button>
                    </li>
                </ul>
                <div class="modal fade mt-4" id="deleteBulkEmployeePercentage" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h6 class="modal-title" id="staticBackdropLabel">Supprimer</h6>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>Êtes-vous sûr de vouloir supprimer ces lignes?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
                                <button type="button" class="btn btn-danger" id="deleteSelectedRowsButton" data-bs-dismiss="modal">Supprimer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade effect-rotate-left" id="addEmployeePercentage">
                <div class="modal-dialog modal-dialog-centered text-center" role="document">
                    <div class="modal-content modal-content-demo">
                        <div class="modal-header">
                            <h6 class="modal-title">Ajouter Pourcentage</h6><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-start">
                            <div class="row">
                                <div class="col-12">
                                    <label for="product-name-add" class="form-label">Fonction</label> <input type="text" class="form-control" id="product-name-add" />
                                </div>
                                <div class="col-12 mt-4">
                                    <label for="product-name-add" class="form-label">Dr</label> <input type="text" class="form-control" id="product-name-add" />
                                </div>
                                <div class="col-12 mt-4">
                                    <label for="product-name-add" class="form-label">Pourcentage</label> <input type="text" class="form-control" id="product-name-add" />
                                </div>
                                <div class="col-12 mt-4">
                                    <label for="product-name-add" class="form-label">Date de Début</label> <input type="text" id="addDatePicker4" class="form-control text-muted" />
                                </div>
                                <div class="col-12 mt-4">
                                    <input type="button" class="form-control btn btn-primary" id="input-button" value="Ajouter">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card custom-card">
                <div class="card-header justify-content-between">
                    <div class="col-12">
                        <!-- responsiveDataTable2 is for the datatable columns number less than 5  & responsiveDataTable is for the datatable columns number more than 5-->
                        <table id="responsiveDataTable" class="table table-bordered text-nowrap" style="width: 100%;">
                            <thead>
                                <tr>
                                    <!--selectAllCheckbox is important -->
                                    <th class="w-10"><input class="form-check-input" type="checkbox" id="selectAllCheckbox" value="" aria-label="..." /></th>
                                    <th class="w-10">Action</th>
                                    <th>Fonction</th>
                                    <th>Dr</th>
                                    <th>Pourcentage</th>
                                    <th>Date de Début</th>
                                    <th>Date de Fin</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <!-- rowCheckbox is important -->
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel12" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <!-- duplicaterow2 and duplicaterow is important -->
                                            <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#valideaddEmployee" class="btn btn-icon waves-effect waves-light btn-sm btn-warning-light"><i class="bi bi-power" data-bs-toggle="tooltip" data-bs-placement="top" title="activé/désactivé"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line" data-bs-toggle="tooltip" data-bs-placement="top" title="dupliquer"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deletepourcentageshare" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line" data-bs-toggle="tooltip" data-bs-placement="top" title="supprimer"></i></a>
                                            <div class="modal fade mt-4" id="deletepourcentageshare" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h6 class="modal-title" id="staticBackdropLabel">Supprimer</h6>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <p>Êtes-vous sûr de vouloir supprimer cette ligne?</p>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
                                                            <button type="button" class="btn btn-danger deleterow" data-bs-dismiss="modal">Supprimer</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="modal fade mt-4" id="valideaddEmployee" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                <div class="modal-dialog  modal-dialog-centered">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h6 class="modal-title" id="staticBackdropLabel">Désactivation</h6>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <label for="product-name-add" class="form-label">Date de Désactivation:</label>
                                                            <input type="text" id="addDatePicker5" class="form-control text-muted" />
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Fermer</button>
                                                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Confirmer</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>19</td>
                                    <td>0</td>
                                    <td>2000</td>
                                    <td>20%</td>
                                    <td>20%</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel12" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-warning-light"><i class="bi bi-power" data-bs-toggle="tooltip" data-bs-placement="top" title="activé/désactivé"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line" data-bs-toggle="tooltip" data-bs-placement="top" title="dupliquer"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line" data-bs-toggle="tooltip" data-bs-placement="top" title="supprimer"></i></a>
                                        </div>
                                    </td>
                                    <td>20</td>
                                    <td>0</td>
                                    <td>2000</td>
                                    <td>20%</td>
                                    <td>20%</td>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row justify-content-end">
        <div class="col-2 mt-3 mb-5">
            <a href="" class="form-control btn btn-primary" id="input-button" value="Soumettre">Ajouter</a>
        </div>
    </div>
</div>
</div>
<!-- End::app-content -->

@endsection