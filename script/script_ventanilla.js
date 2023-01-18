//UNA APLICACIÓN QUE ASIGNE TURNOS Y LOS DIVIDA EN OBRA SOCIAL Y PARTICULAR. MOSTRARÁ LA HORA Y FECHA DE REGISTRO, ASÍ COMO EL TURNO "OBR-" Y "PAR-" SEGÚN SEA PARTICULAR U OBRA SOCIAL. CUANDO EL TURNO LLEGA A "OBR-999 o PAR-999" SE REINICIA.
//EL HTML ESTÁ DIVIDIDO EN 2: UNO PARA LA PERSONA QUE INGRESA EL TURNO, Y OTRO PARA QUE LOS USUARIOS PUEDAN IR VIENDO LA LISTA DE LOS TURNOS QUE VAN SALIENDO. LO PENSÉ EN UN ESTILO DE "CLÍNICA" O FARMACIA.

/////SONIDO/////
let sonido = new Audio("../multimedia/sonido/bell.wav")

/////VARIABLES GLOBALES/////
let contador = 0;
let sala = "-";

//////ARRAY//////

let array_usuarios = [];
///////LOCAL STORAGE//////

let local = JSON.parse(localStorage.getItem("usuarios"));
let contador_final = JSON.parse(localStorage.getItem("contador"));

if(local?.length > 0){     
    array_usuarios = local; //Si existe un local storage, iguala el array a él.
    contador = contador_final; //Recupera el número final del contador, antes de haber salido del sitio web.
    let ultimo_usuario = array_usuarios[array_usuarios.length-1]
    let ultimo_turno = ultimo_usuario.turno;
    listar_turnos_storage();
    console.log("USUARIOS LOCAL-STORAGE:" , array_usuarios);
    console.log("CONTADOR LOCAL-STORAGE:" , contador)
    console.log("ULTIMO TURNO INGRESADO:" , ultimo_turno);
}
else{
    console.log("CONTADOR - NO LOCAL-STORAGE:" , contador)
}


/////////////////FECHA///////////////////

let date = new Date();
let dia = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
let mes =  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

///////////////////////////////////*PANEL DE CONTROL / VENTANILLA*/////////////////////////

//INGRESAR: PERMITE REGISTRAR TURNOS, ASIGNARLES UN NÚMERO Y AUMENTAR EL TIEMPO DE ESPERA. ✅


function ingresar(){

    let form__principal = document.getElementById("form__principal");

    form__principal.addEventListener("submit" , function(e){
        e.preventDefault();

        let nombre = document.getElementById("nombre");
        let apellido = document.getElementById("apellido");
        let dni = document.getElementById("dni");
        let motivo_de_consulta = document.getElementById("motivo_de_consulta");
        let nombre_obra = document.getElementById("nombre_obra");
        let numero_obra = document.getElementById("numero_obra");

        //DIA Y HORA DEL INGRESO//
        let reloj = new Date(); 
        let hora = reloj.toLocaleTimeString();
        let fecha = (`${dia[date.getDay()]}, ${date.getDate()} de ${mes[date.getMonth()]} de ${date.getFullYear()}`); 

        let tipo_de_usuario = document.getElementById("tipo_de_usuario");

            if(tipo_de_usuario.value == "Obra Social"){

                contador++;

                if(contador > 999){ //REINICIA EL CONTADOR.
                    contador = 1;
                }

                let usuario_obra = {
                    nombre: nombre.value, 
                    apellido: apellido.value, 
                    dni: dni.value, 
                    motivo: motivo_de_consulta.value,
                    tipo_de_usuario: tipo_de_usuario.value,
                    turno: `OBR-${contador}`,
                    nombre_de_obra: nombre_obra.value,
                    numero_de_obra: numero_obra.value,
                    fecha,
                    hora,
                    sala,
                }

                array_usuarios.push(usuario_obra);
                Swal.fire({
                        title: '¡TURNO CREADO!',
                        text: `OBR-${contador}`,
                        icon: 'success',
                        confirmButtonColor: '#2fe218',
                    }
                )
                console.log(`OBR-${contador}`);
            }

            else if(tipo_de_usuario.value == "Particular"){

                contador++;

                if(contador > 999){ //REINICIA EL CONTADOR.
                    contador = 1;
                }

                let usuario_particular = {
                    nombre: nombre.value, 
                    apellido: apellido.value, 
                    dni: dni.value, 
                    motivo: motivo_de_consulta.value,
                    tipo_de_usuario: tipo_de_usuario.value,
                    turno: `PAR-${contador}`,
                    fecha,
                    hora,
                    sala,
                }
                
                array_usuarios.push(usuario_particular);
                Swal.fire({
                        title: '¡TURNO CREADO!',
                        text: `PAR-${contador}`,
                        icon: 'success',
                        confirmButtonColor: '#2fe218',
                    }
                )
                console.log(`PAR-${contador}`);

            }
            usuarios_storage(); //GUARDA EN EL LOCAL STORAGE LOS USUARIOS.
            contador_storage(); //GUARDA EN EL LOCAL STORAGE EL ÚLTIMO TURNO DEL CONTADOR.
            console.log("ARRAY" , array_usuarios);
            insertar_turno_html();
            listar_turnos();

            form__principal.reset(); //Resetea el formulario.
    })
}

function usuarios_storage(){ //ACTUALIZA EL STORAGE.

    let array_usuarios_JSON = JSON.stringify(array_usuarios);

    localStorage.setItem("usuarios" , array_usuarios_JSON);

    let local_get =  localStorage.getItem("usuarios");
    
    let local_storage = JSON.parse(local_get);

    console.log("LOCAL STORAGE:" , local_storage);
}

function contador_storage(){
    let contador_JSON = JSON.stringify(contador);
    localStorage.setItem("contador" , contador_JSON)

}

//MUESTRA EL TURNO CREADO RECIENTEMENTE, CON FECHA Y HORA DE INGRESO. ✅

function insertar_turno_html(){ 

    let turno__ingreso = document.getElementById("turno__ingreso"); //MUESTRA TURNO INGRESADO.
    turno__ingreso.innerHTML = array_usuarios[array_usuarios.length - 1].turno;

    let fecha__ingreso = document.getElementById("fecha__ingreso"); //MUESTRA FECHA DE TURNO INGRESADO.
    fecha__ingreso.innerHTML = array_usuarios[array_usuarios.length - 1].fecha;

    let hora__ingreso = document.getElementById("hora__ingreso"); //MUESTRA HORA DE TURNO INGRESADO 
    hora__ingreso.innerHTML = array_usuarios[array_usuarios.length-1].hora;
    imprimir();
}

//BORRA EL TURNO MOSTRADO EN EL HTML (class: principal__turnoynumero).

function borrar_turno_html(){ //LO BORRA LUEGO DE 15 SEGUNDOS TRAS PRESIONAR EN IMPRIMIR
    
    let turno__ingreso = document.getElementById("turno__ingreso"); //MUESTRA TURNO INGRESADO.
    turno__ingreso.innerHTML = "--";

    let fecha__ingreso = document.getElementById("fecha__ingreso"); //MUESTRA FECHA DE TURNO INGRESADO.
    fecha__ingreso.innerHTML = "--:--";

    let hora__ingreso = document.getElementById("hora__ingreso"); //MUESTRA HORA DE TURNO INGRESADO 
    hora__ingreso.innerHTML = "--:--";

}


//LISTA LOS TURNOS EN LA TABLA. ✅

function listar_turnos(){

    //CREO EL TR Y LO INSERTO

    let tbody_padre = document.querySelector("tbody") //SELECCIONA AL PADRE

    let tr = document.createElement("tr"); //CREA ELEMENTO
    tr.setAttribute("class" , "tr_append"); //ASIGNA CLASE

    tbody_padre.append(tr); //AGREGA EL NODO

    let turno_td = array_usuarios[array_usuarios.length-1].turno;

    tr.innerHTML = `<td class="td_append_turno">${turno_td}</td><td class="td_append_sala" id="td_append_sala_${turno_td}">-</td>`;
}

function listar_turnos_storage(){ //LISTA LOS TURNOS DEL LOCAL STORAGE, Y CREA NUEVOS Y LOS AGREGA AL DOM.

    for (let i = 0; i < local.length; i++) { //RECORRE EL LOCAL STORAGE
        let turno_td = local[i].turno;
        // console.log("TURNOS LOCAL:" , turno_td);
        let tbody_padre = document.querySelector("tbody") //SELECCIONA AL PADRE

        let tr = document.createElement("tr"); //CREA ELEMENTO
        tr.setAttribute("class" , "tr_append"); //ASIGNA CLASE
    
        tbody_padre.append(tr); //AGREGA EL NODO
        tr.innerHTML = `<td class="td_append_turno">${turno_td}</td><td class="td_append_sala" id="td_append_sala_${turno_td}">-</td>`;
    }

}

//ELIMINA EL ÚLTIMO TURNO INGRESADO.✅

function eliminar_primer_turno(){ 

    let button_eliminar = document.getElementById("button_eliminar");
    
    button_eliminar.addEventListener("click" , function(e){

        if(array_usuarios.length > 0 ){

            Swal.fire({
                title: '¡TURNO ELIMINADO!',
                text: `${array_usuarios[0].turno}`,
                icon: 'success',
                confirmButtonColor: '#2fe218',
            })

            console.log("Turno eliminado:" , array_usuarios[0].turno);
            array_usuarios.shift();
            console.log(array_usuarios);

            //QUITA DEL LISTADO - REMOVE NODO

            let tbody_padre = document.querySelector("tbody");

            tbody_padre.removeChild(tbody_padre.children[1]); //ELIMINA EL ÚLTIMO NODO AGREGADO.

            console.log("HIJOS:" , tbody_padre.children.length) //MUESTRA LOS HIJOS DE tbody_padre.
            console.log("<---ARRAY TOTAL--->" , "\n" , array_usuarios); //MUESTRA EL ARRAY.
            usuarios_storage(); //ACTUALIZA EL LOCAL STORAGE.
        }

        else if(array_usuarios.length === 0){
            Swal.fire({
                title: 'NO HAY TURNOS REGISTRADOS',
                icon: 'error',
                confirmButtonColor: '#2fe218',
            })
        }
    })
}


//Se ingresa un turno. Recorre el array hasta que encuentra el objeto con esa propiedad "turno". Lo quita del DOM. Lo borra del array. NO LA UTILIZARÉ EN EL PROYECTO. ME RESULTA INNECESARIA.


//IMPRIME EL TURNO INGRESADO ✅

function imprimir(){
    
    let btn__imprimir = document.getElementById("btn__imprimir");

    btn__imprimir.addEventListener("click" , function(){

        let ficha = document.getElementById("ventana__impresion");
        let ventimp = window.open("ventana__impresion");
        ventimp.document.write(ficha.innerHTML);
        ventimp.document.close();
        ventimp.print();
        ventimp.close();
        console.log("Imprimiendo el Turno ingresado.")

        setTimeout(borrar_turno_html, 10000); 

    })
}


function habilitar_input_select(){

    let select = document.getElementById("tipo_de_usuario");

    select.addEventListener("change" , function(e){

        let value = e.target.value;
        
        if(value == "Obra Social"){

            let nombre_obra = document.getElementById("nombre_obra");
            nombre_obra.disabled=false;
            nombre_obra.setAttribute("required" , "")
            let numero_obra = document.getElementById("numero_obra");
            numero_obra.disabled=false;
            numero_obra.setAttribute("required" , "")

        }
        else if(value == "Particular"){
            let nombre_obra = document.getElementById("nombre_obra");
            nombre_obra.disabled=true;
            let numero_obra = document.getElementById("numero_obra");
            numero_obra.disabled=true;
        }

    })

}

function input_deshabilitado(){ //Deshabilita el input_sala por defecto.

    let input_sala = document.getElementById("input__asignar_sala");
    input_sala.disabled=true;

    let nombre_obra = document.getElementById("nombre_obra");
    nombre_obra.disabled=true;

    let numero_obra = document.getElementById("numero_obra");
    numero_obra.disabled=true;

}

//ASIGNAR SALA

function asignar_sala(){

    let input_turno = document.getElementById("input__asignar_turno");

    input_turno.addEventListener("change" , function(e){
        input_turno = e.target.value;
        input_turno = input_turno.toUpperCase();
        console.log("INPUT:" , input_turno);
        
        let usuario_encontrado = array_usuarios.find(function(usuario){
            return usuario.turno == input_turno;
        })

        console.log("ENCONTRADO EN ARRAY--->" , usuario_encontrado?.turno);

        if(input_turno == usuario_encontrado?.turno){
            let input_sala = document.getElementById("input__asignar_sala");
            input_sala.disabled=false;
            
        }
        else if (input_turno != usuario_encontrado?.turno){
            let input_sala = document.getElementById("input__asignar_sala");
            input_sala.disabled=true;
            Swal.fire({
                title: 'EL TURNO NO EXISTE',
                text: `VUELVA A INTENTARLO`,
                icon: 'error',
                confirmButtonColor: '#2fe218',
            })
            form_asignar.reset();
        }
    })

        let input_sala = document.getElementById("input__asignar_sala");
        input_sala.addEventListener("change" , function(e){

        input_sala = e.target.value;
        console.log("INPUT SALA:" , input_sala);

    })

    let form_asignar = document.getElementById("form__asignar_sala")

    form_asignar.addEventListener("submit" , function(e){
        e.preventDefault();

        let input_turno = document.getElementById("input__asignar_turno").value;
        input_turno = input_turno.toUpperCase();
        let input_sala = document.getElementById("input__asignar_sala").value

        if(input_sala >=1 && input_sala <= 10){
            Swal.fire({
                title: 'SALA ASIGNADA',
                text: `🏢 ${input_turno} ASIGNADO A SALA: ${input_sala} 🏢`,
                icon: 'success',
                confirmButtonColor: '#2fe218',
            })

            let turno_array = array_usuarios.find(function(usuario){
                return usuario.turno == input_turno;
            })

            turno_array.sala = input_sala;
            
            console.log("Turno: " + input_turno +" ✅" +"\n" + "Asignado a Sala: " + input_sala + " 🏢");
            console.log(`<---ARRAY TOTAL: ${array_usuarios.length} usuario/s--->` , "\n" , array_usuarios);

            //CAMBIA LA SALA EN EL NODO.

            let turno_td = input_turno;
            let td_append_sala = document.getElementById(`td_append_sala_${turno_td}`);

            console.log(turno_td);

            td_append_sala.innerText = input_sala;
            
        }

        else{
            Swal.fire({
                title: 'SALA NO ASIGNADA',
                text: 'Ingrese un valor de sala entre 1 y 10',
                icon: 'error',
                confirmButtonColor: '#2fe218',
            })
            console.log("<---ARRAY TOTAL--->" , "\n" , array_usuarios);
        }
        usuarios_storage() //En este caso, llamo a la función para guardar la sala en el LOCAL STORAGE("usuario").
        form_asignar.reset();
        input_deshabilitado();
    })
}


function recuperar_salas(){

    if(local?.length > 0){
        console.log("<---SALAS RECUPERADAS DEL LOCAL STORAGE--->")
        
        for(let usuario of local){

            console.log("TURNO:" , usuario.turno, "/ SALA:" , usuario.sala);
            
            let td_append = document.getElementById(`td_append_sala_${usuario.turno}`)
            console.log(td_append);
            td_append.innerText = usuario.sala;

        }
    }

}

function reiniciar_sistema(){

    let btn_reiniciar = document.getElementById("btn_reiniciar");

    btn_reiniciar.addEventListener("click" , function(e){

        let btn_pregunta = prompt("Si queres reiniciar el sistema escribe: 'REINICIAR SISTEMA' ✅ / ❌").toUpperCase();
        

        if(btn_pregunta == "REINICIAR SISTEMA"){
            console.log("ACCIÓN:" , btn_pregunta);
            Swal.fire({
                title: 'REINICIO DE SISTEMA',
                text: `SE RECARGARÁ LA PÁGINA`,
                icon: 'success',
                confirmButtonColor: '#2fe218',
                showConfirmButton: false,
            }
        )
        setTimeout(resetear_sistema , 3000)
        }
        else{
            Swal.fire({
                title: 'SISTEMA NO REINICIADO',
                text: `VUELVA A INTENTARLO`,
                icon: 'error',
                confirmButtonColor: '#2fe218',
                showConfirmButton: false,
            })
        }

    })

}

function resetear_sistema(){ //REINICIA EL SISTEMA. BORRA EL LOCAL Y EL ARRAY.
    localStorage.clear()
    location.reload()
}

//VUELVE MAYUSCULA LO ESCRITO EN EL INPUT.
function mayus(e) {
    e.value = e.value.toUpperCase();
}

//////////////////////////////FUNCIONES/////////////////////////////
ingresar();
recuperar_salas();
input_deshabilitado();
asignar_sala();
eliminar_primer_turno();
habilitar_input_select();
reiniciar_sistema();