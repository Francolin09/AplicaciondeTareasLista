const Tarea = require("./tarea");


class Tareas {
    _listado = {};

    get listadoArreglo() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })

        return listado

        //ya. te explico , primero tenemos el objeto _listado inciailizado vacio
        // despues hacemos un getter que devolverá el listado pero como arreglo
        //para hacer eso primero inicializamos un listado que será un arreglo vacio
        //luego a traves de object.key que obtiene las key o los id de un objeto le pasamos el _listado
        // si analizamos el .keys notamos que devuelve un arreglo asi que bacancito
        //luego usamos un form each para recorrer cada una de las instancias encontradas
        //como sabemos que el keys solo devuelve keys entonces en el foreach sabemos que recibiremos lo mismo
        //asi que el parametro será key. luego creamos una constante llamada tarea la cual 
        //tendrá el valor de _listado pero con la variable key que estamos recibiendo;
        //o sea que buscara cual de los datos guardados tiene esa key y paf la devuelve.
        //finalmente a listado que es un arreglo le agregamos la tarea que devolvio segun sun key y al final 
        //retornamos listado como arreglo y asi se ve más bonito que te parece

    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;

    }

    listadoCompleto() {
        this.listadoArreglo.forEach((tarea, i) => {
            const indice = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Prendiente'.red
            console.log(`${indice} ${desc} :: ${estado}`)

        })
    }

    listarPendientesYCompletadas(completadas = true) {

        let contador = 0;
        this.listadoArreglo.forEach(tarea => {
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn)
                ? 'Completada'.green
                : 'Pendiente'.red
            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green}. ${desc} :: ${estado}`)
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${contador.toString().green}. ${desc} :: ${estado}`)
                }
            }
        })

    }

    toggleCompletadas(ids=[]){
        ids.forEach( id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArreglo.forEach( tarea => {
            if(!ids.includes(tarea.id)){
                const taream = this._listado[tarea.id];
                taream.completadoEn = null;
            }
        })
    };

    
}




module.exports = Tareas;