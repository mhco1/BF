export default class Code{
    constructor(){
        var output = "";
        var input = "";
        var list = "";
        var position = 0;
        var value = "";
        var valueNext = "";
    }

//------------------------------------------------------

    getOutput(){
        return code.output;
    }

    setOutput(set){
        return code.output = set;
    }

    getInput(){
        return code.input;
    }

    setInput(set){
        return code.input = set;
    }

    getList(){
        return code.list;
    }

    setList(set){
        return code.list = set;
    }

    getPosition(){
        return code.position;
    }

    setPosition(set){
        return code.position = set;
    }

    getValue(){
        return code.value;
    }

    setValue(set){
        return code.value = set;
    }

    getValueNext(){
        return code.valueNext;
    }

    setValueNext(set){
        return code.valueNext = set;
    }

//------------------------------------------------------

    start(){
        f.gs('code','s','output'   , 'f.DOM("#codeOut")');
        f.gs('code','s','input'    , 'f.DOM("#codeIn")');
        f.gs('code','s','list'     , 'code.interpret()');
        f.gs('code','s','positon'  , '0');
        f.gs('code','s','value'    , 'code.list[code.positon]');
        f.gs('code','s','valueNext', 'code.list[code.positon +1]');      
    }

//------------------------------------------------------

    interpret() {

        let r = []; //resultado
        let p = 0;  //posicao
        let v = ""; //valor
        let c = f.DOM('#codeIn') //codigo

        while (p !== c.length) {

            v = c[p];

            if (v == ">" ||
                v == "<" ||
                v == "+" ||
                v == "-" ||
                v == "." ||
                v == "," ||
                v == "[" ||
                v == "]") { r.push(v); }

            switch (v) {
                case "[":
                    f.gs('code', 'gs', 'loopI', '+1');
                    r.push(f.gs('code', 'g', 'loopI'));
                    break;

                case "]":
                    r.push(f.gs('code', 'g', 'loopI'));
                    of.gs('code', 'gs', 'loopI', '-1');
                    break;

                default:
                    break;
            }

            f.gs('code', 'gs', 'position', '+1');
        }

        return code.r;
    }

    instrucion() {

        switch (code.value) {
            case ">":
                next();
                break;

            case "<":
                back();
                break;

            case "+":
                plus();
                break;

            case "-":
                minus();
                break;

            case "[":
                openLoop();
                break;

            case "]":
                closeLoop();
                break;

            case ".":
                output();
                break;

            case ",":
                input();
                break;

            default:
                break;
        }
    }

    next() {
        if (f.gs('memory', 'g', 'position') + 1 == f.gs('memory', 'g', 'list').length) {
            f.gs('memory', 'g', 'list').push(0);
            f.gs('memory', 'g', 'table').innerHTML = '<tr><td>--></td><td>0</td></tr>';
        }
        memory.table.childNodes[f.gs('memory', 'g', 'position')].childNodes[0].textContent = "";
        f.gs('memory', 'gs', 'position', '+1');
        memory.update();
    }

    back() {
        f.gs('memory', 'gs', 'position', '-1');

        if (f.gs('memory', 'g', 'position') < 0) {
            alert("Erro, você tentou retorna a posição para um local negativo");
            code.list = "";
        } else {
            memory.table.childNodes[f.gs('memory','g','position')+1].childNodes[0].textContent = "";
            memory.update();
        }
    }

    plus() {
        if (memory.value < 255) {
            memory.list[memory.position]++;
        } else {
            f.gs('memory','s','list','0,f.gs("memory","g","position")');
        }
        memory.update();
    }

    minus() {
        if (f.gs('memory','g','value') == 0) {
            memory.list[memory.position] = 255;
        } else {
            f.gs('memory','gs','list','-1,f.gs("memory","g","position")');
        }
        memory.update();
    }

    output() {
        f.DOM('#output').textContent += String.fromCharCode(f.gs('memory','g','value'))
    }

    input() {
        f.gs('memory','s','inputList','Array.from(f.DOM("#input").value)')
        if (f.gs('memory','g','inputList').length == 0) {
            alert("Input está vazio");

        } else {
            f.gs('memory','s','list','f.gs("memory","g","inputList").charCodeAt,f.gs("memory","g","position")');
            f.gs('memory','gs','inputI','+1');

            memory.update();
        }

    }

    openLoop() {
        if (f.gs('memory','g','loopList').length < f.gs('code','g','valueNext')) {
            f.gs('memory','g','loopList').push();
        }
        f.gs('memory','s','loopList','f.gs("code","g","position"),f.gs("code","g","valueNext")-1');
    }

    closeLoop() {
        if (f.gs('memory','g','value') !== 0) {
            f.gs('code','s','position','f.gs("memory","g","loopList","f.gs("code","g","valueNext")-1")');
        }
    }
}