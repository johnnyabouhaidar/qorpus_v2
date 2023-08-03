<!-- Start::app-sidebar -->
<aside class="app-sidebar sticky" id="sidebar">
    <!-- Start::main-sidebar-header -->
    <div class="main-sidebar-header">
        <a href="/" class="header-logo">
            <img src="/images/sidebar-logo.png" alt="logo" class="desktop-logo" /> <img src="/images/sidebar-logo.png" alt="logo" class="toggle-logo" />
            <img src="/images/sidebar-logo.png" alt="logo" class="desktop-dark" /> <img src="/images/sidebar-logo.png" alt="logo" class="toggle-dark" />
        </a>
    </div>
    <!-- End::main-sidebar-header -->
    <!-- Start::main-sidebar -->
    <div class="main-sidebar" id="sidebar-scroll">
        <!-- Start::nav -->
        <nav class="main-menu-container nav nav-pills flex-column sub-open">
            <div class="slide-left" id="slide-left">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"><path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path></svg>
            </div>
            <ul class="main-menu">
                <li class="slide">
                    <a href="{{route('dashboard')}}" class="side-menu__item {{ request()->routeIs('dashboard') ? 'active' : ''}}">
                        <i class="ti ti-layout-dashboard side-menu__icon"></i>
                        <span class="side-menu__label">Tableaux de bord</span>
                    </a>
                </li>
                <li class="slide">
                    <a href="{{ route('payment') }}" class="side-menu__item {{ request()->routeIs('payment') ? 'active' : ''}}">
                        <i class='ti ti-report-money side-menu__icon'></i>
                        <span class="side-menu__label">Paiement</span>
                    </a>
                </li>
                <li class="slide">
                    <a href="{{ route('billing') }}" class="side-menu__item {{ request()->routeIs('billing') ? 'active' : ''}}">
                        <i class='ti ti-receipt side-menu__icon'></i>
                        <span class="side-menu__label">Facturation</span>
                    </a>
                </li>
                <li class="slide">
                    <a href="{{ route('commission') }}" class="side-menu__item {{ request()->routeIs('commission') ? 'active' : ''}}">
                        <i class='ti ti-exchange side-menu__icon'></i>
                        <span class="side-menu__label">Rétrocession</span>
                    </a>
                </li>
                <li class="slide">
                    <a href="{{ route('dentistry') }}" class="side-menu__item {{ request()->routeIs('dentistry') ? 'active' : ''}}">
                        <i class='ti ti-dental side-menu__icon'></i>
                        <span class="side-menu__label">Dentisterie</span>
                    </a>
                </li>
                <li class="slide">
                    <a href="{{ route('advancepayment') }}" class="side-menu__item {{ request()->routeIs('advancepayment') ? 'active' : ''}}">
                        <i class='ti ti-credit-card side-menu__icon'></i>
                        <span class="side-menu__label">Encaissement Avance</span>
                    </a>
                </li>
                <li class="slide">
                    <a href="{{ route('widget') }}" class="side-menu__item {{ request()->routeIs('widget') ? 'active' : ''}}">
                        <i class='ti ti-table side-menu__icon'></i>
                        <span class="side-menu__label">Widgets</span>
                    </a>
                </li>
            </ul>
            <div class="slide-right" id="slide-right">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24" viewBox="0 0 24 24"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
            </div>
        </nav>
        <!-- End::nav -->
    </div>
    <!-- End::main-sidebar -->
</aside>
<!-- End::app-sidebar -->