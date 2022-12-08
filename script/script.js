//UNA APLICACIÓN QUE ASIGNE TURNOS Y LOS DIVIDA EN OBRA SOCIAL Y PARTICULAR. MOSTRARÁ LA HORA Y FECHA DE REGISTRO, ASÍ COMO EL TURNO "OBR-" Y "PAR-" SEGÚN SEA PARTICULAR U OBRA SOCIAL. CUANDO EL TURNO LLEGA A "OBR-99 o PAR-99" SE REINICIA.
//EL HTML ESTÁ DIVIDIDO EN 2: UNO PARA LA PERSONA QUE INGRESA EL TURNO, Y OTRO PARA QUE LOS USUARIOS PUEDAN IR VIENDO LA LISTA DE LOS TURNOS QUE VAN SALIENDO. LO PENSÉ EN UN ESTILO DE "CLÍNICA" O FARMACIA.

let turno_obra = 0; //VAN DEL 1 AL 99.
let turno_particular = 0; //VAN DEL 1 AL 99.
let nombre = "";
let apellido = "";
let dni = "";
let tipo_de_usuario = "";
let ingresar_nuevo_usuario = "";
let numero_obra = "";

//FECHA Y HORA

let date = new Date();
let dia = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
let mes =  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

let reloj = new Date();
let hora = reloj.toLocaleTimeString();
let fecha = (`${dia[date.getDay()]}, ${date.getDate()} de ${mes[date.getMonth()]} de ${date.getFullYear()}.`); 

//---------------------------------------------------------------------------

//INGRESAR: PERMITE REGISTRAR TURNOS, ASIGNARLES UN NÚMERO Y AUMENTAR EL TIEMPO DE ESPERA.

function Turnos(){
    reloj = new Date();
    hora = reloj.toLocaleTimeString();
    fecha = (`${dia[date.getDay()]}, ${date.getDate()} de ${mes[date.getMonth()]} de ${date.getFullYear()}.`); 
    console.log("<---USUARIO--->")
    while(nombre == ""){
        nombre = prompt("Nombre: ");
        console.log("Nombre:" , nombre);
    }
    
    while(apellido == ""){
        apellido = prompt("Apellido: ");
        console.log("Apellido:" , apellido);
    }
    
    while(dni == ""){
        dni = prompt("DNI: ");
        console.log("DNI:" , dni);
    } 
    while(tipo_de_usuario != "OBRA SOCIAL" || "PARTICULAR"){
        tipo_de_usuario = prompt("OBRA SOCIAL o PARTICULAR: ");

        if(tipo_de_usuario == "OBRA SOCIAL" || tipo_de_usuario == "obra social"){

            console.log("Tipo de usuario:" , tipo_de_usuario);

            numero_obra = prompt("¿Número de Obra Social?");

            console.log("Numero de Obra Social: " , numero_obra);
            turno_obra++;
            console.log("Turno: OBR-" + turno_obra);
            console.log("Fecha: " , fecha);
            console.log("Hora: " , hora);
            console.log("\n");

            alert("Nombre: " + nombre + "\n" + "Apellido: " + apellido + "\n" +"DNI: " + dni + "\n" + "Tipo de usuario: " + tipo_de_usuario + "\n" + "Numero de Obra Social: " + numero_obra + "\n" + "\n" + "TURNO: OBR-" + turno_obra + "\n" + "Fecha: "+ fecha + "\n" + "Hora: " + hora);
        

            Capturar_turnos_obra();

            if(turno_obra == 99){ //Vuelve a 0 el contador de turno_obra si llega a 99.
                turno_obra = 0;
            }

            Ingresar();

            break;
        }
        else if(tipo_de_usuario == "PARTICULAR" || tipo_de_usuario == "particular"){

            console.log("PARTICULAR");
            turno_particular++;
            console.log("Turno: PAR-" + turno_particular);
            console.log(fecha);
            console.log(hora);
            console.log("\n");

            alert("Nombre: " + nombre + "\n" + "Apellido: " + apellido + "\n" +"DNI: " + dni + "\n" + "Tipo de usuario: " + tipo_de_usuario + "\n" + "\n" + "TURNO: PAR-" + turno_particular + "\n" + "Fecha: "+ fecha + "\n" + "Hora: " + hora);

            Capturar_turnos_particulares();

            if(turno_particular == 99){ //Vuelve a 0 el contador de turno_particular si llega a 99.
                turno_particular = 0;
            }

            Ingresar();

            break;
        }
        else{
            alert("Vuelva a intentarlo.");
        }
    }
}

//INGRESAR: PERMITE INGRESAR NUEVOS USUARIOS.

function Ingresar(){

    ingresar_nuevo_usuario = prompt("¿Desea ingresar un nuevo usuario? Escriba SI o NO.")

    while(ingresar_nuevo_usuario != "SI" || ingresar_nuevo_usuario != "NO" || ingresar_nuevo_usuario != "si" || ingresar_nuevo_usuario != "no")
        if (ingresar_nuevo_usuario == "SI" || ingresar_nuevo_usuario == "si"){
                nombre = "";
                apellido = "";
                dni = "";
                tipo_de_usuario = "";
                numero_obra = "";
                reloj = "";
                hora = "";
                fecha = "";
                Turnos();
            }
            else if(ingresar_nuevo_usuario == "NO" || ingresar_nuevo_usuario == "no"){
                break;
            }
            else{
                alert("Ha ingresado un dato incorrecto. Vuelva a intentarlo.");
                Ingresar();
            }
}

//Captura los usuarios de OBRA SOCIAL en objetos.

function Capturar_turnos_obra(){
    function Usuario_obra(nombre, apellido, dni, tipo_de_usuario, numero_obra, turno_obra, fecha, hora){

            this.nombre = nombre;
            this.apellido = apellido;
            this.dni = dni;
            this.tipo_de_usuario = tipo_de_usuario;
            this.numero_obra = numero_obra;
            this.turno_obra = "OBR-" + turno_obra;
            this.fecha = fecha;
            this.hora = hora;
    }

    nuevo_usuario_obra = new Usuario_obra(nombre, apellido, dni, tipo_de_usuario, numero_obra, turno_obra, fecha, hora);
    Lista_obra(); 
}

//Captura los usuarios de PARTICULAR en objetos.

function Capturar_turnos_particulares(){

    function Usuario_particular(nombre, apellido, dni, tipo_de_usuario, turno_particular, fecha, hora){

            this.nombre = nombre;
            this.apellido = apellido;
            this.dni = dni;
            this.tipo_de_usuario = tipo_de_usuario;
            this.turno_particular = "PAR-" + turno_particular;
            this.fecha = fecha;
            this.hora = hora;
    }
    
    nuevo_usuario_particular = new Usuario_particular(nombre, apellido, dni, tipo_de_usuario, turno_particular, fecha, hora);
    Lista_particulares(); 
}

//Lista de turnos

let lista_turnos = []; 

//Agrega los turnos al array "lista_turnos".

function Lista_obra(){
    lista_turnos.push("OBR-" + turno_obra + " / Hora de ingreso: " + hora);
}
function Lista_particulares(){
    lista_turnos.push("PAR-" + turno_particular + " / Hora de ingreso: " + hora);
}


//EJECUCIÓN
alert("ASIGNACIÓN DE NÚMERO");
Turnos();
//Muestra la lista de turnos
console.log("<---TURNOS--->");
console.log(lista_turnos.join("\n"));



/*Eliminar último turno (Será un botón).
let eliminar_ultimo_usuario = lista_turnos.shift();*/

/*Eliminar un usuario específico (Será un input con un botón).
let eliminar_usuario_específico = lista_turnos.indexOf();*/

