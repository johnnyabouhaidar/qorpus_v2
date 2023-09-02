var baseurl = window.location.origin;

function populate_payment_table()
{
    const myTimeout = setTimeout(function(){var table = $('table').DataTable();
 
table
    .clear()
    .draw();
    }, 1000);
}


