const inquirer = require('inquirer')
require('colors');

const preguntas = [ 
    {
        type: 'list',
        name: 'opcion',
        message:'¿Que deseas hacer?',
        choices: [
            {
                value:'1',
                name:`${'1'.green } Crear tarea`

            },
            {
                value:'2',
                name:`${'2'.green } Listar tarea`

            },
            {
                value:'3',
                name:`${'3'.green } Listar tareas completadas`

            },
            {
                value:'4',
                name:`${'4'.green } Listar tareas pendientes`

            },
            {
                value:'5',
                name: `${'5'.green } Completar tarea(s)`

            },
            {
                value:'6',
                name:`${'6'.green } Borrar tarea`

            },
            {
                value:'0',
                name:`${'0'.green} Salir`
            }
        ]
    }
]

const inquirerMenu = async () => {
    // console.clear();
    console.log('=========================='.green);
    console.log("  Seleccione una opción".white)
    console.log('==========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;


}

const pausa = async ()=> {

    const question = [
        {
            type:'input',
            name:'enter',
            message:`Presione ${'ENTER'.green} para continuar`
        }
    ]
    console.log('\n')
    await inquirer.prompt(question)
}

const leerInput = async (mensaje) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: mensaje,
            validate(value){
                if(value.length === 0){
                    return 'Ingresa algún valor'
                }
                return true; 
            }
        }
    ]

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listadoParaBorrar = async(tareas = []) => {


    const choices = tareas.map((tarea,i) => {
        const indice = `${i+1}`.green
        return {
            
        value: tarea.id,
        name: `${indice} ${tarea.desc}`
       }
    });

    choices.unshift({
        value:'0',
        name:'o.'.green +' Cancelar'
    })
    const preguntas = [
        {
            type:'list',
            name:'id',
            message:'Borrar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas);
    return id;
    

}

const confirmar  = async (mensaje) => {
    const pregunta = [
        {
            type:'confirm',
            name:'ok',
            message: mensaje
        }
    ];

    const {ok} = await inquirer.prompt(pregunta)
    return ok;
}


const mostrarListadoCheckList = async(tareas = []) => {


    const choices = tareas.map((tarea,i) => {
        const indice = `${i+1}`.green
        return {
            
        value: tarea.id,
        name: `${indice} ${tarea.desc}`,
        checked: (tarea.completadoEn) ? true : false
       }
    });

    
    const pregunta = [
        {
            type:'checkbox',
            name:'ids',
            message:'Selecciones',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(pregunta);
    return ids;
    

}




module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoParaBorrar,
    confirmar,
    mostrarListadoCheckList
}