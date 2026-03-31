/////RELOGIO
//ELEMENTOS DO HTML
let horas = document.getElementById("horas");
let data = document.getElementById("data");

//PEGAR DATA E HORA E EXIBIR NA TELA
function atualizarHora() {
  let horaAtual = new Date().toLocaleString("pt-br", { timeStyle: "short" });
  let DataAtual = new Date().toLocaleString("pt-br", { dateStyle: "full" });

  horas.innerHTML = horaAtual;
  data.innerHTML = DataAtual;
}

setInterval(() => {
  atualizarHora();
}, 1000);

//ARRAY PARA GUARDAR TODASAS TAREFAS
const tarefasArray = [];

//FUNÇAO PARA MANIPULAR O DOM
function enviarHTML(tarefa, classe) {
  Tarefas.innerHTML += `
        <div class="${classe}" id="${tarefa}" onclick="mudarClasse('${tarefa}')">
          <p> ${tarefa} </p>
          <button onclick="deletar('${tarefa}')">Deletar</button>
        </div>
  `;
}

//ADICIONAR TAREFA

let Tarefas = document.querySelector(".tarefas");
let inputAdd = document.getElementById("inputAdd");

function adicionarTarefa() {
  let campoInput = inputAdd.value;
  let caixaBaixa = campoInput.toLowerCase();

  //VERIFICAR SE JA TEM UMA TAREFA COM O MESMO NOME
  const nomeTarefa = tarefasArray.some((valor) => {
    return valor.tarefa == caixaBaixa;
  });

  if (inputAdd.value !== "" && nomeTarefa == false) {
    //FUNÇAO QUE MUDA O HTML
    enviarHTML(caixaBaixa, "tarefa");

    let atual = new Date().getDate();
    tarefasArray.push({
      tarefa: caixaBaixa,
      completado: false,
      ultimoDia: atual,
    });

    inputAdd.value = "";
    inputAdd.focus();

    //LEMBRAR DA TAREFA
    localStorage.setItem("array", JSON.stringify(tarefasArray));
  }
}

inputAdd.addEventListener("keyup", (valor) => {
  if (valor.key == "Enter") {
    adicionarTarefa();
  }

  //ATUALIZAR A TABELA DE PROGRESSO
  atualizarTabela();
});

//MUDAR CLASSE (MARCAR COMO CONCLUIDO)
function mudarClasse(idTarefa) {
  let element = document.getElementById(idTarefa);

  let posiçao = "";
  tarefasArray.forEach((index, ordem) => {
    if (index.tarefa == idTarefa) {
      posiçao = ordem;
    }
  });
  if (element.classList.contains("tarefa")) {
    element.classList.remove("tarefa");
    element.classList.add("tarefaC");
    tarefasArray[posiçao].completado = true;
    localStorage.setItem("array", JSON.stringify(tarefasArray));
  } else {
    element.classList.remove("tarefaC");
    element.classList.add("tarefa");
    tarefasArray[posiçao].completado = false;
    localStorage.setItem("array", JSON.stringify(tarefasArray));
  }

  //ATUALIZAR TABELA DE CONCLUSAO
  atualizarTabela();
}

//DELETAR TAREFA

function deletar(valor) {
  let elemento = document.getElementById(valor);
  elemento.remove();

  //DELETAR DO ARRAY
  let posicao = "";
  tarefasArray.forEach((index, ordem) => {
    if (index.tarefa == valor) {
      posicao = ordem;
    }
  });
  tarefasArray.splice(posicao, 1);
  localStorage.setItem("array", JSON.stringify(tarefasArray));

  //ATUALIZAR A TABELA DE PROGRESSO
  atualizarTabela();
}

//LEMBRAR TAREFA

for (let i = 0; i < 1; i++) {
  let info = JSON.parse(localStorage.getItem("array"));
  let atual = new Date().getDate();
  info.forEach((valor) => {
    if (valor.ultimoDia != atual) {
      enviarHTML(valor.tarefa, "tarefa");
      tarefasArray.push({
        tarefa: valor.tarefa,
        completado: false,
        ultimoDia: atual,
      });
    } else if (valor.completado == true) {
      //FUNÇAO QUE MUDA O HTML
      enviarHTML(valor.tarefa, "tarefaC");
      tarefasArray.push({
        tarefa: valor.tarefa,
        completado: valor.completado,
        ultimoDia: valor.ultimoDia,
      });
    } else if (valor.completado == false) {
      //FUNÇAO QUE MUDA O HTML
      enviarHTML(valor.tarefa, "tarefa");
      tarefasArray.push({
        tarefa: valor.tarefa,
        completado: valor.completado,
        ultimoDia: valor.ultimoDia,
      });
    }
  });

  localStorage.setItem("array", JSON.stringify(tarefasArray));
}

//FILTRAGEM
function todas() {
  tarefasArray.forEach((valor) => {
    let element = document.getElementById(valor.tarefa);
    element.style.display = "flex";
  });
}

//FILTRAR POR TAREFAS PENDENTES

function pendente() {
  tarefasArray.forEach((valor) => {
    if (valor.completado == true) {
      let element = document.getElementById(valor.tarefa);
      element.style.display = "none";
    } else {
      let element = document.getElementById(valor.tarefa);

      element.style.display = "flex";
    }
  });
}

//FILTRAR POR TAREFAS CONCLUIDAS

function concluidas() {
  tarefasArray.forEach((valor) => {
    if (valor.completado == false) {
      let element = document.getElementById(valor.tarefa);
      element.style.display = "none";
    } else {
      let element = document.getElementById(valor.tarefa);
      element.style.display = "flex";
    }
  });
}

///PAINEL DE CONCLUSAO

function atualizarTabela() {
  //CAMPO DE TEXTO
  let spanCompletos = document.getElementById("spanConcluidas");
  let spanPendentes = document.getElementById("spanPendentes");

  let completos = document.getElementById("barraConcluidos");
  let pendentes = document.getElementById("barraPendentes");
  completos.max = tarefasArray.length;
  pendentes.max = tarefasArray.length;

  let tarefasConcluidas = [];
  let tarefasPendentes = [];

  tarefasArray.forEach((valor, ordem) => {
    if (valor.completado == true) {
      tarefasConcluidas.push(ordem);
    } else if (valor.completado == false) {
      tarefasPendentes.push(ordem);
    }
  });
  completos.value = tarefasConcluidas.length;
  pendentes.value = tarefasPendentes.length;

  //ATUALIZAR CAMPO DE TEXTO
  spanCompletos.innerHTML = tarefasConcluidas.length;
  spanPendentes.innerHTML = tarefasPendentes.length;
}
atualizarTabela();

//QUICK NOTE

const quicknotas = [];
let containerQuickNote = document.getElementById("containerQuickNote");

function addQuickNote() {
  let tarefa = prompt("Insira a tarefa");

  if (tarefa) {
    let containerQuickNote = document.getElementById("containerQuickNote");
    containerQuickNote.innerHTML += `
        <div class="quicknote">
          <span> ${tarefa} </span>
        </div>
    `;
  }

  let atual = new Date().getDate();
  quicknotas.push({ tarefa: tarefa, ultimoDia: atual });
  localStorage.setItem("quicknotes", JSON.stringify(quicknotas));
}

//LEMBRAR DAS NOTAS RAPIDAS

for (let i = 0; i < 1; i++) {
  let atual = new Date().getDate();

  let pegar = JSON.parse(localStorage.getItem("quicknotes"));
  pegar.forEach((valor) => {
    if (valor.ultimoDia != atual) {
    } else {
      containerQuickNote.innerHTML += `
            <div class="quicknote">
              <span> ${valor.tarefa} </span>
            </div>
      `;
      quicknotas.push({ tarefa: valor.tarefa, ultimoDia: atual });
    }
  });
  localStorage.setItem("quicknotes", JSON.stringify(quicknotas));
}

// CARD DE CLIMA

// API: https://api.openweathermap.org/data/2.5/weather?q=RioClaro&appid=5dfff448d68b4c710e24c14554f74cdd&units=metric&lang=pt_br
// fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a2fbd756d9cade03d9736cb1a04aac12&units=metric&lang=pt_br`);

let temp = document.getElementById("temp");
let cidade = document.getElementById("cidade");
let imagemClima = document.getElementById("imagemClima");
let CardClima = document.getElementById("cardClima");

navigator.geolocation.getCurrentPosition(async (pos, erro) => {
  if (pos) {
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;

    let dados = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a2fbd756d9cade03d9736cb1a04aac12&units=metric&lang=pt_br`,
    );
    let api = await dados.json();

    cidade.innerHTML = api.name;
    temp.innerHTML = Math.floor(api.main.temp) + "°C";
    //
    if (api.weather[0].main == "Rain") {
      imagemClima.src = "img/nuvemchuva.png";
      CardClima.style.backgroundImage = "url('img/ceuchuvoso.jpg')";
    } else if (api.weather[0].main == "Clear") {
      imagemClima.src = "img/sun.png";
      CardClima.style.backgroundImage = "url('img/ceulimpo.webp')";
    } else {
      imagemClima.src = "img/cloudy.png";
      CardClima.style.backgroundImage = "url('img/ceunublado.jpg')";
    }
  } else if (erro) {
    alert("Erro ao pegar sua localização");
    let dados = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=-23.5489&lon=-46.6388&appid=a2fbd756d9cade03d9736cb1a04aac12&units=metric&lang=pt_br`,
    );
    let api = await dados.json();
    temp.innerHTML = Math.floor(api.main.temp) + "°C";
    if (api.weather[0].main == "Rain") {
      imagemClima.src = "img/nuvemchuva.png";
      CardClima.style.backgroundImage = "url('img/ceuchuvoso.jpg')";
    } else if (api.weather[0].main == "Clear") {
      imagemClima.src = "img/sun.png";
      CardClima.style.backgroundImage = "url('img/ceulimpo.webp')";
    } else {
      imagemClima.src = "img/cloudy.png";
      CardClima.style.backgroundImage = "url('img/ceunublado.jpg')";
    }
  }
});
