class Producto{

    constructor(nombre, precio, stock){
        
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    get_datos(){
        console.log("<---DATOS DEL PRODUCTO--->")
        console.log("Nombre: " , this.nombre);
        console.log("Precio: " , this.precio);
        console.log("Stock: " , this.stock);
        console.log("");
    }

    get_stock(){
        if(this.stock < 3){
            console.log("Quedan pocas unidades.");
        }
        console.log("Nombre: ", this.nombre ," Stock: " , this.stock);
    }

    compra_stock(cantidad){
        this.stock = this.stock + cantidad;
    }

    venta_stock(cantidad){
        if(this.stock >= cantidad){
            console.log("Venta efectuada.");
            this.stock = this.stock - cantidad;
            console.log(this.stock);
        }
        else{
            console.log("No hay stock disponible.")
        }
    }

}

let lampara = new Producto("Lampara" , 3000, 5);
let cocina = new Producto("Cocina" , 30000, 2);
let monitor = new Producto("Monitor" , 25000, 7);

lampara.get_datos();
cocina.get_datos();
monitor.get_datos();

lampara.get_stock();
cocina.get_stock();
monitor.get_stock();

//VENTA

let cantidad = prompt("cantidad");
monitor.venta_stock (cantidad);