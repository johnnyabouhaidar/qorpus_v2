
var baseurl = window.location.origin;

let percentage_activities_for_current_doctor=[]


function append_percentage_activity(){

}


function add_new_doctor(){
    let doctor_name = document.getElementById("doctor-name").value;
    let doctor_speciality = document.getElementById("doctor-speciality").value;
    let doctor_type = document.getElementById("type-select").value;
    let doctor_percentage = document.getElementById("pourcentage-medicins").value;
    let doctor_charge_sociales = document.getElementById("charges-sociales").value;
    let doctor_surface_accordee = document.getElementById("surface-accordee").value;
    let doctor_salaire = document.getElementById("salaire").value;
    let doctor_nombre_mois_salaire_an = document.getElementById("nombre-mois-salaire-an").value;
    let doctor_secretaire =document.getElementById("secretaire").value;
    let doctor_salaire_percentage = document.getElementById("secretaire-pourcentage");
    //let doctor_logiciel = document.getElementById("logiciel").options.Length;
    var logiciel_selected = [];
    for (var option of document.getElementById('logiciel').options)
    {
        if (option.selected) {
            logiciel_selected.push(option.value);
        }
    }

    alert(doctor_name+logiciel_selected)
}

add_new_doctor()