const handleError = err => {
  alert(`Hubo un error. ${err}`);
};

const baseUrl = "https://tp-js-2-api-wjfqxquokl.now.sh";

function isNumeric(num) {
  return !isNaN(num);
}

//==============================================================================
// Query selectors

const newEmployeeBtn = document.querySelector("#new-employee");
const closeAddBtn = document.querySelector(
  "#modal-add >section > header > #close-btn"
);
const cancelDeleteBtn = document.querySelector(
  "#modal-delete > section > footer > .cancel-btn"
);
const closeDeleteBtn = document.querySelector(
  "#modal-delete >section > header > #close-btn"
);
const cancelAddBtn = document.querySelector(
  "#modal-add > section > footer > .cancel-btn"
);
const addBtn = document.querySelector("#add-btn");

const filtro = document.querySelector("#buscador");

const confirmDeleteBtn = document.querySelector("#modal-delete .accept-btn");

//==============================================================================
// Add employee

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const createEmployeeObject = () => {
  const employeeName = document.querySelector("#name").value;
  const employeeAddress = document.querySelector("#address").value;
  const employeeEmail = document.querySelector("#email").value;
  const employeePhone = document.querySelector("#phone").value;

  const employee = {
    fullname: employeeName,
    email: employeeEmail,
    address: employeeAddress,
    phone: employeePhone
  };

  return employee;
};

const isEmployeeValid = employee => {
  const emailValid = validateEmail(employee.email);
  const fullNameValid = employee.fullname.length <= 50;
  const addressValid = employee.address.length <= 60;
  const phoneValid = isNumeric(employee.phone);

  if (fullNameValid && addressValid && emailValid && phoneValid) {
    return true;
  }
  return false;
};

const postearEmployee = employee => {
  try {
    return axios.post(`${baseUrl}/users`, employee);
  } catch (error) {
    handleError(error);
  }
};

const addEmployee = async () => {
  try {
    const employee = createEmployeeObject();
    if (isEmployeeValid(employee)) {
      disableAddBtn();
      await postearEmployee(employee);
      await fetchUsers();
      cerrarModalAdd();
    } else {
      alert("Employee not valid!! :(");
    }
  } catch (error) {
    alert(error);
  }
};

addBtn.addEventListener("click", addEmployee);

//==============================================================================
// List employees

const fetchUsers = async q => {
  try {
    const res = await axios.get(
      q ? `${baseUrl}/users?search=${q}` : `${baseUrl}/users`
    );
    const users = res.data;
    insertUsersTable(users);
  } catch (err) {
    handleError(err);
  }
};

const insertUsersTable = users => {
  const tablaBody = document.querySelector("#tabla-users > tbody");
  tablaBody.innerHTML = "";
  users.forEach(user => {
    let tableRow = document.createElement("tr");
    let tdCheck = document.createElement("td");
    let tdName = document.createElement("td");
    let tdEmail = document.createElement("td");
    let tdAddress = document.createElement("td");
    let tdPhone = document.createElement("td");
    let tdActions = document.createElement("td");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "check";
    checkbox.id = `checkbox-${user.id}`;

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;

    tdName.innerHTML = user.fullname;
    tdEmail.innerHTML = user.email;
    tdAddress.innerHTML = user.address;
    tdPhone.innerHTML = user.phone;

    const editIcon = document.createElement("i");
    const deleteIcon = document.createElement("i");

    editIcon.innerHTML = "edit";
    deleteIcon.innerHTML = "delete";
    editIcon.setAttribute("class", "material-icons table-icons-edit");
    editIcon.style.color = "#ffc107";
    editIcon.addEventListener("click", () => {
      abrirModalAdd(user);
    });

    deleteIcon.setAttribute("class", "material-icons table-icons-delete");
    deleteIcon.style.color = "#f44336";
    deleteIcon.addEventListener("click", () => {
      abrirModalDelete(user.id);
    });

    tdCheck.appendChild(checkbox);
    tdCheck.appendChild(label);
    tdActions.appendChild(editIcon);
    tdActions.appendChild(deleteIcon);

    tableRow.appendChild(tdCheck);
    tableRow.appendChild(tdName);
    tableRow.appendChild(tdEmail);
    tableRow.appendChild(tdAddress);
    tableRow.appendChild(tdPhone);
    tableRow.appendChild(tdActions);

    tablaBody.appendChild(tableRow);
  });
};

window.addEventListener("load", event => {
  fetchUsers();
});

const clearForm = () => {
  document.querySelector(".modal-form").reset();
};

//==============================================================================
// Modal

const abrirModal = idModal => {
  const modalWindow = document.querySelector(`.bg-modal#${idModal}`);
  const modal = modalWindow.querySelector(".modal-container");
  modalWindow.style.display = "flex";
  modalWindow.classList.add("fadeIn");
  modal.classList.add("fadeInDown");
  modalWindow.classList.remove("fadeOut");
  modal.classList.remove("fadeOutUp");
};

const abrirModalDelete = id => {
  abrirModal("modal-delete");
  // TODO: remover eventListeners pasados (googlear como??????)
  confirmDeleteBtn.addEventListener("click", () => deleteEmployee(id));
};
const abrirModalAdd = employee => {
  abrirModal("modal-add");
  if (employee) {
    fillFormUser(employee);
  }
};
//TODO: hacer la función fillFormUser que modifica el DOM. Me rellena los inputs y dsps definir si hago un PUT o POST.
const disableAddBtn = () => {
  addBtn.disable = true;
  addBtn.style.cursor = "not-allowed";
  addBtn.style.opacity = "0.65";
};
const enableAddBtn = () => {
  addBtn.disable = false;
  addBtn.style.cursor = "pointer";
};

const cerrarModal = id => {
  const modalWindow = document.querySelector(`.bg-modal#${id}`);
  const modal = modalWindow.querySelector(".modal-container");
  modalWindow.classList.remove("fadeIn");
  modal.classList.remove("fadeInDown");
  modalWindow.classList.add("fadeOut");
  modal.classList.add("fadeOutUp");
  setTimeout(() => (modalWindow.style.display = "none"), 1000);
  clearForm();
  enableAddBtn();
};

const cerrarModalDelete = () => cerrarModal("modal-delete");
const cerrarModalAdd = () => cerrarModal("modal-add");

newEmployeeBtn.addEventListener("click", abrirModalAdd);
closeAddBtn.addEventListener("click", cerrarModalAdd);
cancelAddBtn.addEventListener("click", cerrarModalAdd);

cancelDeleteBtn.addEventListener("click", cerrarModalDelete);
closeDeleteBtn.addEventListener("click", cerrarModalDelete);

//==============================================================================
// Filtrar employees

const filterEmployee = () => {
  const tbody = document.querySelector("#tabla-users > tbody");
  const searchValue = filtro.value.toLowerCase();
  const tr = tbody.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    const td = tr[i].getElementsByTagName("td")[1]; //[1] porque se refiere al name;
    if (td) {
      const tdValue = td.textContent || td.innerText;
      if (tdValue.toLowerCase().indexOf(searchValue) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};

filtro.addEventListener("keyup", filterEmployee);

//==============================================================================
// Select All Checkboxes

const sourceCheckbox = document.querySelector("#checkbox");
const selectAllCheckbox = sourceCheckbox => {
  const checkboxes = document.getElementsByName("check");
  for (var i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = sourceCheckbox.checked;
  }
};

sourceCheckbox.addEventListener("click", () => {
  selectAllCheckbox(sourceCheckbox);
});

//==============================================================================
// Delete Employees

const _deleteEmployee = async id => {
  try {
    await axios.delete(`${baseUrl}/:${id}`);
  } catch (err) {
    handleError(err);
  }
};

const deleteEmployee = async id => {
  try {
    await _deleteEmployee(id);
    await fetchUsers();
    cerrarModalDelete();
  } catch (error) {
    alert(error);
  }
};
