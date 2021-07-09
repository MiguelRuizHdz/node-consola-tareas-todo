require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');



// console.clear();

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) { //cargar tareas
        // Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // Crear opción
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;
            case '2': // listar completadas 
                tareas.listadoCompleto();
                break;
            case '3': // listar pendientes
                tareas.listarPendientesCompletadas(true);
                break;
            case '4': // completado | pendiente
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                console.log(ids)
                break;
            case '6': // borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Está seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada'.green);
                    }
                }
                break;

        }

        guardarDB(tareas.listadoArr);

        if (opt !== '0') await pausa();
    } while (opt !== '0');



};


main();