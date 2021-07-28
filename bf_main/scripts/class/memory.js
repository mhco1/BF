export default class Memory{
    constructor(){
        this.memory //memoria usada pelo algoritimo bf
        this.i; //ponteiro da memoria
        this.input //armazena os valores de entrada
        this.output //armazena os valores de saida
    }

    start(){
        memory.memory = [0];
        memory.i = 0;
        memory.input = Array.from(f.dom('#input').value);
        memory.output = '';
    };
}