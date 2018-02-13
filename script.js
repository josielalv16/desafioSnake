//Configurações iniciais
var cobraX = 2;
var cobraY = 2;
var raboX = [cobraX];
var raboY = [cobraY];
var height = 23;
var width = 35;

var tamanho = 0;
var cX;
var cY;

var jogando = false;
var gameOver = false;
// cima = 0 ; baixo = 1; esquerda = 2; direita = 3
var direcao = 3;
var intervalo = 100;
var incremento = 1;
var int;


//Inicio do jogo
function run() {
    iniciar();
    int = setInterval(gameLoop, intervalo);
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
    if (x != null && y != null) {
        get(x, y).setAttribute("class", classe);
    }
}

//Pega o tipo da posição, se é parede ou vazio
function getClasse(x, y) {
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
    cX = comidaX;
    cY = comidaY;
}

//Verifica tecla pressionada e a direção que a cobra irá seguir
window.addEventListener("keypress", function key() {
    var tecla = event.keyCode;
    console.log(tecla);
    //Para cima (W ou seta para cima)
    if (direcao != 1 && (tecla == 119 || tecla == 87 || tecla == 38)) {
        direcao = 0;
    }
    //Para baixo (S ou seta para baixo)
    else if (direcao != 0 && (tecla == 115 || tecla == 83 || tecla == 40)) {
        direcao = 1;
    }
    //Para esquerda (A ou seta para esquerda)
    else if (direcao != 3 && (tecla == 97 || tecla == 65 || tecla == 37)) {
        direcao = 2;
    }
    //Para direita (D ou seta para direita)
    else if (direcao != 2 && (tecla == 100 || tecla == 68 || tecla == 39)) {
        direcao = 3;
    }

    if (!jogando) {
        jogando = true;
    } else if (tecla == 32) {
        jogando = false;
    }
});

//Checa o estado do jogo 
function gameLoop() {
    if (jogando && !gameOver) {
        atualiza();
    } else if (gameOver) {
        clearInterval(int);
    }
}

//Atualiza a posição da cobra e do rabo
function atualiza() {
    atualizaRabo();
    set(raboX[tamanho], raboY[tamanho], "vazio");
    if (direcao == 0) {
        cobraY--;
    } else if (direcao == 1) {
        cobraY++;
    } else if (direcao == 2) {
        cobraX--;
    } else if (direcao == 3) {
        cobraX++;
    }
    set(cobraX, cobraY, "cobra");
}

function atualizaRabo() {
    for (var i = tamanho; i > 0; i--) {
        raboX[i] = raboX[i - 1];
        raboY[i] = raboY[i - 1];
    }
    raboX[0] = cobraX;
    raboY[0] = cobraY;
}

window.onload = function () {
    run();
}

// 0 = cima; 1 = baixo; 2 = esquerda; 3 = direita
// 0 = up; -1 = down; 1 = esquerda; direita = 2 tuto