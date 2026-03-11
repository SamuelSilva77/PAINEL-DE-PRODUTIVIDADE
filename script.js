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
const tarefasArray = []

//ADICIONAR TAREFA

let Tarefas = document.querySelector(".tarefas")
let inputAdd = document.getElementById("inputAdd")

function adicionarTarefa(){
  let campoInput = inputAdd.value
  let caixaBaixa = campoInput.toLowerCase()

  //VERIFICAR SE JA TEM UMA TAREFA COM O MESMO NOME
  const nomeTarefa = tarefasArray.some((valor) => {
    return valor == caixaBaixa
  })

  if(inputAdd.value !== "" && nomeTarefa == false){
  Tarefas.innerHTML += `
        <div class="tarefa" id="${caixaBaixa}">
          <input type="checkbox" >
          <p> ${caixaBaixa} </p>
          <button onclick="deletar('${caixaBaixa}')">Deletar</button>
        </div>
  `
  tarefasArray.push(caixaBaixa)
  inputAdd.value = ""
  inputAdd.focus()
  }

}

//DELETAR TAREFA

function deletar(valor){
  let element = document.getElementById(valor)
  element.remove()
}
