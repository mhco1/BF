import Funcoes from "./modolo/funcoes.js"
import Control from "./class/control/control.js"
import Code from "./class/code.js"
import Memory from "./class/memory.js"
import View from "./class/view.js"
import Main from "./main.js"

window.addEventListener("load", function(event) {
    f = new Funcoes();
    control = new Control();
    code = new Code();
    memory = new Memory();
    view = new View();
    main = new Main();

    console.log("Carregamento inicial");
    });

