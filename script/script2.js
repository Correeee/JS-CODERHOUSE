//UNA APLICACIÓN QUE ASIGNE TURNOS Y LOS DIVIDA EN OBRA SOCIAL Y PARTICULAR. MOSTRARÁ LA HORA Y FECHA DE REGISTRO, ASÍ COMO EL TURNO "OBR-" Y "PAR-" SEGÚN SEA PARTICULAR U OBRA SOCIAL. CUANDO EL TURNO LLEGA A "OBR-99 o PAR-99" SE REINICIA.
//EL HTML ESTÁ DIVIDIDO EN 2: UNO PARA LA PERSONA QUE INGRESA EL TURNO, Y OTRO PARA QUE LOS USUARIOS PUEDAN IR VIENDO LA LISTA DE LOS TURNOS QUE VAN SALIENDO. LO PENSÉ EN UN ESTILO DE "CLÍNICA" O FARMACIA.

let contador_obra = 0;
let contador_particular = 0;
let turno_obra = `OBR-${contador_obra}`; //Turno de paciente con Obra Social. VAN DEL 1 AL 99.
let turno_particular = `PAR-${contador_particular}`; //Turno de paciente Particular.VAN DEL 1 AL 99.
// let nombre = "";
// let apellido = "";
// let dni = "";
// let motivo_de_consulta = "";
// let tipo_de_usuario = ""; //OBR (OBRA SOCIAL) o PAR (PARTICULAR)
// let ingresar_nuevo_usuario = "";
// let nombre_obra = ""; //Nombre de la Obra Social.
// let numero_obra = ""; //Número de Obra Social.

// let numero_sala = ""; //Número de Sala al que debe ir el paciente.
// let input_turno_obr = ""; //input del Turno OBR.
// let input_turno_par = ""; //input del Turno PAR.
// let input_sala = ""; //input del Número de Sala.

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
let array_usuarios_obra = [];
let array_usuarios_particular = [];

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
        let fecha = (`${dia[date.getDay()]}, ${date.getDate()} de ${mes[date.getMonth()]} de ${date.getFullYear()}.`); 

        let tipo_de_usuario = document.getElementById("tipo_de_usuario");
            let value = tipo_de_usuario.value;

            if(value == "Obra Social"){

                contador_obra++;

                let usuario_obra = {
                    nombre: nombre.value, 
                    apellido: apellido.value, 
                    dni: dni.value, 
                    motivo: motivo_de_consulta.value,
                    tipo_de_usuario: tipo_de_usuario.value,
                    turno_obra: `OBR-${contador_obra}`,
                    nombre_de_obra: nombre_obra.value,
                    numero_de_obra: numero_obra.value,
                    fecha,
                    hora,
                }

                array_usuarios.push(usuario_obra);
                console.log(`OBR-${contador_obra}`);
            }

            else if(value == "Particular"){

                contador_particular++;

                let usuario_particular = {
                    nombre: nombre.value, 
                    apellido: apellido.value, 
                    dni: dni.value, 
                    motivo: motivo_de_consulta.value,
                    tipo_de_usuario: tipo_de_usuario.value,
                    turno_particular: `PAR-${contador_particular}`,
                    fecha,
                    hora,
                }

                array_usuarios.push(usuario_particular);
                console.log(`PAR-${contador_particular}`);

            }
            console.log("ARRAY USUARIOS" , array_usuarios);
    })
}

function borrar_turno(e){
    let form__eliminar = document.getElementById("form__eliminar");
    
    form__eliminar.addEventListener("submit" , function(e){
        console.log(e.target);
    })
    
}

function asignar_sala(){

}


//////////////////////////////FUNCIONES/////////////////////////////

ingresar();








