//Configurações iniciais
var cobraX = 2;
var cobraY = 2;

var height = 23;
var width = 35;

//Inicio do jogo
function run() {
    iniciar();
}

function iniciar() {
    criarMapa();
    criarCobra();
    criarComida();
}

//Criando mapa
function criarMapa() {
    var baseJogo = document.getElementById("baseJogo");
    var html = "<table>";
    for (var i = 0; i < height; i++) {
        html += "<tr>";
        for (var j = 0; j < width; j++) {
            if (j == 0 || j == width - 1 || i == 0 || i == height - 1) {
                html += "<td class='parede' id = '" + j + "-" + i + "'></td>";
            } else {
                html += "<td class='vazio' id = '" + j + "-" + i + "'></td>";
            }
        }
        html += "</tr>";
    }
    html += "</table>";
    baseJogo.innerHTML = html;
}

//Criando cobra
function criarCobra() {
    set(cobraX, cobraY, "cobra");
}

//Pegando posição na tabela
function get(x, y) {
    return document.getElementById(x + "-" + y);
}

//Setando posição na tabela
function set(x, y, classe) {
    get(x, y).setAttribute("class", classe);
}

//Pega o tipo da posição, se é parede ou vazio
function getClasse(x, y) {
    console.log(x);
    console.log(y);
    return get(x, y).getAttribute("class");
}

//Criando comida
function criarComida() {
    var colocado = false;
    while (!colocado) {
        var comidaX = Math.floor(Math.random() * (width - 1) + 1);
        var comidaY = Math.floor(Math.random() * (height - 1) + 1);
        //Verifica se a comida vai ser colocada em um lugar vazio (fora da cobra)
        if (getClasse(comidaX, comidaY) == "vazio") {
            colocado = true;
        }
    }
    //Coloca comida na tela
    set(comidaX, comidaY, "comida");
}
window.onload = function () {
    run();
}