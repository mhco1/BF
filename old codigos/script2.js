
var start_was_load = 0;

var code
var code_position
var code_position_next
var code_value
var code_value_next
var input
var memory
var memory_position
var memory_table
var open_list
var step

function f_run_button() {
    step = 0;
    f_main();
}

function f_step_button() {
    step = 1;
    f_main();
}

function f_reset_button() {
    start_was_load = 0;
}

function f_compile() {
    var code_not_compiled = Array.from(document.getElementById("code").value);
    var result = [];
    var open_number = 0;
    var close_number = 0;

    code_not_compiled_position = 0;
    while (code_not_compiled_position !== code_not_compiled.length) {

        switch (code_not_compiled[code_not_compiled_position]) {
                case ">":
                case "<":
                case "+":
                case "-":
                case ".":
                case ",":
                    result.push(code_not_compiled[code_not_compiled_position])
                    break;
                
                case "[":
                    result.push(code_not_compiled[code_not_compiled_position])

                    open_number++
                    close_number = open_number
                    result.push(open_number -1)
                    break;
        
                case "]":
                    result.push(code_not_compiled[code_not_compiled_position])

                    result.push(open_number -1)
                    close_number--
                    open_number--
                    break;
                    
                default:
                    break;
        }
        code_not_compiled_position++;
    }
    return result;
}

function f_main(){

    if (start_was_load == 0) {
        f_start();
    }

    while (code_position !== code.length) {
        f_read_instrucion();

        if (step == 1) {
            f_memory_table();
        }
        
        f_reset_variable();

        if (step == 1) {
            break;   
        }
    }
}// -------------------------------------------------------------<<

function f_start(){
    code = f_compile();
    code_position = 0;
    code_position_next = code_position +1;
    code_value = code[code_position];
    code_value_next = code[code_position_next];

    input = Array.from(document.getElementById("input").value);

    memory = [0];
    memory_position = 0;
    memory_value = memory[memory_position];
    memory_table = document.getElementById("memory");
    
    open_list = [0];

    document.getElementById("memory").innerHTML = "<tr><td>--></td><td>0</td></tr>";
    document.getElementById("output").textContent =""

    start_was_load = 1;
}

function f_reset_variable() {
    code_position++
    code_position_next = code_position +1
    memory_value = memory[memory_position]
    code_value = code[code_position];
    code_value_next = code[code_position_next]
}

function f_memory_value(new_value){
    switch (new_value) {
        case "++":
            memory[memory_position]++
            break;

        case "--":
            memory[memory_position]--
            break;

        default:
            memory[memory_position] = new_value;
            break;
    }
}

function f_memory_table (){

    var andress = memory_table.childNodes[memory_position];
    
    andress.childNodes[0].textContent = "-->";
    andress.childNodes[1].textContent = memory_value;

}

function f_read_instrucion() {

    switch (code_value) {
        case ">":
        f_next();
            break;

        case "<":
        f_back();
            break;

        case "+":
        f_plus();
            break;

        case "-":
        f_minus();
            break;

        case "[":
        f_open();
            break;

        case "]":
        f_close();
            break;

        case ".":
        f_output();
            break;

        case ",":
        f_input();
            break;

        default:
            break;
        }
}

function f_next(){
    if(memory_position +1 == memory.length){
        memory.push(0);

        memory_table.childNodes[memory_position].childNodes[0].textContent = "";
        memory_table.innerHTML += "<tr><td></td><td>0</td></tr>";
    }
    memory_position++;
} // >

function f_back(){
    memory_position--;

    if(memory_position < 0){
        alert("Error. You tried to locate a negative place to memory, but in this interpreter is not accept!");
        code = [];
    }

    memory_table.childNodes[memory_position].childNodes[0].textContent = ""
}// <

function f_plus(){
    if (memory_value<255) {
        f_memory_value("++");
    }else{
        f_memory_value(0);
    }
}// +

function f_minus(){
    if (memory_value == 0) {
        f_memory_value(255);
    }else{
        f_memory_value("--");
    }
}// -

function f_output(){
    document.getElementById("output").textContent += String.fromCharCode(memory_value)
}// .

function f_input(){
    var input_value_first = "";

    if (input.length == 0) {
        alert("There are nothing in input");

    }else{
    input_value_first = input[0].charCodeAt();

    f_memory_value(input_value_first);
    input.shift();
    }

}// ,

function f_open() {
    if (open.length < code_value_next){
        open.push();
    }

    open_list[code_value_next] = code_position;
}// [

function f_close() {
    if (memory_value !==0) {
        code_position = open_list[code_value_next]
    }
}// ]