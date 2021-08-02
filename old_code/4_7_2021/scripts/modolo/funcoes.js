export default class Funcoes{
    constructor(){}

    DOM(caminho){
        var seletor = '';
        var campo = '';
        var caso = '';
        var indice = '';
        var caracter = '';
        var dom = document;
        var b = 0;

        caso = 'seletor';

        for (var a = 0; a < caminho.length; a++){
            caracter = caminho[a];

            switch (caso) {
                case 'seletor':
                    if (caracter == '['){
                        caso = 'indice';
                    } else {
                        if (caracter == '#' ||
                            caracter == '.') {
                            seletor = caracter;
                        } else {
                            seletor = 'tag';
                            if(caracter != ' '){a--;};
                        };
                        caso = 'campo';
                    }
                    break;
                case 'campo':
                    if (caracter == ' ' ||
                        caracter == '#' ||
                        caracter == '.' ||
                        caracter == '[') {
                        fecharCampo();
                    } else {
                        campo = `${campo + caracter}`;
                    };
                    break;
                case 'indice':
                    if (caracter == ']') {
                        b = parseInt(indice);
                        dom = dom[b];
                        caso = 'seletor';
                    } else {
                        indice = `${indice + caracter}`;
                    }
                    break;
                
                default:
                    break;
            };
        };

        function fecharCampo(){
            switch (seletor) {
                case '#':
                    dom = dom.getElementById(campo);
                    campo = '';
                    break;
            
                case '.':
                    dom = dom.getElementsByClassName(campo);
                    campo = '';                  
                    break;

                case 'tag':
                    dom = dom.getElementsByTagName(campo);
                    campo = '';
                    break;

                default:
                    console.log('seletor não indentificado')
                    break;
            };
            a--;
            caso = 'seletor';
        };

        return dom;
    };

    gs(local, getSet, nameVar, valor){
        var a;
        var b;
        var c;

        if(local == undefined ||
            local == ""){
                local = "";
            } else {
                local = local + '.';
            }

        maiuscula();

        if(valor == undefined ||
            valor == ""){
                valor = "";
            } else {
                valor = valor.replace(/ /g,'');
            }


        switch (getSet) {

            case "g":
                a = `${local}get${nameVar}(${valor})`;
                break;

            case "s":
                a = `${local}set${nameVar}(${valor})`;
                break;
        
            case "gs":
                a = `${local}set${nameVar}(${local}get${nameVar}()${valor})`;
                break;

            default:
                console.log('Get ou Set não definido');
                break;
        
            };

        function maiuscula(){
            b = nameVar[0];
            c = b.toUpperCase();
            return nameVar = nameVar.replace(b,c);
        }
        return eval(a);
    };

    gs1(getSet){
        //f.gs('memory','s','value','f.gs("memory","g","list",f.gs("memory","g","position"))');

        //f.gs('s memory value > g memory list > g memory position');
        //s memory value
        //              g memory list
        //                            g memory position
        //gs obj nvar [gs obj nvar [gs obj nvar valor]]
        //gs obj nvar valor

        getSet = getSet.split(' ');
        
        var gs = getSet[0];
        var obj = getSet[1];
        var nvar = getSet[2];

        getSet[3] = ()=> {
            for (i = 3; i< getSet.length; i++) {

            }
        }

        function returnArray() {

        }

        // var valor = () => {
        //     var a = [];
        //     var i = -1;

        //     function f() {

        //         for (i++ ; i < getSet.length;) {

        //             getSet[i][0] == '>' ? a[i].push(f()) : a[i].push(getSet[i]);
        //         }
        //     }

        //     f();

        //     return a;
        // };

        // var valor = () => {
        //     if (getSet[3][0] == ">") {
                
        //     valor();
        //     }
        // }

        // var valor = () => {
        //     for (let i = 3; i < getSet.length; i++) {
        //         var e = getSet[i];
        //         if(e[0] == '>'){
                    
        //         }
        //     }
    };
};