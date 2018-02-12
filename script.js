var height = 23;
var width = 35;

//Inicio do jogo
function run() {
    iniciar();
}

function iniciar() {
    criarMapa();
}

//Criando Mapa
function criarMapa() {
    var baseJogo = document.getElementById("baseJogo");
    var html = "<table>";
    // document.write("<table>");
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

window.onload = function () {
    run();
}