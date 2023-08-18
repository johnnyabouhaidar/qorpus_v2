@extends('layouts.app')

@section('content')

<!-- Start::app-content -->
<div class="main-content app-content" id="content">
    <div class="container-fluid">
        <!-- Page Header -->
        <div class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
            <div>
                <h1 class="page-title fw-semibold fs-18 mb-0">Widgets</h1>
            </div>
        </div>
        <div class="col-xl-3">
            <input type="text" placeholder="Dates d'attribution" name="dates" id="mainCalendar" class="date-btn mb-4" />
        </div>
        <!-- Page Header Close -->

        <!-- Start::row-1 -->
        <!-- draggable- and widget- should stay the same or change them in script.js -->
    
            
              
           
        <div class="row">
            <div class="col-lg-6 col-sm-12 col-md-6 col-xl-4 col-xxl-3 widget" id="kpi-1" data-type="kpi" data-title="Paiement Total">    
                <div class="card custom-card specific-height"> <div class="handle">...</div>
                    <div class="card-body">
                 
                        <div class="row">
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 d-flex align-items-center justify-content-center ecommerce-icon px-0">
                                <span class="rounded p-3 bg-primary-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-white primary" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                        <g>
                                            <rect fill="none" height="24" width="24" />
                                            <path
                                                d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 ps-0">
                                <div class="mb-2">Paiement Total</div>
                                <div class="text-muted mb-1 fs-12"><span class="text-dark fw-semibold fs-19 lh-1 vertical-bottom"> CHF 546 021,58 </span></div>
                                <div>
                                    <span
                                        class="badge bg-danger-transparent text-danger mx-1"
                                        tabindex="0"
                                        data-bs-toggle="popover"
                                        data-bs-trigger="hover focus"
                                        data-bs-content="Par rapport à la période équivalente: Jul 11, 2023 - Jun 30, 2023"
                                    >
                                        -12%
                                    </span>
                                </div>
                            </div>
                       
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-sm-12 col-md-6 col-xl-4 col-xxl-3" id="kpi-2" data-type="kpi" data-title="Facturation Total">
                <div class="card custom-card specific-height"> <div class="handle">...</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 d-flex align-items-center justify-content-center ecommerce-icon px-0">
                                <span class="rounded p-3 bg-primary-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-white primary" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                        <g>
                                            <rect fill="none" height="24" width="24" />
                                            <path
                                                d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 ps-0">
                                <div class="mb-2">Facturation Total</div>
                                <div class="text-muted mb-1 fs-12"><span class="text-dark fw-semibold fs-19 lh-1 vertical-bottom"> CHF 546 021,58 </span></div>
                                <div><span class="badge bg-success-transparent text-success mx-1">+3%</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-sm-12 col-md-6 col-xl-4 col-xxl-3" id="kpi-3">
                <div class="card custom-card specific-height"> <div class="handle">...</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 d-flex align-items-center justify-content-center ecommerce-icon px-0">
                                <span class="rounded p-3 bg-primary-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-white primary" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                        <g>
                                            <rect fill="none" height="24" width="24" />
                                            <path
                                                d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 ps-0">
                                <div class="mb-2">Retrocession Total</div>
                                <div class="text-muted mb-1 fs-12"><span class="text-dark fw-semibold fs-19 lh-1 vertical-bottom"> CHF 546 021,58 </span></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-sm-12 col-md-6 col-xl-4 col-xxl-3" id="kpi-4">
                <div class="card custom-card specific-height"> <div class="handle">...</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 d-flex align-items-center justify-content-center ecommerce-icon px-0">
                                <span class="rounded p-3 bg-primary-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-white primary" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                        <g>
                                            <rect fill="none" height="24" width="24" />
                                            <path
                                                d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 ps-0">
                                <div class="mb-2">Encaissement Total</div>
                                <div class="text-muted mb-1 fs-12"><span class="text-dark fw-semibold fs-19 lh-1 vertical-bottom"> CHF 546 021,58 </span></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-sm-12 col-md-6 col-xl-4 col-xxl-3" id="kpi-5">
                <div class="card custom-card specific-height"> <div class="handle">...</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 d-flex align-items-center justify-content-center ecommerce-icon px-0">
                                <span class="rounded p-3 bg-primary-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-white primary" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                        <g>
                                            <rect fill="none" height="24" width="24" />
                                            <path
                                                d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 ps-0">
                                <div class="mb-2">Frais Materièl Total</div>
                                <div class="text-muted mb-1 fs-12"><span class="text-dark fw-semibold fs-19 lh-1 vertical-bottom"> CHF 546 021,58 </span></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-sm-12 col-md-6 col-xl-4 col-xxl-3" id="kpi-6">
                <div class="card custom-card specific-height"> <div class="handle">...</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 d-flex align-items-center justify-content-center ecommerce-icon px-0">
                                <span class="rounded p-3 bg-primary-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-white primary" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                        <g>
                                            <rect fill="none" height="24" width="24" />
                                            <path
                                                d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 ps-0">
                                <div class="mb-2">PnL Total</div>
                                <div class="text-muted mb-1 fs-12"><span class="text-dark fw-semibold fs-19 lh-1 vertical-bottom"> CHF 546 021,58 </span></div>
                                <div><span class="badge bg-success-transparent text-success mx-1">+1.5%</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-sm-12 col-md-6 col-xl-4 col-xxl-3" id="kpi-7">
                <div class="card custom-card specific-height"> <div class="handle">...</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 d-flex align-items-center justify-content-center ecommerce-icon px-0">
                                <span class="rounded p-3 bg-primary-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-white primary" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                        <g>
                                            <rect fill="none" height="24" width="24" />
                                            <path
                                                d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 ps-0">
                                <div class="mb-2">Paiement Total</div>
                                <div class="text-muted mb-1 fs-12"><span class="text-dark fw-semibold fs-19 lh-1 vertical-bottom"> CHF 546 021,58 </span></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-sm-12 col-md-6 col-xl-4 col-xxl-3" id="kpi-8">
                <div class="card custom-card specific-height"> <div class="handle">...</div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4 d-flex align-items-center justify-content-center ecommerce-icon px-0">
                                <span class="rounded p-3 bg-primary-transparent">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="svg-white primary" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                                        <g>
                                            <rect fill="none" height="24" width="24" />
                                            <path
                                                d="M18,6h-2c0-2.21-1.79-4-4-4S8,3.79,8,6H6C4.9,6,4,6.9,4,8v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V8C20,6.9,19.1,6,18,6z M12,4c1.1,0,2,0.9,2,2h-4C10,4.9,10.9,4,12,4z M18,20H6V8h2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8h4v2c0,0.55,0.45,1,1,1s1-0.45,1-1V8 h2V20z"
                                            />
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8 ps-0">
                                <div class="mb-2">Paiement Total</div>
                                <div class="text-muted mb-1 fs-12"><span class="text-dark fw-semibold fs-19 lh-1 vertical-bottom"> CHF 546 021,58 </span></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--End::row-1 -->
        <!-- Start::row-2 -->
        <div class="row" >
            <div class="col-xl-12 " id="chart-1">
                <div class="card custom-card">  <div class="handle">...</div>
                    <div class="card custom-card overflow-hidden">
                        <div class="card-header justify-content-between">
                            <div class="card-title">Compte de pertes et profits</div>
                            <div class="d-flex align-items-center gap-3">
                                <div class="dropdown">
                                <a href="javascript:void(0);" class="p-2 fs-12 text-muted" data-bs-toggle="dropdown" aria-expanded="false">Date<i class="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i> </a>
                                    <ul class="dropdown-menu" role="menu">
                                        <li><a class="dropdown-item" href="javascript:void(0);">last 12 months</a></li>
                                        <li><a class="dropdown-item" href="javascript:void(0);">year to date</a></li>
                                        <li><a class="dropdown-item" href="javascript:void(0);">2023</a></li>
                                        <li><a class="dropdown-item" href="javascript:void(0);">2022</a></li>
                                        <li><a class="dropdown-item" href="javascript:void(0);">2021</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="card-body p-0">
                            <div id="subscriptionOverview" class="px-3 mt-sm-0 mt-3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End::row-2 -->
        <!-- Start::row-3 -->
        <div class="row">
            <div class="col-xl-12" id="table-1" data-type="table" data-title="Facturation du Centre">
                <div class="card custom-card overflow-hidden"> <div class="handle">...</div>
                    <div class="card-header justify-content-between">
                        <div class="card-title">Facturation du Centre</div>
                        <div class="d-flex align-items-center gap-3">
                                <div class="dropdown">
                                    <a href="javascript:void(0);" class="p-2 fs-12 text-muted" data-bs-toggle="dropdown" aria-expanded="false">Date<i class="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i> </a>
                                    <ul class="dropdown-menu" role="menu">
                                        <li><a class="dropdown-item" href="javascript:void(0);">last 12 months</a></li>
                                        <li><a class="dropdown-item" href="javascript:void(0);">year to date</a></li>
                                        <li><a class="dropdown-item" href="javascript:void(0);">2023</a></li>
                                        <li><a class="dropdown-item" href="javascript:void(0);">2022</a></li>
                                        <li><a class="dropdown-item" href="javascript:void(0);">2021</a></li>
                                    </ul>
                                </div>
                            </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table text-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col">Facturation</th>
                                        <th scope="col">Janvier</th>
                                        <th scope="col">Février</th>
                                        <th scope="col">Mars</th>
                                        <th scope="col">Avril</th>
                                        <th scope="col">Mai</th>
                                        <th scope="col">Juin</th>
                                        <th scope="col">Juillet</th>
                                        <th scope="col">Août</th>
                                        <th scope="col">Septembre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Caisse des médecins</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                        <td>261 612,40</td>
                                        <td>243 976,20</td>
                                        <td>336 504,95</td>
                                        <td>249 609,00</td>
                                        <td>249 560,75</td>
                                        <td>303 414,10</td>
                                        <td>143 852,10</td>
                                        <td>261 521,00</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Dentisterie</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                        <td>261 612,40</td>
                                        <td>243 976,20</td>
                                        <td>336 504,95</td>
                                        <td>249 609,00</td>
                                        <td>249 560,75</td>
                                        <td>303 414,10</td>
                                        <td>143 852,10</td>
                                        <td>261 521,00</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Hygiénisterie</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                        <td>261 612,40</td>
                                        <td>243 976,20</td>
                                        <td>336 504,95</td>
                                        <td>249 609,00</td>
                                        <td>249 560,75</td>
                                        <td>303 414,10</td>
                                        <td>143 852,10</td>
                                        <td>261 521,00</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Centre</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                        <td>261 612,40</td>
                                        <td>243 976,20</td>
                                        <td>336 504,95</td>
                                        <td>249 609,00</td>
                                        <td>249 560,75</td>
                                        <td>303 414,10</td>
                                        <td>143 852,10</td>
                                        <td>261 521,00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="column-basic" class="px-3 mt-5"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End::row-3 -->
       
        <!-- Start::row-4 -->
        <div class="row">
            <div class="col-xl-12" id="table-2">
                <div class="card custom-card overflow-hidden"> <div class="handle">...</div>
                    <div class="card-header justify-content-between">
                        <div class="card-title">Revenu net</div>
                        <div class="d-flex align-items-center gap-3">
                                <div class="dropdown">
                                    <a href="javascript:void(0);" class="p-2 fs-12 text-muted" data-bs-toggle="dropdown" aria-expanded="false">Date<i class="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i> </a>
                                    <ul class="dropdown-menu" role="menu">
                                        <li><a class="dropdown-item" href="javascript:void(0);">last 12 months</a></li>
                                        <li><a class="dropdown-item" href="javascript:void(0);">year to date</a></li>
                                        <li><a class="dropdown-item" href="javascript:void(0);">2023</a></li>
                                        <li><a class="dropdown-item" href="javascript:void(0);">2022</a></li>
                                        <li><a class="dropdown-item" href="javascript:void(0);">2021</a></li>
                                    </ul>
                                </div>
                            </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table text-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col">Revenu net facturation</th>
                                        <th scope="col">Janvier</th>
                                        <th scope="col">Février</th>
                                        <th scope="col">Mars</th>
                                        <th scope="col">Avril</th>
                                        <th scope="col">Mai</th>
                                        <th scope="col">Juin</th>
                                        <th scope="col">Juillet</th>
                                        <th scope="col">Août</th>
                                        <th scope="col">Septembre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Caisse des médecins</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                        <td>261 612,40</td>
                                        <td>243 976,20</td>
                                        <td>336 504,95</td>
                                        <td>249 609,00</td>
                                        <td>249 560,75</td>
                                        <td>303 414,10</td>
                                        <td>143 852,10</td>
                                        <td>261 521,00</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Dentisterie</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                        <td>261 612,40</td>
                                        <td>243 976,20</td>
                                        <td>336 504,95</td>
                                        <td>249 609,00</td>
                                        <td>249 560,75</td>
                                        <td>303 414,10</td>
                                        <td>143 852,10</td>
                                        <td>261 521,00</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Hygiénisterie</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                        <td>261 612,40</td>
                                        <td>243 976,20</td>
                                        <td>336 504,95</td>
                                        <td>249 609,00</td>
                                        <td>249 560,75</td>
                                        <td>303 414,10</td>
                                        <td>143 852,10</td>
                                        <td>261 521,00</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Soins centre</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                        <td>261 612,40</td>
                                        <td>243 976,20</td>
                                        <td>336 504,95</td>
                                        <td>249 609,00</td>
                                        <td>249 560,75</td>
                                        <td>303 414,10</td>
                                        <td>143 852,10</td>
                                        <td>261 521,00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="column-basic2" class="px-3 mt-5"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End::row-4 -->
        <!-- Start::row-5 -->
        <div class="row" >
            <div class="col-xl-12" id="table-3">
                <div class="card custom-card overflow-hidden"> <div class="handle">...</div>
                    <div class="card-header">
                        <div class="card-title">Paiements</div>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table text-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col">Type de paiements</th>
                                        <th scope="col">Janvier</th>
                                        <th scope="col">Février</th>
                                        <th scope="col">Mars</th>
                                        <th scope="col">Avril</th>
                                        <th scope="col">Mai</th>
                                        <th scope="col">Juin</th>
                                        <th scope="col">Juillet</th>
                                        <th scope="col">Août</th>
                                        <th scope="col">Septembre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Frais fixe</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                        <td>261 612,40</td>
                                        <td>243 976,20</td>
                                        <td>336 504,95</td>
                                        <td>249 609,00</td>
                                        <td>249 560,75</td>
                                        <td>303 414,10</td>
                                        <td>143 852,10</td>
                                        <td>261 521,00</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Frais variables</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                        <td>261 612,40</td>
                                        <td>243 976,20</td>
                                        <td>336 504,95</td>
                                        <td>249 609,00</td>
                                        <td>249 560,75</td>
                                        <td>303 414,10</td>
                                        <td>143 852,10</td>
                                        <td>261 521,00</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Frais matériel medical</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                        <td>261 612,40</td>
                                        <td>243 976,20</td>
                                        <td>336 504,95</td>
                                        <td>249 609,00</td>
                                        <td>249 560,75</td>
                                        <td>303 414,10</td>
                                        <td>143 852,10</td>
                                        <td>261 521,00</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Frais unique</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                        <td>261 612,40</td>
                                        <td>243 976,20</td>
                                        <td>336 504,95</td>
                                        <td>249 609,00</td>
                                        <td>249 560,75</td>
                                        <td>303 414,10</td>
                                        <td>143 852,10</td>
                                        <td>261 521,00</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Frais dentisterie</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                        <td>261 612,40</td>
                                        <td>243 976,20</td>
                                        <td>336 504,95</td>
                                        <td>249 609,00</td>
                                        <td>249 560,75</td>
                                        <td>303 414,10</td>
                                        <td>143 852,10</td>
                                        <td>261 521,00</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Remboursement patient</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                        <td>261 612,40</td>
                                        <td>243 976,20</td>
                                        <td>336 504,95</td>
                                        <td>249 609,00</td>
                                        <td>249 560,75</td>
                                        <td>303 414,10</td>
                                        <td>143 852,10</td>
                                        <td>261 521,00</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Frais divers</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                        <td>261 612,40</td>
                                        <td>243 976,20</td>
                                        <td>336 504,95</td>
                                        <td>249 609,00</td>
                                        <td>249 560,75</td>
                                        <td>303 414,10</td>
                                        <td>143 852,10</td>
                                        <td>261 521,00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End::row-5 -->
        <!-- Start::row-6 -->
        <div class="row" >
            <div class="col-xl-6" id="chart-2">
                <div class="card custom-card "> <div class="handle">...</div>
                    <div class="card-body">
                        <div class="card-header justify-content-between">
                            <div class="card-title mb-2 mb-sm-0">Paiements</div>
                        </div>
                        <div id="donut-simple" class="px-3 mt-sm-0 mt-3 apexchart"></div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6" id="table-4">
                <div class="card custom-card overflow-hidden"><div class="handle">...</div>
                    <div class="card-header">
                        <div class="card-title">Paiements - Cumul à ce jour</div>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table text-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col">Type de paiements</th>
                                        <th scope="col">Cumul à ce jour</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Frais fixe</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Frais variables</span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold"> Frais matériel medical </span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold"> Frais unique </span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold"> Frais dentisterie </span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold"> Remboursement patient </span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold"> Frais divers </span></div>
                                            </div>
                                        </th>
                                        <td>161 097,20</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End::row-6 -->
        <!-- Start::row-7 -->
        <div class="row">
            <div class="col-xl-6" id="table-5">
                <div class="card custom-card overflow-hidden"> <div class="handle">...</div>
                    <div class="card-header justify-content-between">
                        <div class="card-title">Paiements</div>
                        <div class="dropdown">
                            <a href="javascript:void(0);" class="p-2 fs-12 text-muted" data-bs-toggle="dropdown" aria-expanded="false">Frais matériel médicaux<i class="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i> </a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a class="dropdown-item" href="javascript:void(0);">Frais matériel médicaux</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">Frais matériel médicaux</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">Frais matériel médicaux</a></li>
                            </ul>
                        </div>
                        <div class="dropdown">
                            <a href="javascript:void(0);" class="p-2 fs-12 text-muted" data-bs-toggle="dropdown" aria-expanded="false">Montant Total<i class="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i> </a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a class="dropdown-item" href="javascript:void(0);">Montant Total</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">Montant Total</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">Montant Total</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table text-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col">Matériel</th>
                                        <th scope="col">Quantité</th>
                                        <th scope="col">Momtant total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">OMNIFIX Seringue 20ml</span></div>
                                            </div>
                                        </th>
                                        <td>125</td>
                                        <td>261 612,40</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Rapidocain 100mg / 10ml</span></div>
                                            </div>
                                        </th>
                                        <td>125</td>
                                        <td>261 612,40</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Tegaderm Pad 9x10 cm</span></div>
                                            </div>
                                        </th>
                                        <td>125</td>
                                        <td>261 612,40</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Lugol 2% 200ml</span></div>
                                            </div>
                                        </th>
                                        <td>125</td>
                                        <td>261 612,40</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Hydroxyde de potassium 10% 20ml</span></div>
                                            </div>
                                        </th>
                                        <td>125</td>
                                        <td>261 612,40</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Xylocain spray</span></div>
                                            </div>
                                        </th>
                                        <td>125</td>
                                        <td>261 612,40</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Xylocain gel 2%</span></div>
                                            </div>
                                        </th>
                                        <td>125</td>
                                        <td>261 612,40</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6" id="table-6">
                <div class="card custom-card overflow-hidden"> <div class="handle">...</div>
                    <div class="card-header justify-content-between">
                        <div class="card-title">Paiements</div>
                        <div class="dropdown">
                            <a href="javascript:void(0);" class="p-2 fs-12 text-muted" data-bs-toggle="dropdown" aria-expanded="false">Frais matériel médicaux<i class="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i> </a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a class="dropdown-item" href="javascript:void(0);">Frais matériel médicaux</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">Frais matériel médicaux</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">Frais matériel médicaux</a></li>
                            </ul>
                        </div>
                        <div class="dropdown">
                            <a href="javascript:void(0);" class="p-2 fs-12 text-muted" data-bs-toggle="dropdown" aria-expanded="false">Montant par fournisseur<i class="ri-arrow-down-s-line align-middle ms-1 d-inline-block"></i> </a>
                            <ul class="dropdown-menu" role="menu">
                                <li><a class="dropdown-item" href="javascript:void(0);">Montant Total</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">Montant Total</a></li>
                                <li><a class="dropdown-item" href="javascript:void(0);">Montant Total</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table text-nowrap">
                                <thead>
                                    <tr>
                                        <th scope="col">Matériel</th>
                                        <th scope="col">Quantité</th>
                                        <th scope="col">Momtant total</th>
                                    </tr>
                                    <tr>
                                        <th scope="col ml-2">Galexis</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">OMNIFIX Seringue 20ml</span></div>
                                            </div>
                                        </th>
                                        <td>125</td>
                                        <td>261 612,40</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Rapidocain 100mg / 10ml</span></div>
                                            </div>
                                        </th>
                                        <td>125</td>
                                        <td>261 612,40</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Tegaderm Pad 9x10 cm</span></div>
                                            </div>
                                        </th>
                                        <td>125</td>
                                        <td>261 612,40</td>
                                    </tr>
                                    <thead>
                                        <tr>
                                            <th scope="col">Admedics</th>
                                        </tr>
                                    </thead>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Lugol 2% 200ml</span></div>
                                            </div>
                                        </th>
                                        <td>125</td>
                                        <td>261 612,40</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Hydroxyde de potassium 10% 20ml</span></div>
                                            </div>
                                        </th>
                                        <td>125</td>
                                        <td>261 612,40</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Xylocain spray</span></div>
                                            </div>
                                        </th>
                                        <td>125</td>
                                        <td>261 612,40</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <div class="d-flex align-items-center">
                                                <div><span class="fw-semibold">Xylocain gel 2%</span></div>
                                            </div>
                                        </th>
                                        <td>125</td>
                                        <td>261 612,40</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- End::row-7 -->
    </div>
</div>
@endsection
