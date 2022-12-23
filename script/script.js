//UNA APLICACIÓN QUE ASIGNE TURNOS Y LOS DIVIDA EN OBRA SOCIAL Y PARTICULAR. MOSTRARÁ LA HORA Y FECHA DE REGISTRO, ASÍ COMO EL TURNO "OBR-" Y "PAR-" SEGÚN SEA PARTICULAR U OBRA SOCIAL. CUANDO EL TURNO LLEGA A "OBR-99 o PAR-99" SE REINICIA.
//EL HTML ESTÁ DIVIDIDO EN 2: UNO PARA LA PERSONA QUE INGRESA EL TURNO, Y OTRO PARA QUE LOS USUARIOS PUEDAN IR VIENDO LA LISTA DE LOS TURNOS QUE VAN SALIENDO. LO PENSÉ EN UN ESTILO DE "CLÍNICA" O FARMACIA.

let turno_obra = 0; //Turno de paciente con Obra Social. VAN DEL 1 AL 99.
let turno_particular = 0; //Turno de paciente Particular.VAN DEL 1 AL 99.
let nombre = "";
let apellido = "";
let dni = "";
let motivo_de_consulta = "";
let tipo_de_usuario = ""; //OBR (OBRA SOCIAL) o PAR (PARTICULAR)
let ingresar_nuevo_usuario = "";
let nombre_obra = ""; //Nombre de la Obra Social.
let numero_obra = ""; //Número de Obra Social.

let numero_sala = ""; //Número de Sala al que debe ir el paciente.
let input_turno_obr = ""; //input del Turno OBR.
let input_turno_par = ""; //input del Turno PAR.
let input_sala = ""; //input del Número de Sala.

/////////////////FECHA Y HORA///////////////////

let date = new Date();
let dia = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
let mes =  ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

let reloj = new Date();
let hora = reloj.toLocaleTimeString();
let fecha = (`${dia[date.getDay()]}, ${date.getDate()} de ${mes[date.getMonth()]} de ${date.getFullYear()}.`); 

///////////////////////////////////*PANEL DE CONTROL / VENTANILLA*/////////////////////////

//INGRESAR: PERMITE REGISTRAR TURNOS, ASIGNARLES UN NÚMERO Y AUMENTAR EL TIEMPO DE ESPERA.

function turnos(){
    reloj = new Date();
    hora = reloj.toLocaleTimeString();
    fecha = (`${dia[date.getDay()]}, ${date.getDate()} de ${mes[date.getMonth()]} de ${date.getFullYear()}.`); 
    while(nombre == ""){
        nombre = document.getElementsByClassName(nombre);
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

    while(motivo_de_consulta == ""){
        motivo_de_consulta = prompt("Motivo de consulta: ");
        console.log("Motivo de consulta:" , motivo_de_consulta);
    } 

    guardar_en_base_datos_usuarios();

    while(tipo_de_usuario != "OBRA SOCIAL" || "PARTICULAR"){
        tipo_de_usuario = prompt("OBRA SOCIAL o PARTICULAR: ");

        if(tipo_de_usuario == "OBRA SOCIAL" || tipo_de_usuario == "obra social"){

            console.log("Tipo de usuario:" , tipo_de_usuario);

            nombre_obra = prompt("Obra Social: ");
            console.log("Obra social:" , nombre_obra);

            numero_obra = prompt("¿Número de Obra Social?");

            console.log("Numero de Obra Social: " , numero_obra);
            turno_obra++;
            console.log("Turno: OBR-" + turno_obra);
            console.log("Fecha: " , fecha);
            console.log("Hora: " , hora);
            console.log("\n");

            alert("Nombre: " + nombre + "\n" + "Apellido: " + apellido + "\n" +"DNI: " + dni + "\n" + "Tipo de usuario: " + tipo_de_usuario + "\n" + "Obra Social: " + nombre_obra + "\n" + "Numero de Obra Social: " + numero_obra + "\n" + "\n" + "TURNO: OBR-" + turno_obra + "\n" + "Fecha: "+ fecha + "\n" + "Hora: " + hora);
        

            capturar_turnos_obra();

            if(turno_obra == 99){ //Vuelve a 0 el contador de turno_obra si llega a 99.
                turno_obra = 0;
            }

            ingresar();

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

            capturar_turnos_particulares();

            if(turno_particular == 99){ //Vuelve a 0 el contador de turno_particular si llega a 99.
                turno_particular = 0;
            }

            ingresar();

            break;
        }
        else{
            alert("Vuelva a intentarlo.");
        }
    }
}

//INGRESAR: PERMITE INGRESAR NUEVOS USUARIOS.

function ingresar(){

    ingresar_nuevo_usuario = prompt("¿Desea ingresar un nuevo usuario? Escriba SI o NO.")

    while(ingresar_nuevo_usuario != "SI" || ingresar_nuevo_usuario != "NO" || ingresar_nuevo_usuario != "si" || ingresar_nuevo_usuario != "no")
        if (ingresar_nuevo_usuario == "SI" || ingresar_nuevo_usuario == "si"){
                nombre = "";
                apellido = "";
                dni = "";
                motivo_de_consulta = "";
                tipo_de_usuario = "";
                nombre_obra = "";
                numero_obra = "";
                reloj = "";
                hora = "";
                fecha = "";
                turnos();
            }
            else if(ingresar_nuevo_usuario == "NO" || ingresar_nuevo_usuario == "no"){
                break;
            }
            else{
                alert("Ha ingresado un dato incorrecto. Vuelva a intentarlo.");
                ingresar();
            }
}

//Captura los usuarios de OBRA SOCIAL en objetos.

function capturar_turnos_obra(){
    function usuario_obra(nombre, apellido, dni, tipo_de_usuario, numero_obra, turno_obra, fecha, hora){

            this.nombre = nombre;
            this.apellido = apellido;
            this.dni = dni;
            this.tipo_de_usuario = tipo_de_usuario;
            this.numero_obra = numero_obra;
            this.turno_obra = "OBR-" + turno_obra;
            this.fecha = fecha;
            this.hora = hora;
            
    }

    nuevo_usuario_obra = new usuario_obra(nombre, apellido, dni, tipo_de_usuario, numero_obra, turno_obra, fecha, hora);
    lista_obra(); 
}

//Captura los usuarios de PARTICULAR en objetos.

function capturar_turnos_particulares(){

    function usuario_particular(nombre, apellido, dni, tipo_de_usuario, turno_particular, fecha, hora){

            this.nombre = nombre;
            this.apellido = apellido;
            this.dni = dni;
            this.tipo_de_usuario = tipo_de_usuario;
            this.turno_particular = "PAR-" + turno_particular;
            this.fecha = fecha;
            this.hora = hora;
    }
    
    nuevo_usuario_particular = new usuario_particular(nombre, apellido, dni, tipo_de_usuario, turno_particular, fecha, hora);
    lista_particulares(); 
}

//Lista de turnos

let lista_turnos = []; 

//Base de datos de usuarios
let base_datos_usuarios = [];

//GUARDAR USUARIO EN BASE DE DATOS.

function guardar_en_base_datos_usuarios(){
    base_datos_usuarios.push("Nombre: " + nombre , + "Apellido: " + apellido , "DNI: " + dni);
}

//Agrega los turnos al array "lista_turnos".

function lista_obra(){
    lista_turnos.push("OBR-" + turno_obra + " / Hora de ingreso: " + hora);
}
function lista_particulares(){
    lista_turnos.push("PAR-" + turno_particular + " / Hora de ingreso: " + hora);
}

//Muestra la lista de turnos.
function mostrar_listas(){
    console.log(lista_turnos.join("\n"));
}

/*-----------------------------------------------------------------------------------*/

///////////////////////////////*PANEL DE ELIMINACIÓN*///////////////////////////////

/*Eliminar último turno (Será un botón).*/
function eliminar_ultimo_turno(){
    let eliminar_ultimo_turno = lista_turnos.shift();
    console.log(eliminar_ultimo_turno);
}

//////////////////////////////////////PANEL DE ASIGNACION//////////////////////////////////

//A qué tipo de usuario querés asignarle una sala (Esto no va a estar más después porque hay un input para cada tipo).

function que_tipo_asignar(){
    tipo_asignar = prompt("¿Qué tipo de usuario desea asignar? ¿OBR o PAR?")
    if(tipo_asignar == "OBR"){
        asignacion_de_sala_obr();
    }
    else if(tipo_asignar == "PAR"){
        asignacion_de_sala_par();
    }
    else{
        alert("Ingreso un valor incorrecto. Vuelva a intentarlo.")
        que_tipo_asignar();
    }
}


/*Asignar Sala a Turno OBR*/

let panel_listado_obr = []

function asignacion_de_sala_obr(){
    alert("A continuación, asignaremos una Sala a un Turno OBRA SOCIAL.")
    input_turno_obr = prompt("Turno OBR-: ");
    if(input_turno_obr == turno_obra){
        alert("Turno ingresado correctamente.")
        console.log("Turno: " , input_turno_obr)
        input_sala = prompt("Sala a asignar: ");
            if(input_sala <= 1 || input_sala <= 10){
                console.log("Sala asignada: " , input_turno_obr)
                turno_y_sala = "Turno: " + input_turno_obr + " " + "Sala: " + input_sala;
                panel_listado_obr.push = turno_y_sala;
                console.log(panel_listado_obr);
                console.log(turno_y_sala);
            }
    }
    else if(input_turno_obr != turno_obra){
        alert("Turno ingresado de forma incorrecta. Intente nuevamente");
        asignacion_de_sala_obr();
    }
}

/*Asignar Sala a Turno PAR*/

let panel_listado_par = [];

function asignacion_de_sala_par(){
    alert("A continuación, asignaremos una Sala a un Turno PARTICULAR.")
    input_turno_par = prompt("Turno PAR-: ");
    if(input_turno_par == turno_particular){
        alert("Turno ingresado correctamente.")
        console.log("Turno: " , input_turno_par)
        if(input_sala <= 1 || input_sala <= 10){
            input_sala = prompt("Sala a asignar: ");
            console.log("Sala asignada: " , input_turno_par)
            turno_y_sala = ("Turno: " + input_turno_par + " " + "Sala: " + input_sala);
            panel_listado_par.push = turno_y_sala;
            console.log(panel_listado_par);
            console.log(turno_y_sala);
        }
    }
    else if(input_turno_par != turno_particular){
        alert("Turno ingresado de forma incorrecta. Intente nuevamente");
        asignacion_de_sala_par();
    }
}

////////////////////////////////////////////EJECUCIÓN/////////////////////////////
alert("ASIGNACIÓN DE NÚMERO");
turnos();
mostrar_listas();
// que_tipo_asignar();


//ME FALTA TRAER LA PROPIEDAD TURNO DE LA LISTA_OBR Y LISTA_PAR, Y ASIGNARLES UNA SALA. 
//ME ESTÁ TOMANDO EL ÚLTIMO TURNO, COMO SI LOS DEMÁS NO EXISTIERAN. DEBO TRAER EL DATO DEL ARRAY.