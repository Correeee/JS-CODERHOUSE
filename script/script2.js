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

//INGRESAR: PERMITE REGISTRAR TURNOS, ASIGNARLES UN NÚMERO Y AUMENTAR EL TIEMPO DE ESPERA. ✅

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
                    sala,
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
                    sala,
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

//MUESTRA EL TURNO CREADO RECIENTEMENTE, CON FECHA Y HORA DE INGRESO. ✅

function insertar_turno_html(){ 

    let turno__ingreso = document.getElementById("turno__ingreso"); //MUESTRA TURNO INGRESADO.
    turno__ingreso.innerHTML = array_usuarios[array_usuarios.length - 1].turno;

    let fecha__ingreso = document.getElementById("fecha__ingreso"); //MUESTRA FECHA DE TURNO INGRESADO.
    fecha__ingreso.innerHTML = array_usuarios[array_usuarios.length - 1].fecha;

    let hora__ingreso = document.getElementById("hora__ingreso"); //MUESTRA HORA DE TURNO INGRESADO 
    hora__ingreso.innerHTML = array_usuarios[array_usuarios.length-1].hora;
}

//LISTA LOS TURNOS EN LA TABLA. ✅

function listar_turnos(){

    //CREO EL TR Y LO INSERTO

    let tr_padre = document.querySelector("tbody") //SELECCIONA AL PADRE

    let tr = document.createElement("tr"); //CREA ELEMENTO
    tr.setAttribute("class" , "tr_append"); //ASIGNA CLASE

    tr_padre.append(tr); //AGREGA EL NODO

    tr.innerHTML = 
    
    `<td class="td_append_turno">${array_usuarios[array_usuarios.length-1].turno}</td><td class="td_append_sala">-</td>`;

}


//ELIMINA EL ÚLTIMO TURNO INGRESADO.✅

function eliminar_primer_turno(){ 

    let button_eliminar = document.getElementById("button_eliminar");
    
    button_eliminar.addEventListener("click" , function(e){

        if(array_usuarios.length > 0){
            alert(`¡ Turno eliminado: ${array_usuarios[0].turno} ! ❌`); 
            console.log("Turno eliminado:" , array_usuarios[0].turno);
            array_usuarios.shift();
            console.log(array_usuarios);

            //QUITA DEL LISTADO - REMOVE NODO

            let tr_padre = document.querySelector("tbody");

            tr_padre.removeChild(tr_padre.children[1]); //ELIMINA EL ÚLTIMO NODO AGREGADO.

            console.log("HIJOS:" , tr_padre.children.length) //MUESTRA LOS HIJOS DE TR_PADRE.
            console.log(array_usuarios); //MUESTRA EL ARRAY.
        }
        else if(array_usuarios.length === 0){
            alert("No existen turnos para eliminar.")
        }
    })
}






//Se ingresa un turno. Recorre el array hasta que encuentra el objeto con esa propiedad "turno". Lo quita del DOM. Lo borra del array.

function eliminar_turno(){

    let form__eliminar = document.getElementById("form__eliminar");

    form__eliminar.addEventListener("submit" , function(e){

        e.preventDefault();

        let input_eliminar = document.getElementById("input__eliminar_turno").value;

        let usuario_find = array_usuarios.find(function(usuario){ //BUSCA EL TURNO INGRESADO DENTRO DEL ARRAY.
            return usuario.turno == input_eliminar;
        })

        if(usuario_find == undefined){ //Arregla el "undefined" (junto al condicional Else If que prosigue).
            usuario_find = "";
        }

        if(input_eliminar == usuario_find.turno){
            
            alert("Turno eliminado: " + input_eliminar + " ✅");
            
            array_usuarios.pop(usuario_find); //BORRA EL USUARIO ENCONTRADO Y SU TURNO.

            
            console.log("<---ARRAY TOTAL--->" , "\n ", array_usuarios); //MUESTRA EL ARRAY RESULTANTE.

        }

        else if (input_eliminar != usuario_find.turno || usuario_find == ""){

            alert("El turno NO existe ❌");
            
        }
        
        form__eliminar.reset();
    })
}


//IMPRIME EL TURNO INGRESADO ✅

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
