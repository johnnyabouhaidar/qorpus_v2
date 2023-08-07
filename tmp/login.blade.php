<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- Main Theme Js -->
    <script src="/js/authentication-main.js"></script>
    <!-- Bootstrap Css -->
    <link id="style" href="/libs/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="/css/styles.css" />
    <link rel="stylesheet" href="/css/icons.min.css" />
    <link rel="stylesheet" href="/libs/swiper/swiper-bundle.min.css" />
</head>

<body>
    <div class="row authentication mx-0">
        <div class="col-xxl-5 col-xl-5 col-lg-12">
            <div class="row justify-content-center align-items-center h-100 bg-white">
                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-8 col-12">
                    <div class="p-5">
                        <div class="mb-3">
                            <a href="/"><img src="/images/qOne-logo.png" alt="qOne logo" class="w-100 mb-5 authentication-brand"> </a>
                        </div>
                        <p class="h5 fw-semibold mb-5 text-center">Login to qOne</p>

                        <div class="row gy-3">
                            <div class="col-xl-12 position-relative"> 
                                <input type="text" class="form-control form-control-lg" id="signin-username" placeholder="Email">
                            </div>
                           
                            <div class="col-xl-12 mt-4 position-relative"> 
                                <div class="input-group">
                                    <input type="password" class="form-control form-control-lg" id="signin-password" placeholder="Password" />
                                    <button class="btn btn-light" type="button" onclick="createpassword('signin-password',this)" id="button-addon2"><i class="ri-eye-off-line align-middle"></i></button>
                                </div>
                            </div>

                            <div class="col-xl-12 mt-2 mb-4">
                                <a href="#" class="float-end text-primary"><u>Forgot password</u></a>
                            </div>

                            <div class="col-xl-12 d-grid mt-2 justify-content-center">
                                <a href="#" class="btn btn-lg btn-primary rounded-pill">Log In <span class="ri-arrow-right-line align-middle"></span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xxl-7 col-xl-7 col-lg-7 d-xl-block d-none align-items-stretch px-0">
            <div class="row justify-content-center align-items-end h-100" style="background-color: #351c68;">
                <h6 class="fw-bold text-center text-white mb-5">Transform Your Micro-Management<br> with Precision and Ease</h6>
                <img src="/images/qOne-mainimage.png" alt="qOne Main Image" class="p-0 img-fluid">
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="/libs/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- Swiper JS -->
    <script src="/libs/swiper/swiper-bundle.min.js"></script>
    <script src="/js/authentication.js"></script>
    <script src="/js/show-password.js"></script>

</body>

</html>