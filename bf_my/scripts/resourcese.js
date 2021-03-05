
export *;

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
