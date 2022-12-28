//UNA APLICACIÓN QUE ASIGNE TURNOS Y LOS DIVIDA EN OBRA SOCIAL Y PARTICULAR. MOSTRARÁ LA HORA Y FECHA DE REGISTRO, ASÍ COMO EL TURNO "OBR-" Y "PAR-" SEGÚN SEA PARTICULAR U OBRA SOCIAL. CUANDO EL TURNO LLEGA A "OBR-99 o PAR-99" SE REINICIA.
//EL HTML ESTÁ DIVIDIDO EN 2: UNO PARA LA PERSONA QUE INGRESA EL TURNO, Y OTRO PARA QUE LOS USUARIOS PUEDAN IR VIENDO LA LISTA DE LOS TURNOS QUE VAN SALIENDO. LO PENSÉ EN UN ESTILO DE "CLÍNICA" O FARMACIA.

let contador_obra = 0;
let contador_particular = 0;
let sala = "SALA";

/////////////////FECHA Y HORA///////////////////

let date = new Date();
let dia = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
let mes =  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

// let reloj = new Date();
// let hora = reloj.toLocaleTimeString();
// let fecha = (`${dia[date.getDay()]}, ${date.getDate()} de ${mes[date.getMonth()]} de ${date.getFullYear()}.`); 

///////////////////////////////////*PANEL DE CONTROL / VENTANILLA*/////////////////////////

//INGRESAR: PERMITE REGISTRAR TURNOS, ASIGNARLES UN NÚMERO Y AUMENTAR EL TIEMPO DE ESPERA.

let array_usuarios = [];

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

                contador_obra++;

                let usuario_obra = {
                    nombre: nombre.value, 
                    apellido: apellido.value, 
                    dni: dni.value, 
                    motivo: motivo_de_consulta.value,
                    tipo_de_usuario: tipo_de_usuario.value,
                    turno: `OBR-${contador_obra}`,
                    nombre_de_obra: nombre_obra.value,
                    numero_de_obra: numero_obra.value,
                    fecha,
                    hora,
                }

                array_usuarios.push(usuario_obra);
                alert(`¡ Turno creado: OBR-${contador_obra} ! ✅`)
                console.log(`OBR-${contador_obra}`);
            }

            else if(tipo_de_usuario.value == "Particular"){

                contador_particular++;

                let usuario_particular = {
                    nombre: nombre.value, 
                    apellido: apellido.value, 
                    dni: dni.value, 
                    motivo: motivo_de_consulta.value,
                    tipo_de_usuario: tipo_de_usuario.value,
                    turno: `PAR-${contador_particular}`,
                    fecha,
                    hora,
                }

                array_usuarios.push(usuario_particular);
                alert(`¡ Turno creado: PAR-${contador_particular} ! ✅`)
                console.log(`PAR-${contador_particular}`);

            }
            console.log("ARRAY USUARIOS" , array_usuarios);
            insertar_turno_html();
            listar_turnos();
            form__principal.reset(); //Resetea el formulario.
    })
}


//MUESTRA EL TURNO CREADO RECIENTEMENTE, CON FECHA Y HORA DE INGRESO.

function insertar_turno_html(){ 

    let turno__ingreso = document.getElementById("turno__ingreso"); //MUESTRA TURNO INGRESADO.
    turno__ingreso.innerHTML = array_usuarios[array_usuarios.length - 1].turno;

    let fecha__ingreso = document.getElementById("fecha__ingreso"); //MUESTRA FECHA DE TURNO INGRESADO.
    fecha__ingreso.innerHTML = array_usuarios[array_usuarios.length - 1].fecha;

    let hora__ingreso = document.getElementById("hora__ingreso");
    hora__ingreso.innerHTML = array_usuarios[array_usuarios.length-1].hora;
}

//LISTA LOS TURNOS EN LA TABLA.

function listar_turnos(){

    //CREO EL TR Y LO INSERTO
    let tr = document.createElement("tr"); //CREA ELEMENTO
    tr.setAttribute("class" , "tr_append"); //ASIGNA CLASE

    let tr_padre = document.querySelector("tbody") //SELECCIONA

    tr_padre.appendChild(tr); //AGREGA EL NODO


    //CREO LOS TD Y LO INSERTO
    //APPEND TURNO
    let td_turno = document.createElement("td");
    td_turno.setAttribute("class" , "td_append_turno");

    let td_padre = document.querySelector(".tr_append")

    td_padre.appendChild(td_turno);

    //APPEND TURNO
    td_sala = document.createElement("td");
    td_sala.setAttribute("class" , "td_append_sala");

    td_padre = document.querySelector(".tr_append")

    td_padre.appendChild(td_sala);

    //INSERTO EL CONTENIDO DE LOS TD

    td_turno.innerText = array_usuarios[array_usuarios.length-1].turno;

    td_sala.innerText = sala;

}


//ELIMINA EL ÚLTIMO TURNO INGRESADO.

function eliminar_primer_turno(){ 

    let button_eliminar = document.getElementById("button_eliminar");
    
    button_eliminar.addEventListener("click" , function(e){

        if(array_usuarios.length > 0){
            alert(`¡ Turno eliminado: ${array_usuarios[0].turno} ! ❌`); 
            console.log("Turno eliminado:" , array_usuarios[0].turno);
            array_usuarios.shift();
            console.log(array_usuarios);

            //QUITA DEL LISTADO - REMOVE APPEND




        }
        else if(array_usuarios.length === 0){
            alert("No existen turnos para eliminar.")
        }
    })
}

//Se ingresa un turno. Recorre el array hasta que encuentra el objeto con esa propiedad "turno". Lo borra del array.

function eliminar_turno(){

    let input_eliminar = document.getElementById("input__eliminar_turno");

    input_eliminar.addEventListener("change" , function(e){
        
        let input_eliminar_value = e.target.value;
        console.log("INPUT: " + input_eliminar_value);

        let form_eliminar = document.getElementById("form__eliminar");

        form_eliminar.addEventListener("submit" , function(e){
            
            e.preventDefault();

            for(let usuario of array_usuarios){
                if(input_eliminar_value == usuario.turno){
                    alert("TURNO ELIMINADO: " + input_eliminar_value + " ✅");
                    
                    //Llevar el value del input a "". Eliminar el objeto con ese turno del array. Hacer el remove del nodo.

                }
                else if(input_eliminar_value != usuario.turno){
                    alert("TURNO NO ENCONTRADO ❌");
                }
            }
            form_eliminar.reset();
        })
    })
}

//IMPRIME EL TURNO INGRESADO

function imprimir(){
    
    let btn__imprimir = document.getElementById("btn__imprimir");

    btn__imprimir.addEventListener("click" , function(){

        let ficha = document.getElementById("ventana__impresion");
        let ventimp = window.open();
        ventimp.document.write(ficha.innerHTML);
        ventimp.document.close();
        ventimp.print();
        ventimp.close();
        console.log("Imprimiendo el Turno ingresado.")

    })
}




//////////////////////////////FUNCIONES/////////////////////////////
ingresar();
eliminar_turno();
eliminar_primer_turno();
imprimir();
