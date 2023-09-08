var baseurl = window.location.origin;
let paymenttype_select = document.getElementById('paiement-type');
        
let paymentname_select = document.getElementById('paiement-nom');

paymenttype_select.onchange = function () {
paymenttype = paymenttype_select.value;



fetch('/paymentnames/' + encodeURI(paymenttype.trim()).toString().replaceAll('%','*')).then(function (response) {
response.json().then(function (data) {
    let optionHTML = '';

    optionHTML += "<option value='addnew'>Ajouter nouveau ?</option>";
    for (let paymentname of data.paymentnames) {
        optionHTML += '<option value="' + paymentname.name + '">' + paymentname.name + '</option>';
    }

    paymentname_select.innerHTML = optionHTML;
});
});

}



        



function apply_payment_filters()
{


    var daterange = document.getElementById("mainCalendar")
    var startDatee = new Date(daterange.value.split(" - ")[0])
    var endDatee = new Date(daterange.value.split(" - ")[1])
    

    var valid_filter = document.getElementById("filterselect").value
    
    var montantlower=document.getElementById("lower-value").innerText
    var montanthigher=document.getElementById("upper-value").innerText
    
    //alert(montanthigher)
    const myTimeout = setTimeout(function(){var table = $('table').DataTable();
 
    table
        .clear()
        .draw();
        populate_payment_table(startDatee.toISOString().split('T')[0],endDatee.toISOString().split('T')[0],montantlower,montanthigher,valid_filter)}, 200);
        //alert(startDatee.toISOString().split('T')[0])
    
}




function populate_payment_table(startdte='1900-01-01',enddte='3000-01-01',minamount=0,maxamount=99999999,validefilter='')
{

  
    var table2 = $('#responsiveDataTablepayment').DataTable({
       
       
        ajax: {
            url: `${baseurl}/get_module_data?moduletype=payment&startDate=${startdte}&endDate=${enddte}&minamount=${minamount}&maxamount=${maxamount}&validefilter=${validefilter}`,
            type: 'GET',
            
        },
        columns: [
            // Checkbox column
            {
                data: null,
                orderable: false,
                searchable: false,
                render: function (data, type, row) {
                    return '<input class="form-check-input rowCheckbox" type="checkbox" value="' + data[0] + '" />';
                },
            },
            // Action column
            {
                data: null,
                orderable: false,
                searchable: false,
                render: function (data, type, row) {
                    return `
                        <div class="hstack gap-2 fs-15">
                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-success-light "><i class="ri-check-line"></i></a>
                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-secondary-light duplicaterow "><i class="ri-file-copy-line"></i></a>
                            <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon waves-effect waves-light btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a>
                        </div>
                    `;
                },
            },
            { data: 0 },
            { data: 1 },
            { data: 2 },
            { data: 3 },
            { data: 4 },
            { data: 5 },
        ],
    });
    table2.draw()
    // Handle payment type change


}




