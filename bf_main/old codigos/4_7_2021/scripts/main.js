export default class Main{
    constructor (){
        var startLoad = true;
        var step;
    }

//------------------------------------------------------

    getStartLoad(){
        return main.startLoad;
    }
    setStartLoad(set){
        return main.startLoad = set;
    }

    getStep(){
        return main.step;
    }
    setStep(set){
        return main.step = set;
    }

//------------------------------------------------------

    startBtn() {
        step = false;
        main();
    }
    
    stopBtn() {
        step = true;
        main();
    }
    
    resetBtn() {
        start_load = true;
        memory.table.innerHTML = "";
    }

//------------------------------------------------------

    main() {

        f.gs('main','g','startLoad') ? this.start(): '';

        while (f.gs('code','g','position')!== f.gs('code','g','list').length) {
            code.instrucion();
            main.reset();
        
            if (f.gs('main','g','step')== true) { main.box('update'); break; }
        }
    
        if (code.position == code.list.length) { main.box('end') }
    
        memory.table();
    }

//------------------------------------------------------

    start() {
        code.start();
        memory.start();
        f.DOM('#output').textContent = '';
        f.gs('main','s','startLoad','false');
    }

    reset() {
        f.gs('code','gs','position','+1');
        f.gs('code','s','valor','f.gs("code","g","list", "f.gs("code","g","position")")');
        f.gs('code','s','valueNext','f.gs("code","g","list", "f.gs("code","g","position")+1")');
    }

    box(op) {
        switch (op) {
            case "start":
                f.gs('code','g','input').style.display = "none";
                f.gs('code','g','output').style.display = "flex";
                break;

            case "update":
                f.gs('code','g','output').childNodes[f.gs('memory','g','position')].style.brackground = "#0000ff52";
                break;

            case "end":
                code.in.style = "";
                f.gs('code','g','output').style = "";
                f.gs('code','g','output').innerHTML = "";
                break;

            default:
                break;
        }
    }
}


