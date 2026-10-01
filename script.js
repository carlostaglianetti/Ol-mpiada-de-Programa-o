let pontos = 0;

let tempo = 30;

let quantidadeLixo = 12;

let jogoAtivo = false;

let contador;


// TIPOS DE LIXO

const tiposLixo = [

    "🥤",
    "🧴",
    "🛍️",
    "🥫",
    "🍾",
    "📦",
    "🧃",
    "🥡",
    "🪣",
    "🧦",
    "🧹",
    "🧋"

];


// ELEMENTOS DA PÁGINA

const oceano =
    document.getElementById("oceano");

const pontosElemento =
    document.getElementById("pontos");

const tempoElemento =
    document.getElementById("tempo");

const quantidadeElemento =
    document.getElementById("quantidade");

const mensagem =
    document.getElementById("mensagem");

const botaoComecar =
    document.getElementById("botaoComecar");


// BOTÃO COMEÇAR

botaoComecar.addEventListener(
    "click",
    iniciarJogo
);


// INICIAR JOGO

function iniciarJogo() {

    clearInterval(contador);

    pontos = 0;

    tempo = 30;

    quantidadeLixo = tiposLixo.length;

    jogoAtivo = true;


    removerLixos();

    atualizarPlacar();


    mensagem.innerHTML =
        "🧹 Retire todo o lixo antes que o tempo acabe!";


    criarLixos();


    contador = setInterval(function() {

        tempo--;

        atualizarPlacar();


        if (tempo <= 0) {

            finalizarJogo(false);

        }

    }, 1000);

}


// CRIAR OS LIXOS

function criarLixos() {

    tiposLixo.forEach(function(tipo) {

        const lixo =
            document.createElement("button");


        lixo.classList.add("lixo");

        lixo.type = "button";

        lixo.textContent = tipo;


        lixo.setAttribute(
            "aria-label",
            "Remover lixo do oceano"
        );


        // POSIÇÃO ALEATÓRIA

        const esquerda =
            Math.floor(
                Math.random() * 85
            ) + 5;


        const topo =
            Math.floor(
                Math.random() * 70
            ) + 8;


        lixo.style.left =
            esquerda + "%";


        lixo.style.top =
            topo + "%";


        // QUANDO CLICAR NO LIXO

        lixo.addEventListener(
            "click",
            function() {

                if (!jogoAtivo) {
                    return;
                }


                lixo.remove();


                pontos += 10;

                quantidadeLixo--;


                atualizarPlacar();


                // VERIFICA SE GANHOU

                if (quantidadeLixo === 0) {

                    finalizarJogo(true);

                }

            }
        );


        oceano.appendChild(lixo);

    });

}


// REMOVER LIXOS ANTIGOS

function removerLixos() {

    const lixos =
        document.querySelectorAll(".lixo");


    lixos.forEach(function(lixo) {

        lixo.remove();

    });

}


// ATUALIZAR PLACAR

function atualizarPlacar() {

    pontosElemento.textContent =
        pontos;


    tempoElemento.textContent =
        tempo;


    quantidadeElemento.textContent =
        quantidadeLixo;

}


// FINALIZAR JOGO

function finalizarJogo(vitoria) {

    jogoAtivo = false;

    clearInterval(contador);


    if (vitoria) {

        const bonus =
            tempo * 2;


        pontos += bonus;


        mensagem.innerHTML =

            "🎉 <strong>Parabéns!</strong><br><br>" +

            "Você retirou todo o lixo do oceano! 🌊🐢<br><br>" +

            "Bônus de tempo: +" +
            bonus +
            " pontos.<br><br>" +

            "🏆 Pontuação final: " +
            pontos;

    }

    else {

        const retirados =
            tiposLixo.length -
            quantidadeLixo;


        mensagem.innerHTML =

            "⏰ <strong>O tempo acabou!</strong><br><br>" +

            "Você conseguiu retirar " +
            retirados +
            " objetos do oceano.<br><br>" +

            "🏆 Pontuação: " +
            pontos +
            "<br><br>" +

            "Clique em <strong>Começar / Reiniciar</strong> para tentar novamente.";

    }


    atualizarPlacar();

}
