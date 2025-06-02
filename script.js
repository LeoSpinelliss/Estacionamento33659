const API = "http://cnms-parking-api.net.uztec.com.br/";
const output = document.getElementById("resultado");

function pegarPlaca() {
  const plate = document.getElementById("plateInput").value.trim();
  if (!plate) {
    alert("Digite uma placa primeiro!");
  }
  return plate;
}

function mostrarResultado(data) {
  output.innerText = JSON.stringify(data, null, 2);
}

// Funções com API
async function listarAtivos() {
  const res = await fetch(`${API}/active`);
  const data = await res.json();
  mostrarResultado(data);
}

async function registrarEntrada() {
  const plate = pegarPlaca();
  if (!plate) return;
  const res = await fetch(`${API}/entry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plate })
  });
  const data = await res.json();
  mostrarResultado(data);
}

async function registrarSaida() {
  const plate = pegarPlaca();
  if (!plate) return;
  const res = await fetch(`${API}/exit/${plate}`, { method: "PATCH" });
  const data = await res.json();
  mostrarResultado(data);
}

async function verificarVeiculo() {
  const plate = pegarPlaca();
  if (!plate) return;
  const res = await fetch(`${API}/check/${plate}`);
  const data = await res.json();
  mostrarResultado(data);
}

async function cancelarRegistro() {
  const plate = pegarPlaca();
  if (!plate) return;
  const res = await fetch(`${API}/cancel/${plate}`, { method: "DELETE" });
  const data = await res.json();
  mostrarResultado(data);
}

async function atualizarDados() {
  const plate = pegarPlaca();
  if (!plate) return;
  const novo = prompt("Digite a nova placa:");
  if (!novo) return;
  const res = await fetch(`${API}/update/${plate}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ newPlate: novo })
  });
  const data = await res.json();
  mostrarResultado(data);
}

async function gerarRelatorio() {
  const res = await fetch(`${API}/report`);
  const data = await res.json();
  mostrarResultado(data);
}

async function verificarVagas() {
  const res = await fetch(`${API}/slots`);
  const data = await res.json();
  mostrarResultado(data);
}

async function tempoPermanencia() {
  const plate = pegarPlaca();
  if (!plate) return;
  const res = await fetch(`${API}/time/${plate}`);
  const data = await res.json();
  mostrarResultado(data);
}
