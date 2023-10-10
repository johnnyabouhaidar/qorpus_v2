      var row = $(`#${id}`).closest('tr');
      let table = $('#responsiveDataTable').DataTable();
      
      $("#salaire-type").val(table.cell( row ,3).data())
      fetch('/salairenames/' + encodeURI(table.cell( row ,3).data().trim()).toString().replaceAll('%','*').replaceAll('/','~')).then(function (response) {
        response.json().then(function (data) {
            let optionHTML = '';
        
            optionHTML += "<option value='addnew'>Ajouter nouveau ?</option>";
            for (let salairename of data.salairenames) {
                optionHTML += '<option value="' + salairename.name + '">' + salairename.name + '</option>';
            }
        
            salairename_select.innerHTML = optionHTML;
            $("#salaire-nom").val(table.cell( row ,4).data())
        });
        });
      
      $('input[name="somme"]').val(table.cell( row ,5).data())
      $('input[name="date"]').val(table.cell( row ,6).data())
      $('textarea[name="comment"]').val(table.cell( row ,7).data())
      $("#addsalairetModal").modal('show')