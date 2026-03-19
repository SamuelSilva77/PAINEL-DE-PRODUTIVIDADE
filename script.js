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

    tarefasArray.push({ tarefa: caixaBaixa, completado: false });
    console.log(tarefasArray);
    inputAdd.value = "";
    inputAdd.focus();

    //LEMBRAR DA TAREFA
    let informaçoes = JSON.stringify({
      tarefa: caixaBaixa,
      completado: false,
    });
    localStorage.setItem(caixaBaixa, informaçoes);
  }
}

inputAdd.addEventListener("keyup",(valor) => {
  if (valor.keyCode === 13) {
    adicionarTarefa()
  }
});

//MUDAR CLASSE (MARCAR COMO CONCLUIDO)
function mudarClasse(idTarefa) {
  let element = document.getElementById(idTarefa);
  localStorage.removeItem(idTarefa);

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
    localStorage.setItem(
      idTarefa,
      JSON.stringify({ tarefa: idTarefa, completado: true }),
    );
  } else {
    element.classList.remove("tarefaC");
    element.classList.add("tarefa");
    tarefasArray[posiçao].completado = false;
    localStorage.setItem(
      idTarefa,
      JSON.stringify({ tarefa: idTarefa, completado: false }),
    );
  }
}

//DELETAR TAREFA

function deletar(valor) {
  let elemento = document.getElementById(valor);
  elemento.remove();
  localStorage.removeItem(valor);

  //DELETAR DO ARRAY
  let posicao = "";
  tarefasArray.forEach((index, ordem) => {
    if (index.tarefa == valor) {
      posicao = ordem;
    }
  });
  tarefasArray.splice(posicao, 1);
  console.log(tarefasArray);
}

//LEMBRAR TAREFA

for (let i = 0; i < localStorage.length; i++) {
  let ordem = localStorage.key(i);
  let info = JSON.parse(localStorage.getItem(ordem));

  tarefasArray.push({ tarefa: info.tarefa, completado: info.completado });
  console.log(info.completado);
  if (info.completado == true) {
    //FUNÇAO QUE MUDA O HTML
    enviarHTML(info.tarefa, "tarefaC");
  } else {
    //FUNÇAO QUE MUDA O HTML
    enviarHTML(info.tarefa, "tarefa");
  }
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
