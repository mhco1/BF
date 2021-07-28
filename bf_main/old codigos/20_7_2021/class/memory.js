export default class Memory{
    constructor(){
        this.memory = [];
        this.position = 0;
        this.value = "";
        this.loop = { list: [], i: 0 }
        this.input = { list: [], i: 0 }
    }

    start(){
        memory.memory = [0];
        memory.position = 0 ;
        memory.value = memory.memory[memory.position];

        memory.loop.list = [0];
        memory.loop.i = 0;

        memory.input.list = [0]; 
        memory.input.i = 0;
    }

    tableUpdate(){
        let a = f.DOM(`#memory tr[${memory.position}] td`)

        a[0].innerText = "-->";
        a[1].innerText = memory.value;
    }

    // update(){
    //     memory.innerText = memory.memory[memory.position]
    // }
}