export default class Funcoes{
    constructor(){
    }

    dom(c,cp){
        let r; cp == undefined ? r = document : r = cp;
        let s = [
            function(i){r = r.getElementsByTagName(c[i+1])},
            function(i){r = r.getElementById(c[i+1])},
            function(i){r = r.getElementsByClassName(c[i+1])},
            function(i){r = r[c[i+1]]},
            function(i){r.remove()},
            function(i){
                let ins = document.createElement(c[i+1]);
                let cr = r.parentNode;
                r = cr.insertBefore(ins, r.nextSibling);
                //inserir depois
            },
            function(i){
                let ins = document.createElement(c[i+1]);
                let cr = r.parentNode;
                r = cr.insertBefore(ins, r);
                //inserir antes
            },
            function(i){
                let ins = document.createElement(c[i+1]);
                r = r.appendChild(ins)
            },
            function(){
                r = r.parentNode;
            }
        ];

        c.match(/^[A-Za-z\u005f\u002d]/g) ? c = '@0@'+c :''; // tagname no inicio
        c = c.replaceAll(']','');

        c =  c.replaceAll('#','@1@'); // id
        c =  c.replaceAll('.','@2@'); // class
        c =  c.replaceAll('[','@3@'); // lista
        c = c.replaceAll('=-','@4@'); // remover
        c = c.replaceAll('>+','@5@'); // inserir depois
        c = c.replaceAll('<+','@6@'); // inserir antes
        c = c.replaceAll('=+','@7@'); // inserir dentro
        c = c.replaceAll('<<','@8@'); // inserir dentro
        
        c = c.replaceAll(/ +(@1@)| +(@2@)| +(@3@)| +(@4@)| +(@5@)| +(@6@)| +(@7@)| +(@8@)/g,'$1$2$3$4$5$6$7$8');

        c = c.replaceAll(/ +/g,'@0@'); //tagname
        c = c.split('@'); c.shift();

        for (let i = 0; i < c.length; i = i+2) {
            s[c[i]](i);
        };
        return r;
    };

//------------------------------------------------------
    help(){
        console.log(`
--------------funcoes disponiveis--------------
f.dom(c,cp)
-----------------------------------------------
Para consultar sobre a funcao:
help'Funcao'()
`);
    };

    helpDom(){
        console.log(`
--------------------- dom ---------------------
Retorna/ Modifica nodes html, altera a DOM
-----------------------------------------------
Parametros:
c:
    string com instrucoes para interagir
    com a DOM
    exemplo: c = '#id .class div[0]'

    valor default: esperado string

cp:
    objeto contendo um caminho da DOM
    Por este objeto que será iniciado a
    interacao com a DOM
    exemplo:
    cp = document.getElementsByTagName('div')

    valor default: document

-----------------------------------------------
instrucoes aceitas no parametro 'c':
    '#'  --> retorna o node pelo id - '#node'    
    '.'  --> retorna o node pela class - '.node'
    ' '  --> retorna o node pela
             tagname - ' node'
    '[]' --> retorna o node
             pelo indice - '[indice]'
    '=-' --> remove o node - 'node =-'
    '>+' --> insere um node apos
             o node atual - '>+node' 
    '<+' --> insere um node antes
             do node atual - '<+node'
    '=+' --> insere um node dentro
             do node atual - '=+node'
    '<<' --> retorna o node anterior - 'node <<'
`);
    };
};