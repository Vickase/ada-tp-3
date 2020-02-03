const handleError = err => {
  alert(`Hubo un error. ${err}`);
};

const baseUrl = "https://tp-js-2-api-wjfqxquokl.now.sh";

function isNumeric(num) {
  return !isNaN(num);
}

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
    editIcon.setAttribute("class", "material-icons tableIcons");
    editIcon.style.color = "#ffc107";
    deleteIcon.setAttribute("class", "material-icons tableIcons");
    deleteIcon.style.color = "#f44336";

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

// ==================================================================

const abrirModal = () => {
  const modalWindow = document.querySelector(".bg-modal");
  const modal = document.querySelector(".bg-modal > .modal-container");
  modalWindow.style.display = "flex";
  modalWindow.classList.add("fadeIn");
  modal.classList.add("fadeInDown");
  modalWindow.classList.remove("fadeOut");
  modal.classList.remove("fadeOutUp");
};

const cerrarModal = () => {
  const modalWindow = document.querySelector(".bg-modal");
  const modal = document.querySelector(".bg-modal > .modal-container");
  modalWindow.classList.remove("fadeIn");
  modal.classList.remove("fadeInDown");
  modalWindow.classList.add("fadeOut");
  modal.classList.add("fadeOutUp");
  setTimeout(() => (modalWindow.style.display = "none"), 1000);
  clearForm();
  enableAddBtn();
};

const newEmployeeBtn = document.querySelector("#new-employee");
newEmployeeBtn.addEventListener("click", abrirModal);

const closeBtn = document.querySelector("#close-btn");
const cancelBtn = document.querySelector("#cancel-btn");
closeBtn.addEventListener("click", cerrarModal);
cancelBtn.addEventListener("click", cerrarModal);

const addBtn = document.querySelector("#add-btn");

const disableAddBtn = () => {
  addBtn.disable = true;
  addBtn.style.cursor = "not-allowed";
  addBtn.style.opacity = "0.65";
};
const enableAddBtn = () => {
  addBtn.disable = false;
  addBtn.style.cursor = "pointer";
};

const addEmployee = async () => {
  try {
    const employee = createEmployeeObject();
    if (isEmployeeValid(employee)) {
      disableAddBtn();
      await postearEmployee(employee);
      await fetchUsers();
      cerrarModal();
    } else {
      alert("Employee not valid!! :(");
    }
  } catch (error) {
    alert(error);
  }
};

addBtn.addEventListener("click", addEmployee);

const filtro = document.querySelector("#buscador");

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

const sourceCheckbox = document.querySelector("#checkbox");
const selectAllCheckbox = sourceCheckbox => {
  const checkboxes = document.getElementsByName("check");
  for (var i = 0, n = checkboxes.length; i < n; i++) {
    checkboxes[i].checked = sourceCheckbox.checked;
  }
};

sourceCheckbox.addEventListener("click",()=>{
  selectAllCheckbox(sourceCheckbox);
});
