export default class Code{
    constructor(){
        this.code = "";
        this.position = 0;
        this.value = "";
        this.valueNext = "";
    }

//------------------------------------------------------

    start(){
        code.code = code.interpret();
        code.position = 0;
        code.value = code.code[code.position];
        code.valueNext = code.code[code.position +1];
    }

//------------------------------------------------------

    interpret() {

        let r = []; //resultado
        let p = 0;  //posicao
        let v = ""; //valor
        let c = f.DOM('#codeIn').value //codigo
        let l = 0; //loop

        while (p !== c.length) {

            v = c[p];

            v == ">" ||
            v == "<" ||
            v == "+" ||
            v == "-" ||
            v == "." ||
            v == "," ||
            v == "[" ||
            v == "]" ?
            r.push(v) : {};

            switch (v) {
                case "[":
                    l++;
                    r.push(l);
                    break;

                case "]":
                    r.push(l);
                    l--;
                    break;
            }

            p++;
        }

        return r;
    }

    instrucion() {

        switch (code.value) {
            case ">":
                code.next();
                break;

            case "<":
                code.back();
                break;

            case "+":
                code.plus();
                break;

            case "-":
                code.minus();
                break;

            case "[":
                code.openLoop();
                break;

            case "]":
                code.closeLoop();
                break;

            case ".":
                code.output();
                break;

            case ",":
                code.input();
                break;
        }
    }

//------------------------------------------------------

    next() {
        if ( memory.position + 1 == memory.memory.length) {
            memory.memory.push(0);

            f.DOM('#memory').insertRow(memory.memory.length);
            f.DOM(`#memory tr[${memory.memory.length}] td[0]`) = '-->'
            f.DOM(`#memory tr[${memory.memory.length}] td[1]`) = '0'

        }
        f.DOM(`#memory tr[${memory.position}] td[0]`).innerText = '';
        memory.position = memory.position +1;
        // memory.update();

    }

    back() {
        memory.position = memory.position -1;

        if ( memory.position < 0) {
            alert("Erro, voce tentou retorna a posicao para um local negativo");
            code.code = "";
        } else {
            f.DOM(`#memory tr[${memory.position +1}] td[0]`).innerText = '';
            // memory.update();
        }
    }

    plus() {
        if (memory.value < 255) {
            memory.memory[memory.position]++;
        } else {
            memory.memory[memory.position] = 0;
        }
        // memory.update();
    }

    minus() {
        if (memory.value == 0) {
            memory.memory[memory.position] = 255;
        } else {
            memory.memory[memory.position]--;
        }
        // memory.update();
    }

    output() {
        f.DOM('#output').value += String.fromCharCode(memory.value);
    }

    input() {
        memory.input.list = Array.from(f.DOM('#input').innerText);
        if (memory.input.list.length == 0) {
            alert("Input esta vazio");

        } else {
            memory.memory[memory.position] = memory.input.list.chaCodeAt;
            memory.input.i++;
            // memory.update();
        }

    }

    openLoop() {
        if (memory.loop.list.length < code.valueNext) {
            memory.loop.list.push();
        }
        memory.loop.list[code.valueNext -1] = code.position;
    }

    closeLoop() {
        if (memory.value !== 0) {
            code.position = memory.loop.list[code.valueNext -1];
        }
    }
}