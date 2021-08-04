export default class View{
    constructor(){
        this.modeDark = false;
    };

    start(){
        view.outputStart();
        view.memoryStart();
    };

//------------------------------------------------------

    codeStart(){
        let a = code.code
        f.dom('#code-text .code-text-input[0]').style.display = 'none';
        f.dom('#code-text .code-text-output[0]').style.display = 'flex';
        f.dom('#code-text .code-text-output[0]').innerHTML = a.replaceAll(/([\W])/g,'<li>$1</li>');
    };
    codeUpdate(a,b){
        isNaN(a)||a >= code.code.length ? '' : f.dom(`#code-text .code-text-output[0] li[${a/3}]`).style.background = b;
    };
    codeReset(){
        f.dom('#code-text .code-text-input[0]').style = f.dom('#code-text .code-text-output[0]').style = '';
        f.dom('#code-text .code-text-output[0]').innerHTML = '';
    };
    
    outputStart(){
        f.dom('#output .output-text[0]').value = '';
    };
    outputUpdate(){
        f.dom('#output .output-text[0]').value = memory.output;
    };
    outputReset(){
        f.dom('#output .output-text[0]').value = '';
    };

    memoryStart(){
        f.dom('#memory-access').innerHTML = '<tr><td>--></td><td>0</td></tr>';
    };
    memoryUpdate(){
        f.dom(`#memory-access`).innerHTML = ''
        memory.memory.forEach(a => {
            f.dom('#memory-access =+tr =+td >+td').innerText = a;
        });
        f.dom(`#memory-access tr[${memory.i}] td[0]`).innerText = '-->';
    };
    memorySelect(a,b){
    a ? f.dom('#memory-access =+tr =+td >+td').innerText = 0 :'';
    f.dom(`#memory-access tr[${memory.i}] td[0]`).innerText = '';
    f.dom(`#memory-access tr[${memory.i+b}] td[0]`).innerText = '-->';
    };
    memoryValue(){
        f.dom(`#memory-access tr[${memory.i}] td[1]`).innerText = memory.memory[memory.i];
    };
    memoryReset(){
        f.dom('#memory-access').innerHTML = '';
    };

//------------------------------------------------------

    changeModeDark(){
        if(view.modeDark){
            document.styleSheets[2].cssRules[1].selectorText = '.NOThtml';
            view.modeDark = false;
        }else{
            document.styleSheets[2].cssRules[1].selectorText = 'html';
            view.modeDark = true;
        };
    };
};