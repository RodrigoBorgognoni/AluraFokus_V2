const html = document.querySelector('html');
const focoBtn = document.querySelector('.app__card-button--foco');
const curtoBtn = document.querySelector('.app__card-button--curto');
const longoBtn = document.querySelector('.app__card-button--longo');
const foto = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaInput = document.querySelector('#alternar-musica');
const startBtn = document.getElementById('start-pause');
const startPauseBtn = document.querySelector('#start-pause span');
const startPauseIcon = document.querySelector('#start-pause .app__card-primary-butto-icon');
const timer = document.getElementById('timer');

let musica = new Audio();
musica.loop = true;

const audioPlay = new Audio('/sons/play.wav');
const audioPausa = new Audio('/sons/pause.mp3');
const audioFim = new Audio('./sons/beep.mp3');

let tempoDecorrido = 10;
//let tempoDecorrido = 1500;
let intervalo = null;

focoBtn.addEventListener('click', () => {
    tempoDecorrido = 10;
    //tempoDecorrido = 1500;
    alterarContexto('foco', 'foco.png');
    focoBtn.classList.add('active');
});

curtoBtn.addEventListener('click', () => {
    tempoDecorrido = 300;
    alterarContexto('descanso-curto', 'descanso-curto.png');
    curtoBtn.classList.add('active');
});

longoBtn.addEventListener('click', () => {
    tempoDecorrido = 900;
    alterarContexto('descanso-longo', 'descanso-longo.png');
    longoBtn.classList.add('active');
});

function alterarContexto(contexto, imagem) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    foto.setAttribute('src', `/imagens/${imagem}`);

    switch (contexto) {
        case 'foco':
            musica.pause();
            musicaInput.checked = false;
            titulo.innerHTML = `Otimize sua produtividade,<br/>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            musica.pause();
            musicaInput.checked = false;
            titulo.innerHTML = `Que tal dar uma respirada?<br/>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            musica.pause();
            musicaInput.checked = false;
            titulo.innerHTML = `Hora de voltar à superfície<br/>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
        default:
            break;
    }
}

/*
play(): inicia a reprodução do áudio;
pause(): pausa a reprodução do áudio;
currentTime: propriedade que retorna ou define a posição atual de reprodução do áudio, em segundos;
volume: propriedade que retorna ou define o nível de volume do áudio, variando de 0 a 1.
*/

musicaInput.addEventListener('change', () => {
    if (musica.paused) {
        switch (focoBtn.classList[2] || curtoBtn.classList[2] || longoBtn.classList[2]) {
            case focoBtn.classList[2]:
                musica = new Audio('/sons/F_This_Job.mp3');
                break;
            case curtoBtn.classList[2]:
                musica = new Audio('/sons/For_Whom_the_Bell_Tolls.mp3');
                break;
            default:
                musica = new Audio('/sons/Senua_Chant.mp3');
                musica.currentTime = 40;
                musica.volume = 1;
                break;
        }
        musica.play();
    } else musica.pause();
});

startBtn.addEventListener('click', iniciarPausar);

const contagemRegressiva = () => {
    if (tempoDecorrido <= 0) {
        audioFim.volume = 0.5;
        audioFim.currentTime = 3;
        audioFim.play();
        const focoAtivo = html.getAttribute('data-contexto') == 'foco';
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar();
        return;
    }
    tempoDecorrido -= 1;
    mostrarTempo();
};

function iniciarPausar() {
    if (intervalo) {
        zerar();
        audioPausa.volume = 1;
        audioPausa.play();
        return;
    }
    audioPlay.play();
    intervalo = setInterval(contagemRegressiva, 1000);
    startPauseBtn.textContent = 'Pausar';
    startPauseIcon.setAttribute('src', '/imagens/pause.png');
}

function zerar() {
    clearInterval(intervalo);
    startPauseBtn.textContent = 'Começar';
    startPauseIcon.setAttribute('src', '/imagens/play_arrow.png');
    intervalo = null;
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormat = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit' });
    timer.innerHTML = `${tempoFormat}`;
}

mostrarTempo();
