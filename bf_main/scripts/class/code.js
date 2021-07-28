export default class Code{
    constructor(){
        this.code; // algoritimo bf a ser executado
        this.i; // pilha como ponteiro do algoritmo
        this.loop; // pilha que armazenar posicoes que sao retornadas pelo ']'
        this.select = [ // colecao das funcaes a serem executadas
            function(){ //next
                let a = 0;
                if(memory.i +1 == memory.memory.length){memory.memory.push(0);a=1;}
                main.step ? view.memorySelect(a,1):'';
                memory.i++;
            },
            function(){ //back
                if(memory.i-1<0){
                    alert("Erro, voce tentou retorna a posicao para um local inexistente");
                    code.i[0] = code.code.length;
                }else{
                    main.step?view.memorySelect(0,-1):'';
                    memory.i--;
                }
            },
            function(){ //plus
                if (memory.memory[memory.i] < 255) {
                    memory.memory[memory.i]++;
                } else {
                    memory.memory[memory.i] = 0;
                }
                main.step?view.memoryValue():'';
            },
            function(){ //minus
                if (memory.memory[memory.i] == 0) {
                    memory.memory[memory.i] = 255;
                } else {
                    memory.memory[memory.i]--;
                }
                main.step?view.memoryValue():'';
            },
            function(){ //openLoop
                code.loop.unshift(code.i[0]);
            },
            function(){ //closeLoop
                if(memory.memory[memory.i]==0){
                    code.loop.shift();
                }else{
                    code.i[0] = code.loop[0];
                };
            },
            function(){ //output
                memory.output += String.fromCharCode(memory.memory[memory.i]);
            },
            function(){ //input
                if(memory.input.length == 0){
                    alert('input esta vazio');
                } else {
                    memory.memory[memory.i] = memory.input[0].charCodeAt(); 
                    memory.input.shift();
                    main.step?view.memoryValue():'';
                }
            }
        ];
    }
 
    start(){
        code.code = f.dom('#codeIn').value;
        code.code = code.code.replaceAll(/[^\u003e|\u003c|\u002b|\u002d|\u005b|\u005d|\u002e|\u002c]/g,'');
        //| > || < || + || - || [ || ] || . || , |
        view.codeStart();

        code.code = code.code.replaceAll('>','00');
        code.code = code.code.replaceAll('<','01');
        code.code = code.code.replaceAll('+','02');
        code.code = code.code.replaceAll('-','03');
        code.code = code.code.replaceAll('[','04');
        code.code = code.code.replaceAll(']','05');
        code.code = code.code.replaceAll('.','06');
        code.code = code.code.replaceAll(',','07');

        code.i = [0,0,0];
        code.loop = [];
    };
}