# BrainFuck
Interpretador BrainFuck em JavaScript

---
## Regras do jogo

O Bf é uma linguagem de programação que se passa por dificil, mas não é pra tanto kkkk

Ela funciona como uma fita que armazena valores, a memoria

O '<' e o '>' são para retornar e avançar o ponteiro entre a memoria

O '+' e o '-' são para acrecentar e retirar uma unidade na memoria atual

Os valores em um espaço de memoria corresponde aos valores decimais da tabela ASCII, portanto são limitados ao conjunto (0 - 255)

Valores maiores que 255 são retornados para 0 e valores menores que 0 são retornados para 255

O '.' imprimi o atual valor na memoria de acordo com a tabela ASCII

O ',' pega o valor ASCII decimal do imput do usuario

E para condicionar e fazer loop utiliza as instruções em conchetes '\[]'

As instruções em conchetes são executadas enquanto o valor da memoria atual for diferente de 0

---
## Meu interpretador

O interpretador tem suas áreas especificas

  - codigo: por onde o codigo é inserido
  - input: valores inseridos pelo usuario
  - output: valores imprimidos pelo codigo
  - memoria: tabela dos valores da memoria

Os botões para execução do codigo são:

  - start: executa o codigo por inteiro
  - step: executa o codigo instrução por instrução
  - reset: reseta as variaveis quando o codigo for finalizado
 
 Na execução do codigo instrução por instrução é apresentado o codigo pelas cores:
 
  - <p style="background: rgba(0, 0, 255, 0.32);"  >azul</p> : a instrução que será executada
  - <p style="background: rgba(9, 255, 0, 0.32);"  >verde</p> : a instrução que foi executada agora
  - <p style="background: rgba(255, 60, 0, 0.32);" >vermelho</p> : as instruções que ja foram executadas

O interpretador ta caminhando... então tem erros né kkkkk

---
Utilizei como servidor de teste o Apache do Xampp

---
Bom é isso

Criado só por diversão 😊😊😊

interpretador link: https://matheushenrique2000.github.io/BF/bf_main/main
