(function () {
    "use strict"


    /* modal select */
    $('.modal').on('shown.bs.modal', function () {
        $(this).find('.js-example-basic-single').each(function () {
            $(this).select2({
                dropdownParent: $(this).closest('.modal') // Initialize within the closest modal
            });
        });
    });

    // Destroy Select2 instances when modals are closed
    $('.modal').on('hidden.bs.modal', function () {
        $(this).find('.js-example-basic-single').each(function () {
            $(this).select2('destroy');
        });
    });

    /* single select used in the web */
    $('.js-example-basic').select2();
   /* multiple select with placeholder */
   $(".js-example-multiple").select2({
});
    /* multiple select type used for tables in the web*/
    $('.js-example-basic-multiple-type').select2({
        placeholder: 'Type',
    });

    /* multiple select nom used for tables in the web*/
    $('.js-example-basic-multiple-nom').select2({
        placeholder: 'Nom',
    });

    /* multiple select montant used for tables in the web*/
    $('.js-example-basic-multiple-montant').select2({
        placeholder: 'Montant',
    });


    /* single select with placeholder */
    $(".js-example-placeholder-single").select2({
        placeholder: "Select a state",
        allowClear: true,
        dir: "ltr"
    });

    /* multiple select with placeholder */
    $(".js-example-placeholder-multiple").select2({
        placeholder: "Select..."
    });

    /* templating */
    function formatState(state) {
        if (!state.id) {
            return state.text;
        }
        var baseUrl = "../assets/images/faces/select2";
        var $state = $(
            '<span><img src="' + baseUrl + '/' + state.element.value.toLowerCase() + '.jpg" class="img-flag" /> ' + state.text + '</span>'
        );
        return $state;
    };
    $(".js-example-templating").select2({
        templateResult: formatState,
        placeholder: "Choose Customer"
    });

    /* with images */
    function selectClient(client) {
        if (!client.id) { return client.text; }
        var $client = $(
            '<span><img src="../assets/images/faces/select2/' + client.element.value.toLowerCase() + '.jpg" /> '
            + client.text + '</span>'
        );
        return $client;
    };
    $(".select2-client-search").select2({
        templateResult: selectClient,
        templateSelection: selectClient,
        placeholder: "Choose Client",
        escapeMarkup: function (m) { return m; }
    });

    /* max selections limiting */
    $(".js-example-basic-multiple-limit-max").select2({
        maximumSelectionLength: 3,
        placeholder: "Choose Person",
    });

    /* Disablind select 2 controls */
    $(".js-example-disabled").select2();
    $(".js-example-disabled-multi").select2();

    $(".js-programmatic-enable").on("click", function () {
        $(".js-example-disabled").prop("disabled", false);
        $(".js-example-disabled-multi").prop("disabled", false);
    });
    $(".js-programmatic-disable").on("click", function () {
        $(".js-example-disabled").prop("disabled", true);
        $(".js-example-disabled-multi").prop("disabled", true);
    });

    /*  for rtl */
    document.querySelector("#switcher-rtl").addEventListener("click", () => {
        $('.js-example-basic-single').select2();
        $(".js-example-placeholder-single").select2({
            placeholder: "Select a state",
            allowClear: true,
            dir: "rtl"
        });


        /* basic select2 */
        $('.js-example-basic-single').select2({
            dir: "rtl"
        });

        /* multiple select */
        $('.js-example-basic-multiple').select2({
            dir: "rtl"
        });

        /* single select with placeholder */
        $(".js-example-placeholder-single").select2({
            placeholder: "Select a state",
            allowClear: true,
            dir: "rtl"
        });

        /* multiple select with placeholder */
        $(".js-example-placeholder-multiple").select2({
            placeholder: "Select a state",
            dir: "rtl"
        });

        /* templating */
        function formatState(state) {
            if (!state.id) {
                return state.text;
            }
            var baseUrl = "../assets/images/faces/select2";
            var $state = $(
                '<span><img src="' + baseUrl + '/' + state.element.value.toLowerCase() + '.jpg" class="img-flag" /> ' + state.text + '</span>'
            );
            return $state;
        };
        $(".js-example-templating").select2({
            templateResult: formatState,
            placeholder: "Choose Customer",
            dir: "rtl"
        });

        /* with images */
        function selectClient(client) {
            if (!client.id) { return client.text; }
            var $client = $(
                '<span><img src="../assets/images/faces/select2/' + client.element.value.toLowerCase() + '.jpg" /> '
                + client.text + '</span>'
            );
            return $client;
        };
        $(".select2-client-search").select2({
            templateResult: selectClient,
            templateSelection: selectClient,
            placeholder: "Choose Client",
            dir: "rtl",
            escapeMarkup: function (m) { return m; }
        });

        /* max selections limiting */
        $(".js-example-basic-multiple-limit-max").select2({
            maximumSelectionLength: 3,
            placeholder: "Choose Person",
            dir: "rtl"
        });

        /* Disablind select 2 controls */
        $(".js-example-disabled").select2({
            dir: "rtl"
        });
        $(".js-example-disabled-multi").select2({
            dir: "rtl"
        });

        $(".js-programmatic-enable").on("click", function () {
            $(".js-example-disabled").prop("disabled", false);
            $(".js-example-disabled-multi").prop("disabled", false);
        });
        $(".js-programmatic-disable").on("click", function () {
            $(".js-example-disabled").prop("disabled", true);
            $(".js-example-disabled-multi").prop("disabled", true);
        });

    })

})();