@extends('layouts.app')

@section('content')

<!-- Start::app-content -->
<div class="main-content app-content">
    <div class="container-fluid">
        <!-- Page Header -->
        <a href="{{ route('doctors') }}" class="btn rounded-pill waves-effect waves-light btn-sm btn-primary-light mt-4"><i class="bx bx-chevron-left fs-20 mt-1"></i></a>
        <div class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
            <h1 class="page-title fw-semibold fs-18 mb-0">Ajouter un nouveau médecin</h1>
        </div>

        <div class="row">
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Nom du médecin *</label> <input type="text" class="form-control" id="product-name-add" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Spécialité du médecin *</label> <input type="text" class="form-control" id="product-name-add" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Type</label> <select class="js-example-basic text-muted" name="state">
                <option value="Type" disabled selected>Type</option>
                    <option value="s-1">médecins</option>
                    <option value="s-2">dentiste</option>
                    <option value="s-3">hygeniste</option>
                </select>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Pourcentage du médecin (combien de travail)</label> <input type="text" class="form-control" id="product-name-add" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Charges Sociales</label> <input type="text" class="form-control" id="product-name-add" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Surface accordée</label> <input type="text" class="form-control" id="product-name-add"/>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Salaire</label> <input type="text" class="form-control" id="product-name-add" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Nombre de mois de salaire par an</label> <input type="text" class="form-control" id="product-name-add" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Secrétaire </label>
                <!-- js-example-basic is in select2 for basic select -->
                <select class="js-example-basic text-muted" name="state">
                    <option value="s-1" disabled selected>Secrétaire</option>
                    <option value="s-2">Secrétaire1</option>
                    <option value="s-3">Secrétaire2</option>
                </select>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Pourcentage de la secrétaire</label> <input type="text" class="form-control" id="product-name-add" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Logiciels utilisés par le médecin</label>
                <!-- js-example-placeholder-multiple is in select2 for multiple select with placeholder -->
                <select class="js-example-multiple text-muted" name="state" multiple="multiple">
                    <option value="s-1">Logiciels1</option>
                    <option value="s-2">Logiciels2</option>
                </select>
            </div>
        </div>
        <!-- part en pourcentage -->
        <h2 class="page-title fw-semibold fs-18 mb-4 mt-5">Part en pourcentage</h2>
        <div class="d-md-flex d-block align-items-baseline justify-content-end mt-3 mb-4 page-header-breadcrumb">
            <div class="btn-list">
                <a class="btn btn-primary btn-wave mb-0" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#addDoctorsPercentage">
                    + Ajouter
                </a>
                <button type="button" class="btn btn-primary btn-wave mb-0 dropdown-toggle" data-bs-auto-close="outside" data-bs-toggle="dropdown">
                    Sélectionner des actions groupées
                </button>
                <ul class="main-header-dropdown dropdown-menu dropdown-menu-end" data-popper-placement="none">
                    <li>
                        <!-- deleteSelectedRowsButton in datatable.js to delete the selected checkbox rows -->
                        <button class="dropdown-item d-flex align-items-center text-danger" data-bs-toggle="modal" data-bs-target="#deleteBulkDoctorsPercentage">Supprimer la sélection</button>
                    </li>
                </ul>
                <div class="modal fade mt-4" id="deleteBulkDoctorsPercentage" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h6 class="modal-title" id="staticBackdropLabel">Delete</h6>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <p>Are you sure do you want to delete these rows?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="deleteSelectedRowsButton">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade effect-rotate-left" id="addDoctorsPercentage">
                <div class="modal-dialog modal-dialog-centered text-center" role="document">
                    <div class="modal-content modal-content-demo">
                        <div class="modal-header">
                            <h6 class="modal-title">Ajouter Pourcentage</h6><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body text-start">
                            <div class="row">
                                <div class="col-12">
                                    <label for="product-name-add" class="form-label">De *</label> <input type="text" class="form-control" id="product-name-add" />
                                </div>
                                <div class="col-12 mt-4">
                                    <label for="product-name-add" class="form-label">A *</label> <input type="text" class="form-control" id="product-name-add" />
                                </div>
                                <div class="col-12 mt-4">
                                    <label for="product-name-add" class="form-label">Pourcentage:</label> <input type="text" class="form-control" id="product-name-add" />
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
                                    <th class="w-10">Activite Id</th>
                                    <th>De</th>
                                    <th>A</th>
                                    <th>Pourcentages</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>    
                                    <!-- rowCheckbox is important -->
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel12" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <!-- duplicaterow2 and duplicaterow is important -->
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deletepourcentageshare" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                            <div class="modal fade mt-4" id="deletepourcentageshare" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h6 class="modal-title" id="staticBackdropLabel">Delete</h6>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <p>Are you sure do you want to delete this row?</p>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                                                            <!-- deleterow is important -->
                                                            <button type="button" class="btn btn-danger deleterow" data-bs-dismiss="modal">Delete</button>
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
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel12" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td>20</td>
                                    <td>0</td>
                                        <td>2000</td>
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