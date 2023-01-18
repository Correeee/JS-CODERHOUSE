/////SONIDO/////
let sonido = new Audio("../multimedia/sonido/bell.wav")

/////VARIABLES PARA LA API//////

let temperatura;

//////////////API//////////////////


fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&units=metric&lang=es&appid=c35e8ea0fba6b3b63fc9262fac9f84c5")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let temperatura = data.main.temp;
        temperatura = temperatura.toFixed(1)
        console.log("Temperatura: " , temperatura);
        let icono = data.weather[0].icon;
        console.log(icono)

        document.getElementById("temperatura").innerHTML = `${temperatura}°C <img src="http://openweathermap.org/img/wn/${icono}@2x.png" alt="clima" class="img__clima">`
    }
        )


        

function turno_actual(){
    let local = JSON.parse(localStorage.getItem("usuarios"));

    // console.log("LISTA LOCAL-STORAGE" , local[0]);

    let padre = document.getElementById("turno_y_sala")
    // console.log(padre)

    let hijo = document.createElement("div")
    hijo.setAttribute("class" , "tr_append" )
    hijo.setAttribute("id" , "hijo_append" )

    padre.append(hijo)


        if(local?.length > 0 && local[0].sala != "-"){ //Si el local no existe, no tira error del innerHTML.

        hijo.innerHTML = `<div class="td_append_turno" id="hijo_append_prop">${local[0].turno}</div><div class="td_append_sala hijo_append_prop" id="hijo_append_${local[0].turno}">${local[0].sala}</div>`
    }
        else if(local?.length == 0){
            hijo.innerHTML = "<p class='titulo__noturnos'>NO EXISTEN TURNOS</p>";
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

    //let padre = document.getElementById("turno_y_sala")
    // console.log(padre)

    let hijo = document.getElementById("hijo_append")

        if(local?.length > 0 && local[0].sala != "-"){ //Si el local no existe, no tira error del innerHTML. El local[0].sala != "-" hace que no se actualice si la sala no está asignada.

        hijo.innerHTML = `<div class="td_append_turno" id="hijo_append_prop">${local[0].turno}</div><div class="td_append_sala hijo_append_prop" id="hijo_append_${local[0].turno}">${local[0].sala}</div>`
        
    }
        else if(local?.length == 0){
            hijo.innerHTML = "<p class='titulo__noturnos'>NO EXISTEN TURNOS</p>";
        }
}


setInterval( mostrar_hora , 1000); //Actualiza el reloj.
setInterval (recargar_turno , 1000) //Actualiza el último turno cada 10 segundos.
/////////////////////*FUNCIONES*/////////////////////

mostrar_hora();
turno_actual();