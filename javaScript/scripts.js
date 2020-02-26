const handleError = err => {
  alert(`Hubo un error. ${err}`);
};

const baseUrl = "https://tp-js-2-api-wjfqxquokl.now.sh";

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
const addBtn = document.querySelector(".verde"); // esto deberia ser buscado por id

const filtro = document.querySelector("#buscador");

const confirmDeleteBtn = document.querySelector("#modal-delete .accept-btn"); // tambien deberia tener id propio y buscarse por id

const saveBtn = document.querySelector("#modal-add .accept-btn"); // idem anterior

//==============================================================================
// Add employee

const validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateName = fullname => {
  if (fullname.length <= 50 && fullname.length > 0) {
    return true;
  } else {
    return false;
  }
};

const isNumeric = strNum => {
  return !isNaN(strNum);
};

const validateAddress = address => {
  if (address.length <= 60 && address.length > 0) {
    return true;
  } else {
    return false;
  }
};

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
  const fullNameValid = validateName(employee.fullname);
  const addressValid = validateAddress(employee.address);
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

    tableRow.setAttribute("class", "tr-employee-container");

    tdCheck.setAttribute("class", "td-employee-container");
    tdActions.setAttribute("class", "td-employee-container");
    tdAddress.setAttribute("class", "td-employee-container");
    tdEmail.setAttribute("class", "td-employee-container");
    tdName.setAttribute("class", "td-employee-container");
    tdPhone.setAttribute("class", "td-employee-container");

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

  confirmDeleteBtn.addEventListener("click", () => {
    deleteEmployee(window.deleteId);
  });
  newEmployeeBtn.addEventListener("click", {
    handleEvent: () => {
      abrirModalAdd();
    }
  });

  closeAddBtn.addEventListener("click", cerrarModalAdd);
  cancelAddBtn.addEventListener("click", cerrarModalAdd);

  cancelDeleteBtn.addEventListener("click", cerrarModalDelete);
  closeDeleteBtn.addEventListener("click", cerrarModalDelete);
  sourceCheckbox.addEventListener("click", () => {
    selectAllCheckbox(sourceCheckbox);
  });

  filtro.addEventListener("keyup", filterEmployee);
});

const clearForm = () => {
  document.querySelector(".modal-form").reset();
};

//==============================================================================
// Modal

const abrirModal = idModal => {
  const modalWindow = document.querySelector(`.bg-modal#${idModal}`);
  const modal = modalWindow.querySelector(".modal-container");
  modalWindow.style.display = "flex"; // Esto deberia estar en la clase .modal-container y no llamarse desde aca
  modalWindow.classList.add("fadeIn");
  modal.classList.add("fadeInDown");
  modalWindow.classList.remove("fadeOut");
  modal.classList.remove("fadeOutUp");
  document.body.style.overflow = "hidden";
};

const abrirModalDelete = id => {
  abrirModal("modal-delete");
  window.deleteId = id;
};

const abrirModalAdd = employee => {
  abrirModal("modal-add");

  if (employee) {
    saveBtn.innerHTML = "Save";
    saveBtn.setAttribute("class", "celeste boton");
    saveBtn.onclick = () => {
      modifyEmployee(employee.id);
      saveBtn.onclick = null;
      saveBtn.style.cursor = "not-allowed";
    };
    fillFormUser(employee);
  } else {
    addBtn.onclick = () => {
      addEmployee();
    };
    addBtn.innerHTML = "Add";
    addBtn.setAttribute("class", "verde boton");
  }
};

const fillFormUser = employee => {
  document.querySelector("#name").value = employee.fullname;
  document.querySelector("#address").value = employee.address;
  document.querySelector("#email").value = employee.email;
  document.querySelector("#phone").value = employee.phone;
};

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
  document.body.style.overflow = "visible";
};

const cerrarModalDelete = () => cerrarModal("modal-delete");
const cerrarModalAdd = () => {
  cerrarModal("modal-add");
};

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

//==============================================================================
// Select All Checkboxes

const sourceCheckbox = document.querySelector("#checkbox");
const selectAllCheckbox = sourceCheckbox => {
  const checkboxes = document.getElementsByName("check");
  for (var i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = sourceCheckbox.checked;
  }
};

//==============================================================================
// Delete Employees

const _deleteEmployee = async id => {
  try {
    await axios.delete(`${baseUrl}/users/${id}`);
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

//==============================================================================
// Modify Employees

const putEmployee = (id, employee) => {
  return axios.put(`${baseUrl}/users/${id}`, employee).catch(handleError);
};

const modifyEmployee = async id => {
  try {
    const employee = createEmployeeObject();
    if (isEmployeeValid(employee)) {
      await putEmployee(id, employee);
      await fetchUsers();
      cerrarModalAdd();
    } else {
      alert("Employee not valid!!Try again :(");
    }
  } catch (error) {
    alert(error);
  }
};
//==============================================================================
// Exports
try {
  module.exports = exports = {
    baseUrl,
    putEmployee,
    _deleteEmployee,
    isEmployeeValid,
    postearEmployee,
    validateAddress,
    validateEmail,
    validateEmail,
    validateName,
    isNumeric
  };
} catch (e) {}
