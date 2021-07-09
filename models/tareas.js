const Tarea = require('./tarea');

/**
 *  _listado:
 *      { 'uuid-12313-112123-2; { id:12, desc:asd, completadoEn:91921 } },
 */

class Tareas {

    _listado = {};

    // Getter para retornar un nuevo arreglo
    get listadoArr() {
        const listado = [];
        // Devuelve un arreglo de todas las llaves
        Object.keys(this._listado).forEach(key => {
            // Insertar tareas al listado 
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        console.log();
        this.listadoArr.forEach((tarea, index) => {

            const idx = `${index + 1}`.green;
            const { desc, completadoEn } = tarea;

            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${idx} ${ desc } :: ${ estado }`);


        });
    }

    listarPendientesCompletadas(completadas = true) {

        console.log();
        let contador = 0;

        this.listadoArr.forEach((tarea) => {


            const { desc, completadoEn } = tarea;

            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;


            if (completadas) {
                if (completadoEn) {
                    contador += 1;
                    console.log(`${ ( contador + '.' ).green } ${ desc } :: ${ completadoEn.green }`);
                }
            } else {
                if (!completadoEn) {
                    contador += 1;
                    console.log(`${ ( contador + '.' ).green } ${ desc } :: ${ estado }`);
                }
            }
        });

    }

    toggleCompletadas(ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }

        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }

}

module.exports = Tareas;