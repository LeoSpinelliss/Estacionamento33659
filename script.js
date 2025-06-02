const apiUrl = 'http://cnms-parking-api.net.uztec.com.br/';
const entryForm = document.getElementById('entry-form');
const exitForm = document.getElementById('exit-form');
const statusMessage = document.getElementById('status-message');
const vehicleTableBody = document.querySelector('#vehicle-table tbody');

entryForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const plate = document.getElementById('plate').value;
  try {
    const response = await fetch(`${apiUrl}entry`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plate })
    });
    const data = await response.json();
    if (data.success) {
      statusMessage.textContent = `Entrada registrada para o veículo ${plate}`;
      statusMessage.style.color = 'green';
      updateVehicleList();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    statusMessage.textContent = `Erro: ${error.message}`;
    statusMessage.style.color = 'red';
  }
});

exitForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const plate = document.getElementById('exit-plate').value;
  try {
    const response = await fetch(`${apiUrl}exit/${plate}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    if (data.success) {
      statusMessage.textContent = `Saída registrada para o veículo ${plate}`;
      statusMessage.style.color = 'green';
      updateVehicleList();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    statusMessage.textContent = `Erro: ${error.message}`;
    statusMessage.style.color = 'red';
  }
});

async function updateVehicleList() {
  try {
    const response = await fetch(`${apiUrl}vehicles`);
    const vehicles = await response.json();
    vehicleTableBody.innerHTML = '';
    vehicles.forEach(vehicle => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${vehicle.plate}</td>
::contentReference[oaicite:22]{index=22};