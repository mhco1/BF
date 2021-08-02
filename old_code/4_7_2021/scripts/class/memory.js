export default class Memory{
    constructor(){
        var list = [];
        var position = 0;
        var value = "";
        var table = "";
        var loop = { list: [], i: 0 }
        var input = { list: [], i: 0 }
    }

    getList(i){
        if (i == "" || i == undefined){
            return memory.list;
        } else {
            return memory.list[i];
        }
    }
    setList(set, i){
        if (i == "" || i == undefined){
            return memory.list = set;
        } else {
            return memory.list[i] = set;
        }
    }

    getPosition(){
        return memory.position;
    }
    setPosition(set){
        return memory.position = set;
    }

    getValue(){
        return memory.value;
    }
    setValue(set){
        return memory.value = set;
    }

    getTable(){
        return memory.table;
    }
    setTable(set){
        return memory.table = set;
    }

    getLoopList(i){
        if (i == "" || i == undefined){
            return memory.loop.list;
        } else {
            return memory.loop.list[i];
        }
    }
    setLoopList(set, i){
        if (i == "" || i == undefined){
            return memory.list = set;
        } else {
            return memory.list[i] = set;
        }
    }
    getLoopI(get){
        return memory.loop.i;
    }
    setLoopI(set,nameVar){
        return memory.loop.i = set;
    }

    getLoopList(i){
        if (i == "" || i == undefined){
            return memory.loop.list;
        } else {
            return memory.loop.list[i];
        }
    }
    setLoopList(set, i){
        if (i == "" || i == undefined){
            return memory.loop.list = set;
        } else {
            return memory.loop.list[i] = set;
        }
    }
    getInputI(get){
        return memory.input.i;
    }
    setInputI(set){
        return memory.input.i = set;
    }

    start(){
        f.gs('memory','s','list'    ,'[0]');
        f.gs('memory','s','position','0');
        f.gs('memory','s','value'   ,'this.list[this.position]');
        f.gs('memory','s','table'   ,'f.DOM("#memory")');

        f.gs('memory','s','loopList','[0]');
        f.gs('memory','s','loopI'   ,'0');

        f.gs('memory','s','input'   ,'0');

        f.gs('memory','g','table').innerHTML = '<tr><td>--></td><td>0</td></tr>';
    }

    table(){

        let a = f.gs('memory','g','table').childNodes[f.gs('memory','g','position')]; 

        a.childNodes[0].textContent = "-->";
        a.childNodes[1].textContent = memory.value;
    }

    update(){
        f.gs('memory','s','value','f.gs("memory","g","list",f.gs("memory","g","position"))');
    }
}