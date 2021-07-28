export default class View{
    constructor(){
    };

    start(){
        view.outputStart();
        view.memoryStart();
    };

    //------------------------------------------------------

        codeStart(){
            let a = code.code
            f.dom('#codeIn').style.display = 'none';
            f.dom('#codeOut').style.display = 'flex';
            f.dom('#codeOut').innerHTML = a.replaceAll(/([\W])/g,'<li>$1</li>');
        };
        codeUpdate(a,b){
            isNaN(a)||a >= code.code.length ? '' : f.dom(`#codeOut li[${a/2}]`).style.background = b;
        };
        codeReset(){
            f.dom('#codeIn').style = f.dom('#codeOut').style = '';
            f.dom('#codeOut').innerHTML = '';
        };
        
        outputStart(){
            f.dom('#output').value = '';
        };
        outputUpdate(){
            f.dom('#output').value = memory.output;
        };
        outputReset(){
            f.dom('#output').value = '';
        };

        memoryStart(){
            f.dom('#memory').innerHTML = '<tr><td>--></td><td>0</td></tr>';
        };
        memoryUpdate(){
            f.dom(`#memory`).innerHTML = ''
            memory.memory.forEach(a => {
                f.dom('#memory =+tr =+td >+td').innerText = a;
            });
            f.dom(`#memory tr[${memory.i}] td[0]`).innerText = '-->';
        };
        memorySelect(a,b){
        a ? f.dom('#memory =+tr =+td >+td').innerText = 0 :'';
        f.dom(`#memory tr[${memory.i}] td[0]`).innerText = '';
        f.dom(`#memory tr[${memory.i+b}] td[0]`).innerText = '-->';
        };
        memoryValue(){
            f.dom(`#memory tr[${memory.i}] td[1]`).innerText = memory.memory[memory.i];
        };
        memoryReset(){
            f.dom('#memory').innerHTML = '';
        };
};