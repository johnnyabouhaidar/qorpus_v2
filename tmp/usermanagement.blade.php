@extends('layouts.app')

@section('content')

<!-- Start::app-content -->
<div class="main-content app-content">
    <div class="container-fluid">
        <!-- Start::row-1 -->
        <div class="row mt-4">
            <div class="col-xl-12">
                <div class="card custom-card">
                    <div class="card-header justify-content-between">
                        <div class="card-title">Gestion des Utilisateurs</div>
                        <div class="btn-list">
                            <a class="btn btn-primary btn-wave mb-0" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#userManagmentModal">
                                + Ajouter
                            </a>
                            <button type="button" class="btn btn-primary btn-wave mb-0 dropdown-toggle" data-bs-auto-close="outside" data-bs-toggle="dropdown">
                    Sélectionner des actions groupées
                </button>
                <ul class="main-header-dropdown dropdown-menu dropdown-menu-end" data-popper-placement="none">
                    <li>
                        <button class="dropdown-item d-flex align-items-center text-danger" id="deleteSelected">Effacer la sélection</button>
                    </li>
                </ul>
                        </div>
                        <div class="modal fade effect-rotate-left" id="userManagmentModal">
                            <div class="modal-dialog modal-dialog-centered text-center" role="document">
                                <div class="modal-content modal-content-demo">
                                    <div class="modal-header">
                                        <h6 class="modal-title">Gestion des Utilisateurs</h6><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div class="modal-body text-start">
                                        <div class="row">
                                            <div class="col-12">
                                                <p class="mb-2 text-muted">First Name</p><input type="text" class="form-control" id="input">
                                            </div>
                                            <div class="col-12 mt-4">
                                                <p class="mb-2 text-muted">Last Name</p><input type="text" class="form-control" id="input">
                                            </div>
                                            <div class="col-12 mt-4">
                                                <p class="mb-2 text-muted">Role</p> <input class="form-check-input" type="radio" name="userType" id="adminRadio" value="admin" checked>
                                                <label class="form-check-label ms-2" for="adminRadio">Admin</label>
                                                <input class="form-check-input ms-2" type="radio" name="userType" id="userRadio" value="user">
                                                <label class="form-check-label ms-2" for="userRadio">User</label>
                                            </div>
                                            <div class="col-12 mt-4">
                                                                    <p class="mb-2 text-muted">Accès</p>
                                                                    <div>
                                                                        <input class="form-check-input ms-2" type="checkbox" value="" id="selectAllCheckboxAddMethod2">
                                                                        <span>Tout</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox3 ms-2" type="checkbox" value="">
                                                                        <span>Paiement</span>
                                                                    </div>
                                                                    <div>

                                                                        <input class="form-check-input rowCheckbox3 ms-2" type="checkbox" value="">
                                                                        <span>Facturation</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox3 ms-2" type="checkbox" value="">
                                                                        <span>Retrocession</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox3 ms-2" type="checkbox" value="">
                                                                        <span>Dentisterie</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox3 ms-2" type="checkbox" value="">
                                                                        <span>Encaissement Avance</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox3 ms-2" type="checkbox" value="">
                                                                        <span>Médecins</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox3 ms-2" type="checkbox" value="">
                                                                        <span>Dentiste et Hygieniste</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox3 ms-2" type="checkbox" value="">
                                                                        <span>Employé(e)s</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox3 ms-2" type="checkbox" value="">
                                                                        <span>Patients</span>
                                                                    </div>
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
                    <div class="card-body">
                        <table id="responsiveDataTable" class="table table-bordered text-nowrap" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th><input class="form-check-input" type="checkbox" id="selectAllCheckbox" value="" aria-label="..." /></th>
                                    <th>Action</th>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Role</th>
                                    <th>Accès</th>
                                    <th>Dernière connection</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel12" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 ">

                                            <a aria-label="anchor" href="javascript:void(0);" data-bs-effect="effect-rotate-left" data-bs-toggle="modal" and data-bs-target="#editUserManagmentModal" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>

                                            <div class="modal fade effect-rotate-left" id="editUserManagmentModal">
                                                <div class="modal-dialog modal-dialog-centered text-center" role="document">
                                                    <div class="modal-content modal-content-demo">
                                                        <div class="modal-header">
                                                            <h6 class="modal-title">Modifier Gestion des Utilisateurs</h6><button aria-label="Close" class="btn-close" data-bs-dismiss="modal"></button>
                                                        </div>
                                                        <div class="modal-body text-start">
                                                            <div class="row">
                                                                <div class="col-12">
                                                                    <p class="mb-2 text-muted">First Name</p><input type="text" class="form-control" id="input" value="Admin">
                                                                </div>
                                                                <div class="col-12 mt-4">
                                                                    <p class="mb-2 text-muted">Last Name</p><input type="text" class="form-control" id="input" value="Admin">
                                                                </div>
                                                                <div class="col-12 mt-4">
                                                                    <p class="mb-2 text-muted">Role</p> <input class="form-check-input" type="radio" name="userType" id="adminRadio" value="admin" checked>
                                                                    <label class="form-check-label ms-2" for="adminRadio">Admin</label>
                                                                    <input class="form-check-input ms-2" type="radio" name="userType" id="userRadio" value="user">
                                                                    <label class="form-check-label ms-2" for="userRadio">User</label>
                                                                </div>
                                                                <div class="col-12 mt-4">
                                                                    <p class="mb-2 text-muted">Accès</p>
                                                                    <div>
                                                                        <input class="form-check-input ms-2" type="checkbox" value="" id="selectAllCheckboxAddMethod">
                                                                        <span>Tout</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="" checked>
                                                                        <span>Paiement</span>
                                                                    </div>
                                                                    <div>

                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Facturation</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Retrocession</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Dentisterie</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Encaissement Avance</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Médecins</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Dentiste et Hygieniste</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Employé(e)s</span>
                                                                    </div>
                                                                    <div>
                                                                        <input class="form-check-input rowCheckbox2 ms-2" type="checkbox" value="">
                                                                        <span>Patients</span>
                                                                    </div>
                                                                </div>



                                                                <div class="col-12 mt-4">
                                                                    <input type="button" class="form-control btn btn-primary" id="input-button" value="Modifier">
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td> 12345 </td>
                                    <td> Admin </td>
                                    <td> Admin </td>
                                    <td>   <span
                                      
                                        tabindex="0"
                                        data-bs-toggle="popover"
                                        data-bs-trigger="hover focus"
                                        data-bs-content="Propriétaire du compte"
                                    >
                                    Admin <i class="bi bi-key"></i>
                                    </span>  </td>
                                    <td><span class="badge rounded-pill bg-primary-transparent">Tout</span></td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel22" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">

                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td> 12345 </td>
                                    <td>Ramy </td>
                                    <td> Abi Mansour </td>
                                    <td> User</td>
                                    <td><span class="badge rounded-pill bg-primary-transparent">Installation</span> <span class="badge rounded-pill bg-primary-transparent">Médecins</span> <span class="badge rounded-pill bg-primary-transparent">Paiements</span> <span class="badge rounded-pill bg-primary-transparent">Facturation</span></td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel3" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">

                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td> 12345 </td>
                                    <td>Johnny </td>
                                    <td>Abou Haidar</td>
                                    <td>User</td>
                                    <td></td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel13" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">

                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td> 12345 </td>
                                    <td>John</td>
                                    <td>Doe</td>
                                    <td>User</td>
                                    <td></td>
                                    <td>30/5/2023 17:08:52</td>
                                </tr>
                                <tr>
                                    <th><input class="form-check-input rowCheckbox" type="checkbox" id="checkboxNoLabel2" value="" aria-label="..." /></th>
                                    <td>
                                        <div class="hstack gap-2 fs-15">

                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light"><i class="ri-file-copy-line"></i></a>
                                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                                        </div>
                                    </td>
                                    <td> 12345 </td>
                                    <td>John</td>
                                    <td>Doe</td>
                                    <td>User</td>
                                    <td></td>
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
<script>
    const selectAllCheckbox = document.getElementById("selectAllCheckboxAddMethod");
    const otherCheckboxes = document.querySelectorAll(".rowCheckbox2");

    selectAllCheckbox.addEventListener("change", function() {
        const isChecked = selectAllCheckbox.checked;
        otherCheckboxes.forEach(function(checkbox) {
            checkbox.checked = isChecked;
        });
    });
</script>
<script>
    const selectAllCheckbox2 = document.getElementById("selectAllCheckboxAddMethod2");
    const otherCheckboxes2 = document.querySelectorAll(".rowCheckbox3");

    selectAllCheckbox2.addEventListener("change", function() {
        const isChecked = selectAllCheckbox2.checked;
        otherCheckboxes2.forEach(function(checkbox) {
            checkbox.checked = isChecked;
        });
    });
</script>
@endsection