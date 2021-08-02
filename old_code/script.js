
function  main(){
//-----------------------------start----------------------------

    var step = "";
    var active = 1;

    var code = Array.from(document.getElementById("code").value);
    var c_index = 0;

    var memory = [0];
    var m_index = 0;

    var input = Array.from(document.getElementById("input").value)

    var open_position = [];
    var open_creat = 1;
    var open_index = 0;
    var close_index = 0;


    document.getElementById("output").textContent = ""

//--------------------------operations--------------------------
    function f_next(){
        if(m_index +1 == memory.length){
            memory.push(0);
        }
        m_index++;
    } // >

    function f_back(){
        m_index--;
        if(m_index < 0){
            alert("Error. You tried to locate a negative place to memory, but in this interpreter is not accept!");
            code = [];
        }
    }// <

    function f_plus(){
        if (memory[m_index]<255) {
            memory[m_index]++;
        }else{
            memory[m_index] = 0
        }
    }// +

    function f_minus(){
        if (memory[m_index] == 0) {
            memory[m_index] = 255;
        }else{
            memory[m_index]--
        }
    }// -

    function f_open(){
        if (open_creat = 0) {
            open_index++;
        }
        
        if ( memory[m_index] == 0) {
            active = 0;
        }else{
            //set a position
            open_position.push(0);
            open_position[open_position.length-1] = c_index;        
        }
    }// [

    function f_close(){
        if (open_creat = 0) {
            close_index++;
        }

        if(open_index == close_index){
            active = 1;
            if (memory[m_index] !== 0) {
               c_index = open_position[0]
            }else{
                while (close_index !== 0) {
                   open_position.shift;
                   close_index--;
                   open_index--;   
                }
            }
        }
    }// ]

    function f_output(){
        document.getElementById("output").textContent += String.fromCharCode(memory[m_index])
    }// .

    function f_input(){
        if (input.length == 0) {
            alert("There are nothing in input");
        }
        memory[m_index] = input[0].charCodeAt();
        input.shift();

    }// ,
//--------------------------switch step-------------------------

function f_step(){
    switch (step) {
        case ">":
            if (active == 1){
                f_next();
            }
            break;

        case "<":
            if (active == 1){
                f_back();
            }
            break;

        case "+":
            if (active == 1){
                f_plus();
            }
            break;

        case "-":
            if (active == 1){
                f_minus();
            }
            break;

        case "[":
        f_open();
            break;

        case "]":
        f_close();
            break;

        case ".":
            if (active == 1){
                f_output();
            }
            break;

        case ",":
            if (active == 1){
                f_input();
            }
            break;

        default:
            break;
    }
}

//------------------------------body----------------------------

    while(c_index !== code.length +1){
        step = code[c_index];
        f_step();
        c_index++;
    }
}