@extends('layouts.app')

@section('content')

<!-- Start::app-content -->
<div class="main-content app-content">
    <div class="container-fluid">
        <!-- Page Header -->
        <div class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
            <div>
                <h1 class="page-title fw-semibold fs-18 mb-3">Medecins</h1>
                <a href="{{ route('doctors')}}" class="btn rounded-pill waves-effect waves-light btn-sm btn-primary-light {{ request()->routeIs('doctors') ? 'btn-active' : ''}}">Medecins</a>
                <a href="{{ route('employee')}}" class="btn rounded-pill waves-effect waves-light btn-sm btn-primary-light">Employés</a>
                <a href="{{ route('patients')}}" class="btn rounded-pill waves-effect waves-light btn-sm btn-primary-light">Patients</a>
            </div>
            <div class="btn-list">
                <a class="btn btn-primary btn-wave mb-0" data-bs-effect="effect-rotate-left" href="{{ route('add-doctors-step1') }}">
                    + Ajouter
                </a>
                <button type="button" class="btn btn-primary btn-wave mb-0 dropdown-toggle" data-bs-auto-close="outside" data-bs-toggle="dropdown">
                Sélectionner l'action au groupe
                </button>
                <ul class="main-header-dropdown dropdown-menu dropdown-menu-end" data-popper-placement="none">
                    <li>
                        <button class="dropdown-item d-flex align-items-center text-danger" data-bs-toggle="modal" data-bs-target="#deleteBulkDoctors">Supprimer la sélection</button>
                    </li>
                </ul>
                <div class="modal fade mt-4" id="deleteBulkDoctors" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal"  id="deleteSelectedRowsButton">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                        </div>
            </div>
        </div>
        <!-- Start::row-1 -->
        <div class="row mt-4">
            <div class="col-xl-12">
                <div class="card custom-card">
                    <div class="card-body">

                        <table id="responsiveDataTable" class="table table-bordered text-nowrap" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th><input class="form-check-input" type="checkbox" id="selectAllCheckbox" value="" aria-label="..." /></th>
                                    <th>Action</th>
                                    <th>Medecin Id</th>
                                    <th>Medecin Nom</th>
                                    <th>Medecin Speciality</th>
                                    <th>Type</th>
                                    <th>est Actif</th>
                                    <th>Pourcentage de Partage</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel1" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <a aria-label="anchor" href="{{ route('editdoctors') }}" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" data-bs-toggle="modal" data-bs-target="#deleteDoctorsModal" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                            <div class="modal fade mt-4" id="deleteDoctorsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                    <td>256</td>
                                    <td>testing</td>
                                    <td>Carte EC frais divers</td>
                                    <td>dentiste</td>
                                    <td>392,32</td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel2" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td>256</td>
                                    <td>hello</td>
                                    <td>Carte EC frais divers</td>
                                    <td>dentiste</td>
                                    <td>392,32</td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel3" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td>256</td>
                                    <td>Frais Divers</td>
                                    <td>Carte EC frais divers</td>
                                    <td>dentiste</td>
                                    <td>392,32</td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel4" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td>256</td>
                                    <td>Frais Divers</td>
                                    <td>Carte EC frais divers</td>
                                    <td>dentiste</td>
                                    <td>392,32</td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel5" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td>256</td>
                                    <td>Frais Divers</td>
                                    <td>Carte EC frais divers</td>
                                    <td>dentiste</td>
                                    <td>392,32</td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel6" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td>256</td>
                                    <td>Frais Divers</td>
                                    <td>Carte EC frais divers</td>
                                    <td>dentiste</td>
                                    <td>392,32</td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel7" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td>256</td>
                                    <td>Frais Divers</td>
                                    <td>Carte EC frais divers</td>
                                    <td>dentiste</td>
                                    <td>392,32</td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel8" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td>256</td>
                                    <td>Frais Divers</td>
                                    <td>Carte EC frais divers</td>
                                    <td>dentiste</td>
                                    <td>392,32</td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel9" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td>256</td>
                                    <td>Frais Divers</td>
                                    <td>Carte EC frais divers</td>
                                    <td>dentiste</td>
                                    <td>392,32</td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel10" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td>256</td>
                                    <td>Frais Divers</td>
                                    <td>Carte EC frais divers</td>
                                    <td>dentiste</td>
                                    <td>392,32</td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel11" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td>256</td>
                                    <td>Frais Divers</td>
                                    <td>Carte EC frais divers</td>
                                    <td>dentiste</td>
                                    <td>392,32</td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel12" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td>256</td>
                                    <td>Frais Divers</td>
                                    <td>Carte EC frais divers</td>
                                    <td>dentiste</td>
                                    <td>392,32</td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!--End::row-1 -->
    </div>
</div>
<!-- End::app-content -->

@endsection