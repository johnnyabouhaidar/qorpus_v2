<!-- app-header -->
<header class="app-header">
    <!-- Start::main-header-container -->
    <div class="main-header-container container-fluid">
        <!-- Start::header-content-left -->
        <div class="header-content-left">
            <!-- Start::header-element -->
            <div class="header-element">
                <div class="horizontal-logo">
                    <a href="index.html" class="header-logo">
                        <img src="/images/brand-logos/desktop-logo.png" alt="logo" class="desktop-logo" /> <img src="/images/brand-logos/toggle-logo.png" alt="logo" class="toggle-logo" />
                        <img src="/images/brand-logos/desktop-dark.png" alt="logo" class="desktop-dark" /> <img src="/images/brand-logos/toggle-dark.png" alt="logo" class="toggle-dark" />
                    </a>
                </div>
            </div>
            <!-- End::header-element -->
            <!-- Start::header-element -->
            <div class="header-element">
                <!-- Start::header-link -->
                <a aria-label="Hide Sidebar" class="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle" data-bs-toggle="sidebar" href="javascript:void(0);"><span></span></a>
                <!-- End::header-link -->
            </div>
            <!-- End::header-element -->
        </div>
        <!-- End::header-content-left -->
        <!-- Start::header-content-right -->
        <div class="header-content-right">
            <!-- Start::header-element -->
            <div class="header-element">
                <!-- Start::header-link|links -->
                <a href="{{ route('installation') }}" class="header-link {{ request()->routeIs('installation') || request()->routeIs('doctors') || request()->routeIs('employee') || request()->routeIs('patients') ? 'active' : ''}} ">
                    <div class="d-flex align-items-center">
                        <div class="me-sm-2 me-0"><i class='bx bx-wrench'></i></div>
                        <div class="d-sm-block d-none">
                            <p class="fw-semibold mb-0 lh-1">Installation</p>
                        </div>
                    </div>
                </a>
                <!-- End::header-link|links -->
            </div>
            <!-- End::header-element -->
            <!-- Start::header-element -->
            <div class="header-element country-selector">
                <!-- Start::header-link|dropdown-toggle -->
                <a href="javascript:void(0);" class="header-link dropdown-toggle" data-bs-auto-close="outside" data-bs-toggle="dropdown">
                    <div class="d-flex align-items-center">
                        <div class="me-sm-2 me-0"><i class='bx bx-globe'></i></div>
                        <div class="d-sm-block d-none">
                            <p class="fw-semibold mb-0 lh-1"> Français <i class='bx bx-chevron-down'></i> </p>
                        </div>
                    </div>
                </a>
                <!-- End::header-link|dropdown-toggle -->
                <ul class="main-header-dropdown dropdown-menu dropdown-menu-end" data-popper-placement="none">
                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"> Français </a>
                    </li>
                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"> English </a>
                    </li>
                    <li>
                        <a class="dropdown-item d-flex align-items-center" href="javascript:void(0);"> Español </a>
                    </li>
                </ul>
            </div>
            <!-- End::header-element -->
            <!-- Start::header-element -->
            <div class="header-element">
                <!-- Start::header-link|links -->
                <a href="{{ route('aide') }}" class="header-link">
                    <div class="d-flex align-items-center">
                        <div class="me-sm-2 me-0"><i class='bx bx-info-circle'></i></div>
                        <div class="d-sm-block d-none">
                            <p class="fw-semibold mb-0 lh-1">Bureau d'aide</p>
                        </div>
                    </div>
                </a>
                <!-- End::header-link|links -->
            </div>
            <!-- End::header-element -->
            <!-- Start::header-element -->
            <div class="header-element">
                <!-- Start::header-link|dropdown-toggle -->
                <a href="#" class="header-link {{ request()->routeIs('usermanagement') || request()->routeIs('changepassword') ? 'active' : ''}}  dropdown-toggle" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                    <div class="d-flex align-items-center">
                        <div class="me-sm-2 me-0"><i class='bx bx-user-circle'></i></div>
                        <div class="d-sm-block d-none">
                            <p class="fw-semibold mb-0 lh-1">Bienvenue Admin <i class='bx bx-chevron-down'></i></p>
                        </div>
                    </div>
                </a>
                <!-- End::header-link|dropdown-toggle -->
                <ul class="main-header-dropdown dropdown-menu pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end" aria-labelledby="mainHeaderProfile">
                    <li>
                        <a class="dropdown-item d-flex" href="{{ route('usermanagement') }}">Gestion des utilisateurs</a>
                    </li>
                    <li>
                        <a class="dropdown-item d-flex" href="{{ route('changepassword') }}">Modifier le mot de passe</a>
                    </li>
                    <li>
                        <a class="dropdown-item d-flex border-block-end" href="#">Déconnexion</a>
                    </li>
                    <li>
                        <a class="dropdown-item d-flex" href="{{ route('login') }}">Login</a>
                    </li>
                </ul>
            </div>
            <!-- End::header-element -->
        </div>
        <!-- End::header-content-right -->
    </div>
    <!-- End::main-header-container -->
</header>
<!-- /app-header -->
