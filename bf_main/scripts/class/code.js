export default class Code{
    constructor(){
        this.code; // algoritimo bf a ser executado
        this.i; // pilha como ponteiro do algoritmo
        this.loop; // pilha que armazenar posicoes que sao retornadas pelo ']'
        this.stop // para o processo
        this.select = [ // colecao de funcoes a serem executadas
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
        this.otherSelect = [ // colecao de funcoes adicionadas a serem executadas
            function(){ //debugger
                code.stop = true;
                view.codeUpdate(code.i[0],'#09ff0052')
            }
        ]
    }
 
    start(){
        code.code = f.dom('#code-text .code-text-input[0]').value;
        code.code = code.code.replaceAll(RegExp(
        '[^\\u003e|\\u003c|\\u002b|\\u002d|\\u005b|\\u005d|\\u002e|\\u002c'+
        '\\007c]','g'),'');
        // > < + - [ ] . ,
        // |
        view.codeStart();

        code.code = code.code.replaceAll('>','100');
        code.code = code.code.replaceAll('<','101');
        code.code = code.code.replaceAll('+','102');
        code.code = code.code.replaceAll('-','103');
        code.code = code.code.replaceAll('[','104');
        code.code = code.code.replaceAll(']','105');
        code.code = code.code.replaceAll('.','106');
        code.code = code.code.replaceAll(',','107');

        code.code = code.code.replaceAll('|','000')

        code.i = [0,0,0];
        code.loop = [];
        code.stop = false;
    };
}