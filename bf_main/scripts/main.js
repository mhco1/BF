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
        main.step = false;
        main.load ? main.start(): '';
        if(code.i[0] < code.code.length) {
            while (code.i[0] < code.code.length) {
                main.mainStandard();
            };
            view.outputUpdate();
            view.memoryUpdate();
        };
    };

    mainStep(){
        main.step = true;
        main.load ? main.start(): '';
        if(code.i[0] < code.code.length) {
            view.codeUpdate(code.i[1],'#ff3c0052');// executado
            view.codeUpdate(code.i[0],'#09ff0052');// em processo
            main.mainStandard();
            view.codeUpdate(code.i[0],'#0000ff52');// será executado
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
        let a = parseInt(code.code.slice(code.i[0],code.i[0]+2));
        code.select[a]();
        code.i.length >1 ? code.i.pop() :'';
        code.i.unshift(code.i[0]);
        code.i[0] +=2;
    };
};