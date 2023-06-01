require('colors');
const { guardarDB, leerDB } = require('./helpers/guardaArchivo.js');
// const {mostrarMenu,pausa} = require('./helpers/salidas')
const { inquirerMenu, pausa, leerInput, listadoParaBorrar, confirmar,mostrarListadoCheckList } = require('./helpers/inquirer.js');
const Tareas = require('./models/tareas.js');
console.clear()

const main = async () => {


    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB)

    }



    do {
        opt = await inquirerMenu();
        console.log({ opt });

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc)

                break;

            case '2':
                tareas.listadoCompleto();


                break;

            case '3':
                tareas.listarPendientesYCompletadas(true);


                break;

            case '4':
                tareas.listarPendientesYCompletadas(false);


                break;
            case '5':
                const ids= await mostrarListadoCheckList(tareas.listadoArreglo);
                tareas.toggleCompletadas(ids)
    
    
                break;    

            case '6':
                const id = await listadoParaBorrar(tareas.listadoArreglo);
                if (id !== '0') {

                    const ok = await confirmar('¿Estás seguro, pero realmente seguro?');

                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente')
                    }
                }




                break;


        }

        guardarDB(tareas.listadoArreglo)



        await pausa();


    } while (opt !== '0');


}

main()