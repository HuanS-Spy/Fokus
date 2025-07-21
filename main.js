const html = document.querySelector("html");
const focusButton = document.querySelector(".app__card-button--foco");
const curtoButton = document.querySelector(".app__card-button--curto");
const longoButton = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const tituloSite = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("./sons/luna-rise-part-one.mp3");
musica.loop = true;

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
  alterarContexto("foco");
  focusButton.classList.add("active");
});

curtoButton.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  curtoButton.classList.add("active");
});

longoButton.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  longoButton.classList.add("active");
});

function alterarContexto(contexto) {
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
