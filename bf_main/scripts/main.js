export default class Main{
    constructor(){
        this.load = true;
        this.step = false;
    };

    start(){
        code.start();
        memory.start();
        view.start();
        main.load = false;
    };

//------------------------------------------------------

    mainStart(){
        main.mainStandard();

        main.step = false;
        main.load ? main.start(): '';
        if(code.i[0] < code.code.length) {
            while (code.i[0] < code.code.length && code.stop == false) {
                main.mainStandard1();
            };
            view.outputUpdate();
            view.memoryUpdate();
        };
    };

    mainStep(){
        main.mainStandard();

        main.step = true;
        main.load ? main.start(): '';
        if(code.i[0] < code.code.length) {
            view.codeUpdate(code.i[1],'#ff3c0052');// executado
            view.codeUpdate(code.i[0],'#09ff0052');// em processo
            main.mainStandard1();
            view.codeUpdate(code.i[0],'#0000ff52');// sera executado
            view.outputUpdate();
        };
    };

    mainReset(){
        main.load = true;
        view.codeReset();
        view.outputReset();
        view.memoryReset();
    };

//------------------------------------------------------

    mainStandard(){
        if(code.stop){
            code.stop = false;
            view.codeUpdate(code.i[1],'#ff3c0052')
        }
    }

    mainStandard1(){
        let a = parseInt(code.code[code.i[0]]);
        let b = parseInt(code.code.slice(code.i[0]+1,code.i[0]+3))
        if (a){
            code.select[b]();
        }else{
            code.otherSelect[b]();
        }
        code.i.pop();
        code.i.unshift(code.i[0]);
        code.i[0] +=3;
    };
};