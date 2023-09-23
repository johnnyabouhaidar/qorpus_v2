@extends('layouts.app')

@section('content')

<!-- Start::app-content -->
<div class="main-content app-content">
    <div class="container-fluid">
        <!-- Page Header -->
        <div class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
            <h1 class="page-title fw-semibold fs-18 mb-0">Modifier informations sur le médecin</h1>
        </div>

        <div class="row">
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Nom du médecin *</label> <input type="text" class="form-control" id="product-name-add" placeholder="Name" value="Nom du médecin" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Spécialité du médecin *</label> <input type="text" class="form-control" id="product-name-add" placeholder="Name" value="Spécialité du médecin" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Type</label> <select class="js-example-basic text-muted" name="state">
                <option value="Type" selected disabled>Type</option>
                    <option value="s-1">médecins</option>
                    <option value="s-2">dentiste</option>
                    <option value="s-3">hygeniste</option>
                </select>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Pourcentage du médecin (combien de travail)</label> <input type="text" class="form-control" id="product-name-add" value="Pourcentage du médecin (combien de travail)"/>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Charges Sociales</label> <input type="text" class="form-control" id="product-name-add" placeholder="Name" value="Charges Sociales" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Surface accordée</label> <input type="text" class="form-control" id="product-name-add" placeholder="Name" value="Surface accordée" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Salaire</label> <input type="text" class="form-control" id="product-name-add" placeholder="Name" value="Salaire" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Nombre de mois de salaire par an</label> <input type="text" class="form-control" id="product-name-add" placeholder="Name" value="Nombre de mois de salaire par an" />
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Secrétaire </label>
                <select class="js-example-basic text-muted" name="state">
                    <option value="s-1" disabled selected>Secrétaire</option>
                    <option value="s-2">Secrétaire1</option>
                    <option value="s-3">Secrétaire2</option>
                </select>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Pourcentage de la secrétaire</label> <input type="text" class="form-control" id="product-name-add" value="Pourcentage de la secrétaire"/>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-3">
                <label for="product-name-add" class="form-label">Logiciels utilisés par le médecin</label>
                <select class="js-example-placeholder-multiple text-muted" name="state" multiple="multiple">
                    <option value="s-1"  selected>Logiciels1</option>
                    <option value="s-2">Logiciels2</option>
                    <option value="s-3">Logiciels3</option>
                </select>
            </div>
        </div>
        <div class="row">
            <div class="col-3 mt-3 mb-5">
                <input type="button" class="form-control btn btn-primary" id="input-button" value="Modifier" />
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12">
                <div class="card custom-card">
                    <div class="card-header justify-content-between">
                        <div class="card-title">Part en pourcentage</div>
                        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">+</button>
                    </div>
                    <div class="card-body">
                        <div>
                            <div class="collapse" id="collapseExample">
                                <div class="row">
                                    <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-3"><label for="product-name-add" class="form-label">De *</label> <input type="text" class="form-control" id="product-name-add" placeholder="Name" value="000" /></div>
                                    <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-3"><label for="product-name-add" class="form-label">A *</label> <input type="text" class="form-control" id="product-name-add" placeholder="Name" value="111" /></div>
                                    <div class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-3"><label for="product-name-add" class="form-label">Pourcentages *</label> <input type="text" class="form-control" id="product-name-add" placeholder="Name" value="" /></div>
                                </div>
                                <div class="row">
                                    <div class="col-3 mt-3 mb-5">
                                        <input type="button" class="form-control btn btn-primary" id="input-button" value="Modifier" />
                                    </div>
                                </div>
                                <div class="d-md-flex d-block align-items-baseline justify-content-end mt-5 mb-4 page-header-breadcrumb">
                                    <div class="btn-list">

                                        <button type="button" class="btn btn-primary btn-wave mb-0 dropdown-toggle" data-bs-auto-close="outside" data-bs-toggle="dropdown">
                                            Sélectionner l'action au groupe
                                        </button>
                                        <ul class="main-header-dropdown dropdown-menu dropdown-menu-end" data-popper-placement="none">
                                            <li>
                                                <button class="dropdown-item d-flex align-items-center text-danger" data-bs-toggle="modal" data-bs-target="#deleteBulkEditDoctors">Supprimer la sélection</button>
                                            </li>
                                        </ul>
                                        <div class="modal fade mt-4" id="deleteBulkEditDoctors" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                </div>
                                <div class="row">
                                    <div class="col-12">
                                        <div class="card custom-card">
                                            <div class="card-header justify-content-between">
                                                <div class="col-12">
                                                    <table id="responsiveDataTable" class="table table-bordered text-nowrap" style="width: 100%;">
                                                        <thead>
                                                            <tr>
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
                                                                <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel12" value="" aria-label="..." /></th>
                                                                <td>
                                                                    <div class="hstack gap-2 fs-15">
                                                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow2"><i class="ri-file-copy-line"></i></a>
                                                                        <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deleteeditpourcentageshare" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                                                        <div class="modal fade mt-4" id="deleteeditpourcentageshare" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                                                                        <button type="button" class="btn btn-danger deleterow" data-bs-dismiss="modal">Delete</button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </td>
                                                                <td>19</td>
                                                                <td>20</td>
                                                                <td>20</td>
                                                                <td>20</td>
                                                            </tr>
                                                            <tr>
                                                                <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel12" value="" aria-label="..." /></th>
                                                                <td>
                                                                    <div class="hstack gap-2 fs-15">
                                                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow2"><i class="ri-file-copy-line"></i></a>
                                                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                                                    </div>
                                                                </td>
                                                                <td>20</td>
                                                                <td>20</td>
                                                                <td>20</td>
                                                                <td>20</td>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection