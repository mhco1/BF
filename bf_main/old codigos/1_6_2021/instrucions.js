
//executa a instrucao do codigo
function f_instrucion(){

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

function f_next() {
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