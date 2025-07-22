const html = document.querySelector("html");
const focusButton = document.querySelector(".app__card-button--foco");
const curtoButton = document.querySelector(".app__card-button--curto");
const longoButton = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const tituloSite = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseButton = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const iniciarOuPausarBtIcone = document.querySelector(
  ".app__card-primary-butto-icon"
);
const tempoNaTela = document.querySelector("#timer");
const musica = new Audio("./sons/luna-rise-part-one.mp3");
const audioPause = new Audio("./sons/pause.mp3");
const audioPlay = new Audio("./sons/play.wav");
const audioTempoFinalizado = new Audio("./sons/beep.mp3");

musica.loop = true;

let tempoDecorridoSegundos = 1500;
let intervaloId = null;

// Function to toggle music playback
musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

// Add event listeners to buttons to change the data-contexto attribute
focusButton.addEventListener("click", () => {
  tempoDecorridoSegundos = 1500;
  alterarContexto("foco");
  focusButton.classList.add("active");
});
curtoButton.addEventListener("click", () => {
  tempoDecorridoSegundos = 300;
  alterarContexto("descanso-curto");
  curtoButton.classList.add("active");
});
longoButton.addEventListener("click", () => {
  tempoDecorridoSegundos = 900;
  alterarContexto("descanso-longo");
  longoButton.classList.add("active");
});

// Function to change the context of the application
function alterarContexto(contexto) {
  mostrarTempo();
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  switch (contexto) {
    case "foco":
      tituloSite.innerHTML = `Otimize sua produtividade,<br />
          <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      tituloSite.innerHTML = `Que tal dar uma respirada? <br />
          <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      tituloSite.innerHTML = `Hora de voltar à superfície.<br />
          <strong class="app__title-strong">Faça uma pausa longa.</strong>`;

    default:
      break;
  }
}

// Timer functionality
const contagemRegressiva = () => {
  if (tempoDecorridoSegundos <= 0) {
    audioTempoFinalizado.play();
    zerar();
    return;
  }
  tempoDecorridoSegundos -= 1;
  mostrarTempo();
};

startPauseButton.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    audioPause.play();
    zerar();
    return;
  }
  audioPlay.play();
  intervaloId = setInterval(contagemRegressiva, 1000);
  iniciarOuPausarBt.textContent = "Pausar";
  iniciarOuPausarBtIcone.setAttribute("src", `./imagens/pause.png`);
}

function zerar() {
  clearInterval(intervaloId);
  iniciarOuPausarBt.textContent = "Começar";
  iniciarOuPausarBtIcone.setAttribute("src", `./imagens/play_arrow.png`);
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
