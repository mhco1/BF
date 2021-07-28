export default class Main{
    constructor (){
        this.startLoad = true;
        this.step = false;
    }

//------------------------------------------------------

    startBtn() {
        main.step = false;
        main.main();
    }
    
    stepBtn() {
        main.step = true;
        main.main();
    }
    
    resetBtn() {
        main.startLoad = true;
        f.DOM('#memory').innerHTML = "";
    }

//------------------------------------------------------

    main() {

        main.startLoad ? main.start(): '';

        while (code.position !== code.code.length) {
            code.instrucion();
            main.reset();
        
            if (main.step == true) { main.box('update'); break; }
        }
    
        if (code.position == code.code.length) { main.box('end') }
    
        memory.tableUpdate();
    }

//------------------------------------------------------

    start() {
        code.start();
        memory.start();
        f.DOM('#output').value = '';
        main.box('start')
        main.startLoad = 'true';
    }

    reset() {
        code.position++
        code.value = code.code[code.position];
        code.valueNext = code.code[code.position +1];
        }

    box(op) {
        switch (op) {
            case 'start':
                let a = ''

                f.DOM('#codeIn').style.display = 'none';
                f.DOM('#codeOut').style.display = 'flex';

                for (let i = 0; i < code.code.length; i++) {
                    a = `${a}<li>${code.code[i]}</li>`
                }

                f.DOM('#codeOut').innerHTML = a;
                break;

            case 'update':
                f.DOM(`#codeOut[${memory.position}]`).style.background = '#0000ff52';
                break;

            case 'end':
                f.DOM('#codeIn').style = '';
                f.DOM('#codeOut').style = '';
                f.DOM('#codeOut').innerText = '';
                break;

            default:
                break;
        }
    }
}