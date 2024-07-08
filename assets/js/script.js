const inputTarea = document.querySelector(".inputTarea");
const buttonAgregar = document.querySelector(".buttonAgregar");
const listaTareas = document.querySelector(".listaTareas");
const total = document.querySelector("#total");
const realizadas = document.querySelector("#realizadas");
const noRealizadas = document.querySelector("#norealizadas");

const tareas = [
  {
    id: randomId(),
    nombre : "Estudiar.",
  },
  {
    id: randomId(),
    nombre : "Lavar ropa.",
  },
  {
    id: randomId(),
    nombre : "Pasear mascota.",
  }
];
function randomId() {
  return Math.floor(Math.random() * 100) + 1;
}

buttonAgregar.addEventListener("click", () => {
  const nuevaTarea = {
    id: randomId(),
    nombre: inputTarea.value,
    confirmado: false,
  };
  tareas.push(nuevaTarea);
  inputTarea.value = "";
  renderizarTareas();
});

const renderizarTareas = function () {
  let html = "";

  for (const tarea of tareas) {
    const chequeado = tarea.confirmado ? "checked" : "";

    html += `
    <tr>
      <td>${tarea.id}</td>
      <td class="${tarea.confirmado ? "completed" : ""}">${tarea.nombre}</td>
      <td><input type="checkbox" onclick="actualizarConfirmacion(${tarea.id})" ${chequeado}></td>
      <td><button class="buttonEliminar" onclick="borrar(${tarea.id})">X</button></td>
    </tr>`;
  }

  listaTareas.innerHTML = `
  <tr>  
    <th>ID</th>
    <th>Tarea</th>
    <th>Completada</th>
    <th>Eliminar</th>
  </tr> ${html}`;

  recuento();
};

const borrar = (id) => {
  const index = tareas.findIndex((e) => e.id === id);
  if (index !== -1) {
    tareas.splice(index, 1);
    renderizarTareas();
  }
};

const actualizarConfirmacion = (id) => {
  const index = tareas.findIndex((e) => e.id === id);
  if (index !== -1) {
    tareas[index].confirmado = !tareas[index].confirmado;
    renderizarTareas();
  }
};

const recuento = () => {
  total.textContent = tareas.length;
  realizadas.textContent = tareas.filter((e) => e.confirmado).length;
  noRealizadas.textContent = tareas.filter((e) => !e.confirmado).length;
};

renderizarTareas();