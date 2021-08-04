//-----------------------------------------------
// Esta classe destina-se a monitorar o fluxo do interpretador
// Declare a classe em uma variavel e execute help() para informações das funções disponiveis
//-----------------------------------------------

export default class Control{
    constructor(){
    };

    memoryStatus(){
        console.log(`
------- memory status -------
array: ${memory.memory}
indice: ${memory.i}
input: ${memory.input}
        `);
    }

    codeStatus(){
        let b ='';
        for (let a = 0; a < code.code.length; a+=3) {
            a == code.i[0] ? b += ' >' : b += ' ';
            b += code.code[a];
            b += code.code[a+1];
            b += code.code[a+2];
        };
        console.log(`
------- code status -------
code: ${b}
indice: ${code.i}
loop: ${code.loop}
        `);
    }
    help(){
        console.log(`
---------- control ----------
status:
        codeStatus()
        memoryStatus()

        Mostram os status das
        variaves relalacionas
        aos propios
        `)
    }
};