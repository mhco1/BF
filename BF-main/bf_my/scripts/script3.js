import * as instrucions from "./instrucions.js";
import * as resourcese from "./resourcese.js";

//INICIALIZACAO

//true --> executar "f_start"
var start_load = true;
var step  //true --> executar "step"

var code = {
    out: ""         //html do output
  , in: ""          //html do input  
  , list: []        //codigo array
  , value: ""       //valor atual
  , value_next: ""  //proximo valor
  , position: 0     //posicao atual
}

var memory = {
    list: []    //memoria arry
  , value: ""   //valor atual
  , position: 0 //posicao atual
  , table: ""   //html da tabela
}

var open_loop = {
    list: [] //array com a posicao do "open_loop"
  , index: 0 //indice do "open_loop"
}

var input = {
    list: [] //input arry
  , index: 0 //indice do input
}

//-----------------------------------------------------------

//FUNCOES DOS BOTOES

function f_start_button() {
  step = false;
  f_main();
}

function f_step_button() {
  step = true;
  f_main();
}

function f_reset_button() {
  start_load = true;
  memory.table.innerHTML = "";
}

//-----------------------------------------------------------

//ESCOPO DE TODO O PROGAMA

function f_main() {

  //inicio
  if (start_load == true) {
    f_start();
  }

  //execução
  while (code.position !== code.list.length) {
    f_instrucion();
    f_reset();

    if (step == true) { f_code_text("update"); break; }
  }

  if (code.position == code.list.length) { f_code_text("end") }

  f_memory_table();
}

//-----------------------------------------------------------
