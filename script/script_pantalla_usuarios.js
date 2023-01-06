
function turno_actual(){

    let local = JSON.parse(localStorage.getItem("usuarios"));

    // console.log("LISTA LOCAL-STORAGE" , local[0]);

    let padre = document.getElementById("turno_y_sala")
    // console.log(padre)

    let hijo = document.createElement("div")
    hijo.setAttribute("class" , "tr_append" )
    hijo.setAttribute("id" , "hijo_append" )

    padre.append(hijo)

        if(local?.length > 0){ //Si el local no existe, no tira error del innerHTML.

        hijo.innerHTML = `<div class="td_append_turno" id="hijo_append_prop">${local[0].turno}</div><div class="td_append_sala hijo_append_prop" id="hijo_append_${local[0].turno}">${local[0].sala}</div>`
    }

}

function mostrar_hora(){ //MUESTRA Y MANTIENE ACTUALIZADA LA HORA.

    let mostrar_reloj = document.getElementById("hora__actual");

    let hora_actual = new Date();

    mostrar_reloj.innerHTML = hora_actual.toLocaleTimeString();
}

function recargar_turno(){

    let local = JSON.parse(localStorage.getItem("usuarios"));

    // console.log("LISTA LOCAL-STORAGE" , local[0]);

    let padre = document.getElementById("turno_y_sala")
    // console.log(padre)

    let hijo = document.getElementById("hijo_append")

        if(local?.length > 0){ //Si el local no existe, no tira error del innerHTML.

        hijo.innerHTML = `<div class="td_append_turno" id="hijo_append_prop">${local[0].turno}</div><div class="td_append_sala hijo_append_prop" id="hijo_append_${local[0].turno}">${local[0].sala}</div>`
    }
}

setInterval( mostrar_hora , 1000); //Actualiza el reloj.
setInterval (recargar_turno , 1000) //Actualiza el último turno cada 10 segundos.

/////////////////////*FUNCIONES*/////////////////////

mostrar_hora();
turno_actual();
