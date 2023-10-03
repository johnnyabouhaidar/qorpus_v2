var baseurl = window.location.origin;


function modify_medicins_data(){

}


function load_medicins_data(){
    let curr_url=window.location;
    var url = new URL(curr_url);
    var id = url.searchParams.get("id");
    const response = fetch(`${baseurl}/get_module_data?moduletype=medicins&id=${id}`).then((response) => {
        return response.json();
      }).then((json) => {let items = json
      console.log(items)
        
     
      
      document.getElementById("doctor-name").value = items['name']
      document.getElementById("doctor-speciality").value =items['speciality'];
      $("#type-select").val(items['type']);
      
      document.getElementById("pourcentage-medicins").value =items['perc_share'];
      document.getElementById("charges-sociales").value = items['charge_soc'];
      document.getElementById("surface-accordee").value=items['surface_accorde'];
      document.getElementById("salaire").value = items['medsalaire'];
      document.getElementById("nombre-mois-salaire-an").value = items['salaireparan'];
      $("#secretaire").val(items['secretaire']);
      document.getElementById("secretaire-pourcentage").value = items['secretaire_perc'];

      $.each(items['logiciel'].split("||"), function(i,e){
        $("#logiciel option[value='" + e + "']").prop("selected", true);
        
    });
    
      let table = $('#responsiveDataTable').DataTable();


      perc_act = items['activities']
      for (var i=0;i<perc_act.length;i++){
        
        table.row.add(["2","2",perc_act[i]["0"],perc_act[i]["1"],perc_act[i]["2"],perc_act[i]["3"]]).node().id = perc_act[i]["0"];
        
      }
      table.draw();
      /*table.row.add([row_checkbox,row_functions,rowUID,pour_de,pour_a,pour_perc]).node().id = rowUID;*/
      
    
    });
}