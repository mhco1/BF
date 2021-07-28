export default class Control{
    constructor(){
    };

    memoryStatus(){
        console.log('------- memory status -------');
        console.log('array: '+ memory.memory);
        console.log('indice: '+ memory.i);
        console.log('input: '+ memory.input);
    }

    codeStatus(){
        let b ='';
        console.log('------- code status -------');
        for (let a = 0; a < code.code.length; a+=2) {
            a == code.i[0] ? b += ' >' : b += ' ';
            b += code.code[a];
            b += code.code[a+1];
        };
        console.log('code: '+ b);
        console.log('indice: '+ code.i);
        console.log('loop: '+ code.loop);
    }
};