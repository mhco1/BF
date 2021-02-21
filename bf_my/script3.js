//INICIALIZACAO

//true --> executar "f_start"
var start_load = true;
var step  //true --> executar "step"

var code = {
  out: ""             //html do output
  , in: ""              //html do input
  //, text_enable: false  //true --> guardar codigo
  , list: []            //codigo array
  , position: 0         //posicao atual
  , value: ""           //valor atual
  , value_next: ""      //proximo valor
}

var memory = {
  list: []    //memoria arry
  , position: 0 //posicao atual
  , value: ""   //valor atual
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

//prepara o ambiente
function f_start() {

  f_code_text("start");

  code.out = document.getElementById("code_out");
  code.in = document.getElementById("code_in");
  code.list = f_interpret();
  code.position = 0;
  code.value = code.list[code.position];
  code.value_next = code.list[code.position + 1];

  memory.list = [0];
  memory.position = 0;
  memory.value = memory.list[memory.position];
  memory.table = document.getElementById("memory");

  open_loop.list = [0];
  open_loop.index = 0;

  input.index = 0;

  //definindo a primeira posicao da memoria na tabela
  memory.table.innerHTML = "<tr><td>--></td><td>0</td></tr>";
  //apagando valores do output
  document.getElementById("output").textContent = ""

  //definir o start como executado
  start_load = false;
}

//pega o codigo e traduz para o progama
function f_interpret() {

  //codigo a ser convertido array
  var pre_code = {
    position: 0
    , list: []
    , value: ""
  }

  pre_code.list = Array.from(code.in.value);

  var result = []; //resultado array

  while (pre_code.position !== pre_code.list.length) {

    pre_code.value = pre_code.list[pre_code.position];

    //descartar caracteres sem funcao no codigo
    if (pre_code.value == ">" ||
      pre_code.value == "<" ||
      pre_code.value == "+" ||
      pre_code.value == "-" ||
      pre_code.value == "." ||
      pre_code.value == "," ||
      pre_code.value == "[" ||
      pre_code.value == "]") { result.push(pre_code.value); }

    switch (pre_code.value) {
      case "[": //armazenar a posicao atual
        open_loop.index++
        result.push(open_loop.index);
        break;

      case "]"://armazenar a posicao atual
        result.push(open_loop.index);
        open_loop.index--
        break;

      default:
        break;
    }

    pre_code.position++;
  }

  return result;
}

//executa a instrucao do codigo
function f_instrucion(params) {

  switch (code.value) {
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
      f_open_loop();
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

//funcoe da instrucao----------------------------------------

function f_next(params) {
  //adiciona um valor vazio na memoria
  if (memory.position + 1 == memory.list.length) {
    memory.list.push(0);

    //adiciona o novo valor na tabela
    memory.table.innerHTML += "<tr><td></td><td>0</td></tr>";
  }

  //excluir a seta da posicao da tabela
  memory.table.childNodes[memory.position].childNodes[0].textContent = "";

  //avanca a posicao
  memory.position++;

  f_memory_update();

}// >

function f_back() {
  memory.position--;

  //rejeita valores negativos
  if (memory.position < 0) {
    alert("Erro, você tentou retorna a posição para um local negativo");
    code.list = [];
  } else {

    //excluir a seta da posicao da tabela
    memory.table.childNodes[memory.position + 1].childNodes[0].textContent = ""

    f_memory_update();
  }
}// <

function f_plus() {
  if (memory.value < 255) {
    memory.list[memory.position]++;
  } else {
    memory.list[memory.position] = 0;
  }
  f_memory_update();
}// +

function f_minus() {
  if (memory.value == 0) {
    memory.list[memory.position] = 255;
  } else {
    memory.list[memory.position]--;
  }
  f_memory_update();
}// -

function f_output() {
  document.getElementById("output").textContent += String.fromCharCode(memory.value)
}// .

function f_input() {

  //pegar o input
  input.list = Array.from(document.getElementById("input").value);

  //verificar se o input está vazio
  if (input.list.length == 0) {
    alert("Input está vazio");

  } else {

    //inserir o valor do input
    memory.list[memory.position] = input.list[input.index].charCodeAt();
    input.index++;

    f_memory_update();
  }

}// ,

function f_open_loop() {
  //adiciona um espaco
  if (open_loop.list.length < code.value_next) {
    open_loop.list.push();
  }

  //adiciona a posicao
  open_loop.list[code.value_next - 1] = code.position;
}// [

function f_close() {
  //retorna a posicao
  if (memory.value !== 0) {
    code.position = open_loop.list[code.value_next - 1]
  }
}// ]
//-----------------------------------------------------------

//atualizar a tabela
function f_memory_table() {

  var andress = memory.table.childNodes[memory.position];

  andress.childNodes[0].textContent = "-->";
  andress.childNodes[1].textContent = memory.value;

}

//atualizar o valor da memoria
function f_memory_update() {
  memory.value = memory.list[memory.position]
}

//muda o codigo entre editado e vizualizado
function f_code_text(option) {
  switch (option) {
    case "start":
      code.in.style.display = "none";
      code.out.style.display = "flex";
      break;

    case "update":
      //code.out.childNodes["memoria anterior"].style.brackground = "";
      code.out.childNodes[memory.position].style.brackground = "#0000ff52";
      break;

    case "end":
      code.in.style = "";
      code.out.style = "";
      code.out.innerHTML = "";
      break;

    default:
      break;
  }
}

//redefinir as variaveis
function f_reset() {
  code.position++
  code.value = code.list[code.position];
  code.value_next = code.list[code.position + 1];
}
