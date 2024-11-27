const cargoList = [
  {
    id: "CARGO001",
    name: "Строительные материалы",
    status: "В пути",
    origin: "Москва",
    destination: "Казань",
    departureDate: "2024-11-24",
  },
  {
    id: "CARGO002",
    name: "Хрупкий груз",
    status: "Ожидает отправки",
    origin: "Санкт-Петербург",
    destination: "Екатеринбург",
    departureDate: "2024-11-26",
  },
];

const table = document.querySelector("#table");
const filter = document.querySelector("#filter");
const addForm = document.querySelector("#addForm");
const initialStatus = document.querySelector("#initialStatus").value;

function showTable() {
  const filterName = filter.value;
  table.innerHTML = "";

  cargoList
    .filter(item => !filterName || item.status === filterName)
    .forEach(item => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td class="${getStatusClass(item.status)}">${item.status}</td>
        <td>${item.origin}</td>
        <td>${item.destination}</td>
        <td>${item.departureDate}</td>
        <td>
          <select class="form-select status-select">
            <option ${
              item.status === "Ожидает отправки" ? "selected" : ""
            }>Ожидает отправки</option>
            <option ${
              item.status === "В пути" ? "selected" : ""
            }>В пути</option>
            <option ${
              item.status === "Доставлен" ? "selected" : ""
            }>Доставлен</option>
          </select>
        </td>
      `;

      const select = row.querySelector(".status-select");
      select.addEventListener("change", e => {
        const newStatus = e.target.value;

        if (
          newStatus === "Доставлен" &&
          new Date(item.departureDate) > new Date()
        ) {
          alert("Груз еще не отправлен!");
          e.target.value = item.status;
        } else {
          item.status = newStatus;

          const statusCell = row.cells[2];
          statusCell.textContent = newStatus;
          statusCell.className = getStatusClass(newStatus);
        }
      });

      table.appendChild(row);
    });
}

function getStatusClass(status) {
  if (status === "Ожидает отправки") return "waiting";
  if (status === "В пути") return "transit";
  if (status === "Доставлен") return "delivered";
  return "";
}

addForm.addEventListener("submit", e => {
  e.preventDefault();

  const id = `CARGO${String(cargoList.length + 1).padStart(3, "0")}`;
  const name = document.querySelector("#cargoName").value;
  const origin = document.querySelector("#origin").value;
  const destination = document.querySelector("#destination").value;
  const departureDate = document.querySelector("#departureDate").value;
  const status = document.querySelector("#initialStatus").value;

  if (!name || !origin || !destination || !departureDate) {
    alert("Необходимо заполнить все поля формы!");
    return;
  }

  cargoList.push({
    id,
    name,
    status,
    origin,
    destination,
    departureDate,
  });

  addForm.reset();
  showTable();
});

filter.addEventListener("change", showTable);

showTable();
