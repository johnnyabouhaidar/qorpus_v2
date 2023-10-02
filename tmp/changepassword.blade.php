@extends('layouts.app')

@section('content')

<div class="container-lg">
    <div class="row justify-content-center align-items-center authentication authentication-basic h-100">
        <div class="col-xxl-4 col-xl-5 col-lg-5 col-md-6 col-sm-8 col-12">
            <h1 class="page-title text-center fw-semibold fs-18 mb-5 text-uppercase">Modifier le mot de passe</h1>
            <div class="card custom-card">
                <div class="card-body p-5">
                    <div class="row gy-3">
                        <div class="col-xl-12">
                            <label for="reset-password" class="form-label text-default">Ancien mot de passe</label>
                            <div class="input-group">
                                <input type="password" class="form-control form-control-lg" id="reset-password" placeholder="current password" />
                                <button class="btn btn-light" type="button" onclick="createpassword('reset-password',this)" id="button-addon2"><i class="ri-eye-off-line align-middle"></i></button>
                            </div>
                        </div>
                        <div class="col-xl-12">
                            <label for="reset-newpassword" class="form-label text-default">Nouveau mot de passe</label>
                            <div class="input-group">
                                <input type="password" class="form-control form-control-lg" id="reset-newpassword" placeholder="new password" />
                                <button class="btn btn-light" type="button" onclick="createpassword('reset-newpassword',this)" id="button-addon21"><i class="ri-eye-off-line align-middle"></i></button>
                            </div>
                        </div>
                        <div class="col-xl-12 mb-2">
                            <label for="reset-confirmpassword" class="form-label text-default">Confirmer le mot de passe</label>
                            <div class="input-group">
                                <input type="password" class="form-control form-control-lg" id="reset-confirmpassword" placeholder="confirm password" />
                                <button class="btn btn-light" type="button" onclick="createpassword('reset-confirmpassword',this)" id="button-addon22"><i class="ri-eye-off-line align-middle"></i></button>
                            </div>
                        </div>
                        <div class="col-xl-12 d-grid mt-2"><a href="#" class="btn btn-lg btn-primary">Sauvegarder</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection