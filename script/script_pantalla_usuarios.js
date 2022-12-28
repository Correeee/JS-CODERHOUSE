function mostrar_hora(){

    let mostrar_reloj = document.getElementById("hora__actual");

    let hora_actual = new Date();

    mostrar_reloj.innerHTML = hora_actual.toLocaleTimeString();
    
}

setInterval( mostrar_hora , 1000);

/////////////////////*FUNCIONES*/////////////////////

mostrar_hora()