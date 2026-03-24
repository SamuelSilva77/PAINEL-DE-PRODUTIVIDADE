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
    localStorage.setItem(
      "array",
      JSON.stringify(tarefasArray),
    );
  } else {
    element.classList.remove("tarefaC");
    element.classList.add("tarefa");
    tarefasArray[posiçao].completado = false;
    localStorage.setItem(
      "array",
      JSON.stringify(tarefasArray),
    );
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
  
  info.forEach((valor) => {
    if (valor.completado == true) {
      //FUNÇAO QUE MUDA O HTML
      enviarHTML(valor.tarefa, "tarefaC");
    } else if (valor.completado == false) {
      //FUNÇAO QUE MUDA O HTML
      enviarHTML(valor.tarefa, "tarefa");
    }
    
    tarefasArray.push({ tarefa: valor.tarefa, completado: valor.completado });
  })
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

let completos = document.getElementById("barraConcluidos");
let pendentes = document.getElementById("barraPendentes");

//CAMPO DE TEXTO

let spanCompletos = document.getElementById("spanConcluidas")
let spanPendentes = document.getElementById("spanPendentes")

function atualizarTabela() {
  completos.max = tarefasArray.length;
  pendentes.max = tarefasArray.length;

  let tarefasConcluidas = []
  let tarefasPendentes = []

  tarefasArray.forEach((valor, ordem) => {
    if(valor.completado == true){
      tarefasConcluidas.push(ordem)
    }else if(valor.completado == false){
      tarefasPendentes.push(ordem)
    }

  })
  completos.value = tarefasConcluidas.length
  pendentes.value = tarefasPendentes.length

  //ATUALIZAR CAMPO DE TEXTO
  spanCompletos.innerHTML = tarefasConcluidas.length
  spanPendentes.innerHTML = tarefasPendentes.length
}
atualizarTabela();

//QUICK NOTE

const quicknotas = []
let containerQuickNote = document.getElementById("containerQuickNote")

function addQuickNote(){
  let tarefa = prompt("Insira a tarefa")

  if(tarefa){
    containerQuickNote.innerHTML += `
        <div class="quicknote">
          <span> ${tarefa} </span>
        </div>
    `
  }


  quicknotas.push({tarefa: tarefa})
  localStorage.setItem("quicknotes", JSON.stringify(quicknotas))
}

//LEMBRAR DAS NOTAS RAPIDAS

for(let i = 0; i < 1; i++){
  let pegar = JSON.parse(localStorage.getItem("quicknotes"))

  pegar.forEach((valor) => {
    containerQuickNote.innerHTML += `
          <div class="quicknote">
            <span> ${valor.tarefa} </span>
          </div>
    `
    quicknotas.push({tarefa: valor.tarefa})
  })
}


